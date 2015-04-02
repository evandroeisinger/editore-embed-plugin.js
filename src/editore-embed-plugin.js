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
      actions: document.createElement('div'),
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
    self.elements.actions.appendChild(self.elements.cancelButton);
    self.elements.actions.appendChild(self.elements.applyButton);
    self.elements.header.appendChild(self.elements.title);
    self.elements.header.appendChild(self.elements.actions);
    self.elements.dialog.appendChild(self.elements.header);
    self.elements.dialog.appendChild(self.elements.textarea);

    // handlers
    self.onApply = function(e) {
      e.preventDefault();
      self.insertEmbed(self.elements.textarea.value);
    };

    self.onCancel = function (e) {
      e.preventDefault();
      self.hideDialog();
    };

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
      var self = this,
          embed;

      if (!script) {
        self.elements.dialog.className = 'invalid';
        return;
      }
      // create embed
      embed = document.createElement('iframe');
      embed.style.border = 0;
      embed.onload = self.updateEmbedHeight;
      // insert embed after the component element
      self.component.element.parentElement.insertBefore(embed, self.component.element.nextSibling);
      // if embed don't have siblings create a empty block after it
      if (!embed.nextSibling)
        self.component.element.parentElement.insertBefore(self.createEmptyBlock(), embed.nextSibling);
      // insert embed content
      embed.contentDocument.open();
      embed.contentDocument.writeln(script);
      embed.contentDocument.close();
      // close dialog
      self.hideDialog();
    },

    updateEmbedHeight: function() {
      this.contentWindow.document.body.style.margin = 0;
      this.height = this.contentWindow.document.body.scrollHeight + 'px';
    },

    showDialog: function() {
      var self = this;

      self.elements.dialog.className = '';
      self.elements.textarea.value = '';
      self.elements.dialog.showModal();
    },

    hideDialog: function() {
      var self = this;
      self.elements.dialog.close();
    }
  };

  return EditoreEmbedPlugin;
}));
