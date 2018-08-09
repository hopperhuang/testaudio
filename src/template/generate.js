
import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
/* import */
import Header from '../components/Header'
import Layout from '../components/Layout'
import Footer from '../components/Footer'
import Content from '../components/Content';
/* import */





/* components */
const components = {
    div: 'div',
    layout: Layout,
    header: Header,
    content: Content,
    footer: Footer
  }
/* components */


/* template function */
function createElement(com) {
    const label = com.components;
    const { properties, children } = com
    const component = components[label]
    const childrenElementArrayArray = children ? children.map(createElement) : []
    const element = React.createElement(component, properties, childrenElementArrayArray)
    return element
  }

function generateComponentFromTree(tree) {
    const element = createElement(tree)
    return class extends React.Component {
      constructor(props) {
        super(props)
        this.state = {
          Com: () => { return (<div>加载中。。。</div>)},
          loaded: false,
        }
      }
      componentDidMount() {
        const self = this;
        // 模拟异步请求
        setTimeout(() => {
          self.setState({
            Com: element,
            loaded: true
          })
        }, 1000);
      }
      render() {
        const { loaded, Com } = this.state
        return loaded ? Com : <Com />
      }
    }
  }
  /* template  function */



  // get by ajax
  const tree = 
  {
    components: 'div',
    properties: {
      className: styles.normal
    },
    children: [
      {
        components: 'layout',
        properties: {
          title: 'this is a title',
          key: 'layout'
        },
        children: [
          {
            components: 'header',
            properties: {
              name: 'navigator here' ,
              key: 'header',
            },
          },
          {
            components: 'content',
            properties: {
               content: 'content' ,
               key: 'content' ,
            }
          },
          {
            components: 'footer',
            properties: {
               content: 'footer here' ,
               key: 'footer' ,
            }
          }
        ]
      }
    ]
  };

const IndexPage = generateComponentFromTree(tree)

IndexPage.propTypes = {
};

export default connect()(IndexPage);
