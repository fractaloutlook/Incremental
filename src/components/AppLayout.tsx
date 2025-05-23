import React from 'react';
import IncrementalGame from './IncrementalGame';

const AppLayout: React.FC = () => {
  return (
    <div className="w-full h-full">
      <IncrementalGame />
    </div>
  );
};

export default AppLayout;