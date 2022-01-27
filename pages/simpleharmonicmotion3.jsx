import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Simpleharmonicmotion3 = props => {
  let angles = [];
  let angleV = [];
  let r = 4;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(600, 400).parent(canvasParentRef);
    let total = p5.floor(p5.width / (r * 2));
    for (let i = 0; i < total +1; i++) {
      angles[i] = p5.map(i,0,total,0,p5.PI * 4);
      angleV[i] = 0.01 + i / 100;
    }
  };

  const draw = (p5) => {
    p5.background(0, 0, 0);
    p5.translate(300, 200);
    p5.noFill()
    p5.beginShape()

    for (let i = 0; i < angles.length; i++) {
      let y = p5.map(
        p5.sin(angles[i]),
        -1,
        1,
        -200,
        200
      );
  

      p5.strokeWeight(2);
      p5.stroke(252, 238, 33);
      p5.line(x, 0, x, y);
      let x = p5.map(i, 0, angles.length, -300, 300);
    //   p5.circle(x, y, r * 2);
      p5.vertex(x,y)
      angles[i] += p5.PI/100
    //   angles[i] += angleV[i];
    }
    p5.endShape()

    // angleV = p5.TWO_PI / 220;
    // angle += angleV;
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Simpleharmonicmotion3;
