'use babel';

import HtmlTemplateGeneratorView from './html-template-generator-view';
import { CompositeDisposable } from 'atom';
import Logic from './logic'

export default {

  generatorView: null,
  subscriptions: null,

  activate(state) {

  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.generatorView = new HtmlTemplateGeneratorView(state.generatorViewState)
    this.subscriptions = new CompositeDisposable();
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.generatorView.getComponent(),
      visible:false
    })
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-template-generator:generate': () => this.displayForm()
    }));

    this.closeClickHandler = this.closeClickHandler.bind(this)
    this.generateTemplate = this.generateTemplate.bind(this)

    const buttons = [...this.generatorView.getButtons()]
    console.log(buttons)
    buttons[0].onclick = this.closeClickHandler
    buttons[1].onclick = this.generateTemplate
  },

  deactivate() {
    this.subscriptions.dispose();
    this.generatorView.destroy();
    this.modalPanel.destroy();
  },

  serialize() {
    return {
      generatorViewState: this.generatorView.serialize()
    };
  },

  displayForm() {

    if(this.modalPanel.isVisible())
      this.modalPanel.hide()
    else{
      this.generatorView.resetValues()    // Appropriate place to put it since displayForm is called to generate template!
      this.modalPanel.show()
    }

  },

  generateTemplate() {
    console.log('Generating template')
    this.modalPanel.hide()
    const editor = atom.workspace.getActiveTextEditor()
    const userInput = this.generatorView.extractValues()
    console.log(userInput)
    editor.insertText(Logic(userInput))
  },
  // Although 'Esc' key can be used to close the modal, this is user friendly
  closeClickHandler() {
    this.modalPanel.hide()
  }

};
