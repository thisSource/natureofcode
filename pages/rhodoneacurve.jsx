import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Rhodoneacurve = props => {
  let nume = 0;
  let dem = 4;

  let z = 0;
  let v = 0;
  let acc;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    acc = 0.003;
  };

  const draw = (p5) => {
    p5.background(150, 150, 150,100);

    // nume= p5.random(10)
    // dem= p5.random(5)

    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(p5.PI / 2);
    // nume += p5.sin(0.001)
    nume = 8;
    dem = 5;
    v = nume / dem;
    z += acc;

    console.log(z);

    p5.beginShape();

    for (let a = 0; a < p5.TWO_PI * dem; a += z) {
      let r = p5.cos(v * a) * 450;
      let x = r * p5.cos(a);
      let y = r * p5.sin(a);
      p5.noFill();
      p5.stroke(255, 255, 35);
      p5.strokeWeight(2);
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

export default Rhodoneacurve;
