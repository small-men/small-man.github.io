/**
 * 高亮显示关键字
 * name: 任务名称
 * keyword:搜索关键字
 * @param param0
 */
export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => {
        return (
          <span key={index}>
            {str}
            {index === arr.length - 1 ? null : (
              <span style={{ color: "#257AFD" }}>{keyword}</span>
            )}
          </span>
        );
      })}
    </>
  );
};
