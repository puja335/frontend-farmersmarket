import {
  AccountCircle,
  Dashboard,
  Logout,
  Settings,
  ShoppingCartRounded,
} from "@mui/icons-material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  Fab,
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/farmersmarketlogo.png";
import { useAuth } from "../../hooks/useAuth";
import useAppSelector from "../../hooks/useAppSelector";

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: "fixed", bottom: 20, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Links = ({ drawer, setIsOpenDrawer, isOpenDrawer }) => {
  const pageLinks = [
    { id: 1, linkName: "About", url: "/about" },
    { id: 2, linkName: "Categories", url: "/categories" },
    { id: 2, linkName: "Products", url: "/products" },
    { id: 3, linkName: "Services", url: "/ourservices" },
  ];

  return drawer ? (
    <List sx={{ mt: 1.5 }}>
      {pageLinks.map((link) => (
        <Link to={link.url} key={link.id}>
          <ListItem sx={{ minWidth: "12rem" }} disablePadding>
            <ListItemButton
              onClick={() => setIsOpenDrawer(!isOpenDrawer)}
              sx={{ ":hover": { bgcolor: "#E0F3D7" } }}
            >
              <ListItemText
                sx={{ marginLeft: "0.4rem" }}
                primary={link.linkName}
              />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  ) : (
    <ul className='flex p-0 sm:space-x-8 space-x-5 text-black'>
      {pageLinks.map((li) => (
        <Link to={li.url} key={li.id}>
          <li className='sm:text-base hover:text-gray-800 hover:scale-[0.99] text-sm'>
            {li.linkName}
          </li>
        </Link>
      ))}
    </ul>
  );
};

const Navbar = (props) => {
  const [isNavBarElevated, setIsNavbarElevated] = React.useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { user, isAuthenticated, logout } = useAuth();
  const items = useAppSelector((state) => state.cart.items);
  console.log("items", items);
  const navigate = useNavigate();
  const isSemiMediumScreen = useMediaQuery("(max-width: 900px)");
  const isLargeScreen = useMediaQuery("(max-width:1280px)");

  window.addEventListener("scroll", () => {
    setIsNavbarElevated(window.scrollY > 0);
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    handleClose();
    toast.success("Logged out successfully");
  };

  const renderUserMenu = () => {
    if (isAuthenticated) {
      return (
        <>
          <Avatar
            onClick={handleMenu}
            sx={{
              cursor: "pointer",
              bgcolor: "success.main",
              width: 35,
              height: 35,
              ml: 2,
            }}
            src={user?.profileImage}
          >
            {!user?.profileImage && user?.name?.slice(0, 2).toUpperCase()}
          </Avatar>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                if (user.role == "admin") {
                  navigate("/admin");
                } else {
                  navigate("/dashboard");
                }
                handleClose();
              }}
            >
              <Dashboard sx={{ mr: 1 }} fontSize='small' />
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/profile");
                handleClose();
              }}
            >
              <AccountCircle sx={{ mr: 1 }} fontSize='small' />
              Profile
            </MenuItem>
            {/* <MenuItem
              onClick={() => {
                navigate("/settings");
                handleClose();
              }}
            >
              <Settings sx={{ mr: 1 }} fontSize='small' />
              Settings
            </MenuItem> */}
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ mr: 1 }} fontSize='small' />
              Logout
            </MenuItem>
          </Menu>
        </>
      );
    }

    return (
      <Button
        onClick={() => navigate("/login")}
        size='medium'
        sx={{ textTransform: "capitalize", ml: 2 }}
        color='success'
        variant='contained'
      >
        Log in
      </Button>
    );
  };

  return (
    <nav className='fixed z-50'>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          sx={{
            bgcolor: isNavBarElevated ? "white" : "transparent",
            transition: "all 150ms ease-in-out",
          }}
        >
          <Toolbar>
            <Container
              disableGutters={isLargeScreen}
              sx={{ display: "flex", px: isLargeScreen ? 0.5 : 0 }}
            >
              {isSemiMediumScreen && (
                <IconButton
                  color='black'
                  onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                  edge='start'
                  sx={{ mr: 1 }}
                >
                  <MenuIcon fontSize='inherit' />
                </IconButton>
              )}

              <div className='flex w-full justify-between items-center'>
                <Link to='/'>
                  <img
                    className='sm:max-h-12 max-h-5 my-auto cursor-pointer'
                    src={logo}
                    alt='logo'
                  />
                </Link>

                <div className='flex items-center space-x-8'>
                  {isSemiMediumScreen ? (
                    <Drawer
                      anchor='left'
                      open={isOpenDrawer}
                      onClose={() => setIsOpenDrawer(!isOpenDrawer)}
                    >
                      <Links
                        setIsOpenDrawer={setIsOpenDrawer}
                        isOpenDrawer={isOpenDrawer}
                        drawer={true}
                      />
                    </Drawer>
                  ) : (
                    <Links
                      setIsOpenDrawer={setIsOpenDrawer}
                      isOpenDrawer={isOpenDrawer}
                    />
                  )}

                  <div className='flex items-center'>
                    <Tooltip title='Cart'>
                      <IconButton
                        onClick={() => navigate("/cart")}
                        color='warning'
                      >
                        <ShoppingCartRounded fontSize='inherit' />
                        {items.length > 0 && (
                          <span
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                              background: "red",
                              borderRadius: "50%",
                              color: "white",
                              padding: "0 5px",
                              fontSize: "12px",
                            }}
                          >
                            {items.length}
                          </span>
                        )}
                      </IconButton>
                    </Tooltip>
                    {renderUserMenu()}
                  </div>
                </div>
              </div>
            </Container>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar id='back-to-top-anchor' />

      <ScrollTop {...props}>
        <Fab color='warning' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </nav>
  );
};

export default Navbar;
