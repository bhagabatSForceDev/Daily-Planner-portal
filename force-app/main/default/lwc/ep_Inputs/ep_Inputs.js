import { LightningElement } from 'lwc';
import inputImg from'@salesforce/resourceUrl/Input_Images';
import createWeight from '@salesforce/apex/WellbeingController.createWeight';
import createFastFood from '@salesforce/apex/WellbeingController.createFastFood';
import createMing from '@salesforce/apex/WellbeingController.createMing';
export default class Ep_Inputs extends LightningElement {
    //imgPath=inputImg+'/weight.png';
    isWeight=true;
    isOrder=false;
    isCommit=false;


    get backgroundCls(){
        if(this.isWeight){
            return 'btn-container weight-cls';
        }else if(this.isOrder){
            return 'btn-container order-cls';
        }else if(this.isCommit){
            return 'btn-container commit-cls';
        }
    }

    get imgPath(){
        if(this.isWeight){
            return inputImg+'/weight.png';
        }else if(this.isOrder){
            return inputImg+'/swiggy.png';
        }else if(this.isCommit){
           return inputImg+'/fish.png';
        }
    }
    
    get weightCls(){
        if(this.isWeight){
            return 'btn-cls selected';
        }else{
            return 'btn-cls unselected';
        }
    }

    get orderCls(){
        if(this.isOrder){
            return 'btn-cls selected';
        }else{
            return 'btn-cls unselected';
        }
    }

    get commitCls(){
        if(this.isCommit){
            return 'btn-cls selected';
        }else{
            return 'btn-cls unselected';
        }
    }

    handleButton(e){
        console.log('e.target.value->'+e.target.value);
        if(e.target.value=='Weight'){
            this.isWeight=true;
            this.isCommit=false;
            this.isOrder=false;
        }else if(e.target.value=='Order'){
            this.isWeight=false;
            this.isCommit=false;
            this.isOrder=true;
        }else if(e.target.value=='Commit'){
            this.isWeight=false;
            this.isCommit=true;
            this.isOrder=false;
        }
    }


    handleCreateWeight(e){
       let weight= this.template.querySelector(`[data-id="weight"]`).value;
       let date= this.template.querySelector(`[data-id="wDate"]`).value;
       console.log('Weight-->'+ JSON.stringify(weight));
       console.log('data ->'+ JSON.stringify(date));
       createWeight({weight: weight, d: date}).then((result)=>{
           console.log('Record Created');
       }).catch((e)=>{
        console.log('ERROR->'+JSON.stringify(e));
       });
    }

    handleCreateFood(e){
        let oDate=this.template.querySelector(`[data-id="oDate"]`).value;
        let oAmt=this.template.querySelector(`[data-id="oAmt"]`).value;
        let oSubject=this.template.querySelector(`[data-id="oSubject"]`).value;

        console.log('Date ->'+oDate+' oAmt ->'+oAmt+' oSubject->'+oSubject);

        createFastFood({ordAmt : oAmt, subject: oSubject, d: oDate}).then(()=>{
            console.log('Fast Food Created');
        }).catch((e)=>{
            console.log('Error ->'+e.getMessage());
        });

    }

    handleCreateCommit(e){
        let cDate=this.template.querySelector(`[data-id="cDate"]`).value;

        console.log('cDate->'+cDate);

        createMing({d: cDate}).then(()=>{
            console.log('Ming Record Created.');
        }).catch((e)=>{
            console.log('Error: '+e.getMessage());
        });

    }
}