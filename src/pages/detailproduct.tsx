import { Check, ChevronLeft } from "lucide-react"
import { Link, useNavigate } from "react-router"
import { useProducts } from "../store/products"
import { useEffect, useState } from "react"
import { GetToken } from "../../utils/axios"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material"
import * as Yup from 'yup';
import { useFormik } from "formik"

import { useSubCategories } from "../store/subcategories"
import { useBrands } from "../store/brands"
import { useColors } from "../store/colors"

const Detailproduct = () => {
  const { setEditingProduct, EditingProduct, AddNewProduct, EditProduct } = useProducts((state: any) => state)
  const { subCategories, GetSubCategories } = useSubCategories((state: any) => state)
  const { brands, GetBrands } = useBrands((state: any) => state)
  const { colors, GetColors, AddNewColor } = useColors((state: any) => state)
  const navigate = useNavigate()
  const token = GetToken()
  const [images, setImages] = useState<any>([])
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState<any>("#000000")
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setColor("#000000")
  };

  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  
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
    subCategoryId: Yup.string()
    .required("Choose Category!"),
    brandId: Yup.string()
    .required("Choose Brand!"),
    price: Yup.number()
    .min(10, "Too Small!")
    .max(10000, "Too Big!")
    .required("Fill product price!"),
    discount: Yup.number()
    .min(1, "Too Small!")
    .max(100, "Too Big!"),
    quantity: Yup.number()
    .min(1, "Too Small!")
    .max(10000, "Too Big!")
    .required("Fill product quantity!"),
    weigth: Yup.string()
    .min(1, "Too Small!")
    .max(10, "Too Big!"),
    size: Yup.string()
    .min(1, "Too Small!")
    .max(10, "Too Big!"),
    colorId: Yup.string()
    .required("Chooose Color!")
  })

  const { handleSubmit, handleChange, setFieldValue, resetForm, values, errors, touched } = useFormik({
    initialValues: {
      productName: EditingProduct.productName ? EditingProduct.productName : "",
      code: EditingProduct.code ? EditingProduct.code : "",
      description: EditingProduct.description ? EditingProduct.description : "",
      subCategoryId: "",
      brandId: "",
      price: EditingProduct.price ? EditingProduct.price : "",
      discount: EditingProduct.discountPrice ? EditingProduct.discountPrice : "",
      quantity: EditingProduct.quantity ? EditingProduct.quantity : "",
      weight: "",
      size: "",
      colorId: EditingProduct.color ? colors?.map((color: any) => {
        if (color.colorName == EditingProduct.color) {
          return color.id
        }
      }) : ""
    },
    validationSchema: formSchema,
    onSubmit: (values: any) => {
      if (Object.entries(EditingProduct).join("") != "" && EditingProduct.id) {
        EditProduct({...values, id: EditingProduct?.id})
        navigate("/products")
        resetForm()
      }
      else {
        const form = new FormData
        const imagess = values.images
        for (let i = 0;i<imagess.length;i++) {
          form.append("Images", imagess[i])
        }
        form.append("BrandId", values.brandId)
        form.append("ColorId", values.colorId)
        form.append("ProductName", values.productName)
        form.append("Description", values.description)
        form.append("Quatity", values.quantity)
        form.append("Weight", values.weight)
        form.append("Size", values.size)
        form.append("Code", values.code)
        form.append("Price", values.price)
        const HasDiscount = values.discout != ""
        form.append("HasDiscount", HasDiscount + "")
        form.append("DiscountPrice", values.discount)
        form.append("SubCategoryID", values.subCategoryId)

        AddNewProduct(form)
        navigate("/products")
        resetForm()
      }
    }
  })

  const setImage = (e: any) => {
    const imgs = e.target.files
    setImages([])
    
    for(let i = 0;i<imgs.length;i++) {
      const reader = new FileReader
      reader.readAsDataURL(imgs[i])

      reader.onload = () => {
        const img = reader.result
        if (img) {
          setImages([...images, img])
        }
      }
    }
    setFieldValue("images", imgs)
  }

  useEffect(() => {
    if (token && token.length > 200) {
      GetSubCategories()
      GetBrands()
      GetColors()
      if (EditingProduct.image) {
        setImages(["https://store-api.softclub.tj/images/"+EditingProduct.image])
      }
    }
    else {
      navigate("/")
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[3vh] items-start">

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adding new color</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <form className="flex gap-6" onSubmit={(e: any) => {
            e.preventDefault()
            console.log(color)
            AddNewColor(color+"")
          }} id="subscription-form">
            <TextField value={color} onChange={(e) => setColor(e.target.value)} className="w-20" type="color" />
            <TextField
              autoFocus
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
              label="Color"
              type="text"
              className="w-80"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Create
          </Button>
        </DialogActions>
      </Dialog>

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
            <TextField name="description" onChange={handleChange} value={values.description} fullWidth label="Description" multiline />
            {errors.description && touched.description ? (<p className="text-[red] font-semibold text-[14px]">{errors.description + ""}</p>) : null}
            <div className="flex justify-between w-full">
              <div className="w-[49%] flex flex-col gap-[2vh]">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">subCategoryId</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="subCategoryId"
                    value={values.subCategoryId}
                    label="subCategory"
                    onChange={handleChange}
                  >
                    {
                      subCategories?.map((sub: any) => {
                        return <MenuItem key={sub.id} value={sub.id}>{sub.subCategoryName}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                {errors.subCategoryId && touched.subCategoryId ? (<p className="text-[red] font-semibold text-[14px]">{errors.subCategoryId + ""}</p>) : null}
              </div>
              <div className="w-[49%] flex flex-col gap-[2vh]">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="brandId"
                    value={values.brandId}
                    label="Brand"
                    onChange={handleChange}
                  >
                    {
                      brands?.map((brand: any) => {
                        return <MenuItem key={brand.id} value={brand.id}>{brand.brandName}</MenuItem>
                      })
                    }
                  </Select>
                </FormControl>
                {errors.brandId && touched.brandId ? (<p className="text-[red] font-semibold text-[14px]">{errors.brandId + ""}</p>) : null}
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex w-[32%] flex-col gap-[2vh]">
                <TextField name="price" onChange={handleChange} value={values.price} type="number" fullWidth label="Price" />
                {errors.price && touched.price ? (<p className="text-[red] font-semibold text-[14px]">{errors.price + ""}</p>) : null}
              </div>
              <div className="flex w-[32%] flex-col gap-[2vh]">
                <TextField name="discount" onChange={handleChange} value={values.discount} type="number" fullWidth label="Discount" />
                {errors.discount && touched.discount ? (<p className="text-[red] font-semibold text-[14px]">{errors.discount + ""}</p>) : null}
              </div>
              <div className="flex w-[32%] flex-col gap-[2vh]">
                <TextField name="quantity" onChange={handleChange} value={values.quantity} type="number" fullWidth label="Quantity" />
                {errors.quantity && touched.quantity ? (<p className="text-[red] font-semibold text-[14px]">{errors.quantity + ""}</p>) : null}
              </div>
            </div>
            <div className="flex p-[2vh_2%] rounded-md border border-[#E5E5E5] w-full justify-between items-center">
              <div className="flex flex-col gap-[1vh]">
                <h2 className="font-semibold">Different Options</h2>
                <p className="text-[#737373]">This product has multiple options</p>
              </div>
              <Switch
                checked={checked}
                onChange={handleCheck}
                slotProps={{ input: { 'aria-label': 'controlled' } }}
              />
            </div>
            {checked && (
              <div className="flex mt-[3vh] flex-col w-full gap-[3vh]">
                <h1 className="font-bold">Options</h1>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-[2vh] w-[49%]">
                    <TextField value={values.weight} onChange={handleChange} name="weight" label="Weight" />
                    {errors.weight && touched.weight ? (<p className="text-[red] font-semibold text-[14px]">{errors.weight + ""}</p>) : null}
                  </div>
                  <div className="flex flex-col gap-[2vh] w-[49%]">
                    <TextField value={values.size} onChange={handleChange} name="size" label="Size" />
                    {errors.size && touched.size ? (<p className="text-[red] font-semibold text-[14px]">{errors.size + ""}</p>) : null}
                  </div>
                </div>
              </div>
            )}
          </aside>
          <aside className="flex flex-col gap-[2vh] w-[49%]">
            <div className="flex flex-col border gap-[3vh] border-[#D9E1EC] rounded-md p-[2vh_5%]">
              <aside className="flex justify-between items-center">
                <h1 className="font-bold">Colour:</h1>
                <Button onClick={handleClickOpen}><Check /> Create New</Button>
              </aside>
              <aside className="flex gap-[2vh_3%] flex-wrap">
                {
                  colors.map((color: any) => {
                    return <button onClick={() => setFieldValue("colorId", color.id)} key={color.id} className={`w-6 h-6 cursor-pointer rounded-full bg-[${color.colorName}] ${values.colorId == color.id ? "border-2 border-[#1E5EFF]" : ""}`}></button>
                  })
                }
              </aside>
            </div>
            {Object.entries(EditingProduct).join("") == "" && (
              <h1 className="font-bold mt-[3vh]">Images</h1>
            )}
            {Object.entries(EditingProduct).join("") == "" && (
              <input onChange={setImage} className="border border-[#C4C4C4] p-[2vh_20px] rounded-md" type="file" multiple />
            )}
            {Object.entries(EditingProduct).join("") == "" && (
              <div className="flex flex-col border gap-[3vh] border-[#D9E1EC] rounded-md p-[2vh_5%]">
              {
                images?.map((image: any) => {
                  return <img key={image} className="w-20 h-20 rounded-md" src={image} />
                })
              }
            </div>
            )}
          </aside>
        </div>
    </form>
  )
}

export default Detailproduct