'use babel';
import { data, singleComponents } from './data'

const compiledLinks = singleComponents.links.map(link => `<link rel='${link.rel}' type='${link.type}' title='${link.title}' href='${link.href}'>`)
const compiledScripts = singleComponents.scripts.map(script => `<script src='${script.src}' type='${script.type}'></script>`)

const nestedComponents = {

  htmlStart: '<!DOCTYPE html>',
  htmlLang: `<html lang='${data.lang}'>`,
  head: [`${singleComponents.title}`,...compiledLinks].map(element => `  ${element}`),
  body: [`<div id='root'></div>`, ...compiledScripts].map(element => `  ${element}`),
  htmlEnd: '</html>'

}

console.log(nestedComponents.head)
nestedComponents.head = ['<head>', ...nestedComponents.head, '</head>'].join('\n')
nestedComponents.body = ['<body>', ...nestedComponents.body, '</body>'].join('\n')

// const indentContentAndJoin = (contentToIndent) => {
//   contentToIndent = contentToIndent.map(element => `  ${element}`).join('\n')
// }
//
// indentContentAndJoin(nestedComponents.head)
// indentContentAndJoin(nestedComponents.body)

const generateTemplate = () => {
  console.log('Generating template')
  let html = []
  Object.keys(nestedComponents).forEach(element => html.push(nestedComponents[element]))
  html = html.join('\n')
  return html.toString()
}

export default generateTemplate
