import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full border-t-[1px] border-solid border-(--color-border) px-[20px] py-[15px] text-center text-[14px] text-(--color-placeholder)">
      <p>
        {t('footerText')}
        <a
          className="text-(--color-error) underline hover:text-(--color-accent-hover)"
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
