import { useEffect } from 'react';
import type { RefObject } from 'react';

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  callback: () => void,
  condition?: boolean | ((event: Event) => boolean)
) {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        ref?.current &&
        !ref?.current.contains(event.target as Node) &&
        (typeof condition === 'function'
          ? condition?.(event)
          : condition ?? true)
      ) {
        callback();
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [callback, condition, ref]);
}

export default useOnClickOutside;
