import { Loader, Sprite } from "pixi.js";
import { parseXML } from "xml-pixi";
import { getApp } from ".";
import { fill } from "./algorithm";
import { gameStructure, GAP, MAX_COL, MAX_ROW } from "./config";
import { startCountdown } from "./time";
import { showUI } from "./ui";
import { resetUser } from "./user/main";
import { wait } from "./utils";
import { getDebrisSize, initDebris } from "./view";

export let gridView: Sprite;
export const createGame = () => {
    Loader.shared.
        add('imageFu', 'http://wildfirecode.com/objects/puzzle/fu551.jpg')
        .load(async () => {
            const [cutSectionWidth, cutSectionHeight] = getDebrisSize();

            gridView = parseXML(gameStructure,
                {
                    cols: MAX_COL,
                    rows: MAX_ROW,
                    cellWidth: cutSectionWidth + GAP,
                    cellHeight: cutSectionHeight + GAP
                }) as Sprite; //parseXML返回的是显示对象树

            getApp().stage.addChild(gridView);////将显示对象树添加到stage
            gridView.interactive = true;

            initDebris(fill(MAX_COL * MAX_ROW));

            wait(2000).then(async () => {
                await resetUser();
                startCountdown();
                showUI();
            })
        })

}