// Store handles user events and manage app state.
// It is responsible for business logic and subscribes on Event Bus in order to listen to all user events.
// When user dispatches the event, Store handles it via Event Bus and runs a handler to update app state.
import React from 'react';

import { ShapeTool, toolStore } from './ToolStore';
import { eventBus, Event, Events } from './EventBus';

type ChangeHandler = (...args: unknown[]) => void;

interface IShape {
  uuid: string;
  type: ShapeTool;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

class Store {
  storeKey: Event;

  shapes: React.ReactElement[];

  currentShape: React.ReactElement | null;

  constructor() {
    this.storeKey = 'STORE';
    this.shapes = [];
    this.currentShape = null;

    eventBus.on(Events.START, this.addShapeToCanvas.bind(this));

    toolStore.subscribe(() => {
      this.currentShape = toolStore.shape;
    });
  }

  subscribe(handler: ChangeHandler) {
    eventBus.on(this.storeKey, handler);
  }

  emitChanges() {
    eventBus.emit(this.storeKey);
  }

  addShapeToCanvas({ x, y }: IShape) {
    if (!this.currentShape) return;

    const styles: React.CSSProperties = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      height: '4.25em', // specify for each shape
      width: '4.25em', // specify for each shape
      zIndex: '999852',
      transform: `translate(${x}em, ${y}em)`,
    };

    const Shape = this.currentShape;
    // @ts-ignore
    this.shapes.push(<Shape styles={styles} />);
    this.emitChanges();
  }
}

export const store = new Store();
