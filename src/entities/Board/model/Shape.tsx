/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable no-console */
import React, { RefObject } from 'react';

import { ShapePolymorphicComponent } from 'shared/model';
import { defaultRect } from 'shared/constants';

import { ShapeTool, Tools } from './ToolStore';
import { eventBus, Events } from './EventBus';
import { IShape } from './ShapeFactory';

import { Note } from '../ui/Note';
import { TextArea } from '../ui/TextArea';
import { Text } from '../ui/Text';
import { Selection } from '../ui/Selection';

const shapes: Record<ShapeTool, ShapePolymorphicComponent> = {
  [Tools.NOTE]: Note,
  [Tools.AREA]: TextArea,
  [Tools.TEXT]: Text,
  [Tools.SELECT]: Selection,
};

interface IShapeState {
  mousePosition: { x: number; y: number };
}

interface IShapeProps {
  settings: IShape | null;
}

export class Shape extends React.Component<IShapeProps, IShapeState> {
  shapeRef: RefObject<HTMLSpanElement> | null = null;

  rect: DOMRect = defaultRect;

  isMousePressed = false;

  constructor(props: IShapeProps) {
    super(props);

    this.shapeRef = React.createRef<HTMLSpanElement>();
    this.isMousePressed = false;
    this.state = {
      mousePosition: { x: 0, y: 0 },
    };
  }

  componentDidMount() {
    this.setState({ mousePosition: { x: 0, y: 0 } });
    this.rect = this.shapeRef?.current?.getBoundingClientRect() || defaultRect;
  }

  onMouseDown(e: React.MouseEvent<HTMLSpanElement>) {
    this.isMousePressed = true;
    const mousePosition = this.getMousePosition(e);
    eventBus.emit(Events.START, mousePosition);
  }

  onMouseUp(e: React.MouseEvent<HTMLSpanElement>) {
    this.isMousePressed = false;
    const mousePosition = this.getMousePosition(e);
    eventBus.emit(Events.END, mousePosition);
  }

  onMouseMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (!this.isMousePressed) return;
    const mousePosition = this.getMousePosition(e);
    eventBus.emit(Events.END, mousePosition);
  }

  onResize(e: MouseEvent) {
    console.log('onResize: ', e);
  }

  getMousePosition(e: React.MouseEvent<HTMLSpanElement>) {
    return {
      x: e.clientX - this.rect.left,
      y: e.clientY - this.rect.top,
    };
  }

  render() {
    const { mousePosition } = this.state;
    console.log('🚀 ~ mousePosition', mousePosition);

    const { settings } = this.props;
    if (!settings) return null;

    const styles: React.CSSProperties = {
      ...settings.styles,
      // transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
    };

    const RenderedShape = shapes[settings.type];
    if (!RenderedShape) return null;

    return <RenderedShape key={settings.uuid} styles={styles} />;
  }
}
