import React from 'react';

interface ICanvasContextInterface {
  renderManager: any;
  eventManager: any;
}

export const CanvasContext = React.createContext<ICanvasContextInterface>({
  renderManager: null,
  eventManager: null,
});

export const useCanvasContext = () => React.useContext(CanvasContext);
