import { eventBus, Event, Events } from './EventBus';
import { Note } from '../ui/Note';
import { TextArea } from '../ui/TextArea';
import { Text } from '../ui/Text';

type ChangeToolHandler = (...args: unknown[]) => void;
export type Tool = keyof typeof Tools;
export type ShapeTool = Exclude<Tool, 'SELECT' | 'PAN' | 'DELETE'>;

export enum Tools {
  NOTE = 'NOTE',
  AREA = 'AREA',
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  PAN = 'PAN',
  DELETE = 'DELETE',
}

const shapes: Record<Tool, React.ReactElement | any> = {
  [Tools.NOTE]: Note,
  [Tools.AREA]: TextArea,
  [Tools.TEXT]: Text,
  [Tools.SELECT]: null,
  [Tools.PAN]: null,
  [Tools.DELETE]: null,
};

class ToolStore {
  storeKey: Event;

  tool: Tool;

  shape: React.ReactElement | null;

  constructor() {
    this.storeKey = 'TOOL_STORE';
    eventBus.on(Events.CHANGE_TOOL, this.changeTool.bind(this));

    this.tool = Tools.NOTE;
    this.shape = null;
  }

  subscribe(handler: ChangeToolHandler) {
    eventBus.on(this.storeKey, handler);
  }

  emitChanges() {
    eventBus.emit(this.storeKey);
  }

  changeTool(tool: Tool) {
    this.tool = tool;
    this.shape = shapes[tool];
    this.emitChanges();
  }
}

export const toolStore = new ToolStore();
