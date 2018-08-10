import React from 'react';
import { broadcast } from '../utils/play'

class FirstPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startAt: 0,
            currentTime: 0,
        }
    }
    componentDidMount() {
        const { welcomeVoice } = this.props
        const { sourceNode } = welcomeVoice
        const { buffer } = sourceNode
        console.log('first-buffer', buffer)
        if (buffer) {
            console.log('已经是在播放')
        } else {
            console.log('尚未启动播放')
            // 启动播放
            const voiceBuffer = this.props.source.buffer
            // eslint-disable-next-line
            if (typeof WeixinJSBridge === "object" && typeof WeixinJSBridge.invoke == "function") {
                // 检测是否微信浏览器
                // eslint-disable-next-line
                WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
                    // 触发一下play事件
                    broadcast(voiceBuffer)
                });
            }   else {
                try {
                broadcast(voiceBuffer)
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
    render() {
        return (
            <div >
                这里是第一个页面
            </div>
        )
    }
}

// const Page = BroadcastHoc(FirstPage)

export default FirstPage