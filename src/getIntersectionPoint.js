function getIntersectionPoint(line1, line2) {
  const x1 = line2.a.x;
  const y1 = line2.a.y;
  const x2 = line2.b.x;
  const y2 = line2.b.y;

  const x3 = line1.a.x;
  const y3 = line1.a.y;
  const x4 = line1.b.x;
  const y4 = line1.b.y;

  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  if (den === 0) {
    return null;
  }

  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

  if (t > 0 && t < 1 && u > 0) {
    //if (true) {
    const point = {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1)
    };

    return point;
  }

  return null;
}

export default getIntersectionPoint;