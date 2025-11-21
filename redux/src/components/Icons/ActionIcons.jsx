import React from 'react';

const iconStyle = 'fill-(--color-white) p-0';

const SVG_SPRITE = '/symbol-defs.svg#';

// Иконка Избранного
export const FavoriteIcon = ({ isFavorite }) => {
  const iconId = isFavorite ? 'icon-heart-fill' : 'icon-heart';
  return (
    <svg className={iconStyle} height="18">
      <use href={SVG_SPRITE + iconId}></use>
    </svg>
  );
};

// Иконка Редактирования
export const EditIcon = () => (
  <svg className={iconStyle} height="18">
    <use href={SVG_SPRITE + 'icon-pencil'}></use>
  </svg>
);

// Иконка Удаления
export const DeleteIcon = () => (
  <svg className={iconStyle} height="18">
    <use href={SVG_SPRITE + 'icon-trash'}></use>
  </svg>
);

export const MoonIcon = () => (
  <svg className={iconStyle} height="20">
    <use href={SVG_SPRITE + 'icon-moon'}></use>
  </svg>
);

export const SunIcon = () => (
  <svg className={iconStyle} height="20">
    <use href={SVG_SPRITE + 'icon-sun'}></use>
  </svg>
);
// Вверх
export const UpIcon = () => (
  <svg className={iconStyle} width="25" height="25">
    <use href={SVG_SPRITE + 'icon-up'}></use>
  </svg>
);
