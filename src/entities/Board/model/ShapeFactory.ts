import { v4 as uuid } from 'uuid';

import { Coordinates } from 'shared/model';
import { Shape, ShapeTool, Tools } from './ToolStore';

const dimensions: Record<Shape, { width: number; height: number }> = {
  [Tools.NOTE]: { width: 5, height: 5 },
  [Tools.AREA]: { width: 15, height: 10 },
  [Tools.TEXT]: { width: 2.5, height: 2.5 },
};

export interface IShape {
  uuid: string;
  type: ShapeTool;
  x: number;
  y: number;
  width: number;
  height: number;
  styles: React.CSSProperties;
  color?: string;
  form?: string;
}

export abstract class ShapeFactory {
  static createShape(type: Shape, { x, y }: Coordinates): IShape {
    const styles: React.CSSProperties = {
      position: 'absolute',
      top: '0',
      left: '0',
      width: `${dimensions[type].width}em`,
      height: `${dimensions[type].height}em`,
      zIndex: '999750',
      transform: `translate(${x}px, ${y}px)`,
    };

    return {
      uuid: uuid(),
      width: dimensions[type].width,
      height: dimensions[type].height,
      type,
      x,
      y,
      styles,
    };
  }

  static createSelectionControl(forType: Shape, { x, y }: Coordinates): IShape {
    const styles: React.CSSProperties = {
      top: '-0.25rem',
      left: '-0.25rem',
      width: `calc(${dimensions[forType].width}em + 0.5rem)`,
      height: `calc(${dimensions[forType].height}em + 0.5rem)`,
      transform: `translate(${x}px, ${y}px)`,
    };

    return {
      uuid: uuid(),
      width: dimensions[forType].width,
      height: dimensions[forType].height,
      type: Tools.SELECT,
      x,
      y,
      styles,
    };
  }
}
