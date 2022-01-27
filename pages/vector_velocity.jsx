import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

let vel;
let obj = [];

const VectorVelocity = props => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    for (let i = 0; i < 100; i++) {
      obj.push(
        new Obj(100 + i * p5.random(0, 10), 200 + i * p5.random(0, 10), p5)
      );
    }
    vel = 3;
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    for (let i = 0; i < obj.length; i++) {
      obj[i].update(vel, p5);
      obj[i].show(p5);
    }
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default VectorVelocity;

class Obj {
  constructor(x, y, p5) {
    this.pos = p5.createVector(x, y);
    this.vel = p5.createVector(1, 1.2);
    this.width = p5.width;
    this.height = p5.height;
  }

  update(p5) {
    this.pos.add(this.vel);
    if (this.pos.x > this.width || this.pos.x < 0) {
      this.vel.x *= -1;
    }

    if (this.pos.y > this.height || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

  show(p5) {
    p5.ellipse(this.pos.x, this.pos.y, 20);
  }
}
