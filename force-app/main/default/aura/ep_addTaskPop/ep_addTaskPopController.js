({
    handleMessage : function(component, event, helper) {
        console.log("EVENT RECEIVED"+JSON.stringify(event));
        console.log("EVENT PARAMS"+JSON.stringify(event.getParams()));
        if(event!=null && event.getParams()!=null){
            let param=event.getParams();
            
            if(param.popValue=="Add"){
            component.set("v.messageRec","True");
            // component.set("v.isCommentFlow","False");
            // component.set("v.isElementFlow","False");    
            component.set("v.isTaskFlow","True");
            console.log("IN IF");
            }
            else if(param.popValue=="ElemAdd"){
             component.set("v.messageRec","True"); 
            //  component.set("v.isCommentFlow","False"); 
            //  component.set("v.isTaskFlow","False"); 
             component.set("v.isElementFlow","True");
            console.log("IN IF ELEM"); 
            }
            else if(param.popValue.startsWith("CommAdd")){
             let commString= param.popValue.split(';');
             console.log("commString "+commString[1]);
             component.set("v.passId",commString[1]);  
            //  component.set("v.isElementFlow","False"); 
            //  component.set("v.isTaskFlow","False");   
             component.set("v.isCommentFlow","True");
             component.set("v.messageRec","True");
             
            console.log("IN IF COMM"); 
            }
        }
    },
    
    closeModel : function(component, event, helper) {
        console.log("IN close modal");
        var payload = {popValue: "Refresh"};
        component.set("v.isElementFlow","false"); 
        component.set("v.isTaskFlow","false");
        component.set("v.isCommentFlow","false");
        component.set("v.messageRec","false");
        
        component.find('sampleMessageChannel').publish(payload);
        
        
        console.log(component.get("v.messageRec"));
        
    },
    
    
})