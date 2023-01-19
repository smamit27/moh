import {Modal,Box, styled,Button, Stack, Grid, Select,MenuItem,TextField,Divider,FormControl,FormHelperText,TextareaAutosize,Typography} from "@mui/material"
import React ,{useState} from "react"
import {useDispatch,useSelector} from 'react-redux'
import { statusNotificationAction } from "../StatusNotification/logic"
import PatronProfile from "../PatronProfile"
import { theme } from "../../../theme"
import { useForm } from "react-hook-form"
import NumberFormat from 'react-number-format'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import {navigateHomeOpenAction} from '../Dashboard/logic'
import {adjustmentAmountAction} from './logic'

function NumberFormatCustom(props) {
  const { onChange, ...other } = props
  return (
    <NumberFormat
      {...other}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator={true}
      decimalScale={2} 
    />
  )
}


function MomentumAdjustment({ open = false, onClose }) {
  const dispatch = useDispatch()
  const {handleSubmit, register, formState: { errors }} = useForm()
  const {data:patronLocalDetail} = useSelector(state => state.patronLocalDetails)
  const [adjustmentReason, setAdjustmentReason] = useState("")
  const [adjustmentReasonCheck,setAdjustmentReasonCheck] = useState(false)

  const handleAdjustmentReason = (event) => {
    setAdjustmentReason(event.target.value)
    setAdjustmentReasonCheck(true)
  }

  const handleCancel = () =>{
   onClose()
  }
  const onSubmit = (data) =>{
   const payload = {
      request: {
        propertyId: patronLocalDetail?.propertyId,
        accountNumber: patronLocalDetail?.accountNumber
      },
      data: {
        adjustmentAmount: parseInt(data?.adjustmentAmount).toFixed(2),
        adjustmentReason: data?.adjustmentReason,
        adjustmentDetails: data?.adjustmentDetails || '',
        currencyCode: patronLocalDetail?.currencyCode
      }
    }
    dispatch(adjustmentAmountAction(payload))
    dispatch(statusNotificationAction({
      type: "adjustmentDetails",
      message: `Adjustment Details Updated`
    }))
    onClose()

  }
  const redirectToHome = () => {
    dispatch(navigateHomeOpenAction())
  
  }
  return (
    <Modal open={open} sx={{overflowY: "scroll"}}>
      <Box sx={style}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Header>
          <Typography mt={1} onClick={onClose}> <ArrowBackIosIcon /></Typography>
            <HeaderTitle data-testid="momentum-adjustment">
            Momentum Dollar Adjustment Details
            </HeaderTitle>
            <Typography mt={1} onClick={redirectToHome}><HomeOutlinedIcon fontSize='large'/>
          </Typography>
          </Header>
          <Divider />
          <Grid container >
            <Grid item xs={12} lg={12} pl={2} pr={2} pt={2}>
              <PatronProfile />
            </Grid>
          </Grid>
          <Divider variant="middle" />

          <Grid container>
             <Grid item xs={12} md={3} mb={2}>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
              <Grid container p={2} sx={{height: '40vh',boxShadow: '2px 4px 10px 1px rgb(201 201 201 / 47%)',borderRadius: '10px'}}>
              <Grid item xs={12} md={12}>
                  <Typography sx={{mb:1,fontWeight: 'bold'}}> Adjustment </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} md={6} mt={1} sx={{marginBottom : {xs: 0,md: 3 }}}>
                  <Label>Adjustment Amount *</Label>
                </Grid>
                <Grid item xs={12} md={6} >
                <TextField
                      fullWidth
                      {...register("adjustmentAmount", {
                        required: "Please enter adjustment amount",
                      })}
                      id="adjustmentAmount"
                      name="adjustmentAmount"
                      type="text"
                      size="small"

                      InputProps={{
                        inputComponent: NumberFormatCustom
                      }}                      
                      error={Boolean(errors.adjustmentAmount)}
                      helperText={errors.adjustmentAmount?.message}
                    />
                     
                </Grid>
                <Grid item xs={12}  mt={1} md={6} sx={{marginBottom : {xs: 0,md: 3 }}}>
                  <Label>Adjustment Reason *</Label>
                </Grid>
                <Grid item xs={12} md={6}>
                <FormControl sx={{ minWidth: "100%" }} error = {adjustmentReasonCheck ? false: Boolean(errors.adjustmentReason)}>
                  <Select 
                      size="small"
                      {...register("adjustmentReason", {  required: "Please select adjustment Reason"})}
                      labelId="adjustmentReason"
                      id="adjustmentReason"
                      value={adjustmentReason}
                      name="adjustmentReason"
                      onChange={handleAdjustmentReason}>
                      <MenuItem value="deceased">Deceased Patron Transfer</MenuItem>
                      <MenuItem value="purge">Purge Reimbursement</MenuItem>
                      <MenuItem value="unlink">Unlink Error Adjustment</MenuItem>                     
                </Select>
                {!adjustmentReasonCheck && <FormHelperText>{errors.adjustmentReason && errors.adjustmentReason?.message}</FormHelperText>}
                </FormControl>
                </Grid>
                <Grid item xs={12} mt={1} md={6}>
                  <Label>Adjustment Details</Label>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextareaAutosize  
                    fullWidth
                    id="adjustmentDetails"
                    name="adjustmentDetails"
                    type="text"
                    size="small"
                    minRows={3}
                    style={{ width: "98%",border:'1px solid #ccc',borderRadius: 4 }}
                    {...register("adjustmentDetails")}
                    />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} mb={2}>
            </Grid>
          </Grid>
          <Divider />
          <Footer>          
            <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end">
              <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
              <Button type="submit" variant="contained" color="success">Save</Button>
            </Stack>
          </Footer>
        </form>
      </Box>
    </Modal>
  )
}

export default MomentumAdjustment

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

const Label = styled("label")({
  fontSize: "14px",
  lineHeight: "20px",
  marginBottom: "10px",
  fontWeight: "bold",
  color: '#222222'
})
const HeaderTitle = styled("div")({
  fontWeight: "bold",
  fontSize: "20px",
  lineHeight: "24px",
  color: "#222222",
})
