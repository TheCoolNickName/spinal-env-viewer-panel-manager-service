# spinal-env-viewer-panel-manager-service

spinal-env-viewer-panel-manager-service is a service to create and register panels for the an spinal organ browser viewer

## Installation

```sh
npm i --save https://github.com/spinalcom/spinal-env-viewer-panel-manager-service
```

## Usage

Get the service instances and factory.

```js
const {
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");
```

### Create an compoment to mount

For example the following code create a compoment via vue-material Dialog.
The compoment must have the methods `opened(option)` and `closed(option)`.
A props `onFinised` is given so the compoment can close itsef if needed.

```html
<!-- testCompomentDialog.vue -->
<!-- here is a small compoment repesenting a Prompt Dialog -->
<template>
  <div>
    <md-dialog :md-active.sync="showDialog" @md-closed="closeDialog(false)">
      <md-dialog-title>my custom prompt</md-dialog-title>
      <md-dialog-content>
        <md-field>
          <label>Select Value</label>
          <md-input v-model="inputValue"></md-input>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="closeDialog(false)">
          Close
        </md-button>
        <md-button class="md-primary" @click="closeDialog(true)">
          Save
        </md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
  export default {
    name: "testCompomentDialog",
    props: ["onFinised"],
    data() {
      return {
        showDialog: true,
        inputValue: ""
      };
    },
    methods: {
      opened(option) {
        this.inputValue = option.initialValue;
        console.log("opened dialog", option);
      },
      removed(option) {
        this.showDialog = false;
        console.log("removed dialog", option);
      },
      closeDialog(closeResult) {
        if (typeof this.onFinised === "function")
          this.onFinised({ closeResult, inputValue: this.inputValue });
      }
    }
  };
</script>
```

### Register and mount the component.

Now we can register the compomenet and choose where to mount it.

```js
import Vue from "vue";
// retrive the Compoment
import aVueCompomentDialog from "./testCompomentDialog.vue";

SpinalMountExtention.mount({
  // name registered.
  name: "myCustomDialogName",
  // Vue.extend to create a Compoment constructor
  vueMountComponent: Vue.extend(aVueCompomentDialog),
  // where to  append the Compoment
  parentContainer: document.body
});
```

### Build transform config

Add some build config for browserify in the `package.json`.

```json
...
  "browserify": {
    "transform": [
      "vueify",
      "babelify"
    ]
  }
...
```

## Open the compoment

Later we can open the mounted compoment via an button (or something else) via the `openPanel` method.

```js
const {
  spinalPanelManagerService,
  SpinalMountExtention
} = require("spinal-env-viewer-panel-manager-service");

spinalPanelManagerService.openPanel("myCustomDialogName", {
  initialValue: "hello"
});
```

---

## API Documentations

{{>main}}

---
