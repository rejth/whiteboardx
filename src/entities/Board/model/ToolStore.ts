import { ShapePolymorphicComponent } from 'shared/model';

import { eventBus, Event, Events } from './EventBus';
import { Note } from '../ui/Note';
import { TextArea } from '../ui/TextArea';
import { Text } from '../ui/Text';
import { Selection } from '../ui/Selection';

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

const shapes: Record<Tool, ShapePolymorphicComponent> = {
  [Tools.NOTE]: Note,
  [Tools.AREA]: TextArea,
  [Tools.TEXT]: Text,
  [Tools.SELECT]: null,
  [Tools.PAN]: null,
  [Tools.DELETE]: null,
};

class ToolStore {
  readonly storeKey: Event;

  tool: Tool;

  shape: ShapePolymorphicComponent;

  shapeSelectionControl: ShapePolymorphicComponent;

  constructor() {
    this.storeKey = 'TOOL_STORE';
    eventBus.on(Events.CHANGE_TOOL, this.changeTool.bind(this));

    this.tool = Tools.NOTE;
    this.shape = null;
    this.shapeSelectionControl = Selection;
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
