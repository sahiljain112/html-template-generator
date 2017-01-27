'use babel'
import { data, singleComponents } from './data'

const DEFAULT_VALUES = {
  LANG: 'en',
  TITLE: 'My HTML Page',
  LINK: {
    REL: 'stylesheet',
    TYPE: 'text/css',
    TITLE: 'Cool stylesheet',
    HREF: 'style.css'
  },
  SCRIPT: {
    SRC: 'main.js',
    TYPE: 'text/javascript'
  }
}

const compiledLinks = singleComponents.links.map(link => `<link rel='${ link.rel || DEFAULT_VALUES.LINK.REL }' type='${link.type || DEFAULT_VALUES.LINK.TYPE}' title='${link.title || DEFAULT_VALUES.LINK.TITLE }' href='${link.href || DEFAULT_VALUES.LINK.HREF}'>`)
const compiledScripts = singleComponents.scripts.map(script => `<script src='${script.src || DEFAULT_VALUES.SCRIPT.SRC }' type='${script.type || DEFAULT_VALUES.SCRIPT.TYPE}'></script>`)

const nestedComponents = {

  htmlStart: '<!DOCTYPE html>',
  htmlLang: `<html lang='${data.lang}'>`,
  head: [`${singleComponents.title}`, ...compiledLinks].map(element => `  ${element}`),
  body: [`<div id='root'></div>`, ...compiledScripts].map(element => `  ${element}`),
  htmlEnd: '</html>'

}

// console.log(nestedComponents.head)
nestedComponents.head = ['<head>', ...nestedComponents.head, '</head>'].join('\n')
nestedComponents.body = ['<body>', ...nestedComponents.body, '</body>'].join('\n')

const generateTemplate = () => {
  console.log('Generating template')
  let html = []
  Object.keys(nestedComponents).forEach(element => html.push(nestedComponents[element]))
  html = html.join('\n')
  return html.toString()
}

console.clear()
export default generateTemplate
