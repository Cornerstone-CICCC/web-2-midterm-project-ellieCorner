import { useCallback, useEffect, useRef, useState } from "react";
import {
  ANIMATION_CONFIG,
  HeartParticleSystem,
  HeartRenderer,
} from "../utils/heart";

interface HeartAnimationProps {
  movieId: number;
  onEnd: () => void;
}

export const HeartAnimation: React.FC<HeartAnimationProps> = ({
  movieId,
  onEnd,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particleSystemRef = useRef(new HeartParticleSystem());
  const heartRendererRef = useRef(new HeartRenderer());
  const [isVisible, setIsVisible] = useState(true);

  const animate = useCallback((): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const particleSystem = particleSystemRef.current;
    particleSystem.updateAll(canvas.height);

    const hearts = particleSystem.getHearts();
    hearts.forEach((heart) => heartRendererRef.current.draw(ctx, heart));

    if (hearts.length > 0) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const createHeartBursts = (centerX: number, centerY: number): void => {
    const { HEART_COUNT, TIMING } = ANIMATION_CONFIG;
    const particleSystem = particleSystemRef.current;

    const createBurst = (): void => {
      if (particleSystem.getCount() < HEART_COUNT) {
        const batchSize =
          TIMING.BATCH_SIZE.MIN +
          Math.floor(
            Math.random() * (TIMING.BATCH_SIZE.MAX - TIMING.BATCH_SIZE.MIN + 1)
          );

        for (
          let i = 0;
          i < batchSize && particleSystem.getCount() < HEART_COUNT;
          i++
        ) {
          const heart = particleSystem.createHeart(centerX, centerY);
          particleSystem.addHeart(heart);
        }

        const nextDelay =
          TIMING.BURST_INTERVAL.MIN +
          Math.random() *
            (TIMING.BURST_INTERVAL.MAX - TIMING.BURST_INTERVAL.MIN);
        setTimeout(createBurst, nextDelay);
      }
    };

    createBurst();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    particleSystemRef.current.clear();

    createHeartBursts(centerX, centerY);

    animate();

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onEnd, ANIMATION_CONFIG.TIMING.FADE_OUT);
    }, ANIMATION_CONFIG.TIMING.DURATION);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    movieId,
    onEnd,
    setIsVisible,
    particleSystemRef,
    heartRendererRef,
    animate,
  ]);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 pointer-events-none"
      style={{ background: "transparent" }}
    />
  );
};
