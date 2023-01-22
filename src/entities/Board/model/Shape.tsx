import React, { RefObject } from 'react';

import { Coordinates, ShapePolymorphicComponent } from 'shared/model';
import { defaultRect } from 'shared/constants';

import { SelectableShape, Tools } from './ToolStore';
import { ISelection, IShape } from './ShapeFactory';
import { eventBus, Events } from './EventBus';

import { Note } from '../ui/Note';
import { TextArea } from '../ui/TextArea';
import { Text } from '../ui/Text';
import { Selection } from '../ui/Selection';

const shapes: Record<SelectableShape, ShapePolymorphicComponent> = {
  [Tools.NOTE]: Note,
  [Tools.AREA]: TextArea,
  [Tools.TEXT]: Text,
  [Tools.SELECT]: Selection,
};

interface IShapeState {
  mousePosition: Coordinates;
}

interface IShapeProps {
  settings: IShape | ISelection;
}

export class Shape extends React.Component<IShapeProps, IShapeState> {
  readonly shapeRef: RefObject<HTMLDivElement> | null = null;

  rect: DOMRect = defaultRect;

  isMousePressed = false;

  constructor(props: IShapeProps) {
    super(props);

    this.shapeRef = React.createRef<HTMLDivElement>();
    this.isMousePressed = false;
  }

  componentDidMount() {
    this.rect = this.shapeRef?.current?.getBoundingClientRect() || defaultRect;
  }

  handleResize() {
    return this.rect;
  }

  handleDragStart() {
    this.isMousePressed = true;
  }

  handleDragEnd() {
    this.isMousePressed = false;
  }

  handleDragOver(e: React.DragEvent<HTMLElement>) {
    if (!this.isMousePressed) return;
    const { settings } = this.props;

    eventBus.emit(Events.MOVE_SHAPE, settings.uuid, {
      x: e.clientX,
      y: e.clientY,
    });
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
        onDragStart={() => this.handleDragStart()}
        onDragOver={(e: React.DragEvent<HTMLElement>) => this.handleDragOver(e)}
        onDragEnd={() => this.handleDragEnd()}
        onResize={() => this.handleResize()}
      />
    );
  }
}
