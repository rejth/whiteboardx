type EventHandler = (...args: any[]) => void;
type EventsMap = Map<Event, Set<EventHandler>>;
export type Event = keyof typeof Events;

export enum Events {
  START = 'START',
  END = 'END',
  MOVE = 'MOVE',
  RESIZE = 'RESIZE',
  UNDO = 'UNDO',
  REDO = 'REDO',
  CHANGE_TOOL = 'CHANGE_TOOL',
  STORE = 'STORE',
  TOOL_STORE = 'TOOL_STORE',
}

interface IEventBus {
  on(event: Event, handler: EventHandler): void;
  off(event?: Event, handler?: EventHandler): void;
  emit(event: Event, ...payload: Parameters<EventHandler>): void;
  getHandlers(event: string): Set<EventHandler>;
}

class EventBus implements IEventBus {
  #events: EventsMap = new Map<Event, Set<EventHandler>>();

  on(event: Event, handler: EventHandler): void {
    this.getHandlers(event).add(handler);
  }

  off(event?: Event, handler?: EventHandler): void {
    if (!event) {
      this.#events.clear();
      return;
    }

    if (!handler) {
      this.getHandlers(event).clear();
      this.#events.delete(event);
      return;
    }

    this.getHandlers(event)?.delete(handler);
  }

  emit(event: Event, ...payload: Parameters<EventHandler>): void {
    this.getHandlers(event).forEach((handler) => {
      handler?.(...payload);
    });
  }

  getHandlers(event: Event): Set<EventHandler> {
    let callbacks = this.#events.get(event);

    if (!callbacks) {
      callbacks = new Set();
      this.#events.set(event, callbacks);
    }

    return callbacks;
  }
}

export const eventBus = new EventBus();
