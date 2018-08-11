import React from 'react'

function generatePage(Com) {
    return class Page extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                voiceLouderInterVal: null
            }
            this.setLouderInterval = this.setLouderInterval.bind(this)
            this.clearLouderInterval = this.clearLouderInterval.bind(this)
        }
        setLouderInterval() {
            const self = this
            const { music } = this.props
            let times = 0
            const interVal = setInterval(() => {
                if (times <= 3) {
                    times += 1
                    music.louder() 
                } else {
                    self.clearLouderInterval()
                }
            }, 1000)
            this.setState({
                voiceLouderInterVal: interVal
            })
        }
        clearLouderInterval() {
            const { voiceLouderInterVal } = this.state
            clearInterval(voiceLouderInterVal)
        }
        componentDidMount() {
            this.setLouderInterval()
            console.log(this.props.music.startTime)
        }
        componentWillUnmount() {
            const { music } = this.props
            console.log("unmount")
            this.clearLouderInterval()
            music.stop()
        }
        render() {
            return(
                <Com />
            )
        }
    }
}

export default generatePage