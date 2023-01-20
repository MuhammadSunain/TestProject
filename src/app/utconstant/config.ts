import {Input} from "@angular/core";

export const inputType = {
    text: "text",
    mobile: "mobile",
    phone: "phone",
    cnic: "cnic",
    license: "license",
    time: "time",
  };

//   export abstract class ControlBase {
//     private _index: number = -1;
//     @Input()
//     get index(): any {
//       return this._index;
//     }
  
//     set index(v: any) {
//       this._index = v;
//     }
//   }  

export interface LookupConfiguration {
  name: string;
  caption: string;
  type: string;
  width?: string;
  format?: string;
}
