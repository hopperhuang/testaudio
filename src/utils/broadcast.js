class Broadcast {
    constructor(buffer, id, playCallback, callAfterDecode) {
        const AudioContext = window.AudioContext || window.webkitAudioContext; 
        const context = new AudioContext()
        const sourceNode = context.createBufferSource()
        const gainNode = context.createGain()
        this.context = context
        this.sourceNode = sourceNode
        this.gainNode = gainNode
        this.buffer = buffer
        this.playCallback = playCallback
        const self = this
        // decode and add listenr
        context.decodeAudioData(buffer, (decodedBuffer) => {
            console.log('------- add lisntenr')
            window.addEventListener('click', (e) => {
                if (id === e.target.id) {
                    self.play(decodedBuffer)
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
    play(decodedBuffer) {
        this.sourceNode.buffer = decodedBuffer
        this.sourceNode.connect(this.gainNode)
        this.gainNode.connect(this.context.destination)
        this.gainNode.gain.value = 0.2
        this.sourceNode.start(0)
        
    }
    stop(){
        this.sourceNode.stop(0)
    }
    louder() {
        console.log(2233)
        this.gainNode.gain.value += 0.1
    }
    
}

export default Broadcast