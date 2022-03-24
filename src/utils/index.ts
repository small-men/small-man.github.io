import { useEffect, useRef, useState } from "react";

// const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 判断值是否有意义
const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 处理对象空值属性
export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };

  // eslint-disable-next-line array-callback-return
  Object.keys(object).map((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 简易初始加载组件hook
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceValue;
};

/**
 * 文档标题 HOOK
 * title : 传入标题
 * keepOnUnmount: 控制卸载组件状态,默认为true,离开页面保存当前标题，false则是离开页面还原上级标题
 */
export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // 保存页面加载前的标题
  const oldTitle = useRef(document.title).current;

  // console.log("渲染时的oldTitle", oldTitle);

  // 监听title状态变化
  useEffect(() => {
    document.title = title;
  }, [title]);

  // 当组件被卸载前，回复原来title
  useEffect(
    () => () => {
      if (!keepOnUnmount) {
        // console.log("组件卸载时的oldTitle", oldTitle);
        document.title = oldTitle;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
};

// 重置路由
export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * 返回组件的挂载状态，未挂载或已卸载，返回false,反之返回true
 */
export const useMountRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return mountedRef;
};
