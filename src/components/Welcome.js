import React from 'react'

export default class Welcome extends React.Component {
    render() {
        const {  source, isOtherBrowser } = this.props
        const { buffer } = source
        return (
            <div >
                welcome to maoyan, click me, soft !!
                <div>
                    {isOtherBrowser ? <div>其他浏览器</div> : ''}
                    {/* 其他浏览器，且资源加载完成的情况下，提示用户点击进入 */}
                    {isOtherBrowser && buffer ?
                        <div id="goToFirst" >
                            加载完成，请点击进入
                        </div> : ''}
                </div>
            </div>
        )
    }
}
