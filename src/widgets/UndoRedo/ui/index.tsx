import React from 'react';
import cls from './UndoRedo.module.scss';

export function UndoRedo() {
  return (
    <div className={cls.UndoRedo}>
      <ul className={cls.buttons_list}>
        <li className={cls.buttons_list_item}>
          <button value="undo" type="button" className={cls.button}>
            Undo
          </button>
        </li>
        <li className={cls.controls_list_item}>10%</li>
        <li className={cls.controls_list_item}>
          <button value="redo" type="button" className={cls.button}>
            Redo
          </button>
        </li>
      </ul>
    </div>
  );
}
