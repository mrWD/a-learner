import moment from 'moment';

export const formatTime = (val: number) => moment.utc(val)
  .format('HH:mm:ss.SSS')
  .replace(/00:/g, '');
