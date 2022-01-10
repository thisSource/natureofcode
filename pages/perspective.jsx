import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

export default (props) => {
  let pos;
  let len;
  let a,b
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    pos = p5.createVector(0,0)
    len = p5.createVector(400,200)

    a = p5.createVector(0,0)
   b = p5.createVector(10,0)

    let angle = a.angleBetween(b)


    console.log(angle * (360 / p5.TAU))
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
      p5.translate(p5.width/2, p5.height/2)
     
      pos.x = p5.map(p5.mouseX,0, p5.width, -p5.width/2, p5.width/2)
      p5.line(pos.x - len.x / 2,pos.y - len.y / 2,0,0)
      p5.line(pos.x + len.x / 2,pos.y - len.y / 2,0,0)
      p5.line(pos.x - len.x / 2,pos.y + len.y / 2,0,0)
      p5.line(pos.x + len.x / 2,pos.y + len.y / 2,0,0)
      p5.rectMode(p5.CENTER)
      p5.fill(255,255,255,150)
      p5.rect(pos.x,pos.y,len.x,len.y)

  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};
