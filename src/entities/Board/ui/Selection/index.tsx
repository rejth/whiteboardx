import React from 'react';

import { classNames } from 'shared/lib';
import { IShapePolymorphicComponentProps } from 'shared/model';
import cls from './Selection.module.scss';

export function Selection(props: IShapePolymorphicComponentProps) {
  const { styles } = props;

  return (
    <span className={cls.Selection} style={styles}>
      <span draggable="true" className={classNames(cls.corner_resize_drag, {}, [cls.top_left])} />
      <span draggable="true" className={classNames(cls.corner_resize_drag, {}, [cls.top_right])} />
      <span
        draggable="true"
        className={classNames(cls.corner_resize_drag, {}, [cls.bottom_left])}
      />
      <span
        draggable="true"
        className={classNames(cls.corner_resize_drag, {}, [cls.bottom_right])}
      />
    </span>
  );
}
