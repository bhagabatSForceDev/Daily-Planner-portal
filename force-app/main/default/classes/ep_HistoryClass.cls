public without sharing class ep_HistoryClass {
    
    public class InfoCls{
        @AuraEnabled public String Id;
        @AuraEnabled public String Name;
        @AuraEnabled public String Subject;
        @AuraEnabled public Boolean Important;
        @AuraEnabled public String Session;
        @AuraEnabled public Double Value;
        @AuraEnabled public String Description;
    }

@AuraEnabled(cacheable=true)
    public static List<InfoCls> getDateSpecTasks(String dateSelected){
        Date sampDate=Date.valueOf(dateSelected);
        List<Daily_Task__c> dList= new List<Daily_Task__c>();
        if(dateSelected==''){
             dList= [SELECT Id,Name,Subject__c,Completed__c,Description__c,Important__c,Scheduled_Time__c,Test_Time__c,newTestTime__c,Scheduled_Date__c,Session__c,Value__c
                                    FROM Daily_Task__c WHERE Scheduled_Date__c =: Date.today() OR isRecurring__c= True ORDER BY Session__c];
        }
        else{
             dList= [SELECT Id,Name,Subject__c,Completed__c,Description__c,Important__c,Scheduled_Time__c,Test_Time__c,newTestTime__c,Scheduled_Date__c,Session__c,Value__c
                                    FROM Daily_Task__c WHERE Scheduled_Date__c =: sampDate OR isRecurring__c= True ORDER BY Session__c];
        }
        
        List<InfoCls> infList= new List<InfoCls>();
        for(Daily_Task__c d:dList){
            InfoCls i= new InfoCls();
            i.Name=d.Name;
            i.Subject=d.Subject__c;
            i.Important=d.Important__c;
            i.Session=d.Session__c;
            i.Value=d.Value__c;
            i.Id=d.Id;
            i.Description=d.Description__c;
            infList.add(i);
        }
        return infList;
    }
    
    
 @AuraEnabled(cacheable=true)
    public static List<History__c> getHistoryElements(List<String> categoryList, Decimal fromDate, Decimal toDate){
     
    List<History__c> histList= new List<History__c>();    
    
    String category='';
        for(String singleCat:categoryList){
            category=category+';'+singleCat;
        }
    String finalQuery='SELECT Id,Name,Category__c,Year__c,Description__c FROM History__c WHERE ';    
    String dateAdd='Year__c <= '+toDate+' AND Year__c >= '+fromDate;
    String categAdd= '(\''+category+'\')'; 
       
    finalQuery=finalQuery+dateAdd+'AND Category__c includes '+categAdd;
     try{   
    histList=Database.query(finalQuery); 
        } 
        Catch(Exception e){
            system.debug('No Records');
        }
    return histList;    
    }  
    
    
 @AuraEnabled(cacheable=true)
    public static List<Daily_Task__c> getDailyTasks(Date d){
     
    List<Daily_Task__c> taskList= new List<Daily_Task__c>();    
if(d!=null){
        taskList=[SELECT Id,Name,Subject__c,Completed__c,Description__c,Important__c,Scheduled_Time__c,Test_Time__c,newTestTime__c,Scheduled_Date__c,Session__c,Value__c,isRecurring__c FROM Daily_Task__c WHERE Scheduled_Date__c =: d  OR isRecurring__c=true];
     
    }
    else{
        taskList=[SELECT Id,Name,Subject__c,Completed__c,Description__c,Important__c,Scheduled_Time__c,Test_Time__c,newTestTime__c,Scheduled_Date__c,Session__c,Value__c,isRecurring__c FROM Daily_Task__c WHERE Scheduled_Date__c =: Date.today() OR isRecurring__c=true];
     
    }   
    return taskList;    
    }
    
 @AuraEnabled
    public static void changeTaskStatus(String recordId){
        Daily_Task__c samp= [SELECT Id, Completed__c FROM Daily_Task__c WHERE Id=:recordId];
        if (samp.Completed__c){
            samp.Completed__c=false;
        }
        else{
            samp.Completed__c=true;
        }
        Update samp;
    }
    
 @AuraEnabled
    public static void deletePrevTasks(){
        try{
        List<Daily_Task__c> samp= [SELECT Id, Completed__c FROM Daily_Task__c WHERE Scheduled_Date__c <: Date.today()];
        Delete samp;
        }
        Catch (Exception e){
            system.debug('public static void deletePrevTasks()');
        }
    }   
    
      
 @AuraEnabled
    public static void deleteOneTask(Id recId){
        try{
        Daily_Task__c samp= [SELECT Id, Completed__c FROM Daily_Task__c WHERE Id=:recId];
        Delete samp;
        }
        Catch (Exception e){
            system.debug('public static void deleteOneTask(Id recId)');
        }
    }    
    
}