(function(global, plugin) {
  'use strict';

  if (typeof define === 'function' && define.amd)
    define('editore-embed-plugin', plugin);
  else if (typeof exports !== 'undefined')
    exports.EditoreEmbedPlugin = plugin();
  else
    global.EditoreEmbedPlugin = plugin();
}(window, function() {
  'use strict';

  function EditoreEmbedPlugin() {
    var self = this;
    // set plugin elements/props
    self.button = document.createElement('button');
    self.button.innerText = 'Insert Embed';
    self.name = 'embedInsertionPlugin';

    // component elements
    self.elements = {
      dialog: document.createElement('dialog'),
      textarea: document.createElement('textarea'),
      header: document.createElement('header'),
      title: document.createElement('h1'),
      cancelButton: document.createElement('button'),
      applyButton: document.createElement('button'),
    };

    // set elements ids
    self.elements.dialog.id = self.name + 'Dialog';
    self.elements.textarea.id = self.name + 'Textarea';
    self.elements.applyButton.id = self.name + 'ApplyButton';
    self.elements.cancelButton.id = self.name + 'CancelButton';

    // set elements attributes
    self.elements.title.innerText = self.options.titleText || 'Embed Script';
    self.elements.applyButton.innerText = self.options.applyButtonText || 'Insert';
    self.elements.cancelButton.innerText = self.options.cancelButtonText || 'Cancel';
    self.elements.textarea.placeholder = self.options.textareaPlaceholder || 'Insert embed script';

    // add dialog elements
    self.elements.dialog.appendChild(self.elements.header);
    self.elements.dialog.appendChild(self.elements.textarea);
    if (self.options.titleText)
      self.elements.header.appendChild(self.elements.title);
    self.elements.header.appendChild(self.elements.cancelButton);
    self.elements.header.appendChild(self.elements.applyButton);

    // handlers
    self.onApply = function(e) {
      e.preventDefault();
      self.insertEmbed(self.elements.textarea.value);
    }

    self.onCancel = function (e) {
      e.preventDefault();
      self.hideDialog();
    }

    // set handlers
    self.elements.applyButton.addEventListener('click', self.onApply);
    self.elements.cancelButton.addEventListener('click', self.onCancel);

    // add dialog to the document
    document.body.appendChild(self.elements.dialog);
  }

  EditoreEmbedPlugin.prototype = {
    action: function(field, e) {
      e.stopPropagation();
      e.preventDefault();

      this.showDialog();
    },

    destroy: function() {
      var self = this;
      // remove dialog and event listeners
      self.elements.applyButton.removeEventListener('click', self.onApply);
      self.elements.cancelButton.removeEventListener('click', self.onCancel);
      document.body.removeChild(self.elements.dialog);
    },

    insertEmbed: function(script) {
      console.log(script);
    },

    showDialog: function() {
      var self = this;
      self.elements.dialog.showModal();
    },

    hideDialog: function() {
      var self = this;
      self.elements.dialog.close();
    }
  };

  return EditoreEmbedPlugin;
}));
