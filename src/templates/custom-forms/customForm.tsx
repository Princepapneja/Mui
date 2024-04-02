"use client";
import React, { useState } from "react";
import NewInvoice from "./searchInvoice";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CustomForm = () => {
  const fields = [
    {
      id: "date",
      label: "Invoice Date",
      type: "date",
      shrink: true,
    },
    {
      id: "inv",
      label: "Invoice Number",
      type: "number",
    },
    {
      id: "Name",
      label: "Exporter name",
      type: "text",
    },
    // {
    //   id: "state",
    //   label: "Invoice Number",
    //   type: "select",
    //   options: [
    //     {
    //       name: "india",
    //       value: "in",
    //     },
    //     {
    //       name: "Canada",
    //       value: "can",
    //     },
    //   ],
    // },
  ];
  const [state, setState] = useState("in");
  return (
    <>
      <div className="flex flex-wrap gap-8">
        {fields?.map((e: any, i: number) => {
          return (
            <div className="max-w-40 w-full">
              {e?.type === "select" ? (
                <>
                  {/* if needed but we have to change the labels */}
                  <InputLabel id="demo-simple-select-label">Age</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="State"
                    onChange={(event) => {
                      setState(event.target.value as string);
                    }}
                  >
                    {e?.options?.map((option: any) => {
                      return (
                        <MenuItem value={option.value}>{option.name}</MenuItem>
                      );
                    })}
                  </Select>
                </>
              ) : (
                <TextField
                  className="w-full"
                  id={e?.id}
                  label={e?.label}
                  type={e?.type}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: e?.shrink,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="max-w-40 w-full">
        <InputLabel id="state">State</InputLabel>

        <Select
          className="w-full"
          labelId="State"
          id="state"
          value={state}
          label="State"
          onChange={(event) => {
            setState(event.target.value as string);
          }}
        >
          <MenuItem value={"in"}>{"India"}</MenuItem>
          <MenuItem value={"CAN"}>{"Canada"}</MenuItem>
          <MenuItem value={"AM"}>{"America"}</MenuItem>
        </Select>
      </div>
      <Button variant="contained" className="mt-4">Save</Button>
    </>
  );
};

export default CustomForm;
