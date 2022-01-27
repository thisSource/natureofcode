import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Clock = props => {
  let hr;
  let mn;
  let sc;
  let scAngle, mnAngle, hrAngle;
  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    hr = p5.hour();
    mn = p5.minute();
    sc = p5.second();

    // clock(p5, 0, -200, 180, 1);
    clock(p5, 0, 0, 380, 1);

    // p5.text(`${hr}:${mn}:${sc}`, 100,100);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );

  function clock(p5, x, y, endX) {
    scAngle = p5.map(sc, 0, 60, 0, 360);
    mnAngle = p5.map(mn, 0, 60, 0, 360);
    hrAngle = p5.map(hr % 12, 0, 12, 0, 360);

    p5.push();
    p5.translate(p5.width / 2 + x, p5.height / 2 + y);
    p5.rotate(-90);

    p5.noFill();
    p5.strokeWeight(0.2);
    p5.circle(0, 0, endX * 2);

    p5.push();
    p5.rotate(scAngle);
    p5.stroke(230);
    p5.strokeWeight(2);
    p5.line(0, 0, endX, 0);
    p5.pop();

    p5.push();
    p5.rotate(mnAngle);
    p5.stroke(230);
    p5.strokeWeight(6);
    p5.line(0, 0, endX, 0);
    p5.pop();

    p5.push();
    p5.rotate(hrAngle);
    p5.stroke(230);
    p5.strokeWeight(10);
    p5.line(0, 0, endX - 120, 0);
    p5.pop();
    p5.pop();
  }
};

export default Clock;
