

class Broadcast {
    /**
     * 
     * @param {Arraybuffer} buffer 二进制代码
     * @param {String} id 触发点击事件的id
     * @param {Function} playCallback 音频播放后的回调函数
     * @param {Function} callAfterDecode 解码成功后的回调函数d
     */
    constructor(buffer, id, playCallback, callAfterDecode) {
        const AudioContext = window.AudioContext || window.webkitAudioContext; 
        const context = new AudioContext()
        const sourceNode = context.createBufferSource()
        const gainNode = context.createGain()
        // audio context
        this.context = context
        // soucenode
        this.sourceNode = sourceNode
        //  gainnode
        this.gainNode = gainNode
        // buffer
        this.buffer = buffer
        // playcallback
        this.playCallback = playCallback
        // callAfterdecode
        this.callAfterDecode = callAfterDecode
        // starttime, will be set once audio is playing
        this.startTime = null
        const self = this
        // decode and add listenr
        context.decodeAudioData(buffer, (decodedBuffer) => {
            console.log('------- add lisntenr')
            window.addEventListener('click', (e) => {
                if (id === e.target.id) {
                    self.play(decodedBuffer)
                    self.startTime = context.currentTime
                    if (typeof playCallback === 'function') {
                        playCallback()
                    }
                }
            })
            if (typeof callAfterDecode === 'function') {
                callAfterDecode()
            }
        }, (err) => {
            console.log('broadcast err:', err)
        })
    }
    /**
     * 
     * @param {AudioBuffer} decodedBuffer  解码后的buffer
     */
    play(decodedBuffer) {
        this.sourceNode.buffer = decodedBuffer
        this.sourceNode.connect(this.gainNode)
        this.gainNode.connect(this.context.destination)
        this.gainNode.gain.value = 0.2
        this.sourceNode.start(0)
        
    }
    // 停止播放
    stop(){
        this.sourceNode.stop(0)
    }
    // 加大音量
    louder() {
        console.log('audio\'s voice is getting louder')
        this.gainNode.gain.value += 0.1
    }
    
}

export default Broadcast