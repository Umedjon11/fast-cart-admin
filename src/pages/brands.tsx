import { useNavigate } from "react-router"
import { GetToken } from "../../utils/axios"
import { useEffect, useState } from "react"
import { useBrands } from "../store/brands"
import { CircularProgress, TextField } from "@mui/material"
import { Pen, Trash } from "lucide-react"
import * as Yup from 'yup';
import { useFormik } from "formik"

const Brands = () => {
  const navigate = useNavigate()
  const token = GetToken()
  const [search, setSearch] = useState("")
  const { isLoading, brands, GetBrands, DeleteBrand, AddNewBrand, EditBrand } = useBrands((state: any) => state)
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState<null | number>(null)

  const formSchema = Yup.object().shape({
    brandName: Yup.string()
    .matches(/^[A-Z]/, "First letter must be Upper Case!")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Fill Brand name!")
  })

  const { resetForm, setFieldValue, handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      brandName: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      if (idx) {
        EditBrand({...values, id: idx})
        setOpen(false)
        setIdx(null)
        resetForm()
      }
      else {
        AddNewBrand(values.brandName)
        resetForm()
      }
    } 
  })

  useEffect(() => {
    if (token && token.length > 200) {
      GetBrands()
    }
    else {
      localStorage.clear()
      navigate("/")
    }
  }, [])

  return (
    <div className="flex flex-col gap-[3vh] items-start">
      <TextField value={search} onChange={(e) => setSearch(e.target.value)} className="w-80" type="Search..." label="Search" />
      <div className="flex w-full justify-between items-start gap-[3vh]">
        <table className="text-start w-[48%]">
          <thead className="border-b-2 border-b-[#ECEFF7] text-[#979CAF]">
            <tr>
              <th className="text-start pb-[1vh]">Brands</th>
              <th className="text-start pb-[1vh]">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              brands?.filter((brand: any) => brand.brandName.includes(search)).map((brand: any) => {
                return <tr className="border-b border-b-[#E9ECF5]" key={brand.id}>
                  <td className="font-semibold">{brand.brandName}</td>
                  <td>
                    <div className="flex p-[2vh_0] gap-3 items-center">
                      <Pen onClick={() => {
                        setIdx(brand.id)
                        setOpen(true)
                        setFieldValue("brandName", brand.brandName)
                      }} className="text-[#1E5EFF] cursor-pointer" />
                      <Trash onClick={() => DeleteBrand(brand.id)} className="text-[red] cursor-pointer" />
                    </div>
                  </td>
                </tr>
              })
            }
            {isLoading && (<CircularProgress className="m-[5vh_48%]" size={80} />)}
          </tbody>
        </table>
        {!open && (
          <form onSubmit={handleSubmit} className="flex flex-col w-[46%] border-2 border-[#E5E5E5] rounded-xl p-[3vh_2%] gap-[3vh]">
            <h1 className="text-2xl font-bold">Add new brand</h1>
            <TextField name="brandName" onChange={handleChange} value={values.brandName} label="Brand name" />
            {errors.brandName && touched.brandName ? (<p className="text-[red] font-semibold text-[14px]">{errors.brandName}</p>) : null}
            <button className="p-[1vh_20px] rounded-md bg-[#2563EB] text-white ml-auto font-semibold cursor-pointer">Create</button>
          </form>
        )}
        {open && (
          <form onSubmit={handleSubmit} className="flex flex-col w-[46%] border-2 border-[#E5E5E5] rounded-xl p-[3vh_2%] gap-[3vh]">
            <h1 className="text-2xl font-bold">Update brand</h1>
            <TextField name="brandName" onChange={handleChange} value={values.brandName} label="Brand name" />
            {errors.brandName && touched.brandName ? (<p className="text-[red] font-semibold text-[14px]">{errors.brandName}</p>) : null}
            <div className="flex gap-3 ml-auto">
              <button type="button" onClick={() => {
                setIdx(null)
                setOpen(false)
                resetForm()
              }} className="p-[1vh_20px] rounded-md bg-[red] text-white ml-auto font-semibold cursor-pointer">Cancel</button>
              <button className="p-[1vh_20px] rounded-md bg-[#2563EB] text-white ml-auto font-semibold cursor-pointer">Update</button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Brands