const isSubset = (primeArray, subArray) => {
    if (!Array.isArray(primeArray) || !Array.isArray(subArray)) return false;
    // console.log(`Looking for ${subArray} in ${primeArray}`);
    for (const sub of subArray) {
        if (!primeArray.includes(sub)) return false;
    }
    return true;
};

const notSubset = (primeArray, subArray) => {
    if (!Array.isArray(primeArray) || !Array.isArray(subArray)) return false;
    for (const sub of subArray) {
        if (primeArray.includes(sub)) return false;
    }
    return true;
};

export const arrayUtil = { isSubset, notSubset };
