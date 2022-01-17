/**
 * 获取图片切片数据（从左向右，从上到下）
 * @param col 列数
 * @param row 行数
 * @param sectionWidth 切片宽度
 * @param sectionHeight 切片高度
 * @returns 
 */
export const getCutSectionsData = (col, row, sectionWidth, sectionHeight) => {
    const list = [];
    for (let j = 0; j < row; j++) {
        for (let i = 0; i < col; i++) {
            const section = [i * sectionWidth, j * sectionHeight, sectionWidth, sectionHeight];
            list.push(section);
        }
    }
    return list;
}