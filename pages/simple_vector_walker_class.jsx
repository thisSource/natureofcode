import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

let walker;

const SimpleVectorWalkerClass = props => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(150, 150, 150);
    walker = new Walker(200, 200, p5);
  };

  const draw = (p5) => {
    walker.update(p5);
    walker.show(p5);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default SimpleVectorWalkerClass;

class Walker {
  constructor(x, y, p5) {
    this.v = p5.createVector(x, y);
  }

  update(p5) {
    this.v.x += p5.random(-2, 2);
    this.v.y += p5.random(-2, 2);
  }

  show(p5) {
    p5.stroke(0, 0, 255);
    p5.point(this.v.x, this.v.y);
  }
}
