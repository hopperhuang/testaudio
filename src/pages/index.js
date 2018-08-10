import React from 'react';
import { connect } from 'dva'
// import fetch from 'dva/fetch'
// pages
import FirstPage from '../components/First';
import Welcome from '../components/Welcome';
// files
import audio from '../assets/woman.mp3'
// utils
import judger from '../utils/judger'
import play from '../utils/play';
import getVoice from '../utils/getVoice'

// eslint-disable-next-line
import Vconsole from 'vconsole'

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  const vconsole = new Vconsole()
}

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: 'welcome',
      routeToComponents: {
        welcome: Welcome,
        firstpage: FirstPage,
      },
      welcomeVoice: ''
    }
    this.goToFirstPage = this.goToFirstPage.bind(this)
    this.goToFirstPageAuto = this.goToFirstPageAuto.bind(this)
  }
  componentDidMount() {
    const { dispatch } = this.props
    const self = this
    // 处理fetch回来后的buffer获取的函数
    const bufferHandler = (buffer) => {
      // save to redux
      dispatch({ type: 'source/saveBuffer', payload: buffer})
      // 解码并初始化音频信息
      const welcomeVoice = play(buffer, 'goToFirst', (audioInfo) => {
        // broadcasthandler
        // 音频播放后的处理
        self.setState({
          // 更新音频信息
          welcome: audioInfo,
        }, () => {
          // 跳转页面
          self.goToFirstPage()
        })
      })
      // 首次初始化后，用state记录音频信息
      self.setState({
        welcomeVoice,
      }, () => {
        // auto go to next page
        self.goToFirstPageAuto()
      })
    }
    // 获取声音并处理buffer
    getVoice(audio, bufferHandler)
  }
  // auto go to first page after loading
  goToFirstPageAuto() {
    // 判断是否微信浏览器，是则自动跳转
    const isWeixin = judger.judgeIsWeixin()
    const isAndroid = judger.judgeIsAndroid()
    // 微信或安卓浏览器就自动跳转
    if (isWeixin || isAndroid) {
      this.goToFirstPage()
    }
  }
  // go to first page
  goToFirstPage() {
    this.setState({
      route: 'firstpage'
    })
  }
  render() {
    const { route, routeToComponents, welcomeVoice } = this.state;
    const Com = routeToComponents[route];
    const isAndroid = judger.judgeIsAndroid()
    const isWeixin = judger.judgeIsWeixin()
    // 非微信且非安卓浏览器则认定为其他浏览器
    const isOtherBrowser = !isAndroid && !isWeixin
    return (
      <div>
        <Com
          {...this.props}
          goToFirstPage={this.goToFirstPage}
          isOtherBrowser={isOtherBrowser}
          welcomeVoice={welcomeVoice}
        />
      </div>
    )
  }
}

export default connect((state) => { return { source: state.source } })(IndexPage)