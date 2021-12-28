import React from "react";
import dynamic from "next/dynamic";

const Sketch = dynamic(
  () =>
    import("react-p5").then((mod) => {
      require("p5/lib/addons/p5.sound");
      return mod.default;
    }),
  {
    ssr: false
  }
);

let gongB, reverb, delay, amp, vol, strokeSize;

export default (props) => {
  let moverA;
  let moverB;

  const preload = (p5) => {
    p5.soundFormats("mp3", "wav", "ogg");
    gongB = p5.loadSound("audio/bowl.wav");
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    moverA = new Mover(200, 200, 1, p5);
    moverB = new Mover(600, 200, 2, p5);

    reverb = new window.p5.Reverb();
    amp = new window.p5.Amplitude();
  };

  const draw = (p5) => {
    p5.background(255, 214, 255);

    vol = amp.getLevel() * 20;
    strokeSize = amp.getLevel() * 30;

    let gravity = p5.createVector(0, 0.02);
    let wind = p5.createVector(0.01, 0);
    let weightA = window.p5.Vector.mult(gravity, moverA.mass);
    let weightB = window.p5.Vector.mult(gravity, moverB.mass);

    moverA.applyForce(weightA);
    moverA.applyForce(wind);
    moverA.edges(p5);
    moverA.update();
    moverA.collide(moverB, p5, reverb, delay);
    moverA.show(p5, 255, strokeSize, 50 * vol, 50);

    moverB.applyForce(weightB);
    moverB.applyForce(wind);
    moverB.edges(p5);
    moverB.update();
    moverB.collide(moverA, p5, reverb, delay);
    moverB.show(p5, 20, strokeSize, 50 * vol, 200);
  };

  return (
    <div>
      <Sketch preload={preload} setup={setup} draw={draw} />
    </div>
  );
};

class Mover {
  constructor(x, y, m, p5) {
    this.pos = p5.createVector(x, y);
    this.vel = p5.createVector(0, 0);
    this.acc = p5.createVector(0, 0);
    this.mass = m;
    this.r = p5.sqrt(this.mass) * 70;
  }

  applyForce(force) {
    force = window.p5.Vector.div(force, this.mass);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  collide(other, p5, reverb, delay) {
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
      gongB.rate(p5.random(0.1, 0.2));
      gongB.amp(0.2, 0.2);
      gongB.play();
    }
  }

  edges(p5) {
    if (this.pos.x > p5.width - this.r) {
      this.pos.x = p5.width - this.r;
      this.vel.x *= -1;
    } else if (this.pos.x < 0 + this.r) {
      this.pos.x = 0 + this.r;
      this.vel.x *= -1;
    }
    if (this.pos.y > p5.height - this.r) {
      this.pos.y = p5.height - this.r;
      this.vel.y *= -1;
    } else if (this.pos.y < +this.r) {
      this.vel.y *= -1;
    }
  }

  show(p5, color, strokeW, s, strokecolor) {
    p5.noStroke();
    p5.fill(color);
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
    p5.stroke(strokecolor);
    p5.strokeWeight(strokeW);
    p5.noFill();
    p5.ellipse(this.pos.x, this.pos.y, (this.r - s * 5) * 2);
  }
}
