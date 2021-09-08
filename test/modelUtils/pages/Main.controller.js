sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "modelUtils/AccessorModel",
    "modelUtils/ClassModel",
], function(Controller, JSONModel, AccessorModel, ClassModel) {
	"use strict";

	var c = Controller.extend("test.pages.Main", {
        $content: "Hello World",
        $changes: 0,
		onInit: function () {
            this.accessorModel = AccessorModel.create({
                counter: 0
            });
            this.getView().setModel(this.accessorModel, 'accessorModel');
		},

        onIncrement() {
            this.accessorModel.counter++;
        },

        on$contentChange() {
            this.$changes++;
        }
	});

    return ClassModel()(c)
});