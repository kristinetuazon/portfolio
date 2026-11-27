import { useRef } from "react";
import Image from "next/image";
import { reveal, useGSAP } from "../lib/gsap";
import picture1 from "../../public/DSCF0639.jpg";
import picture2 from "../../public/IMG_0536.jpg";
import picture4 from "../../public/reload.jpg";
import picture5 from "../../public/DSCF0609.jpg";
import picture6 from "../../public/GP_3_TokyoNoire_eedited.jpeg";

const SIZES = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

/** Photo collage that assembles itself from both sides as you scroll. */
const Hero = () => {
  const grid = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      reveal(".picture1", "left", grid.current);
      reveal(".picture2", "right", grid.current);
      reveal(".picture3", "left", grid.current);
      reveal(".picture5", "right", grid.current);
      reveal(".picture4", "scale", grid.current, { start: "top 50%" });
    },
    { scope: grid },
  );

  return (
    <div ref={grid} className="mt-36 grid h-fit grid-cols-3">
      <Image
        className="picture1 col-span-2 h-full"
        sizes={SIZES}
        alt="Kristine taking a photo on a street in Japan"
        src={picture1}
        priority
        placeholder="blur"
      />
      <div>
        <Image
          className="picture2 object-cover"
          sizes={SIZES}
          alt="Photo booth snapshot with friends"
          src={picture6}
          placeholder="blur"
        />
      </div>
      <Image
        className="picture3"
        sizes={SIZES}
        alt="Kristine with classmates in matching team shirts"
        src={picture2}
        placeholder="blur"
      />
      <Image
        className="picture5 h-full"
        sizes={SIZES}
        alt="Kristine in a kimono by a canal"
        src={picture5}
        placeholder="blur"
      />
      <Image
        className="picture4 h-full"
        sizes={SIZES}
        alt="Group photo with classmates"
        src={picture4}
        placeholder="blur"
      />
    </div>
  );
};

export default Hero;
