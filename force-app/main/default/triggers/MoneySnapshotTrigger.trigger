trigger MoneySnapshotTrigger on Money_Tracker__c (after update) {
List<Money_Tracker__c> insertedTrackers=[SELECT Id,Name,Amount__c,RecordTypeId FROM Money_Tracker__c WHERE Id IN: trigger.new];
List<Money_Snapshot__c> snapList= new List<Money_Snapshot__c>();    
    for(Money_Tracker__c mt:insertedTrackers){
        Money_Snapshot__c ms= new Money_Snapshot__c();
        ms.Amount__c=mt.Amount__c;
        ms.Money_Tracker__c=mt.Id;
        snapList.add(ms);
    }
Insert snapList;    
}