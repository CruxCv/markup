/* *
 * 波浪
 * @tips 预设两条波纹 预设颜色和波浪移动时间
 * @param  color 波纹背景色, dur 运动时间, to 偏移距离
 */
import React from 'react';

import './Wave.less';

const Wave = ({ waves }) => {
  const svg = 'M 0 10 Q 120 25,' +
    '240 10 T 480 10 ' +
    'T 720 10 T 960 10 ' +
    'T 1200 10 T 1440 10 ' +
    'T 1680 10 T 1920 10 ' +
    'V 30 H 0 V 0';
  return <div className="wave-wrap">
    <svg xmlns="http://www.w3.org/2000/svg" height="40" className="svg-wrap">
      {
        waves &&
        waves.length > 0 &&
        waves.map(({ color, dur, to }, index) =>
          <g key={index} fill={color || (index === 0 ? 'rgba(255, 255, 255, .4)' : 'rgba(255, 255, 255, .5)')}>
            <path d={svg}></path>
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              from="0"
              to={to || (index === 0 ? '-460' : '-480')}
              dur={dur || (index === 0 ? '1.5s' : '3s')}
              repeatCount="indefinite">
            </animateTransform>
          </g>
        )
      }
    </svg>
  </div>;
};

export default Wave;

