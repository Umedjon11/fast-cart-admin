import { create } from "zustand";
import { Axios } from "../../utils/axios";
import { toast } from "react-toastify";


export const useColors = create((set, get: any) => ({
    colors: [],
    GetColors: async () => {
        set(() => ({colors: []}))
        try {
            const { data } = await Axios.get("/Color/get-colors")
            set(() => ({colors: data.data}))
        } catch (error) {
            set(() => ({colors: []}))
        }
    },
    AddNewColor: async (colorName: string) => {
        try {
            await Axios.post(`/Color/add-color?ColorName=%23${colorName.slice(1, -1)}`)
            toast.success("Successfuly added!")
            get().GetColors()
        } catch (error: any) {
            toast.error(error.response.data.errors+"!")
        }
    }
}))