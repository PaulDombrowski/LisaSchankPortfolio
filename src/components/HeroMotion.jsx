import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function Underline({ color = '#00d9ff', delay = 0 }) {
  return (
    <motion.svg
      className="marker marker-sketch"
      viewBox="0 0 300 36"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M8 22 C54 10 89 28 135 18 C185 7 224 25 292 14"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0, 1],
          d: [
            'M8 22 C54 10 89 28 135 18 C185 7 224 25 292 14',
            'M7 15 C48 28 91 8 137 23 C182 36 224 7 293 21',
            'M9 27 C56 6 91 32 134 14 C184 -1 224 32 291 11',
            'M8 22 C54 10 89 28 135 18 C185 7 224 25 292 14',
          ],
        }}
        transition={{
          pathLength: { duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.28, delay },
          d: { duration: 4.4, delay: delay + 1.15, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        }}
      />
      <motion.path
        d="M5 26 C62 19 94 30 142 24 C198 17 236 24 295 20"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.48"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0, 0.48],
          x: [0, 3, -2, 0],
          d: [
            'M5 26 C62 19 94 30 142 24 C198 17 236 24 295 20',
            'M4 31 C60 12 99 34 144 20 C196 5 239 31 296 16',
            'M7 20 C61 30 96 13 141 28 C200 39 234 13 294 25',
            'M5 26 C62 19 94 30 142 24 C198 17 236 24 295 20',
          ],
        }}
        transition={{
          pathLength: { duration: 1.1, delay: delay + 0.18, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.28, delay: delay + 0.18 },
          x: { duration: 4.8, delay: delay + 1.35, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          d: { duration: 4.7, delay: delay + 1.35, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        }}
      />
      <motion.path
        d="M18 17 C72 14 111 16 164 13 C218 10 247 14 284 9"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.34"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: [0, 1],
          y: [0, -1.5, 1, 0],
          d: [
            'M18 17 C72 14 111 16 164 13 C218 10 247 14 284 9',
            'M16 10 C70 25 114 8 166 18 C216 28 249 4 286 14',
            'M19 24 C74 6 110 23 162 9 C220 -1 246 22 283 7',
            'M18 17 C72 14 111 16 164 13 C218 10 247 14 284 9',
          ],
        }}
        transition={{
          pathLength: { duration: 1, delay: delay + 0.32, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 5.2, delay: delay + 1.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
          d: { duration: 5.1, delay: delay + 1.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        }}
      />
    </motion.svg>
  );
}

function Circle({ delay = 0 }) {
  return (
    <motion.svg
      className="marker marker-circle-sketch"
      viewBox="0 0 340 104"
      preserveAspectRatio="none"
    >
      <motion.path
        d="M31 58 C44 19 174 8 286 28 C348 42 301 91 168 87 C58 84 -8 70 31 58Z"
        fill="none"
        stroke="#ff4f8b"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0, 1],
          d: [
            'M31 58 C44 19 174 8 286 28 C348 42 301 91 168 87 C58 84 -8 70 31 58Z',
            'M27 50 C55 8 168 19 289 24 C338 26 313 99 160 90 C52 84 -18 62 27 50Z',
            'M37 66 C32 31 181 -2 281 35 C358 64 286 83 174 94 C48 106 0 81 37 66Z',
            'M31 58 C44 19 174 8 286 28 C348 42 301 91 168 87 C58 84 -8 70 31 58Z',
          ],
        }}
        transition={{
          pathLength: { duration: 1.18, delay, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.28, delay },
          d: { duration: 4.8, delay: delay + 1.25, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        }}
      />
      <motion.path
        d="M45 49 C86 20 183 21 267 35 C310 43 276 72 170 73 C82 75 31 62 45 49Z"
        fill="none"
        stroke="#ff4f8b"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.44"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0, 0.44],
          d: [
            'M45 49 C86 20 183 21 267 35 C310 43 276 72 170 73 C82 75 31 62 45 49Z',
            'M39 43 C94 14 177 29 272 30 C301 31 287 78 164 68 C77 61 24 71 39 43Z',
            'M52 56 C75 27 190 11 260 41 C323 68 255 66 175 79 C87 94 36 55 52 56Z',
            'M45 49 C86 20 183 21 267 35 C310 43 276 72 170 73 C82 75 31 62 45 49Z',
          ],
        }}
        transition={{
          pathLength: { duration: 1.05, delay: delay + 0.22, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.28, delay: delay + 0.22 },
          d: { duration: 5.1, delay: delay + 1.45, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
        }}
      />
    </motion.svg>
  );
}

const fallbackLines = [
  'Ich bin Lisa Schank,',
  'und beschäftige mich mit',
  'Mich interessiert, wie',
  'in Bildern, Orten und Erzählungen weiterlebt.',
];

const portraitVariants = {
  rest: {
    opacity: 0,
    x: '-50%',
    y: '-46%',
    scale: 0.98,
    rotate: 0,
    filter: 'blur(4px)',
    transition: {
      duration: 0.32,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  hover: {
    opacity: 1,
    x: '-50%',
    y: '-50%',
    scale: 1,
    rotate: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.46,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function LisaName({ line }) {
  if (!line.includes('Lisa Schank')) {
    return line;
  }

  const [prefix, rest = ''] = line.split('Lisa Schank');

  return (
    <>
      {prefix}
      <motion.span
        className="portrait-trigger"
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        tabIndex={0}
      >
        Lisa Schank
        <motion.span className="portrait-card" variants={portraitVariants} aria-hidden="true">
          <img src="/Lisa-Portrait.jpeg" alt="" />
        </motion.span>
      </motion.span>
      {rest}
    </>
  );
}

function ScatterWord({ text, offset = 0 }) {
  return (
    <span className="scatter-word">
      {[...text].map((char, index) => {
        const charIndex = offset + index;

        return (
          <span
            className="scatter-char"
            style={{
              '--char-delay': `${charIndex * 0.02}s`,
              '--char-x': `${((charIndex * 31) % 25) - 12}px`,
              '--char-y': `${((charIndex * 23) % 19) - 9}px`,
              '--char-rotate': `${((charIndex * 37) % 19) - 9}deg`,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

function ScatterText({ text, start = 0 }) {
  let offset = start;

  return text.split(/(\s+)/).map((part) => {
    if (!part.trim()) {
      offset += part.length;
      return ' ';
    }

    const word = <ScatterWord text={part} offset={offset} />;
    offset += part.length;
    return word;
  });
}

function ScatterLisaName({ line }) {
  if (!line.includes('Lisa Schank')) {
    return <ScatterText text={line} />;
  }

  const [prefix, rest = ''] = line.split('Lisa Schank');

  return (
    <>
      <ScatterText text={prefix} />
      <motion.span
        className="portrait-trigger"
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        tabIndex={0}
      >
        <ScatterText text="Lisa Schank" />
        <motion.span className="portrait-card" variants={portraitVariants} aria-hidden="true">
          <img src="/Lisa-Portrait.jpeg" alt="" />
        </motion.span>
      </motion.span>
      <ScatterText text={rest} />
    </>
  );
}

export default function HeroMotion({ lines = fallbackLines, marks = {} }) {
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const smoothX = useSpring(pointerX, { stiffness: 70, damping: 24, mass: 0.55 });
  const smoothY = useSpring(pointerY, { stiffness: 70, damping: 24, mass: 0.55 });
  const glowX = useTransform(smoothX, (value) => `${value}%`);
  const glowY = useTransform(smoothY, (value) => `${value}%`);

  function handlePointerMove(event) {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    pointerX.set(Math.min(100, Math.max(0, x)));
    pointerY.set(Math.min(100, Math.max(0, y)));
  }

  return (
    <section className="hero-motion" aria-label="Intro" onPointerMove={handlePointerMove}>
      <motion.div
        className="mouse-gradient"
        style={{ '--glow-x': glowX, '--glow-y': glowY }}
        aria-hidden="true"
      />

      <p className="statement">
        <span>
          <ScatterLisaName line={lines[0] ?? fallbackLines[0]} />
          <span className="marked">
            <ScatterText text={marks.first ?? 'Historikerin'} />
            <Underline delay={0.95} />
          </span>
        </span>
        <span>
          <ScatterText text={lines[1] ?? fallbackLines[1]} />
          <span className="marked">
            <ScatterText text={marks.second ?? 'Erinnerungskulturen'} />
            <Underline color="#eaff00" delay={1.12} />
          </span>
          <ScatterText text="." />
        </span>
        <span>
          <ScatterText text={lines[2] ?? fallbackLines[2]} />
          <span className="marked circle-wrap">
            <ScatterText text={marks.third ?? 'Vergangenheit'} />
            <Circle delay={1.28} />
          </span>
        </span>
        <span><ScatterText text={lines[3] ?? fallbackLines[3]} /></span>
      </p>
    </section>
  );
}
