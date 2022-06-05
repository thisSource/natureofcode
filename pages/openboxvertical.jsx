import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

let line = [];
const setup = (p5, canvasParentRef) => {

  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  for (let i = 0; i < 200; i++) {
    if (i % 2 === 0) {
      line.push(new ALine(p5, p5.width / 2 + i * 5, 1000));

    } else {
      line.push(new ALine(p5, p5.width / 2 - i * 5, 1000));

    }
  }

};

const draw = (p5) => {
    p5.background(100);
    p5.push()

  p5.translate(p5.width/2,p5.height/2)
//   p5.translate(1150, -300);
  for (let i = 0; i < 200; i++) {
    if (i % 2 === 0) {
      // p5.stroke(200,200,0)
      line[i].lineUpdate(p5, -1);
    } else {
      // p5.stroke(0,200,100)
    line[i].lineUpdate(p5, 1);
    }
    line[i].lineLoop(p5);
    line[i].displayLine(p5);
    // line[i].displayBox(p5);
  }
  p5.pop()
  // p5.fill(255)

  // line[0].displayText(p5)


};

class ALine {
  constructor(p5, xStart, length) {
    this.length = length;
    this.pos = p5.createVector(xStart, p5.height / 2 - this.length / 2);
    this.boxPos = p5.createVector(p5.width / 2, p5.height / 2);
    this.angle = 1
  }

  lineLoop(p5) {
    if (this.pos.x < p5.width / 2 - 2000 || this.pos.x > p5.width / 2 + 2000) {
      this.pos.x = p5.width / 2;
    }
  }

  lineUpdate(p5, direction) {
    this.pos.x -= direction;
    // this.pos.y -= center;
    // this.length = length;
    this.angle -= 0.005
  }
  displayLine(p5) {
    p5.angleMode(p5.DEGREES)
    p5.rotate(this.angle);
    p5.strokeWeight(3);
    p5.stroke(70);
    p5.line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.length);
    p5.stroke(190);
    p5.line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + 90);
    p5.line(this.pos.x, this.pos.y + this.length, this.pos.x, this.pos.y + this.length - 90);
    p5.noStroke()
    p5.fill(200,0,250)
    p5.rect(this.pos.x, this.pos.y, 100, 2);
  }

  displayBox(p5) {
    p5.noFill();
    p5.stroke(145);
    p5.strokeWeight(10);
    p5.rect(this.boxPos.x - 200, this.boxPos.y - this.length / 2, 400, 300);
  }

  displayText(p5){
    p5.fill(200)
    p5.textSize(100)
    p5.textStyle(p5.BOLD)
    p5.textAlign(p5.CENTER)
    p5.strokeWeight(50)
    p5.text('ALWAYS ON DRM . NET', p5.width/2 ,p5.height/2)
  }
}

const Openbox = (props) => {
  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Openbox;
