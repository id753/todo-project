import iziToast, { IziToastSettings } from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const defaultOptions: IziToastSettings = {
  position: 'topLeft',
  timeout: 2000,
  transitionIn: 'flipInX',
  transitionOut: 'fadeOut',
};

export const toast = {
  success: (message: string) => {
    iziToast.success({
      ...defaultOptions,
      title: 'OK',
      message: message,
      backgroundColor: 'var(--color-success)',
    });
  },
  error: (message: string) => {
    iziToast.error({
      ...defaultOptions,
      title: 'Error',
      message: message,
      backgroundColor: 'var(--color-error)',
    });
  },
};
