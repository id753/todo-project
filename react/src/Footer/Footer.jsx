import React from 'react';
import s from './Footer.module.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer>
      <p className={s.footer_text}>
        {t('footerText')}
        <a
          href="https://github.com/id753"
          target="_blank"
          rel="noopener noreferrer"
        >
          ID753
        </a>
      </p>
    </footer>
  );
};

export default Footer;
