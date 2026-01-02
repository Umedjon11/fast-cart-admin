import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { GetToken } from "../../utils/axios"
import { useNavigate } from "react-router"
import { useCategory } from "../store/categories"
import { Pen, Trash } from "lucide-react"
import * as Yup from 'yup';
import { useFormik } from "formik"

const Categories = () => {
  const [Search, setSeatch] = useState("")
  const { categories, isLoading, AddNewCategory, GetCategories, DeleteCategory, EditCategory } = useCategory((state: any) => state)
  const token = GetToken()
  const navigate = useNavigate()
  const [image, setImage] = useState("")
  const [idx, setIdx] = useState<null | number>(null)
  const [openModal, setOpenModal] = useState(false);
  
    const handleClickOpenModal = () => {
      setOpenModal(true);
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
      setImage("")
      resetForm()
    };

    const [openModalEdit, setOpenModalEdit] = useState(false);
  
    const handleClickOpenModalEdit = () => {
      setOpenModalEdit(true);
    };
  
    const handleCloseModalEdit = () => {
      setOpenModalEdit(false);
      setImage("")
      setIdx(null)
      resetForm()
    };

  const formSchema = Yup.object().shape({
    categoryName: Yup.string()
    .matches(/^[A-Z]/, "First letter must be Upper Case")
    .min(3, "Too Short")
    .max(100, "Too Long")
    .required("Fill category name")
  })

  const { setFieldValue, resetForm, handleChange, handleSubmit, errors, touched, values } = useFormik({
    initialValues: {
      categoryName: ""
    },
    validationSchema: formSchema,
    onSubmit: (values: any) => {
      if (idx) {
        const form = new FormData
      form.append("CategoryImage", values.categoryImage)
      form.append("CategoryName", values.categoryName)
      form.append("Id", idx+"")

      EditCategory(form)
      handleCloseModalEdit()
      } 
      else {
        const form = new FormData
        form.append("CategoryImage", values.categoryImage)
        form.append("CategoryName", values.categoryName)

        AddNewCategory(form)
        handleCloseModal()
      }
    }
  })

  const SetaImage = (e: any) => {
    const image = e.target.files[0]
    const reader = new FileReader
    reader.readAsDataURL(image)
    reader.onload = () => {
      const img =reader.result
      setImage(img + "")
    }
    setFieldValue("categoryImage", image)
  }
  
  useEffect(() => {
    if (token && token.length > 200) {
      GetCategories()
    }
    else {
      localStorage.clear()
      navigate("/")
    }
  }, [])

  return (
    <div className="flex flex-col gap-[3vh] items-start">

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Adding New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new category to this website, please enter category name here and choose a category image.
          </DialogContentText>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[2vh]" id="subscription-form">
            <img className="max-h-[30vh] max-w-[80%] m-[2vh_auto] rounded-2xl" src={image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQPQenKJTzexez3E1uN7qtSwZ8tgPQsVJ9DQ&s"} />
            <input type="file" className="border-b border-b-[#949494] pb-[1vh] text-[#646464]" onChange={SetaImage} />
            <TextField
              name="categoryName"
              onChange={handleChange}
              value={values.categoryName}
              autoFocus
              margin="dense"
              label="Category name"
              fullWidth
              variant="standard"
            />
            {errors.categoryName && touched.categoryName ? (<p className="text-[red] font-semibold text-[14px]">{errors.categoryName + ""}</p>) : null}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openModalEdit} onClose={handleCloseModalEdit}>
        <DialogTitle>Adding New Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Update category to this website, please enter category name here and choose a category image.
          </DialogContentText>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[2vh]" id="subscription-form">
            <img className="max-h-[30vh] max-w-[80%] m-[2vh_auto] rounded-2xl" src={image ? image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQPQenKJTzexez3E1uN7qtSwZ8tgPQsVJ9DQ&s"} />
            <input type="file" className="border-b border-b-[#949494] pb-[1vh] text-[#646464]" onChange={SetaImage} />
            <TextField
              name="categoryName"
              onChange={handleChange}
              value={values.categoryName}
              autoFocus
              margin="dense"
              label="Category name"
              fullWidth
              variant="standard"
            />
            {errors.categoryName && touched.categoryName ? (<p className="text-[red] font-semibold text-[14px]">{errors.categoryName + ""}</p>) : null}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalEdit}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <section className="flex justify-between items-center w-full">
        <TextField type="search" value={Search} onChange={(e) => {
          setSeatch(e.target.value)
        }} label="Search..." className="w-80" />
        <button onClick={handleClickOpenModal} className="text-white bg-[#2563EB] rounded-md p-[1vh_20px] cursor-pointer">+ Add new</button>
      </section>
      <section className="w-full flex gap-[3vh_2%] flex-wrap">
        {
          categories?.filter((cat: any) => cat.categoryName.includes(Search)).map((cat: any) => {
            return <div className="border h-[20vh] border-[#0000004D] w-[18%] rounded-2xl flex flex-col gap-[2vh] p-[2vh]" key={cat.id}>
              <div className="flex justify-between items-start">
                <img className="w-[70%] h-[10vh] rounded-2xl" src={`https://store-api.softclub.tj/images/${cat.categoryImage}`} />
                <div className="flex flex-col gap-[2vh]">
                  <Pen onClick={() => {
                    handleClickOpenModalEdit()
                    setIdx(cat.id)
                    setImage(`https://store-api.softclub.tj/images/${cat.categoryImage}`)
                    setFieldValue("categoryName", cat.categoryName)
                  }} className="text-[#2563EB] cursor-pointer mt-3" />
                  <Trash onClick={() => DeleteCategory(cat.id)} className="text-[red] cursor-pointer" />
                </div>
              </div>
              <h1 className="line-clamp-1 font-semibold">{cat.categoryName}</h1>
            </div>
          })
        }
      </section>
      {isLoading && (<CircularProgress className="m-[15vh_auto]" size={100} />)}
    </div>
  )
}

export default Categories