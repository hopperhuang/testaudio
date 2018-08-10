

/**
 * 返回音频信息
 * @param {ArrayBuffer} buffer 播放的二进制数据
 * @param {String} id 绑定播放事件的htmlElement的id
 * @param {Function} broadcasthandler 播放时处理sourceNode的方法
 * 
 */
export function handleVoice(buffer, id, broadcasthandler) {
    const AudioContext = window.AudioContext || window.webkitAudioContext; 
    const ctx = new AudioContext()
    let sourceNode
    const defaultBroadcastHandlr = (sourceNode) => console.log('paly:', sourceNode)
    const handleBroadCast = broadcasthandler || defaultBroadcastHandlr
    sourceNode = ctx.createBufferSource()
    const playBuffer = (buff) => {
        sourceNode.buffer = buff;
        sourceNode.connect(ctx.destination)
        sourceNode.start(0); 
    }
    ctx.decodeAudioData(buffer, function (buff) {
      window.addEventListener('click', (e) => {
          if (id) {
              // broadcast according to what you've click
              if(e.target.id === id) {
                // braodcast
                playBuffer(buff)
                // handle sourcNode here
                handleBroadCast(ctx)
              }
          } else {
              playBuffer(buff)
              handleBroadCast(ctx)
          }
      })
    })
    return { context: ctx, sourceNode }
}

export function broadcast(voiceBuffer) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext()
        const srn = ctx.createBufferSource()
        ctx.decodeAudioData(voiceBuffer.slice(0), (buff) => {
            try {
                srn.buffer = buff;
                srn.connect(ctx.destination)
                srn.start(0)
            } catch (error) {
                console.log(error)
            }
            // setInterval(() => {
            //     console.log(context.currentTime)
            // }, 1000)
        }, (err) => {
            console.log(2333)
            console.log(err)
        })
    } catch (error) {
        console.log(error)
    }
}

export default handleVoice