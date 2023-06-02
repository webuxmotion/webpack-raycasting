
import Camera from './Camera';
import Fps from './Fps';
import './styles/main.scss';

const canvas = document.querySelector('canvas');
canvas.height = innerHeight;
canvas.width = innerWidth;
const c = canvas.getContext("2d");
const ctx = c;
let mouseX = 0;
let mouseY = 0;
window.ctx = ctx;
window.c = c;

ctx.strokeStyle = "white";

let camera = new Camera(200, 200);
const fps = new Fps({ canvasWidth: canvas.width });
const walls = [];
for (let i = 0; i < 10; i++) {
  const line = { 
    a: { x: Math.random() * canvas.width, y: Math.random() * canvas.height }, 
    b: { x: Math.random() * canvas.width, y: Math.random() * canvas.height }
  };
  walls.push(line);
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  camera.lookAt(walls);
  camera.x = mouseX;
  camera.y = mouseY;

  fps.update({ c });
}

animate()

export function drawLineFromLineObj(line) {
  drawLine(line.a.x, line.a.y, line.b.x, line.b.y);
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

export function drawCircle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

addEventListener('mousemove', ({ clientX, clientY }) => {
  mouseX = clientX;
  mouseY = clientY;
});
