import { ProtectedAPI } from "./ProtectedAPI";

class ComplaintService{

    async createComplaint(complaint){
        return await ProtectedAPI.post(`/complaint/create`, complaint);
    }

    async getAllComplaints(){
        return await ProtectedAPI.get(`/complaint/all`);
    }

    async getComplaint(complaintId){
        return await ProtectedAPI.get(`/complaint/get/${complaintId}`);
    }

    async updateComplaint(complaintId, complaint){
        return await ProtectedAPI.put(`/complaint/update/${complaintId}`, complaint);
    }

    async deleteComplaint(complaintId){
        return await ProtectedAPI.delete(`/complaint/delete/${complaintId}`);
    }

    async resolveComplaint(complaintId){
        return await ProtectedAPI.get(`/complaint/resolve/${complaintId}`);
    }

}

export default new ComplaintService();