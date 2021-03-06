import React from 'react';
import { connect } from 'dva'
import fetch from 'dva/fetch'
// pages
import FirstPage from '../components/First';
import SecondPage from '../components/Second';
import Welcome from '../components/Welcome';
// files
import audio from '../assets/woman.mp3'
import live from '../assets/live.mp3'
// utils
import Broadcast from '../utils/broadcast';

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
        secondpage: SecondPage,
      },
      welcomeVoice: null,
      liveVoice: null
    }
    this.goToFirstPage = this.goToFirstPage.bind(this)
    this.goToSecondPage = this.goToSecondPage.bind(this)
  }
  componentDidMount() {
    const self = this
    fetch(audio)
      .then(res => res.arrayBuffer())
      .then((buffer) => {
          const broadcastor = new Broadcast(buffer,
              'goToFirst',
              () => { self.goToFirstPage() },
              () => { self.setState({ welcomeVoice: broadcastor })
            })
          return broadcastor
        })
      // .then((broadcastor => self.setState({ welcomeVoice: broadcastor })))
    fetch(live)
      .then(res => res.arrayBuffer())
      .then((buffer) => {
        const broadcastor = new Broadcast(buffer,
            'goToSecond',
            () => { self.goToSecondPage() },
            () => { self.setState({ liveVoice: broadcastor })
          })
        return broadcastor
      })
      // .then(buffer => new Broadcast(buffer, 'goToSecond', () => { self.goToSecondPage() }))
      // .then(broadcastor => self.setState({ liveVoice: broadcastor }))
  }
  // go to first page
  goToFirstPage() {
    this.setState({
      route: 'firstpage'
    })
  }
  goToSecondPage() {
    this.setState({
      route: 'secondpage'
    })
  }
  render() {
    console.log("rendered")
    const { route, routeToComponents, welcomeVoice, liveVoice  } = this.state;
    const Com = routeToComponents[route];
    let music
    let resouceLoaded
    // 设置music属性
    if (route === 'firstpage') {
      music = this.state.welcomeVoice
    } else if (route === 'secondpage') {
      music = this.state.liveVoice
    }
    // 设置 资源属性
    if (route === 'welcome') {
      resouceLoaded = !!welcomeVoice && !!liveVoice
    } else if (route === 'firstpage') {
      resouceLoaded = !!welcomeVoice
    } else if (route === 'secondpage') {
      resouceLoaded = !!liveVoice
    }
    return (
      <div>
        <Com
          {...this.props}
          music={music}
          resouceLoaded={resouceLoaded}
        />
      </div>
    )
  }
}

export default connect((state) => { return { source: state.source } })(IndexPage)