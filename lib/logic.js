'use babel'
import configureData from './data'

const DEFAULT_VALUES = {
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



const generateComponents = (data) => {
  const compiledLinks = data.links.map(link => `<link rel="${ link.rel || DEFAULT_VALUES.LINK.REL }" type="${link.type || DEFAULT_VALUES.LINK.TYPE}" title="${link.title || DEFAULT_VALUES.LINK.TITLE }" href="${link.href || DEFAULT_VALUES.LINK.HREF}">`)
  const compiledScripts = data.scripts.map(script => `<script src="${script.src || DEFAULT_VALUES.SCRIPT.SRC }" type="${script.type || DEFAULT_VALUES.SCRIPT.TYPE}"></script>`)
  const HEAD_CONTENT = [
    `<meta charset="UTF-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`,
    `<title>${data.title || DEFAULT_VALUES.TITLE }</title>`
  ]
  const nestedComponents = {
    htmlStart: "<!DOCTYPE html>",
    htmlLang: `<html lang="en">`,
    head: [...HEAD_CONTENT, ...compiledLinks].map(element => `  ${element}`),
    body: [`<div id="root"></div>`, ...compiledScripts].map(element => `  ${element}`),
    htmlEnd: "</html>"
  }

  nestedComponents.head = ["<head>", ...nestedComponents.head, "</head>"].join('\n')
  nestedComponents.body = ["<body>", ...nestedComponents.body, "</body>"].join('\n')
  let html = []
  Object.keys(nestedComponents).forEach(element => html.push(nestedComponents[element]))
  html = html.join('\n')
  return html.toString()

}

const generateTemplate = (userInput) => {
  console.log('Generating template AAA', userInput)
  const data = configureData(userInput)
  const html = generateComponents(data)
  return html
}

export default generateTemplate
