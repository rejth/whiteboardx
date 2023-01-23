import React from 'react';

import { classNames } from 'shared/lib';
import { IShapePolymorphicComponentProps } from 'shared/model';
import cls from './Note.module.scss';

export const Note = React.forwardRef(
  (props: IShapePolymorphicComponentProps, ref: React.Ref<HTMLDivElement>) => {
    const { styles, onDragStart, onDragEnd, onDragOver } = props;

    return (
      <div
        draggable="true"
        ref={ref}
        style={styles}
        className={cls.Note}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <span className={classNames(cls.shape, {}, ['square'])} />
        <span className={cls.text}>
          <span>Note</span>
        </span>
      </div>
    );
  },
);

Note.displayName = 'Note';
