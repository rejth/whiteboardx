/* eslint-disable no-console */
import React from 'react';

import { eventBus, Events, store } from '../../model';
import cls from './Canvas.module.scss';

interface ICanvasState {
  shapes: React.ReactElement[];
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
    eventBus.emit(Events.START, { x: 59.06, y: 10.87 });
    return this;
  }

  render() {
    const { shapes } = this.state;

    return (
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
          {shapes}
        </div>
      </div>
    );
  }
}
