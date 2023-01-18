export interface IShapePolymorphicComponentProps {
  styles: React.CSSProperties;
  onDragStart?: (event: React.DragEvent<HTMLElement>) => void;
  onDragEnd?: () => void;
  onDragOver?: (event: React.DragEvent<HTMLElement>) => void;
  onResize?: (event: React.MouseEvent<HTMLElement>) => void;
}

export type ShapePolymorphicComponent = React.ElementType<IShapePolymorphicComponentProps> | null;

export type Coordinates = {
  x: number;
  y: number;
};

export type ChangeHandler = (...args: unknown[]) => void;
