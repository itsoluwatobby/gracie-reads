import { useState } from "react";
import { helper, hoverEffects } from "../utils";

type LogoProps = {
  appName: string;
}

export default function Logo({ appName }: LogoProps) {

  const [hoverIndex, setHoverIndex] = useState(0);

  const modifyHoverCount = () => {
    const randomIndex = Math.floor(Math.random() * hoverEffects.length);
    setHoverIndex(randomIndex);
  }

  return (
    <div className='relative'>
        <svg width="63" height="58"
          onMouseEnter={modifyHoverCount}
          className={`absolute transition-transform cursor-pointer ${hoverEffects[hoverIndex]}`}
          xmlns="http://www.w3.org/2000/svg">
          <polygon points="41,11 60,22 60,46 42,55 22,46 22,22"
            fill='#0a192f' stroke="#a5f3fc" strokeWidth="2.5" />

          <text x="41" y="34" fontSize="25" textAnchor="middle" dominantBaseline="middle" fill="#a5f3fc">{helper.getFirstLetters(appName)}</text>
        </svg>
        <svg width="100" height="80" xmlns="http://www.w3.org/2000/svg">
          <polygon points="41,11 60,22 60,46 42,55 22,46 22,22"
            fill='#a5f3fc' stroke="#a5f3fc" strokeWidth="2.5" />
        </svg>
      </div>
  )
}