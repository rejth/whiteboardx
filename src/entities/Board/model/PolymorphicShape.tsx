import React from 'react';

import { ShapePolymorphicComponent } from 'shared/model';
import { defaultRect } from 'shared/constants';

import { SelectableShape, Tools } from './ToolStore';
import { ISelection, IShape } from './ShapeFactory';
import { eventBus, Events } from './EventBus';

import { Note } from '../ui/Note';
import { TextArea } from '../ui/TextArea';
import { Text } from '../ui/Text';
import { Selection } from '../ui/Selection';

interface IPolymorphicShapeProps {
  settings: IShape | ISelection;
}

export interface IPolymorphicShapeForwardedRef {
  handleClickByShape: (e: MouseEvent) => void;
}

const shapes: Record<SelectableShape, ShapePolymorphicComponent | any> = {
  [Tools.NOTE]: Note,
  [Tools.AREA]: TextArea,
  [Tools.TEXT]: Text,
  [Tools.SELECT]: Selection,
};

export const PolymorphicShape = React.forwardRef(
  (props: IPolymorphicShapeProps, ref: React.Ref<IPolymorphicShapeForwardedRef>) => {
    const { settings } = props;

    const shapeRef = React.createRef<HTMLDivElement>();
    const rect: DOMRect = shapeRef?.current?.getBoundingClientRect() || defaultRect;
    let isMousePressed = false;

    const styles: React.CSSProperties = {
      ...settings.styles,
      transform: `translate(${settings.x}px, ${settings.y}px)`,
    };

    const handleClickOutside = ({ target }: MouseEvent) => {
      if (shapeRef?.current !== target && !shapeRef?.current?.contains(target as Node)) {
        eventBus.emit(Events.CLEAR_SELECTION);
      } else if (shapeRef?.current === target || shapeRef?.current?.contains(target as Node)) {
        eventBus.emit(Events.SELECT_SHAPE, settings.uuid, { x: settings.x, y: settings.y });
      }
    };

    React.useImperativeHandle(ref, () => ({
      handleClickByShape: (e: MouseEvent) => handleClickOutside(e),
    }));

    const Shape = shapes[settings.type];
    if (!Shape) return null;

    const handleResize = () => rect;

    const handleDragStart = () => {
      isMousePressed = true;
    };

    const handleDragEnd = () => {
      isMousePressed = false;
    };

    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
      if (!isMousePressed) return;

      eventBus.emit(Events.MOVE_SHAPE, settings.uuid, {
        x: e.clientX,
        y: e.clientY,
      });
    };

    return (
      <Shape
        key={settings.uuid}
        ref={shapeRef}
        settings={settings}
        styles={styles}
        onDragStart={() => handleDragStart()}
        onDragOver={(e: React.DragEvent<HTMLElement>) => handleDragOver(e)}
        onDragEnd={() => handleDragEnd()}
        onResize={() => handleResize()}
      />
    );
  },
);

PolymorphicShape.displayName = 'PolymorphicShape';
