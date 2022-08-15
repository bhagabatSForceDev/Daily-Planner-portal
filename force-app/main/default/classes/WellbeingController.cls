public without sharing class WellbeingController {
    public static string weightRecTypeId;
    public static string foodRecTypeId;
    public static string mingRecTypeId;
    
    static {
        List<RecordType> recTypesList=[SELECT Id,DeveloperName FROM RecordType WHERE SObjectType='Health__c'];
        for(RecordType rec: recTypesList){
            if(rec.DeveloperName=='Ming'){
                mingRecTypeId=rec.Id;
            }else if(rec.DeveloperName=='Fast_Food'){
                foodRecTypeId=rec.Id;
            }else if(rec.DeveloperName=='Weight'){
                weightRecTypeId=rec.Id;
            }
        }
    }

    @AuraEnabled
    public static void createWeight(Decimal weight, Date d){
        Health__c newWt= new Health__c(Name='Def',RecordTypeId=weightRecTypeId,Weight__c=weight,Date__c=d);
        Insert newWt;
    }

    @AuraEnabled
    public static void createFastFood(Decimal ordAmt, String subject, Date d){
        try {
        Health__c newOrd= new Health__c(Name='Def',RecordTypeId=foodRecTypeId,
        Subject__c=subject,Date__c=d,Amount__c=ordAmt,Type__c='Ordered');
        Insert newOrd;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static void createMing(Date d){
        try {
        Health__c newOrd= new Health__c(Name='Def',RecordTypeId=mingRecTypeId,Date__c=d);
        Insert newOrd;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}
