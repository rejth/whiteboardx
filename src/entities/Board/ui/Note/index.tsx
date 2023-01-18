import React from 'react';

import { classNames } from 'shared/lib';
import { IShapePolymorphicComponentProps } from 'shared/model';
import cls from './Note.module.scss';

export function Note(props: IShapePolymorphicComponentProps) {
  const { styles, onMouseDown, onMouseUp, onMouseMove } = props;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      className={cls.Note}
      draggable="true"
      style={styles}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      <span className={classNames(cls.shape, {}, ['square'])} />
      <span className={cls.text}>
        <span>Note</span>
      </span>
    </span>
  );
}
