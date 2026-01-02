import { useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router"
import { GetToken } from "../../utils/axios"

const Other = () => {
  const token = GetToken()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (token && token.length < 200 || !token) {
      localStorage.clear()
      navigate("/")
    }
  }, [])
  return (
    <div className="flex flex-col gap-[8vh]">
      <header className="flex gap-5 items-center">
        <Link className={location.pathname == "/other" ? "p-[1vh_20px] rounded-md bg-[#DBEAFE] text-[#1D4ED8] font-semibold" : "p-[1vh_10px] rounded-md hover:bg-[#DBEAFE] hover:transition-all hover:duration-500 hover:text-[#1D4ED8] font-semibold"} to="/other">Categories</Link>
        <Link className={location.pathname == "/other/brands" ? "p-[1vh_20px] rounded-md bg-[#DBEAFE] text-[#1D4ED8] font-semibold" : "p-[1vh_10px] rounded-md hover:bg-[#DBEAFE] hover:transition-all hover:duration-500 hover:text-[#1D4ED8] font-semibold"} to="/other/brands">Brands</Link>
        <Link className={location.pathname == "/other/subcategory" ? "p-[1vh_20px] rounded-md bg-[#DBEAFE] text-[#1D4ED8] font-semibold" : "p-[1vh_10px] rounded-md hover:bg-[#DBEAFE] hover:transition-all hover:duration-500 hover:text-[#1D4ED8] font-semibold"} to="/other/subcategory">SubCategories</Link>
      </header>
      <Outlet />
    </div>
  )
}

export default Other