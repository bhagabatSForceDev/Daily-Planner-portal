public with sharing class ep_RevisionClass {
  
    @AuraEnabled(cacheable=true)
    public static List<revWrap> getRevisionQuestions(String count){
        List<revWrap> finalList=new List<revWrap>();
        Date todayDate=Date.today();
        List<Revision__c> revlist= new List<Revision__c>();
        if(count!='All'){
        revlist=[SELECT Id, Question__c, Scheduled_Date__c, Date2__c, Date3__c, Date4__c,Reference__c FROM Revision__c 
                                   WHERE Scheduled_Date__c=:todayDate 
                                   OR Date2__c=:todayDate 
                                   OR Date3__c=:todayDate 
                                   OR Date4__c=:todayDate ORDER BY CreatedDate ASC];
        }
        else{
            revlist=[SELECT Id, Question__c, Scheduled_Date__c, Date2__c, Date3__c, Date4__c,Reference__c FROM Revision__c
            ORDER BY CreatedDate ASC];    
                                }
        //system.debug('revlist---- '+finalList);
        for(Revision__c r:revlist){
            revWrap samp= new revWrap();
            samp.Question=r.Question__c;
            samp.Reference=r.Reference__c;
            finalList.add(samp);
        }
        system.debug('revlist---- '+finalList);
        return finalList;
    }
    
  @AuraEnabled
    public static void addRevisionQuestion(String ques, String ref){
        List<Revision__c> revLists=new List<Revision__c>();
        Date sDate=Date.today();
        Revision__c rev= new Revision__c();
        rev.Question__c= ques;
        rev.Scheduled_Date__c=sDate;
        rev.Reference__c=ref;
        revLists.add(rev);
        Insert revLists;
    }
    
    
     public class revWrap{
        @AuraEnabled public String Question;
        @AuraEnabled public String Reference;
    }
}