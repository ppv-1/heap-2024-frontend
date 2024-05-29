import { memo, SVGProps } from 'react';

const VectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 14 7' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path d='M0.25 0L7 6.75L13.75 0' stroke='black' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

const Memo = memo(VectorIcon);
export { Memo as VectorIcon };
