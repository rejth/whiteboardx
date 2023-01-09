import React from 'react';

import { classNames } from 'shared/lib';
import cls from './Note.module.scss';

interface INoteProps {
  styles: React.CSSProperties;
}

export function Note({ styles }: INoteProps) {
  return (
    <span className={cls.Note} draggable="true" style={styles}>
      <span className={classNames(cls.shape, {}, ['square'])} />

      <span className={cls.text}>
        <span>Note</span>
      </span>
    </span>
  );
}
