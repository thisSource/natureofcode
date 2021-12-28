import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

export default (props) => {
  let rotation;
  let speed;
  let r, g, b;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.background(150, 150, 150);

    rotation = 0;
    speed = 0.01;
    r = 255;
    g = 0;
    b = 0;
  };

  const draw = (p5) => {
    rotation += speed;

    if (rotation > p5.TAU) {
      rotation = 0;
      r = p5.random(0, 255);
      g = p5.random(0, 255);
      b = p5.random(0, 255);
    }
    console.log(rotation);
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    p5.rotate(rotation);
    p5.strokeWeight(1);
    p5.stroke(b, g, r);
    p5.fill(r, g, b);
    p5.rect(0, 0, 3, 350);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};
