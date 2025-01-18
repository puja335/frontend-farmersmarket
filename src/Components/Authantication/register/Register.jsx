import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Button,
  Checkbox,
  Container,
  Fade,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import animation from "../../../assets/login.jpg"
import { useAuth } from "../../../hooks/useAuth"

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [termsError, setTermsError] = useState(false)
  const { signup, error, isLoading } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    if (!agreedToTerms) {
      setTermsError(true)
      return
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    try {
      const response = await signup(data)
      if (response) {
        toast.success("Registration successful")
        navigate("/login")
      } else {
        toast.error(error)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section className='min-h-[80vh] px-2 items-center flex justify-center sm:px-6 lg:px-8'>
      <Fade in={true}>
        <Container>
          <div className='grid md:grid-cols-2'>
            <div className='col hidden md:flex items-center justify-center'>
              <img
                className='lg:max-h-80 max-h-[19rem] md:pr-6'
                src={animation}
                alt='register'
              />
            </div>

            <div className='flex md:justify-start justify-center'>
              <div className='flex items-center max-w-[26rem] p-4'>
                <div className='lg:space-y-8 md:space-y-6 space-y-8'>
                  <h3 className='text-center font-semibold text-gray-800 lg:text-3xl md:text-2xl text-3xl'>
                    Register
                  </h3>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='text-center lg:space-y-5 md:space-y-4 space-y-5'
                  >
                    <TextField
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                      label='Name'
                      size='small'
                      error={errors.name ? true : false}
                      helperText={errors.name ? errors.name.message : ""}
                      fullWidth
                      color='success'
                      variant='outlined'
                    />

                    <TextField
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      label='Email'
                      size='small'
                      error={errors.email ? true : false}
                      helperText={errors.email ? errors.email.message : ""}
                      fullWidth
                      color='success'
                      variant='outlined'
                    />

                    <TextField
                      {...register("contact", {
                        required: "Contact number is required",
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Invalid contact number",
                        },
                      })}
                      label='Contact'
                      size='small'
                      error={errors.contact ? true : false}
                      helperText={errors.contact ? errors.contact.message : ""}
                      fullWidth
                      color='success'
                      variant='outlined'
                    />

                    <TextField
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

                    <TextField
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (val) => {
                          if (watch("password") !== val) {
                            return "Passwords do not match"
                          }
                        },
                      })}
                      label='Confirm Password'
                      type={showConfirmPassword ? "text" : "password"}
                      fullWidth
                      size='small'
                      error={errors.confirmPassword ? true : false}
                      helperText={
                        errors.confirmPassword
                          ? errors.confirmPassword.message
                          : ""
                      }
                      color='success'
                      variant='outlined'
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              size='small'
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff fontSize='inherit' />
                              ) : (
                                <Visibility fontSize='inherit' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />

                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={agreedToTerms}
                          onChange={(e) => {
                            setAgreedToTerms(e.target.checked)
                            setTermsError(false)
                          }}
                          color='success'
                        />
                      }
                      label={
                        <span className='text-sm'>
                          I agree to the{" "}
                          <Link
                            to='/terms'
                            className='text-green-600 hover:text-green-700'
                          >
                            Terms & Conditions
                          </Link>{" "}
                          and{" "}
                          <Link
                            to='/privacy'
                            className='text-green-600 hover:text-green-700'
                          >
                            Privacy Policy
                          </Link>
                        </span>
                      }
                    />
                    {termsError && (
                      <FormHelperText error>
                        You must agree to the terms to continue
                      </FormHelperText>
                    )}

                    <Button
                      sx={{ textTransform: "capitalize" }}
                      type='submit'
                      color='success'
                      variant='contained'
                      disabled={isLoading}
                      className='w-full'
                    >
                      Register
                    </Button>

                    <div className='text-center mt-4'>
                      <span className='text-gray-600'>
                        Already have an account?{" "}
                      </span>
                      <Link
                        to='/login'
                        className='text-green-600 hover:text-green-700'
                      >
                        Login here
                      </Link>
                    </div>
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

export default Register
