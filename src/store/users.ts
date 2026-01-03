import { create } from 'zustand'
import { Axios } from '../../utils/axios'
import { toast } from 'react-toastify'



export const useUsers = create((set, get: any) => ({
    isLoading: true,
    usersList: [],
    GetUsers: async (name: string) => {
        set(() => ({usersList: []}))
        set(() => ({isLoading: true}))
        try {
            const { data } = await Axios.get(`/UserProfile/get-user-profiles${name != "" ? `?UserName=${name}` : ""}`)
            set(() => ({usersList: data.data}))
            set(() => ({isLoading: false}))
        } catch (error: any) {
            toast.error(error.response.data.errors+"")
            set(() => ({usersList: []}))
            set(() => ({isLoading: false}))
        }
    },
    AddRole: async (id: any) => {
        try {
            await Axios.post(`/UserProfile/addrole-from-user?UserId=${id}&RoleId=c075589d-649e-4cbc-8e79-ddf54d81f7a5`)
            toast.success("Successfuly Added!")
            get().GetUsers()
        } catch (error: any) {
            toast.error(error.response.data.errors + "")
        }
    },
    RemoveRole: async (id: any) => {
        try {
            await Axios.delete(`/UserProfile/remove-role-from-user?UserId=${id}&RoleId=c075589d-649e-4cbc-8e79-ddf54d81f7a5`)
            toast.success("Successfuly Added!")
            get().GetUsers()
        } catch (error: any) {
            toast.error(error.response.data.errors + "")
        }
    }
}))