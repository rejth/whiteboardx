import React from 'react';

import { classNames } from 'shared/lib';
import { IShapePolymorphicComponentProps } from 'shared/model';
import cls from './Note.module.scss';

export function Note({ styles }: IShapePolymorphicComponentProps) {
  return (
    <span className={cls.Note} draggable="true" style={styles}>
      <span className={classNames(cls.shape, {}, ['square'])} />
      <span className={cls.text}>
        <span>Note</span>
      </span>
    </span>
  );
}
