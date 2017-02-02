'use babel'

/** @jsx etch.dom */

import etch from 'etch'
import Logic from './logic'
import touch from 'touch'
import path from 'path'
import fs from 'fs'
export default class HtmlTemplateGeneratorView {

  constructor(serializedState) {
 this.generateTemplate = this.generateTemplate.bind(this)
 this.appendData = this.appendData.bind(this)
 this.hidePane = this.hidePane.bind(this)
 this.modalPanel = null
 this.fields = null
 this.classes = ['.Title', '.Script', '.Link']
 etch.initialize(this)
}

displayForm(modal) {
  if(modal.isVisible())
    modal.hide()
  else{
    this.resetValues()
    this.createFields()    // Appropriate place to put it since displayForm is called to generate template!
    modal.show()
   }
     this.update({modal})
}

createFormField(innerText) {
  const inputLabel = innerText[0]
  const className = `input-wrapper ${inputLabel}`
  innerText = innerText.map(element => {
    const placeholder = `${element}`
    return( <input className='native-key-bindings' type='text' placeholder={placeholder} />)
  })

  innerText.splice(0, 1)
  return (
    <div>
      <span> { inputLabel } </span>
      <div className={ className }>
      { innerText }
      </div>
    </div>
  )
}

createFields() {
  let formFields = []
  const elementData = [
    ['Title', 'title'],
    [ 'Script', 'src', 'type'],
    [ 'Link', 'rel', 'type', 'title', 'href']
  ]
  for(let i = 0; i < 3; i++)
    formFields.push(this.createFormField(elementData[i]))
  this.fields = formFields
}
  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.modalPanel.destroy();
    this.fields = null;
    this.classes = null;
  }

  extractValues(tag, className) {
    const extractedValues = [];
    const elementFormFields = Array.from(document.querySelector(className).children)
     Object.keys(tag).forEach((key, index) => {
       tag[key] = elementFormFields[index].value
     })
    extractedValues.push(tag)
    return extractedValues
  }

  resetValues() {
      const classNames = this.classes
      classNames.forEach(className => {
        if(document.querySelector(className)){
          const formFields = Array.from(document.querySelector(className).children)
        //  formFields.splice(0,1)
          formFields.forEach(field => field.value = '')
        }
      })
  }

  update (props) {
    this.modalPanel = props.modal
    document.querySelector('.close_button').onclick = this.hidePane
    document.querySelector('.generate_button').onclick = this.generateTemplate
    return etch.update(this)
  }

  generateTemplate() {

    console.log('Generating template')
    const classNames = this.classes
    const scriptObject = {  src: '', type: '' }
    const linkObject = { rel: '', type: '', title: '', href: '' }
    this.hidePane()

    const titleField = Array.from(document.querySelector(classNames[0]).children)[0].value
    const userInput = [titleField, this.extractValues(scriptObject, classNames[1]), this.extractValues(linkObject, classNames[2])]
    const editor = atom.workspace.getActiveTextEditor()
    console.log('User input is', userInput)
    console.clear()
    if(editor){
      editor.insertText(Logic(userInput))
      atom.notifications.addSuccess('Template generated successfully')
    }
    else {
      atom.notifications.addError('No active text editor found')
    }
    //       atom.notifications.addSuccess('Template generated successfully')
  }

  appendData(filePath, html) {

    fs.appendFile(filePath, html, (error) => {
      if (error) atom.notifications.addError('Unable to access file.Try again')
      else {
        console.log('data append done')
        atom.notifications.addSuccess('Template generated successfully')
      }
    })
  }

  generateQuickTemplate(modalPanel) {
    console.log('Generating Quick template')
    if(modalPanel.isVisible())
      modalPanel.hide()
      const DEFAULT_SCRIPT_INPUT = [ {  src: '', type: '' } ]
      const DEFAULT_LINK_INPUT = [{ rel: '', type: '', title: '', href: '' }]
    const DEFAULT_USER_INPUT= ['',DEFAULT_SCRIPT_INPUT, DEFAULT_LINK_INPUT]

    const html = Logic(DEFAULT_USER_INPUT)
    console.log(process.env.HOME, atom.project.getPaths()[0])
    const filePath = path.join(atom.project.getPaths()[0], 'index.html')
    touch(filePath, (error) => {
      if (error) atom.notifications.addError('Unable to create file', console.error(error))
      else this.appendData(filePath, html)
    })
  }
  // Although 'Esc' key can be used to close the modal, this is user friendly
  hidePane() {
    this.modalPanel.hide()
  }

  render() {
    const formFields = this.fields || ''
    return (
      <div>
      <div className='header_wrapper'>
        <div className='form_title'> Generate Template </div>
        <button className='close_button' > Close </button>
      </div>
        <form>
          { formFields }
        </form>
        <button className='generate_button'> Generate </button>
      </div>)
  }
}
