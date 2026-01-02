import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useProducts } from "../store/products"
import { GetToken } from "../../utils/axios"
import { useNavigate } from "react-router"
import { Pen, Trash } from "lucide-react"

const Prodcuts = () => {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const { isLoading, products, GetProducts, DeleteProduct, setEditingProduct } = useProducts((state: any) => state)
  const token = GetToken()
  const navigate = useNavigate()
  
  useEffect(() => {
    if (token && token.length > 200) {
      GetProducts()
    }
    else {
      localStorage.clear()
      navigate("/")
    }
  }, [])

  return (
    <div className="flex flex-col gap-[3vh] items-start">
      <section className="flex justify-between w-full items-center">
        <h1 className="font-bold text-4xl text-[#111927]">Products</h1>
        <button onClick={() => {
          setEditingProduct({})
          navigate("/detailproduct")
        }} className="cursor-pointer p-[1.5vh_20px] rounded-md bg-[#2563EB] text-white font-semibold">+ Add Product</button>
      </section>
      <section className="flex gap-3">
        <TextField value={search} onChange={(e) => setSearch(e.target.value)} type="search" className="w-80" label="Search..." />
        <FormControl className="w-50">
        <InputLabel id="demo-simple-select-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="with">with Discount</MenuItem>
          <MenuItem value="whitOut">WithOut Discount</MenuItem>
        </Select>
      </FormControl>
      </section>
      <table className="text-start w-full">
        <thead>
          <tr className="border-b-2 border-b-[#D7DBEC]">
            <th className="text-start pb-[2vh]">Image</th>
            <th className="text-start pb-[2vh]">Name</th>
            <th className="text-start pb-[2vh]">color</th>
            <th className="text-start pb-[2vh]">Price</th>
            <th className="text-start pb-[2vh]">Discount</th>
            <th className="text-start pb-[2vh]">Discount price</th>
            <th className="text-start pb-[2vh]">Category</th>
            <th className="text-start pb-[2vh]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            products?.filter((product: any) => product.productName.toUpperCase().includes(search.toUpperCase()) && product.hasDiscount && filter == "with" || product.productName.toUpperCase().includes(search.toUpperCase()) && !product.hasDiscount && filter == "withOut" || product.productName.toUpperCase().includes(search.toUpperCase()) && filter == "all")
            .map((product: any) => {
              return <tr key={product.id} className="border-b border-b-[#D7DBEC]">
                <td className="p-[2vh_0] rounded-2xl"><img className="w-15 h-15" src={`https://store-api.softclub.tj/images/${product.image}`} /></td>
                <td className="font-bold">{product.productName}</td>
                <td className="font-semibold"><div className={`rounded-full w-7 h-7 bg-[${product.color}]`}></div></td>
                <td className="font-semibold">${product.price}</td>
                <td className="font-semibold">{product.hasDiscount? (<p className="text-[lime] w-fit p-[1vh_15px] rounded-md bg-[#00ff0034]">With discount</p>) : (<p className="text-[#F99600] w-fit p-[1vh_15px] rounded-md bg-[#f995004b]">WithOut discount</p>)}</td>
                <td className="font-semibold">{product.hasDiscount ? "$"+product.discountPrice : "---"}</td>
                <td className="font-semibold">{product.categoryName}</td>
                <td>
                  <div className="flex items-center gap-5">
                    <Trash onClick={() => DeleteProduct(product.id)} className="text-[red] cursor-pointer" />
                    <Pen onClick={() => {
                      setEditingProduct(product)
                      navigate("/detailproduct")
                    }} className="text-[#00bfff] cursor-pointer" />
                  </div>
                </td>
              </tr>
            })
          }
          {isLoading && (<CircularProgress className="m-[10vh_240%]" size={100} />)}
        </tbody>
      </table>
    </div>
  )
}

export default Prodcuts