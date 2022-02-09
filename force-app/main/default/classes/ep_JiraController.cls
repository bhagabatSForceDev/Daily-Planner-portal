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

    @AuraEnabled(cacheable=true)
    public static List<Jira_Comment__c> getComments(String recId){
        List<Jira_Comment__c> commList= [SELECT Id, Sprint_Element__c,Comment_Body__c,Mod_Date__c FROM Jira_Comment__c WHERE Sprint_Element__c= :recId ORDER BY Mod_Date__c DESC];
        return commList;
    }

    @AuraEnabled
    public static void deleteElement(String recId){
        Sprint_Element__c el=[SELECT Id FROM Sprint_Element__c WHERE Id=: recId];
        delete el;
    }
    
    
    public class jiraWrap{
        @AuraEnabled public String detailString;
        @AuraEnabled public List<Sprint__c> sprintList;
        @AuraEnabled public List<Sprint_Element__c> elementList;
        
    }
}