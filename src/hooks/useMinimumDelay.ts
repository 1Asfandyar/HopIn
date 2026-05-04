import { useEffect, useState } from 'react';

export const useMinimumDelay = (durationMs: number) => {
  const [hasElapsed, setHasElapsed] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasElapsed(true);
    }, durationMs);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [durationMs]);

  return hasElapsed;
};
