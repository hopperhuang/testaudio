import React from 'react';
import { connect } from 'dva'
import audio from '../assets/woman.mp3'

class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  componentDidMount() {
    const { dispatch } = this.props
    const request = new XMLHttpRequest();
    request.open('GET',audio, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        dispatch({
          type: 'source/save',
          payload: request.response
        })
    }
    request.send()
  }
  onClick() {
    const { source } = this.props
    console.log(source)
  }
  render() {
    return (
      <div onClick={this.onClick} >
        welcome, please click me
      </div>
    )
  }
}

export default connect((state) => { return { source: state.source}})(IndexPage)