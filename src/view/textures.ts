import { Loader, Rectangle, Texture } from "pixi.js";
import { getCutSectionsData } from "../algorithm";
import { MAX_COL, MAX_ROW } from "../config";
import { gridView } from "../game";

export const getTextureId = (sprite) => {
    return sprite.texture.textureCacheIds[0]
}
export const getDebrisSize = () => {
    const originTexture = Loader.shared.resources.imageFu.texture.baseTexture;
    const debrisWidth = originTexture.width / MAX_COL;
    const debrisHeight = originTexture.height / MAX_ROW;
    return [debrisWidth, debrisHeight]
}

let _textureMap;
const setTextures = () => {
    if (_textureMap) return;
    _textureMap = {}; 

    const originTexture = Loader.shared.resources.imageFu.texture.baseTexture;

    const [debrisWidth, debrisHeight] = getDebrisSize();

    const sectionsData = getCutSectionsData(MAX_COL, MAX_ROW, debrisWidth, debrisHeight);
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
