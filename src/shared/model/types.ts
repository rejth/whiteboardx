export interface IShapePolymorphicComponentProps {
  styles: React.CSSProperties;
}

export type ShapePolymorphicComponent = React.ElementType<IShapePolymorphicComponentProps> | null;
