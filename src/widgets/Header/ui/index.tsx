import React from 'react';

import UserIcon from './assets/user.svg';
import cls from './Header.module.scss';

export function Header() {
  return (
    <header className={cls.Header}>
      <div className={cls.logo_area}>Whiteboard X</div>

      <div className={cls.controls_area}>
        <span className={cls.board_name}>My new board</span>
      </div>

      <div className={cls.user_area}>
        <span className={cls.icon}>
          <UserIcon onClick={() => {}} />
        </span>
      </div>
    </header>
  );
}
