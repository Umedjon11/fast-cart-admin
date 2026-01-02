import { CircularProgress } from "@mui/material"
import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./pages/layout"

const Login = lazy(() => import("./pages/login"))
const Dashboard = lazy(() => import("./pages/dashboard"))
const Users = lazy(() => import("./pages/users"))
const Products = lazy(() => import("./pages/prodcuts"))
const Detailproduct = lazy(() => import("./pages/detailproduct"))
const Other = lazy(() => import("./pages/other"))
const Categories = lazy(() => import("./pages/categories"))
const Brands = lazy(() => import("./pages/brands"))
const SubCategory = lazy(() => import("./pages/subCategory"))

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress className="m-[30vh_43%]" size={200} />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/detailproduct" element={<Detailproduct />} />
            <Route path="/other" element={<Other />}>
              <Route index element={<Categories />} />
              <Route path="/other/brands" element={<Brands />} />
              <Route path="/other/subcategory" element={<SubCategory />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
