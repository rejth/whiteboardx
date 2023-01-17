export interface IShapePolymorphicComponentProps {
  styles: React.CSSProperties;
  onMove?: () => void;
  onResize?: () => void;
}

export type ShapePolymorphicComponent = React.ElementType<IShapePolymorphicComponentProps> | null;

export type Coordinates = {
  x: number;
  y: number;
};

export type ChangeHandler = (...args: unknown[]) => void;
