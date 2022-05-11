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
      line.push(new ALine(p5, p5.width / 2 + i * 5));
    } else {
      line.push(new ALine(p5, p5.width / 2 - i * 5));
    }
  }
};

const draw = (p5) => {
  p5.background(150, 150, 150);
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
};

class ALine {
  constructor(p5, xStart) {
    this.length = 150;
    this.pos = p5.createVector(xStart, p5.height / 2 - this.length / 2);
    this.boxPos = p5.createVector(p5.width / 2, p5.height / 2);
  }

  lineLoop(p5) {
    if (this.pos.x < p5.width / 2 - 1000 || this.pos.x > p5.width / 2 + 1000) {
      this.pos.x = p5.width / 2;
    }
  }

  lineUpdate(p5, direction) {
    this.pos.x -= direction;
  }
  displayLine(p5) {
    p5.strokeWeight(1.6);
    p5.stroke(0,0,190)
    p5.line(this.pos.x, this.pos.y, this.pos.x, this.pos.y + this.length);
  }

  displayBox(p5) {
    p5.noFill();
    p5.stroke(145);
    p5.strokeWeight(10);
    p5.rect(this.boxPos.x - 200, this.boxPos.y - this.length / 2, 400, 300);
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
