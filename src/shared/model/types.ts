export interface IShapePolymorphicComponentProps {
  styles: React.CSSProperties;
  settings?: any;
  forwardedRef?: React.RefObject<HTMLDivElement>;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent<HTMLElement>) => void;
  onMouseMove?: (event: React.MouseEvent<HTMLElement>) => void;
  onDragStart?: (event: React.DragEvent<HTMLElement>) => void;
  onDragEnd?: (event: React.DragEvent<HTMLElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLElement>) => void;
  onResize?: (event: React.MouseEvent<HTMLElement>) => void;
}

export type ShapePolymorphicComponent = React.ElementType<IShapePolymorphicComponentProps>;

export type Coordinates = {
  x: number;
  y: number;
};

export type ChangeHandler = (...args: unknown[]) => void;
