import React from "react";
import { TextField, Grid } from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

const FormInput = ({ name, label, value, onChange }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        defaultValue=""
        name={name}
        render={({ field }) => (
          <TextField
            fullWidth
            label={label}
            value={value}
            onChange={onChange}
            required
          />
        )}
      />
    </Grid>
  );
};

export default FormInput;