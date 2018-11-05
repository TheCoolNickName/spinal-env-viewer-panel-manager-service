/*
 * Copyright 2018 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */

function configInit(option) {
  const cfg = {};
  if (typeof option.toolbar !== "undefined")
    cfg.toolbar = {
      icon: option.toolbar.icon || "done",
      label: option.toolbar.label || "label",
      subToolbarName: option.toolbar.subToolbarName || "spinalcom"
    };
  if (typeof option.panel !== "undefined") {
    cfg.panel = {
      title: option.panel.title || "Spinalcom Panel",
      classname: option.panel.classname || "spinal-pannel",
      closeBehaviour: option.panel.closeBehaviour || "hide"
    };
    if (typeof option.panel.style !== "undefined") {
      cfg.style = {
        height: option.panel.style.height || "calc(100% - 45px)",
        overflowY: option.panel.style.overflowY || "auto"
      };
      Object.assign(cfg.panel.style, option.panel.style);
    }
  }
  cfg.name = option.name || "spinalExtention";
  cfg.vueMountComponent = option.vueMountComponent;
  return cfg;
}

function onToolbarCreated() {
  this.viewer.removeEventListener(
    window.av.TOOLBAR_CREATED_EVENT,
    this.onToolbarCreatedBinded
  );
  this.onToolbarCreatedBinded = null;
  createToolbar.call(this);
}

function createToolbar() {
  this.toolbarButton = new window.Autodesk.Viewing.UI.Button(
    this.cfg.toolbar.label
  );
  this.toolbarButton.onClick = () => {
    this.tooglePanel();
  };
  var icon = this.toolbarButton.container.firstChild;
  icon.className = "adsk-button-icon md-icon md-icon-font md-theme-default";
  icon.innerHTML = this.cfg.toolbar.icon;
  this.toolbarButton.setToolTip(this.cfg.toolbar.label);
  this.subToolbar = this.viewer.toolbar.getControl(
    this.cfg.toolbar.subToolbarName
  );
  if (!this.subToolbar) {
    this.subToolbar = new window.Autodesk.Viewing.UI.ControlGroup(
      this.cfg.toolbar.subToolbarName
    );
    this.viewer.toolbar.addControl(this.subToolbar);
  }
  this.subToolbar.addControl(this.toolbarButton);
}

function getPanel() {
  if (this.panel === null) {
    this.panel = new window.PanelClass(this.viewer, this.cfg.panel.title);
    var _container = document.createElement("div");
    _container.className =
      this.panel.container.id + "-panelcontainer " + this.cfg.panel.classname;
    Object.assign(_container.style, this.cfg.panel.style);
    this.panel.container.appendChild(_container);
    if (this.cfg.vueMountComponent) {
      this.compoment = new this.cfg.vueMountComponent().$mount(_container);
    }
  }
  return this.panel;
}

/**
 *
 *
 * @param {*} spinalPanelManagerService
 * @param {*} SpinalPanelApp
 * @returns {object} { createExtention, registerExtention }
 */
module.exports = function(spinalPanelManagerService, SpinalPanelApp) {
  return {
    /**
     * factory function to create a dynamic class that extends the `SpinalPanelApp` class
     *```js
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
     * ```
     * @param {object} option see description
     * @returns SpinalForgeExtention
     */
    createExtention(option) {
      const cfg = configInit(option);
      /**
       * class returned by createExtention
       * this extention is also registered in autodesk viweer
       * @extends SpinalPanelApp
       */
      const SpinalForgeExtention = class extends SpinalPanelApp {
        constructor(viewer, options) {
          super();
          window.Autodesk.Viewing.Extension.call(this, viewer, options);
          this.viewer = viewer;
          this.panel = null;
          this.cfg = cfg;
          spinalPanelManagerService.registerPanel(cfg.name, this);
        }
        /**
         * method called on load of the extention (managed by the autodesk viewer)
         * the method create a button in the toolbar if put in the option of `createExtention`.
         */
        load() {
          if (typeof cfg.toolbar !== "undefined") {
            // add toolbar
            if (this.viewer.toolbar) {
              createToolbar.call(this);
            } else {
              this.onToolbarCreatedBinded = onToolbarCreated.bind(this);
              this.viewer.addEventListener(
                window.av.TOOLBAR_CREATED_EVENT,
                this.onToolbarCreatedBinded
              );
            }
          }
        }
        /**
         * method called when the viewer unload of the extention
         * (managed by the autodesk viewer)
         */
        unload() {
          if (typeof cfg.toolbar !== "undefined") {
            this.viewer.subToolbar.removeControl(this.toolbarButton);
          }
        }

        /**
         *
         * @param {*} option
         */
        openPanel(option) {
          const panel = getPanel.call(this);
          panel.setVisible(true);
          try {
            this.compoment.opened(option, this.viewer);
          } catch (e) {
            console.error(e);
          }
        }
        /**
         *
         *
         * @param {*} option
         */
        closePanel(option) {
          this.panel.setVisible(false);
          if (option.panel.closeBehaviour !== "hide") {
            this.panel.container.remove();
            this.panel = null;
            try {
              this.compoment.removed(option, this.viewer);
            } catch (e) {
              console.error(e);
            }
          } else {
            try {
              this.compoment.closed(option, this.viewer);
            } catch (e) {
              console.error(e);
            }
          }
        }
        /**
         *
         *
         * @param {*} option
         */
        tooglePanel(option) {
          if (this.panel !== null) {
            this.openPanel(option);
          } else this.closePanel(option);
        }
      };
      return SpinalForgeExtention;
    },

    /**
     * Method to register an extention to the viewer and the forge viewer
     * @param {string} name name of the extention
     * @param {*} classExtention an extention created by `createExtention`
     */
    registerExtention(name, classExtention) {
      // register to forge
      window.Autodesk.Viewing.theExtensionManager.registerExtension(
        name,
        classExtention
      );
      // register to viewer
      window.spinal.ForgeExtentionManager.addExtention(name);
    }
  };
};