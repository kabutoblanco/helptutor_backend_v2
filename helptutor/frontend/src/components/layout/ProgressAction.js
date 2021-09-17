import React from 'react';

import { ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export default function ProgressAction() {
  const isRunning = useSelector((state) => state.utils.isRunning);

  console.log(isRunning)

  return (
    <ProgressBar
      animated
      now={100}
      style={{
        borderRadius: 0,
        display: isRunning ? 'flex' : 'none',
      }}
    />
  );
}