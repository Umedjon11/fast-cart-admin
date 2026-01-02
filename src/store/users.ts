import { create } from 'zustand'
import { Axios } from '../../utils/axios'
import { toast } from 'react-toastify'



export const useUsers = create((set) => ({
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
    }
}))