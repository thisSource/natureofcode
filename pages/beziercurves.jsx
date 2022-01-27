import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

 function Beziercurves (props){
  let v;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
p5.strokeWeight(20)
p5.noFill()
    // p5.point(300,300)
    // p5.point(p5.mouseX,p5.mouseY)
    // p5.point(800,300)
    // p5.point(1000,600)

    p5.strokeWeight(4)
    p5.bezier(0,300,p5.mouseX, p5.mouseY, 400, 400, p5.width,300)
    console.log(p5.PI)
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Beziercurves;
