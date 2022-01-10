import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

export default (props) => {
  let movers = [];
  let attractor;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    for (let i = 0; i < 10; i++) {
      let x = p5.random(p5.width / 2 - 100, p5.width / 2 + 100);
      let y = p5.random(p5.height / 2 - 100, p5.height / 2 + 100);
      let m = p5.random(50, 100);
      movers[i] = new Mover(p5, x, y, m);
    }
    attractor = new Attractor(p5, p5.width / 2, p5.height / 2, 400);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150, 50);
    attractor.show(p5);

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

class Attractor {
  constructor(p5, x, y, m) {
    this.pos = p5.createVector(x, y);
    this.mass = m;
    this.r = p5.sqrt(this.mass);
  }

  attract(p5, obj) {
    let force = window.p5.Vector.sub(this.pos, obj.pos);
    let distanceSqr = p5.constrain(force.magSq(), 100, 500);
    let G = 5;
    let strength = (G * (this.mass * obj.mass)) / distanceSqr;
    force.setMag(strength);
    obj.applyForce(force);
  }

  show(p5) {
    p5.fill(200, 200, 0);
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
    p5.fill(0)
    p5.ellipse(this.pos.x - 7, this.pos.y -5, this.r * 0.3);
    p5.ellipse(this.pos.x + 7, this.pos.y -5, this.r * 0.3);
    p5.noFill()
    p5.arc(this.pos.x, this.pos.y +7, 15, 8, p5.PI *2, p5.PI)

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
  }

  applyForce(force) {
    let f = window.p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }
  update(p5) {
    this.vel.add(this.acc);
    this.vel.mult(5);
    this.vel.limit(3);
    this.pos.add(this.vel);
  }

  show(p5) {
    p5.fill(255);
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
