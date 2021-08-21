({
	init : function(component, event, helper) {
		var flow = component.find("flowData");
        // In that component, start your flow. Reference the flow's API Name.
        flow.startFlow("Insert_Daily_Tasks");
	}
})