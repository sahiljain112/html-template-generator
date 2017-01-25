'use babel';

import HtmlTemplateGeneratorView from './html-template-generator-view';
import { CompositeDisposable } from 'atom';

export default {

  htmlTemplateGeneratorView: null,
  subscriptions: null,

  activate(state) {

  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-template-generator:generate': () => this.generateTemplate()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.htmlTemplateGeneratorView.destroy();
  },

  serialize() {
    return {
      htmlTemplateGeneratorViewState: this.htmlTemplateGeneratorView.serialize()
    };
  },

  generateTemplate() {
    console.log('Generating template')
    const editor = atom.workspace.getActiveTextEditor()
    editor.insertText('Hello')
  }

};
