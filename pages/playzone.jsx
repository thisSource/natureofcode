import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Playzone = props => {
  let house;
  let angle = 0

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    house = new House(p5,0,0,400,400)
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    p5.translate(0,p5.height)
    angle = -p5.PI/2
    p5.text(angle,400,-100)
    p5.rotate(angle)


    house.show(p5)

  
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );


};

export default Playzone;

class House{
  constructor(p5, xStart, yStart, xEnd, yEnd){
  this.xStart = xStart
  this.yStart = yStart
  this.xEnd = xEnd
  this.yEnd = yEnd

  } 

  show(p5){
    p5.rect(this.xStart, this.yStart,this.yEnd,this.xEnd)
  }

}