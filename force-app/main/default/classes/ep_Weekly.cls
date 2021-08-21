public class ep_Weekly {

    @AuraEnabled(cacheable=true)
    public static List<Weekly__c> weekList(){
        
		List<Weekly__c> wList=[SELECT Id,Name,Category__c,Value__c FROM Weekly__c WHERE CreatedDate >:(Date.today()-7)];        
        
        return wList;
    }
    
}