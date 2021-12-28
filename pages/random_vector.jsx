import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

export default (props) => {
  let v;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(150, 150, 150);
  };

  const draw = (p5) => {
    p5.translate(p5.width / 2, p5.height / 2);
    p5.strokeWeight(2);
    v = window.p5.Vector.random2D();
    p5.stroke(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255), 50);
    v.mult(p5.random(20, 200));
    p5.line(0, 0, v.x, v.y);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};
