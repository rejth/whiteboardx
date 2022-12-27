import React from 'react';

import { eventBus, Events, store } from '../model';
import cls from './Canvas.module.scss';

interface ICanvasState {
  data: any;
}

export class Canvas extends React.Component<any, ICanvasState> {
  constructor(props: any) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ data: store.shapes });

    store.subscribe(() => {
      this.setState({ data: store.shapes });
    });
  }

  mouseDown() {
    eventBus.emit(Events.START, {});
    return this;
  }

  render() {
    const { data } = this.state;
    return (
      <button
        type="button"
        className={cls.Canvas}
        onKeyDown={this.mouseDown}
        onClick={this.mouseDown}
      >
        {data[0]}
      </button>
    );
  }
}
