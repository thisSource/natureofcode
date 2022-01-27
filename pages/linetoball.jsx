import React from "react";
import dynamic from "next/dynamic";


// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Linetoball = props => {
  let ball, gravity;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    ball = new Ball(p5, p5.windowWidth/2, p5.windowHeight/2, 50)
    p5.background(150, 150, 150);

  };

  const draw = (p5) => {
    gravity = p5.createVector(p5.random(-0.05, 0.05),0.01)
    ball.addForce(gravity)
    ball.update()
    ball.edges(p5)
    ball.showLine(p5, p5.width/2, -250)
    // ball.show(p5)

  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Linetoball;

class Ball{
  constructor(p5, x, y, radius){
    this.pos = p5.createVector(x,y)
    this.r = radius
    this.vel = p5.createVector(0,0)
    this.acc = p5.createVector(0,0)
  }

  update(){
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.acc.set(0, 0);
  }

  edges(p5){

    if(this.pos.x > p5.windowWidth|| this.pos.x < 0){
      this.vel.x *=-1
    }
    
    if(this.pos.y > p5.windowHeight || this.pos.y < 0){
      this.vel.y *=-1
    }
  }

  addForce(force){
    this.acc.add(force)
  }

  show(p5){
    p5.strokeWeight(0)

    p5.ellipse(this.pos.x, this.pos.y, this.r * 2)
  }

  showLine(p5, posX, posY){
      p5.strokeWeight(0.8)
      p5.stroke(0, 0, 255, 100)
      p5.line(posX, posY, this.pos.x, this.pos.y)
  }
}
