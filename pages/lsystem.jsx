import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Lsystem = props => {
  let angleSpeed;

  var angle;
  var axiom = "F";
  var sentence = axiom;
  var len = 100;
  let angleMAx = false;

  var rules = [];
  rules[0] = {
    a: "F",
    // b: "FF+[+F-F-F]-[-F+F+F]"
    b: "F+F−F−F+F"
    // b: "F+F"
    // b: "F+[+F-F-F]"
  };

  function generate(p5) {
    len *= 0.7;
    var nextSentence = "";
    for (var i = 0; i < sentence.length; i++) {
      var current = sentence.charAt(i);
      var found = false;
      for (var j = 0; j < rules.length; j++) {
        if (current == rules[j].a) {
          found = true;
          nextSentence += rules[j].b;
          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    sentence = nextSentence;
    turtle(p5);
  }

  function turtle(p5) {
    // p5.background(51);
    p5.resetMatrix();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.stroke(255, 100);
    for (var i = 0; i < sentence.length; i++) {
      var current = sentence.charAt(i);

      if (current == "F") {
        p5.strokeWeight(3);
        p5.stroke(255, 140, 20);
        p5.line(0, 0, 0, -len);

        p5.translate(0, -len);
      } else if (current == "+") {
        p5.rotate(angle);
      } else if (current == "-") {
        p5.rotate(-angle);
      } else if (current == "[") {
        p5.push();
      } else if (current == "]") {
        p5.pop();
      }
    }
  }

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    angleSpeed = 0;

    for (let i = 0; i < 4; i++) {
      generate(p5);
    }
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);

    if (angleSpeed > 1000) {
      angleMAx = true;
    }

    if (angleSpeed < 0) {
      angleMAx = false;
    }

    if (angleMAx === true) {
      angleSpeed -= 0.03;
    } else {
      angleSpeed += 0.02;
    }

    angle = p5.radians(angleSpeed);

    turtle(p5);
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Lsystem;
