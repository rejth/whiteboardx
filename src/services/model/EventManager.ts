export class EventManager {
  renderer: any;

  constructor(renderManager: any) {
    this.renderer = renderManager;
  }

  createShape() {
    this.renderer.fillRect();
  }

  deleteShape() {
    // redraw canvas
    return this;
  }

  moveShape() {
    // redraw canvas
    return this;
  }

  moveStage() {
    // redraw canvas
    return this;
  }

  resizeShape() {
    // redraw canvas
    return this;
  }
}
