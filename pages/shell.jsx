function shell(p5) {
    p5.push();
    p5.stroke(10);
    // p5.noFill()
    p5.translate(p5.width / 1.75, p5.height - 100);
    for (var i = 0; i < 100; i++) {
      p5.push();
      p5.rotate(i / 21);
      p5.scale(i / 500);
      p5.fill(250, 200, 250, 10);
      p5.rect(0, 10, 80, 500);
      p5.pop();
    }
  }