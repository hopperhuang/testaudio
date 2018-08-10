/* eslint-disable */
import React from 'react';
import { connect } from 'dva';
import img from '../assets/yay.jpg';
import audio from '../assets/woman.mp3'
import router from 'umi/router'
import style from './preload.css'


const AudioContext = window.AudioContext || window.webkitAudioContext;
const ctx = new AudioContext();

function playBuffer(buffer) {
    const sourceNode = ctx.createBufferSource();
    sourceNode.buffer = buffer; 
  sourceNode.connect(ctx.destination); 
  sourceNode.start(0); 
}

class Preload extends React.Component {
    imgOnload() {
        console.log('img loaded')
        console.log(style)
        console.log(audio)
        setTimeout(() => {
            // router.push('/')
        },500)
    }
    audioOnload() {
        console.log("audio onload")
    }
    goToIndex() {
        router.push('/')
    }
    componentDidMount() {
        console.log(img)
        // fetch file here, and push it the redux store
        var request = new XMLHttpRequest();
        request.open('GET',audio, true);
        request.responseType = 'arraybuffer';
        request.onload = function () {
            ctx.decodeAudioData(request.response, (buffer) => {
                console.log(request.response)
                // const btn = document.getElementById('clickButton');
                // btn.addEventListener('click',  () => {
                //     console.log(233333)
                //     playBuffer(buffer)
                // })
                // btn.click()
                window.addEventListener('click', () => {
                    console.log(233333)
                    console.log(buffer)
                    playBuffer(buffer)
                })
                // window.dispatchEvent('click')
            }, (err) => {
                console.log(err)
            })
        }
        request.send()
    }
    render() {
        const { source } = this.props;
        const { name } = source
        return (
            <div>
                <div>
                    {name}
                </div>
                <div>
                    <div style={{display: 'none'}} id="clickButton"></div>
                    <img className={style.preloadImage} src={img} onLoad={this.imgOnload} alt="" />
                    <audio controls src="http://ra01.sycdn.kuwo.cn/resource/n3/32/56/3260586875.mp3" />
                </div>
                <div>这里要加载一些图片和内容</div>
                <div onClick={this.goToIndex} >go to index</div>
            </div>
        )
    }
}

export default connect((state) => { return { source: state.source}})(Preload)