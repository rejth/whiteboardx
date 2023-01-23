// Store handles user events and manage app state.
// It is responsible for business logic and subscribes on Event Bus in order to listen to all user events.
// When user dispatches the event, Store handles it via Event Bus and runs a handler to update app state.
import { v4 as uuid } from 'uuid';

import { ChangeHandler, Coordinates } from 'shared/model';
import { ShapeType, Tool, Tools, toolStore } from './ToolStore';
import { eventBus, Event, Events } from './EventBus';
import { ISelection, IShape, ShapeFactory } from './ShapeFactory';

interface IMousePosition {
  start: Coordinates;
  end: Coordinates;
  current: Coordinates;
  diff: Coordinates;
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

  shapes: IShape[];

  selectedShapes: ISelection[];

  shapeType: ShapeType;

  tool: Tool;

  mousePosition: IMousePosition;

  constructor() {
    this.storeKey = 'STORE';
    this.shapes = [];
    this.selectedShapes = [];
    this.mousePosition = defaultMousePosition;
    this.shapeType = Tools.NOTE;
    this.tool = Tools.PAN;

    eventBus.on(Events.START, this.setStartMousePosition.bind(this));
    eventBus.on(Events.END, this.setEndMousePosition.bind(this));
    eventBus.on(Events.DRAG_CANVAS, this.dragCanvas.bind(this));
    eventBus.on(Events.MOVE_SHAPE, this.moveShape.bind(this));
    eventBus.on(Events.ADD_SHAPE, this.addShapeToCanvas.bind(this));
    eventBus.on(Events.SELECT_SHAPE, this.selectShape.bind(this));
    eventBus.on(Events.CLEAR_SELECTION, this.clearSelection.bind(this));

    toolStore.subscribe(() => {
      this.tool = toolStore.tool;
      this.shapeType = toolStore.shapeType;
    });
  }

  subscribe(handler: ChangeHandler) {
    eventBus.on(this.storeKey, handler);
  }

  emitChanges() {
    eventBus.emit(this.storeKey);
  }

  setStartMousePosition(start: Coordinates) {
    this.mousePosition.start = start;
  }

  setEndMousePosition(end: Coordinates) {
    this.mousePosition.end = end;
    this.mousePosition.diff = this.getMousePositionsDiff('end');
  }

  dragCanvas({ x, y }: Coordinates) {
    this.mousePosition.current = { x, y };
    this.mousePosition.diff = this.getMousePositionsDiff('current');
    this.emitChanges();
  }

  moveShape(id: string, { x, y }: Coordinates) {
    this.shapes = this.shapes.map((shape) => {
      if (shape.uuid !== id) return shape;
      return { ...shape, x, y };
    });

    this.selectedShapes = this.selectedShapes.map((selection) => {
      if (selection.parentShapeUuid !== id) return selection;
      return { ...selection, x, y };
    });

    this.emitChanges();
  }

  getMousePositionsDiff(point: 'end' | 'current') {
    return {
      x: this.mousePosition[point].x - this.mousePosition.start.x,
      y: this.mousePosition[point].y - this.mousePosition.start.y,
    };
  }

  selectShape(id: string, { x, y }: Coordinates) {
    const selection = ShapeFactory.createSelection(id, this.shapeType, { x, y });
    this.selectedShapes.push(selection);
    this.emitChanges();
  }

  clearSelection() {
    this.selectedShapes = [];
    this.emitChanges();
  }

  addShapeToCanvas({ x, y }: IShape) {
    const shapeId = uuid();
    const shape = ShapeFactory.createShape(shapeId, this.shapeType, { x, y });
    const selection = ShapeFactory.createSelection(shapeId, this.shapeType, { x, y });

    this.shapes.push(shape);
    this.selectedShapes.push(selection);

    eventBus.emit(Events.CHANGE_TOOL, Tools.PAN);
    this.emitChanges();
  }
}

export const store = new Store();
