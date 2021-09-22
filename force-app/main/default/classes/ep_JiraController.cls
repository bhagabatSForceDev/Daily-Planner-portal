public without sharing class ep_JiraController {
    
    @AuraEnabled(cacheable=true)
    public static jiraWrap getJiraId(String jId){
        system.debug('Called');
        String finalString;
        Date toDate=Date.today();
        Integer days;
        List<Sprint__c> sprintList=[SELECT Id,Name FROM Sprint__c];
        jiraWrap retWrap= new jiraWrap();
        retWrap.sprintList=sprintList;
        if(jId=='null'){
            Sprint__c currSprint=[SELECT Id,Sprint_Date__c,Name FROM Sprint__c WHERE Sprint_Date__c>=:toDate ORDER BY Sprint_Date__c ASC LIMIT 1];
            List<Sprint_Element__c> elemList= [SELECT Id,Name,Status__c,Task_Name__c,Tag__c,Description__c,Priority__c FROM Sprint_Element__c WHERE Sprint__c=:currSprint.Id];    
            days=toDate.daysBetween(currSprint.Sprint_Date__c);
            finalString= currSprint.Id+'++'+currSprint.Name+'++'+days;
            retWrap.detailString=finalString;
            retWrap.elementList=elemList;
        }
        else{
            Sprint__c currSprint=[SELECT Id,Sprint_Date__c,Name FROM Sprint__c WHERE Id=:jId];
            List<Sprint_Element__c> elemList= [SELECT Id,Name,Status__c,Task_Name__c,Tag__c,Description__c,Priority__c FROM Sprint_Element__c WHERE Sprint__c=:currSprint.Id];    
            days=toDate.daysBetween(currSprint.Sprint_Date__c);
            finalString= currSprint.Id+'++'+currSprint.Name+'++'+days; 
            retWrap.detailString=finalString;  
            retWrap.elementList=elemList;   
        }
        return retWrap;
    }
    
    
    public class jiraWrap{
        @AuraEnabled public String detailString;
        @AuraEnabled public List<Sprint__c> sprintList;
        @AuraEnabled public List<Sprint_Element__c> elementList;
        
    }
}