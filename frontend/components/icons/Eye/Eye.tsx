import { useEffect, useState } from "react";

type Props = {
  useBlink: number;
};

const Eye = (props: Props) => {
  const { useBlink } = props;
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (useBlink > 0) {
      const blinkIntervals = [500, 700, 900, 1100, 1300];
      const blinkStates = [false, true, false, true, false];
      const timeouts: NodeJS.Timeout[] = [];

      blinkIntervals.forEach((interval, index) => {
        timeouts.push(setTimeout(() => setBlink(blinkStates[index]), interval));
      });

      return () => timeouts.forEach(clearTimeout);
    }
  }, [useBlink]);

  return (
    <svg
      width="27"
      height="14"
      viewBox="0 0 27 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25.3593 4.04437C24.2676 2.94052 22.8848 2.28549 21.4655 1.71537C18.8575 0.660036 16.104 0.34465 12.938 0.33252C12.5377 0.34465 11.7735 0.36891 11.0093 0.417431C8.03736 0.623645 5.21102 1.35146 2.6758 2.95265C1.76603 3.52277 0.953301 4.18994 0.455961 5.16036C-0.368895 6.77368 -0.0656389 8.53256 1.29295 9.90328C2.77284 11.3953 4.65303 12.1959 6.63025 12.766C9.86903 13.7 13.1927 13.8577 16.5407 13.4696C19.0031 13.1906 21.3685 12.5719 23.5398 11.3589C24.7164 10.7039 25.699 9.85476 26.2934 8.65387C27.0576 7.13759 26.6815 5.39083 25.3593 4.04437ZM13.2655 13.0086C9.99033 12.9722 7.30955 10.2429 7.34594 6.95563C7.38233 3.60768 10.0874 0.939032 13.4596 0.999683C16.7954 1.06033 19.4398 3.89881 19.3549 7.14972C19.27 10.3521 16.5043 13.045 13.2655 13.0086Z"
        fill="#FFF"
      />
      <path
        d="M15.3526 7.05272C15.3526 9.18764 14.5641 10.34 13.339 10.34C12.0653 10.34 11.3496 9.27255 11.3496 7.05272V6.88289C11.3496 4.65093 12.1502 3.65625 13.3268 3.65625C14.5156 3.65625 15.3526 4.62667 15.3526 6.88289V7.05272Z"
        fill="#FFF"
        style={{
          opacity: blink ? 0 : 1,
          transition: "opacity 0.2s ease-in-out",
        }}
      />
    </svg>
  );
};

export default Eye;
