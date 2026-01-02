import { ChevronLeft } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useProducts } from "../store/products"
import { useEffect } from "react"
import { GetToken } from "../../utils/axios"
import { TextField } from "@mui/material"
import * as Yup from 'yup';
import { useFormik } from "formik"

const Detailproduct = () => {
  const { setEditingProduct, EditingProduct } = useProducts((state: any) => state)
  const navigate = useNavigate()
  const token = GetToken()
  
  const formSchema = Yup.object().shape({
    productName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Fill Product name!"),
    code: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Fill Code!"),
    description: Yup.string()
    .min(3, "Too Short!")
    .max(500, "Too Long!")
    .required("Fill Deescription!"),
  })

  const { handleSubmit, handleChange, setFieldValue, resetForm, values, errors, touched } = useFormik({
    initialValues: {
      productName: "",
      code: "",
      description: ""
    },
    validationSchema: formSchema,
    onSubmit: (values: any) => {
      if (Object.entries(EditingProduct).join("") != "" && EditingProduct.id) {
        console.log(1)
      }
      else {
        
      }
    }
  })

  useEffect(() => {
    if (token && token.length > 200) {
      //
    }
    else {
      navigate("/")
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[3vh] items-start">
        <div className="flex justify-between w-full">
          <Link onClick={() => {
            setEditingProduct({})
          }} className="flex gap-3 items-center font-bold text-xl" to="/products"><ChevronLeft /> Products / {Object.entries(EditingProduct).join("") != "" ? "Edit" : "Add new"}</Link>
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => {
              setEditingProduct({})
              navigate("/products")
            }} className="p-[1vh_20px] rounded-md border border-[#2563EB] text-[#2563EB] font-semibold cursor-pointer">Cancel</button>
            <button className="p-[1vh_20px] rounded-md border border-[#2563EB] bg-[#2563EB] text-[white] font-semibold cursor-pointer">{Object.entries(EditingProduct).join("") != "" ? "Update" : "Save"}</button>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <aside className="flex w-[48%] flex-col gap-[2vh]">
            <h1 className="text-xl font-bold">Information</h1>
            <div className="flex justify-between">
              <div className="w-[69%] flex flex-col gap-[2vh]">
                <TextField onChange={handleChange} name="productName" value={values.productName} className="w-full" label="Product name" />
                {errors.productName && touched.productName ? (<p className="text-[red] font-semibold text-[14px]">{errors.productName + ""}</p>) : null}
              </div>
              <div className="w-[29%] flex flex-col gap-[2vh]">
                <TextField onChange={handleChange} name="code" value={values.code} className="w-full" label="Code" />
              {errors.code && touched.code ? (<p className="text-[red] font-semibold text-[14px]">{errors.code + ""}</p>) : null}
              </div>
            </div>
            <TextField fullWidth label="Description" multiline />
            {errors.code && touched.code ? (<p className="text-[red] font-semibold text-[14px]">{errors.code + ""}</p>) : null}
          </aside>
        </div>
    </form>
  )
}

export default Detailproduct