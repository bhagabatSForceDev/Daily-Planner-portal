public without sharing class ToDoController {
    
    @AuraEnabled(cacheable=true)
    public static List<To_Do_Item__c> getAllItems(Id listId){
        List<To_Do_Item__c> allItems=[SELECT Id,To_Do_List__c,Summary__c,Parent_Item__c,Is_Complete__c,Type__c
        FROM To_Do_Item__c WHERE To_Do_List__c=: listId ORDER BY CreatedDate ASC];
        system.debug('allItems->'+allItems);

        List<To_Do_Item__c> l1ItemList= new List<To_Do_Item__c>();
        Map<Id,List<To_Do_Item__c>> childMap= new Map<Id,List<To_Do_Item__c>>();
        for(To_Do_Item__c td: allItems){
            if(td.Type__c=='Lvl1'){
                l1ItemList.add(td);
                System.debug('L1 Add>>'+td);
            }else{
                //childMap.add();
                if(childMap.get(td.Parent_Item__c)==null){
                    system.debug('In null');
                    List<To_Do_Item__c> tdList= new List<To_Do_Item__c>();
                    tdList.add(td);
                    System.debug('tdList Add>>'+td);
                    childMap.put(td.Parent_Item__c,tdList);
                    system.debug('childMap->'+childMap);
                }else{
                    system.debug('In Else');
                    List<To_Do_Item__c> tdList=childMap.get(td.Parent_Item__c);
                    tdList.add(td);
                    System.debug('tdList Add>>'+td);
                    childMap.put(td.Parent_Item__c,tdList);
                    system.debug('childMap->'+childMap);
                }
            }
        }

        List<To_Do_Item__c> finalList= new List<To_Do_Item__c>();

        for(To_Do_Item__c td: l1ItemList){
            finalList.add(td);
            system.debug('Added->'+td); 
            if(childMap.get(td.id)!=null){
            for(To_Do_Item__c t2: childMap.get(td.id)){
                finalList.add(t2);
                system.debug('Added->'+t2);
                if(childMap.get(t2.id)!=null){
                    finalList.addAll(childMap.get(t2.id));
                    system.debug('Added->'+childMap.get(t2.id));
                }
            }
        }
        }

        return finalList;

    }

    @AuraEnabled(cacheable=true)
    public static List<To_Do_List__c> searchList(String searchText, Date searchDate){
        String query='SELECT Id,Name,List_Date__c FROM To_Do_List__c';
        String qText='%'+searchText+'%';
        Date myDate = searchDate!=null?Date.newInstance(searchDate.year(),searchDate.month(), searchDate.day()):null;
        system.debug('myDate'+myDate);
		system.debug(','+String.isNotBlank(searchText)+',');
        if(searchText!=null && searchText!='' && String.isNotBlank(searchText) && searchDate!=null){
            query+=' WHERE Name LIKE :qText'+' AND List_Date__c=: myDate';
        }else if(searchText!=null && String.isNotBlank(searchText) && searchDate==null){
            query+=' WHERE Name LIKE :qText';
        }else if(searchText=='' && searchDate!=null){
            query+=' WHERE List_Date__c= :myDate';
        }
        
        query+=' ORDER BY LastModifiedDate DESC LIMIT 10';
		system.debug('Query->'+query);
        return Database.query(query);
    }

    @AuraEnabled
    public static void pinList(String recId){
        try {
            List<To_Do_List__c> allList= new List<To_Do_List__c>();
            List<To_Do_List__c> tcList=[SELECT Id,Name,List_Date__c,Is_Pinned__c FROM To_Do_List__c WHERE Is_Pinned__c=true];
            for(To_Do_List__c t: tcList){
                t.Is_Pinned__c=false;
                allList.add(t);
            }
            Update allList;
            To_Do_List__c tc=[SELECT Id,Name,List_Date__c,Is_Pinned__c FROM To_Do_List__c WHERE Id=: recId LIMIT 1];
            tc.Is_Pinned__c=true;
            Update tc;

            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static To_Do_List__c returnPinnedList(){
		To_Do_List__c tl=[SELECT Id,Name,List_Date__c FROM To_Do_List__c WHERE Is_Pinned__c=true LIMIT 1];
        return tl;
    }

    @AuraEnabled
    public static void createList(String listName, Date listDate){
        List<To_Do_List__c> allExisiting=[SELECT Id,Is_Pinned__c FROM To_Do_List__c WHERE Is_Pinned__c=true];
        for(To_Do_List__c td:allExisiting){
            td.Is_Pinned__c=false;
        }
        update allExisiting;
        To_Do_List__c tdl= new To_Do_List__c(Name=(listName + ' ('+listDate.format()+')'),List_Date__c=listDate,Is_Pinned__c=true);
        Insert tdl;
    }

    @AuraEnabled
    public static void createItem(String lvl, String summText, Id parentId, Id listId){
        To_Do_Item__c tdi= new To_Do_Item__c(To_Do_List__c=listId,Summary__c=summText,Parent_Item__c=parentId
        ,Type__c=lvl);
        Insert tdi;
    }

    @AuraEnabled
    public static void modifyItem(Id recId, String summText){
        To_Do_Item__c tdi=[SELECT Id,Summary__c FROM To_Do_Item__c WHERE Id=: recId LIMIT 1]; 
        tdi.Summary__c=summText;
        Update tdi;
    }

    @AuraEnabled
    public static void checkItem(Id listId){
        To_Do_Item__c tdi=[SELECT Id, Is_Complete__c FROM To_Do_Item__c WHERE Id=: listId LIMIT 1];
        tdi.Is_Complete__c= tdi.Is_Complete__c==true?false:true;

        Update tdi;
    }

    @AuraEnabled
    public static void deleteItem(Id itemId){
        To_Do_Item__c tdi=[SELECT Id, Is_Complete__c FROM To_Do_Item__c WHERE Id=: itemId LIMIT 1];

        delete tdi;
    }
}