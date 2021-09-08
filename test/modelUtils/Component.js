sap.ui.define([
    "sap/ui/core/UIComponent"
], function(UIComponent) {
    return UIComponent.extend("test.Component", {
        metadata: {
			manifest: "json"
		},

        init: function() {
            UIComponent.prototype.init.apply(this, arguments);
        }
    });
});