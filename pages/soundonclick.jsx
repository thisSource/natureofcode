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

let mySound, reverb;

export default (props) => {
  const preload = (p5) => {
    p5.soundFormats("mp3", "ogg", "wav");
    mySound = p5.loadSound("audio/VeloStack.mp3");
  };

  const toggleSound = () => {
    if (mySound.isPlaying()) {
      mySound.stop();
    } else {
      mySound.play();
    }
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(150, 150, 150);
    reverb = new window.p5.Reverb();

    reverb.process(mySound, 20, 30);
    mySound.play();
  };

  const draw = (p5) => {};

  // Will only render on client-side

  return (
    <div className="">
      <Sketch preload={preload} setup={setup} draw={draw} />
      <button className="border-4 bg-green-400" onClick={() => toggleSound()}>
        click me
      </button>
    </div>
  );
};
