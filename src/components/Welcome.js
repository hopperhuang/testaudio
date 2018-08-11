import React from 'react'

export default class Welcome extends React.Component {
    render() {
        // const { welcomeVoice, liveVoice } = this.props
        const { resouceLoaded } = this.props
        console.log(resouceLoaded)
        return (
            <div >
                welcome to maoyan, click me, soft !!
                <div>
                    {/* 资源加载完成的情况下出现 */}
                    {resouceLoaded ? <div id="goToFirst" >资源加载完成，请点击进入</div> : ''}
                </div>
            </div>
        )
    }
}
