import { TextField, TextFieldVariants } from "@mui/material";
import React from "react";
import classes from "./TextFieldUI.module.scss";

interface ITextFieldUI {
  id: string;
  label: string;
  variant: TextFieldVariants;
  value: string;
  onChange: Function;
}
export default function TextFieldUI({
  id,
  label,
  variant,
  value,
  onChange,
}: ITextFieldUI) {
  return (
    <div style={{ marginTop: "15px" }}>
      <TextField
        className={classes.text_field}
        slotProps={{
          inputLabel: {
            style: { color: "white" },
          },
          input: {
            style: {
              border: "1px solid white",
            },
          },
        }}
        id={id}
        label={label}
        variant={variant}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
      />
    </div>
  );
}
