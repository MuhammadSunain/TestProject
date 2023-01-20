export class Entity {
    Code: any = "";
    EntityName: String = "";
    EntityType: String = "";
    EntityDate: any;

    // Personal Info
    ownerName: string = "";
    contsctno: number = 0;
    email: string = "";
    address: string = "";
    clientid: any = 0;
}

export class Entity_Type {
    Code :any = "";
    Type: string = "";
    Description: string = "";
}

export class StdCategory {
    Code: any = "";
    studentcategory: any = "";
    description: any = "";
    entityId: Number = 0;
}

export class ut_Roles {
    Code: any = "";
    Role1: any = "";
    client: any = "";
    entityId: Number = 0;
}

export class ut_User_Auth {
    clientid: any = "";
    Username: any = "";
    Password: any = "";
    Fullname: any = "";
    Email: any = "";
    CellNo: any = "";
    UserCategory: any = "";
    Role: any = "";
    Status: any = "";
    entityId: Number = 0;
    entitiesname: Number = 0;
}

export class country {
    Code: any = "";
    Country1: any = "";
    isoCode: any = "";
    dialCode: any = "";
    Description: any = "";
    entityId: Number = 0;
}

export class state {
    Code: any = "";
    Country: any = "";
    State1: any = "";
    Description: any = "";
    entityId: Number = 0;
}

export class city {
    Code: any = "";
    Country: any = "";
    State: any = "";
    City1: any = "";
    Description: any = "";
    entityId: Number = 0;
}

export class hdr_Ac_Syllabus {
    Code :any = "";
    Syllabus: any = "";
    Description: any = "";
    entityId: Number = 0;
}

export class hdr_Ac_Course {
    Code :any = "";
    CourseCategory: any = "";
    Course: any = "";
    Syllabus: any = "";
    AgeFrom: any = "";
    AgeTill: any = "";
    entityId: Number = 0;
}

export class Section {
    Code :any = "";
    Section: any = "";
    Description: any = "";
    entityId: Number = 0;
}

export class SectionGroup {
    Code :any = "";
    SectionGroup: any = "";
    Sections: any = "";
    Description: any = "";
    entityId: Number = 0;
}

export class studentInfo {
    StudentID: any = "";
    grno: any = "";
    StudentCategory: any = "";
    FullName: any = "";
    LastName: any = "";
    DateofBirth: any = "";
    CNIC: any = "";
    Nationality: any = "";
    gender: any = "";
    Religon: any = "";
    Address: any = "";
    Country: any = "";
    State: any = "";
    City: any = "";
    Phoneno: any = "";
    mobileno: any = "";
    Email: any = "";
    joingdate: any = "";
    admissiondate: any = "";
    syllabus: any = "";
    Course: any = "";
    Section: any = "";
    Sectiongroup: any = "";
    fatherName: any = "";
    fatherincome: any = "";
    Contactno: any = "";
    fathercnic: any = "";
    whatsappno: any = "";
    fatheremail: any = "";
    fatheraddress: any = "";
    fathercountry: any = "";
    fatherstate: any = "";
    fathercity: any = "";
    mothername: any = "";
    mothercnic: any = "";
    mothercontactno: any = "";
    motherwhatsapp: any = "";
    motheremail: any = "";
    motheraddres: any = "";
    mothercountry: any = "";
    motherstate: any = "";
    mothercity: any = "";
    emergencyrelagion: any = "";
    emergencypersonname: any = "";
    emergencycnic: any = "";
    emergencycontactno: any = "";
    entityId: Number = 0;
}

export class hdr_Sm_Caste {
    Code :any = "";
    Caste1: any = "";
    Description: any = "";
    entityId: Number = 0;
}

export class SubjectType {
    Code :any = "";
    SubjectType: any = "";
    Description: any = "";
    entityId: Number = 0;
}

export class BookType {
    Code :any = "";
    BookType: any = "";
    entityId: Number = 0;
}

export class BookCategory {
    Code :any = "";
    BookCategory: any = "";
    entityId: Number = 0;
}

export class BookPublisher {
    Code :any = "";
    Publisher: any = "";
    Address :any = "";
    Country: any = "";
    PhoneNo :any = "";
    Email: any = "";
    WebUrl :any = "";
    entityId: Number = 0;
}

export class BookAuthor {
    Code :any = "";
    AuthorType: any = "";
    NickName :any = "";
    Name: any = "";
    Country :any = "";
    YearBorn: any = "";
    YearDied :any = "";
    Awards :any = "";
    entityId: Number = 0;
}

export class Subject {
    Code :any = "";
    SubjectType: any = "";
    Syllabus: any = "";
    Course :any = "";
    Language: any = "";
    PeriodsPerWeek :any = "";
    SubjectName: any = "";
    SubjectCategory :any = "";
    SubjectClass :any = "";
    Compulsory :any = "";
    entityId: Number = 0;
}

export class qualificationType {
    Code: any;
    QualificationType: any;
    Dexcription: any;
    entityid: any;
}

export class qualification {
    Code: any;
    qualificationtypeid: any;
    qualification: any;
    Description: any;
    entityid: any;
}

export class Religon {
    Code: any;
    Religion: any;
    Description: any;
    entityid: any;
}

export class employeeData {
    empid: any;
    shrotcode: any;
    machinecode: any;
    joindate: any;
    firstname: any;
    lastname: any;
    dateofbirth: any;
    Gender: any;
    bloodgroup: any;
    CNIC: any;
    birthcountry: any;
    birthcity: any;
    nationality: any;
    religion: any;
    email: any;
    contactno: any;
    whatsappno: any;
    emptype: any;
    empcategory: any;
    empdepartment: any;
    empdestination: any;
    site: any;
    entityId: Number = 0;
    clientId: Number = 0;
}

export class CaseTypes {
    Code: any = "";
    CaseGroup : any = "";
    CaseType: any = "";
    Description: any = "";
    CaseFor: any = "";
    entityId: any = "";
    clientId: any = "";
}

export class CaseGroups {
    Code: any = "";
    CaseGroup : any = "";
    Description: any = "";
    entityId: any = "";
    clientId: any = "";
}

export class Sources {
    Code: any = "";
    Source : any = "";
    Description: any = "";
    entityId: any = "";
    clientId: any = "";
}

export class Purposes {
    Code: any = "";
    Purpose : any = "";
    Description: any = "";
    entityId: any = "";
    clientId: any = "";
}

export class certificateTypes {
    Code: any = "";
    CertificateFor : any = "";
    CertificateType: any = "";
    Description: any = "";
    entityId: any = "";
    clientId: any = "";
}

export class CaseRules {
    Code: any = "";
    CaseGroup : any = "";
    CaseType: any = "";
    CaseRule: any = "";
    Description: any = "";
    AssignTo: any = "";
    entityId: any = "";
    clientId: any = "";
}

export class CaseStages {
    Code: any = "";
    Caseuser: any = "";
    Stagetype: any = "";
    Stages: any = "";
    description: any = "";
    entityId: number = 0;
    clientID: number = 0;
}

export class Book {
    bookno: any;
    course: any;
    Subject: any;
    subtype: any;
    bookname: any;
    tag: any;
    author: any;
    publisher: any;
    barcode: any;
    price: any;
    edition: any;
    year: any;
    seriesname: any;
    entityId: Number = 0;
    clientId: Number = 0;
}

export class caseRegister {
    caseid: Number = 0;
    casedate: any;
    requestertype: any;
    requester: any
  	course	:any;
    section:any
    casegrp:any;
    casetype:any;	
    priority:any;
    assignto:any;
    subject:any;
    txtmessage:any;
    entityId:Number = 0;
    clientId: Number = 0
}