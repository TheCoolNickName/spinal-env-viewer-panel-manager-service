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

/**
 *  Containter like service to register and get applications relative to a hookname
 *
 * @property {object} panels key = panelName, value = an instance of SpinalPanelApp
 * @class SpinalPanelManagerService
 */
class SpinalPanelManagerService {
  /**
   *Creates an instance of SpinalPanelManagerService.
   * @memberof SpinalPanelManagerService
   */
  constructor() {
    this.panels = {};
  }

  /**
   * method to register an Panel Application
   *
   * @param {string} panelName the name of the panel
   * @param {SpinalPanelApp} spinalPanelApp the application
   * @memberof SpinalPanelManagerService
   */
  registerPanel(panelName, spinalPanelApp) {
    this.panels[panelName] = spinalPanelApp;
  }

  /**
   *
   *
   * @param {*} panelName
   * @param {*} option
   * @returns {bool}
   * @memberof SpinalPanelManagerService
   */
  openPanel(panelName, option) {
    if (typeof this.panels[panelName] !== "undefined")
      return this.panels[panelName].openPanel(option);
    return false;
  }
  /**
   *
   *
   * @param {*} panelName
   * @param {*} option
   * @returns {bool}
   * @memberof SpinalPanelManagerService
   */
  closePanel(panelName, option) {
    if (typeof this.panels[panelName] !== "undefined")
      return this.panels[panelName].closePanel(option);
    return false;
  }
  /**
   *
   *
   * @param {*} panelName
   * @param {*} option
   * @returns {bool}
   * @memberof SpinalPanelManagerService
   */
  tooglePanel(panelName, option) {
    if (typeof this.panels[panelName] !== "undefined")
      return this.panels[panelName].tooglePanel(option);
    return false;
  }
}

module.exports = SpinalPanelManagerService;
