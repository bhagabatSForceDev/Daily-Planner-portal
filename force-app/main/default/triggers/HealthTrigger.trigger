trigger HealthTrigger on Health__c (before insert, before update) {
    HealthTriggerHandler handler = new HealthTriggerHandler();
    if(Trigger.isInsert || Trigger.isUpdate){
       handler.handleInsert(trigger.new); 
    }
    /*
    if(Trigger.isUpdate){
        handler.handleUpdate(trigger.oldMap,trigger.newMap);
    }*/
    
}