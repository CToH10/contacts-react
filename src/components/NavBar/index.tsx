import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import Person2Icon from "@mui/icons-material/Person2";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ContactForm } from "../Forms/Contact";
import { EditProfile } from "../Forms/Edit/Profile";
import { Delete } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import { UserContext } from "../../providers/user.provider";

type ModalOptions = "New Contact" | "Edit Profile" | "Edit Contact";

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [open, setOpenModal] = useState<boolean>(false);
  const [modBody, setModBody] = useState<ModalOptions>("New Contact");
  const { deleteUser } = useContext(UserContext);
  const navigate = useNavigate();

  const renderModBody = () => {
    switch (modBody) {
      case "New Contact":
        return <ContactForm />;
      case "Edit Contact":
        return "";
      case "Edit Profile":
        return <EditProfile />;
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setOpenModal(false);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setOpenModal(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <GroupsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              CONTACTS
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem
                  onClick={() => {
                    setModBody("New Contact");
                    handleCloseNavMenu();
                    setOpenModal(true);
                  }}
                >
                  <Typography textAlign="center">Add contact</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <GroupsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => {
                  setModBody("New Contact");
                  handleCloseNavMenu();
                  setOpenModal(true);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Add contact
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Person2Icon color="secondary" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={() => {
                    setModBody("Edit Profile");
                    handleCloseUserMenu();
                    setOpenModal(true);
                  }}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {open && (
        <Container>
          <Dialog
            open={open}
            onClose={() => setOpenModal(false)}
            aria-labelledby="Register form"
            aria-describedby="Registration for new users"
          >
            <DialogTitle>{modBody}</DialogTitle>
            <DialogContent>{renderModBody()}</DialogContent>
            {modBody === "Edit Profile" && (
              <DialogActions sx={{ justifyContent: "center" }}>
                <Button
                  type="button"
                  size="small"
                  rel="noopener nonreferrer"
                  aria-label="Delete contact"
                  sx={{
                    color: red[600],
                    ":hover": {
                      backgroundColor: red[50],
                    },
                  }}
                  onClick={() => {
                    deleteUser();
                    logout();
                  }}
                >
                  <Delete />
                </Button>
              </DialogActions>
            )}
          </Dialog>
        </Container>
      )}
    </>
  );
};
