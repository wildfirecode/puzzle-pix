import { DisplayObject, InteractionEvent, Point } from "pixi.js";
import { wait } from "teddi-lodash";
import { onDragStart, setOnDragEnd } from ".";
import { fill, getNextWrongInfo, getRandomIdList, isEqual } from "../algorithm";
import { playAllAnimation, playMoveAnimation } from "../animation";
import { MAX_COL, MAX_ROW } from "../config";
import { gridView } from "../game";
import { stopCountdown } from "../time";
import { hideUI, showResetButton, showUI } from "../ui";
import { clearHighlight, getHitObject, getIdList, getObjectByTextureId, highlight } from "../view";

const checkSuccess = () => {
    if (isEqual(fill(MAX_ROW * MAX_COL), getIdList(MAX_COL))) {
        onSuccess();
    }
}

export const onUserTimeout = () => {
    removeUserInteraction();
    showResetButton();
}

export const resetUser = async () => {
    const initialIdList = getRandomIdList(MAX_COL * MAX_ROW);
    console.log('initialIdList', initialIdList);

    await playAllAnimation(initialIdList)
    addUserInteraction();
}

export const highlightDebrisPairs = () => {
    const { nextWrongIdIndex, nextWrongId } = getNextWrongInfo(getIdList(MAX_COL));
    const object1 = getObjectByTextureId(nextWrongIdIndex);
    const object2 = getObjectByTextureId(nextWrongId);
    gridView.addChild(object1, object2);
    highlight(object1)
    highlight(object2)
}

export const autoDragDrop = async () => {
    gridView.children.forEach(child=>clearHighlight(child))
    hideUI();
    const { nextWrongIdIndex, nextWrongId } = getNextWrongInfo(getIdList(MAX_COL));
    const object1 = getObjectByTextureId(nextWrongIdIndex);
    const object2 = getObjectByTextureId(nextWrongId);
    const object1Position = object1.position.clone();
    const object2Position = object2.position.clone();
    gridView.addChild(object1, object2);
    await Promise.all([
        playMoveAnimation(object1, object2Position.x, object2Position.y),
        playMoveAnimation(object2, object1Position.x, object1Position.y)
    ]);
    showUI();
    checkSuccess();
}

const onSuccess = () => {
    removeUserInteraction();
    stopCountdown();
    wait(100).then(() => {
        showResetButton();
        alert('胜利了');
    });
}

let dragPositionBefore: Point;
const onDragEnd = (dragTarget: DisplayObject, e: InteractionEvent) => {
    const dropTarget = getHitObject(e.data.global, [dragTarget]);
    if (dropTarget && dropTarget != dragTarget.parent) {
        dragTarget.position.copyFrom(dropTarget.position.clone())
        dropTarget.position.copyFrom(dragPositionBefore);
        clearHighlight(dropTarget);
    } else {
        dragTarget.position.copyFrom(dragPositionBefore)
    }
    clearHighlight(dragTarget);

    checkSuccess();
}

setOnDragEnd(onDragEnd);

const onUserDragStart = async (e: InteractionEvent) => {
    const hitTarget = getHitObject(e.data.global);
    onDragStart(hitTarget, e);
    gridView.addChild(hitTarget);
    dragPositionBefore = hitTarget.position.clone()
}

export const addUserInteraction = () => {
    gridView.on('touchstart', onUserDragStart);
}

export const removeUserInteraction = () => {
    gridView.off('touchstart', onUserDragStart);
}