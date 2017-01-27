'use babel'

/** @jsx etch.dom */

import etch from 'etch'
import Logic from './logic'
export default class HtmlTemplateGeneratorView {

  constructor(serializedState) {

 this.generateTemplate = this.generateTemplate.bind(this)
 this.hidePane = this.hidePane.bind(this)
 this.modalPanel = null
 etch.initialize(this)

}

displayForm(modal) {
  this.update({modal})
  if(this.modalPanel.isVisible())
    modal.hide()
  else{
    this.resetValues()    // Appropriate place to put it since displayForm is called to generate template!
    modal.show()
   }
}

createFormField(innerText) {
//return document.createElement('div');
  return (
    <div className = 'form_field'>
      <input className='native-key-bindings' type='text' />
      <span> { innerText } </span>
    </div>
  )

}  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.modalPanel.destroy();
  }

  extractValues() {

    const finalValues = []
    const formFields = Array.from(document.querySelectorAll('.form_field'))
    formFields.forEach((field) => {
      console.log('Children',field.children)
      finalValues.push(field.children[1].value)
    })
    console.log('Final',finalValues)
    return finalValues
     console.clear()
  }

  resetValues() {
    const formFields = Array.from(document.querySelectorAll('.form_field'))
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

    let formFields = []
    const innerText = ['Title', 'Script', 'Link']
    for(let i = 0 ; i < 3 ; i++)
      formFields.push(this.createFormField(innerText[i]))

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
