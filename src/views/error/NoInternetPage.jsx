import { useScrollTop } from '@/hooks';
import React from 'react';

const NoInternet = () => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>:( Sem conexão com a Internet.</h1>
      <p>Verifique sua conectividade de rede e tente novamente.</p>
      <br />
      <button
        className="button"
        onClick={() => window.location.reload(true)}
        type="button"
      >
        Tente novamente
      </button>
    </div>

  );
};

export default NoInternet;
