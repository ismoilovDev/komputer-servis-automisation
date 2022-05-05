import React from 'react';
import { Progress } from '@ant-design/plots';

const ProgressBar = (props) => {
  const config = {
    height: 25,
    width: 350,
    autoFit: false,
    percent: 0.536,
    barWidthRatio: 0.33,
    color: [`${props.color}`, '#E8EDF3'],
  };
  return  <Progress {...config} />
};
export default ProgressBar;