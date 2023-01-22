import React from 'react';

import { classNames } from 'shared/lib';
import { eventBus, Events, toolStore, Tools, Tool } from 'entities/Board/model';

import NoteIcon from './assets/note.svg';
import TextIcon from './assets/text.svg';
import PanIcon from './assets/pan.svg';
import TrashIcon from './assets/trash.svg';
import cls from './Toolbar.module.scss';

interface ITool {
  id: Tool;
  label: string;
  type: Tool;
  isSelected?: boolean;
  isDisabled?: boolean;
}

interface IToolbarState {
  tools: ITool[];
}

const iconsMap: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  [Tools.NOTE]: NoteIcon,
  [Tools.TEXT]: TextIcon,
  [Tools.PAN]: PanIcon,
  [Tools.DELETE]: TrashIcon,
};

export class Toolbar extends React.Component<unknown, IToolbarState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      tools: [
        { id: Tools.NOTE, label: 'Note', type: Tools.NOTE },
        { id: Tools.TEXT, label: 'Text', type: Tools.TEXT },
        { id: Tools.PAN, label: 'Pan', type: Tools.PAN, isSelected: true },
        { id: Tools.DELETE, label: 'Delete', type: Tools.DELETE, isDisabled: true },
      ],
    };
  }

  componentDidMount() {
    toolStore.subscribe(() => {
      const { tools } = this.state;
      const updatedTools = tools.map((tool: ITool) => ({
        ...tool,
        isSelected: tool.type === toolStore.tool,
      }));

      this.setState({ tools: updatedTools });
    });
  }

  handleClick(type: Tool) {
    eventBus.emit(Events.CHANGE_TOOL, type);
  }

  render() {
    const { tools } = this.state;

    return (
      <ul className={cls.Toolbar} draggable="true">
        {tools.map((tool) => {
          const Icon = iconsMap[tool.type];
          return (
            <li key={tool.id} className={cls.tools_list_item}>
              <span className={cls.tool}>
                <span
                  draggable="true"
                  className={classNames(cls.icon, {
                    [cls.active]: tool?.isSelected || false,
                    [cls.disabled]: tool?.isDisabled || false,
                  })}
                >
                  <Icon onClick={() => this.handleClick(tool.type)} />
                </span>
                <span className={cls.text}>{tool.label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}
