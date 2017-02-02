'use babel';

import HtmlTemplateGeneratorView from './html-template-generator-view';
import { CompositeDisposable } from 'atom';

export default {

  generatorView: null,
  subscriptions: null,
  modalPanel:null,

  activate(state) {

  // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.generatorView = new HtmlTemplateGeneratorView()
    this.subscriptions = new CompositeDisposable();
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.generatorView,
      visible:false
    })
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'html-template-generator:generate': () => this.generatorView.displayForm(this.modalPanel),
      'html-template-generator:quick-generate': () => this.generatorView.generateQuickTemplate(this.modalPanel)
    }));

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
  }

};
