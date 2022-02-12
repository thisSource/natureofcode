import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Seektarget = (props) => {
  let pursuer;
  let target;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    pursuer = new Vehicle(p5, 100, 100);
    target = new Target(p5, 200, 200);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);

    let steering = pursuer.pursue(p5, target);
    pursuer.applyForce(steering);

    pursuer.update(p5);
    pursuer.show(p5);

    target.edges(p5);
    target.update(p5);
    target.show(p5);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Seektarget;

class Vehicle {
  constructor(p5, xPos, yPos) {
    this.pos = p5.createVector(xPos, yPos);
    this.vel = p5.createVector(0, 0);
    this.acc = p5.createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.3;
    this.r = 20;
  }

  pursue(p5, vehicle) {
    let target = vehicle.pos.copy();
    let prediction = vehicle.vel.copy()
    prediction.mult(10)
    target.add(prediction)

    p5.fill(0,255,0)
    p5.circle(target.x, target.y, 16)
    return this.seek(target);
  }

  seek(target) {
    let force = window.p5.Vector.sub(target, this.pos);
    force.setMag(this.maxSpeed);
    force.sub(this.vel);
    force.limit(this.maxForce);
    return force;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  finished() {
    return this.lifetime < 0;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  edges(p5) {
    if (this.pos.x > p5.width - this.r || this.pos.x < 0 + this.r) {
      this.vel.x *= -1;
    }
    if (this.pos.y > p5.height - this.r || this.pos.y + this.r < 0) {
      this.vel.y *= -1;
    }
  }

  show(p5) {
    p5.stroke(255);
    p5.strokeWeight(2);
    p5.fill(255);
    p5.push();
    p5.translate(this.pos.x, this.pos.y);
    p5.rotate(this.vel.heading());
    p5.triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    p5.pop();
  }
}

class Target extends Vehicle {
  constructor(p5, xPos, yPos) {
    super(p5, xPos, yPos);
    this.vel = p5.createVector(5, 2);
  }
  show(p5) {
    p5.stroke(255);
    p5.strokeWeight(2);
    p5.fill(255, 0, 0);
    p5.push();
    p5.translate(this.pos.x, this.pos.y);
    p5.ellipse(0, 0, this.r * 2);
    p5.pop();
  }
}
