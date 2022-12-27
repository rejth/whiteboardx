import React from 'react';

import { Canvas } from 'entities/Canvas';
import { BoardTools } from 'widgets/BoardTools';
import cls from './BoardPage.module.scss';

export function BoardPage() {
  return (
    <section className={cls.Board}>
      <BoardTools />
      <Canvas />
    </section>
  );
}
