import React from 'react';
import { TinyLine } from '@ant-design/plots';

const LineChart = () => {
  const data = [
    264, 817, 680, 887, 469, 497, 350, 575, 803, 430, 1125, 392, 492
  ];
  const config = {
    height: 109,
    autoFit: false,
    padding: [20, 0],
    data,
    smooth: true,
  };
  return <TinyLine {...config} />;
};

export default LineChart;