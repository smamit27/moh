import { Modal,  Box,  styled,  Button,  Stack,  Grid,  Select, MenuItem,Divider,Typography} from "@mui/material"
import React, { useState, useEffect } from "react"
import {useDispatch,useSelector} from 'react-redux'
import { statusNotificationAction } from "../StatusNotification/logic"
import PatronProfile from "../PatronProfile"
import { theme } from "../../../theme"
import { useForm } from "react-hook-form"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import {navigateHomeOpenAction} from '../Dashboard/logic'
import {suspendStatusAction} from './logic'
function MomentumSuspension({ open = false, onClose }) {
  const dispatch = useDispatch()
  const {flag:patronDetalsFlag, data:patronLocalDetail} = useSelector(state => state.patronLocalDetails)
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()
  useEffect(() => {
    if(patronDetalsFlag) {
      setAccountStatusCheck(patronLocalDetail?.status)
    }
   },[patronDetalsFlag,patronLocalDetail])
  const [accountStatusCheck, setAccountStatusCheck] = useState("")
  const [status, seStatus] = useState(false)
  const [suspensionReason, setSuspensionReason] = useState("")
  const [suspensionReasonCheck, setSuspensionReasonCheck] = useState(false)
  const [editMode, setEditMode] = useState(true)
  const handleAccountStatus = (event) => {
    setAccountStatusCheck(event.target.value)
    seStatus(true)
  }
  const handleSuspensionReason = (event) => {
    setSuspensionReason(event.target.value)
    setSuspensionReasonCheck(true)
  }
  const handleEditMode = () => {
    setEditMode(false)
    
  }
  const handleCancelMode = () => {
    setEditMode(true)
    setAccountStatusCheck(patronLocalDetail?.status)
    // setSuspensionReasonCheck(true)
  }

  const onSubmit = (data) => {
    const payload = {
      request: {
        gmAccountNum: patronLocalDetail?.gmNumber,
        status: data?.accountStatus
      },
      data: {
        departmentToContact: data?.suspensionReason || ''
      }
    }
    dispatch(suspendStatusAction(payload))
    dispatch(statusNotificationAction({
      type: "supensiondetails",
      message: `Suspension details updated`
    }))
    onClose()
  }
  const redirectToHome = () => {
    dispatch(navigateHomeOpenAction())
  
  }
  return (
    <Modal open={open} sx={{overflowY: "scroll"}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={style}>
          <Header>
            <Typography mt={1} onClick={onClose}> <ArrowBackIosIcon />
            </Typography>
            <HeaderTitle data-testid="suspension-details">
            Momentum Dollar Suspension Details
            </HeaderTitle>
            <Typography mt={1} onClick={redirectToHome}><HomeOutlinedIcon fontSize='large'/>
          </Typography>
          </Header>
          <Divider></Divider>
          <Grid container>
            <Grid item xs={12} lg={12} pl={2} pr={2} pt={2}>
              <PatronProfile />
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Grid container>
            <Grid item  xs={12} md={3} p={1}></Grid>
            <Grid item xs={12} md={6} p={1}>              
              <Grid container p={2} sx={{ height: '40vh',
                                          boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
                                          borderRadius: "10px" }}>
                <Grid item xs={12} md={12}>
                  <Typography sx={{mb:1,fontWeight: 'bold'}}> Suspension </Typography>
                  <Divider></Divider>
                </Grid>
                <Grid item xs={12} md={6}  mt={1} mb={1} pl={1}>
                  <Typography variant="body1" gutterBottom sx={{fontSize:'0.85rem',fontWeight:'bold'}} component="div">
                    Global Momentum Number
                  </Typography>                
                </Grid>
                <Grid item xs={12} md={6} mt={1} mb={1} pl={1}>
                  <Labels>{patronLocalDetail?.gmNumber} </Labels>
                </Grid>

                {editMode && (
                  <>
                    <Grid item xs={12} md={6} mt={0} pl={1}>
                    <Typography variant="body1" gutterBottom sx={{fontSize:'0.85rem',fontWeight:'bold'}} component="div">
                      Momentum Dollar Status
                    </Typography>                     
                    </Grid>
                    <Grid item xs={12} md={6} mt={0} pl={1}>
                      <Labels>{patronLocalDetail?.status}</Labels>
                    </Grid>
                  </>
                )}
                {!editMode && (
                  <>
                    <Grid item xs={12} md={6} mt={2} pl={1}>
                    <Typography variant="body1" gutterBottom sx={{fontSize:'0.85rem',fontWeight:'bold'}} component="div">
                      Momentum Dollar Status*
                    </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} pr={1}>
                      <FormControl
                        sx={{ m: 1, minWidth: "100%" }}
                        error={status ? false : Boolean(errors.accountStatus)} >
                        <Select
                          {...register("accountStatus", {
                            required: "Please select the status",
                          })}
                          labelId="accountStatus"
                          id="accountStatus"
                          value={accountStatusCheck}
                          size="small"
                          name="accountStatus"
                          onChange={handleAccountStatus}>
                          <MenuItem value={'active'}>Active</MenuItem>
                          <MenuItem value={'suspended'}>Suspended</MenuItem>
                        </Select>
                        {!status && (
                          <FormHelperText>
                            {errors.accountStatus &&
                              errors.accountStatus?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </>
                )}
                {!editMode && accountStatusCheck !== 'active' && (
                  <>
                    <Grid item xs={12} md={6} mt={2} pl={1}>
                    <Typography variant="body1" gutterBottom sx={{fontSize:'0.85rem',fontWeight:'bold'}} component="div">
                      Reason *
                    </Typography>                     
                    </Grid>
                    <Grid item xs={12} md={6} pr={1}>
                      <FormControl
                        sx={{ m: 1, minWidth: "100%" }}
                        error={
                          suspensionReasonCheck
                            ? false
                            : Boolean(errors.suspensionReason) 
                        }>
                        <Select
                          size="small"
                          {...register("suspensionReason", {
                            required: "Please Select a Reason",
                          })}
                          labelId="suspensionReason"
                          id="suspensionReason"
                          value={suspensionReason}
                          name="suspensionReason"
                          onChange={handleSuspensionReason}>
                          <MenuItem value={'security'}>Security Decision</MenuItem>
                          <MenuItem value={'credit'}>Credit Decision</MenuItem>
                          <MenuItem value={'management'}>Management Decision</MenuItem>
                          <MenuItem value={'deceased'}>Patron Deceased</MenuItem>
                        </Select>
                        {!suspensionReasonCheck && (
                          <FormHelperText>
                            {errors.suspensionReason &&
                              errors.suspensionReason?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12} md={3} p={1}></Grid>
          </Grid>
          <Divider></Divider>
          <Footer>
            <Stack
              width="100%"
              spacing={2}
              direction="row"
              justifyContent="flex-end">
              {editMode && (
                <Button
                  onClick={handleEditMode}
                  variant="contained"
                  sx={{ backgroundColor: theme.palette.linkButton }}>
                  Edit
                </Button>
              )}
              {!editMode && (
                <>
                <Button variant="outlined" onClick={handleCancelMode}>Cancel</Button>
                <Button type="submit" variant="contained" color="success">
                  Save
                </Button>
                </>

              )}
            </Stack>
          </Footer>
        </Box>
      </form>
    </Modal>
  )
}

export default MomentumSuspension
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
  padding: "1.2em 1.5em",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  height: 15,
  borderBottomLeftRadius: "6px",
  borderBottomRightRadius: "6px",
  width: "96%",
  [theme.breakpoints.up(780)]: {
    padding: "1.2em 1.5em",
    width: '96%'
  }
})
const Labels = styled("label")({
  fontSize: "14px",
  lineHeight: "20px",
  marginBottom: "10px",
  color: "#222222",
  textTransform: 'capitalize'
})
const HeaderTitle = styled("div")({
  fontWeight: "bold",
  fontSize: "20px",
  lineHeight: "24px",
  color: "#222222",
})
