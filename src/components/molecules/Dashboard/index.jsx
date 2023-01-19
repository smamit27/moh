import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PatronProfile from "../PatronProfile";
import PatronBalances from "../PatronBalances";
import PatronDetails from "../PatronDetails";
import HeaderBar from "./AppBar";
import { backDropLoaderCloseAction } from "../BackDropLoader/logic";
import Search from "./Search";
import Footer from "../Footer";
import { createTheme } from "@mui/material/styles";

const Dashboard = () => {
  const theme = createTheme();
  const [patronProfileDetails, setPatronProfileDetails] = useState(false);
  const dispatch = useDispatch();

  const { flag } = useSelector((state) => state.patronLocalDetails);
  const { open } = useSelector((state) => state.navigateHome);
  useEffect(() => {
    if (flag) {
      dispatch(backDropLoaderCloseAction());
      setPatronProfileDetails(true);
    }
  }, [flag, dispatch]);
  useEffect(() => {
    if (open) {
      dispatch(backDropLoaderCloseAction());
      setPatronProfileDetails(false);
    }
  }, [open, dispatch]);

  return (
    <>
      <Box>
        <HeaderBar />
        {!patronProfileDetails && (
          <Box
            component="main"
            sx={{
              padding: theme.spacing(2),
              color: "#f6f6f6",
              height: "40vh",
              flexGrow: 1,
              mt: 7,
              display: { xs: "block", sm: "block" },
            }}
          >
            <Search />
          </Box>
        )}
        {patronProfileDetails && (
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 10 }}>
            <PatronProfile />
            <Divider ml={2} />
            <Grid
              container
              rowSpacing={1}
              mt={2}
              mb={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item md={6} xs={12} sm={12}>
                <PatronBalances />
              </Grid>
              <Grid item md={6} xs={12} sm={12}>
                <PatronDetails />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};
export default Dashboard;
