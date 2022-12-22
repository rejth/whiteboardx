import React, { memo, Suspense, useCallback } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';

import { routeConfig } from 'shared/config';

function AppRouter() {
  const renderWithWrapper = useCallback((route: RouteProps) => {
    const element = <Suspense fallback="">{route.element}</Suspense>;
    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
}

export default memo(AppRouter);
