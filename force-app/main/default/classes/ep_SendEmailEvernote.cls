public with sharing class ep_SendEmailEvernote {
    
    @AuraEnabled
    public static String sendMail(String mailBody, String topic){
        list<Messaging.SingleEmailMessage> mlist =new List<Messaging.SingleEmailMessage>(); 
        String [] Addresses=new String[0]; 
        String msg='';
        Messaging.SingleEmailMessage email=new Messaging.SingleEmailMessage();
        String dt=Datetime.now().format();


        addresses.add('bhagabatprasadsahoo1996.af8770d@m.evernote.com');
        email.setSubject(topic+' '+dt+' @EMAILS');
        email.setHtmlBody(mailBody);
        email.SetToaddresses(addresses);
        mlist.add(email);
        
        Messaging.SendEmailResult[] result=Messaging.sendEmail(mlist);
        
        for(Messaging.SendEmailResult res: result){
            if(res.isSuccess()){
                msg='SUCCESS';
            }
            else{
                msg='FAILED';
            }
        }
        
        return msg;
    }

}