export interface IShapePolymorphicComponentProps {
  styles: React.CSSProperties;
  onMouseDown?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onMouseUp?: () => void;
  onMouseMove?: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onResize?: (event: React.MouseEvent<HTMLSpanElement>) => void;
}

export type ShapePolymorphicComponent = React.ElementType<IShapePolymorphicComponentProps> | null;

export type Coordinates = {
  x: number;
  y: number;
};

export type ChangeHandler = (...args: unknown[]) => void;
