import { AddCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  IconButton,
  Paper,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DialogSlide from "./components/Modal";
import CustomizedTables from "./components/Table";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUsersQuery,
} from "./store/api/apiSlice";

function App() {
  const { data, isError, isLoading, error, isSuccess } = useGetUsersQuery();

  const [addUser, { isLoading: addUserLoading }] = useAddUserMutation();

  const [editUser, { isLoading: editUserLoading }] = useEditUserMutation();

  const {
    register: addUserRegister,
    handleSubmit: handleAddUserSubmit,
    formState: { errors: addUserErrors },
    reset: addReset,
  } = useForm();
  
  const onAddUserSubmit = async (data) => {
    await addUser(data);
    setAddModal(false);
  };

  const {
    register: editUserRegister,
    handleSubmit: handleEditUserSubmit,
    formState: { errors: editUserErrors },
    setValue,
  } = useForm();

  const onEditUserSubmit = async (data) => {
    await editUser({ id: user.id, ...data });
    setEditModal(false);
  };

  const [delUser, { isLoading: delLoading }] = useDeleteUserMutation();

  const onDelete = async () => {
    await delUser(user.id);
    setDelModal(false)
  };

  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [user, setUser] = useState(null);

  const onDeleteOpen = (user) => {
    setDelModal(true);
    setUser(user);
  };

  const onEditOpen = (user) => {
    setEditModal(true);
    setUser(user);
    setValue("fname", user.fname);
    setValue("lname", user.lname);
    setValue("email", user.email);
    setValue("age", user.age);
    setValue("phone", user.phone);
    setValue("address", user.address);
  };

  return (
    <Paper
      sx={{
        py: 4,
        minHeight: "80vh",
        maxWidth: "992px",
        margin: "70px auto",
        px: 4,
      }}
    >
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Users
      </Typography>
      {isLoading && (
        <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
          <CircularProgress color="success" />
        </Box>
      )}
      {isError && (
        <Box
          sx={{
            my: 3,
            display: "flex",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 20,
            color: colors.red["400"],
          }}
        >
          Ошибка {error.originalStatus}: {error.data}
        </Box>
      )}
      <IconButton
        color="success"
        onClick={() => {
          addReset();
          setAddModal(true);
        }}
      >
        <AddCircle />
      </IconButton>
      {isSuccess ? (
        <CustomizedTables
          users={data}
          onDeleteModal={onDeleteOpen}
          onEditModal={onEditOpen}
        />
      ) : null}

      <DialogSlide
        title="Add user"
        open={addModal}
        handleClose={() => {
          setAddModal(false);
        }}
      >
        <form onSubmit={handleAddUserSubmit(onAddUserSubmit)}>
          <DialogContent>
            <TextField sx={{margin:"7px 0"}}
               fullWidth
              label="First Name"
              {...addUserRegister("fname", { required: true })}
              helperText={!!addUserErrors["fname"] && "This is field required"}
              error={!!addUserErrors["fname"]}
            />

            <TextField
            fullWidth
              label="Last Name"
              {...addUserRegister("lname", { required: true })}
              helperText={!!addUserErrors["lname"] && "This is field required"}
              error={!!addUserErrors["lname"]}
            />

            <TextField sx={{margin:"7px 0"}}
            fullWidth
              type="number"
              label="Age"
              {...addUserRegister("age", { required: true })}
              helperText={!!addUserErrors["age"] && "This is field required"}
              error={!!addUserErrors["age"]}
            />

            <TextField 
            fullWidth
              type="email"
              label="Email"
              {...addUserRegister("email", { required: true })}
              helperText={!!addUserErrors["email"] && "This is field required"}
              error={!!addUserErrors["email"]}
            />

            <TextField sx={{margin:"7px 0"}} fullWidth label="Address" {...addUserRegister("address")} />

            <TextField fullWidth  label="Phone" {...addUserRegister("phone")} />
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setAddModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={Object.keys(addUserErrors).length > 0 || addUserLoading}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogSlide>

      <DialogSlide
        title="Edit user"
        fullWidth
        open={editModal}
        handleClose={() => {
          setEditModal(false);
        }}
      >
        <form onSubmit={handleEditUserSubmit(onEditUserSubmit)}>
          <DialogContent>
            <TextField sx={{margin:"7px 0"}}
            fullWidth
              label="First Name"
              {...editUserRegister("fname", { required: true })}
              helperText={!!editUserErrors["email"] && "This is field required"}
              error={!!editUserErrors["email"]}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Last Name"
              fullWidth
              {...editUserRegister("lname", { required: true })}
              helperText={!!editUserErrors["email"] && "This is field required"}
              error={!!editUserErrors["email"]}
              InputLabelProps={{ shrink: true }}
            />

            <TextField sx={{margin:"7px 0"}}
              type="number"
              label="Age"
              fullWidth
              {...editUserRegister("age", { required: true })}
              helperText={!!editUserErrors["email"] && "This is field required"}
              error={!!editUserErrors["email"]}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              type="email"
              label="Email"
              fullWidth
              {...editUserRegister("email", { required: true })}
              helperText={!!editUserErrors["email"] && "This is field required"}
              error={!!editUserErrors["email"]}
              InputLabelProps={{ shrink: true }}
            />

            <TextField sx={{margin:"7px 0"}}
            fullWidth
              label="Address"
              {...editUserRegister("address")}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
            fullWidth
              label="Phone"
              {...editUserRegister("phone")}
              InputLabelProps={{ shrink: true }}
            />
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={
                Object.keys(editUserErrors).length > 0 || editUserLoading
              }
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogSlide>

      <DialogSlide
        title="Delete user"
        open={delModal}
        handleClose={() => {
          setDelModal(false);
        }}
      >
        <DialogContent>
          Are you sure to delete {user?.fname} {user?.lname}?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="success" onClick={() => setDelModal(false)}>
            No
          </Button>
          <Button variant="contained" color="error" onClick={onDelete} disabled={delLoading}>
            Yes
          </Button>
        </DialogActions>
      </DialogSlide>
    </Paper>
  );
}

export default App;
