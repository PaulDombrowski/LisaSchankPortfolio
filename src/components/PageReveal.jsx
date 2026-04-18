import { motion } from 'framer-motion';

export function PageReveal({ children, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: 'blur(18px) contrast(1.35)', scale: 1.015 }}
      animate={{ opacity: 1, filter: 'blur(0px) contrast(1)', scale: 1 }}
      transition={{ duration: 1.2, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function DrawMarker({ className }) {
  return (
    <motion.span
      className={className}
      initial={{ scaleX: 0, opacity: 0, skewX: -16 }}
      animate={{ scaleX: 1, opacity: 1, skewX: -10 }}
      transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    />
  );
}

export function StaggerList({ children, className }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: 0.55,
            staggerChildren: 0.09,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, href }) {
  const MotionTag = href ? motion.a : motion.div;

  return (
    <MotionTag
      className={className}
      href={href}
      variants={{
        hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}
