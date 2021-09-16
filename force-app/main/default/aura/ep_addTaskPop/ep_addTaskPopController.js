({
    handleMessage : function(component, event, helper) {
        if(event!=null && event.getParams()!=null){
            let param=event.getParams();
            console.log(JSON.stringify(params, null, "\t"));
        }
    }
})
