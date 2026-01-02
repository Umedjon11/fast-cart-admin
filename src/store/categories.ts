import { toast } from "react-toastify";
import { create } from "zustand";
import { Axios } from "../../utils/axios";


export const useCategory = create((set, get: any) => ({
    isLoading: true,
    categories: [],
    GetCategories: async () => {
        set(() => ({isLoading: true}))
        set(() => ({categories: []}))
        try {
            const { data } = await Axios.get("/Category/get-categories")
            set(() => ({isLoading: false}))
            set(() => ({categories: data.data}))
        } catch (error: any) {
            set(() => ({isLoading: false}))
            set(() => ({categories: []}))
            toast.error(error.response.data.errors+"")
        }
    },
    AddNewCategory: async (newCat: FormData) => {
        try {
            await Axios.post("/Category/add-category", newCat)
            toast.success("Successfuly Added!")
            get().GetCategories()
        } catch (error: any) {
            toast.error(error.response.data.errors+"!")
        }
    }
}))