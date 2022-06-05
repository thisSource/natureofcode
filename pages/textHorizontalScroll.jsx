import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

let xPos = 100
let yPos = 100
let xSpeed = 2

const setup = (p5, canvasParentRef) => {
  p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
  yPos = p5.height/2
};

const draw = (p5) => {
    p5.background(150, 150, 150);

  p5.textSize(150)
  let hello = 'ALWAYS ON DRM'
  console.log(toArray(hello))
  let helloLength = p5.textWidth(hello)

  xPos += -xSpeed
  if(xPos < 0 - helloLength){
      xPos = p5.width
  }
  p5.text(hello, xPos, yPos)
};

let toArray = (input)=>{
  return [...input]
}

const HorizontalScroll = (props) => {
  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default HorizontalScroll;
