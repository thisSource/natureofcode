import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

let v;

const SimpleVector = props => {
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(150, 150, 150);
    v = p5.createVector(200, 200);
  };

  const draw = (p5) => {
    p5.stroke(255, 0, 0);
    v.x += p5.random(-2,2)
    v.y += p5.random(-2,2)
    p5.point(v.x, v.y);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default SimpleVector;
