public without sharing class ep_questionAnswerClass {
 @AuraEnabled(cacheable=true)
    public static List<quesWrap> getQuestionList(){
        List<Query__c> query=[SELECT Id,Question__c,Answer__c FROM Query__c];
        List<quesWrap> quesList= new List<quesWrap>();
        for(Query__c q:query){
        quesWrap qs= new quesWrap();
        qs.Question=q.Question__c;
        qs.Answer=q.Answer__c;
        quesList.add(qs);
        }
       
        return quesList;
    }
    
    @AuraEnabled
    public static void saveQuestion(String ques,String ans,String recType){
        system.debug(ques+ans+recType);
        List<Query__c> queryList= new List<Query__c>();
        Query__c q=new Query__c();
        q.Question__c=ques;
        q.Answer__c=ans;
        q.RecordTypeId=recType;
        queryList.add(q);
        insert queryList;
    }
    
   public class quesWrap{
    @AuraEnabled public String Question;
    @AuraEnabled public String Answer;
    }    
}