({
	init : function(component, event, helper) {
		var flow = component.find("flowData");
        // In that component, start your flow. Reference the flow's API Name.
        console.log("COMM FLOW CALLER COMP"+component.get("v.passedId"));
        const inputVariables = [
            {
                name : "recId",
                type : "String",
                value: component.get("v.passedId")
            }
        ];

        flow.startFlow("Jira_Comment_Flow",inputVariables);
	}
})