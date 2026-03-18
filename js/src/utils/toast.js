import iziToast, { IziToastSettings } from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const defaultOptions = {
  position: 'topLeft',
  timeout: 2000,
  transitionIn: 'flipInX',
  transitionOut: 'fadeOut',
};

export const toast = {
  success: message => {
    iziToast.success({
      ...defaultOptions,
      title: 'OK',
      message: message,
      backgroundColor: 'var(--color-success)',
    });
  },
  error: message => {
    iziToast.error({
      ...defaultOptions,
      title: 'Error',
      message: message,
      backgroundColor: 'var(--color-error)',
    });
  },
};
