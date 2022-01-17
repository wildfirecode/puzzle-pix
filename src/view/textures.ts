import { Loader, Rectangle, Texture } from "pixi.js";
import { getCutSectionsData } from "../algorithm";
import { MAX_COL, MAX_ROW } from "../config";

let _textureMap;
export const getTextureId=(sprite)=>{
    return sprite.texture.textureCacheIds[0]
}
export const getCutSectionSize = () => {

    const originTexture = Loader.shared.resources.imageFu.texture.baseTexture;

    const cutSectionWidth = originTexture.width / MAX_COL;
    const cutSectionHeight = originTexture.height / MAX_ROW;
    return [cutSectionWidth, cutSectionHeight]

}
const setTextures = () => {
    if (_textureMap) return;
    _textureMap = {};

    const originTexture = Loader.shared.resources.imageFu.texture.baseTexture;

    const [cutSectionWidth, cutSectionHeight] = getCutSectionSize();

    const sectionsData = getCutSectionsData(MAX_COL, MAX_ROW, cutSectionWidth, cutSectionHeight);
    for (let i = 0; i < sectionsData.length; i++) {
        const [x, y, width, height] = sectionsData[i];
        const rectangle = new Rectangle(x, y, width, height);
        const newTex = new Texture(originTexture, rectangle);
        newTex.textureCacheIds = [i + ''];
        _textureMap[i + ''] = newTex;
    }
}

export const getTextureById = (id) => {
    setTextures();
    return _textureMap[id]
}

