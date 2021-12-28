import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(
  () =>
    import("react-p5").then((mod) => {
      require("p5/lib/addons/p5.sound");
      return mod.default;
    }),
  {
    ssr: false
  }
);

let mySound;

export default (props) => {
const preload = (p5)=>{
    p5.soundFormats("mp3", "ogg", "wav")
    mySound = p5.loadSound("")
}

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(150, 150, 150);
  };

  const draw = (p5) => {};

  // Will only render on client-side
  
  return (
    <div className="">
      <Sketch preload={preload} setup={setup} draw={draw} />;
    </div>
  );
};
