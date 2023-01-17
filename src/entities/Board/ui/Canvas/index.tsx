/* eslint-disable no-console */
import React, { RefObject } from 'react';

import { defaultRect, DND_GHOST_HIDING_IMAGE } from 'shared/constants';
import { Shape } from 'entities/Board/model/Shape';
import { IShape } from 'entities/Board/model/ShapeFactory';
import { eventBus, Events, store } from 'entities/Board/model';
import cls from './Canvas.module.scss';

interface ICanvasState {
  shapes: IShape[];
  mousePosition: { x: number; y: number };
}

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
          {shapes.map((shape) => (
            <Shape key={shape.uuid} settings={shape} />
          ))}
        </div>
      </div>
    );
  }
}
