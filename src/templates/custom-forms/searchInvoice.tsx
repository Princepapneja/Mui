"use client"
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

function createData(
id:number,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return {id, name, calories, fat, carbs, protein };
}
const mainRows: any = [
  
  createData(0,"Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData(1,"Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData(2,"Eclair", 262, 16.0, 24, 6.0),
  createData(3,"Cupcake", 305, 3.7, 67, 4.3),
  createData(4,"Gingerbread", 356, 16.0, 49, 3.9),
];
const initialEditData = {
  id:null,
  name: "",
  calories: 0,
  fat: 0,
  carbs: 0,
  protein: 0,
};

export default function SearchInvoice() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(initialEditData);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(mainRows);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = (rowData: any) => {
    setEditData(rowData);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    const updatedRows: any = rows.map((row: any) => {
      if (row.id === editData.id) {
        return editData;
      }
      return row;
    });
    debugger
    setRows(updatedRows);
    setOpenModal(false);
    alert("Data updated successfully")
  };

  const filteredRows = rows.filter((row) =>
    Object.values(row).some(
      (value) =>
        (typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof value === "number" &&
          value.toString().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div>
      <TextField
        id="search"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        className="mb-4"
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row: any, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleOpenModal(row)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 max-w-md w-full">
          <h2 className="mb-4">Edit Row</h2>
          <div className="space-y-4 ">
            <TextField
              label="Name"
              name="name"
              className="w-full"

              value={editData.name}
              onChange={handleEditDataChange}
            />
            <TextField
              label="Calories"
              name="calories"
              type="number"
              className="w-full"
              value={editData.calories}
              onChange={handleEditDataChange}
            />
            <TextField
              label="Fat"
              name="fat"
              className="w-full"
              type="number"

              value={editData.fat}
              onChange={handleEditDataChange}
            />
            <TextField
              label="Carbs"
              type="number"

              name="carbs"
              className="w-full"
              value={editData.carbs}
              onChange={handleEditDataChange}
            />
            <TextField
              label="Protein"
              name="protein"
              className="w-full"
              type="number"

              value={editData.protein}
              onChange={handleEditDataChange}
            />
            <Button variant="contained" onClick={handleSaveEdit}>
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
