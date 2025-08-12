import { useEffect } from "react";

interface HeartAnimationProps {
  movieId: number;
  onEnd: () => void;
}

export const HeartAnimation: React.FC<HeartAnimationProps> = ({
  movieId,
  onEnd,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onEnd();
    }, 1000);
    return () => clearTimeout(timer);
  }, [movieId, onEnd]);

  return (
    <div className="fixed top-1/2 left-1/2 text-9xl z-50 pointer-events-none heart-animation">
      💖
    </div>
  );
};
