/* eslint-disable no-extend-native */
const signed = (num) => (num >= 0 ? '+' + num : num);

const includesIgnoreCase = (a, b) =>
    String(a).toLowerCase().includes(String(b).toLowerCase());

const uuidv4 = () => {
    return 'xxx4xxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};

export const stringUtil = {
    signed,
    includesIgnoreCase,
    uuidv4,
};
