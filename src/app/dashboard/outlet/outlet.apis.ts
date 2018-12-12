import { outlet } from '../dashboard.apis';

export const outletlist = {
    getOutletList: outlet.outletUrl + 'getOutletList?',
    getOutletListByCityId: outlet.outletUrl + 'getOutletList?city_id='
};
