import { memo, SVGProps } from 'react';

const VectorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio='none' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
    <path
      d='M15.75 0H2.25C1.00736 0 0 1.00736 0 2.25V15.75C0 16.9926 1.00736 18 2.25 18H15.75C16.9926 18 18 16.9926 18 15.75V2.25C18 1.00736 16.9926 0 15.75 0Z'
      stroke='#112211'
      strokeWidth={2}
      strokeLinejoin='round'
    />
  </svg>
);

const Memo = memo(VectorIcon);
export { Memo as VectorIcon };
