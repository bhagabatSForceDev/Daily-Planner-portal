({
    handleMessage : function(component, event, helper) {
        console.log("EVENT RECEIVED"+JSON.stringify(event));
        console.log("EVENT PARAMS"+JSON.stringify(event.getParams()));
        if(event!=null && event.getParams()!=null){
            let param=event.getParams();
            
            if(param.popValue=="Add"){
            component.set("v.messageRec","True");    
            component.set("v.isTaskFlow","True");
            console.log("IN IF");
            }
            else if(param.popValue=="ElemAdd"){
             component.set("v.messageRec","True");   
             component.set("v.isElementFlow","True");
            console.log("IN IF ELEM"); 
            }
        }
    },
    
    closeModel : function(component, event, helper) {
        console.log("IN close modal");
        var payload = {popValue: "Refresh"};
        component.set("v.messageRec","false");
        component.find('sampleMessageChannel').publish(payload);
        
        
        console.log(component.get("v.messageRec"));
        
    },
    
    
})