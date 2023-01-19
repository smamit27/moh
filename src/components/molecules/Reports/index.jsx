import React,{useState} from "react"
import { Modal, Box, styled, Grid, Divider, Typography, Stack, Button, TextField } from "@mui/material"
import { theme } from "../../../theme"
import PatronProfile from "../PatronProfile"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import {navigateHomeOpenAction} from '../Dashboard/logic'
import { useDispatch } from "react-redux"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const Reports = ({ open = false, onClose }) => {
const dispatch = useDispatch()
const [start, setStart] = useState(null);
const [end, setEnd] = useState(null);

const onDateChange = (val, type) => {
  try {
    if (type === "start") {
      setStart(val);
      setEnd(null);
    } else {
      setEnd(val);
    }
  } catch (error) {
    if (type === "start") {
      setStart(null);
      setEnd(null);
    } else {
      setEnd(null);
    }
  }
};
const redirectToHome = () => {
  dispatch(navigateHomeOpenAction())

}
const disabled = !start || !end
console.log(disabled)
  return (
    <Modal open={open} sx={{ overflowY: "scroll" }}>
      <Box sx={style}>
        <Header>
          <Typography mt={1} onClick={onClose}> <ArrowBackIosIcon />
          </Typography>
            <HeaderTitle data-testid="momentum-dollar-transaction-details">
              Report
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
             <Grid item xs={12} md={3} mb={2}>
            </Grid>
            <Grid item xs={12} md={6} p={1}>
            <Grid container p={2} sx={{height: '40vh',boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",borderRadius: '10px'}}>
              <Grid item xs={12} md={12}>
                  <Typography sx={{mb:1,fontWeight: 'bold'}}> Date Range </Typography>
                  <Divider></Divider>
                </Grid>
          <Grid item xs={12} lg={12} p={2} pb={1} pt={0}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container >
        <Grid item xs={5} mr={1} ml={3}>
          <Stack spacing={3}>
            <DesktopDatePicker
              label="Start Date"
              inputFormat="MM/dd/yyyy"
              value={start}
              onChange={(val) => onDateChange(val, "start")}
              renderInput={(params) => (
                <TextField {...params} size="small"  />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={5} >
          <Stack spacing={3}>
            <DesktopDatePicker
              label="End Date"
              inputFormat="MM/dd/yyyy"
              minDate={start}
              value={end}
              onChange={(val) => onDateChange(val, "end")}
              renderInput={(params) => (
                <TextField {...params} size="small"  />
              )}
            />
          </Stack>
        </Grid>
      </Grid>
    </LocalizationProvider>

          </Grid>
            </Grid>
            </Grid>
            <Grid item xs={12} md={3} mb={2}>
            </Grid>
        </Grid>
        <Divider />
          <Footer>          
            <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end">
              <Button type="submit" variant="contained" disabled={disabled} color="success">Generate Report</Button>
            </Stack>
          </Footer>
      </Box>
    </Modal>
  )
}
export default Reports
const style = {
  position: "absolute",
  width: "90%",
  top: "80%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#FDFDFD",
  boxShadow: 24,
  borderRadius: "6px",
  [theme.breakpoints.up(780)]: {
    top: "50%",
    width: "80%",
  },
}

const Header = styled("div")({
  padding: "1.2em 1.5em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 15,
  borderTopLeftRadius: "6px",
  borderTopRightRadius: "6px",
  width: "90%",
  [theme.breakpoints.up(780)]: {
    padding: "1.2em 1.5em",
    width: "96%",
    display: "flex"
  },
})

const HeaderTitle = styled("div")({
  fontWeight: "bold",
  fontSize: "20px",
  lineHeight: "24px",
  color: "#222222"
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
  
