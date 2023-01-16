// Store handles user events and manage app state.
// It is responsible for business logic and subscribes on Event Bus in order to listen to all user events.
// When user dispatches the event, Store handles it via Event Bus and runs a handler to update app state.
import React from 'react';
import { v4 as uuid } from 'uuid';

import { ShapePolymorphicComponent } from 'shared/model';
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

interface IMousePosition {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
  current: {
    x: number;
    y: number;
  };
  diff: {
    x: number;
    y: number;
  };
}

const defaultMousePosition: IMousePosition = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 0,
    y: 0,
  },
  current: {
    x: 0,
    y: 0,
  },
  diff: {
    x: 0,
    y: 0,
  },
};

class Store {
  readonly storeKey: Event;

  shapes: React.ReactElement[];

  mousePosition: IMousePosition;

  currentShape: ShapePolymorphicComponent;

  shapeSelectionControl: ShapePolymorphicComponent;

  constructor() {
    this.storeKey = 'STORE';
    this.shapes = [];
    this.mousePosition = defaultMousePosition;
    this.currentShape = null;
    this.shapeSelectionControl = null;

    eventBus.on(Events.START, this.setStartMousePosition.bind(this));
    eventBus.on(Events.END, this.setEndMousePosition.bind(this));
    eventBus.on(Events.MOVE, this.move.bind(this));
    eventBus.on(Events.ADD_SHAPE, this.addShapeToCanvas.bind(this));

    toolStore.subscribe(() => {
      this.currentShape = toolStore.shape;
      this.shapeSelectionControl = toolStore.shapeSelectionControl;
    });
  }

  subscribe(handler: ChangeHandler) {
    eventBus.on(this.storeKey, handler);
  }

  emitChanges() {
    eventBus.emit(this.storeKey);
  }

  setStartMousePosition(start: { x: number; y: number }) {
    this.mousePosition.start = start;
  }

  setEndMousePosition(end: { x: number; y: number }) {
    this.mousePosition.end = end;
    this.mousePosition.diff = this.getMousePositionsDiff('end');
  }

  move({ x, y }: any) {
    this.mousePosition.current = { x, y };
    this.mousePosition.diff = this.getMousePositionsDiff('current');
    this.emitChanges();
  }

  getMousePositionsDiff(point: 'end' | 'current') {
    return {
      x: this.mousePosition[point].x - this.mousePosition.start.x,
      y: this.mousePosition[point].y - this.mousePosition.start.y,
    };
  }

  addShapeToCanvas({ x, y }: IShape) {
    if (!this.currentShape || !this.shapeSelectionControl) return;

    const Shape = this.currentShape;
    const ShapeSelectionControl = this.shapeSelectionControl;

    const shapeStyles: React.CSSProperties = {
      position: 'absolute',
      top: '0',
      left: '0',
      height: '5em', // specify for each shape
      width: '5em', // specify for each shape
      zIndex: '999750',
      transform: `translate(${x}px, ${y}px)`,
    };

    const selectionStyles: React.CSSProperties = {
      top: '-0.25rem',
      left: '-0.25rem',
      height: 'calc(5em + 0.5rem)', // specify for each shape
      width: 'calc(5em + 0.5rem)', // specify for each shape,
      transform: `translate(${x}px, ${y}px)`,
    };

    this.shapes.push(<Shape key={uuid()} styles={shapeStyles} />);
    this.shapes.push(<ShapeSelectionControl key={uuid()} styles={selectionStyles} />);
    this.emitChanges();
  }
}

export const store = new Store();
