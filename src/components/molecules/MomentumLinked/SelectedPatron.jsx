import * as React from "react"
import { List, ListSubheader, Divider, Grid, Typography } from "@mui/material"

const SelectedPatron = () => {
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
            fontSize: "14px",
            color: "#222222",
            backgroundColor: "transparent",
          }}> Selected Patron Details
        </ListSubheader>
      }
    >
      <Divider variant="middle" />
      <Grid container>
        <Grid item xs={12} md={6} mb={3} p={2} pb={0}>
          <Typography variant="body1" sx={{fontSize:'0.85rem'}}  gutterBottom component="div">
            First Name
          </Typography>
          <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom component="div">
            John
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} mb={3}  p={2} pb={0}>
          <Typography variant="body1" sx={{fontSize:'0.85rem'}}  gutterBottom component="div">
            Last Name
          </Typography>
          <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom component="div">
            Smith
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} mb={2} p={2} pt={0}>
          <Typography variant="body1" sx={{fontSize:'0.85rem'}}  gutterBottom component="div">
          Account Number
          </Typography>
          <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom component="div">
            12345654          
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} mb={2} p={2} pt={0}>
          <Typography variant="body1" sx={{fontSize:'0.85rem'}}   gutterBottom component="div">
          Date of Birth(MM/DD/YYYY)
            </Typography>
          <Typography variant="subtitle2" sx={{fontWeight:'bold'}} gutterBottom component="div">
          {'12/05/1984'}
          </Typography>
        </Grid>
      </Grid>
    </List>
  )
}
export default SelectedPatron
