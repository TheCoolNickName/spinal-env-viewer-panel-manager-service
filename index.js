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

const G_root = typeof window == "undefined" ? global : window;
const SpinalPanelManagerService = require("./SpinalPanelManagerService");
const SpinalPanelApp = require("./SpinalPanelApp");

if (typeof G_root.spinal === "undefined") G_root.spinal = {};
if (typeof G_root.spinal.spinalPanelManagerService === "undefined")
  G_root.spinal.spinalPanelManagerService = new SpinalPanelManagerService();
const SpinalForgeExtention = require("./SpinalForgeExtention.js")(
  G_root.spinal.spinalPanelManagerService,
  SpinalPanelApp
);
const SpinalMountExtention = require("./SpinalMountExtention.js")(
  G_root.spinal.spinalPanelManagerService,
  SpinalPanelApp
);

module.exports = {
  spinalPanelManagerService: G_root.spinal.spinalPanelManagerService,
  SpinalPanelApp,
  SpinalForgeExtention,
  SpinalMountExtention,
  install(Vue) {
    Vue.prototype.$spinalPanelManagerService =
      G_root.spinal.spinalPanelManagerService;
  }
};
