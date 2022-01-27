import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const RandomwalkerPerlinNoise = props => {
  let xOff = 0;
  let yOff = 1;


  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(150,150,150);

  };

  const draw = (p5) => {
    let x = p5.map(p5.noise(xOff), 0, 1, 0, p5.width);
    let y = p5.map(p5.noise(yOff), 0, 1, 0, p5.width);

    xOff += 0.01;
    yOff += 0.01;
    p5.fill(200,x,y)
    p5.noStroke()
    p5.ellipse(x, y, 10, 10);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default RandomwalkerPerlinNoise;
