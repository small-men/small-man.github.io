import { Rate } from "antd";
import React from "react";

/**
 * checked: 收藏状态
 * onCheckChange: 改变收藏状态的函数
 */
interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

// 封装antd Rate 组件
export const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};
