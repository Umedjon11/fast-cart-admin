import { useNavigate } from "react-router"
import { GetToken } from "../../utils/axios"
import { useEffect, useState } from "react"
import { CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { Pen, Trash } from "lucide-react"
import * as Yup from 'yup';
import { useFormik } from "formik"
import { useCategory } from "../store/categories"
import { useSubCategories } from "../store/subcategories"

const SubCategory = () => {
  const navigate = useNavigate()
  const token = GetToken()
  const [Search, setSearch] = useState("")
  const { isLoading, subCategories, GetSubCategories, DeleteSubCategory, AddNewSubCategory, EditSubCategory } = useSubCategories((state: any) => state)
  const [open, setOpen] = useState(false)
  const [idx, setIdx] = useState<null | number>(null)
  const { GetCategories, categories } = useCategory((state: any) => state)

  const formSchema = Yup.object().shape({
    subCategoryName: Yup.string()
    .matches(/^[A-Z]/, "First letter must be Upper Case!")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Fill Brand name!"),
    categoryId: Yup.string()
    .required("Choose a Category for your subCategory!")
  })

  const { resetForm, setFieldValue, handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      subCategoryName: "",
      categoryId: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      if (idx) {
        EditSubCategory({...values, id: idx})
        setOpen(false)
        setIdx(null)
        resetForm()
      }
      else {
        AddNewSubCategory(values)
        resetForm()
      }
    } 
  })

  useEffect(() => {
    if (token && token.length > 200) {
      GetSubCategories()
      GetCategories()
    }
    else {
      localStorage.clear()
        navigate("/")
    }
  }, [])

  return (
      <div className="flex flex-col gap-[3vh] items-start">
        <TextField label="Search..." className="w-80" value={Search} onChange={(e) => setSearch(e.target.value)} type="search" />
        <div className="flex w-full justify-between items-start gap-[3vh]">
          <table className="text-start w-[48%]">
            <thead className="border-b-2 border-b-[#ECEFF7] text-[#979CAF]">
              <tr>
                <th className="text-start pb-[1vh]">SubCategories</th>
                <th className="text-start pb-[1vh]">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                subCategories?.filter((subCategory: any) => subCategory.subCategoryName.includes(Search)).map((subCategory: any) => {
                  return <tr className="border-b border-b-[#E9ECF5]" key={subCategory.id}>
                    <td className="font-semibold">{subCategory.subCategoryName}</td>
                    <td>
                      <div className="flex p-[2vh_0] gap-3 items-center">
                        <Pen onClick={() => {
                          setIdx(subCategory.id)
                          setOpen(true)
                          setFieldValue("subCategoryName", subCategory.subCategoryName)
                        }} className="text-[#1E5EFF] cursor-pointer" />
                        <Trash onClick={() => DeleteSubCategory(subCategory.id)} className="text-[red] cursor-pointer" />
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
              <h1 className="text-2xl font-bold">Add new SubCategory</h1>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.categoryId}
                  label="category"
                  name="categoryId"
                  onChange={handleChange}
                >
                  {
                    categories?.map((category: any) => {
                      return <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
              {errors.categoryId && touched.categoryId ? (<p className="text-[red] font-semibold text-[14px]">{errors.categoryId}</p>) : null}
              <TextField name="subCategoryName" onChange={handleChange} value={values.subCategoryName} label="SubCategory name" />
              {errors.subCategoryName && touched.subCategoryName ? (<p className="text-[red] font-semibold text-[14px]">{errors.subCategoryName}</p>) : null}
              <button className="p-[1vh_20px] rounded-md bg-[#2563EB] text-white ml-auto font-semibold cursor-pointer">Create</button>
            </form>
          )}
          {open && (
            <form onSubmit={handleSubmit} className="flex flex-col w-[46%] border-2 border-[#E5E5E5] rounded-xl p-[3vh_2%] gap-[3vh]">
              <h1 className="text-2xl font-bold">Update SubCategory</h1>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={values.categoryId}
                  label="category"
                  name="categoryId"
                  onChange={handleChange}
                >
                  {
                    categories?.map((category: any) => {
                      return <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                    })
                  }
                </Select>
              </FormControl>
              {errors.categoryId && touched.categoryId ? (<p className="text-[red] font-semibold text-[14px]">{errors.categoryId}</p>) : null}
              <TextField name="subCategoryName" onChange={handleChange} value={values.subCategoryName} label="SubCategory name" />
              {errors.subCategoryName && touched.subCategoryName ? (<p className="text-[red] font-semibold text-[14px]">{errors.subCategoryName}</p>) : null}
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

export default SubCategory