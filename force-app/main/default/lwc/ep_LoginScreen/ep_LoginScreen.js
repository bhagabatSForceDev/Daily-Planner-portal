import { LightningElement } from 'lwc';
import userLogin from '@salesforce/apex/ep_LoginController.login';
import backImage from '@salesforce/resourceUrl/Login_back';
export default class Ep_LoginScreen extends LightningElement {

username='';
pwd='';
backImage=backImage;

renderedCallback(){
    
}

handleNameChange(e){
    this.username=e.target.value;
}

handlePwdChange(e){
    this.pwd=e.target.value;
}

handleLogin(){
    console.log('U-> '+this.username+' P-> '+this.pwd);
    userLogin({ username: this.username ,pwd: this.pwd }).then((result)=>{
        console.log('RET VAL-> '+JSON.stringify(result));
        if(result=='ERROR'){
            alert('Error while login');
            return;
        }else{
            console.log('Result: '+result);
            debugger;
            window.location.href=result;
        }
    }); 
}

}