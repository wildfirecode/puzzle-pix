import * as TWEEN from "@tweenjs/tween.js";
import { fill } from "./algorithm";
import { GAP, MAX_COL, MAX_ROW } from "./config";
import { gridView } from "./game";
import { getDebrisSize } from "./view";

export const playAllAnimation = (initialIdList: number[]) => {
    const filled = fill(MAX_COL * MAX_ROW);
    return Promise.all(
        filled.map(
            currentPosition => playItemAnimation(
                currentPosition, initialIdList.indexOf(currentPosition)
            )
        )
    )
}

export const playItemAnimation =  async (currentPosition: number, targetPosition: number) => {
    const target = gridView.children[currentPosition];
    const [cutSectionWidth, cutSectionHeight] = getDebrisSize();
    const cellWidth = cutSectionWidth + GAP;
    const cellHeight = cutSectionHeight + GAP;
    const targetX = targetPosition % MAX_COL * cellWidth;
    const targetY = Math.floor(targetPosition / MAX_COL) * cellHeight;
    await playMoveAnimation(target, targetX, targetY)
}

export const playMoveAnimation = (target, targetX, targetY) => {
    return new Promise((resolve) => {
        const DURATION = 700;
        const tween = new TWEEN.Tween(target);
        tween.to({ x: targetX, y: targetY }, DURATION).start().onComplete(() => {
            resolve(true)
        });
    });
}