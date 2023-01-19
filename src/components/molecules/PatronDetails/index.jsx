import  React,{ useState ,useEffect} from "react"
import {useDispatch, useSelector} from 'react-redux'
import './PatronDetails.scss'
import {Button,Stack} from "@mui/material"
import MomentumSuspension from "../MomentumSuspension"
import MomentumLinked from "../MomentumLinked"
import MomentumAdjustment from "../MomentumAdjustment"
import MomentumTransaction from "../MomentumTransaction"
import Reports from '../Reports'
import {theme} from '../../../theme'
import { Typography } from "@mui/material"
import {getTransactionDetailsAction, linkedAccountListAction} from './logic'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from "../BackDropLoader/logic"
export default function PatronDetails() {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const {data:patronLocalDetail} = useSelector(state => state.patronLocalDetails)
  const {data: transactionDetailsData}= useSelector(state =>state.transactionDetails)
  const {data:linkedAccountsData } = useSelector(state => state.linkedAccountList)

  useEffect(() =>{
    if(transactionDetailsData.length > 0){
      dispatch(backDropLoaderCloseAction())
      setOpenModal('transaction')

    }
  }, [transactionDetailsData,dispatch])
  useEffect(() =>{
    if(linkedAccountsData.length > 0){
      dispatch(backDropLoaderCloseAction())
      setOpenModal('link')
    }
  }, [linkedAccountsData,dispatch])
  const handleTransaction = () => {
    dispatch(backDropLoaderOpenAction())
    dispatch(getTransactionDetailsAction({
      propertyId: patronLocalDetail?.propertyId,
      accountNumber: patronLocalDetail?.accountNumber
    }))
  }
  const handleLinkUnlink = () => {
    dispatch(backDropLoaderOpenAction())
    dispatch(linkedAccountListAction(patronLocalDetail?.gmNumber))
  }
  return (
    <div className="patron-option">
      <Stack direction="row" spacing={2} mt={1} justifyContent={'center'} alignItems='center'>
      <Button variant="contained" sx={{backgroundColor: theme.palette.linkButton,width: { xs: "100%", sm: "33%", md: "33%" }}} onClick={handleLinkUnlink}>Linked Properties </Button>
      <Button variant="contained" sx={{backgroundColor: theme.palette.linkButton,width: { xs: "100%", sm: "33%", md: "33%" }}} onClick={() => setOpenModal('reports')}>Reports </Button>

      </Stack>
      <Typography mt={1} variant="body1" sx={{fontSize:'1rem',fontWeight:'bold'}} gutterBottom component="div" align="center">Momentum Dollar Options</Typography>
      <Stack  spacing={1} mt={1} p={1} sx={{border: '2px solid #c6c6c6', borderRadius: theme.spacing(1), flexDirection: {xs: "column",sm: "row",md:"row"}}}>
      <Button variant="contained"  sx={{backgroundColor: theme.palette.customButton,width: { xs: "100%", sm: "33%", md: "33%" }}} onClick={handleTransaction}> Transaction Details </Button>
      <Button variant="contained" sx={{backgroundColor: theme.palette.customButton,width: { xs: "100%", sm: "33%", md: "33%" }}} onClick={() => setOpenModal('adjustment')}>Adjustment Details</Button>
      <Button variant="contained" sx={{backgroundColor: theme.palette.customButton,width: { xs: "100%", sm: "33%", md: "33%" }}} onClick={() => setOpenModal('suspension')}>Suspension Details</Button>
       </Stack>
       {openModal === 'reports' && <Reports open={openModal === 'reports'} onClose={() => setOpenModal(false)} />}
       {openModal === 'suspension' && <MomentumSuspension open={openModal === 'suspension'} onClose={() => setOpenModal(false)} />}
       {openModal === 'link' && <MomentumLinked open={openModal === 'link'} onClose={() => setOpenModal(false)} />}
       {openModal === 'adjustment' && <MomentumAdjustment open={openModal === 'adjustment'} onClose={() => setOpenModal(false)} />}
       {openModal === 'transaction' && <MomentumTransaction open={openModal === 'transaction'} onClose={() => setOpenModal(false)} />}

    </div>
  )
}
