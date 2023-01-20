import {
  Component,
  Input,
  forwardRef,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import {LocalStorage} from "src/app/utconstant/LocalStorage";
// import { ControlBase } from "src/app/@constant/config";
// import { GenEnum } from '../../../@constant/general.enum';
@Component({
  selector: "dcs-textarea",
  templateUrl: "ecm-textarea.component.html",
  styleUrls: ['./ecm-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcsTextareaComponent),
      multi: true,
    },
    {
      // Is an InjectionToken required by this class to be able to be used as an Validator
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DcsTextareaComponent),
      multi: true,
    },
    // {
    //   provide: ControlBase,
    //   useExisting: DcsTextareaComponent,
    // },
  ],
})
export class DcsTextareaComponent
  // extends ControlBase
  implements ControlValueAccessor, AfterViewInit, Validator
{
  @ViewChild("input") dcsTextBox?: ElementRef;
  errorCaption: string = "";
  constructor(private localStorage: LocalStorage) {
    // super();
  }

  isInvalid: boolean = false; // Variable to show Element is invalid
  dirtytext: boolean = false; // Variable to show element is touched
  errMsg: String | any;
  controlEl: any;
  ErrorsLog: any = []; // Errorlogs in JSON format
  public ErrorDetail: any = this.localStorage.get("Errorlogs"); // ErrorDetails coming from localstorage
  getErrorDescrption(caption: any) {
    var errordescription;
    this.ErrorsLog = JSON.parse(this.ErrorDetail);
    if (this.ErrorsLog && this.ErrorsLog.length && this.ErrorsLog.length > 0)
      this.ErrorsLog.forEach((element: any) => {
        if (element.code == "0002") {
          errordescription = element.stxt.replace("{0}", caption);
        }
      });

    return errordescription;
  }

  @Input()
  formControlName: string | any;
  DocFieldsData: any = [];
  async ngOnInit() {
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
        if (isConfig && isConfig.disabled == "True") {
          this.disabled = true;
        }
        else {
          this.disabled = false;
        }
      }

    // Setup Form Control Properties 
    // var item:any =[{
    //   field:this.formControlName,
    //   caption:this.caption,
    //   type:GenEnum.ControlType.TextArea,
    // }];
    var old = this.localStorage.get('ControlProperties');
    if (old === "null" || old === null || old == undefined || old == "undefined") {
        // this.localStorage.set('ControlProperties', JSON.stringify(item));
    } else {
        old = JSON.parse(old);
        var dupli = old.filter((a:any) => a.field == this.formControlName);
        if(dupli.length == 0){
          old.push({
            field:this.formControlName,
            caption:this.caption,
            // type:GenEnum.ControlType.TextArea,
          });
          this.localStorage.set('ControlProperties', JSON.stringify(old));
        }
    }
  }
  
  validate(control: AbstractControl): ValidationErrors | null {
    this.dirtytext = false;
    this.controlEl = control;
    // if ((this.innerValue === null) && this.dcsTextBox && control.errors && control.errors.required ) {
    if (
      (this.innerValue === null ||
        this.innerValue === "" ||
        this.innerValue === undefined) &&
      this.dcsTextBox &&
      control.errors &&
      control.errors["required"]
    ) {
      this.errMsg = this.getErrorDescrption(this.cleanCaption());
      this.isInvalid = true;
      return { invalid: true };
    } else {
      this.errMsg = null;
      this.isInvalid = false;
    }
    return null;
  }
  discloseValidatorChange: (() => void) | undefined;
  registerOnValidatorChange?(fn: () => void): void {
    this.discloseValidatorChange = fn;
  }
  ngAfterViewInit(): void {}

  private innerValue: any = "";
  private onTouchedCallback!: () => void;
  private onChangeCallback!: (_: any) => void;
  get value(): any {
    return this.innerValue;
  }
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  onBlur() {
    var requiredField;
    // check whether the control is required or not
    if (
      this.controlEl &&
      this.controlEl.errors &&
      this.controlEl.errors.required
    ) {
      requiredField = this.controlEl.errors.required;
    }
    if (
      (this.innerValue === null ||
        this.innerValue === "" ||
        this.innerValue === undefined) &&
      this.dcsTextBox &&
      requiredField
    ) {
      this.errMsg = this.getErrorDescrption(this.cleanCaption());
      this.dirtytext = true;
    } else {
      this.errMsg = null;
    }

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
  fieldName: string = "";
  @Input()
  caption: string = "";
  @Input()
  showCaption: boolean = true;
  @Input()
  rows: number = 3;
  @Input() placeholder: boolean = false;
  @Input()
  placeholderValue() {
    if (this.placeholder) {
      return "Enter " + this.cleanCaption();
    } else {
      return "";
    }
  }
  cleanCaption() {
    if (this.caption.slice(-1) === "*") {
      return (this.errorCaption = this.caption.slice(0, -1));
    } else {
      return (this.errorCaption = this.caption);
    }
  }
  @Input()
  disabled: boolean = false;
  @Input()
  maxlength: number = 500;
  @Input()
  minlength: number = 0;
  @Input()
  position: number = 1;
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
}
