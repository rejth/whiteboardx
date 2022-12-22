export class RenderManager {
  ctx: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
  }

  fillRect() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(20, 10, 150, 100);
  }

  drawGrid() {
    // draw a grid
    return this;
  }
}
