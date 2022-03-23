// 乐观更新 配置生成文件
import { QueryKey, useQueryClient } from "react-query";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => {
      return queryClient.invalidateQueries(queryKey);
    },
    async onMutate(target: any) {
      // 获取缓存列表
      const previousItems = queryClient.getQueryData(queryKey);
      // 重新设置缓存数据
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return old ? callback(target, old) : [];
      });
      // 将原始缓存返回
      return previousItems;
    },
    // 当 useMutation 发生异常回滚数据
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

// 删除配置
export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

// 编辑配置
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

// 添加配置
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
