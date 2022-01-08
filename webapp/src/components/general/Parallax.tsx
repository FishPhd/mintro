import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { usingApollo } from "../../utils/withApollo";

type ParallaxProps = {
  children: ReactNode;
  offset?: number;
  clampInitial?: boolean;
  clampFinal?: boolean;
};

const Parallax = ({
  children,
  offset = 50,
  clampInitial,
  clampFinal,
}: ParallaxProps): JSX.Element => {
  const prefersReducedMotion = useReducedMotion();
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  const { scrollY } = useViewportScroll();

  const initial = elementTop - clientHeight;
  const final = elementTop + offset;

  const yRange = useTransform(
    scrollY,
    [initial, final],
    [clampInitial ? 0 : offset, clampFinal ? 0 : -offset]
  );
  const y = useSpring(yRange, { stiffness: 400, damping: 90 });

  useEffect(() => {
    const element = ref.current;
    const onResize = () => {
      setElementTop(
        element
          ? element.getBoundingClientRect().top + window.scrollY
          : null || window.pageYOffset
      );
      setClientHeight(window.innerHeight);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ref]);

  // Don't parallax if the user has "reduced motion" enabled
  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

export default usingApollo({ ssr: true })(Parallax);
