public without sharing class WellbeingManager {

    @AuraEnabled(cacheable=true)
    public static RankInfo getRankInfo(){
        Health__c info=[SELECT Id,Date__c,RecordType.Name,Days_since_last__c FROM Health__c WHERE RecordType.Name='Ming' ORDER BY Date__c DESC LIMIT 1];
        Integer rankScore=Integer.valueOf(info.Date__c.daysBetween(Date.today())/7);
        system.debug('Score='+rankScore);
        Ranks__mdt rank=[SELECT Id,MasterLabel,Score__c,Url__c,Message__c FROM Ranks__mdt WHERE Score__c=:rankScore LIMIT 1];
        RankInfo msg= new RankInfo();
        msg.rank=rank;
        msg.since=info.Date__c.daysBetween(Date.today());
        return msg;
    }
    
    public class RankInfo{
        @AuraEnabled public Ranks__mdt rank{get;set;}
        @AuraEnabled public Integer since{get;set;}
    }
}