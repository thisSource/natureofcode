import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

export default (props) => {
  let angle = 0;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    p5.translate(200, 200);
    p5.fill(252, 238, 33);
    let r = p5.map(p5.sin(angle), -1, 1, 0, 200);
    p5.circle(0, 0, r * 2);

    let increment = p5.TWO_PI / 60;

    angle += increment;
    console.log(p5.frameRate());
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};
