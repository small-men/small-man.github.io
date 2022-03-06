import { useEffect, useState } from "react";

const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 处理对象空值属性
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };

  Object.keys(object).map((key) => {
    const value = object[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// 简易初始加载组件hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 防抖hook
export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  return debounceValue;
};
