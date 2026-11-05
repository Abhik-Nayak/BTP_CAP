sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/demo/requestsui/test/integration/pages/RequestsList.gen",
	"com/demo/requestsui/test/integration/pages/RequestsObjectPage.gen"
], function (JourneyRunner, RequestsListGenerated, RequestsObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/demo/requestsui') + '/test/flp.html#app-preview',
        pages: {
			onTheRequestsListGenerated: RequestsListGenerated,
			onTheRequestsObjectPageGenerated: RequestsObjectPageGenerated
        },
        async: true
    });

    return runner;
});

