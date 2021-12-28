import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

export default (props) => {
  let obj;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    obj = new Mover(200, 200, p5);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    obj.update(p5);
    obj.show(p5);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

class Mover {
  constructor(x, y, p5) {
    this.pos = p5.createVector(x, y, p5);
    this.vel = window.p5.Vector.random2D();
    this.vel.mult(p5.random(3));
  }
  update(p5) {
    let mouse = p5.createVector(p5.mouseX, p5.mouseY);
    this.acc = window.p5.Vector.sub(mouse, this.pos);
    this.acc.setMag(0.01);

    this.vel.add(this.acc);
    this.vel.limit(5);
    this.pos.add(this.vel);
  }

  show(p5) {
    p5.noStroke();
    p5.ellipse(this.pos.x, this.pos.y, 30);
  }
}
