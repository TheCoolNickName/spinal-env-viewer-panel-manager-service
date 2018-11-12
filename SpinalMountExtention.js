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
  if (!option.vueMountComponent) {
    throw new Error("mount : missing option vueMountComponent");
  }

  cfg.name = option.name || "SpinalMount";
  cfg.vueMountComponent = option.vueMountComponent;
  cfg.parentContainer = option.parentContainer || document.body;
  return cfg;
}

function getDialog() {
  if (!this.dialog) {
    this.dialog = document.createElement("div");
    const _compo = document.createElement("div");
    this.dialog.className = "spinal-modal-container";
    this.cfg.parentContainer.appendChild(this.dialog);
    this.dialog.appendChild(_compo);
    this.compoment = new this.cfg.vueMountComponent({
      propsData: {
        onFinised: this.onFinised.bind(this)
      }
    }).$mount(_compo);
  }
  return this.dialog;
}

module.exports = function(spinalPanelManagerService, SpinalPanelApp) {
  return {
    mount(option) {
      let cfg = configInit(option);
      const SpinalMount = class extends SpinalPanelApp {
        constructor() {
          super();
          this.cfg = cfg;
          this.dialog = null;
          this.compoment = null;
        }

        openPanel(opt) {
          getDialog.call(this);
          this.compoment.opened(opt);
        }
        closePanel(opt) {
          if (this.dialog !== null) {
            this.compoment.removed(opt);
            this.dialog.remove();
            this.dialog = null;
            this.compoment = null;
          }
        }

        tooglePanel(opt) {
          if (this.dialog !== null) {
            this.closePanel(opt);
          } else {
            this.openPanel(opt);
          }
        }

        /**
         * called when dialog closed by the dialog itself
         */
        onFinised(closeResult) {
          this.closePanel(closeResult);
        }
      };
      let SpinalMountInstance = new SpinalMount();
      spinalPanelManagerService.registerPanel(cfg.name, SpinalMountInstance);
    }
  };
};
