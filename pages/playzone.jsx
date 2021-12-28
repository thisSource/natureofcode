import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(
  () =>
    import("react-p5").then((mod) => {
      // importing sound lib ONLY AFTER REACT-P5 is loaded
      require("p5/lib/addons/p5.sound");
      // returning react-p5 default export
      return mod.default;
    }),
  {
    ssr: false
  }
);

export default (props) => {
  const setup = (p5, cnvParentRef) => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(cnvParentRef);
  };

  const draw = (p5) => {
    p5.background(150, 150, 150);
    p5.translate(p5.width / 2, p5.height / 2);
    p5.triangle(0, -50, -50, 100, 50, 100);
  };

  return (
    <div className="">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
};
