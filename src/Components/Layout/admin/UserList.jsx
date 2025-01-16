import { Block, Delete, MoreVert, Search } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../../../utils/apiClient";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleBanUser = async (userId) => {
    try {
      await apiClient.patch(`/admin/users/${userId}/ban`);
      setUsers(
        users.map((user) =>
          user._id === userId
            ? {
                ...user,
                status: user.status === "active" ? "banned" : "active",
              }
            : user
        )
      );
      toast.success("User status updated");
    } catch (error) {
      toast.error("Failed to update user status");
    }
    setAnchorEl(null);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await apiClient.delete(`/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
    setAnchorEl(null);
  };

  const handleMenuOpen = (event, user) => {
    setSelectedUser(user);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get("/users/all");
        setUsers(response.data.data || []);
      } catch (error) {
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-6'>
      <div className='mb-6 flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>Users</h2>
        <TextField
          placeholder='Search users...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size='small'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Joined On</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className='flex items-center gap-3'>
                    <Avatar src={user.profileImage}>
                      {user.name.charAt(0)}
                    </Avatar>
                    <div>
                      <p className='font-medium'>{user.name}</p>
                      <p className='text-sm text-gray-500'>
                        ID: {user._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs
                   ${
                     user.role === "admin"
                       ? "bg-purple-100 text-purple-800"
                       : "bg-gray-100 text-gray-800"
                   }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs
                   ${
                     user.status === "active"
                       ? "bg-green-100 text-green-800"
                       : "bg-red-100 text-red-800"
                   }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => handleBanUser(selectedUser?._id)}
          sx={{
            color:
              selectedUser?.status === "active" ? "error.main" : "success.main",
          }}
        >
          <Block sx={{ mr: 1 }} />
          {selectedUser?.status === "active" ? "Ban User" : "Unban User"}
        </MenuItem>
        <MenuItem
          onClick={() => handleDeleteUser(selectedUser?._id)}
          sx={{ color: "error.main" }}
        >
          <Delete sx={{ mr: 1 }} />
          Delete User
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UsersList;
