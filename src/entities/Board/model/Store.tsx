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

class Store {
  storeKey: Event;

  shapes: React.ReactElement[];

  currentShape: ShapePolymorphicComponent;

  shapeSelectionControl: ShapePolymorphicComponent;

  constructor() {
    this.storeKey = 'STORE';
    this.shapes = [];
    this.currentShape = null;
    this.shapeSelectionControl = null;

    eventBus.on(Events.START, this.addShapeToCanvas.bind(this));

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
      transform: `translate(${x}em, ${y}em)`,
    };

    const selectionStyles: React.CSSProperties = {
      top: '-0.25rem',
      left: '-0.25rem',
      height: 'calc(5em + 0.5rem)', // specify for each shape
      width: 'calc(5em + 0.5rem)', // specify for each shape,
      transform: `translate(${x}em, ${y}em)`,
    };

    this.shapes.push(<Shape key={uuid()} styles={shapeStyles} />);
    this.shapes.push(<ShapeSelectionControl key={uuid()} styles={selectionStyles} />);
    this.emitChanges();
  }
}

export const store = new Store();
