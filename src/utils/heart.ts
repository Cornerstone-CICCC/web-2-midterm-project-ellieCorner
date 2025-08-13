export interface FallingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
}

export const ANIMATION_CONFIG = {
  HEART_COUNT: 20,
  HEART_SIZE: { MIN: 16, MAX: 40 },
  INITIAL_SPEED: { MIN: 4, MAX: 10 },
  BURST_ANGLE_RANGE: Math.PI / 3,
  BURST_CENTER_SPREAD: { X: 60, Y: 30 },
  PHYSICS: {
    GRAVITY: 0.15,
    AIR_RESISTANCE: 0.99,
    LIFE_DECAY: 0.008,
  },
  TIMING: {
    DURATION: 2500,
    FADE_OUT: 500,
    BURST_INTERVAL: { MIN: 50, MAX: 150 },
    BATCH_SIZE: { MIN: 2, MAX: 5 },
  },
} as const;

export const HEART_COLORS = {
  GRADIENT: {
    INNER: "rgba(255, 105, 180, {opacity})",
    MIDDLE: "rgba(255, 20, 147, {opacity})",
    OUTER: "rgba(199, 21, 133, {opacity})",
  },
  STROKE: "rgba(255, 255, 255, {opacity})",
  HIGHLIGHT: "rgba(255, 255, 255, {opacity})",
} as const;

const HEART_PATH_COMMANDS = [
  { type: "moveTo" as const, x: 2, y: 9.5 },
  {
    type: "bezierCurveTo" as const,
    cp1x: 2,
    cp1y: 6.46,
    cp2x: 4.46,
    cp2y: 4,
    x: 7.5,
    y: 4,
  },
  {
    type: "bezierCurveTo" as const,
    cp1x: 9.24,
    cp1y: 4,
    cp2x: 10.91,
    cp2y: 4.81,
    x: 12,
    y: 6.09,
  },
  {
    type: "bezierCurveTo" as const,
    cp1x: 13.09,
    cp1y: 4.81,
    cp2x: 14.76,
    cp2y: 4,
    x: 16.5,
    y: 4,
  },
  {
    type: "bezierCurveTo" as const,
    cp1x: 19.54,
    cp1y: 4,
    cp2x: 22,
    cp2y: 6.46,
    x: 22,
    y: 9.5,
  },
  {
    type: "bezierCurveTo" as const,
    cp1x: 22,
    cp1y: 11.79,
    cp2x: 20.5,
    cp2y: 13.5,
    x: 19,
    y: 15,
  },
  { type: "lineTo" as const, x: 13.508, y: 20.313 },
  {
    type: "bezierCurveTo" as const,
    cp1x: 12.94,
    cp1y: 20.88,
    cp2x: 12.06,
    cp2y: 20.88,
    x: 11.492,
    y: 20.313,
  },
  { type: "lineTo" as const, x: 5, y: 15 },
  {
    type: "bezierCurveTo" as const,
    cp1x: 3.5,
    cp1y: 13.5,
    cp2x: 2,
    cp2y: 11.8,
    x: 2,
    y: 9.5,
  },
] as const;

export class HeartParticleSystem {
  private hearts: FallingHeart[] = [];
  private heartCount = 0;

  createHeart(centerX: number, centerY: number): FallingHeart {
    const { HEART_SIZE, INITIAL_SPEED, BURST_CENTER_SPREAD } = ANIMATION_CONFIG;

    const angle = Math.random() * Math.PI * 2;
    const speed =
      INITIAL_SPEED.MIN +
      Math.random() * (INITIAL_SPEED.MAX - INITIAL_SPEED.MIN);

    return {
      id: Math.random(),
      x: centerX + (Math.random() - 0.5) * BURST_CENTER_SPREAD.X,
      y: centerY + (Math.random() - 0.5) * BURST_CENTER_SPREAD.Y,
      size: HEART_SIZE.MIN + Math.random() * (HEART_SIZE.MAX - HEART_SIZE.MIN),
      opacity: 0.9,
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
      life: 1,
    };
  }
  updateHeart(heart: FallingHeart): FallingHeart {
    const { PHYSICS } = ANIMATION_CONFIG;

    return {
      ...heart,
      x: heart.x + heart.velocityX,
      y: heart.y + heart.velocityY,
      velocityX: heart.velocityX * PHYSICS.AIR_RESISTANCE,
      velocityY: heart.velocityY + PHYSICS.GRAVITY,
      rotation: heart.rotation + heart.rotationSpeed,
      life: heart.life - PHYSICS.LIFE_DECAY,
      opacity: 1,
      size: heart.size * (0.995 + heart.life * 0.005),
    };
  }

  addHeart(heart: FallingHeart): void {
    this.hearts.push(heart);
    this.heartCount++;
  }

  updateAll(canvasHeight: number): void {
    this.hearts = this.hearts
      .map((heart) => this.updateHeart(heart))
      .filter((heart) => heart.life > 0 && heart.y < canvasHeight + 50);
  }

  getHearts(): readonly FallingHeart[] {
    return this.hearts;
  }

  getCount(): number {
    return this.heartCount;
  }

  clear(): void {
    this.hearts = [];
    this.heartCount = 0;
  }
}

export class HeartRenderer {
  private createGradient(
    ctx: CanvasRenderingContext2D,
    size: number,
    opacity: number
  ): CanvasGradient {
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size);
    gradient.addColorStop(
      0,
      HEART_COLORS.GRADIENT.INNER.replace("{opacity}", opacity.toString())
    );
    gradient.addColorStop(
      0.6,
      HEART_COLORS.GRADIENT.MIDDLE.replace(
        "{opacity}",
        (opacity * 0.8).toString()
      )
    );
    gradient.addColorStop(
      1,
      HEART_COLORS.GRADIENT.OUTER.replace(
        "{opacity}",
        (opacity * 0.6).toString()
      )
    );
    return gradient;
  }

  private drawHeartPath(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();

    HEART_PATH_COMMANDS.forEach((cmd) => {
      switch (cmd.type) {
        case "moveTo":
          ctx.moveTo(cmd.x, cmd.y);
          break;
        case "bezierCurveTo":
          ctx.bezierCurveTo(
            cmd.cp1x,
            cmd.cp1y,
            cmd.cp2x,
            cmd.cp2y,
            cmd.x,
            cmd.y
          );
          break;
        case "lineTo":
          ctx.lineTo(cmd.x, cmd.y);
          break;
      }
    });
  }

  private drawHighlight(ctx: CanvasRenderingContext2D, opacity: number): void {
    ctx.fillStyle = HEART_COLORS.HIGHLIGHT.replace(
      "{opacity}",
      (opacity * 0.4).toString()
    );
    ctx.beginPath();
    ctx.ellipse(8, 8, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  draw(ctx: CanvasRenderingContext2D, heart: FallingHeart): void {
    ctx.save();
    ctx.translate(heart.x, heart.y);
    ctx.rotate((heart.rotation * Math.PI) / 180);
    ctx.globalAlpha = heart.opacity;

    const scale = heart.size / 24;
    const offset = -12 * scale;

    ctx.scale(scale, scale);
    ctx.translate(offset, offset);

    ctx.fillStyle = this.createGradient(ctx, 24, heart.opacity);
    ctx.strokeStyle = HEART_COLORS.STROKE.replace(
      "{opacity}",
      (heart.opacity * 0.3).toString()
    );
    ctx.lineWidth = 1;

    this.drawHeartPath(ctx);
    ctx.fill();
    ctx.stroke();

    this.drawHighlight(ctx, heart.opacity);

    ctx.restore();
  }
}
