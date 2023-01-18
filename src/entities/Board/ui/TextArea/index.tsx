import React from 'react';

import { classNames } from 'shared/lib';
import { IShapePolymorphicComponentProps } from 'shared/model';
import cls from './TextArea.module.scss';

export function TextArea({ styles }: IShapePolymorphicComponentProps) {
  return (
    <div className={cls.TextArea} draggable="true" style={styles}>
      <span className={classNames(cls.shape, {}, ['rect'])} />
      <span className={cls.text}>
        <span>Text Area</span>
      </span>
    </div>
  );
}
