import { useEffect, useRef, useState } from 'react';

const LETTERS = 'LISA SCHANK ERINNERUNG GESCHICHTE VERMITTLUNG ARCHIV ORTE SPUREN 1933 1945 2026'.replace(/\s+/g, '');
const PAGE_REVEAL_DELAY = 6200;
const EXIT_START = 6000;
const EXIT_STAGGER = 48;
const STORM_DURATION = 9800;
const HAS_PLAYED_KEY = 'lisa-letter-storm-played';

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

export default function AboutLetterStorm() {
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0, px: 0, py: 0, active: false, force: 0 });
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const hasPlayed = window.sessionStorage.getItem(HAS_PLAYED_KEY) === 'true';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const page = document.querySelector('[data-letter-reveal]');

    function revealPage() {
      page?.classList.remove('is-waiting');
    }

    if (reduceMotion || hasPlayed) {
      revealPage();
      setIsDone(true);
      return undefined;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return undefined;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let lastTime = performance.now();
    let startTime = performance.now();
    let letters = [];

    function finishStorm() {
      window.sessionStorage.setItem(HAS_PLAYED_KEY, 'true');
      setIsDone(true);
    }

    function resize() {
      ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = width < 720 ? 42 : 64;
      const letterSize = width < 720 ? 64 : 104;

      letters = Array.from({ length: count }, (_, index) => {
        const size = letterSize;
        const char = LETTERS[index % LETTERS.length];

        return {
          char,
          x: randomBetween(-width * 0.08, width * 0.94),
          y: randomBetween(-height * 1.2, -size),
          vx: randomBetween(-42, 42),
          vy: randomBetween(20, 92),
          size,
          rotation: randomBetween(-0.55, 0.55),
          vr: randomBetween(-1.3, 1.3),
          width: size * 0.72,
          restOffset: Math.pow(Math.random(), 1.8) * (height < 720 ? 52 : 82),
          tumble: randomBetween(-1, 1),
          exitDelay: index * EXIT_STAGGER + randomBetween(0, 760),
          exiting: false,
        };
      });
    }

    function handlePointerMove(event) {
      const pointer = pointerRef.current;
      pointer.px = pointer.x || event.clientX;
      pointer.py = pointer.y || event.clientY;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      pointer.force = 1;
    }

    function handlePointerLeave() {
      pointerRef.current.active = false;
    }

    function draw(time) {
      const delta = Math.min(0.032, (time - lastTime) / 1000);
      lastTime = time;
      const pointer = pointerRef.current;
      const elapsed = time - startTime;

      context.clearRect(0, 0, width, height);

      for (let i = 0; i < letters.length; i += 1) {
        for (let j = i + 1; j < letters.length; j += 1) {
          const first = letters[i];
          const second = letters[j];
          const dx = second.x - first.x;
          const dy = second.y - first.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          const minDistance = (first.size + second.size) * 0.34;

          if (distance < minDistance) {
            const push = (minDistance - distance) * 0.5;
            const nx = dx / distance;
            const ny = dy / distance;
            const impulse = push * 5.8 * delta;

            first.x -= nx * push * 0.14;
            first.y -= ny * push * 0.06;
            second.x += nx * push * 0.14;
            second.y += ny * push * 0.06;
            first.vx -= nx * impulse;
            second.vx += nx * impulse;
            first.vy -= ny * impulse * 0.35;
            second.vy += ny * impulse * 0.35;
            first.vr -= impulse * 0.006;
            second.vr += impulse * 0.006;
          }
        }
      }

      letters.forEach((letter) => {
        const halfWidth = letter.width / 2;
        const halfHeight = letter.size / 2;
        const floor = height - 18 - halfHeight - letter.restOffset;
        const shouldExit = elapsed > EXIT_START + letter.exitDelay;

        if (shouldExit && !letter.exiting) {
          letter.exiting = true;
          letter.vy = randomBetween(70, 180);
          letter.vx += randomBetween(-50, 50);
          letter.vr += randomBetween(-1.1, 1.1);
        }

        letter.vy += (letter.exiting ? 720 : 360) * delta;

        if (pointer.active || pointer.force > 0.01) {
          const dx = letter.x - pointer.x;
          const dy = letter.y - pointer.y;
          const distance = Math.max(34, Math.hypot(dx, dy));
          const reach = width < 720 ? 150 : 220;

          if (distance < reach) {
            const strength = ((reach - distance) / reach) * 1450 * pointer.force;
            const motionX = pointer.x - pointer.px;
            const motionY = pointer.y - pointer.py;
            letter.vx += (dx / distance) * strength * delta + motionX * 4.8 * delta;
            letter.vy += (dy / distance) * strength * delta + motionY * 4.8 * delta;
            letter.vr += (motionX / 80) * delta;
          }
        }

        letter.x += letter.vx * delta;
        letter.y += letter.vy * delta;
        letter.rotation += letter.vr * delta;

        if (!letter.exiting && letter.y > floor) {
          letter.y = floor;
          letter.vy *= -0.28;
          letter.vx *= 0.78;
          letter.vr = letter.vr * 0.68 + letter.tumble * randomBetween(0.08, 0.24);
          letter.rotation += letter.tumble * randomBetween(0.03, 0.1);
        }

        if (letter.exiting && letter.y > height + letter.size * 1.6) {
          return;
        }

        if (letter.x < halfWidth) {
          letter.x = halfWidth;
          letter.vx = Math.abs(letter.vx) * 0.62;
        }

        if (letter.x > width - halfWidth) {
          letter.x = width - halfWidth;
          letter.vx = -Math.abs(letter.vx) * 0.62;
        }

        context.save();
        context.translate(letter.x, letter.y);
        context.rotate(letter.rotation);
        context.font = `700 ${letter.size}px Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#111513';
        context.fillText(letter.char, 0, 0);
        context.restore();
      });

      pointer.force *= 0.92;
      animationFrame = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    animationFrame = requestAnimationFrame(draw);

    const revealTimeout = window.setTimeout(revealPage, PAGE_REVEAL_DELAY);
    const finishTimeout = window.setTimeout(finishStorm, STORM_DURATION);

    return () => {
      window.clearTimeout(revealTimeout);
      window.clearTimeout(finishTimeout);
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      page?.classList.remove('is-waiting');
    };
  }, []);

  return (
    <div className={`letter-storm ${isDone ? 'is-done' : ''}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
