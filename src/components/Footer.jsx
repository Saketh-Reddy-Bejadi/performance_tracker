import { IoIosMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-gray-300">
      <div className="w-full py-6 px-6 xl:px-20 flex flex-col xl:flex-row items-center justify-between gap-6">
        <Link
          to={"https://github.com/Saketh-Reddy-Bejadi/performance_tracker"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center gap-2 px-4 py-2 text-white border border-zinc-800 rounded-xl transition-all duration-300 cursor-pointer hover:bg-zinc-900">
            Star on GitHub <FaStar />
          </button>
        </Link>

        <div className="flex items-center gap-6">
          {["2026", "2027"].map((batch) => (
            <Link
              to={`/${batch}`}
              key={batch}
              className="px-3 py-1 rounded-full border border-zinc-800 transition-all duration-300 hover:bg-zinc-900"
            >
              {batch}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Link
            to={"https://www.linkedin.com/in/saketh-reddy-bejadi/"}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-zinc-500"
          >
            <FaLinkedin size={22} />
          </Link>
          <Link
            to="mailto:tracker.cmrit@gmail.com"
            className="transition-colors duration-300 hover:text-zinc-500"
          >
            <IoIosMail size={26} />
          </Link>
        </div>
      </div>

      <div className="border-t border-zinc-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-gray-300">CodeTrackr</span>. All
        rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
