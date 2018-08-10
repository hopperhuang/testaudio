import React from 'react'


const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext()

function playBuffer(buffer) { 
    var sourceNode = ctx.createBufferSource(); 
    sourceNode.buffer = buffer; 
    sourceNode.connect(ctx.destination); 
    sourceNode.start(0); 
  }


  // 不能用hoc取生成这个逻辑层，buffer传递两次后就会右问题, 出现数据丢失的情况 
function BroadcastHoc(Com) {
    return class Broadcast extends React.Component {
        componentDidMount() {
            const { source } = this.props
            // console.log(this.props)
            const { buffer } = source
            console.log(buffer)
            const ctx = new AudioContext()
            ctx.decodeAudioData(buffer, function (buffer) {
                playBuffer(buffer)
            })
        }
        render() {
            console.log(this.props.source.buffer)
            return (
                <Com {...this.props} />
            )
        }
    }
}

export default BroadcastHoc