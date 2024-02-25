import { useScrollTop } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';

const Error = ({ history }) => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>:( Ocorreu um erro. Por favor, tente novamente.</h1>
      <br />
      <button
        className="button"
        onClick={() => history.push('/')}
        type="button"
      >
        Tente novamente
      </button>
    </div>

  );
};

Error.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default Error;
