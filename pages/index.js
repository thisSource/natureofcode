import "tailwindcss/tailwind.css";
import Link from "next/link";

function Home() {
  return (
    <div className="ml-10 mt-10">
      <ol>
        <li className="hover:underline">
          <Link href="/randomwalkerperlinnoise">
            <a>Random walker by perlin noise</a>
          </Link>
        </li>
        <li className="hover:underline">
          <Link href="/perlinnoise">
            <a>Perlin noise</a>
          </Link>
        </li>
      </ol>
    </div>
  );
}

export default Home;
