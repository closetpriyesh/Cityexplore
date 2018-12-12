import { basetransport } from "../dashboard.apis";


//VehicleAPIs

export const transport={
    addVehicle:basetransport.transportUrl+'add_vehicle',
    getVehicle:basetransport.transportUrl+'get_vehicle?id=',
    addLink:basetransport.transportUrl+'add_link',
    addStop:basetransport.transportUrl+'add_stop',
    getRoutes:basetransport.transportUrl+'get_routes',
    addCompany:basetransport.transportUrl+'add_company',
    getCompaniesByCityId:basetransport.transportUrl+'get_company?city_id=',
    configVehicle:basetransport.transportUrl+'config_vehicle',
    moderate_company:basetransport.transportUrl+'moderate_company',
    get_approved_companies:basetransport.transportUrl+'get_approved_companies',
    get_stops_for_mod:basetransport.transportUrl+'get_stops_for_mod?city_id=',
    moderate_stop:basetransport.transportUrl+'moderate_stop',
    get_approved_stops:basetransport.transportUrl+'get_approved_stops',
    get_vehicle_for_mod:basetransport.transportUrl+'get_vehicle_for_mod',
    moderate_vehicle:basetransport.transportUrl+'moderate_vehicle',
    get_approved_vehicles:basetransport.transportUrl+'get_approved_vehicles',
    get_links_for_mod:basetransport.transportUrl+'get_links_for_mod',
    moderate_link:basetransport.transportUrl+'moderate_link',
    get_approved_links:basetransport.transportUrl+'get_approved_links',
    get_routes_for_mod:basetransport.transportUrl+'get_routes_for_mod',
    moderate_route:basetransport.transportUrl+'moderate_route',
    get_approved_routes:basetransport.transportUrl+'get_approved_routes',
    get_companies_for_mod:basetransport.transportUrl+'get_companies_for_mod?city_id=',
    add_route:basetransport.transportUrl+'add_route',
    get_vehicle_by_id:basetransport.transportUrl+'get_vehicle_by_id_mod?id=',
    get_link_by_id:basetransport.transportUrl+'get_link_by_id_mod?id=',
    get_route_by_id:basetransport.transportUrl+'get_route_by_id_mod?id=',
    get_company_by_id:basetransport.transportUrl+'get_company_by_id_mod?id=',
    get_stop_by_id:basetransport.transportUrl+'get_stop_by_id_mod?id=',
    get_config_for_mod:basetransport.transportUrl+'get_config_for_mod?vehicle_id=',
    moderate_config:basetransport.transportUrl+'moderate_config',
    get_approved_config:basetransport.transportUrl+'get_approved_config?vehicle_id=',
    get_config_by_id:basetransport.transportUrl+'get_config_by_id_mod?id=',
    get_approved_links_by_source:basetransport.transportUrl+'get_approved_links_by_source?source=',
    add_home_images:basetransport.transportUrl+'add_home_images',
    get_home_images:basetransport.transportUrl+'get_home_images?city_id='




    

    
    
    
    
    
    
    
        
    
    
    

}