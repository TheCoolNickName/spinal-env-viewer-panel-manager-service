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

## Classes

<dl>
<dt><a href="#SpinalPanelManagerService">SpinalPanelManagerService</a></dt>
<dd></dd>
<dt><a href="#SpinalPanelApp">SpinalPanelApp</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#mount">mount(option)</a></dt>
<dd></dd>
</dl>

<a name="SpinalPanelManagerService"></a>

## SpinalPanelManagerService
**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| panels | <code>object</code> | key = panelName, value = an instance of SpinalPanelApp |


* [SpinalPanelManagerService](#SpinalPanelManagerService)
    * [new SpinalPanelManagerService()](#new_SpinalPanelManagerService_new)
    * _instance_
        * [.registerPanel(panelName, spinalPanelApp)](#SpinalPanelManagerService+registerPanel)
        * [.openPanel(panelName, option)](#SpinalPanelManagerService+openPanel) ⇒ <code>bool</code>
        * [.closePanel(panelName, option)](#SpinalPanelManagerService+closePanel) ⇒ <code>bool</code>
        * [.tooglePanel(panelName, option)](#SpinalPanelManagerService+tooglePanel) ⇒ <code>bool</code>
    * _static_
        * [.SpinalPanelManagerService](#SpinalPanelManagerService.SpinalPanelManagerService)
            * [new SpinalPanelManagerService()](#new_SpinalPanelManagerService.SpinalPanelManagerService_new)

<a name="new_SpinalPanelManagerService_new"></a>

### new SpinalPanelManagerService()
Containter like service to register and get applications relative to a hookname

<a name="SpinalPanelManagerService+registerPanel"></a>

### spinalPanelManagerService.registerPanel(panelName, spinalPanelApp)
method to register an Panel Application

**Kind**: instance method of [<code>SpinalPanelManagerService</code>](#SpinalPanelManagerService)  

| Param | Type | Description |
| --- | --- | --- |
| panelName | <code>string</code> | the name of the panel |
| spinalPanelApp | [<code>SpinalPanelApp</code>](#SpinalPanelApp) | the application |

<a name="SpinalPanelManagerService+openPanel"></a>

### spinalPanelManagerService.openPanel(panelName, option) ⇒ <code>bool</code>
**Kind**: instance method of [<code>SpinalPanelManagerService</code>](#SpinalPanelManagerService)  

| Param | Type |
| --- | --- |
| panelName | <code>\*</code> | 
| option | <code>\*</code> | 

<a name="SpinalPanelManagerService+closePanel"></a>

### spinalPanelManagerService.closePanel(panelName, option) ⇒ <code>bool</code>
**Kind**: instance method of [<code>SpinalPanelManagerService</code>](#SpinalPanelManagerService)  

| Param | Type |
| --- | --- |
| panelName | <code>\*</code> | 
| option | <code>\*</code> | 

<a name="SpinalPanelManagerService+tooglePanel"></a>

### spinalPanelManagerService.tooglePanel(panelName, option) ⇒ <code>bool</code>
**Kind**: instance method of [<code>SpinalPanelManagerService</code>](#SpinalPanelManagerService)  

| Param | Type |
| --- | --- |
| panelName | <code>\*</code> | 
| option | <code>\*</code> | 

<a name="SpinalPanelManagerService.SpinalPanelManagerService"></a>

### SpinalPanelManagerService.SpinalPanelManagerService
**Kind**: static class of [<code>SpinalPanelManagerService</code>](#SpinalPanelManagerService)  
<a name="new_SpinalPanelManagerService.SpinalPanelManagerService_new"></a>

#### new SpinalPanelManagerService()
Creates an instance of SpinalPanelManagerService.

<a name="SpinalPanelApp"></a>

## SpinalPanelApp
**Kind**: global class  
<a name="new_SpinalPanelApp_new"></a>

### new SpinalPanelApp()
Base interface like class of a panel

<a name="mount"></a>

## mount(option)
**Kind**: global function  

| Param | Type |
| --- | --- |
| option | <code>\*</code> | 


---
