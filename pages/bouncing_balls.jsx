import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const BouncingBalls = props => {
  let ball = [];
  let cnv;
  const setup = (p5, canvasParentRef) => {
    cnv = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasParentRef);
    for (let i = 0; i < 300; i++) {
      ball.push(
        new Ball(p5.random(0, p5.width), p5.random(0, p5.height), 5, p5)
      );
    }
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    let gravity = p5.createVector(0, 0.05);
    let wind = p5.createVector(0.01, 0);
    for (let i = 0; i < ball.length; i++) {
      // ball[i].applyForce(wind);
      // ball[i].applyForce(gravity);
      ball[i].update(p5);
      ball[i].edges(p5);
      ball[i].show(p5);
    }

    for (let i = 0; i < ball.length; i++) {
      for (let j = 0; j < i; j++) {
        ball[i].collide(ball[j], p5);
      }
    }
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default BouncingBalls;

class Ball {
  constructor(x, y, r, p5) {
    this.pos = p5.createVector(x, y);
    this.r = r;
    this.vel = p5.createVector(p5.random(0.8, 1.1), p5.random(1.7, 1.2));
    this.acc = p5.createVector(0, 0);
    this.color = 0
  }

  update(p5) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    // this.acc.set(0, 0);
  }

  collide(other, p5) {
    if (other == this) {
      return;
    }
    let relative = window.p5.Vector.sub(other.pos, this.pos);
    let dist = relative.mag() - (this.r + other.r);
    if (dist < 0) {
      let movement = relative.copy().setMag(Math.abs(dist / 2));
      this.pos.sub(movement);
      other.pos.add(movement);

      let thisToOtherNormal = relative.copy().normalize();
      let approachSpeed =
        this.vel.dot(thisToOtherNormal) + -other.vel.dot(thisToOtherNormal);
      let approachVector = thisToOtherNormal.copy().setMag(approachSpeed);
      this.vel.sub(approachVector);
      other.vel.add(approachVector);
    }
  }

  edges(p5) {
    if (this.pos.y >= p5.height - this.r || this.pos.y <= 0 + this.r) {
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
    p5.noStroke();
    p5.fill(this.color)
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
