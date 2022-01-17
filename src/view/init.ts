import { Sprite } from "pixi.js";
import { getTextureById } from ".";
import { gridView } from "../game";

export const initSection = (idList) => {
    for (let i = 0; i < idList.length; i++) {
        const sprite = gridView.children[i] as Sprite;
        sprite.interactive = true;
        sprite.texture = getTextureById(idList[i]);
    }

    console.log('initSection idList',idList);
}

