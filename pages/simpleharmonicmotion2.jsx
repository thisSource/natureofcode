import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Simpleharmonicmotion2 = props => {
  let angle = 0;
  let angleV = 0.1;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    p5.translate(200, 200);
    p5.fill(252, 238, 33);
    let y = p5.map(p5.sin(angle), -1, 1, -200, 100)
    let x = p5.map(p5.sin(angle), -1, 1, -200, 200)
    p5.circle(0, y, 32);
    p5.circle(x, 0, 32);
    angleV = p5.TWO_PI / 220;
    angle += angleV;
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Simpleharmonicmotion2;
