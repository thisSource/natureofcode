import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

export default (props) => {
  let particle = [];
  let gravity;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(800, 800).parent(canvasParentRef);
    gravity = p5.createVector(0.03, 0.05);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    gravity = p5.createVector(p5.random(-0.03, 0.03), 0.05);

    for (let i = 0; i < 10; i++) {
      particle.push(new Particle(p5, p5.mouseX, p5.mouseY, 4));
    }

    for (let i = 0; i < particle.length; i++) {
      particle[i].applyForce(gravity);
      particle[i].update();
        // particle[i].edges(p5);
      particle[i].show(p5);
    }

    for (let i = particle.length - 1; i >= 0; i--) {
      if (particle[i].finished()) {
        particle.splice(i, 1);
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

class Particle {
  constructor(p5, xPos, yPos, r) {
    this.pos = p5.createVector(xPos, yPos);
    this.vel = window.p5.Vector.random2D();
    this.vel.mult(1);
    this.acc = p5.createVector(0, 0);
    this.r = r;
    this.lifetime = 355;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  finished() {
    return this.lifetime < 0;
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);

    this.lifetime -= 1;
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
    p5.noStroke();
    p5.fill(0, this.lifetime);
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
