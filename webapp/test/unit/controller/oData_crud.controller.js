/*global QUnit*/

sap.ui.define([
	"sbpworksphere/controller/oData_crud.controller"
], function (Controller) {
	"use strict";

	QUnit.module("oData_crud Controller");

	QUnit.test("I should test the oData_crud controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
