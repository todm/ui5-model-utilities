sap.ui.define(['jquery.sap.global', 'sap/ui/core/library'], function(jQuery) {
	sap.ui.getCore().initLibrary({
		name : "modelUtils",
		version: "${version}",
		dependencies : ["sap.ui.core"],
		types: [],
		interfaces: [],
		controls: [],
		elements: [
			"modelUtils.AccessorModel",
			"modelUtils.ClassModel"
		]
	});

	return modelUtils;

}, /* bExport= */ false);