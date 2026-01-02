import { toast } from "react-toastify";
import { create } from "zustand";
import { Axios } from "../../utils/axios";

export const useProducts = create((set, get: any) => ({
    isLoading: true,
    EditingProduct: {}, 
    products: [],
    GetProducts: async () => {
        set(() => ({isLoading: true}))
        set(() => ({products: []}))
        try {
            const { data } = await Axios.get("/Product/get-products")
            set(() => ({isLoading: false}))
            set(() => ({products: data.data.products}))
        } catch (error: any) {
            toast.error(error.response.data.errors+"")
            set(() => ({isLoading: false}))
            set(() => ({products: []}))
        }
    },
    DeleteProduct: async (id: number) => {
        try {
            await Axios.delete(`/Product/delete-product?id=${id}`)
            toast.success("Successfuly deleted!")
            get().GetProducts()
        } catch (error: any) {
            toast.error(error.response.data.errors+'')
        }
    },
    setEditingProduct: (product: any) => {
        set(() => ({EditingProduct: product}))
    }
}))