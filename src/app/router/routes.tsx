import React from 'react';
import { RouteProps } from 'react-router-dom';

import { BoardPage } from 'pages/BoardPage';
import { NotFoundPage } from 'pages/NotFoundPage';

enum AppRoutes {
  BOARD = 'board',
  NOT_FOUND = 'not_found',
}

const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.BOARD]: '/',
  [AppRoutes.NOT_FOUND]: '*',
};

export const routes: Record<AppRoutes, RouteProps> = {
  [AppRoutes.BOARD]: {
    path: RoutePath.board,
    element: <BoardPage />,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: <NotFoundPage />,
  },
};
