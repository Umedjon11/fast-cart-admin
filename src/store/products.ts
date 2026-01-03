import { toast } from "react-toastify";
import { create } from "zustand";
import { Axios } from "../../utils/axios";

export const useProducts = create((set, get: any) => ({
    isLoading: true,
    EditingProduct: {},
    products: [],
    GetProducts: async () => {
        set(() => ({ isLoading: true }))
        set(() => ({ products: [] }))
        try {
            const { data } = await Axios.get("/Product/get-products")
            set(() => ({ isLoading: false }))
            set(() => ({ products: data.data.products }))
        } catch (error: any) {
            toast.error(error.response.data.errors + "")
            set(() => ({ isLoading: false }))
            set(() => ({ products: [] }))
        }
    },
    DeleteProduct: async (id: number) => {
        try {
            await Axios.delete(`/Product/delete-product?id=${id}`)
            toast.success("Successfuly deleted!")
            get().GetProducts()
        } catch (error: any) {
            toast.error(error.response.data.errors + '')
        }
    },
    setEditingProduct: (product: any) => {
        set(() => ({ EditingProduct: product }))
    },
    AddNewProduct: async (product: FormData) => {
        try {
            await Axios.post("/Product/add-product", product)
            toast.success("Successfuly added!")
        } catch (error: any) {
            toast.error(error.response.data.errors + "")
        }
    },
    EditProduct: async (Product: any) => {
        try {
            await Axios.put(`/Product/update-product?Id=${Product.id}&BrandId=${Product.brandId}&ColorId=${Product.colorId}&ProductName=${Product.productName}&Description=${Product.description}&Quantity=${Product.quantity}&Weight=${Product.weight}&Size=${Product.size}&Code=${Product.code}&Price=${Product.price}&HasDiscount=${Product.discount != ""}${Product.discount != "" ? `&DiscountPrice=${Product.discount}` : ""}&SubCategoryId=${Product.subCategoryId}`)
            toast.success("Successfuly Updated!")
        } catch (error: any) {
            toast.error(error.response.data.errors + "")
        }
    }
}))