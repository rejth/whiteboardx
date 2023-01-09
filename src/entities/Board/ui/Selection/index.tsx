import React from 'react';

import { classNames } from 'shared/lib';
import cls from './Selection.module.scss';

interface ISelectionProps {
  styles: React.CSSProperties;
}

export function Selection({ styles }: ISelectionProps) {
  return (
    <span className={cls.Selection} draggable="true" style={styles}>
      <span className={classNames(cls.shape, {}, [''])} />
    </span>
  );
}
