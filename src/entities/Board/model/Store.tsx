// Store handles user events and manage app state.
// It is responsible for business logic and subscribes on Event Bus in order to listen to all user events.
// When user dispatches the event, Store handles it via Event Bus and runs a handler to update app state.
import { ChangeHandler } from 'shared/model';
import { Shape, Tools, toolStore } from './ToolStore';
import { eventBus, Event, Events } from './EventBus';
import { IShape, ShapeFactory } from './ShapeFactory';

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

  shapes: IShape[];

  shapeType: Shape;

  mousePosition: IMousePosition;

  constructor() {
    this.storeKey = 'STORE';
    this.shapes = [];
    this.mousePosition = defaultMousePosition;
    this.shapeType = Tools.NOTE;

    eventBus.on(Events.START, this.setStartMousePosition.bind(this));
    eventBus.on(Events.END, this.setEndMousePosition.bind(this));
    eventBus.on(Events.MOVE, this.move.bind(this));
    eventBus.on(Events.ADD_SHAPE, this.addShapeToCanvas.bind(this));

    toolStore.subscribe(() => {
      this.shapeType = toolStore.shapeType;
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
    const shape = ShapeFactory.createShape(this.shapeType, { x, y });
    const selectionControl = ShapeFactory.createSelectionControl(this.shapeType, { x, y });

    this.shapes.push(shape);
    this.shapes.push(selectionControl);
    this.emitChanges();
  }
}

export const store = new Store();
