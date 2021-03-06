import * as React from 'react';

interface Props {
  value?: string | any[];
  required?: boolean;
}

const getColor = (props: Props) => props.required && !props.value?.length ? '#dc3545' : '#000000';

export const useColor = (props: Props) => {
  const [color, setColor] = React.useState('#000000');

  React.useEffect(() => {
    setColor(getColor(props));
  }, [props.value]);

  React.useEffect(() => {
    setColor('#000000');
  }, []);

  return color;
};
