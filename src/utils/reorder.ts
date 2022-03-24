/**
 * 在本地对排序进行乐观更新
 * @param fromId 要排序的项目的id
 * @param type 'before' | 'after'
 * @param referenceId 参照id
 * @param list 要排序的列表, 比如tasks, kanbans
 */
export const reorder = ({
  fromId,
  type,
  referenceId,
  list,
}: {
  list: { id: number }[];
  fromId: number;
  type: "after" | "before";
  referenceId: number;
}) => {
  const copiedList = [...list];
  // 找到fromId对应项目的下标
  const movingItemIndex = copiedList.findIndex((item) => item.id === fromId);
  // 参照Id不存在
  // 列表末尾
  if (!referenceId) {
    return insertAfter([...copiedList], movingItemIndex, copiedList.length - 1);
  }
  // 参照Id存在
  // 找到参照id所在列表的索引
  const targetIndex = copiedList.findIndex((item) => item.id === referenceId);
  // 根据插入类型推断出对应函数
  const insert = type === "after" ? insertAfter : insertBefore;
  return insert([...copiedList], movingItemIndex, targetIndex);
};

/**
 * 在list中，把from放在to的前边
 * @param list
 * @param from
 * @param to
 */
const insertBefore = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex, 0, removedItem);
  return list;
};

/**
 * 在list中，把from放在to的后面
 * @param list
 * @param from
 * @param to
 */
const insertAfter = (list: unknown[], from: number, to: number) => {
  const toItem = list[to]; // 获取to元素
  const removedItem = list.splice(from, 1)[0]; //移除列表中的from元素，并用变量将其保存起来
  const toIndex = list.indexOf(toItem); // 获取to元素所在列表索引
  list.splice(toIndex + 1, 0, removedItem); // 将被移除的from元素插入其后面
  return list;
};
