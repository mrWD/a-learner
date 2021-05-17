import * as React from 'react';

import { Icons } from '../../constants/Icons';

type Props = React.FC<{
  icon: keyof typeof Icons;
  style?: object;
}>;

export const Icon: Props = (props) => {
  const [CurrentIcon, setCurrentIcon] = React.useState(Icons[props.icon]);

  React.useEffect(() => {
    setCurrentIcon(Icons[props.icon])
  }, [props.icon]);

  return <CurrentIcon style={props.style} />;
};
