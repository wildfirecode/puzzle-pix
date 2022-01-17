import { DisplayObject, InteractionEvent, Point } from "pixi.js";
import { getApp } from "..";

let _stage: DisplayObject;

let _target: DisplayObject;

let _globalPoint: Point;
let _targetStartPoint: Point;

let _onDragEnd: Function;

export const setOnDragEnd = (onDragEnd) => { _onDragEnd = onDragEnd }

const onDragMoveImpl = (e: InteractionEvent) => {
    const offsetX = e.data.global.x - _globalPoint.x;
    const offsetY = e.data.global.y - _globalPoint.y;
    _target.x = _targetStartPoint.x + offsetX;
    _target.y = _targetStartPoint.y + offsetY;
}

const onDragEndImpl = (e: InteractionEvent) => {

    _onDragEnd&&_onDragEnd(_target,e);
    _stage.interactive = false;
    _stage
        .off('touchmove', onDragMoveImpl)
        .off('touchend', onDragEndImpl)
        .off('touchendoutside', onDragEndImpl)

    _stage = null;

    _target = null;

    _globalPoint = null;
    _targetStartPoint = null;
}

export const onDragStart = (target, e: InteractionEvent) => {
    _stage = getApp().stage;
    _stage.interactive = true;
    _target = target;
    _globalPoint = e.data.global.clone();
    _targetStartPoint = _target.position.clone();
    _stage
        .on('touchmove', onDragMoveImpl)
        .on('touchend', onDragEndImpl)
        .on('touchendoutside', onDragEndImpl)
}