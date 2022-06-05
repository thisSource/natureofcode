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
let ocean, oceanB, oceanC, oceanD, oceanE;
let cnv;
let middleOfTheOcean = [36.266728455933105, -40.936063535940164]

const preload = (p5) => {
  p5.soundFormats("mp3", "ogg", "wav");
  mySound = p5.loadSound("");
};

const setup = (p5, canvasParentRef) => {
 cnv = p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);

  // p5, xPos, yPos, xSpeed, ySpeed, radius, r, g, b
  ocean = new Ocean(p5, 600,400, p5.random(-0.2,0.2),p5.random(-0.2,0.2),168 * 3, 40, 10, 250)
  oceanB = new Ocean(p5, 600,700,p5.random(-0.2,0.2),p5.random(-0.2,0.2),85 * 3, 40, 20, 200)
  oceanC = new Ocean(p5, 900,200,p5.random(-0.2,0.2),p5.random(-0.2,0.2),71 * 3, 40, 30, 155)
  oceanD = new Ocean(p5, 400,600,p5.random(-0.2,0.2),p5.random(-0.2,0.2),21 * 3, 40, 0, 200)
  oceanE = new Ocean(p5, 1300,300,p5.random(-0.2,0.2),p5.random(-0.2,0.2),15 * 3, 40, 90, 200)




};


const mousePressed = (p5) => {
  ocean.clicked(p5)
}


const draw = (p5) => {
  p5.background(200);

  ocean.isOver(p5, "The Pacific Ocean")
  ocean.update(p5)
  ocean.surface(-0.006,0.0)
  ocean.display(p5, 10, 100)
  ocean.edges(p5)

  // oceanB.collider(p5, ocean)
  oceanB.isOver(p5, "The Atlantic Ocean")
  oceanB.update(p5)
  oceanB.surface(0.01,0.0)
  oceanB.display(p5, 3,200)
  oceanB.edges(p5)


   // ocean.collider(p5, oceanB)
   oceanC.isOver(p5, "The Indian Ocean")
   oceanC.update(p5)
   oceanC.surface(-0.006,0.0)
   oceanC.display(p5, 10, 100)
   oceanC.edges(p5)
 
   // oceanB.collider(p5, ocean)
   oceanD.isOver(p5, "The Southern Ocean")
   oceanD.update(p5)
   oceanD.surface(0.01,0.0)
   oceanD.display(p5, 3,200)
   oceanD.edges(p5)

    // oceanB.collider(p5, ocean)
    oceanE.isOver(p5, "The Arctic Ocean ")
    oceanE.update(p5)
    oceanE.surface(0.01,0.0)
    oceanE.display(p5, 3,200)
    oceanE.edges(p5)


};

class Ocean {
  constructor(p5, xPos, yPos, xSpeed, ySpeed, radius, r, g, b) {
    this.inc = 0.01
    this.noiseMax = 0.9;
    this.phase = 0.0;
    this.zoff = 0.01;

    this.pos = p5.createVector(xPos, yPos);
    this.vel = p5.createVector(xSpeed, ySpeed);
    this.radius = radius;
    this.r = r;
    this.g = g
    this.b = b
  }

  update(p5){
    // p5.ellipseMode(p5.CENTER)
  }

  edges(p5) {
    if (this.pos.x > p5.windowWidth || this.pos.x < 0 ) {
      this.vel.x *= -1;
    }

    if (this.pos.y > p5.windowHeight || this.pos.y < 0) {
      this.vel.y *= -1;
    }
  }

  collider(p5, other) {
    if (other == this) {
      return;
    }

    let relative = window.p5.Vector.sub(other.pos, this.pos);
    let dist = relative.mag() - (this.radius + other.radius);
    if (dist < 0) {
      this.color = 255;
    } else {
      this.color = 0;
    }
  }

  surface(zoff, phase){
    this.zoff += zoff;
    this.phase -= phase
  }

  display(p5) {
    p5.noStroke();
    // p5.stroke(100)
    p5.fill(this.r,this.g,this.b, 30);
    p5.push()
    p5.translate(this.pos.x += this.vel.x, this.pos.y += this.vel.y);
 
    p5.beginShape();
    for (let a = 0; a <= p5.TWO_PI; a += this.inc) {
      let xoff = p5.map(p5.cos(a), -1, 1, 0, this.noiseMax);
      let yoff = p5.map(p5.sin(a + this.phase), -1, 1, 0, this.noiseMax);
      let r = p5.map(p5.noise(xoff, yoff, this.zoff), 0, 1, 100, this.radius);
      let x = r * p5.cos(a);
      let y = r * p5.sin(a);
      p5.vertex(x, y);
    }
    p5.endShape(p5.CLOSE);
    p5.fill(255,0,0)
    p5.ellipse(0,0,10)
    p5.pop()
    // p5.fill(0,40)
    // p5.ellipse(this.pos.x, this.pos.y, this.radius)

  }

  isOver(p5, ocean){
    this.b = 255
    let distA = p5.dist(p5.mouseX, p5.mouseY, this.pos.x, this.pos.y)

    p5.stroke(0)
    if (distA < this.radius / 2){
      this.b = 0
    
     p5.text(ocean, this.pos.x, this.pos.y)

   }
  }
}


const Boilerplatewithsound = (props) => {
  // Will only render on client-side

  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};

export default Boilerplatewithsound;
