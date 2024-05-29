import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './Button_StateDefaultChangeIconN.module.css';

interface Props {
  className?: string;
  classes?: {
    style_layer?: string;
    root?: string;
  };
  text?: {
    button?: ReactNode;
  };
}
/* @figmaId 39:4322 */
export const Button_StateDefaultChangeIconN: FC<Props> = memo(function Button_StateDefaultChangeIconN(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={`${props.classes?.style_layer || ''} ${classes.style_layer}`}>
        {props.text?.button != null ? props.text?.button : <div className={classes.button}>Button</div>}
      </div>
    </div>
  );
});
