import { emergency } from "../dashboard.apis";
import { environment } from "../../../environments/environment";
import {health} from "../dashboard.apis";

export const healthcare={
    doctorsUrl: health.healthcareUrl+ 'doctor/',
    approveddoctorsUrl:  health.approvedhealthcareUrl+ 'doctor/',
    hospitalsUrl:health.healthcareUrl+ 'hospital/',
    approvedhospitalsUrl:health.approvedhealthcareUrl+ 'hospital/',
    labsUrl:health.healthcareUrl+ 'lab/',
    chemistsUrl:health.healthcareUrl+ 'chemist/',
};

//Doctor APIs

export const doctors={
    addOrUpdateDoctors : healthcare.doctorsUrl + 'addOrUpdateDoctor',
    moderateDoctors: healthcare.doctorsUrl + 'moderateDoctor',
    deleteDoctors: healthcare.doctorsUrl + 'deleteDoctor',
    getdoctors_list: healthcare.doctorsUrl + 'getDoctor',
    getdoctor:healthcare.doctorsUrl+'getDoctor?id=',
    getAddress:healthcare.doctorsUrl+'getAddress?id=',
    updateAddress:healthcare.doctorsUrl+'updateAddress',
    getimages:healthcare.doctorsUrl+'getImages?id=',
    addimages:healthcare.doctorsUrl+'addImages',
   
    addOrUpdateSpecialization:healthcare.doctorsUrl+'addOrUpdateDoctorSpecialization',
    addOrUpdateEducation:healthcare.doctorsUrl+'addOrUpdateDoctorEducation',
    getEducation:healthcare.doctorsUrl+'getDoctorEducation?id=',
    getEducationById:healthcare.doctorsUrl+'getDoctorEducation?doctor_id=',
    moderateEducation:healthcare.doctorsUrl+'moderateDoctorEducation',
    deleteEducation:healthcare.doctorsUrl+'deleteDoctorEducation',
    getSpecialization:healthcare.doctorsUrl+'getDoctorSpecialization?id=',
    getSpecializationById:healthcare.doctorsUrl+'getDoctorSpecialization?doctor_id=',
    moderateSpecialization:healthcare.doctorsUrl+'moderateDoctorSpecialization',
    deleteSpecialization:healthcare.doctorsUrl+'deleteDoctorSpecialization',
    addOrUpdateTimings:healthcare.doctorsUrl+'addOrUpdateDoctorTiming',
    moderateTimings:healthcare.doctorsUrl+'moderateDoctorTiming',
    deleteTiming:healthcare.doctorsUrl+'deleteDoctorTiming',
    getTimings:healthcare.doctorsUrl+'getDoctorTiming?doctor_id=',


}

//Hospital APIs

export const hospitals={
    addOrUpdateHospitals : healthcare.hospitalsUrl + 'addOrUpdateHospital',
    moderateHospitals: healthcare.hospitalsUrl + 'moderateHospital',
    deleteHospitals: healthcare.hospitalsUrl + 'deleteHospital',
    getHospital:healthcare.hospitalsUrl+'getHospital',
    getHospitalById:healthcare.hospitalsUrl+'getHospital?id=',
    getHospitalByCityId:healthcare.hospitalsUrl+'getHospital?city_id=',
    getApprovedHospital:healthcare.approvedhospitalsUrl+'getHospital',
    getApprovedHospitalByCityId:healthcare.approvedhospitalsUrl+'getHospital?city_id=',
    getApprovedHospitalGroup:healthcare.approvedhospitalsUrl+'getHospitalGroup',
    getHospitalGroup:healthcare.hospitalsUrl+'getHospitalGroup',
    getHospitalGroupById:healthcare.hospitalsUrl+'getHospitalGroup?id=',

    addOrUpdateHospitalGroup:healthcare.hospitalsUrl+'addOrUpdateHospitalGroup',
    moderateHospitalGroup:healthcare.hospitalsUrl+'moderateHospitalGroup',
    deleteHospitalGroup:healthcare.hospitalsUrl+'deleteHospitalGroup',
    moderateHospitalDepartment:healthcare.hospitalsUrl+'moderateHospitalDepartment',
    deleteHospitalDepartment:healthcare.hospitalsUrl+'deleteHospitalDepartment',
    getAddress:healthcare.hospitalsUrl+'getAddress?id=',
    updateAddress:healthcare.hospitalsUrl+'updateAddress',
    getfacilities:healthcare.hospitalsUrl+'getHospitalFacility?hospital_id=',
    getfacilitiesbyid:healthcare.hospitalsUrl+'getHospitalFacility?hospital_id=&id=',
    
    getapprovedfacilities:healthcare.approvedhospitalsUrl+'getHospitalFacility?hospital_id=',
    addOrUpdatefacilities:healthcare.hospitalsUrl+'addOrUpdateHospitalFacility',
    moderatefacilities:healthcare.hospitalsUrl+'moderateHospitalFacility',
    deletefacilities:healthcare.hospitalsUrl+'deleteHospitalFacility',
    getDepartments:healthcare.hospitalsUrl+'getHospitalDepartment?hospital_id=',
    getApprovedDepartments:healthcare.approvedhospitalsUrl+'getHospitalDepartment?hospital_id=',
    getDepartmentByDepartmentId:healthcare.hospitalsUrl+'getHospitalDepartment?hospital_id=&id=',
    addOrUpdateDepartment:healthcare.hospitalsUrl+'addOrUpdateHospitalDepartment',
    getdepartmentimages:healthcare.hospitalsUrl+'getDepartmentImages?id=',
    adddepartmentimages:healthcare.hospitalsUrl+'addDepartmentImages',
    getdepartmentdetails:healthcare.hospitalsUrl+'getDepartmentDetails?id=',
    getdepartmentdoctors:healthcare.hospitalsUrl+'getDepartmentDoctors?id=',
    addOrUpdatedepartmentdoctor:healthcare.hospitalsUrl+'addOrUpdateDepartmentDoctor',
    getallhospitalsonaddress:healthcare.hospitalsUrl+'getAllHospitalsOnAddress',
    getimages:healthcare.hospitalsUrl+'getHospitalImage?hospital_id=',
    getimage:healthcare.hospitalsUrl+'getHospitalImage?hospital_id=&id=',
    moderateimages:healthcare.hospitalsUrl+'moderateHospitalImage',
    addOrUpdateimages:healthcare.hospitalsUrl+'addOrUpdateHospitalImage',
    deleteimages:healthcare.hospitalsUrl+'deleteHospitalImage',

    
}

//Lab APIs

export const labs={
    addOrUpdateLab:healthcare.labsUrl+'addOrUpdateDiagnosticLab',
    moderateLab:healthcare.labsUrl+'moderateDiagnosticLab',
    deleteLab:healthcare.labsUrl+'deleteDiagnosticLab',
    getLabByCityId:healthcare.labsUrl+'getDiagnosticLab?city_id=',
    getLabs:healthcare.labsUrl+'getDiagnosticLab',
    getLabById:healthcare.labsUrl+'getDiagnosticLab?id=',
    addOrUpdateLabTimings:healthcare.labsUrl+'addOrUpdateLabTimings',
    moderateLabTimings:healthcare.labsUrl+'moderateLabTimings',
    deleteLabTimings:healthcare.labsUrl+'deleteLabTimings',
    getLabTimings:healthcare.labsUrl+'getLabTimings?lab_id=',
    addOrUpdateLabsServices:healthcare.labsUrl+'addOrUpdateLabServices',
    moderateLabServices:healthcare.labsUrl+'moderateLabServices',
    deleteLabServices:healthcare.labsUrl+'deleteLabServices',
    getLabServices:healthcare.labsUrl+'getLabServices?lab_id=',
    


}


//Chemist APIS

export const chemists={ 
    addOrUpdateChemists : healthcare.chemistsUrl + 'addOrUpdateChemist',
    moderateChemists: healthcare.chemistsUrl + 'moderateChemist',
    deleteChemists: healthcare.chemistsUrl + 'deleteChemist',
    getChemists_list: healthcare.chemistsUrl + 'getChemist',
    getChemistById:healthcare.chemistsUrl+ 'getChemist?id=', 
    getChemistByCityId:healthcare.chemistsUrl+ 'getChemist?city_id=',
}

//Test APIs
export const extra={
    getspecializationbyid:health.healthcareUrl+'getSpecialization?id=',
    getspecialization:health.healthcareUrl+'getSpecialization',
    getApprovedSpecialization:health.approvedhealthcareUrl+'getSpecialization',
    addOrUpdatespecialization:health.healthcareUrl+'addOrUpdateSpecialization',
    deletespecialization:health.healthcareUrl+'deleteSpecialization',
    getDegreeById:health.healthcareUrl+'getDegree?id=',
    getDegrees:health.healthcareUrl+'getDegree',
    getApprovedDegrees:health.approvedhealthcareUrl+'getDegree',
    moderateDegree:health.healthcareUrl+'moderateDegree',
    moderateSpecialization:health.healthcareUrl+'moderateSpecialization',
    addOrUpdatedegree:health.healthcareUrl+'addOrUpdateDegree',
    deletedegree:health.healthcareUrl+'deleteDegree',
    approve:health.healthcareUrl+'approve',
    approvedelete:health.healthcareUrl+'approveDelete'


}

