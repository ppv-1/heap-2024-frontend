import { ProtectedAPI } from './ProtectedAPI';
import { API } from './API';

class OrganisationService{
    async getAllOrgs(){
        return await API.get(`/organisation/all`);
    }

    async getOrg(orgId){
        return await API.get(`/organisation/get/${orgId}`);
    }

    async getOrgEvents(orgId){
        return await ProtectedAPI.get(`/organisation/events/${orgId}`);
    }

    async updateOrganisation(org){
        return await ProtectedAPI.put(`/organisation/updateDetails`, org);
    }

}

export default new OrganisationService()