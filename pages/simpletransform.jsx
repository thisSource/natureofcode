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

    v = 0;
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    v += 10;
    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(v);
    p5.rectMode(p5.CENTER);
    p5.fill(255);
    p5.rect(0, 0, 200, 200);
    p5.fill(0);
    p5.rect(0, 0, 100, 100);
    p5.fill(255, 100, 100);
    p5.rect(0, 0, 40, 40);
    p5.pop();
    p5.fill(255, 255, 0);
    p5.rect(0, 0, 50, 50);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};
