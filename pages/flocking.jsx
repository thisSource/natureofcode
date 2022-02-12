import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const flock = [];

let alignSlider, cohesionSlider, separationSlider;

const setup = (p5, canvasParentRef) => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

  alignSlider = 1;
  cohesionSlider = 0.3;
  separationSlider = 0.5;

  for (let i = 0; i < 100; i++) {
    flock.push(new Boid(p5));
  }
};

const draw = (p5) => {
  p5.background(150, 150, 255);
  for (let boid of flock) {
    boid.edges(p5);
    boid.flock(p5, flock);
    boid.update(p5);
    boid.show(p5);
  }
};

const Flocking = (props) => {
  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Flocking;

class Boid {
  constructor(p5) {
    this.position = p5.createVector(
      p5.random(p5.width / 2, p5.width),
      p5.random(p5.height / 2, p5.height)
    );
    this.velocity = window.p5.Vector.random2D();
    this.velocity.setMag(p5.random(2, 4));
    this.acceleration = p5.createVector();
    this.maxForce = 0.5;
    this.maxSpeed = 3;
    this.r = 6;
  }

  edges(p5) {
    if (this.position.x > p5.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = p5.width;
    }
    if (this.position.y > p5.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = p5.height;
    }
  }

  align(p5, boids) {
    let perceptionRadius = 50;
    let steering = p5.createVector();
    let total = 0;
    for (let other of boids) {
      let d = p5.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  separation(p5, boids) {
    let perceptionRadius = 50;
    let steering = p5.createVector();
    let total = 0;
    for (let other of boids) {
      let d = p5.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        let diff = window.p5.Vector.sub(this.position, other.position);
        diff.div(d * d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  cohesion(p5, boids) {
    let perceptionRadius = 100;
    let steering = p5.createVector();
    let total = 0;
    for (let other of boids) {
      let d = p5.dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other != this && d < perceptionRadius) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }

  flock(p5, boids) {
    let alignment = this.align(p5, boids);
    let cohesion = this.cohesion(p5, boids);
    let separation = this.separation(p5, boids);

    alignment.mult(alignSlider);
    cohesion.mult(cohesionSlider);
    separation.mult(separationSlider);

    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(separation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.acceleration.mult(0);
  }

  show(p5) {
    p5.push();
    p5.translate(this.position.x, this.position.y);
    p5.rotate(this.velocity.heading());
    p5.noStroke();
    p5.fill(255, 102, 0);
    p5.ellipse(this.r, 0, this.r*2, this.r);

    p5.triangle(-this.r, -this.r / 2, -this.r, this.r/2, this.r, 0);
    p5.fill(0);
    p5.ellipse(this.r*1.5,0,this.r/3);
    p5.pop();
  }
}
