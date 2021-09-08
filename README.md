# UI5 Model Utilities

Adds utilies for UI5 Models

- **Accessor Models** lets you access the model properties directly as object properties without having to use `model.getProperty()` and `model.setProperty()`.

- **ClassModels** lets you add a model to your controller that will link to the attributes of your controller.

# Installation

Add the library to your project via the git url

```sh
npm i -S git+https://github.com/todm/ui5-model-utilities.git
```

Add the package as a ui5 dependency in `package.json`:

```yaml
#...
"ui5": {
    "dependencies": [
        #...
        "ui5-model-utilities"
    ]
}
```

# Usage

You can import the modules in your Controllers via the `modelUtils` namespace.

```js
sap.ui.define([
    "modelUtils/AccessorModel",
    "modelUtils/ClassModel"
], function(AccessorModel, ClassModel) {
    //...
});
```


## Accessor Model

The accessor model adds js accessors to your model via Object.defineProperty. You therefore don't have to use `model.getProperty()` and `model.setProperty()` anymore. The Properties can directly be accessed on the model object. Properties that are already on the model object will not be changed. You can add a prefix wich will be added to each generated property to avoid these collisions.

```javascript
this.model = AccessorModel.create({
    counter: 0
});
this.getView().setModel(this.model, "view");
// ...
this.model.counter++;
```

You can also add accessors to an existing model.

```javascript
// model will have the same reference as existingModel
var model = AccessorModel.fromModel(existingModel);
```

### Functions
```ts
AccessorModel.create(data: Object, prefix: string = ""): JSONModel;
AccessorModel.fromModel(oldModel: Model, prefix: string = ""): Model;
```

## Class Model

The class model will create a model for your controller and set it to the view. The attributes of the controller will become properties in the created model.

By default only attributes with a "$" prefix will be added to prevent unwanted data from cluttering up the model. The model will be available under the name "class" or by your specified model name.

You can wrap your Controller with the ClassModel function

```javascript
var myController = Controller.extend("...", {
    // This attribute will be part of the class model
    $count: 0,

    // This attribute WON'T be part of the model
    text: "Hello World", 

    onClick: function() {
        // Accessing the attribute will access the class model instead
        this.$count++; 
    }
});
// Wrapped with the classmodel decorator
return ClassModel()(myController);
```

Or use as a decorator if your pipeline allows it

```javascript
@ClassModel()
export default class MyController extends Controller {
    $count = 0;
    onClick() {
        $count++;
    }
}
```

You can then access your class attributes as properties of the class model:

```xml
<Text text="{class>/$count}"/>
```

You can also specify change listeners to the properties by adding methods to your controller that follow the naming scheme "_on[propertyName]Change()_".The first letter of your property will be capitalized if possible (this only applies if you change the default prefix as '$' won't be capitalized).

```javascript
var myController = Controller.extend("...", {
  $property: "",

  on$propertyChange: function () {
    // Will be fired when $property changes
  },
});
```

The class model will be created after the `onInit` method. That way attributes created there will be part of the model. If you need access to the class model you can define the method `onAfterClassModelInit` in your controller wich will get called after the model was initialized and set to the controller.

### Functions
```ts
ClassModel(prefix: string = "$", modelName: string = "class"): Function;
```