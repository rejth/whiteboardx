import React from 'react';

import { classNames } from 'shared/lib';
import { eventBus, Events, toolStore, Tools, Tool } from 'entities/Board/model';

import NoteIcon from './assets/note.svg';
import TextIcon from './assets/text.svg';
import TrashIcon from './assets/trash.svg';

import cls from './Toolbar.module.scss';

interface ITool {
  id: Tool;
  label: string;
  type: Tool;
  isSelected?: boolean;
}

interface IToolbarState {
  tools: ITool[];
}

export class Toolbar extends React.Component<unknown, IToolbarState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      tools: [
        { id: Tools.NOTE, label: 'Note', type: Tools.NOTE, isSelected: true },
        { id: Tools.TEXT, label: 'Text', type: Tools.TEXT },
        { id: Tools.DELETE, label: 'Delete', type: Tools.DELETE },
      ],
    };
  }

  componentDidMount() {
    toolStore.subscribe(() => {
      const { tools } = this.state;

      const updatedTools = tools.map((tool: ITool) => ({
        ...tool,
        isSelected: toolStore.tool === tool.type,
      }));

      this.setState({ tools: updatedTools });
    });
  }

  handleClick(type: Tool) {
    eventBus.emit(Events.CHANGE_TOOL, type);
    return this;
  }

  render() {
    return (
      <ul className={cls.Toolbar} draggable="true">
        <li className={cls.tools_list_item}>
          <span className={cls.tool}>
            <span
              className={cls.icon}
              data-test="new-note"
              title="Drag to add new text note"
              draggable="true"
            >
              <NoteIcon onClick={() => this.handleClick(Tools.NOTE)} />
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
              <TextIcon onClick={() => this.handleClick(Tools.TEXT)} />
            </span>
            <span className={cls.text}>Text</span>
          </span>
        </li>
        <li className={cls.tools_list_item}>
          <span className={cls.tool} title="Delete selected item(s)">
            <span className={classNames(cls.icon, { [cls.disabled]: true })}>
              <TrashIcon onClick={() => this.handleClick(Tools.DELETE)} />
            </span>
            <span className={cls.text}>Delete</span>
          </span>
        </li>
      </ul>
    );
  }
}
