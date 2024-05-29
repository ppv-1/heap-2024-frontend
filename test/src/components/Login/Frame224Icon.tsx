import { memo, SVGProps } from 'react';

const Frame224Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 160 56' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <rect width={160} height={56} rx={4} stroke='#8DD3BB' />
    <path
      d='M92 28.0733C92 21.4055 86.6274 16 80 16C73.3726 16 68 21.4054 68 28.0733C68 34.0994 72.3882 39.0943 78.125 40V31.5633H75.0781V28.0733H78.125V25.4134C78.125 22.3875 79.9166 20.7161 82.6575 20.7161C83.9705 20.7161 85.3438 20.952 85.3438 20.952V23.9231H83.8306C82.3398 23.9231 81.875 24.8538 81.875 25.8086V28.0733H85.2031L84.6711 31.5633H81.875V40C87.6118 39.0943 92 34.0995 92 28.0733Z'
      fill='#1877F2'
    />
  </svg>
);

const Memo = memo(Frame224Icon);
export { Memo as Frame224Icon };
