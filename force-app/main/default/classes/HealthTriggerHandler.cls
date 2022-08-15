public class HealthTriggerHandler {
    public void handleInsert(List<Health__c> healthList){
    List<Health__c> allHealth=[SELECT Id,Date__c,recordTypeid,Type__c FROM Health__c];
    Map<Id,String> recNameMap= new Map<Id, String>();
    List<RecordType> recTypeList=[SELECT Id,Name FROM RecordType WHERE SObjectType='Health__c'];
        for(RecordType rec: recTypeList){
           recNameMap.put(rec.Id,rec.Name); 
        }    
        for(Health__c h:healthList){
            Decimal daysBetween=1000;
            Boolean firstRecord=true;
            for(Health__c all:allHealth){
                if(h.Id!=all.Id && all.recordTypeid==h.recordTypeId){
                    firstRecord=false;
                    if(Math.abs(h.Date__c.daysBetween(all.Date__c))<daysBetween){
                        daysBetween=Math.abs(h.Date__c.daysBetween(all.Date__c));
                    }
                }
            }
            if(firstRecord){
                h.Days_since_last__c=h.Date__c.daysBetween(Date.today());
            }else{ 
            	h.Days_since_last__c=daysBetween;
            }
            h.Name=recNameMap.get(h.RecordTypeId)+'-'+h.Date__c.format();
        }
    }
    
    public void handleUpdate(Map<Id,Health__c> oldMap, Map<Id,Health__c> newMap){
        
    }
}