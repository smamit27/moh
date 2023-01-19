import { Modal, Box, styled, Button, Stack, Grid ,Select,MenuItem,Typography,TextField,Divider,FormControl,FormHelperText } from "@mui/material"
import React,{useState} from "react"
import {useDispatch,useSelector} from 'react-redux'
import { statusNotificationAction } from "../StatusNotification/logic"
import PatronProfile from "../PatronProfile"
import { theme } from "../../../theme"
import SelectedPatron from "./SelectedPatron"
import { useForm } from "react-hook-form"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import {navigateHomeOpenAction} from '../Dashboard/logic'
import {linkAccountAction} from './logic'
import { linkedAccountListResetAction } from "../PatronDetails/logic";

function LinkAccount({ open = false, onClose }) {
    const dispatch = useDispatch()
    const {handleSubmit, register, formState: { errors }} = useForm()
    const {data:propertyIdData} = useSelector(state => state.propertyId)
    const {data:patronLocalDetail} = useSelector(state => state.patronLocalDetails)

    const [linkProperty, setLinkProperty] = useState("")
    const [linkPropertyCheck,setLinkPropertyCheck] = useState(false)
    const [selectedPatronList,setSelectedPatronList] = useState(false)
    const handleLinkAccountConfirmation = () =>{
      dispatch(statusNotificationAction({
        type: "linkAccount",
        message: `Link Account updated`
      }))
      const payload = {
          gmNumber: patronLocalDetail?.gmNumber,
          status: patronLocalDetail?.status,
          accountNumber: patronLocalDetail?.accountNumber,
          propertyId: patronLocalDetail?.propertyId
      }
      dispatch(linkAccountAction(payload))
      onClose()
    }
    const handleLinkProperty = (event) =>{
      setLinkProperty(event.target.value)
      setLinkPropertyCheck(true)
    }
    const onSubmit = (data) =>{
      setSelectedPatronList(true)
    }
    const onCloseBtn = () => {
       onClose()  
    }
    const redirectToHome = () => {
      dispatch(linkedAccountListResetAction())
      dispatch(navigateHomeOpenAction())  
    }
  return (
    <Modal open={open} sx={{overflowY: "scroll"}}>
      <Box sx={style}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography mt={1} onClick={onCloseBtn}> <ArrowBackIosIcon />
          </Typography>
          <HeaderTitle data-testid="momentum-link">Link Account</HeaderTitle>
          <Typography mt={1} onClick={redirectToHome}><HomeOutlinedIcon fontSize='large'/>
          </Typography>
          </Header>

        <Divider ></Divider>

              <Grid container>
              <Grid item xs={12} lg={12} pl={2} pr={2} pt={2}>
                  <PatronProfile />
                </Grid>
              </Grid>
            <Divider variant="middle" />

        <Grid container>
          <Grid item xs={12} md={3} mb={2}></Grid>
          {!selectedPatronList &&
          <>
          <Grid item xs={12} md={6} p={1} >
            <Grid container p={5} sx={{
                boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
                borderRadius: "10px", height:"50vh"}} >
                <Grid item xs={12} md={12}>
                  <Typography sx={{mb:1,fontWeight: 'bold'}}> Property & Account Number </Typography>
                  <Divider />
                </Grid>
              <Grid item xs={6} mt={3}>
                <Label>Select Property to Link *</Label>
              </Grid>
              <Grid item xs={6} mt={2}>
                <FormControl sx={{ minWidth: "100%" }} error = {linkPropertyCheck ? false: Boolean(errors.linkProperty)}>
                  <Select 
                      size="small"
                      {...register("linkProperty", {  required: "Please select Link Property"})}
                      labelId="linkProperty"
                      id="linkProperty"
                      value={linkProperty}
                      name="linkProperty"
                      onChange={handleLinkProperty}>
                      {propertyIdData?.length > 0 && propertyIdData?.map(property =>(
                          <MenuItem key={property?.propertyId} value={property?.propertyId}>{property?.propertyName}</MenuItem>

                        ))}               
                </Select>
                {!linkPropertyCheck && <FormHelperText>{errors.linkProperty && errors.linkProperty?.message}</FormHelperText>}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Label>Enter Account Number *</Label>
              </Grid>
              <Grid item xs={6}>
              <TextField
                    fullWidth
                    id="accountNumber"
                    name="accountNumber"
                    type="text"
                    size="small"
                    {...register("accountNumber", {
                      required: "Please enter account number",
                      pattern: { value: /^[1-9]+[0-9]*$/,
                                  message:'Please Enter a Valid Number'}
                    })}
                    error={Boolean(errors.accountNumber)}
                    helperText={errors.accountNumber?.message}
                  />
              </Grid>
            </Grid>
          </Grid> 
          <Grid item xs={12} md={3} mb={2}></Grid>

          </>}
          {selectedPatronList && <Grid item xs={12} md={6} mb={1} mt={1} sx={{height: '45vh'}}><SelectedPatron /></Grid>}         
        
        </Grid>
        <Divider ></Divider>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end">
           {selectedPatronList && <Button onClick={onClose} variant="outlined">Cancel</Button> }
           {!selectedPatronList &&<Button variant="contained" sx={{ backgroundColor: theme.palette?.linkButton }} type="submit" >
              Next
            </Button>}
            {selectedPatronList && <Button variant="contained" sx={{ backgroundColor: theme.palette?.linkButton }} onClick={handleLinkAccountConfirmation}> 
              Confirm Link Account
            </Button>}
          </Stack>
        </Footer>
        </form>
      </Box>
    </Modal>
  )
}

export default LinkAccount

const style = {
  position: "absolute",
  width: '90%',
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FDFDFD",
  boxShadow: 24,
  borderRadius: "6px",
  [theme.breakpoints.up(780)]: {
    top: "50%",
    width: '80%'
  }
}

const Header = styled("div")({
  padding: "1.2em 0.75em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 15,
  borderTopLeftRadius: "6px",
  borderTopRightRadius: "6px",
  width: "90%",
  [theme.breakpoints.up(780)]: {
    padding: "1.2em 1.5em",
    width: '96%'
  }
})

const Footer = styled("div")({
  padding: "1.2em 0.75em",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  height: 15,
  borderBottomLeftRadius: "6px",
  borderBottomRightRadius: "6px",
  width: "90%",
  [theme.breakpoints.up(780)]: {
    padding: "1.2em 1.5em",
    width: '96%'
  }
})
const HeaderTitle = styled("div")({
  fontWeight: "bold",
  fontSize: "20px",
  lineHeight: "24px",
  color: "#222222",
})
const Label = styled("label")({
  fontSize: "14px",
  lineHeight: "20px",
  marginBottom: "10px",
  fontWeight: "bold",
  color: 'rgba(0, 0, 0, 0.6)'
})
