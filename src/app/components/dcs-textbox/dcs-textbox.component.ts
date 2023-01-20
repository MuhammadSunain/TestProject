// import { PatternConstants } from "./../../../@constant/config";
import {
  Component,
  Input,
  ViewChild,
  forwardRef,
  ElementRef,
  ViewChildren,
  AfterViewInit,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  SelectControlValueAccessor,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { inputType } from 'src/app/utconstant/config'
import { LocalStorage } from "src/app/utconstant/LocalStorage";
// import { NavModalComponent } from '../../base/nav/NavModal.Component';
import { ContentChild } from '@angular/core';
// import { utdocfieldsService } from '../../../shared/services/utdocfields.Service';
// import { filter } from '../../../apps/mail/listing/categories';
// import { GenEnum } from '../../../@constant/general.enum';

@Component({
  selector: "dcs-textbox",
  templateUrl: "dcs-textbox.component.html",
  styleUrls: ['dcs-textbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcsTextboxComponent),
      multi: true,
    },
    {
      // Is an InjectionToken required by this class to be able to be used as an Validator
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DcsTextboxComponent),
      multi: true,
    },
    // {
    //   provide: ControlBase,
    //   useExisting: DcsTextboxComponent,
    // },
  ],
})
export class DcsTextboxComponent
  implements ControlValueAccessor, AfterViewInit, Validator {


  discloseValidatorChange: (() => void) | undefined;
  maskingValue: string = "";
  ngAfterViewInit(): void {
  }
  @ViewChild("input") dcsTextBox?: ElementRef;
  constructor(private localStorage: LocalStorage) {
    // super();
  }
  @Input() typee: any = "text";
  async ngOnInit() {

    // Fields Configuration Work For Report Module
    if (this.ReportDropdown == true) {
      this.DocFieldsReportData = JSON.parse(this.localStorage.get("DocFieldsReport"));
      if (this.DocFieldsReportData && this.DocFieldsReportData.length && this.DocFieldsReportData.length > 0) {
        var isConfig = this.DocFieldsReportData.filter((dt: any) => dt.fieldname == this.formControlName)[0];
        if (isConfig && isConfig.caption) {
          if (this.caption.includes("*")) {
            this.caption = isConfig.caption + "*";
          }
          else {
            this.caption = isConfig.caption;
          }
        }
        if (isConfig && isConfig.maskingtypeid) {
          this.type = "cprid";
        }
        if (isConfig && isConfig.disabled == "True") {
          this.disabled = true;
        }
        else {
          this.disabled = false;
        }
      }
    }
    // Fields Configuration Work For Module
    else if (this.ReportDropdown == false) {
      this.DocFieldsData = JSON.parse(this.localStorage.get("DocFields"));
      if (this.DocFieldsData && this.DocFieldsData.length && this.DocFieldsData.length > 0) {
        var isConfig = this.DocFieldsData.filter((dt: any) => dt.fieldname == this.formControlName)[0];
        if (isConfig && isConfig.caption) {
          if (this.caption.includes("*")) {
            this.caption = isConfig.caption + "*";
          }
          else {
            this.caption = isConfig.caption;
          }
        }
        
        if (isConfig && isConfig.maskingtypeid) {
          this.type = "cprid";
        }
        if (isConfig && isConfig.disabled == "True") {
          this.disabled = true;
        }
        else {
          this.disabled = false;
        }
      }
    }

    // Setup Form Control Properties 
    var item: any = [{
      field: this.formControlName,
      caption: this.caption,
      // type: GenEnum.ControlType.TextBox,
      controltype: this.type,
    }];
    var old = this.localStorage.get('ControlProperties');
    if (old === "null" || old === null || old == undefined || old == "undefined") {
      this.localStorage.set('ControlProperties', JSON.stringify(item));
    } else {
      old = JSON.parse(old);
      var dupli = old.filter((a: any) => a.field == this.formControlName);
      if (dupli.length == 0) {
        old.push({
          field: this.formControlName,
          caption: this.caption,
          // type: GenEnum.ControlType.TextBox,
          controltype: this.type,
        });
        this.localStorage.set('ControlProperties', JSON.stringify(old));
      }
    }
  }

  DocFieldsData: any = [];
  DocFieldsReportData: any = [];
  checkConfig: boolean = false;
  isInvalid: boolean = false; // Variable to show Element is invalid
  dirtytext: boolean = false; // Variable to show element is touched
  public innerValue: any = "";
  ErrorsLog: any = [];  // Errorlogs in JSON format
  public ErrorDetail: any = this.localStorage.get("Errorlogs"); // ErrorDetails coming from localstorage
  patternOfElement: any = null; // Pattern of input field
  errorCaption: any;
  @Input()
  maxlength!: number;
  @Input()
  ReportDropdown: boolean = false;
  @Input()
  minlength!: number;

  @Input()
  position: number = 1;

  @Input()
  caption: string | any;

  @Input()
  formControlName: string | any;
  @Input()
  tag: string | any;

  @Input()
  disabled: boolean = false;

  @Input()
  showCaption: boolean = true;

  @Input() placeholder: boolean = false;
  @Input() // Placeholder value set after input property "placeholder=true"
  placeholderValue() {

    if (this.placeholder) {
      return "Enter " + this.cleanCaption()
    }
    else {
      return "";
    }
  }
  public type: string = inputType.text;

  private onTouchedCallback!: () => void;
  private onChangeCallback!: (_: any) => void;
  errMsg: String | any;
  controlEl: any
  validate(control: AbstractControl): ValidationErrors | null { // function validates control

    this.dirtytext = false
    this.controlEl = control
    if ((this.innerValue === null || this.innerValue === "" || this.innerValue === undefined) && this.dcsTextBox && control.errors && control.errors["required"]) {
      this.errMsg = this.getErrorDescrption(this.cleanCaption())
      this.isInvalid = true
      return { invalid: true }
    }
    else {
      this.errMsg = null
      this.isInvalid = false
    }
    return null;

  }
  // Error description set on the basis of errorcode
  getErrorDescrption(caption: any) {

    var errordescription
    this.ErrorsLog = JSON.parse(this.ErrorDetail)
    if (this.ErrorsLog && this.ErrorsLog.length && this.ErrorsLog.length > 0)
      this.ErrorsLog.forEach((element: any) => {

        if (element.code == "0002") {
          errordescription = element.stxt.replace("{0}", caption)
        }
      });

    return errordescription
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.discloseValidatorChange = fn;
  }

  get value(): any {
    return this.innerValue;
  }


  @Input()
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  // Function when an textbox loses focus
  onBlur() {

    var requiredField
    // check whether the control is required or not
    if (this.controlEl && this.controlEl.errors && this.controlEl.errors.required) {
      requiredField = this.controlEl.errors.required
    }
    if ((this.innerValue === null || this.innerValue === "" || this.innerValue === undefined) && this.dcsTextBox && requiredField) {
      this.errMsg = this.getErrorDescrption(this.cleanCaption())
      this.dirtytext = true
    }
    else {
      this.errMsg = null
    }
    // Validate according to Type (email,cnic,mobile,ipAddress,url)
    if (this.type === "email") {
      if (!this.innerValue.match(this.patternOfElement)) {
        this.dirtytext = true
        this.errMsg = 'should be in right format'
      }
    }
    else if (this.type === "url") {
      if (!this.innerValue.match(this.patternOfElement)) {
        this.dirtytext = true
        this.errMsg = 'should be in right format'
      }
    }
    else if (this.type === "ipAddress") {
      if (!this.innerValue.match(this.patternOfElement)) {
        this.dirtytext = true
        this.errMsg = 'should be in right format'
      }
    }
    // else {
    //   this.errMsg = null
    // }
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  @Input()
  get Type(): string {
    return this.type;
  }

  set Type(value) {
    this.type = value;
    // Binding a pattern according to its type
    if (this.type === "url") {
      this.patternOfElement = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
    }
    else if (this.type === "email") {
      this.patternOfElement = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";
    }
    else if (this.type === "ipAddress") {
      this.patternOfElement = "^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$";
    }
  }
  validate_int(myEvento: any) {
    //  dato!: boolean | any
    var dato
    if (this.type == "mobile" || this.type == "cnic" || this.type == "phone" || this.type == "licence") {
      if (((myEvento.charCode >= 48 && myEvento.charCode <= 57) || myEvento.keyCode == 9 || myEvento.keyCode == 10 || myEvento.keyCode == 13 || myEvento.keyCode == 8 || myEvento.keyCode == 116 || myEvento.keyCode == 46 || (myEvento.keyCode <= 40 && myEvento.keyCode >= 37)) && this.searchElement()) {
        dato = true;

      } else {

        dato = false;
      }
    }
    return dato;
  }
  myMask: string = ""
  masking(e: any) {
    // masking of mobile and cnic

    if (e.keyCode != 8 && e.keyCode != 37 && e.keyCode != 39) {
      if (this.type == "mobile" || this.type == "cnic" || this.type == "phone" || this.type == "licence" || this.type == "cprid") {

        if (this.type === "mobile") {
          this.myMask = "____-_______";
          // this.maxlength = 12
        }
        if (this.type === "phone") {
          this.myMask = "___-________";
          // this.maxlength = 12
        }
        if (this.type === "cnic") {
          this.myMask = "_____-_______-_"
          // this.maxlength = 15
        }
        if (this.type === "licence") {
          this.myMask = "_____-_______-_#___"
        }
        if (this.type === "cprid") {
          this.myMask = "_________"
        }

        // var myMask = "DD/MM/YYYY";
        var myCaja = this.controlEl.value;
        var myText
        var myNumbers = [];
        var myOutPut = ""
        var theLastPos = 1;
        myText = myCaja;
        //get numbers
        if (myText && myText.length && myText.length > 0) {
          for (var i = 0; i < myText.length; i++) {
            if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
              myNumbers.push(myText.charAt(i));
            }
          }
        }
        //write over mask
        if (this.myMask && this.myMask.length && this.myMask.length > 0) {
          
          for (var j = 0; j < this.myMask.length; j++) {
            if (this.myMask.charAt(j) == "_") { //replace "_" by a number
              if (myNumbers.length == 0)
                myOutPut = myOutPut + this.myMask.charAt(j);
              else {
                myOutPut = myOutPut + myNumbers.shift();
                theLastPos = j + 1; //set caret position
              }
            } else {
              myOutPut = myOutPut + this.myMask.charAt(j);
            }
          }
        }
        if (this.value) {
          var nomask = this.value.startsWith('_');
        }
        if (nomask == false) {
          var nomaskOut = myOutPut.startsWith('_');
          if (this.value != "" && nomaskOut == false) {
            this.controlEl.setValue(myOutPut)
          }
        }
        else {
          this.controlEl.setValue(null);
        }

        const target = e.currentTarget;
        setTimeout(() => {
          // target.focus();
          target.setSelectionRange(theLastPos, theLastPos);
        })


      }
    }
    else {
      this.controlEl.setValue(this.value)
    }
    // var myMask

  }
  searchElement() {
    // this.name.value
    var bool;
    if (this.controlEl.value == undefined) {
      this.controlEl.value = "(___) ___-____"
    }
    if (this.controlEl && this.controlEl.value && this.controlEl.value.length && this.controlEl.value.length > 0) {
      for (var i = 0; i < this.controlEl.value.length; i++) {
        if (this.controlEl.value[i] == "_") {
          bool = true
          break;
        }
        else {
          bool = false
        }
      }
    }
    return bool
  }


  public _fieldWidth = "input-group col-lg-3 col-md-3 col-sm-9 col-xs-9 p-0";

  @Input()
  get fieldWidth(): string {

    return this._fieldWidth;
  }
  set fieldWidth(value: string) {
    if (value && value.indexOf(",") !== -1) {
      let colSplit = value.split(",");

      if (colSplit && colSplit.length === 4) {
        this._fieldWidth =
          "input-group col-lg-" +
          (colSplit[0] ? colSplit[0] : "3") +
          " col-md-" +
          (colSplit[1] ? colSplit[1] : "3") +
          " col-sm-" +
          (colSplit[2] ? colSplit[2] : "3") +
          " col-xs-" +
          (colSplit[3] ? colSplit[3] : "3") +
          " p-0";

      }
    }
  }

  public _captionWidth = "col-lg-1 col-md-1 col-sm-3 col-xs-3 col-form-label";

  @Input()
  get captionWidth(): string {
    return this._captionWidth;
  }
  set captionWidth(value: string) {
    if (value && value.indexOf(",") !== -1) {
      let colSplit = value.split(",");

      if (colSplit && colSplit.length === 4) {
        this._captionWidth =
          "col-lg-" +
          (colSplit[0] ? colSplit[0] : "1") +
          " col-md-" +
          (colSplit[1] ? colSplit[1] : "1") +
          " col-sm-" +
          (colSplit[2] ? colSplit[2] : "3") +
          " col-xs-" +
          (colSplit[3] ? colSplit[3] : "3") +
          " col-form-label p-0";
      }
    }
  }

  // Cleaning caption if it has "*"
  cleanCaption() {
    if (this.caption && this.caption.slice(-1) === "*") {
      return this.errorCaption = this.caption.slice(0, -1)
    }
    else {
      return this.errorCaption = this.caption
    }
  }

}
