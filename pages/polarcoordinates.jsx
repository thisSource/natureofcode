import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

export default (props) => {
  let r
  let angle = 0
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.stroke(255)
    p5.strokeWeight(4)
    p5.noFill()
    p5.translate(200,200)
    r = 150
    p5.circle(0,0,r*2)

 
    angle +=0.01

    let x = r * p5.cos(angle)
    let y = r * p5.sin(angle)
    p5.line(0,0,x,y)
    p5.strokeWeight(32)
    p5.stroke(252,238,33)
    p5.point(x,y)
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};
