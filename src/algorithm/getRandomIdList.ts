const shuffle = (array: number[]) => {
    const length = array == null ? 0 : array.length
    if (!length) {
        return []
    }
    let index = -1
    const lastIndex = length - 1
    const result = array.concat();
    while (++index < length) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
        const value = result[rand]
        result[rand] = result[index]
        result[index] = value
    }
    return result
}

/**
 * 获取切片图案Id的随机列表
 * @returns 
 */
export const getRandomIdList = (n) => {
    let list = [];
    for (let i = 0; i < n; i++) {
        list.push(i);
    }
    list = shuffle(list);
    return list;
}