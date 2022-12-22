import React from 'react';
import cls from './ZoomControls.module.scss';

export function ZoomControls() {
  return (
    <div className={cls.ZoomControls}>
      <ul className={cls.controls_list}>
        <li className={cls.controls_list_item}>
          <button value="zoom" type="button" className={cls.button}>
            -
          </button>
        </li>
        <li className={cls.controls_list_item}>10%</li>
        <li className={cls.controls_list_item}>
          <button value="zoom" type="button" className={cls.button}>
            +
          </button>
        </li>
      </ul>
    </div>
  );
}
