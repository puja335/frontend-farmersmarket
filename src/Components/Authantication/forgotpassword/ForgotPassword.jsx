import {
  Box,
  Button,
  Container,
  Fade,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";

const ForgotPassword = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState("");
  const { sendOTP, verifyOTP, resetPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const steps = ["Enter Email", "Verify OTP", "Reset Password"];

  const handleEmailSubmit = async (data) => {
    try {
      await sendOTP(data.email);
      setEmail(data.email);
      setActiveStep(1);
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOTPSubmit = async (data) => {
    try {
      await verifyOTP(email, data.otp);
      setActiveStep(2);
      toast.success("OTP verified successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePasswordReset = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      await resetPassword(email, data.newPassword);
      toast.success("Password reset successfully");
      // Redirect to login
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className='min-h-screen px-2 items-center flex justify-center sm:px-6 lg:px-8'>
      <Fade in={true}>
        <Container maxWidth='sm'>
          <Box className='p-6 space-y-6'>
            <h2 className='text-center text-2xl font-bold'>Forgot Password</h2>

            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <div className='mt-8'>
              {activeStep === 0 && (
                <form
                  onSubmit={handleSubmit(handleEmailSubmit)}
                  className='space-y-4'
                >
                  <TextField
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    label='Email'
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='success'
                    fullWidth
                  >
                    Send OTP
                  </Button>
                </form>
              )}

              {activeStep === 1 && (
                <form
                  onSubmit={handleSubmit(handleOTPSubmit)}
                  className='space-y-4'
                >
                  <TextField
                    {...register("otp", {
                      required: "OTP is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Invalid OTP format",
                      },
                    })}
                    label='Enter OTP'
                    fullWidth
                    error={!!errors.otp}
                    helperText={errors.otp?.message}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='success'
                    fullWidth
                  >
                    Verify OTP
                  </Button>
                </form>
              )}

              {activeStep === 2 && (
                <form
                  onSubmit={handleSubmit(handlePasswordReset)}
                  className='space-y-4'
                >
                  <TextField
                    {...register("newPassword", {
                      required: "New password is required",
                      pattern: {
                        value: /^(?=.*[A-Z])[a-zA-Z0-9]{6,}$/,
                        message:
                          "Minimum 6 characters with one uppercase letter",
                      },
                    })}
                    type='password'
                    label='New Password'
                    fullWidth
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                  />
                  <TextField
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (val) => {
                        if (watch("newPassword") !== val) {
                          return "Passwords do not match";
                        }
                      },
                    })}
                    type='password'
                    label='Confirm Password'
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    color='success'
                    fullWidth
                  >
                    Reset Password
                  </Button>
                </form>
              )}
            </div>
          </Box>
        </Container>
      </Fade>
    </section>
  );
};

export default ForgotPassword;
