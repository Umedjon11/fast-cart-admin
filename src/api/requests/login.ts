import axios from "axios"
import { toast } from "react-toastify"
import { Axios, SetToken } from './../../../utils/axios';


export const LogIn = async (acount: {userName: string, password: string}) => {
    try {
        const { data } = await axios.post("https://store-api.softclub.tj/Account/login", acount)
        SetToken(data.data)
        localStorage.setItem("name", acount.userName)
        return data.data
    } catch (error: any) {
        toast.error(error.response.data.errors+"")
    }
}

export const isAdmin = async () => {
    try {
        const { data } = await Axios.get("/UserProfile/get-user-roles")
        return data.data.some((role: {id: string, name: string}) => role.id == "5934caf4-3e67-4b36-8296-aae189edfd90")
    } catch (error: any) {
        toast.error(error.response.data.errors+"")
    }
}