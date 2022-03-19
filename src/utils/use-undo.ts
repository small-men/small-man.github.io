import { type } from "os";
import { useCallback, useReducer, useState } from "react";

// 声明常量
const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

// 声明状态
type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

// 声明 reduce
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent, type } = action;
  switch (type) {
    case UNDO: {
      if (past.length === 0) return state;
      const pervious = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: pervious,
        future: [present, ...future],
      };
    }
    case REDO: {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }
    case SET: {
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    }
    default:
      return state;
  }
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  // 判断是否有回退历史
  const canUndo = state.past.length !== 0;
  // 判断是否有前进历史
  const canRedo = state.future.length !== 0;

  // 回退操作函数
  const undo = useCallback(() => dispatch({ type: UNDO }), []);

  // 操作前进历史函数
  const redo = useCallback(() => dispatch({ type: REDO }), []);

  // 设置状态函数
  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  );

  // 重置函数
  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    []
  );

  return [state, { set, reset, undo, redo, canRedo, canUndo }] as const;
};
