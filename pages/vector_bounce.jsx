import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const VectorBounce = props => {
  let ball1;
  let ball2;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(150, 150, 150);
    ball1 = new Ball(p5.width / 2, p5.height / 2, 50, p5);
    ball2 = new Ball(p5.width / 3, p5.height / 3, 50, p5);
  };

  const draw = (p5) => {
    ball1.update(p5);
    ball1.show(p5);
    ball1.update(p5);
    ball2.show(p5);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default VectorBounce;

class Ball {
  constructor(x, y, r, p5) {
    this.pos = p5.createVector(x, y);
    this.radius = r
  }

  update(p5) {}

  show(p5) {
    p5.ellipse(this.pos.x, this.pos.y, this.radius);
  }
}
