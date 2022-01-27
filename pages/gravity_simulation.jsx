import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const GravitySimulation = props => {
  let ball;
  let cnv;

  const setup = (p5, canvasParentRef) => {
    cnv = p5.createCanvas(400, 400).parent(canvasParentRef);
    ball = new Ball(200, 200, 40, p5);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    let gravity = p5.createVector(0, 0.096);
    let wind = p5.createVector(1, 0);

    cnv.mousePressed(function ap() {
      ball.applyForce(wind);
    });

    ball.applyForce(gravity);

    ball.update(p5);
    ball.edges(p5);
    ball.show(p5);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default GravitySimulation;

class Ball {
  constructor(x, y, r, p5) {
    this.pos = p5.createVector(x, y);
    this.r = r;
    this.vel = p5.createVector(0, 0);
    this.acc = p5.createVector(0, 0);
  }

  update(p5) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  edges(p5) {
    if (this.pos.y >= p5.height - this.r) {
      this.vel.y *= -1;
    }
    if (this.pos.x >= p5.width - this.r || this.pos.x <= 0 + this.r) {
      this.vel.x *= -1;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show(p5) {
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
