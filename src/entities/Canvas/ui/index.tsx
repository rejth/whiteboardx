/* eslint-disable no-console */
import React from 'react';

import { eventBus, Events, store, IShape } from '../model';
import cls from './Canvas.module.scss';

interface ICanvasState {
  shapes: IShape[];
}

export class Canvas extends React.Component<unknown, ICanvasState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      shapes: [],
    };
  }

  componentDidMount() {
    this.setState({ shapes: store.shapes });

    store.subscribe(() => {
      this.setState({ shapes: store.shapes });
    });
  }

  handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    console.log('Drag Over:', e);
    e.preventDefault();
    return this;
  }

  handleDragStart(e: React.DragEvent<HTMLDivElement>) {
    console.log('Drag Start:', e);
    return this;
  }

  handleOnDrop(e: React.DragEvent<HTMLDivElement>) {
    console.log('Drop:', e);
    return this;
  }

  handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    console.log('Drag Enter:', e);
    return this;
  }

  mouseDown(e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) {
    console.log('Mouse Down:', e);
    eventBus.emit(Events.START, { x: 100, y: 100 });
    return this;
  }

  render() {
    const { shapes } = this.state;
    const selectedTool = shapes[0]?.type;

    return (
      <div className={cls.content_wrapper}>
        <div className={cls.scroll_wrapper}>
          <div className={cls.canvas_wrapper}>
            <div
              draggable
              role="button"
              tabIndex={0}
              className={cls.canvas}
              onKeyDown={this.mouseDown}
              onClick={this.mouseDown}
              onDragOver={this.handleDragOver}
              onDragStart={this.handleDragStart}
              onDrop={this.handleOnDrop}
              onDragEnter={this.handleDragEnter}
            >
              {selectedTool}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
