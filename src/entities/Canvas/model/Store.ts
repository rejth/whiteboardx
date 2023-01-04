// Store handles user events and manage app state.
// It is responsible for business logic and subscribes on Event Bus in order to listen to all user events.
// When user dispatches the event, Store handles it via Event Bus and runs a handler to update app state.

import { v4 as uuid } from 'uuid';

import { Tool, Tools, toolStore } from './ToolStore';
import { eventBus, Event, Events } from './EventBus';

type ChangeHandler = (...args: unknown[]) => void;
type ShapeTool = Exclude<Tool, 'SELECT' | 'PAN' | 'DELETE'>;

export interface IShape {
  uuid: string;
  type: ShapeTool;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

class Store {
  storeKey: Event;

  shapes: IShape[];

  tool: Tool;

  constructor() {
    this.storeKey = 'STORE';
    this.shapes = [];
    this.tool = Tools.NOTE;

    eventBus.on(Events.START, this.addShape.bind(this));

    toolStore.subscribe(() => {
      this.tool = toolStore.tool;
    });
  }

  subscribe(handler: ChangeHandler): void {
    eventBus.on(this.storeKey, handler);
  }

  emitChanges(): void {
    eventBus.emit(this.storeKey);
  }

  addShape({ x, y }: IShape): void {
    const shape = {
      uuid: uuid(),
      type: this.tool as ShapeTool,
      width: 100,
      height: 100,
      color: 'blue',
      x,
      y,
    };

    this.shapes.push(shape);
    this.emitChanges();
  }
}

export const store = new Store();
