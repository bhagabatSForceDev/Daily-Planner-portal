import { api,track,LightningElement } from 'lwc';

export default class Bcl_tableCell extends LightningElement {

@api columnVal;
// @api rowData;
editMode=false;
isCheck=false;
isText=false;
isNum=false;
isPick=false;
isAccount=false;
displayValue;
@api cellData;
options=[{label:'New', value:'New'},{label:'In Progress', value:'In Progress'},{label:'Closed', value:'Closed'}];


@api
get rowData(){
    return this.displayValue;
}

set rowData(value){
     console.log('ROW DATA ---> '+this.rowData +' and Col= '+this.columnVal+' andsss '+ JSON.stringify(value));
     let obj;
    if(this.columnVal=='Checkbox'){
        this.isCheck=true;this.isText=false;this.isNum=false;this.isPick=false;this.isAccount=false;   
        this.displayValue= value["Checkbox"];
        console.log(value["Checkbox"]);
    }
    else if(this.columnVal=='Text'){
        this.isCheck=false;this.isText=true;this.isNum=false;this.isPick=false;this.isAccount=false;   
        this.displayValue= value["Text"];
        console.log(value["Text"]);
    }
    else if(this.columnVal=='Number'){
        this.isCheck=false;this.isText=false;this.isNum=true;this.isPick=false;this.isAccount=false;   
        this.displayValue= value["Number"];
        console.log(value["Number"]);
    }
    else if(this.columnVal=='Picklist'){
        this.isCheck=false;this.isText=false;this.isNum=false;this.isPick=true;this.isAccount=false;  
        this.displayValue= value["Picklist"];
        console.log(value["Picklist"]);
    }
    else if(this.columnVal=='Account'){
        this.isCheck=false;this.isText=false;this.isNum=false;this.isPick=false;this.isAccount=true;   
        this.displayValue= value["Account"];
        console.log(value["Account"]);
    }
}




renderedCallback(){
    console.log("RENDERED CELL");
}

handleChange(e){
    this.displayValue=e.target.value;
    console.log('SEL Val= '+JSON.stringify(e.target.value)+' VAL= '+JSON.stringify(this.displayValue));
} 

}