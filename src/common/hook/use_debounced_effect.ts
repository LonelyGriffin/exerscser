import {DependencyList, EffectCallback, useEffect} from "react";

export const useDebouncedEffect = (effect: EffectCallback, debounce: number, deps?: DependencyList) => {
  useEffect(() => {
    const timerId = setTimeout(() => effect(), debounce);

    return () => clearTimeout(timerId);
  }, [...(deps || []), debounce])
}
