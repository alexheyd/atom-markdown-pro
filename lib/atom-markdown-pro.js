'use babel';

import AtomMarkdownProView from './atom-markdown-pro-view';
import { CompositeDisposable } from 'atom';

export default {

  atomMarkdownProView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomMarkdownProView = new AtomMarkdownProView(state.atomMarkdownProViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomMarkdownProView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-markdown-pro:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomMarkdownProView.destroy();
  },

  serialize() {
    return {
      atomMarkdownProViewState: this.atomMarkdownProView.serialize()
    };
  },

  toggle() {
    console.log('AtomMarkdownPro was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
