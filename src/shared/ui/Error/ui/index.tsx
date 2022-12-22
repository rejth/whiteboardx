/* eslint-disable no-restricted-globals */
import React from 'react';
import cls from './Error.module.scss';

export function Error() {
  const reloadPage = () => location.reload();

  return (
    <div className={cls.Error}>
      <p>Fatal Error</p>
      <button type="button" onClick={reloadPage}>
        Reload page
      </button>
    </div>
  );
}
