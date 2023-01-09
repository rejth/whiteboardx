import React from 'react';

import { classNames } from 'shared/lib';
import cls from './TextArea.module.scss';

interface ITextAreaProps {
  styles: React.CSSProperties;
}

export function TextArea({ styles }: ITextAreaProps) {
  return (
    <span className={cls.TextArea} draggable="true" style={styles}>
      <span className={classNames(cls.shape, {}, ['rect'])} />

      <span className={cls.text}>
        <span>Text Area</span>
      </span>
    </span>
  );
}
