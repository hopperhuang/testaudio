const judgeIsIOS = () => {
    const ua = navigator.userAgent.toLowerCase();
    return /(iPhone|iPod|iPad);?/i.test(ua)
}

const judgeIsAndroid = () => {
    const ua = navigator.userAgent.toLowerCase();
    return /android/i.test(ua)
}

const judgeIsWeixin = () => {
    const ua = navigator.userAgent.toLowerCase();
    return  /micromessenger/.test(ua)
}

export default {
    judgeIsAndroid,
    judgeIsIOS,
    judgeIsWeixin
}