import PropType from 'prop-types';
import React from 'react';

const StepTracker = ({ current }) => {
  // eslint-disable-next-line no-nested-ternary
  const className = (step) => (current === step
    ? 'is-active-step'
    : step < current
      ? 'is-done-step'
      : '');

  return (
    <div className="checkout-header">
      <ul className="checkout-header-menu">
        <li className={`checkout-header-list ${className(1)}`}>
          <div className="checkout-header-item">
            <div className="checkout-header-icon">
              <h4 className="checkout-header-step">01</h4>
            </div>
            <h6 className="checkout-header-subtitle">Resumo do pedido</h6>
          </div>
        </li>
        <li className={`checkout-header-list ${className(2)}`}>
          <div className="checkout-header-item">
            <div className="checkout-header-icon">
              <h4 className="checkout-header-step">02</h4>
            </div>
            <h6 className="checkout-header-subtitle">Detalhes de envio</h6>
          </div>
        </li>
        <li className={`checkout-header-list ${className(3)}`}>
          <div className="checkout-header-item">
            <div className="checkout-header-icon">
              <h4 className="checkout-header-step">03</h4>
            </div>
            <h6 className="checkout-header-subtitle">Pagamento</h6>
          </div>
        </li>
      </ul>
    </div>
  );
};

StepTracker.propTypes = {
  current: PropType.number.isRequired
};

export default StepTracker;
