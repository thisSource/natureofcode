import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Polarcoordinates2 = props => {
  let r = 200;
  let sides;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(0);
    p5.stroke(255);
    p5.strokeWeight(4);
    p5.noFill();
    p5.translate(p5.width / 2, p5.height / 2);

    sides = p5.map(p5.mouseX, 0, p5.width, p5.PI, 0.01);

    p5.beginShape();
    for (let a = 0; a < p5.PI*2; a += sides) {
      let x = r * p5.cos(a);
      let y = r * p5.sin(a);
      p5.vertex(x, y);
    }

    p5.endShape(p5.CLOSE);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Polarcoordinates2;
