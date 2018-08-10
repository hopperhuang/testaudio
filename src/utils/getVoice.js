import fetch from 'dva/fetch'

function getVioce(audio, bufferHandler, errorHandler) {
    const defaultErrorHandler = (e) => { console.log(e)}
    const eHandler = errorHandler || defaultErrorHandler
    return fetch(audio)
        .then(res => res.arrayBuffer())
        .then(buffer => bufferHandler(buffer))
        .catch(err => eHandler(err))
}

export default getVioce

