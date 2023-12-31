// @ts-check

"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const useStateWithCallback = (initialState, callback) => {
  const [state, setState] = useState(initialState);

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      callback(state);
    } else {
      didMount.current = true;
    }
  }, [state, callback]);

  return [state, setState];
};

const useStateWithCallbackInstant = (initialState, callback) => {
  const [state, setState] = useState(initialState);

  const didMount = useRef(false);

  useLayoutEffect(() => {
    if (didMount.current) {
      callback(state);
    } else {
      didMount.current = true;
    }
  }, [state, callback]);

  return [state, setState];
};

const useStateWithCallbackLazy = (initialValue) => {
  const callbackRef = useRef(null);

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (callbackRef.current) {
      // @ts-expect-error: unknown type
      callbackRef.current(value);

      callbackRef.current = null;
    }
  }, [value]);

  const setValueWithCallback = useCallback((newValue, callback) => {
    callbackRef.current = callback;

    return setValue(newValue);
  }, []);

  return [value, setValueWithCallback];
};

export { useStateWithCallbackInstant, useStateWithCallbackLazy };

export default useStateWithCallback;
