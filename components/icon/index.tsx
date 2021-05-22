import * as React from 'react';
import { StyleSheet } from 'react-native';

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

  return <CurrentIcon style={{ ...styles.icon, ...props.style }} />;
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    color: '#222222',
  },
});
