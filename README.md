# spinal-env-viewer-panel-manager-service

spinal-env-viewer-panel-manager-service is a service to create and register panels for the an spinal organ browser viewer

## Installation

```sh
npm i --save https://github.com/spinalcom/spinal-env-viewer-panel-manager-service
```

## Usage

to do...

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
<dt><a href="#createExtention">createExtention(option)</a> ⇒</dt>
<dd><p>factory function to create a dynamic class that extends the <code>SpinalPanelApp</code> class</p>
<pre><code class="language-javascript">{
  name: &quot;extention_name&quot;,
  vueMountComponent: Vue.extend(aVueCompoment),
  toolbar: {
    icon: &quot;done&quot;,
    label: &quot;testLabel&quot;,
    subToolbarName: &quot;spinalcom&quot;
  },
  panel: {
    title: &quot;Spinalcom Panel&quot;,
    classname: &quot;spinal-pannel&quot;,
    closeBehaviour: &quot;hide&quot;
  },
  style: {
    height: &quot;calc(100% - 45px)&quot;,
    overflowY: &quot;auto&quot;
  }
}
</code></pre>
</dd>
<dt><a href="#registerExtention">registerExtention(name, classExtention)</a></dt>
<dd><p>Method to register an extention to the viewer and the forge viewer</p>
</dd>
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

<a name="createExtention"></a>

## createExtention(option) ⇒
factory function to create a dynamic class that extends the `SpinalPanelApp` class
```js
{
  name: "extention_name",
  vueMountComponent: Vue.extend(aVueCompoment),
  toolbar: {
    icon: "done",
    label: "testLabel",
    subToolbarName: "spinalcom"
  },
  panel: {
    title: "Spinalcom Panel",
    classname: "spinal-pannel",
    closeBehaviour: "hide"
  },
  style: {
    height: "calc(100% - 45px)",
    overflowY: "auto"
  }
}
```

**Kind**: global function  
**Returns**: SpinalForgeExtention  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>object</code> | see description |


* [createExtention(option)](#createExtention) ⇒
    * [~SpinalForgeExtention](#createExtention..SpinalForgeExtention) ⇐ [<code>SpinalPanelApp</code>](#SpinalPanelApp)
        * [.load()](#createExtention..SpinalForgeExtention+load)
        * [.unload()](#createExtention..SpinalForgeExtention+unload)
        * [.openPanel(option)](#createExtention..SpinalForgeExtention+openPanel)
        * [.closePanel(option)](#createExtention..SpinalForgeExtention+closePanel)
        * [.tooglePanel(option)](#createExtention..SpinalForgeExtention+tooglePanel)

<a name="createExtention..SpinalForgeExtention"></a>

### createExtention~SpinalForgeExtention ⇐ [<code>SpinalPanelApp</code>](#SpinalPanelApp)
class returned by createExtention
this extention is also registered in autodesk viweer

**Kind**: inner class of [<code>createExtention</code>](#createExtention)  
**Extends**: [<code>SpinalPanelApp</code>](#SpinalPanelApp)  

* [~SpinalForgeExtention](#createExtention..SpinalForgeExtention) ⇐ [<code>SpinalPanelApp</code>](#SpinalPanelApp)
    * [.load()](#createExtention..SpinalForgeExtention+load)
    * [.unload()](#createExtention..SpinalForgeExtention+unload)
    * [.openPanel(option)](#createExtention..SpinalForgeExtention+openPanel)
    * [.closePanel(option)](#createExtention..SpinalForgeExtention+closePanel)
    * [.tooglePanel(option)](#createExtention..SpinalForgeExtention+tooglePanel)

<a name="createExtention..SpinalForgeExtention+load"></a>

#### spinalForgeExtention.load()
method called on load of the extention (managed by the autodesk viewer)
the method create a button in the toolbar if put in the option of `createExtention`.

**Kind**: instance method of [<code>SpinalForgeExtention</code>](#createExtention..SpinalForgeExtention)  
<a name="createExtention..SpinalForgeExtention+unload"></a>

#### spinalForgeExtention.unload()
method called when the viewer unload of the extention
(managed by the autodesk viewer)

**Kind**: instance method of [<code>SpinalForgeExtention</code>](#createExtention..SpinalForgeExtention)  
<a name="createExtention..SpinalForgeExtention+openPanel"></a>

#### spinalForgeExtention.openPanel(option)
**Kind**: instance method of [<code>SpinalForgeExtention</code>](#createExtention..SpinalForgeExtention)  

| Param | Type |
| --- | --- |
| option | <code>\*</code> | 

<a name="createExtention..SpinalForgeExtention+closePanel"></a>

#### spinalForgeExtention.closePanel(option)
**Kind**: instance method of [<code>SpinalForgeExtention</code>](#createExtention..SpinalForgeExtention)  

| Param | Type |
| --- | --- |
| option | <code>\*</code> | 

<a name="createExtention..SpinalForgeExtention+tooglePanel"></a>

#### spinalForgeExtention.tooglePanel(option)
**Kind**: instance method of [<code>SpinalForgeExtention</code>](#createExtention..SpinalForgeExtention)  

| Param | Type |
| --- | --- |
| option | <code>\*</code> | 

<a name="registerExtention"></a>

## registerExtention(name, classExtention)
Method to register an extention to the viewer and the forge viewer

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the extention |
| classExtention | <code>\*</code> | an extention created by `createExtention` |


---
