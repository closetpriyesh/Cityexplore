import { environment } from '../../environments/environment';

export const dashboard = {
    dashboardUrl: environment.baseEmergencyUrl + 'dashboard/'
};

export const emergency = {
    emergencyUrl: dashboard.dashboardUrl + 'emergency/'
};

export const dashboardSearch = {
    dashboardSearchUrl: environment.baseSearchUrl + 'dashboard/'
};

export const outlet = {
    outletUrl: dashboardSearch.dashboardSearchUrl + 'outlet/'
};


export const health = {
    healthcareUrl: environment.baseHealthUrl+'dashboard/healthcare/' ,
    approvedhealthcareUrl:environment.baseHealthUrl+'healthcare/',
};

export const basetransport = {
    transportUrl: environment.baseTransportUrl+'transport/' ,
    approvedTransportUrl:environment.baseTransportUrl+'transport/',
};
