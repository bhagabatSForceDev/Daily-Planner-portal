import { LightningElement,api,track,wire } from 'lwc';
import getHistoryValues from '@salesforce/apex/ep_HistoryClass.getHistoryElements';

export default class Ep_HistoryTimeline extends LightningElement {

    @track fromDate=-10000;
    @track toDate=3000;
    @track categoryList=['Random'];
    @track isList=false;
    @track historyList=[];
    @track emptyMsg="Please Enter values and Search";

    handleSearch(){
        console.log("Handling Search !!!");
        getHistoryValues({categoryList: this.categoryList,fromDate: this.fromDate,toDate: this.toDate}).then(
            result=>{
              console.log("result"+JSON.stringify(result)+" fromDate"+this.fromDate+" toDate"+this.toDate);
              this.historyList=[];
              //console.log("result.data"+result[0].Id+result[0].Name+result[0].Category__c+result[0].Year__c);
            if(result.length!=0){
              console.log("INSIDE IFF");
              this.isList=true;
              this.historyList=result;
              this.emptyMsg="";
            }
            else{
              this.emptyMsg="No Results Found";  
            }
            }
        ).catch(error=>{
          console.log("Error occurred"+JSON.stringify(error));
        }
        );
    }

    handleFromValue(e){
     //console.log(e.target.value);
     this.fromDate=e.target.value;
    } 

    handleToValue(e){
        //console.log(e.target.value);
        this.toDate=e.target.value;
    }

}