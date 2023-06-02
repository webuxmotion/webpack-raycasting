import { drawLineFromLineObj } from ".";
import getIntersectionPoint from "./getIntersectionPoint";

class Camera {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.rays = [];
    this.count = 0;
    this.looks = 0;
    for (let i = 0; i < 40; i += 1) {
      this.count++;
      const p1 = {
        x: 0,
        y: 0
      }

      const p2 = {
        x: Math.cos(Math.PI * 2 / 360 * i) + p1.x,
        y: Math.sin(Math.PI * 2 / 360 * i) + p1.y
      }
      this.rays.push({ a: p1, b: p2 });
    }
  }

  lookAt(walls) {
    this.looks = 0;
    for (let ray of this.rays) {
      let closestPoint = null;
      let dist = Infinity;

      for (let wall of walls) {
        const a = {...ray.a};
        const b = {...ray.b};
  
        a.x += this.x;
        a.y += this.y;
        b.x += this.x;
        b.y += this.y;
  
        const newRay = { a, b };
        this.looks++;
        const ip = getIntersectionPoint(newRay, wall);
  
        if (ip) {
          const newDist = Math.hypot(a.x - ip.x, a.y - ip.y);
          if (newDist < dist) {
            dist = newDist;
            closestPoint = ip;
          }
        }
      }

      if (closestPoint) {
        const a = {
          x: this.x,
          y: this.y
        }
        const b = closestPoint;
        const line = { a, b };
        ctx.save();
        ctx.globalAlpha = 0.1;
        drawLineFromLineObj(line);
        ctx.restore();
      }
    }
  }
}

export default Camera;