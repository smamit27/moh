import React from "react"
import { List, ListSubheader, Divider, Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"

const PatronBalances = () => {
  const {data:patronLocalDetail} = useSelector(state => state.patronLocalDetails)

  return (
    <List
      sx={{
        width: "100%",
        marginTop: "10px",
        borderRadius: "10px",
        boxShadow: "2px 4px 10px 1px rgb(201 201 201 / 47%)",
      }}
      subheader={
        <ListSubheader
          sx={{
            fontSize: "16px",
            color: "#222222",
            backgroundColor: "transparent",
          }}> Patron Balances
        </ListSubheader>
      }
    >
      <Divider variant="middle" />
      <Grid container>
        <Grid item  xs={12} md={6} mb={3} p={2} pb={0}>
          <Typography variant="body1" gutterBottom sx={{fontSize:'0.85rem'}} component="div">
            Global Momentum Number
          </Typography>
          <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom component="div">
            {patronLocalDetail?.gmNumber}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} mb={3}  p={2} pb={0}>
          <Typography variant="body1" gutterBottom sx={{fontSize:'0.85rem'}} component="div">
            Currency View
          </Typography>
          <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom component="div">
          {patronLocalDetail?.currencyCode}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} mb={2} p={2} pt={0}>
          <Typography variant="body1" sx={{fontSize:'0.85rem'}} gutterBottom component="div">
            Momentum Dollar Balance
          </Typography>
          <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom component="div">
            $ {patronLocalDetail?.totalMomentumDollarBalance}

          </Typography>
        </Grid>
        <Grid item xs={12} md={6} mb={2} p={2} pt={0}>
          <Typography variant="body1" sx={{fontSize:'0.85rem'}} gutterBottom component="div">
            Momentum Dollars Available
          </Typography>
          <Typography variant="subtitle2"sx={{fontWeight:'bold'}} gutterBottom component="div">
          {patronLocalDetail?.status === 'active' ? `${'$'} ${patronLocalDetail?.totalMomentumDollarBalance}` : `$0.00 - Suspended` }
          </Typography>
        </Grid>
      </Grid>
    </List>
  )
}
export default PatronBalances
