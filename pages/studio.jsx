import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

let v;
const setup = (p5, canvasParentRef) => {
  p5.createCanvas(400, 400).parent(canvasParentRef);
  p5.background(150, 150, 150);
};

const draw = (p5) => {

p5.rect(100,100,100,100)
};

const Boilerplate = props => {
  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Boilerplate;
