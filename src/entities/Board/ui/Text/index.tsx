import React from 'react';
import cls from './Text.module.scss';

interface ITextProps {
  styles: React.CSSProperties;
}

export function Text({ styles }: ITextProps) {
  return (
    <span className={cls.Text} draggable="true" style={styles}>
      <span className={cls.text}>
        <span>Text</span>
      </span>
    </span>
  );
}
