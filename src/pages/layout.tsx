import { Link, Outlet, useLocation, useNavigate } from "react-router"
import { GetToken } from "../../utils/axios"
import { useEffect, useState } from "react"
import Logo from '../assets/Logo.png'
import { Bell, ChevronDown, ChevronUp, Folder, Home, List, Search, Tag } from "lucide-react"
import { Menu, MenuItem } from "@mui/material"

const Layout = () => {
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const token = GetToken()
  const navigate = useNavigate()
  const name = localStorage.getItem("name")

  useEffect(() => {
    if (token && token.length < 200 || !token) {
      localStorage.clear()
      navigate("/")
    }
  }, [])

  return (
    <div>
      {location.pathname == "/" && (<Outlet />)}
      {location.pathname != "/" && (
        <div className="flex flex-col">
          <header className="bg-[#1C2536] fixed text-white p-[2vh_3%] w-full flex justify-between">
            <div className="flex gap-28 items-center">
              <img className="w-41.5 h-11" src={Logo} />
              <div className="flex gap-4 items-center">
                <Search />
                <input placeholder="Search..." className="outline-0" />
              </div>
            </div>
            <div className="flex items-center gap-8">
              <Bell />
              <div className="flex items-center gap-3">
                <div className="bg-[#00b7ff] p-[8px_15px] font-semibold rounded-full">{name ? name[0] : "A"}</div>
                <h1 className="font-semibold text-[15px]">{name}</h1>
              </div>
              <button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {open ? <ChevronUp /> : <ChevronDown />}
              </button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    'aria-labelledby': 'basic-button',
                  },
                }}
              >
                <MenuItem onClick={() => {
                  handleClose()
                  localStorage.clear()
                  navigate("/")
                }}>Log out</MenuItem>
              </Menu>
            </div>
          </header>
          <main className="flex justify-between mt-[10vh]">
            <section className="w-[20%] p-[5vh_2%] h-[90vh] fixed text-white bg-[#1C2536] flex flex-col gap-[2vh]">
              <Link to="/dashboard" className={location.pathname == "/dashboard" ? "flex items-center gap-4 text-[#5A607F] p-[2vh_20px] bg-white rounded-md" : "hover:bg-white hover:text-[#5A607F] hover:transition-all hover:duration-700 flex items-center gap-4 p-[2vh_20px] rounded-md"}><Home /> Dashboard</Link>
              <Link to="/users" className={location.pathname == "/users" ? "flex items-center gap-4 text-[#5A607F] p-[2vh_20px] bg-white rounded-md" : "hover:bg-white hover:text-[#5A607F] hover:transition-all hover:duration-700 flex items-center gap-4 p-[2vh_20px] rounded-md"}><List /> Users</Link>
              <Link to="/products" className={location.pathname == "/products" || location.pathname == "/detailproduct" ? "flex items-center gap-4 text-[#5A607F] p-[2vh_20px] bg-white rounded-md" : "hover:bg-white hover:text-[#5A607F] hover:transition-all hover:duration-700 flex items-center gap-4 p-[2vh_20px] rounded-md"}><Tag /> Products</Link>
              <Link to="/other" className={location.pathname == "/other" || location.pathname == "/other/brands" || location.pathname == "/other/subcategory" ? "flex items-center gap-4 text-[#5A607F] p-[2vh_20px] bg-white rounded-md" : "hover:bg-white hover:text-[#5A607F] hover:transition-all hover:duration-700 flex items-center gap-4 p-[2vh_20px] rounded-md"}><Folder /> Other</Link>
            </section>
            <section className="w-[78%] ml-[22%] pr-[2%] pb-[5vh] pt-[5vh]">
              <Outlet />
            </section>
          </main>
        </div>
      )}
    </div>
  )
}

export default Layout