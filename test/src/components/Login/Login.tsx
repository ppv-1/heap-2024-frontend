import { memo } from 'react';
import type { FC } from 'react';

import resets from '../_resets.module.css';
import { AntDesignAppleFilledIcon } from './AntDesignAppleFilledIcon';
import { Button_StateDefaultChangeIconN } from './Button_StateDefaultChangeIconN/Button_StateDefaultChangeIconN';
import { Checkbox_CheckboxFalse } from './Checkbox_CheckboxFalse/Checkbox_CheckboxFalse';
import { EyeOff_FillTrue } from './EyeOff_FillTrue/EyeOff_FillTrue';
import { FlatColorIconsGoogleIcon } from './FlatColorIconsGoogleIcon';
import { Frame224Icon } from './Frame224Icon';
import { Frame265Icon } from './Frame265Icon';
import { GroupIcon } from './GroupIcon';
import classes from './Login.module.css';
import { Logo } from './Logo/Logo';
import { TextField_StyleOutlinedStateEn2 } from './TextField_StyleOutlinedStateEn2/TextField_StyleOutlinedStateEn2';
import { TextField_StyleOutlinedStateEn } from './TextField_StyleOutlinedStateEn/TextField_StyleOutlinedStateEn';
import { VectorIcon } from './VectorIcon';

interface Props {
  className?: string;
  hide?: {
    supportingText?: boolean;
    supportingText2?: boolean;
  };
}
/* @figmaId 302:7670 */
export const Login: FC<Props> = memo(function Login(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.rectangle20}></div>
      <div className={classes.rectangle22}></div>
      <div className={classes.frame265}>
        <Frame265Icon className={classes.icon3} />
      </div>
      <Logo
        className={classes.logo}
        classes={{ group: classes.group }}
        swap={{
          group: (
            <div className={classes.group}>
              <GroupIcon className={classes.icon} />
            </div>
          ),
        }}
      />
      <div className={classes.frame266}>
        <div className={classes.frame261}>
          <div className={classes.login}>Login</div>
          <div className={classes.loginToAccessYourGolobeAccount}>Login to access your Golobe account</div>
        </div>
        <div className={classes.frame258}>
          <div className={classes.frame259}>
            <TextField_StyleOutlinedStateEn
              className={classes.textField}
              hide={{
                supportingText: true,
              }}
              text={{
                inputText: <div className={classes.inputText}>john.doe@gmail.com</div>,
                labelText: <div className={classes.labelText}>Email</div>,
              }}
            />
            <TextField_StyleOutlinedStateEn2
              className={classes.textField2}
              swap={{
                chevronDown: <EyeOff_FillTrue />,
              }}
              hide={{
                supportingText: true,
              }}
              text={{
                inputText: <div className={classes.inputText2}>•••••••••••••••••••••••••</div>,
                labelText: <div className={classes.labelText2}>Password</div>,
              }}
            />
            <div className={classes.frame257}>
              <div className={classes.frame101}>
                <Checkbox_CheckboxFalse
                  swap={{
                    vector: <VectorIcon className={classes.icon2} />,
                  }}
                />
                <div className={classes.rememberMe}>Remember me</div>
              </div>
              <div className={classes.forgotPassword}>Forgot Password</div>
            </div>
          </div>
          <div className={classes.frame260}>
            <Button_StateDefaultChangeIconN
              className={classes.button2}
              classes={{ style_layer: classes.style_layer }}
              text={{
                button: <div className={classes.button}>Login</div>,
              }}
            />
            <div className={classes.donTHaveAnAccountSignUp}>
              <p className={classes.labelWrapper}>
                <span className={classes.label}>Don’t have an account? </span>
                <span className={classes.label2}>Sign up</span>
              </p>
            </div>
          </div>
          <div className={classes.frame262}>
            <div className={classes.rectangle6}></div>
            <div className={classes.orLoginWith}>Or login with</div>
            <div className={classes.rectangle7}></div>
          </div>
          <div className={classes.frame228}>
            <div className={classes.frame224}>
              <Frame224Icon className={classes.icon4} />
            </div>
            <div className={classes.frame225}>
              <div className={classes.flatColorIconsGoogle}>
                <FlatColorIconsGoogleIcon className={classes.icon5} />
              </div>
            </div>
            <div className={classes.frame226}>
              <div className={classes.antDesignAppleFilled}>
                <AntDesignAppleFilledIcon className={classes.icon6} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
