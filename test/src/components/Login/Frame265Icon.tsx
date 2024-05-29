import { memo, SVGProps } from 'react';

const Frame265Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 68 10' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <circle cx={5} cy={5} r={5} fill='white' />
    <rect x={18} width={32} height={10} rx={5} fill='#8DD3BB' />
    <circle cx={63} cy={5} r={5} fill='white' />
  </svg>
);

const Memo = memo(Frame265Icon);
export { Memo as Frame265Icon };
