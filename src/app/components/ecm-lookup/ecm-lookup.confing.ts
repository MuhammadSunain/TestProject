export interface LookupConfiguration {
    name: string;
    caption: string;
    type: string;
    width?: string;
    format?:string;
}

export interface LookupResult {
    lookupId: string;
    data: any;
}
