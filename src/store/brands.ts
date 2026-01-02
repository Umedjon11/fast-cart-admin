import { toast } from "react-toastify";
import { create } from "zustand";
import { Axios } from "../../utils/axios";



export const useBrands = create((set, get: any) => ({
    isLoading: true,
    brands: [],
    GetBrands: async () => {
        set(() => ({isLoading: true}))
        set(() => ({brands: []}))
        try {
            const { data } = await Axios.get("/Brand/get-brands")
            set(() => ({isLoading: false}))
            set(() => ({brands: data.data}))
        } catch (error: any) {
            toast.error(error.response.data.errors + "")
            set(() => ({isLoading: false}))
            set(() => ({brands: []}))
        }
    },
    DeleteBrand: async (id: number) => {
        try {
            await Axios.delete(`/Brand/delete-brand?id=${id}`)
            toast.success("Successfuly deleted!")
            get().GetBrands()
        } catch (error: any) {
            toast.error(error.response.data.errors+"")
        }
    },
    AddNewBrand: async (name: string) => {
        try {
            await Axios.post(`/Brand/add-brand?BrandName=${name}`)
            toast.success("Successfuly Created!")
            get().GetBrands()
        } catch (error: any) {
            toast.error(error.response.data.errors+"")
        }
    },
    EditBrand: async (brand: {brandName: string, id: number}) => {
        try {
            await Axios.put(`/Brand/update-brand?Id=${brand.id}&BrandName=${brand.brandName}`)
            toast.success("Successfuly Updated!")
            get().GetBrands()
        } catch (error: any) {
            toast.error(error.response.data.errors+"")
        }
    }
}))