import React, { FC } from 'react';
import s from './ActionIcons.module.css';
import { Todo } from '../../types';

const SVG_SPRITE = '/symbol-defs.svg#';

interface ActionProps {
  isFavorite: boolean;
}

export const FavoriteIcon: FC<ActionProps> = ({ isFavorite }) => {
  const iconId = isFavorite ? 'icon-heart-fill' : 'icon-heart';
  return (
    <svg className={s.icon} height="18">
      <use href={SVG_SPRITE + iconId}></use>
    </svg>
  );
};

export const EditIcon = () => (
  <svg className={s.icon} height="18">
    <use href={SVG_SPRITE + 'icon-pencil'}></use>
  </svg>
);

export const DeleteIcon = () => (
  <svg className={s.icon} height="18">
    <use href={SVG_SPRITE + 'icon-trash'}></use>
  </svg>
);

export const MoonIcon = () => (
  <svg className={s.icon} height="20">
    <use href={SVG_SPRITE + 'icon-moon'}></use>
  </svg>
);

export const SunIcon = () => (
  <svg className={s.icon} height="20">
    <use href={SVG_SPRITE + 'icon-sun'}></use>
  </svg>
);
// Вверх
export const UpIcon = () => (
  <svg className={s.icon} width="25" height="25">
    <use href={SVG_SPRITE + 'icon-up'}></use>
  </svg>
);
