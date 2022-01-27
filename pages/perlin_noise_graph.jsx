import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const PerlinNoiseGraph = props => {
  let start = 0;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    let xOff = start;
    let increment = 0.01;
    p5.background(0);
    p5.noFill();
    p5.beginShape();

    for (let x = 0; x < p5.width; x++) {
      p5.stroke(255);
      var y = p5.noise(xOff) * p5.height;
      p5.vertex(x, y);
      xOff += increment;
    }
    p5.endShape();
    start += increment;
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default PerlinNoiseGraph;
