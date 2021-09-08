sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {    
    /**
     * Decorator to enable class model
     * @param {string} [prefix="$"] - Prefix of properties that should be included in the model
     * @param {string} [modelName="class"] - Name of the model
     * @returns {Function} - The function that transforms the controller. Takes the controller as an argument and returns it
     */
    function ClassModel(prefix, modelName) {
        if (prefix === undefined) prefix = "$";
        if(modelName === undefined) modelName = "class";

        return function (target) {
            var onInit = target.prototype.onInit;
            var onInitArgs;
            target.prototype.onInit = function () {
                onInit.apply(this, arguments);
                onInitArgs = arguments;

                var allKeys = Object.keys(this).concat(Object.keys(this.__proto__));
                var data = {};
                allKeys.forEach(function (key) {
                    if (key.substr(0, prefix.length) !== prefix) return;
                    data[key] = this[key];
                }.bind(this));

                var model = new JSONModel(data);

                Object.keys(data).forEach(function (key) {
                    Object.defineProperty(this, key, {
                        get: function () {
                            return model.getProperty("/" + key);
                        },
                        set: function (val) {
                            return model.setProperty("/" + key, val);
                        }
                    });

                    var eventListener = "on"
                        + key.substr(0,1).toUpperCase() + key.substr(1)
                        + "Change";
                    if(typeof this[eventListener] !== "function") return;
                    model.bindProperty("/" + key).attachChange(function() {
                        this[eventListener].apply(this, arguments);
                    }.bind(this));
                }.bind(this));

                this.getView().setModel(model, modelName);
            }

            if(target.prototype.onAfterClassModelInit) {
                target.prototype.onAfterClassModelInit.apply(target, onInitArgs);
            }

            return target;
        }
    }

    return ClassModel;
});