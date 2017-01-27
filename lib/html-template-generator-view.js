'use babel'

export default class HtmlTemplateGeneratorView {

  constructor(serializedState) {
    // Create root element
// this.element = document.createElement('div')
 this.formContainer = document.createElement('div')
 this.form = document.createElement('form');

 this.headerWrapper = document.createElement('div')
 this.headerWrapper.classList.add('header_wrapper')

 this.closeButton = document.createElement('button')
 this.closeButton.innerText = 'Close'
 this.closeButton.classList.add('close_button')

 this.formTitle = document.createElement('div')
 this.formTitle.innerText = 'Generate Template'
 this.formTitle.classList.add('form_title')

// Wrapper for all form field
const innerText = ['Title', 'Script', 'Link']
for(let i = 0 ; i < 3 ; i++)
  this.form.appendChild(this.createFormField(innerText[i]))
 //Create message element

 this.generateButton = document.createElement('button')
 this.generateButton.innerText = 'Generate'
 this.generateButton.classList.add('generate_button')

 this.headerWrapper.appendChild(this.formTitle)
 this.headerWrapper.appendChild(this.closeButton)
 this.formContainer.appendChild(this.headerWrapper)
 this.form.appendChild(this.generateButton)
 this.formContainer.appendChild(this.form)

// document.body.appendChild(this.formContainer)

}

createFormField(innerText) {
//return document.createElement('div');

  let formField = document.createElement('div');
  formField.classList.add('form_field')

  const input = document.createElement('input');
  input.setAttribute('type', 'text')

  const formFieldTitle = document.createElement('span')
  formFieldTitle.innerText = innerText

  formField.appendChild(formFieldTitle)
  formField.appendChild(input)
  return formField

}

  addScript(){

  }

  addLink() {

  }

  removeScript() {

  }

  removeLink() {

  }
  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.formContainer.remove();
  }

  getElement() {
    return this.formContainer;
  }

}
