import React from 'react';

import { Canvas } from 'entities/Board';
import { Toolbar } from 'widgets/Toolbar';
import { Header } from 'widgets/Header';
import cls from './BoardPage.module.scss';

export function BoardPage() {
  return (
    <main className={cls.BoardPage}>
      <Header />
      <div className={cls.content_wrapper}>
        <div className={cls.scroll_wrapper}>
          <Canvas />
        </div>
        <div className={cls.tools_wrapper}>
          <Toolbar />
        </div>
      </div>
    </main>
  );
}
