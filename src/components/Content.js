import img from '../assets/yay.jpg'
import audio from '../assets/woman.mp3';

function Content({ content }) {
    return (
        <div>
            <div>
                <img style={{ width: '100px', height: '100px' }} src={img} alt="" />
            </div>
            <div>
                <audio controls src="http://ra01.sycdn.kuwo.cn/resource/n3/32/56/3260586875.mp3" />
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default Content