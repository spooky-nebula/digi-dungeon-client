import React, { FunctionComponent } from 'react';
import HistoryWindow from './historywindow';

interface DebugHellProps {
  open: {
    history: boolean;
  };
  handleClose: {
    history: () => void;
  };
}

const DebugHell: FunctionComponent<DebugHellProps> = ({
  open,
  handleClose
}) => {
  return (
    <div>
      <HistoryWindow
        handleClose={handleClose.history}
        isOpen={open.history}
      ></HistoryWindow>
    </div>
  );
};

export default DebugHell;
