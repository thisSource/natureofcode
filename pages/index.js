import "tailwindcss/tailwind.css";
import Link from "next/link";

function Home() {
  return (
    <div className="ml-10 mt-10">
      <ol>
      <li className="hover:underline">
          <Link href="/playzone">
            <a>Playzone</a>
          </Link>
        </li>
      <li className="hover:underline">
          <Link href="/perlin_noise_graph">
            <a>Perlin noise graph</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/randomwalker_perlin_noise">
            <a>Random walker by perlin noise</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/simple_vector">
            <a>Simple vector</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/simple_vector_walker_class">
            <a>Simple vector walker class</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/vector_velocity">
            <a>Vector velocity</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/random_vector">
            <a>Random vector</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/vector_acceleration">
            <a>Vector acceleration</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/line_art">
            <a>Line art</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/gravity_simulation">
            <a>Gravity simulation</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/bouncing_balls">
            <a>Bouncing balls</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/gravity_and_mass">
            <a>Gravity and mass</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/pixel_loop">
            <a>Pixel loop</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/soundisplaying">
            <a>Sound is playing</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/soundonclick">
            <a>Sound on click</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/oscillation">
            <a>Sound oscillation</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/simpletransform">
            <a>Simple transform</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/rotatingline">
            <a>Rotating line</a>
          </Link>
        </li>
     
        <li className="hover:underline">
          <Link href="/linetoball">
            <a>Line connected to ball</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/gravitationalattraction">
            <a>Gravitational attraction</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/gravitationalattractionandangles">
            <a>Gravitational attraction and angles part 1</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/gravitationalattractionandangles2">
            <a>Gravitational attraction and angles part 2</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/polarcoordinates">
            <a>Polar coordinates part 1</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/polarcoordinates2">
            <a>Polar coordinates part 2</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/simpleharmonicmotion">
            <a>Simple harmonic motion</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/simpleharmonicmotion2">
            <a>Simple harmonic motion part 2</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/simpleharmonicmotion3">
            <a>Simple harmonic motion part 3</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/clock">
            <a>Clock</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/beziercurves">
            <a>Bezier curve</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/perspective">
            <a>Perspective part 1</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/rhodoneacurve">
            <a>Rhodoneacurve</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/particlesystem">
            <a>Particle system</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/underwater">
            <a>Under water</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/lsystem">
            <a>L-system</a>
          </Link>
        </li>
      </ol>
    </div>
  );
}
 
export default Home;
