import { Preloader } from '@/components/common';
import 'normalize.css/normalize.css';
import React from 'react';
import { render } from 'react-dom';
import 'react-phone-input-2/lib/style.css';
import { onAuthStateFail, onAuthStateSuccess } from '@/redux/actions/authActions';
import configureStore from '@/redux/store/store';
import '@/styles/style.scss';
import WebFont from 'webfontloader';
import App from './App';
import firebase from '@/services/firebase';

WebFont.load({
  google: {
    families: ['Tajawal']
  }
});

const { store, persistor } = configureStore();
const root = document.getElementById('app');

// Renderiza o pré-carregador no carregamento inicial
render(<Preloader />, root);

firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(onAuthStateSuccess(user));
  } else {
    store.dispatch(onAuthStateFail('Falha ao autenticar'));
  }
  // Então renderiza o aplicativo após verificar o estado de autenticação
  render(<App store={store} persistor={persistor} />, root);
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW Registrado: ', registration);
    }).catch((registrationError) => {
      console.log('SW Registração falhou: ', registrationError);
    });
  });
}
