import { ChangeHandler } from 'shared/model';
import { eventBus, Event, Events } from './EventBus';

export type Tool = keyof typeof Tools;
export type ShapeTool = Exclude<Tool, 'PAN' | 'DELETE'>;
export type Shape = Exclude<Tool, 'SELECT' | 'PAN' | 'DELETE'>;

export enum Tools {
  NOTE = 'NOTE',
  AREA = 'AREA',
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  PAN = 'PAN',
  DELETE = 'DELETE',
}

class ToolStore {
  readonly storeKey: Event;

  tool: Tool;

  shapeType: Shape;

  constructor() {
    this.storeKey = 'TOOL_STORE';
    eventBus.on(Events.CHANGE_TOOL, this.changeTool.bind(this));

    this.tool = Tools.NOTE;
    this.shapeType = Tools.NOTE;
  }

  subscribe(handler: ChangeHandler) {
    eventBus.on(this.storeKey, handler);
  }

  emitChanges() {
    eventBus.emit(this.storeKey);
  }

  changeTool(tool: Tool) {
    this.tool = tool;
    if (!['SELECT', 'PAN', 'DELETE'].includes(tool)) {
      this.shapeType = tool as Shape;
    }

    this.emitChanges();
  }
}

export const toolStore = new ToolStore();
