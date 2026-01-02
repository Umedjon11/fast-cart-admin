import { toast } from "react-toastify";
import { create } from "zustand";
import { Axios } from "../../utils/axios";



export const useSubCategories = create((set, get: any) => ({
    isLoading: true,
    subCategories: [],
    GetSubCategories: async () => {
        set(() => ({isLoading: true}))
        set(() => ({subCategories: []}))
        try {
            const { data } = await Axios.get("/SubCategory/get-sub-category")
            set(() => ({isLoading: false}))
            set(() => ({subCategories: data.data}))
        } catch (error: any) {
            toast.error(error.response.data.errors + "")
            set(() => ({isLoading: false}))
            set(() => ({subCategories: []}))
        }
    },
    DeleteSubCategory: async (id: number) => {
        try {
            await Axios.delete(`/SubCategory/delete-sub-category?id=${id}`)
            toast.success("Successfuly deleted!")
            get().GetSubCategories()
        } catch (error: any) {
            toast.error(error.response.data.errors+"")
        }
    },
    AddNewSubCategory: async (newSubCategory: { categoryId: number, subCategoryName: string }) => {
        try {
            await Axios.post(`/SubCategory/add-sub-category?CategoryId=${newSubCategory.categoryId}&SubCategoryName=${newSubCategory.subCategoryName}`)
            toast.success("Successfuly Created!")
            get().GetSubCategories()
        } catch (error: any) {
            toast.error(error.response.data.errors+"")
        }
    },
    EditSubCategory: async (subCategory: {subCategoryName: string, id: number, categoryId: number}) => {
        try {
            await Axios.put(`/SubCategory/update-sub-category?Id=${subCategory.id}&CategoryId=${subCategory.categoryId}&SubCategoryName=${subCategory.subCategoryName}`)
            toast.success("Successfuly Updated!")
            get().GetSubCategories()
        } catch (error: any) {
            toast.error(error.response.data.errors+"")
        }
    }
}))