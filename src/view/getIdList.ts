import { getCutSectionSize, getTextureId } from ".";
import { MAX_COL } from "../config";
import { gridView } from "../game";

export const getIdList = () => {
    const [cutSectionWidth, cutSectionHeight] = getCutSectionSize();

    let idList = gridView.children.map(i => {
        const col = Math.round(i.x / cutSectionWidth);
        const row = Math.round(i.y / cutSectionHeight);
        return {
            index: row * MAX_COL + col,
            textureId: getTextureId(i)
        }
    })


    idList= idList
        .sort((a, b) => { return a.index - b.index })
        .map(i => i.textureId)
            
    return idList
}