import { Loader, Sprite } from "pixi.js";
import { parseXML } from "xml-pixi";
import { getApp } from ".";
import { fill } from "./algorithm";
import { gameStructure, GAP, MAX_COL, MAX_ROW } from "./config";
import { startCountdown } from "./time";
import { showUI } from "./ui";
import { resetUser } from "./user";
import { wait } from "./utils";
import { getCutSectionSize, initSection as initSections } from "./view";

export let gridView: Sprite;
export const createGame = () => {
    Loader.shared.
        add('imageFu', 'http://wildfirecode.com/objects/puzzle/fu551.jpg')
        .load((loader, resource) => {
            const [cutSectionWidth, cutSectionHeight] = getCutSectionSize();

            gridView = parseXML(gameStructure,
                {
                    cols: MAX_COL,
                    rows: MAX_ROW,
                    cellWidth: cutSectionWidth + GAP,
                    cellHeight: cutSectionHeight + GAP
                }) as Sprite;

            getApp().stage.addChild(gridView);
            gridView.interactive = true;

            initSections(fill(MAX_COL*MAX_ROW));

            wait(1000).then(async () => {
                resetUser();
                startCountdown();
                showUI();
            });

        })

}