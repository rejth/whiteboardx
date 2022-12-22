import React from 'react';

import { classNames } from 'shared/lib';

import NoteIcon from './assets/note.svg';
import TextIcon from './assets/text.svg';
import TrashIcon from './assets/trash.svg';
import cls from './BoardTools.module.scss';

export function BoardTools() {
  return (
    <ul className={cls.BoardTools}>
      <li className={cls.tools_list_item}>
        <span className={cls.tool}>
          <span
            className={cls.icon}
            data-test="new-note"
            title="Drag to add new text note"
            draggable="true"
          >
            <NoteIcon />
          </span>
          <span className={cls.text}>Note</span>
        </span>
      </li>
      <li className={cls.tools_list_item}>
        <span className={cls.tool}>
          <span
            className={cls.icon}
            data-test="new-text"
            title="Drag to add new text area"
            draggable="true"
          >
            <TextIcon />
          </span>
          <span className={cls.text}>Text</span>
        </span>
      </li>
      <li className={cls.tools_list_item}>
        <span className={cls.tool} title="Delete selected item(s)">
          <span className={classNames(cls.icon, { [cls.disabled]: true })}>
            <TrashIcon />
          </span>
          <span className={cls.text}>Delete</span>
        </span>
      </li>
    </ul>
  );
}
