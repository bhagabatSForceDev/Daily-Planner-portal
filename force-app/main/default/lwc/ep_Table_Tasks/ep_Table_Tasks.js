import { wire,api,track,LightningElement } from 'lwc';
import getTableTasks from '@salesforce/apex/ep_HistoryClass.getDateSpecTasks';
import {refreshApex} from '@salesforce/apex';
const columns = [
    // { label: 'Id', fieldName: 'Id', type: 'text' },
    // { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Subject', fieldName: 'Subject', type: 'text'},
    { label: 'Important', fieldName: 'Important', type: 'boolean' },
    { label: 'Session', fieldName: 'Session', type: 'text'},
    { label: 'Description', fieldName: 'Description', type: 'text' },
    { label: 'Value', fieldName: 'Value', type: 'number' },
];
export default class Ep_Table_Tasks extends LightningElement {
    @track selectedDate;
    @track isTable=true;
    @track isQuad=false;
    sum=0;
    columns=columns;
    newData=[];
    // pewData=[{"Id":"a025g000003nWRmAAM","Important":true,"Name":"T-0173","Session":"Night","Subject":"Test","Value":1}];
    wiredProperty;

    @wire(getTableTasks,{dateSelected: '$selectedDate'}) tableData({error,data}){
        // wiredProperty=data;
        if(data){
            this.sum=0;
            this.newData=data;
            // this.newData=JSON.parse(JSON.stringify(data));
            console.log('NEW==' +JSON.stringify(this.newData));
            this.newData.forEach((task)=>{
                this.sum=this.sum+task.Value;
            })
           
        }
        else{
            console.log('ERROR->'+JSON.stringify(error));
        }
    }
    

    handleDateChange(e){
        this.selectedDate=e.target.value;
        console.log(this.selectedDate);
        refreshApex(this.newData);
        
    }

}