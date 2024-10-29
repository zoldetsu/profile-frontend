import { TextField, TextFieldVariants } from "@mui/material";
import React from "react";
import classes from "./TextFieldUI.module.scss";

interface ITextFieldUI {
  id: string;
  label: string;
  variant: TextFieldVariants;
  value: string;
  onChange: Function;
  theme?: string;
}
export default function TextFieldUI({
  id,
  label,
  variant,
  value,
  onChange,
  theme,
}: ITextFieldUI) {
  return (
    <div style={{ marginTop: "15px" }}>
      <TextField
        className={`${classes.text_field}`}
        slotProps={{
          inputLabel: {
            style: { color: theme === "light" ? "black" : "white" },
          },
          input: {
            style: {
              border: "1px solid white",
              color: theme === "light" ? "black" : "white",
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
