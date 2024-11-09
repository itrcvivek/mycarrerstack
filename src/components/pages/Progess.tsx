import React, { useState, useEffect } from 'react';

const CircularProgressBar = ({ progress }:any) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="progress-bar">
      <svg className="progress-ring" width="100" height="100">
        <circle
          className="progress-ring-circle"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
        />
        <circle
          className="progress-ring-circle"
          strokeWidth="8"
          r={radius}
          cx="50"
          cy="50"
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="progress-label">{`${progress}%`}</div>
    </div>
  );
};

export default CircularProgressBar;
