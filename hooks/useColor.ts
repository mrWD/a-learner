import * as React from 'react';

interface Props {
  value?: string | any[];
  required?: boolean;
}

const getColor = (props: Props) => props.required && !props.value?.length ? '#dc3545' : '#222222';

export const useColor = (props: Props) => {
  const [color, setColor] = React.useState('#222222');

  React.useEffect(() => {
    setColor(getColor(props));
  }, [props.value]);

  React.useEffect(() => {
    setColor('#222222');
  }, []);

  return color;
};
