const fs = require('fs');
const path = require('path')

const tree = 
{
  components: 'div',
  properties: {
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
            components: 'content',
            properties: {
               content: 'content' ,
               key: 'content' ,
            }
        },
      ]
    }
  ]
};

// pre-define which tats to be
const defaultTags = [
    'div',
    'span',
    'h1',
    'li'
]

function analyseTreeDependence(tree) {
    const components = []
    // get components used in tree
    const getComponent = (com) => {
        const component = com.components
        components.push(component)
        const { children } = com
        if (children) {
            children.forEach(child => {
                getComponent(child)
            });
        }
    }
    getComponent(tree)
    // remove duplicated component
    const dependence = []
    components.forEach(component => {
        if (dependence.indexOf(component) === -1) {
            dependence.push(component)
        }
    });
    // remove default tags
    const dependenceAfterFilter = dependence.filter(dep => defaultTags.indexOf(dep) === -1)
    
    return {dependenceAfterFilter, dependence}
}

// 手动写入
const customComponents = {
    header: 'Header',
    layout: 'Layout',
    content: 'Content',
    footer: 'Footer',
}

function generateImportStringFromDependence(dependence) {
    const templateString = 'import component from \'../components/component\'\n'
    const reg = /(import\s)component(\sfrom\s'\.\.\/components\/)component('\n)/
    const importStringsArray = dependence.map(dep => {
        const fileName = dep;
        const componentName = customComponents[dep]
        const replacer = (matchi, p1, p2, p3) => {
            const string = `${p1}${componentName}${p2}${fileName}${p3}`
            return string
        }
        const string = templateString.replace(reg, replacer)
        return string
    })
    let string = '';
    importStringsArray.forEach(s => string += s)
    return string
}


function generateCompnentStringFromDependence(dependence) {
    // default tag -> default tag
    // component -> component
    let keysAndValues = ''
    const componenttStringArray = dependence.map(dep => {
        let isDefault = true
        if (defaultTags.indexOf(dep) === -1) {
            isDefault = false
        }
        let string
        if (isDefault) {
            string = `${dep}: '${dep}',\n`
        }   else {
            const component = customComponents[dep]
            string = `${dep}: ${component},\n`
        }
        return string
    })
    componenttStringArray.forEach((string) => {
        keysAndValues += string
    })
    const componentString = `const components = { \n${keysAndValues}}\n`
    return componentString
}

function replaceImportFieldAndComponentField(rawText, importString, componentString) {
    const reg = /((?:.|\n)*)\/\*\simport\s\*\/(?:.|\n)*\/\*\simport\s\*\/(.|\n)*\/\*\scomponents\s\*\/(?:.|\n)*\/\*\scomponents\s\*\/((?:.|\n)*)/g
    const importStringWithComment = `/* import */\n${importString}\n/* import */\n`
    const componentStringWithComment = `/* components */\n${componentString}\n/* components */\n`
    // const result = reg.exec(rawText)
    // console.log(result)
    // console.log(importStringWithComment)
    // console.log(componentStringWithComment)
    const replacer = (match,p1, p2, p3) => {
        const string = `${p1}${importStringWithComment}${p2}${componentStringWithComment}${p3}`
        return string
    }
    const newText = rawText.replace(reg, replacer)
    return newText
}

function getFile() {
    const pathname = path.resolve(__dirname, 'generate.js')
    fs.readFile(pathname, 'utf8', (err, data) => {
        if (err) {
            throw err
        }
        // use strings to replace file
        const {dependence, dependenceAfterFilter} = analyseTreeDependence(tree)
        // console.log(dependence)
        const importStrings = generateImportStringFromDependence(dependenceAfterFilter)
        // console.log(importStrings)
        const componentStrings = generateCompnentStringFromDependence(dependence)
        // console.log(componentStrings)
        
        const newText = replaceImportFieldAndComponentField(data, importStrings, componentStrings)
        const writePath = path.resolve(__dirname, 'index.js')
        fs.writeFile(writePath, newText,(err) => {
            if (err) {
                throw err
            }
            console.log('create file')
        })
    })
}

getFile()