import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import resets from '../../_resets.module.css';
import classes from './TextField_StyleOutlinedStateEn.module.css';

interface Props {
  className?: string;
  classes?: {
    root?: string;
  };
  hide?: {
    supportingText?: boolean;
  };
  text?: {
    inputText?: ReactNode;
    labelText?: ReactNode;
  };
}
/* @figmaId 7:180 */
export const TextField_StyleOutlinedStateEn: FC<Props> = memo(function TextField_StyleOutlinedStateEn(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${props.classes?.root || ''} ${props.className || ''} ${classes.root}`}>
      <div className={classes.textField}>
        <div className={classes.stateLayer}>
          <div className={classes.content}>
            <div className={classes.inputText}>
              {props.text?.inputText != null ? props.text?.inputText : <div className={classes.inputText2}>Input</div>}
            </div>
            <div className={classes.labelText}>
              {props.text?.labelText != null ? props.text?.labelText : <div className={classes.labelText2}>Label</div>}
            </div>
          </div>
        </div>
      </div>
      {!props.hide?.supportingText && (
        <div className={classes.supportingText}>
          <div className={classes.supportingText2}>Supporting text</div>
        </div>
      )}
    </div>
  );
});
