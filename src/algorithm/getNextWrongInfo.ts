export const getNextWrongInfo = (currentIds: any[]) => {
    let nextWrongId, nextWrongIdIndex;
    for (let index = 0; index < currentIds.length; index++) {
        const id = currentIds[index];
        if (id != index) {
            nextWrongId = id;
            nextWrongIdIndex = index;
            break
        }
    }
    return {
        nextWrongIdIndex, nextWrongId
    }
}