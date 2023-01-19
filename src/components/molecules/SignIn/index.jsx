import React,{ useState,useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import {Button,TextField,Box,Grid,FormControl,Select,MenuItem,FormHelperText,InputLabel} from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import moheganIcon from "../../../assets/Images/mohegan_icon.png"
import { backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { signInAction,propertyIdAction } from "./logic"
import LoginHeader from "../LoginHeader"
import { useForm } from "react-hook-form"
import Footer from '../Footer'

export default function SignIn() {

  const theme = createTheme()
  const dispatch = useDispatch()
  const {handleSubmit, register, formState: { errors }} = useForm()
  const [property, setProperty] = useState("")
  const [propertyCheck, setPropertyCheck] = useState(false)
  const {data:propertyIdData} = useSelector(state => state.propertyId)
  console.log(propertyIdData)
  useEffect(() =>{
      dispatch(propertyIdAction())

  }, [dispatch])

  const onSubmit = (data) => {
    dispatch(backDropLoaderOpenAction())
    dispatch(signInAction(data))
  }
  const handleSuspensionReason = (event) => {
    setProperty(event.target.value)
    setPropertyCheck(true)
  }

  return (
    <>
      <LoginHeader />
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "80vh" }}>
        <Grid item xs={false} sm={4} md={4}></Grid>        
          <Grid item xs={12} sm={8} md={4}>
            <Box
              sx={{
                my: 2,
                mx: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: '2px solid #ccc',
                borderRadius: '10px',                
                p:2,
                pt:1,
                pb:1
              }}
            >
              <Grid item xs={false} sm={4} md={8} sx={{
              backgroundImage: `url(${moheganIcon})`,
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundPosition: "center",
              padding: theme.spacing(5),
              color: "#f6f6f6",
              display: { xs: "none", sm: "block" }}}></Grid>
              <Box sx={{ mt: 1 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="employeeId"
                    label="Team Member ID*"
                    placeholder="Enter Employee #"
                    name="employeeId"
                    size="medium"
                    type="text"
                    {...register("employeeId", {
                      required: "Employee Id is required",
                    })}
                    error={Boolean(errors.employeeId)}
                    helperText={errors.employeeId?.message}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="password"
                    label="Password*"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                    size="medium"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    error={Boolean(errors.password )}
                    helperText={errors.password?.message}
                  />
                  <Grid item xs={12} sx={{ mt: 2 }}>
                      <FormControl
                        sx={{ minWidth: "100%" }}
                        error={
                          propertyCheck
                            ? false
                            : Boolean(errors.property)
                        }
                      >
                    <InputLabel >Property*</InputLabel>

                        <Select
                          size="medium"
                          {...register("property", {
                            required: "Please Select the property",
                          })}                          
                          labelId="property"
                          id="property"
                          value={property}
                          name="property"
                          label="property"
                          onChange={handleSuspensionReason}>
                        {propertyIdData.length > 0 && propertyIdData.map(property =>(
                          <MenuItem key={property?.propertyId} value={property?.propertyId}>{property?.propertyName}</MenuItem>

                        ))}
                        </Select>
                        {!propertyCheck && (
                          <FormHelperText>
                            {errors.property &&
                              errors.property?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Log In
                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={false} sm={4} md={4}></Grid>
        </Grid>
      </ThemeProvider>
      <Footer />
    </>
  )
}
