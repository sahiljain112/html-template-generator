'use babel';

let data

const configureTitle = (title) => {
  data.title = title
}

// ADDED ONLY SINGLE INPUT SUPPORT. LOGIC.JS IMPLEMENTS
const configureScripts = (scriptData) => {
  data.scripts = data.scripts || []
  data.scripts.push({
    src: scriptData
  })
}

const configureStylesheets = (stylesheetData) => {
  data.links = data.links || []
  data.links.push({
    href: stylesheetData
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
