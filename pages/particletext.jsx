import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Particletext = (props) => {
  let font;
  let vehicles = [];

  let windowSize;
let windowOriginSize;
let setRatio;

  const preload = (p5) => {
    font = p5.loadFont("fonts/RobotoCondensed-BoldItalic.ttf");
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    windowOriginSize = p5.createVector(1667, 900);
    windowSize = p5.createVector(p5.width, p5.height);
    setRatio = windowSize.x / windowOriginSize.x

    let points = font.textToPoints("ubisoft goes steamworks bye bye always on drm", 10, p5.windowHeight/2, 86 * setRatio,
    {sampleFactor: 0.15 });

    for (let i = 0; i < points.length; i++) {
      let pt = points[i];
      let vehicle = new Vehicle(p5, pt.x, pt.y, 1.5 * setRatio);
      vehicles.push(vehicle);
    }
  };

  const draw = (p5) => {
    p5.background(50, 50, 50);
    for (let i = 0; i < vehicles.length; i++) {
      let v = vehicles[i];
      v.behaviors(p5);
      v.update();
      v.show(p5);
    }
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
};

export default Particletext;

function Vehicle(p5, x, y, r) {
  this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
  this.target = p5.createVector(x, y);
  // this.vel = p5.createVector();
  this.vel = window.p5.Vector.random2D();

  this.acc = p5.createVector();
  this.r = r;
  this.maxSpeed = 15;
  this.maxForce = 0.5;
}

Vehicle.prototype.behaviors = function (p5) {
  let arrive = this.arrive(p5, this.target);
  let mouse = p5.createVector(p5.mouseX, p5.mouseY);
  let flee = this.flee(p5, mouse);

  arrive.mult(1);
  flee.mult(3);
  this.applyForce(arrive);
  this.applyForce(flee);
};

Vehicle.prototype.applyForce = function (f) {
  this.acc.add(f);
};

Vehicle.prototype.update = function () {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
};

Vehicle.prototype.show = function (p5) {
  p5.stroke(255);
  // p5.strokeWeight(10);
  // p5.rect(this.pos.x, this.pos.y,0.01,0.01)
  // p5.point(this.pos.x, this.pos.y);
  p5.push();

  p5.translate(this.pos.x, this.pos.y);
  p5.rotate(this.vel.heading());
  p5.triangle(-this.r, -this.r / 2, -this.r, this.r/2, this.r, 0);
  p5.pop();
};

Vehicle.prototype.arrive = function (p5, target) {
  let desired = window.p5.Vector.sub(target, this.pos);
  let d = desired.mag();
  let speed = this.maxSpeed;
  if (d < 100) {
    speed = p5.map(d, 0, 100, 0, this.maxSpeed);
  }

  desired.setMag(speed);
  let steer = window.p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
};

Vehicle.prototype.seek = function (target) {
  let desired = window.p5.Vector.sub(target, this.pos);
  desired.setMag(this.maxSpeed);
  let steer = window.p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
};

Vehicle.prototype.flee = function (p5, target) {
  let desired = window.p5.Vector.sub(target, this.pos);
  let d = desired.mag();
  if (d < 50) {
    desired.setMag(this.maxSpeed);
    desired.mult(-1);
    let steer = window.p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } else {
    return p5.createVector(0, 0);
  }
};
