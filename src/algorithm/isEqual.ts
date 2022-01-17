export const isEqual = (array1: any[], array2: any[]) => {
    for (let i = 0; i < array1.length; i++) {
        const element1 = array1[i];
        const element2 = array2[i];
        if (element2 != element1)
            return false;
    }
    return true;
}