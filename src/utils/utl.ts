import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * 返回url中指定键的参数值
 * as const 解决返回原始类型问题
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    setSearchParams,
  ] as const;
};
