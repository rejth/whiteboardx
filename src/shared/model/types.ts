export interface IShapePolymorphicComponentProps {
  styles: React.CSSProperties;
  onMove?: () => void;
  onResize?: () => void;
}

export type ShapePolymorphicComponent = React.ElementType<IShapePolymorphicComponentProps> | null;
