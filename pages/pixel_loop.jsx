import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

export default (props) => {
  let population = 100000;
  let pos;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(150, 150, 150);
    pos = p5.createVector(100, 100);
    p5.stroke(0, 0, 0);
    for (let i = 0; i < population; i++) {
      pos.x = p5.random(0, p5.width);
      pos.y = p5.random(0, p5.height);
      p5.point(pos.x, pos.y);
    }

   
  };

  const draw = (p5) => {};

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};
