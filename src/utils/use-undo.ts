import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  // 合并状态
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  // 判断是否有回退历史
  const canUndo = state.past.length !== 0;
  // 判断是否有前进历史
  const canRedo = state.future.length !== 0;

  // 回退操作函数
  const undo = useCallback(() => {
    setState((prev) => {
      const { past, present, future } = state;
      // 无法回退则返回当前状态
      if (past.length === 0) return prev;
      // 1.回退历史合集末尾状态作为当前状态
      const pervious = past[past.length - 1];
      // 2.操作回退历史合集,裁剪掉末尾状态
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: pervious,
        future: [present, ...future],
      };
    });
  }, []);

  // 操作前进历史函数
  const redo = useCallback(() => {
    setState((prev) => {
      const { past, present, future } = state;
      if (future.length === 0) return prev;
      // 获取前进历史第一个状态
      const next = future[0];
      // 操作 future 合集
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  // 设置状态函数
  const set = useCallback((newPresent: T) => {
    const { past, present } = state;
    if (newPresent === present) return;
    setState((prev) => {
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  // 重置函数
  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [
    { past, present, future },
    { set, reset, undo, redo, canRedo, canUndo },
  ] as const;
};
