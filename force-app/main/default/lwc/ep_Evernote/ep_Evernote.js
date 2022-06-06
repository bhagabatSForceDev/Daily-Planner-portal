import { LightningElement } from 'lwc';
import sendMail from '@salesforce/apex/ep_SendEmailEvernote.sendMail';
export default class Ep_Evernote extends LightningElement {

    allowedFormats = [
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'indent',
        'align',
        'link',
        'image',
        'clean',
        'table',
        'header',
        'color',
        'background',
    ];

    rtextVal='--';
    texVal='';

    handleSend(){
       let rtex= this.template.querySelector('lightning-input-rich-text');
       let tex= this.template.querySelector('lightning-input');
       console.log(JSON.stringify(rtex));
       console.log(rtex.value);
       sendMail({mailBody: rtex.value, topic: tex.value}).then(
           result => {
               console.log(JSON.stringify(result));
               alert(result);
           }
       );
    }


}