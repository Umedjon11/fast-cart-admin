import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import Logo from "../assets/Logo.png"
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { isAdmin, LogIn } from "../api/requests/login";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { GetToken } from "../../utils/axios";

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formSchema = Yup.object().shape({
    userName: Yup.string()
    .required("Fill Your user name!"),
    password: Yup.string()
    .required("Fill Your password!")
  })

  const { handleChange, resetForm, handleSubmit, errors, touched, values } = useFormik({
    initialValues: {
      userName: "",
      password: ""
    },
    validationSchema: formSchema,
    onSubmit: async (values: {userName: string, password: string}) => {
      const result = await LogIn(values)
      if (result) {
        const roles = await isAdmin()
        if (roles) {
          toast.success(`Welcome back ${values.userName}`)
          navigate("/dashboard")
        } else {
          localStorage.clear()
          toast.error("You're not an Admin!")
        }
      }
    }
  })

  const token = GetToken()

  useEffect(() => {
    resetForm()
    if (token) {
      navigate("/dashboard")
    }
  }, [])


  return (
    <div className="flex justify-between h-screen w-full">
      <aside className="bg-[#1C2536] text-white w-[50%] h-full flex flex-col justify-center pl-[5%] pr-[13%]">
        <p className="text-2xl mb-[-2vh]">Welcome to admin panel</p>
        <img src={Logo} />
      </aside>
      <form onSubmit={handleSubmit} className="flex flex-col w-[50%] justify-center p-[0_8%] gap-[3vh]">
        <h1 className="text-2xl font-bold">Log in</h1>
        <TextField name="userName" onChange={handleChange} value={values.userName} label="User name" />
        {errors.userName && touched.userName ? (<p className="text-[red] font-semibold text-[13px]">{errors.userName}</p>) : null}
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            name="password" 
            onChange={handleChange} 
            value={values.password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {errors.password && touched.password ? (<p className="text-[red] font-semibold text-[13px]">{errors.password}</p>) : null}
        <p className="cursor-pointer text-center font-semibold text-[#2563EB] text-[16px]">Forgot password?</p>
        <button className="p-[1.5vh_0] cursor-pointer w-full text-center font-semibold text-white text-xl bg-[#2563EB] rounded-md">Log in</button>
      </form>
    </div>
  )
}

export default Login