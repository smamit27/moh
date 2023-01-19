import { Modal, Box, styled, Button, Stack, Grid, Divider ,Typography,Paper,Checkbox, Table,TableBody,TableCell,TableContainer,TableHead,TableRow } from "@mui/material"
import React, {useState}  from "react"
import {useDispatch,useSelector} from 'react-redux'
import PatronProfile from "../PatronProfile"
// import PatronBalances from "../PatronBalances"
import { theme } from "../../../theme"
import { statusNotificationAction } from "../StatusNotification/logic"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import {navigateHomeOpenAction} from '../Dashboard/logic'
import { unlinkAccountAction } from  './logic'
import { linkedAccountListResetAction } from "../PatronDetails/logic";

function UnlinkAccount({ open = false, onClose }) {
  const dispatch = useDispatch()
  const { data:linkedAccountsData } = useSelector(state => state.linkedAccountList)
  const {data:patronLocalDetail} = useSelector(state => state.patronLocalDetails)

  const [isChecked] = useState(false);
  const [accountNumberList,setAccountNumberList] = useState([])
 
  const handleUnlinkAccount = () => {
    dispatch(statusNotificationAction({
      type: "unlinkaccount",
      message: `Unlink Account updated`
    }))
  
    const payload = {
      request:{
        gmNumber: patronLocalDetail?.gmNumber,
        status: patronLocalDetail?.status      
      },
      data: {
        "accontNumbers": accountNumberList
      }
    }
    dispatch(unlinkAccountAction(payload))
    onClose()
  }
  const onCloseBtn = () => {
     onClose()  
  }
  const redirectToHome = () => {
    dispatch(linkedAccountListResetAction())
    dispatch(navigateHomeOpenAction())  
  }
  const toggleCheckboxValue = (e) => {
      const {value,checked} = e.target
      if(checked){
        setAccountNumberList([...accountNumberList,value])
      } else {
        setAccountNumberList(accountNumberList.filter((e)=> e !== value ))
      }
  }

  return (
    <Modal open={open} sx={{overflowY: "scroll"}}>
      <Box sx={style}>
      <Header>
          <Typography mt={1} onClick={onCloseBtn}> <ArrowBackIosIcon />
          </Typography>
          <HeaderTitle data-testid="momentum-link">   Unlink Account</HeaderTitle>
          <Typography mt={1} onClick={redirectToHome}><HomeOutlinedIcon fontSize='large'/>
          </Typography>
          </Header>       
        <Divider />
        <Grid container>
          <Grid item xs={12} lg={12} pl={2} pr={2} pt={2}>
            <PatronProfile />
          </Grid>
        </Grid>
        <Divider variant="middle" />
        <Grid container>
          <Grid item xs={12} md={3} mb={2}></Grid>
          <Grid item xs={12} md={6} p={1}>
            <Grid container p={2} sx={{  boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",borderRadius: "10px",height:'50vh'}}>
            <Grid item xs={12} md={12} mb={2}>
                  <Typography sx={{mb:1,fontWeight: 'bold'}}> Unlink</Typography>
                  <Divider></Divider>
                </Grid>
                <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">LINKED PROPERTY</TableCell>
            <TableCell className="tableCell">PROPERTY ACCT #</TableCell>
            <TableCell className="tableCell">UNLINK</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {linkedAccountsData?.map((row,index) => (
            <TableRow key={row?.accountNumber}>
              <TableCell className="tableCell">{row?.propertyName}</TableCell>
              <TableCell className="tableCell">{row?.accountNumber}</TableCell>
              <TableCell className="tableCell">
                <Checkbox key={index} checked={isChecked[index]} value={row?.accountNumber}
                      onClick={(e) => toggleCheckboxValue(e)}>
                </Checkbox></TableCell>

            </TableRow>
          ))} 
        </TableBody>
      </Table>
    </TableContainer>
            </Grid>
          </Grid>
          <Grid item xs={12} md={3} mb={2}></Grid>
        </Grid>
        <Divider />

        <Footer>
          <Stack
            width="100%"
            spacing={2}
            direction="row"
            justifyContent="flex-end"
          >
            <Button onClick={onClose} variant="outlined">
              {" "}
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleUnlinkAccount}
              sx={{ backgroundColor: theme.palette?.customButton }}
            >
              Unlink Account
            </Button>

          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default UnlinkAccount
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
  width: "96%",
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

