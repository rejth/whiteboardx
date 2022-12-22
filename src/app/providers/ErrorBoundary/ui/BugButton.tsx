import React, { useEffect, useState } from 'react';

export function BugButton() {
  const [error, setError] = useState(false);

  const onThrow = () => setError(true);

  useEffect(() => {
    if (error) {
      throw new Error();
    }
  }, [error]);

  return (
    <button type="button" onClick={onThrow}>
      Throw error
    </button>
  );
}
