import React from 'react';

import { classNames } from 'shared/lib';
import { eventBus, toolStore, Events } from 'entities/Canvas/model';

import NoteIcon from './assets/note.svg';
import TextIcon from './assets/text.svg';
import TrashIcon from './assets/trash.svg';
import cls from './BoardTools.module.scss';

export class BoardTools extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      tools: [
        { id: 1, label: 'fa-mouse-pointer', type: 'cursor' },
        { id: 2, label: 'fa-minus', type: 'line', selected: true },
        { id: 3, label: 'fa-square-o', type: 'rect' },
        { id: 4, label: 'fa-circle-thin', type: 'ellipse' },
        { id: 5, label: 'fa-pencil', type: 'pen' },
      ],
    };
  }

  componentDidMount() {
    toolStore.subscribe(() => {
      const { tools } = this.state;

      const updatedTools = tools.map((tool: any) => ({
        ...tool,
        selected: toolStore.tool === tool.id,
      }));

      this.setState({ tools: updatedTools });
    });
  }

  handleClick() {
    eventBus.emit(Events.CHANGE_TOOL, 'NOTE');
    return this;
  }

  render() {
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
              <NoteIcon onClick={this.handleClick} />
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
}
