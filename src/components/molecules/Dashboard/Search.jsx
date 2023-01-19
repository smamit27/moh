import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  TextField,
  styled,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { patronDetailsAction, navigateHomeCloseAction } from "./logic";
import { backDropLoaderOpenAction } from "../BackDropLoader/logic";
import { useForm } from "react-hook-form";

export default function Search() {
  const dispatch = useDispatch();
  const { data:propertyDetails } = useSelector((state) => state.signIn);
  const { data: propertyIdData } = useSelector((state) => state.propertyId);
  const [property, setProperty] = useState("");
  const [propertyCheck, setPropertyCheck] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    const propertyId = data?.property ? data?.property : propertyDetails?.property
    const accountNumber = data?.accountNumber
    dispatch(backDropLoaderOpenAction());
    dispatch(patronDetailsAction(propertyId,accountNumber));
    dispatch(navigateHomeCloseAction());
  };
  const handleSuspensionReason = (event) => {
    setProperty(event.target.value);
    setPropertyCheck(true);
  };
  return (
    <Grid container spacing={2} sx={{ height: "80vh" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          item
          xs={12}
          md={12}
          sx={{ padding: { xs: "0px", sm: "40px" } }}
        >
          <Grid item xs={4} mt={1}>
            <Label>Account Number*</Label>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="accountNumber"
              name="accountNumber"
              type="text"
              size="medium"
              placeholder="Enter Account Number"
              {...register("accountNumber", {
                required: "Please enter account number",
                pattern: {
                  value: /^[1-9]+[0-9]*$/,
                  message: "Please Enter a Valid Number",
                },
              })}
              error={Boolean(errors.accountNumber)}
              helperText={errors.accountNumber?.message}
            />
          </Grid>
          {propertyDetails.property === 'G1' && (
          <>
          <Grid item xs={4} mt={4}>
            <Label>Property*</Label>
          </Grid>
          <Grid item xs={6} mt={3}>
            <FormControl
              sx={{ minWidth: "100%" }}
              error={propertyCheck ? false : Boolean(errors.property)}
            >
              <InputLabel>Property</InputLabel>
              <Select
                size="medium"
                {...register("property", {
                  required: "Please Select the property",
                })}
                labelId="property"
                id="property"
                value={property}
                name="property"
                label="property"
                onChange={handleSuspensionReason}
              >
                {propertyIdData.length > 0 &&
                  propertyIdData.map((property) => (
                    <MenuItem key={property?.propertyId}  value={property?.propertyId}>
                      {property?.propertyName}
                    </MenuItem>
                  ))}
              </Select>
              {!propertyCheck && (
                <FormHelperText>
                  {errors.property && errors.property?.message}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          </>
          )}
          <Grid item xs={5} ml={6} sx={{ textAlign: "right" }} mt={2}>
            <Button type="submit" variant="contained">
              Search
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}
const Label = styled("label")({
  fontSize: "16px",
  lineHeight: "20px",
  marginBottom: "10px",
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 0.6)",
});
