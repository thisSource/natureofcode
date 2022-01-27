import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
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

let mySound;
let bubbels = [];
let background;
let surface;

let windowSize;
let windowOriginSize;
let ratio;
let setRatio;

let yOff = 0;

export default (props) => {
  const preload = (p5) => {
    p5.soundFormats("mp3", "ogg", "wav");
    mySound = p5.loadSound("");
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    background = new Background(p5);
    // surface = new Surface(0,yOff)

    windowOriginSize = p5.createVector(1500, 800);
    windowSize = p5.createVector(p5.width, p5.height);
    ratio = windowSize.div(windowOriginSize);
    setRatio = ratio.x / ratio.y;

    for (let i = 0; i < 29; i++) {
      bubbels.push(
        new Bubble(
          p5,
          p5.random(0, p5.width),
          p5.random(p5.height, p5.height + 1200),
          p5.random(i, 30) * setRatio
        )
      );
    }
  };

  const draw = (p5) => {
    background.show(p5);
    showSurf(p5);
    for (let i = 0; i < 29; i++) {
      bubbels[i].update(p5, p5.random(-0.1, 0.1), -0.01);
      bubbels[i].edge(p5);
      bubbels[i].show(p5);
    }
  };

  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

function shell(p5) {
  p5.push();
  p5.stroke(10);
  p5.translate(p5.width / 1.75, p5.height - 40);
  for (var i = 0; i < 200; i++) {
    p5.push();
    p5.rotate(i / 6);
    p5.scale(i / 1700);
    p5.fill(250, 200, 250);
    p5.rect(0, 10, 80, 500);
    p5.pop();
  }
}

function showSurf(p5) {
  p5.fill(255, 0, 0, 10);
  p5.beginShape();
  let xOff = 0;
  for (let x = 0; x <= p5.width + 10; x += 10) {
    let y = p5.map(p5.noise(xOff, yOff), 0, 1, 50, 100);
    p5.vertex(x, y);
    // Increment x dimension for noise
    xOff += 0.03;
  }
  // increment y dimension for noise
  yOff += 0.01;

  p5.vertex(p5.width, p5.height);
  p5.vertex(0, p5.height);
  p5.endShape(p5.CLOSE);
}

class Background {
  constructor(p5) {
    this.c1 = p5.color(250);
    this.c2 = p5.color(63, 191, 255);
  }

  show(p5) {
    for (let y = 0; y < p5.height; y++) {
      let n = p5.map(y, 0, p5.height, 0, 1);
      let newc = p5.lerpColor(this.c1, this.c2, n);
      p5.stroke(newc);
      p5.line(0, y, p5.width, y);
    }
  }
}

class Bubble {
  constructor(p5, xPos, yPos, radius) {
    this.pos = p5.createVector(xPos, yPos);
    this.vel = p5.createVector(0, 0);
    //   this.acc = p5.createVector(0,0);
    this.radius = radius;
  }

  update(p5, xSpeed, ySpeed) {
    this.vel.add(xSpeed, ySpeed);
    this.pos.add(this.vel);
    this.vel.limit(1);

    // this.acc.x = p5.random(-0.1, 0.1)
    // this.acc.y = ySpeed
  }

  edge(p5) {
    if (this.pos.y < 0 - this.radius) {
      this.pos.y = p5.random(p5.height, p5.height + 800);
    }
  }

  show(p5) {
    // p5.strokeWeight(4)
    // p5.stroke(0,100)
    p5.noStroke();
    p5.fill(255, 40);
    p5.ellipse(this.pos.x, this.pos.y, this.radius);
  }
}
