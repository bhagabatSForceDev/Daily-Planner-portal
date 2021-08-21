import { track,LightningElement } from 'lwc';

export default class Bcl_dynamicTable extends LightningElement {
    columns=[{label: 'Checkbox',direction: 'up'},
    {label: 'Text',direction: 'up'},
    {label: 'Number',direction: 'up'},
    {label: 'Picklist',direction: 'up'},
    {label: 'Account',direction: 'up'}];

    @track value='New';
    options=[{label:'New', value:'New'},{label:'In Progress', value:'In Progress'},{label:'Closed', value:'Closed'}];

    @track data= [{"Checkbox":true,"Text":"Hello","Number":123,"Picklist":this.value,"Account":"Burlington"},
    {"Checkbox":false,"Text":"Hello2","Number":1234,"Picklist":this.value,"Account":"Acme"},
    {"Checkbox":false,"Text":"Hello3","Number":12345,"Picklist":this.value,"Account":"Next Gen"}];
    

    handleChange(e){
        this.value=e.target.value;
        this.data= [{"Checkbox":true,"Text":"Hello","Number":123,"Picklist":this.value,"Account":"Burlington"},
    {"Checkbox":false,"Text":"Hello2","Number":1234,"Picklist":this.value,"Account":"Acme"},
    {"Checkbox":false,"Text":"Hello3","Number":12345,"Picklist":this.value,"Account":"Next Gen"}];
    console.log("VAL "+this.value+"DATA "+JSON.stringify(this.data));
    }
}