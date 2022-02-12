import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Boilerplate = (props) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let num;
  let a;

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    p5.textSize(25);

    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        p5.text(
          String.fromCharCode(p5.random((0x0021, 0x0fd9))),
          0 + i * 20,
          10 + j * 40
        );
      }
    }
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Boilerplate;
