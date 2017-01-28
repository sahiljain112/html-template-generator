'use babel';

let data

const configureTitle = (title) => {
  data.title = title
}

// ADDED ONLY SINGLE INPUT SUPPORT. LOGIC.JS IMPLEMENTS
const configureScripts = (scripts) => {
  data.scripts = data.scripts || []
  scripts.forEach(scriptData => {
   data.scripts.push({
     src: scriptData.src,
     type: scriptData.type
   })
  })
}

const configureStylesheets = (stylesheets) => {
  data.links = data.links || []
  stylesheets.forEach(stylesheetData => {
    data.links.push({
      rel: stylesheetData.rel,
      type: stylesheetData.type,
      title: stylesheetData.title,
      href: stylesheetData.href
    })
  })
}

const functions = [
  configureTitle,
  configureScripts,
  configureStylesheets
]

const configureData = (userInput) => {
  data = {}
  data.lang = 'en'
  functions.forEach((func, index) => {
    console.log(func, index)
    func(userInput[index])
  })
  console.log('Data is ',data)
  return data
}

export default configureData
