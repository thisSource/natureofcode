import React from "react";
import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false
});

const Lsystem = (props) => {
  let plant = [];
  let numberOfPlants = 10;
  let rules = [
    "FF+[-F-F-F]-[-F+F+F]",
    "FF+[-F-F-F]-[-F+F+F]",
    "FF-[-F-F-F]+[-F+F+F]",
    "FF+[F-F-F]-[-F+F+F]"
  ];

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    for (let i = 0; i < numberOfPlants; i++) {
      plant.push(
        new Seaweed(
          p5.random(p5.width),
          p5.random(30),
          p5.random(100),
          rules[p5.int(p5.random(3))]
        )
      );
      for (let j = 0; j < 2; j++) {
        plant[i].generate(p5);
      }
    }
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);

    for (let i = 0; i < numberOfPlants; i++) {
      plant[i].update(p5);
      plant[i].turtle(p5);
    }
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />;
    </div>
  );
};

export default Lsystem;

class Seaweed {
  constructor(xPos, angleSpeed, len, rule) {
    this.angleSpeed = angleSpeed;
    this.xPos = xPos;
    this.angle = 0;
    this.axiom = "F";
    this.sentence = this.axiom;
    this.len = len;
    this.angleMAx = false;

    this.rules = [
      {
        a: "F",
        b: rule
      }
    ];
  }

  generate(p5) {
    this.len *= 0.5;
    var nextSentence = "";
    for (var i = 0; i < this.sentence.length; i++) {
      var current = this.sentence.charAt(i);
      var found = false;
      for (var j = 0; j < this.rules.length; j++) {
        if (current == this.rules[j].a) {
          found = true;
          nextSentence += this.rules[j].b;
          break;
        }
      }
      if (!found) {
        nextSentence += current;
      }
    }
    this.sentence = nextSentence;
  }

  turtle(p5) {
    p5.resetMatrix();
    p5.translate(this.xPos, p5.height);
    p5.stroke(255, 100);
    p5.ellipse(0, 0, 2);

    for (var i = 0; i < this.sentence.length; i++) {
      var current = this.sentence.charAt(i);

      if (current == "F") {
        p5.strokeWeight(1);
        p5.stroke(0, 255, 100);
        p5.line(0, 0, 0, -this.len);
        p5.translate(0, -this.len);
      } else if (current == "+") {
        p5.rotate(this.angle);
      } else if (current == "-") {
        p5.rotate(-this.angle);
      } else if (current == "[") {
        p5.push();
      } else if (current == "]") {
        p5.pop();
      }
    }
  }

  update(p5) {
    if (this.angleSpeed > 10) {
      this.angleMAx = true;
    }

    if (this.angleSpeed < 5) {
      this.angleMAx = false;
    }

    if (this.angleMAx === true) {
      this.angleSpeed -= 0.03;
    } else {
      this.angleSpeed += 0.02;
    }

    this.angle = p5.radians(this.angleSpeed);
  }
}



// function setUpSeaweed(p5){
//     for (let i = 0; i < numberOfPlants; i++) {
//       plant.push(
//         new Seaweed(
//           p5.random(50,100),
//           p5.random(p5.width),
//           p5.random(30),
//           p5.random(100),
//           rules[p5.int(p5.random(3), 100)]
//         )
//       );
//       for (let j = 0; j < 2; j++) {
//         plant[i].generate(p5);
//       }
//     }
//   }
  
//   function runSeaweed(p5){
//     for (let i = 0; i < numberOfPlants; i++) {
//       // plant[i].update(p5);
//       plant[i].turtle(p5);
//     }
//   }
  
//   class Seaweed {
//     constructor(angle, xPos, angleSpeed, len, rule) {
//       this.angleSpeed = angleSpeed;
//       this.xPos = xPos;
//       this.angle = angle;
//       this.axiom = "F";
//       this.sentence = this.axiom;
//       this.len = len;
//       this.angleMAx = false;
  
//       this.rules = [
//         {
//           a: "F",
//           b: rule
//         }
//       ];
//     }
  
//     generate(p5) {
//       this.len *= 0.6;
//       var nextSentence = "";
//       for (var i = 0; i < this.sentence.length; i++) {
//         var current = this.sentence.charAt(i);
//         var found = false;
//         for (var j = 0; j < this.rules.length; j++) {
//           if (current == this.rules[j].a) {
//             found = true;
//             nextSentence += this.rules[j].b;
//             break;
//           }
//         }
//         if (!found) {
//           nextSentence += current;
//         }
//       }
//       this.sentence = nextSentence;
//     }
  
//     turtle(p5) {
//       p5.resetMatrix();
//       p5.translate(this.xPos, p5.height);
//       p5.stroke(255, 100);
//       p5.ellipse(0, 0, 2);
  
//       for (var i = 0; i < this.sentence.length; i++) {
//         var current = this.sentence.charAt(i);
//         if (current == "F") {
//           p5.strokeWeight(1);
//           p5.stroke(0, 255, 100);
//           p5.line(0, 0, 0, -this.len);
//           p5.translate(0, -this.len);
//         } else if (current == "+") {
//           p5.rotate(this.angle);
//         } else if (current == "-") {
//           p5.rotate(-this.angle);
//         } else if (current == "[") {
//           p5.push();
//         } else if (current == "]") {
//           p5.pop();
//         }
//       }
//     }
  
    // update(p5) {
    //   if (this.angleSpeed > 10) {
    //     this.angleMAx = true;
    //   }
  
    //   if (this.angleSpeed < 5) {
    //     this.angleMAx = false;
    //   }
  
    //   if (this.angleMAx === true) {
    //     this.angleSpeed -= 0.03;
    //   } else {
    //     this.angleSpeed += 0.02;
    //   }
  
    //   this.angle = p5.radians(this.angleSpeed);
    // }
  // }