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

let mySound, wave;

const Oscillation = props => {
  let playing = false;

  const preload = (p5) => {
    p5.soundFormats("mp3", "ogg", "wav");
    mySound = p5.loadSound("");
  };

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(400, 400).parent(canvasParentRef);
    p5.background(150, 150, 150);

    wave = new window.p5.Oscillator();
    wave.setType("sine");
    wave.start();
    wave.freq(240);
    wave.amp(0)
  };

  const toggleSound = () => {
    if (!playing) {
      wave.amp(0.5, 0.5);
      playing = true;
      console.log("play");
    } else {
    //   wave.stop();
      wave.amp(0, 0.5);
      playing = false;
      console.log("stop");
    }
  };

  const draw = (p5) => {};

  // Will only render on client-side

  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />
      <button className="border-4 bg-green-400" onClick={() => toggleSound()}>
        click me
      </button>
    </div>
  );
};

export default Oscillation;
