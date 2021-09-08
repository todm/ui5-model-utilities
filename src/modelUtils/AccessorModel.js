sap.ui.define(["sap/base/Log", "sap/ui/model/json/JSONModel"], function(Log, JSONModel) {
    return {
        /**
         * Creates a new JSON Model with accessors
         * @param {object} data - The data of the model
         * @param {string} [prefix=""] - Prefix of the the properties that will get accessors 
         * @returns {sap.ui.model.json.JSONModel}
         */
        create: function(data, prefix) {
            var model = new JSONModel(data);
            return this.fromModel(model, prefix);
        },

        /**
         * Adds accessors to a model
         * @param {sap.ui.model.Model} model - The model that will be changed
         * @param {string} prefix - Prefix of the the properties that will get accessors
         * @returns {sap.ui.model.Model}
         */
        fromModel: function(model, prefix) {
            if(prefix === undefined) prefix = "";
            var object = model.getObject("/");
            Object.keys(object).forEach(function(key) {
                if(model[prefix + key] !== undefined) return Log.warning(
                    "Protected Key",
                    "The key '" + prefix + key + "' is already defined on the model. It will not be redefined. Use a diffrent key or change the prefix.",
                    "modelUtils/AccessorModel.fromModel"
                );
                Object.defineProperty(model, prefix + key, {
                    get: function() {
                        return model.getProperty("/" + key);
                    },
                    set: function(val) {
                        return model.setProperty("/" + key, val);
                    }
                })
            });

            return model;
        }
    }
});