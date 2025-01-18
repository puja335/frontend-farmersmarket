import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Box,
  Button,
  Checkbox,
  Container,
  Fade,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import loginimage from "../../../assets/login.jpg"
import { useAuth } from "../../../hooks/useAuth"
import { groceryContext } from "../../Layout/Layout"

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [logInError, setLogInError] = useState("")
  const { login, error, isLoading, isAuthenticated } = useAuth()

  window.scroll({ top: 0 })

  const navigate = useNavigate()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: "/" } }

  const { userLoggedInState } = useContext(groceryContext)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated])

  const onSubmit = async (data) => {
    const response = await login(data.email, data.password)
    if (response) {
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true")
      }
      toast.success("Logged in successfully")
      userLoggedInState[1](true)
      navigate(from)
    } else {
      toast.error(error)
      setLogInError(error)
    }
  }

  return (
    <section className='h-[80vh] px-2 items-center flex justify-center sm:px-6 lg:px-8'>
      <Fade in={true}>
        <Container>
          <div className='grid md:grid-cols-2'>
            <div className='col hidden md:flex items-center justify-center'>
              <img
                className='lg:max-h-80 max-h-[17rem] pr-6'
                src={loginimage}
                alt='login'
              />
            </div>
            <div className='flex md:justify-start justify-center'>
              <div className='flex items-center max-w-[26rem] p-4 h-80'>
                <div className='lg:space-y-10 md:space-y-8 space-y-10'>
                  <h3 className='text-center font-semibold text-gray-800 lg:text-3xl md:text-2xl text-3xl'>
                    Log In
                  </h3>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='text-center lg:space-y-5 md:space-y-4 space-y-5'
                  >
                    <TextField
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      defaultValue={"user@gmail.com"}
                      label='Email'
                      size='small'
                      error={errors.email ? true : false}
                      helperText={errors.email ? errors.email.message : ""}
                      fullWidth
                      color='success'
                      variant='outlined'
                    />

                    <TextField
                      defaultValue={"User1234"}
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                          message:
                            "Minimum 6 characters, at least one uppercase letter and one number",
                        },
                      })}
                      label='Password'
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      size='small'
                      error={errors.password ? true : false}
                      helperText={
                        errors.password ? errors.password.message : ""
                      }
                      color='success'
                      variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              size='small'
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOff fontSize='inherit' />
                              ) : (
                                <Visibility fontSize='inherit' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Box className='flex justify-between items-center'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            color='success'
                            size='small'
                          />
                        }
                        label='Remember me'
                      />
                      <Link to='/forgot-password' className='text-green-600'>
                        Forgot Password?
                      </Link>
                    </Box>

                    {logInError && <></>}

                    <Button
                      sx={{ textTransform: "capitalize" }}
                      type='submit'
                      color='success'
                      variant='contained'
                      fullWidth
                    >
                      Log in
                    </Button>

                    <Box className='text-center mt-4'>
                      <span className='text-gray-600'>
                        Don't have an account?{" "}
                      </span>
                      <Link
                        to='/register'
                        className='text-green-600 font-semibold'
                      >
                        Register here
                      </Link>
                    </Box>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Fade>
    </section>
  )
}

export default Login
