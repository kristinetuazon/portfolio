import Link from "next/link";
import { fadeInOn, useGSAP } from "../lib/gsap";

// Each link lights up once you reach its section.
const LINKS = [
  { id: "navStart", href: "#name", label: "Start" },
  { id: "navAbout", href: "#about", label: "About" },
  { id: "navProject", href: "#projects", label: "Project" },
  { id: "navContact", href: "#contact", label: "Contact" },
];

const NavBar = () => {
  useGSAP(() => {
    LINKS.forEach(({ id, href }) => fadeInOn(`#${id}`, href));
  });

  return (
    <nav className="w-100 fixed inset-x-0 top-5 flex justify-evenly">
      <div className="grid grid-cols-5 gap-2 text-sm md:gap-4 md:text-base">
        {LINKS.map(({ id, href, label }) => (
          <div key={id} id={id} className="grid grid-rows-2 place-items-center">
            <a className="font-audreyMedium uppercase text-white" href={href}>
              {label}
            </a>
          </div>
        ))}
        <div className="grid grid-rows-2 place-items-center">
          <Link className="font-audreyMedium uppercase text-white" href="/blog">
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
