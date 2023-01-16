/* eslint-disable no-console */
import React, { RefObject } from 'react';

import { eventBus, Events, store } from '../../model';
import cls from './Canvas.module.scss';

interface ICanvasState {
  shapes: React.ReactElement[];
  mousePosition: { x: number; y: number };
}

const defaultRect: DOMRect = {
  height: 0,
  width: 0,
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  toJSON() {
    throw new Error('Function not implemented.');
  },
};

export const DND_GHOST_HIDING_IMAGE = new Image();
// https://png-pixel.com/
DND_GHOST_HIDING_IMAGE.src =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

export class Canvas extends React.Component<unknown, ICanvasState> {
  canvasRef: RefObject<HTMLDivElement> | null = null;

  rect: DOMRect = defaultRect;

  isMousePressed = false;

  constructor(props: unknown) {
    super(props);

    this.canvasRef = React.createRef<HTMLDivElement>();
    this.state = {
      shapes: [],
      mousePosition: { x: 0, y: 0 },
    };
    this.isMousePressed = false;
  }

  componentDidMount() {
    this.setState({ shapes: store.shapes, mousePosition: store.mousePosition.diff });
    this.rect = this.canvasRef?.current?.getBoundingClientRect() || defaultRect;

    store.subscribe(() => {
      this.setState({ shapes: store.shapes, mousePosition: store.mousePosition.diff });
    });
  }

  handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer?.setDragImage(DND_GHOST_HIDING_IMAGE, 0, 0);
    this.mouseDown(e);
  }

  handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    if (!this.isMousePressed) return;
    const mousePosition = this.getMousePosition(e);
    eventBus.emit(Events.MOVE, mousePosition);
  }

  handleOnDragEnd(e: React.DragEvent<HTMLDivElement>) {
    this.mouseUp(e);
  }

  getMousePosition(e: React.MouseEvent<HTMLDivElement>) {
    return {
      x: e.clientX - this.rect.left,
      y: e.clientY - this.rect.top,
    };
  }

  mouseDown(e: React.MouseEvent<HTMLDivElement>) {
    this.isMousePressed = true;
    const mousePosition = this.getMousePosition(e);
    eventBus.emit(Events.START, mousePosition);
  }

  mouseUp(e: React.MouseEvent<HTMLDivElement>) {
    this.isMousePressed = false;
    const mousePosition = this.getMousePosition(e);
    eventBus.emit(Events.END, mousePosition);
  }

  addShape(e: React.MouseEvent<HTMLDivElement>) {
    const mousePosition = this.getMousePosition(e);
    eventBus.emit(Events.ADD_SHAPE, mousePosition);
  }

  render() {
    const { shapes, mousePosition } = this.state;

    return (
      <div className={cls.canvas_wrapper}>
        <div
          draggable
          role="button"
          tabIndex={0}
          ref={this.canvasRef}
          className={cls.canvas}
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
          onClick={(e) => this.addShape(e)}
          onDragStart={(e) => this.handleDragStart(e)}
          onDragOver={(e) => this.handleDragOver(e)}
          onDragEnd={(e) => this.handleOnDragEnd(e)}
        >
          {shapes}
        </div>
      </div>
    );
  }
}
