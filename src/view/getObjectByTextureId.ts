import { getTextureId } from "."
import { gridView } from "../game"

export const getObjectByTextureId = (textureId)=>{
    const result = gridView.children.filter(child=>getTextureId(child) ==textureId)
    return result[0]
}
