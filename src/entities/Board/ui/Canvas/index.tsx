import React, { RefObject } from 'react';

import { defaultRect, DND_GHOST_HIDING_IMAGE } from 'shared/constants';
import { Coordinates } from 'shared/model';
import { Shape } from 'entities/Board/model/Shape';
import { ISelection, IShape } from 'entities/Board/model/ShapeFactory';
import { eventBus, Events, store, Tool, Tools, toolStore } from 'entities/Board/model';
import cls from './Canvas.module.scss';
import { Selection } from '../Selection';

interface ICanvasState {
  tool: Tool;
  shapes: IShape[];
  selected: ISelection[];
  mousePosition: Coordinates;
}

export class Canvas extends React.Component<unknown, ICanvasState> {
  readonly canvasRef: RefObject<HTMLDivElement> | null = null;

  rect: DOMRect = defaultRect;

  isMousePressed = false;

  constructor(props: unknown) {
    super(props);

    this.canvasRef = React.createRef<HTMLDivElement>();
    this.isMousePressed = false;
    this.state = {
      shapes: [],
      selected: [],
      tool: Tools.PAN,
      mousePosition: { x: 0, y: 0 },
    };
  }

  componentDidMount() {
    const currentState = {
      shapes: store.shapes,
      selected: store.selectedShapes,
      tool: store.tool,
      mousePosition: store.mousePosition.diff,
    };

    this.setState(currentState);
    this.rect = this.canvasRef?.current?.getBoundingClientRect() || defaultRect;

    store.subscribe(() => {
      this.setState((prevState) => ({
        ...prevState,
        shapes: store.shapes,
        selected: store.selectedShapes,
        mousePosition: store.mousePosition.diff,
      }));
    });

    toolStore.subscribe(() => {
      this.setState((prevState) => ({
        ...prevState,
        tool: store.tool,
      }));
    });
  }

  handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer?.setDragImage(DND_GHOST_HIDING_IMAGE, 0, 0);
    this.mouseDown(e);
  }

  handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    if (!this.isMousePressed) return;
    const mousePosition = this.getMousePosition(e);
    eventBus.emit(Events.DRAG_CANVAS, mousePosition);
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
    const { tool } = this.state;
    if (tool === Tools.PAN) return;

    const mousePosition = this.getMousePosition(e);
    eventBus.emit(Events.ADD_SHAPE, mousePosition);
  }

  render() {
    const { shapes, selected, mousePosition } = this.state;
    const shapeList = shapes.map((shape) => <Shape key={shape.uuid} settings={shape} />);

    const selectedList = selected.map((selection) => {
      const styles: React.CSSProperties = {
        ...selection.styles,
        transform: `translate(${selection.x}px, ${selection.y}px)`,
      };
      return <Selection key={selection.uuid} styles={styles} />;
    });

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
          {shapeList}
          {selectedList}
        </div>
      </div>
    );
  }
}
