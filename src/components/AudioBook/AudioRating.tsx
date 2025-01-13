import { useRef, useState } from "react";
import { IconType } from "react-icons";
import {
  MdOutlineStarHalf,
  MdStar
} from "react-icons/md";

type AudioRatingProps = {
  rating: number;
}

let leastRating = 0;
export default function AudioRating({ rating }: AudioRatingProps) {
  const [starRating, setStarRating] = useState<number[]>([...Array(rating).keys()]);
  const [clicks, setClicks] = useState<number>(0);
  const curr = useRef<number>();

  const getIcon = () => {
    if (clicks === 1) return MdOutlineStarHalf;
    return MdStar;
  };

  const RATING_STAR = [
    { id: 0, ICON: getIcon() },
    { id: 1, ICON: getIcon() },
    { id: 2, ICON: getIcon() },
    { id: 3, ICON: getIcon() },
    { id: 4, ICON: getIcon() },
  ];

  const handleRatings = (id: number) => {
    let ratingArr = [...Array(id).keys()]
    if (leastRating === id) {
      setStarRating([])
      leastRating = 0;
      ratingArr = [];
    } else if (starRating.length > 1 && starRating.length === id && clicks > 1) {
      setStarRating([...Array(id - 1).keys()])
    } else setStarRating([...Array(id).keys()])
    leastRating = (ratingArr.length == 1) ? id : 0;
    if (curr.current === id) {
      setClicks((prev) => (prev === 2 ? prev = 0 : prev + 1));
    } else {
      setClicks(1);
    }
    curr.current = id;
  }

  return (
    <div className="flex items-center gap-1 text-xl">
      {
        RATING_STAR.map(rater => (
          <RateStar
            key={rater.id}
            rater={rater}
            handleRatings={handleRatings}
            starRating={starRating}
          />
        ))
      }
    </div>
  )
}

type RateStarProp = {
  starRating: number[];
  handleRatings: (id: number) => void;
  rater: { id: number; ICON: IconType; };
}

const RateStar = ({ rater, handleRatings, starRating }: RateStarProp) => {
  const iconRef = useRef<HTMLSpanElement>();

  return (
    <span
      key={rater.id}
      id={`${rater.id + 1}`}
      ref={iconRef as React.LegacyRef<HTMLSpanElement>}
      onClick={() => handleRatings(rater.id + 1)}
    >
      <rater.ICON
        className={`cursor-pointer text-xl ${starRating?.includes(rater.id) ? 'text-[#FCC200]' : 'text-gray-300'} active:scale-[1] transition-all`}
      />
    </span>
  )
}
