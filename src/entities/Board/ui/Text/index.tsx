import React from 'react';

import { IShapePolymorphicComponentProps } from 'shared/model';
import cls from './Text.module.scss';

export function Text({ styles }: IShapePolymorphicComponentProps) {
  return (
    <span className={cls.Text} draggable="true" style={styles}>
      <span className={cls.text}>
        <span>Text</span>
      </span>
    </span>
  );
}