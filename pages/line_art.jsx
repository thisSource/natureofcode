import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-sidei
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const LineArt = props => {
  let line = [];
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    let mouse = p5.createVector(p5.mouseX, p5.mouseY);
    let mouseMapped = p5.map(mouse.y, 0, 400, 0, 80).toFixed(0);
    for (let i = 0; i < mouseMapped; i++) {
      line.push(new Line(20 + i * 5, 20 * i, 380 - i * 5, 20 * i, p5));
    }
    for (let i = 0; i < mouseMapped; i++) {
      line[i].show(p5);
    }
  };
  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default LineArt;

class Line {
  constructor(x1, y1, x2, y2, p5) {
    this.v1 = p5.createVector(x1, y1);
    this.v2 = p5.createVector(x2, y2);
  }
  show(p5) {
    p5.line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
  }
}
