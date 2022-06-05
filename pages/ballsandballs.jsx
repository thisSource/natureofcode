import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const BouncingBalls = props => {
  let ball = [];
  let cnv;
  let interval = 1;
  let dragC = 0.005;
  let val
  const setup = (p5, canvasParentRef) => {
    cnv = p5
      .createCanvas(p5.windowWidth, p5.windowHeight)
      .parent(canvasParentRef);
    
  };

 

  const draw = (p5) => {
    p5.background(150, 150, 150);
    if(p5.frameCount % (interval * 30) === 0){
        ball.push(
            new Ball(200, 200, 12, 102,204,255, p5))
    }
    // for (let i = 0; i < 1; i++) {
    //     ball.push(
    //       new Ball(p5.random(0, p5.width), p5.random(0, p5.height), 10, p5)
    //     );
    //   }

    let gravity = p5.createVector(0, 0.07);
    let wind = p5.createVector(p5.random(-0.01, 0.01), 0);

    p5.fill(30)
    // p5.stroke(0)
    p5.noStroke()
    p5.ellipse(200, 200, 30);

    for (let i = 0; i < ball.length; i++) {
      // ball[i].applyForce(wind);
      ball[i].applyForce(gravity);
      ball[i].applyForce(wind);
      ball[i].drag(dragC);
      ball[i].update(p5);
      ball[i].edges(p5);
      ball[i].show(p5);
    //   ball[i].heart(p5)
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
  constructor(x, y, r, red, green, blue, p5) {
    this.pos = p5.createVector(x, y);
    this.r = r;
    this.vel = p5.createVector(p5.random(-0.1, 0.2), p5.random(-0.1, 0.1));
    this.acc = p5.createVector(0, 0);
    this.red = red
    this.green = green
    this.blue = blue
  }

  drag(c) {
    // Direction of Drag
    let drag = this.vel.copy();
    drag.normalize();
    drag.mult(-1);
    let speedSq = this.vel.magSq();
    drag.setMag(c * speedSq);
    this.applyForce(drag);
  }

  update(p5) {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
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
    if (this.pos.y >= p5.height - this.r) {
        this.pos.y = p5.height - this.r
        this.vel.y *= -1;
    }

    if ( this.pos.y <= 0 + this.r) {
        this.vel.y *= -1;
      }

    if (this.pos.x >= p5.width - this.r) {
        this.pos.x = p5.width - this.r
        this.vel.x *= -1;
    }

    if (this.pos.x <= 0 + this.r) {
        this.pos.x = 0 + this.r
        this.vel.x *= -1;
      }
  }

  applyForce(force) {
    this.acc.add(force);
  }

heart(p5) {
    p5.fill(255,107,107)
    let size = 20
    p5.push()
    p5.translate(0,0)
    p5.rotate(this.vel.heading())
    p5.beginShape();
    p5.vertex(this.pos.x, this.pos.y);
    p5.bezierVertex(this.pos.x - size / 2, this.pos.y - size / 2, this.pos.x - size, this.pos.y + size / 3, this.pos.x, this.pos.y + size);
    p5.bezierVertex(this.pos.x + size, this.pos.y + size / 3, this.pos.x + size / 2, this.pos.y - size / 2, this.pos.x, this.pos.y);
    p5.endShape(p5.CLOSE);
    p5.pop()


    console.log(this.pos.x)
  }

  show(p5) {
    p5.noFill();
    p5.fill(102, 204, 255)
    p5.stroke(0)
    p5.ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
