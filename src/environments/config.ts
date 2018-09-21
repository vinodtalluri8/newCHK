export class Config {

    public static getEnvironmentVariable(value) {
        let environment: string;
        let data = {};
        environment = window.location.hostname;
        switch (environment) {
            case 'bjavaappd2':
            case 'bjavaappd1':
            case 'diva-jbdev.mfs.com':
                data = {
                    serverUrl: 'http://diva-jbdev.mfs.com/',
                    checklistServiceUrl: 'WS_DIVA_CHECKLIST_NR_WAR_SVC/',
                    commonServiceURL: 'DIVA-CommonService/'
                };
                break;
            case 'bjavaappt2':
            case 'bjavaappt1':
            case 'diva-jbtest.mfs.com':
                data = {
                    serverUrl: 'http://diva-jbtest.mfs.com/',
                    checklistServiceUrl: 'WS_DIVA_CHECKLIST_NR_WAR_SVC/',
                    commonServiceURL: 'DIVA-CommonService/'
                };
                break;
            case 'bjavaapps2':
            case 'bjavaapps1':
            case 'diva-jbstage.mfs.com':
                data = {
                    serverUrl: 'http://diva-jbstage.mfs.com/',
                    checklistServiceUrl: 'WS_DIVA_CHECKLIST_NR_WAR_SVC/',
                    commonServiceURL: 'DIVA-CommonService/'
                };
                break;
            case 'bjavaappu2':
            case 'bjavaappu1':
            case 'diva-jbuat.mfs.com':
                data = {
                    serverUrl: 'http://diva-jbuat.mfs.com/',
                    checklistServiceUrl: 'WS_DIVA_CHECKLIST_NR_WAR_SVC/',
                    commonServiceURL: 'DIVA-CommonService/'
                };
                break;
            default:
                data = {
                    serverUrl: 'http://diva-jbdev.mfs.com/',
                    commonServiceURL: 'DIVA-CommonService/',
                    checklistServiceUrl: 'WS_DIVA_CHECKLIST_NR_WAR_SVC/'
                };
        }
        return data[value];
    }
}
