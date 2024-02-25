import { CHECKOUT_STEP_1 } from '@/constants/routes';
import { Form, Formik } from 'formik';
import { displayActionMessage } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import { Redirect } from 'react-router-dom';
import * as Yup from 'yup';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';
import CreditPayment from './CreditPayment';
import PayPalPayment from './PayPalPayment';
import Total from './Total';

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'O nome deve ter pelo menos 4 caracteres.')
    .required('O nome é obrigatório'),
  cardnumber: Yup.string()
    .min(13, 'O número do cartão deve ter de 13 a 19 dígitos')
    .max(19, 'O número do cartão deve ter apenas 13 a 19 dígitos')
    .required('O número do cartão é obrigatório.'),
  expiry: Yup.date()
    .required('É necessário expirar o cartão de crédito.'),
  ccv: Yup.string()
    .min(3, 'O comprimento do CCV deve ter de 3 a 4 dígitos')
    .max(4, 'O comprimento do CCV deve ter apenas 3-4 dígitos')
    .required('O CCV é obrigatório.'),
  type: Yup.string().required('Selecione o modo de pagamento')
});

const Payment = ({ shipping, payment, subtotal }) => {
  useDocumentTitle('Confira a etapa final | Iot Projetos');
  useScrollTop();

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'paypal'
  };

  const onConfirm = () => {
    displayActionMessage('Recurso ainda não está pronto: )', 'info');
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={(form) => {
          if (form.type === 'paypal') {
            displayActionMessage('Recurso ainda não está pronto: )', 'info');
          }
        }}
        onSubmit={onConfirm}
      >
        {() => (
          <Form className="checkout-step-3">
            <CreditPayment />
            <PayPalPayment />
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropType.shape({
    isDone: PropType.bool,
    isInternational: PropType.bool
  }).isRequired,
  payment: PropType.shape({
    name: PropType.string,
    cardnumber: PropType.string,
    expiry: PropType.string,
    ccv: PropType.string,
    type: PropType.string
  }).isRequired,
  subtotal: PropType.number.isRequired
};

export default withCheckout(Payment);
