import React from 'react';
import generatePage from './generate';

class Page extends React.Component {
    render() {
        return (
            <div>
                <div>这是第一页</div>
                <div id="goToSecond" >点击我去第二页</div>
            </div>
        )
    }
}

const FirstPage = generatePage(Page)

export default FirstPage