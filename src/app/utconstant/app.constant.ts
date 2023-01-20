import { Injector } from "@angular/core";

export const AppConstants = {
    urls: {
        // forDev
        api: "http://localhost:2216/api/",
        dbname: "ecom",
        dbpassword: "sqlecom",
        ut: "http://localhost:2216/ut/api/",

        // forlive
        // api: "http://liveecm.com.pk/api/",
        // dbname: "ecom",
        // dbpassword: "sqlecom",
        // ut: "http://liveecm.com.pk/ut/api/"
    },
    settings: {
        // dateFormatforString: "DD-MMM-YYYY",
        // timeFormatforString: "hh:mm:ss A",
        // dateformat: "dd-MMM-yyyy",
        // timeFormat: "HH:mm:ss",
        // dateAndTime: "YYYY-MM-DDTHH:mm",
        // dateFormat: "dd-MMM-yyyy",
        // monthDateYear: "MM/DD/YYYY",
        // timeFormatTile: "hh:mm A",
        // date: "MMM d, y",
        // appCode: "SB",
        // instanceid: 1,
        // instancecode: "UT001",
        clientid: 1,
    },
}