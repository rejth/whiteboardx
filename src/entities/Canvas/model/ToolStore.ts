import { eventBus, Event, Events } from './EventBus';

export type Tool = keyof typeof Tools;
type ChangeHandler = (...args: unknown[]) => void;

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

  tool: Tool | null;

  constructor() {
    this.storeKey = 'TOOL_STORE';
    eventBus.on(Events.CHANGE_TOOL, this.changeTool.bind(this));

    this.tool = null;
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
