import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupServiceService {

  lookupCaption: any = "";
  constructor() {
    console.log(this.lookupCaption)
  }
  // ngOnInit(): void {
  // }
}
