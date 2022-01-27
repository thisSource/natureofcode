import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Gravitationalattractionandangles2 = props => {
  let movers = [];
  let attractor;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

    for (let i = 0; i < 500; i++) {
      let x = p5.random(p5.width / 2 - 300, p5.width / 2 + 300);
      let y = p5.random(p5.height / 2 - 300, p5.height / 2 + 300);
      let m = p5.random(5, 25);
      movers[i] = new Mover(p5, x, y, m);
    }
    attractor = new Attractor(p5, p5.width / 2, p5.height / 2, 300);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    // attractor.show(p5);

    for (let mover of movers) {
      mover.update(p5);
      mover.show(p5);
      attractor.attract(p5, mover);
    }
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Gravitationalattractionandangles2;

class Attractor {
  constructor(p5, x, y, m) {
    this.pos = p5.createVector(x, y);
    this.mass = m;
    this.r = p5.sqrt(this.mass);
  }

  attract(p5, obj) {
    let force = window.p5.Vector.sub(this.pos, obj.pos);
    let distanceSqr = p5.constrain(force.magSq(), 200, 4000);
    let G = 1;
    let strength = (G * (this.mass * obj.mass)) / distanceSqr;
    force.setMag(strength);
    obj.applyForce(force);
  }

  show(p5) {
    // p5.fill(255, 255, 0);
    p5.noFill()
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}

class Mover {
  constructor(p5, x, y, m) {
    this.pos = p5.createVector(x, y);
    this.vel = window.p5.Vector.random2D();
    this.vel.mult(5);
    this.acc = p5.createVector(0, 0);
    this.mass = m;
    this.r = p5.sqrt(this.mass) * 2;

    this.angle = 0;
    this.angleV = 0;
    this.angleA = 0;
  }

  applyForce(force) {
    let f = window.p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }
  update(p5) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    // this.angleA = this.acc.x / 500;
    // this.angleV += this.angleA;
    // this.angle += this.angleV;
    this.acc.set(0, 0);
  }

  show(p5) {
    p5.fill(0);
    p5.push();
    p5.translate(this.pos.x, this.pos.y);
    this.angle = this.vel.heading()
    p5.rotate(this.angle);
  
    p5.triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0 )
    p5.pop();
  }
}
