({
	handleClick : function(component, event, helper) {
		var flow = component.find("flowId");
        // In that component, start your flow. Reference the flow's Unique Name.
        //flow.startFlow("Insert_Daily_Tasks");
        component.set("v.isOpen", true);
        
	},
    
    closeModel : function(component, event, helper){
        component.set("v.isOpen", false);
    }
})