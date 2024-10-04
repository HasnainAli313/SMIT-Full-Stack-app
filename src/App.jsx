// import { useEffect, useState } from "react"
// import axios from 'axios'

// const API_URL = 'http://localhost:3000/api/users'

// function App() {

//   const [users, setUsers]  = useState([])
//  const [newUser, setNewUser] = useState('');
//  const [updateUser, setUpdateUser] = useState({ id: '', name: '' });

//  async function fetchUsers(){
//   const response = await axios.get(API_URL)
//   const content = response.data
  
//   setUsers(content.data)
// }

// useEffect(()=>{
//   fetchUsers()
//  },[])


//  const addUser = () => {
//   axios.post(API_URL, { name: newUser })
//     .then(response => {
//       setUsers([...users, response.data]);
//       setNewUser(''); // Reset input
//       fetchUsers()
//     })
//     .catch(err => console.error(err));
// };

// const updateUserById = (id) => {
//   axios.put(`${API_URL}/${id}`, { name: updateUser.name })
//     .then(response => {
//       setUsers(users.map(user => (user.id === id ? response.data : user)));
//       setUpdateUser({ id: '', name: '' }); // Reset input
//       fetchUsers()
//     })
//     .catch(err => console.error(err));
// };

// const deleteUserById = (id) => {
//   axios.delete(`${API_URL}/${id}`)
//     .then(() => {
//       setUsers(users.filter(user => user.id !== id));
//     })
//     .catch(err => console.error(err));
// };


//   return (
//       <>
//           <h1>CRUD Operations with Express & React</h1>
//       <input
//         type="text"
//         value={newUser}
//         onChange={(e) => setNewUser(e.target.value)}
//         placeholder="Enter new user"
//       />
//       <button onClick={addUser}>Add User</button>

//       {updateUser.id && (
//         <div>
//           <input
//             type="text"
//             value={updateUser.name}
//             onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
//             placeholder="Update user name"
//           />
//           <button onClick={() => updateUserById(updateUser.id)}>Update User</button>
//         </div>
//       )}

// <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             {user.name}
//             <button onClick={() => setUpdateUser({ id: user.id, name: user.name })}>
//               Edit
//             </button>
//             <button onClick={() => deleteUserById(user.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       </>
//   )
// }

// export default App

import { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const API_URL = "https://smit-node-vercel.vercel.app/api/users";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  async function fetchUsers() {
    const response = await axios.get(API_URL);
    const content = response.data;

    setUsers(content.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddDialogOpen = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditDialogOpen = (user) => {
    setUpdateUser(user);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setUpdateUser({ id: "", name: "", email: "" });
  };

  const handleAddUser = () => {
    axios
      .post(API_URL, newUser)
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUser({ name: "", email: "" }); // Reset input
        fetchUsers();
        handleAddDialogClose();
      })
      .catch((err) => console.error(err));
  };

  const handleUpdateUser = () => {
    axios
      .put(`${API_URL}/${updateUser.id}`, { name: updateUser.name, email: updateUser.email })
      .then((response) => {
        setUsers(users.map((user) => (user.id === updateUser.id ? response.data : user)));
        fetchUsers();
        handleEditDialogClose();
      })
      .catch((err) => console.error(err));
  };

  const deleteUserById = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Management System</h1>
      <Button variant="contained" color="primary" onClick={handleAddDialogOpen}>
        Add User
      </Button>

      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={updateUser.name}
            onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={updateUser.email}
            onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditDialogOpen(user)}
                    className="mr-2"
                  >
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => deleteUserById(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>  
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
