import React from 'react';
import Split from 'react-split';
import '../styles/styles.css';

const MainLayout = ({ childOne, childTwo }) => {
  return (
    <Split
      className="split"
      sizes={[70, 30]} 
      minSize={100}
      gutterSize={5}
      direction="horizontal"
    >
      <div className="pane">{childOne}</div>
      <div className="pane bg-black">{childTwo}</div>
    </Split>
  );
};

export default MainLayout;

