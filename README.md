# editore.js embed plugin [![npm version](https://badge.fury.io/js/editore-embed-plugin.svg)](http://badge.fury.io/js/editore-embed-plugin)

#### install
Available on npm: `npm install editore-embed-plugin` or [directly download](https://github.com/evandroeisinger/editore-embed-plugin.js/raw/master/src/editore-embed-plugin.js)

#### basic usage
It's easy to use! Load [editore.js](https://github.com/evandroeisinger/editore.js) into your application, instantiate it and register the new **insertion** plugin.

```javascript
var editore = new Editore(document.getElementById('editor')),
    EmbedPlugin;

// Global
EmbedPlugin = window.EditoreEmbedPlugin;
// CommonJS
EmbedPlugin = require('editore-embed-plugin');

// then register!
editore.registerInsertComponent(EmbedPlugin, {
  // (optional) 

});
```
---
#### support
- chrome: ?
- firefox: ?
- safari: ?
- internet explore: ?


---
#### contribute
Everyone can contribute! Finding bugs, creating issues, improving editor it self or creating components.
Every contribution will be welcomed! :santa: 

**Fork it** -> **Branch it** -> **Test it** -> **Push it** -> **Pull Request it** :gem:  
