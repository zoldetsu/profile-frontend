import { Edit } from "@mui/icons-material";
import { Button, TextFieldVariants } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";

interface IbuttonUI {
  id: string;
  label: string;
  variant: TextFieldVariants;
  value: string;
  onCLick: Function;
  endIcon?: string;
  children: string;
}

export default function ButtonUI({ ...props }: IbuttonUI) {
  return (
    <>
      <Button
        onClick={props.onCLick}
        className={classes.button}
        size="small"
        variant="contained"
        endIcon={<Edit />}
        sx={{ background: grey[700], borderRadius: 2 }}
      >
        Редактировать
      </Button>
    </>
  );
}
