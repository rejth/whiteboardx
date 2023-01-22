import { v4 as uuid } from 'uuid';

import { Coordinates } from 'shared/model';
import { SelectableShape, ShapeType, Tools } from './ToolStore';

const dimensionsMap: Record<ShapeType, { width: number; height: number }> = {
  [Tools.NOTE]: { width: 5, height: 5 },
  [Tools.AREA]: { width: 15, height: 10 },
  [Tools.TEXT]: { width: 2.5, height: 2.5 },
};

export interface IShape {
  uuid: string;
  type: SelectableShape;
  x: number;
  y: number;
  width: number;
  height: number;
  styles: React.CSSProperties;
  color?: string;
  form?: string;
}

export interface ISelection {
  uuid: string;
  type: Tools.SELECT;
  x: number;
  y: number;
  width: number;
  height: number;
  styles: React.CSSProperties;
  parentShapeUuid?: string;
  form?: string;
}

export abstract class ShapeFactory {
  static createShape(id: string, type: ShapeType, { x, y }: Coordinates): IShape {
    const styles: React.CSSProperties = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: `${dimensionsMap[type].width}em`,
      height: `${dimensionsMap[type].height}em`,
      zIndex: '999750',
      transform: `translate(${x}px, ${y}px)`,
    };

    return {
      uuid: id,
      width: dimensionsMap[type].width,
      height: dimensionsMap[type].height,
      type,
      styles,
      x,
      y,
    };
  }

  static createSelection(parentId: string, forType: ShapeType, { x, y }: Coordinates): ISelection {
    const styles: React.CSSProperties = {
      top: '-0.25rem',
      left: '-0.25rem',
      width: `calc(${dimensionsMap[forType].width}em + 0.5rem)`,
      height: `calc(${dimensionsMap[forType].height}em + 0.5rem)`,
      transform: `translate(${x}px, ${y}px)`,
    };

    return {
      uuid: uuid(),
      type: Tools.SELECT,
      width: dimensionsMap[forType].width,
      height: dimensionsMap[forType].height,
      parentShapeUuid: parentId,
      styles,
      x,
      y,
    };
  }
}
