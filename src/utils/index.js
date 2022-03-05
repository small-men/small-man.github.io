const isFalsy = (value) => (value === 0 ? false : !value);

// 处理对象空值属性
export const cleanObject = (object) => {
    const result = {...object };

    Object.keys(object).map((key) => {
        const value = object[key];
        if (isFalsy(value)) {
            delete result[key];
        }
    });
    return result;
};