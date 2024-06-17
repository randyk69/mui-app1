import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 18 },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DataGridTable() {
  const [count, setCount] = useState(0)
  const [selectedId, setSelectedId] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDelete = () => {
    setShowDeleteModal(true);
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  }

  const handleProceedDelete = () => {
    setShowDeleteModal(false);
    setSelectedId(null);
    const msg = 'pass record '+selectedId+' to api for deletion'
    console.log(msg);
  }

  const handleSelectedRecord = (selected) => {
    if (selected.length > 0) {
      setSelectedId(selected[0]);
    } else {
      setSelectedId(null);
    }
  }

  console.log('# selectedId ', selectedId);

  return (
    <>
      <div className="mb-5">
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleDelete} disabled={selectedId ? false : true}>Delete</Button>
        </Stack>
      </div>
      <div>
        <Box className="box-table">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            // rowSelectionModel={selectedId ? selectedId : 0}
            rowSelectionModel={selectedId ? [selectedId] : []}
            // disableRowSelectionOnClick
            // onRowClick={(params) => handleDeleteRecord(params)}
            onRowSelectionModelChange={(selected) => handleSelectedRecord(selected)}
          />
        </Box>
      </div>
      { showDeleteModal && (
        <Dialog
          open={showDeleteModal}
          onClose={handleCloseDeleteModal}
        >
          <DialogTitle className={`${selectedId ? 'bg-red-200' : ''}`}>
            Delete a record
          </DialogTitle>
          <DialogContent className="!pt-5">
            <DialogContentText>
              Proceed deleting record {selectedId}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteModal}>Cancel</Button>
            <Button onClick={handleProceedDelete} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  )
}

export default DataGridTable
