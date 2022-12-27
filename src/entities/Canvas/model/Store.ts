// Store handles user events and manage app state.
// It is responsible for business logic and subscribes on Event Bus in order to listen to all user events.
// When user dispatches the event, Store handles it via Event Bus and runs a handler to update app state.

import { Tool, toolStore } from './ToolStore';
import { eventBus, Event, Events } from './EventBus';

type ToolType = Tool | null;
type ChangeHandler = (...args: unknown[]) => void;

class Store {
  storeKey: Event;

  shapes: any[];

  tool: ToolType;

  constructor() {
    this.storeKey = 'STORE';
    this.shapes = [];
    this.tool = null;

    eventBus.on(Events.START, this.foo.bind(this));

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

  foo(): void {
    this.shapes.push('NOTE');
    this.emitChanges();
  }
}

export const store = new Store();
