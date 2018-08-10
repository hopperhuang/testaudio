import React from 'react'

function generatePage(Com) {
    return class Page extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                interVal: null
            }
            this.setLouderInterval = this.setLouderInterval.bind(this)
            this.clearLouderInterval = this.clearLouderInterval.bind(this)
        }
        setLouderInterval() {
            const self = this
            const { welcomeVoice } = this.props
            let times = 0
            const interVal = setInterval(() => {
                if (times <= 3) {
                    times += 1
                    welcomeVoice.louder() 
                } else {
                    self.clearLouderInterval()
                }
            }, 1000)
            this.setState({
                interVal
            })
        }
        clearLouderInterval() {
            const { interVal } = this.state
            clearInterval(interVal)
        }
        componentDidMount() {
            this.setLouderInterval()
        }
        componentWillUnmount() {
            const { welcomeVoice } = this.props
            console.log("unmount")
            this.clearLouderInterval()
            welcomeVoice.stop()
        }
        render() {
            return(
                <Com />
            )
        }
    }
}

export default generatePage