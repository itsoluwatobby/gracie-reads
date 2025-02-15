import { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import {
  MdOutlineStarHalf,
  MdStar
} from "react-icons/md";

type AudioRatingProps = {
  rating: Rating[];
  rateAudiobook: (rating: number) => Promise<void>;
}

let leastRating = 0;
export default function AudioRating({ rating, rateAudiobook }: AudioRatingProps) {
  const [starRating, setStarRating] = useState<number[]>([]);
  const [clicks, setClicks] = useState<number>(0);
  const curr = useRef<number>();

  const getIcon = () => {
    if (clicks === 1) return MdOutlineStarHalf;
    return MdStar;
  };

  useEffect(() => {
    let averageRating = rating?.reduce((acc, curr) => acc + curr.rating, 0) / rating?.length;

    averageRating = Number.isNaN(averageRating) ? 0 : Math.round(averageRating);
    setStarRating([...Array(averageRating).keys()]);
  }, [rating])

  const RATING_STAR = [
    { id: 0, ICON: getIcon() },
    { id: 1, ICON: getIcon() },
    { id: 2, ICON: getIcon() },
    { id: 3, ICON: getIcon() },
    { id: 4, ICON: getIcon() },
  ];

  const handleRatings = async (rate: number) => {
    let ratingArr = [...Array(rate).keys()]
    if (leastRating === rate) {
      setStarRating([])
      leastRating = 0;
      ratingArr = [];
    } else if (starRating.length > 1 && starRating.length === rate && clicks > 1) {
      setStarRating([...Array(rate - 1).keys()])
    } else setStarRating([...Array(rate).keys()])
    leastRating = (ratingArr.length == 1) ? rate : 0;
    if (curr.current === rate) {
      setClicks((prev) => (prev === 2 ? prev = 0 : prev + 1));
    } else {
      setClicks(1);
    }
    curr.current = rate;
    await rateAudiobook(rate);
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
        className={`cursor-pointer text-xl ${starRating?.includes(rater.id) ? 'text-[#FCC200]' : 'text-gray-400'} active:scale-[1] transition-all`}
      />
    </span>
  )
}
