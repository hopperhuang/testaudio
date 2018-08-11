import React from 'react';
import generatePage from './generate';

class Second extends React.Component {
    render() {
        return (
            <div>这是第二个页面</div>
        )
    }
}

const SecondPage = generatePage(Second)


export default SecondPage