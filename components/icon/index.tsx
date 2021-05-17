import * as React from 'react';

import { Icons } from '../../constants/Icons';

type Props = React.FC<{
  icon: keyof typeof Icons;
  style?: object;
}>;

export const Icon: Props = (props) => {
  const [Icon, setIcon] = React.useState(Icons[props.icon]);

  React.useEffect(() => {
    setIcon(Icons[props.icon])
  }, [props.icon]);

  return <Icon style={props.style} />;
};
