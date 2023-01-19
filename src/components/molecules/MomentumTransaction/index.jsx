import React, { useEffect, useState } from "react"
import { Modal,Box,styled,Grid,Divider,Typography,FormControl,MenuItem,Select} from "@mui/material"
import {useDispatch,useSelector} from 'react-redux'
import { theme } from "../../../theme"
import PatronProfile from "../PatronProfile"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import {navigateHomeOpenAction} from '../Dashboard/logic'
import { getTransactionDetailsResetAction } from "../PatronDetails/logic";
import TransactionList from "./TransactionList"
const MomentumTransaction = ({ open = false, onClose }) => {
  const {flag:patronDetalsFlag, data:patronLocalDetail} = useSelector(state => state.patronLocalDetails)

  const dispatch = useDispatch()
  const [currencyViewReason, setCurrencyViewReason] = useState("")
  const [currencyExchange,setCurrencyExchange] = useState()
  useEffect(() => {
    if (patronDetalsFlag) {
      setCurrencyViewReason(patronLocalDetail?.currencyCode)
      setCurrencyExchange(patronLocalDetail?.totalMomentumDollarBalance)
    }

  }, [patronDetalsFlag,patronLocalDetail])

  // useEffect(() => {
  //   if (rowData) {
  //     const filteredDates = [...rowData].sort((a, b) =>
  //       b.date
  //         .split("/")
  //         .reverse()
  //         .join()
  //         .localeCompare(a.date.split("/").reverse().join())
  //     )
  //     setRowData(filteredDates)
  //   }
  //   // eslint-disable-next-line
  // }, [])
  const handleChangeCurrency = (event) => {
    setCurrencyViewReason(event.target.value)
    if(event.target.value === 'USD'){
      setCurrencyExchange(patronLocalDetail?.totalMomentumDollarBalance)
    } else {
      setCurrencyExchange(patronLocalDetail?.totalMomentumDollarBalance * 1.31)

    }
  }
const redirectToHome = () => {
  dispatch(navigateHomeOpenAction())
  dispatch(getTransactionDetailsResetAction())

}
const onCloseBtn = () => {
  dispatch(getTransactionDetailsResetAction())
   onClose()

}
  return (
    <Modal open={open} sx={{ overflowY: "scroll" }}>
      <Box sx={style}>
        <Header>
          <Typography mt={1} onClick={onCloseBtn}> <ArrowBackIosIcon />
          </Typography>
            <HeaderTitle data-testid="momentum-dollar-transaction-details">
            Momentum Dollar Transaction Details
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
        <Grid item xs={12} lg={12} pl={2} pr={2}>
          <Grid container>
            <Grid item xs={12} md={3} mb={1} p={1} pb={0} >
              <Typography variant="body1" sx={{fontSize:'0.85rem'}}  gutterBottom component="div">
                Global Momentum Number
              </Typography>
              <Typography variant="subtitle2" sx={{fontWeight:'bold'}}  gutterBottom component="div">
                {patronLocalDetail?.gmNumber}
              </Typography>
            </Grid>

            <Grid item xs={12} md={3} p={1} pb={0}>
              <Typography variant="body1" sx={{fontSize:'0.85rem'}}  gutterBottom component="div">
                Currency View
              </Typography>
                  <Grid item xs={12} md={6} pr={1}>
                      <FormControl
                        sx={{ mb: 1, minWidth: "100%",fontSize: '0.75rem' }}>
                        <Select
                          size="small"
                          labelId="currencyViewReason"
                          id="currencyViewReason"
                          value={currencyViewReason}
                          name="currencyViewReason"
                          onChange={handleChangeCurrency}>
                          <MenuItem value="USD">USD</MenuItem>
                          <MenuItem value='CAD'>CAD</MenuItem>
                       </Select>
                      </FormControl>
                </Grid>

            </Grid>
            <Grid item xs={12} md={3}  p={1} pb={0} >
              <Typography variant="body1" sx={{fontSize:'0.85rem'}}  gutterBottom component="div">
                Momentum Dollar Balance
              </Typography>
              <Typography variant="subtitle2" sx={{fontWeight:'bold'}}  gutterBottom component="div">
              $ {currencyExchange}
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}  p={1} pb={0} >
              <Typography variant="body1" sx={{fontSize:'0.85rem'}}  gutterBottom component="div">
                Momentum Dollars Available
              </Typography>
              <Typography variant="subtitle2" sx={{fontWeight:'bold'}}  gutterBottom component="div">
                {patronLocalDetail?.status === 'active' ? `${'$'} ${currencyExchange}` : `$0.00 - Suspended` }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Grid container mt={1}>
          <Grid item xs={12} lg={12} p={2} pb={1} pt={0}>
            <TransactionList />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  )
}
export default MomentumTransaction
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
    width: "96%",
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
