import { LookupConfiguration } from "src/app/utconstant/config";
import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { AppConstants } from 'src/app/utconstant/app.constant';
// import { Subscription } from 'rxjs';
// import { ControlBase, Enum } from "../../../@constant/config";
// import { Broadcast } from "../../events/broadcast";
import { EcmLookupComponent } from "../ecm-lookup/ecm-lookup.component";
// import { LookupResult } from "../ecm-lookup/ecm-lookup.confing.ts";
import { EcmModalComponent } from "../ecm-modal/ecm-modal.component";
import {LocalStorage} from "src/app/utconstant/LocalStorage";
import { style } from "@angular/animations";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
// import { GenEnum } from '../../../@constant/general.enum';
import { filter } from 'rxjs/operators';
declare var $: any;
@Component({
  selector: "dcs-dropdown",
  templateUrl: "dcs-dropdown.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DcsDropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DcsDropdownComponent),
      multi: true,
    },
  ],
})
export class DcsDropdownComponent
  // extends ControlBase
  implements ControlValueAccessor, Validator {
  selectedItem: any[] = [];
  @ContentChild(forwardRef(() => "DcsModalComponent"))
  myscreens?: EcmModalComponent;
  @ViewChild("droplookup", { read: ViewContainerRef }) container: any;
  componentRef: any;
  protected lookupSubscription?: Subscription;

  @Output() KeyPress = new EventEmitter<any>();
  @ViewChild("select") select?: ElementRef;
  touchedElement: boolean = false;
  ErrorsLog: any;

  constructor(
    private element: ElementRef,
    private resolver: ComponentFactoryResolver,
    // private broadcast: Broadcast,
    private localStorage: LocalStorage,
    private renderer: Renderer2,
    private modalService: NgbModal
  ) {
    // super();
    // this.broadcast = AppConstants.injector.get(Broadcast);
  }
  broadcast: any;
  public ErrorDetail: any = this.localStorage.get("Errorlogs"); // ErrorDetails coming from localstorage
  errorCaption: any;
  controlEl: any;

  invalid: boolean = false;
  errMsg: any;
  DocFieldsData: any = [];
  DocFieldsReportData: any = [];

  oldcaption: any;
  async ngOnInit() {

    if (this.ReportDropdown == true) {
      this.DocFieldsReportData = JSON.parse(this.localStorage.get("DocFieldsReport"));
      if (this.DocFieldsReportData && this.DocFieldsReportData.length && this.DocFieldsReportData.length > 0) {
        var isConfig = this.DocFieldsReportData.filter((dt: any) => dt.fieldname == this.formControlName)[0];
        this.oldcaption = this.caption
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
    }
    else if (this.ReportDropdown == false) {
      this.DocFieldsData = JSON.parse(this.localStorage.get("DocFields"));
      if (this.DocFieldsData && this.DocFieldsData.length && this.DocFieldsData.length > 0) {
        var isConfig = this.DocFieldsData.filter((dt: any) => dt.fieldname == this.formControlName)[0];
        this.oldcaption = this.caption
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
    }

    // Setup Form Control Properties 
    var item: any = [{
      field: this.formControlName,
      caption: this.caption,
      // type: GenEnum.ControlType.Dropdown,
      config: this.config,
      valueMember: this.valueMember,
      displayMember: this.displayMember
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
          // type: GenEnum.ControlType.Dropdown,
          config: this.config,
          valueMember: this.valueMember,
          displayMember: this.displayMember
        });
        this.localStorage.set('ControlProperties', JSON.stringify(old));
      }
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if(this.ReportDropdown == false){
      if (this.data) {
        // Setup Form Control Properties 
        var item = [{
          field: this.fieldName,
          caption: this.caption,
          lookupData: this.data,
        }];
        var old = this.localStorage.get('FormControlData');
        if (old === "null" || old === null || old == undefined || old == "undefined") {
          this.localStorage.set('FormControlData', JSON.stringify(item));
        } else {
          old = JSON.parse(old);
          var dupli = old.filter((a: any) => a.field == this.formControlName);
          if (dupli.length == 0) {
            old.push({
              field: this.fieldName,
              caption: this.caption,
              lookupData: this.data,
            });
            
            if(this.disabled == false){
              try{
                this.localStorage.set('FormControlData', JSON.stringify(old));
              }
              catch(error){
              }
            }
          }
        }
      }
    }

    if (this.touchedElement) {
      this.touchedElement = false;
    }
    // throw new Error("Method not implemented.");
    this.controlEl = control;

    if (
      (control.value == "" ||
        control.value == undefined ||
        control.value == null) &&
      this.select &&
      control.errors &&
      control.errors["required"]
    ) {
      this.errMsg = this.getErrorDescrption(this.cleanCaption());
      return { invalid: true };
    }
    return null;
  }
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

  //for the purpose of fire event on lister select event
  public triggerChanged() {
    if (this.lookupSubscription) this.lookupSubscription.unsubscribe();
    let event = new CustomEvent("change", { bubbles: true });
    // As Renderer is not working with Angular 10 so I use this method so it will invoke when lister select event fire
    (this.element.nativeElement as any)["dispatchEvent"].apply(
      this.element.nativeElement,
      [event]
    );
  }

  public innerValue: any = "";

  private onTouchedCallback!: () => void;
  private onChangeCallback!: (_: any) => void;

  @Input()
  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    
    if (this.mappedField) {
      let obj = this.data.filter(o => o[this.valueMember] === v)[0];
      if (obj) {
        this.mappedValue = obj[this.mappedField];
      }
    }

    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    var requiredField;

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
      this.select &&
      requiredField
    ) {
      // console.log(this.innerValue.matchAll(this.inputMask))

      this.errMsg = this.getErrorDescrption(this.cleanCaption());
      this.touchedElement = true;
    } else {
      this.errMsg = null;
      this.touchedElement = false;
    }
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;

      if (this.mappedField) {
        let obj = this.data.filter(o => o[this.valueMember] === value)[0];
        if (obj) {
          this.mappedValue = obj[this.mappedField];
        }
      }
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  @ViewChild("lookup") public lookup!: EcmLookupComponent;

  @Input()
  type: number = 1;

  @Input()
  config: LookupConfiguration[] = [];

  @Input()
  valueMember: string = "";

  mappedValue: string = "";


  @Input()
  mappedField: string = "";

  @Input()
  refDocType: string = "";
  @Input()
  new: boolean = false;
  @Input()
  edit: boolean = false;
  @Input()
  ReportDropdown: boolean = false;

  @Input()
  displayMember: string = "";

  @Input()
  caption: string = "";

  @Input()
  lookupCaption: any;

  @Input()
  fieldName: string = "";

  @Input()
  magnifierPosition: string = "left";

  @Input()
  defaultOrderbyIs: boolean = true;

  _data: any[] = [];
  get data(): any[] {
    return this._data;
  }

  @Input()
  set data(value: any[]) {
    this._data = value;
  } //

  @Input()
  disabled: boolean = false;

  open() {


    if (this.ReportDropdown == true) {
      //Report Document Field Configuration Work Starts
      if (this.DocFieldsReportData && this.DocFieldsReportData.length && this.DocFieldsReportData.length > 0) {
        var isConfig = this.DocFieldsReportData.filter((dt: any) => dt.fieldname == this.formControlName)[0];
        if (this.oldcaption && this.config && this.config.length && this.config.length > 0) {

          this.config.forEach((ele: any) => {
            if (ele.name == this.displayMember) {
              ele.caption = this.caption.replace("*", "");
            }
          })
        }
      }
      //Report Document Field Configuration Work Ends
    }
    else if (this.ReportDropdown == false) {
      // Document Field Configuration Work Starts
      if (this.DocFieldsData && this.DocFieldsData.length && this.DocFieldsData.length > 0) {
        var isConfig = this.DocFieldsData.filter((dt: any) => dt.fieldname == this.formControlName)[0];
        if (this.oldcaption && this.config && this.config.length && this.config.length > 0) {

          this.config.forEach((ele: any) => {
            if (ele.name == this.displayMember) {
              ele.caption = this.caption.replace("*", "");
            }
          })
        }
      }
      // Document Field Configuration Work Ends
    }



    if (this.type === 1) {

      if (this.broadcast)
        // this.lookupSubscription = this.broadcast
        //   .observable<LookupResult>("lookup")
        //   .subscribe((arg: any) => {
        //     switch (arg.value.lookupId) {
        //       case this.fieldName:
        //         this.value = arg.value.data[this.valueMember];
        //         this.triggerChanged();
        //         break;
        //     }
        //   });
      this.container.clear();
      const factory: ComponentFactory<any> =
        this.resolver.resolveComponentFactory(EcmLookupComponent);

      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.Config = this.config;
      this.componentRef.instance.Data = this.data;
      this.componentRef.instance.displayMember = this.displayMember;
      this.componentRef.instance.valueMember = this.valueMember;
      this.componentRef.instance.Caption = this.caption;
      this.componentRef.instance.LookupId = this.fieldName;
      this.componentRef.instance.onListerClose.subscribe((val: any) => {
        if (this.select && this.select.nativeElement)
          this.select?.nativeElement.focus();
      });
      this.componentRef.instance.open();
    } else {
      
      const modalRef = this.modalService.open(EcmLookupComponent, {
        size: "lg",
      });
      this.showNone = true;
      modalRef.componentInstance.Config = this.config;
      modalRef.componentInstance.Data = this.data;
      modalRef.componentInstance.displayMember = this.displayMember;
      modalRef.componentInstance.valueMember = this.valueMember;
      modalRef.componentInstance.Caption = this.caption;
      modalRef.componentInstance.LookupId = this.fieldName;
      modalRef.componentInstance.type = this.type;
      modalRef.componentInstance.totalrecord = this.data.length;
      modalRef.componentInstance.defaultOrderby = this.defaultOrderbyIs;
      modalRef.componentInstance.selectedRow.subscribe((o: any) => {
        this.value = o.data[this.valueMember];
        this.triggerChanged();
      });
    }
  }

  @Input()
  showCaption: boolean = true;

  @Input()
  formControlName: string | any;

  @Input()
  showTool: boolean = false;

  @Input()
  showButton: boolean = false;

  @Input()
  required: boolean = false;

  // private lookupSubscription: Subscription;

  async openSubScreen() {
    if (this.mappedField) {
      this.openAdditional.emit(this.mappedValue);
    }
    if (!this.mappedField) {
      this.openAdditional.emit(this.value);
    }
  }

  async newSubScreen() { }

  async Modelchange() {
    var val = Number(this.value);
    if (!isNaN(val)) this.value = val;
    //this.value = Number(this.value);
  }
  ondelete(event: any) {
    this.value = "";
  }
  @Input()
  position: number = 1;

  public _fieldWidth = "input-group col-lg-3 col-md-3 col-sm-9 col-xs-9";

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
          (colSplit[3] ? colSplit[3] : "3");
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

  @Input()
  showNone: boolean = false;

  @Input()
  Id: any;

  @Output()
  get displayMemberValue() {
    let val;

    if (
      this.data &&
      this.data.length > 0 &&
      this.value &&
      this.valueMember &&
      this.displayMember
    ) {
      let obj = this.data.filter((o) => o[this.valueMember] === this.value)[0];
      if (obj) {
        val = obj[this.displayMember];
      }
    }

    return val;
  }

  onKeyDown(e: any) {
    if (e.shiftKey && e.keyCode == 79) {
      this.open();
    }
    if (e.keyCode === 8) {
      this.value = undefined;
      this.innerValue = undefined;
    }

    this.KeyPress.emit(e);
  }

  @Output()
  onButtonClick: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  openAdditional: EventEmitter<any> = new EventEmitter<any>();

  async onButtonClickedInner() {
    this.onButtonClick.emit();
  }
  cleanCaption() {
    if (this.caption.slice(-1) === "*") {
      return (this.errorCaption = this.caption.slice(0, -1));
    } else {
      return (this.errorCaption = this.caption);
    }
  }
  showDropdown: any;
  dropdownFunction($event: { stopPropagation: () => void }) {
    $event.stopPropagation();
    this.showDropdown = !this.showDropdown;
    // this.showNotification = !this.showNotification
  }
}
