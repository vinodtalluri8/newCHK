/** This file is used to specify the headers for get and post **/

import { HttpHeaders } from '@angular/common/http';

// let allOption : any[];

export const appConstants = {

    getHeaderOptions: {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Request-Method': 'GET',
            'Access-Control-Request-Headers': '*'
        }),
        withCredentials: false,
        params: {}
    },
    postHeaderOptions: {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': '*'
        }),
        withCredentials: false
    } ,

    // allOption :  [{ 'label': 'All', 'value': '0'}]
};
