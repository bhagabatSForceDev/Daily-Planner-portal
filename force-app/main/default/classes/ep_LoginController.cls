public without sharing class ep_LoginController {
    public ep_LoginController() {

    }
    @AuraEnabled
    public static String login(String username, String pwd){
        String commUrl=System.Label.CommUrl;
        system.debug('username: '+username+' pwd: '+pwd);
        ApexPages.PageReference pageRef=Site.login(username, pwd, commUrl);

        if(pageRef!=null){
            return pageRef.getUrl();
        }
        
        

        return 'ERROR';
    }
}