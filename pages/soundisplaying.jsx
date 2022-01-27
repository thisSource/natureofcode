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
let ball = []
let numberOfBalls = 2

const Soundisplaying = props => {
  
  const preload = (p5) => {
    p5.soundFormats("wav", "ogg", "mp3");
    mySound = p5.loadSound("audio/drum.ogg");
  };


  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    for(let i = 0; i < numberOfBalls; i++){
        ball.push(new Ball(p5, p5.random(100, p5.windowWidth) , p5.random(100, p5.windowHeight)))
    }
    // ball = new Ball(p5, 100, 100 )
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    for(let i = 0; i < numberOfBalls; i++){
        ball[i].update(p5, mySound)
        ball[i].dispaly(p5)
    }
   
  };

  // Will only render on client-side
  return (
    <div className="">
      <Sketch preload={preload} setup={setup} draw={draw} />;
    </div>
  );
};

export default Soundisplaying;

class Ball {
    constructor(p5, x, y) {
      this.pos = p5.createVector(x, y);
      this.speed = p5.createVector(p5.random(2,10), 10);
      this.radius = 100;
    }

    update(p5, mySound){
        this.pos.x += this.speed.x
        this.pos.y += this.speed.y

        if(this.pos.x > p5.windowWidth - this.radius || this.pos.x < 0 + this.radius){
            this.speed.x *= -1
            mySound.play()
        }
        if(this.pos.y > p5.windowHeight - this.radius || this.pos.y < 0 + this.radius){
            this.speed.y *= -1
            mySound.play() 
        }
    }
  
    dispaly(p5) {
        p5.fill(255,0,0)
        p5.noStroke()
      p5.ellipse(this.pos.x, this.pos.y, this.radius * 2);
    }
  }
  