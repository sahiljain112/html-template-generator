'use babel'

/** @jsx etch.dom */

import etch from 'etch'
import Logic from './logic'
export default class HtmlTemplateGeneratorView {

  constructor(serializedState) {

 this.generateTemplate = this.generateTemplate.bind(this)
 this.hidePane = this.hidePane.bind(this)
 this.modalPanel = null
 this.fields = null
 etch.initialize(this)

}

displayForm(modal) {
  this.update({modal})
  if(this.modalPanel.isVisible())
    modal.hide()
  else{
    this.resetValues()
    this.createFields()    // Appropriate place to put it since displayForm is called to generate template!
    modal.show()
   }
}

createFormField(innerText) {
//return document.createElement('div');
  const inputLabel = innerText[0]
  const className = `.form_field ${inputLabel}`
  innerText = innerText.map(element => {
    const placeholder = `${element}`
    return( <input className='native-key-bindings' type='text' placeholder={placeholder} /> )
  })

  innerText.splice(0, 1)
  console.log('Class name is ', className)
  return (
    <div className = { className }>
      <span> { inputLabel } </span>
      { innerText }
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
  }

  extractValuesForLinks() {
    const linkValues = [];
    const linkObject = {
      rel: '',
      type: '',
      title: '',
      href: ''
    }
    const linkFormFields = Array.from((document.querySelector('.Link')).children)
    // console.clear()
    // console.log('LLLLLLLL',Array.from((document.querySelector('.Script')).children))
     linkFormFields.splice(0,1)
     Object.keys(linkObject).forEach((key, index) => {
       linkObject[key] = linkFormFields[index].value
     })
    linkValues.push(linkObject)
    // console.log('SCRIPT VALUES', scriptValues)
    return linkValues
  }

  extractValuesForScripts() {
    // This supports multiple script inputs
    const scriptValues = [];
    const scriptObject = {
      src: '',
      type: ''
    }
    const scriptFormFields = Array.from((document.querySelector('.Script')).children)
    // console.clear()
    // console.log('LLLLLLLL',Array.from((document.querySelector('.Script')).children))
     scriptFormFields.splice(0,1)
     Object.keys(scriptObject).forEach((key, index) => {
       scriptObject[key] = scriptFormFields[index].value
     })
    scriptValues.push(scriptObject)
    // console.log('SCRIPT VALUES', scriptValues)
    return scriptValues
    //return [{src: '1',type: '2'}]
  }

  extractValues() {

    const finalValues = []
    const titleField = Array.from(document.querySelector('.Title').children)[1].value
     console.log(titleField)
    // formFields.forEach((field) => {
    //   console.log('Children',field.children)
    //   finalValues.push(field.children[1].value)
    // }
    console.log('Final Values', [titleField, ...this.extractValuesForScripts(), ...this.extractValuesForLinks()])
    return [titleField, this.extractValuesForScripts(), this.extractValuesForLinks()]
     //console.clear()
  }

  resetValues() {
    const formFields = Array.from(document.querySelectorAll('.form_field'))
    if(formFields)
      formFields.forEach((field) => {
        field.children[1].value = ''
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
    this.hidePane()
    const userInput = this.extractValues()
    const editor = atom.workspace.getActiveTextEditor()
    console.log(userInput)
    editor.insertText(Logic(userInput))
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
