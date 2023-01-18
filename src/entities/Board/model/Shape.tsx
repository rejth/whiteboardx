/* eslint-disable react/no-unused-class-component-methods */
/* eslint-disable no-console */
import React, { RefObject } from 'react';

import { Coordinates, ShapePolymorphicComponent } from 'shared/model';
import { defaultRect } from 'shared/constants';

import { ShapeTool, Tools } from './ToolStore';
import { IShape } from './ShapeFactory';

import { Note } from '../ui/Note';
import { TextArea } from '../ui/TextArea';
import { Text } from '../ui/Text';
import { Selection } from '../ui/Selection';
import { eventBus, Events } from './EventBus';

const shapes: Record<ShapeTool, ShapePolymorphicComponent> = {
  [Tools.NOTE]: Note,
  [Tools.AREA]: TextArea,
  [Tools.TEXT]: Text,
  [Tools.SELECT]: Selection,
};

interface IShapeState {
  mousePosition: Coordinates;
}

interface IShapeProps {
  settings: IShape;
}

export class Shape extends React.Component<IShapeProps, IShapeState> {
  readonly shapeRef: RefObject<HTMLSpanElement> | null = null;

  rect: DOMRect = defaultRect;

  isMousePressed = false;

  startPoint: Coordinates = { x: 0, y: 0 };

  constructor(props: IShapeProps) {
    super(props);

    this.shapeRef = React.createRef<HTMLSpanElement>();
    this.isMousePressed = false;
  }

  componentDidMount() {
    this.rect = this.shapeRef?.current?.getBoundingClientRect() || defaultRect;
  }

  onMouseDown(e: React.MouseEvent<HTMLSpanElement>) {
    this.isMousePressed = true;
    this.startPoint = this.getMousePosition(e);
  }

  onMouseUp() {
    this.isMousePressed = false;
  }

  onMouseMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (!this.isMousePressed) return;
    const { settings } = this.props;

    eventBus.emit(Events.MOVE_SHAPE, settings.uuid, {
      x: e.clientX - this.startPoint.x,
      y: e.clientY - this.startPoint.y,
    });
  }

  getMousePosition(e: React.MouseEvent<HTMLSpanElement>) {
    return {
      x: e.clientX - this.rect.left,
      y: e.clientY - this.rect.top,
    };
  }

  render() {
    const { settings } = this.props;

    const styles: React.CSSProperties = {
      ...settings.styles,
      transform: `translate(${settings.x}px, ${settings.y}px)`,
    };

    const ThisShape = shapes[settings.type];
    if (!ThisShape) return null;

    return (
      <ThisShape
        key={settings.uuid}
        styles={styles}
        onMouseDown={(e) => this.onMouseDown(e)}
        onMouseUp={() => this.onMouseUp()}
        onMouseMove={(e) => this.onMouseMove(e)}
      />
    );
  }
}
