import { DisplayObject, InteractionEvent, Point, Sprite } from "pixi.js";
import { wait } from "teddi-lodash";
import { getApp } from ".";
import { fill, getRandomIdList } from "./algorithm";
import { isEqual } from "./algorithm/isEqual";
import { MAX_COL, MAX_ROW } from "./config";
import { gridView } from "./game";
import { stopCountdown } from "./time";
import { showResetButton } from "./ui";
import { getIdList, initSection, onDragStart, setOnDragEnd } from "./view";

export const onUserTimeout = () => {
    removeUserInteraction();
    showResetButton();
}

export const resetUser = async () => {
    const initialIdList = getRandomIdList(MAX_COL * MAX_ROW);
    initSection(initialIdList);
    addUserInteraction();
}

export const highlightCardPairs = () => {
    // const cardList = getUnmatchedCard(gridView.children, matchedCards, userCards, lockedCards);
    // const matched = getMatchedCards(cardList, match);
    // if (matched.length > 0) {
    //     const [card0, card1] = matched;
    //     highlight(card0);
    //     highlight(card1);
    // }
}

export const autoFlip = () => {
    // const cardList = getUnmatchedCard(gridView.children, matchedCards, userCards, lockedCards);
    // const matched = getMatchedCards(cardList, match);
    // if (matched.length > 0) {
    //     const [card0, card1] = matched;
    //     matchedCards.push(card0, card1);
    //     clearHighlight(card0);
    //     clearHighlight(card1);
    //     playFlipAnimation(FLIP_TYPE.FRONT, card0);//立刻翻转
    //     playFlipAnimation(FLIP_TYPE.FRONT, card1);//立刻翻转
    //     if (isSuccess(matchedCards, gridView.children)) {
    //         onSuccess();
    //     }
    // }
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
    dragTarget.interactive = false;
    const dropTarget = getApp().renderer.plugins.interaction.hitTest(e.data.global);
    dragTarget.interactive = true;
    if (dropTarget && dropTarget instanceof Sprite) {
        dragTarget.position.copyFrom(dropTarget.position.clone())
        dropTarget.position.copyFrom(dragPositionBefore);
    } else {
        dragTarget.position.copyFrom(dragPositionBefore)
    }

    const idList = getIdList();
    console.log('idList', idList);

    if (isEqual(fill(MAX_ROW * MAX_COL), idList)) {
        onSuccess();
    }
}

setOnDragEnd(onDragEnd);

const onUserDragStart = async (e: InteractionEvent) => {
    const hitTarget = getApp().renderer.plugins.interaction.hitTest(e.data.global);
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