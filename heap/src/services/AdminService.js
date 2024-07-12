import { ProtectedAPI } from './ProtectedAPI';

class AdminService {
    async verifyOrg(orgId) {
        return await ProtectedAPI.get(`/admin/verify/${orgId}`);
    }

    async blacklistUser(id) {
        return await ProtectedAPI.get(`/admin/blacklist/${id}`);
    }

    async whitelistUser(id) {
        return await ProtectedAPI.get(`/admin/whitelist/${id}`);
    }

    async deleteUser(id) {
        return await ProtectedAPI.get(`/admin/delete/${id}`);
    }

    async getAllVolunteers() {
        return await ProtectedAPI.get(`/admin/all-volunteers`);
    }

    async getAllOrganisations() {
        return await ProtectedAPI.get(`/admin/all-organisation`);
    }
}

export default new AdminService();
