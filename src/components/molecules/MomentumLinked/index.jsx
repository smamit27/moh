import React, {useState, useEffect} from "react"
import { useDispatch,useSelector } from "react-redux"

import { Modal, Box,Paper, styled, Button, Stack, Grid,Divider,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow } from "@mui/material"
import "./LinkUnlinked.scss" 
import { theme } from "../../../theme"
import PatronProfile from "../PatronProfile"
import LinkAccount from "./LinkAccount"
import UnlinkAccount from "./UnlinkAccount"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import {navigateHomeOpenAction} from '../Dashboard/logic'
import { linkedAccountListResetAction } from "../PatronDetails/logic";

function MomentumLinked({ open = false, onClose }) {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [linkedList,setLinkedList] = useState([]);

  const {data:linkedAccountsData } = useSelector(state => state.linkedAccountList)
  useEffect(()=>{
    if(linkedAccountsData?.length > 0) {
      setLinkedList(linkedAccountsData)
    }
  },[linkedAccountsData])
  const onCloseBtn = () => {
    dispatch(linkedAccountListResetAction())
     onClose()  
  }
  const redirectToHome = () => {
    dispatch(linkedAccountListResetAction())
    dispatch(navigateHomeOpenAction())  
  }
  return (
    <>
    <Modal open={open} sx={{overflowY: "scroll"}}>
      <Box sx={style}>
        <Header>
          <Typography mt={1} onClick={onCloseBtn}> <ArrowBackIosIcon />
          </Typography>
          <HeaderTitle data-testid="momentum-linked">
            Linked Properties
          </HeaderTitle>
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
          <Grid item xs={12} md={6} p={"10px"}>
            <Grid container p={3} sx={{ boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
                borderRadius: "10px",
              }}>
                <Grid item xs={12} md={12} mb={2}>
                  <Typography sx={{mb:1,fontWeight: 'bold'}}> Linked Property & Account Number </Typography>
                  <Divider />
                </Grid>
                <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">LINKED PROPERTY</TableCell>
            <TableCell className="tableCell">PROPERTY ACCT #</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {linkedList?.map((row) => (
            <TableRow key={row?.accountNumber}>
              <TableCell className="tableCell">{row?.propertyName}</TableCell>
              <TableCell className="tableCell">{row?.accountNumber}</TableCell>
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
          <Stack  width="100%" spacing={2} direction="row" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{ backgroundColor: theme.palette?.customButton }}
              onClick={() => setOpenModal('unlinkaccount')} >
              Unlink Account
            </Button>
            <Button variant="contained" sx={{ backgroundColor: theme.palette?.linkButton }}
              onClick={() => setOpenModal('linkaccount')}>
              Link Account
            </Button>
          </Stack>
        </Footer>
      </Box>  
    </Modal>
    {openModal === 'linkaccount' && <LinkAccount open={openModal === 'linkaccount'} onClose={() => setOpenModal(false)} />}
    {openModal === 'unlinkaccount' && <UnlinkAccount open={openModal === 'unlinkaccount'} onClose={() => setOpenModal(false)} />}
     
    </>
  )
}

export default MomentumLinked

const style = {
  position: "absolute",
  width: '95%',
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