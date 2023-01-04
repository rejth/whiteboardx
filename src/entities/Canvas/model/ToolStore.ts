import { eventBus, Event, Events } from './EventBus';

type ChangeHandler = (...args: unknown[]) => void;
export type Tool = keyof typeof Tools;

export enum Tools {
  NOTE = 'NOTE',
  AREA = 'AREA',
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  PAN = 'PAN',
  DELETE = 'DELETE',
}

class ToolStore {
  storeKey: Event;

  tool: Tool;

  constructor() {
    this.storeKey = 'TOOL_STORE';
    eventBus.on(Events.CHANGE_TOOL, this.changeTool.bind(this));

    this.tool = Tools.NOTE;
  }

  subscribe(handler: ChangeHandler): void {
    eventBus.on(this.storeKey, handler);
  }

  emitChanges(): void {
    eventBus.emit(this.storeKey);
  }

  changeTool(tool: Tool): void {
    this.tool = tool;
    this.emitChanges();
  }
}

export const toolStore = new ToolStore();
