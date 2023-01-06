import React from 'react';

import { Header } from 'shared/ui';
import { Canvas } from 'entities/Canvas';
import { BoardTools } from 'widgets/BoardTools';
import cls from './BoardPage.module.scss';

export function BoardPage() {
  return (
    <main className={cls.BoardPage}>
      <Header />

      <div className={cls.Tools}>
        <BoardTools />
      </div>

      <Canvas />
    </main>
  );
}
