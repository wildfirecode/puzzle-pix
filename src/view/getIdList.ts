import { getDebrisSize, getTextureId } from ".";
import { gridView } from "../game";

export const getIdList = (maxCol) => {
    const [cutSectionWidth, cutSectionHeight] = getDebrisSize();

    let idList = gridView.children.map(i => {
        const col = Math.round(i.x / cutSectionWidth);
        const row = Math.round(i.y / cutSectionHeight);
        return {
            index: row * maxCol + col,
            textureId: getTextureId(i)
        }
    })

    idList = idList
        .sort((a, b) => { return a.index - b.index })
        .map(i => i.textureId)

    return idList
}