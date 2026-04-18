import { useEffect, useRef } from 'react';

const NAME = 'LISA SCHANK';
const START_DELAY = 1400;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export default function AboutNameFall() {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, px: 0, py: 0, active: false, force: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let lastTime = performance.now();
    let startTime = performance.now();
    let isReady = false;
    let isStopped = false;
    let startTimer = 0;
    let letters = [];

    function resize() {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const size = Math.min(width < 640 ? 58 : 88, width / 7.4);
      context.font = `500 ${size}px Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
      const totalWidth = context.measureText(NAME).width;
      let cursor = (width - totalWidth) / 2;

      letters = [...NAME].map((char, index) => {
        const measure = context.measureText(char === ' ' ? 'i' : char);
        const charWidth = char === ' ' ? size * 0.34 : measure.width;
        const targetX = cursor + charWidth / 2;
        cursor += charWidth;

        return {
          char,
          x: targetX + randomBetween(-42, 42),
          y: -size - index * randomBetween(76, 126),
          vx: randomBetween(-38, 38),
          vy: randomBetween(70, 170),
          targetX,
          size,
          width: charWidth,
          halfWidth: Math.max(charWidth * 0.5, size * 0.18),
          halfHeight: size * 0.48,
          rotation: randomBetween(-1.05, 1.05),
          vr: randomBetween(-2.2, 2.2),
          delay: index * 84,
        };
      });
    }

    function handlePointerMove(event) {
      if (!isReady || isStopped) return;

      const pointer = pointerRef.current;
      pointer.px = pointer.x || event.clientX;
      pointer.py = pointer.y || event.clientY;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      pointer.force = 1;

      if (!animationFrame) {
        lastTime = performance.now();
        animationFrame = requestAnimationFrame(draw);
      }
    }

    function handlePointerLeave() {
      pointerRef.current.active = false;
    }

    function draw(time) {
      if (isStopped) return;

      const delta = Math.min(0.032, (time - lastTime) / 1000);
      lastTime = time;
      const pointer = pointerRef.current;
      let maxEnergy = pointer.force;

      context.clearRect(0, 0, width, height);

      letters.forEach((letter) => {
        if (letter.char === ' ') return;

        const floor = height - letter.halfHeight - 8;

        letter.vy += 820 * delta;

        if (letter.y > floor) {
          letter.y = floor;
          letter.vy *= -0.26;
          letter.vx *= 0.82;
          letter.vr *= 0.72;
        }

        if (letter.y > floor - letter.size * 1.8) {
          letter.vx += (letter.targetX - letter.x) * 0.95 * delta;
        }

        if (pointer.active || pointer.force > 0.01) {
          const dx = letter.x - pointer.x;
          const dy = letter.y - pointer.y;
          const distance = Math.max(28, Math.hypot(dx, dy));
          const reach = 220;

          if (distance < reach) {
            const strength = ((reach - distance) / reach) * 3900 * pointer.force;
            const motionX = pointer.x - pointer.px;
            const motionY = pointer.y - pointer.py;
            letter.vx += (dx / distance) * strength * delta + motionX * 11 * delta;
            letter.vy += (dy / distance) * strength * delta + motionY * 11 * delta;
            letter.vr += (motionX / 34) * delta;
          }
        }

        letter.x += letter.vx * delta;
        letter.y += letter.vy * delta;
        letter.rotation += letter.vr * delta;
        maxEnergy = Math.max(maxEnergy, Math.abs(letter.vx) + Math.abs(letter.vy) + Math.abs(letter.vr) * 25);

        if (letter.x < letter.halfWidth) {
          letter.x = letter.halfWidth;
          letter.vx = Math.abs(letter.vx) * 0.46;
          letter.vr *= 0.8;
        }

        if (letter.x > width - letter.halfWidth) {
          letter.x = width - letter.halfWidth;
          letter.vx = -Math.abs(letter.vx) * 0.46;
          letter.vr *= 0.8;
        }

        if (letter.y < letter.halfHeight) {
          letter.y = letter.halfHeight;
          letter.vy = Math.abs(letter.vy) * 0.42;
          letter.vr *= 0.82;
        }

        if (letter.y > height - letter.halfHeight) {
          letter.y = height - letter.halfHeight - 8;
          letter.vy = -Math.abs(letter.vy) * 0.34;
          letter.vx *= 0.78;
          letter.vr *= 0.72;
        }

        context.save();
        context.translate(letter.x, letter.y);
        context.rotate(letter.rotation);
        context.font = `500 ${letter.size}px Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#111513';
        context.fillText(letter.char, 0, 0);
        context.restore();
      });

      pointer.force *= 0.9;
      if (time - startTime < 4200 || maxEnergy > 10) {
        animationFrame = requestAnimationFrame(draw);
      } else {
        animationFrame = 0;
      }
    }

    resize();

    function stopAnimation() {
      isStopped = true;
      window.clearTimeout(startTimer);
      window.cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      context.clearRect(0, 0, width, height);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('astro:before-preparation', stopAnimation);
    document.addEventListener('astro:before-swap', stopAnimation);
    startTimer = window.setTimeout(() => {
      if (isStopped) return;
      isReady = true;
      startTime = performance.now();
      lastTime = startTime;
      animationFrame = requestAnimationFrame(draw);
    }, START_DELAY);

    return () => {
      stopAnimation();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('astro:before-preparation', stopAnimation);
      document.removeEventListener('astro:before-swap', stopAnimation);
    };
  }, []);

  return <canvas className="about-name-fall" ref={canvasRef} aria-label="Lisa Schank" />;
}
