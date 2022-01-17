import { getApp } from "..";

export const getHitObject = (globalPoint, exclude?: any[]) => {
    if (exclude)
        exclude.forEach(i => i.interactive = false)

    const result = getApp().renderer.plugins.interaction.hitTest(globalPoint);

    if (exclude)
        exclude.forEach(i => i.interactive = true)
    return result
}