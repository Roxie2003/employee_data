import * as React from "react";
import { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const adminPages = ["Salary Slips"];
  const employeePages = [];
  const employeeSettings = ["Dashboard", "My Account", "Logout"];
  const adminSettings = ["Dashboard", "Logout"];

  useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem('user'))
    setUser(localUser)

    //eslint-disable-next-line
  }, []);

  const settingsRedirect = (setting) => {
    if (setting === 'Dashboard') {
      return '/';
    }
    else if (setting === 'My Account') {
      return '/myaccount';
    }
    else if (setting === 'Logout') {
      return '/login';
    }
  }

  const adminSettingsRedirect = (setting) => {
    if (setting === 'Dashboard') {
      return '/dashboard';
    }
    else if (setting === 'Logout') {
      return '/login';
    }
  }

  const logout = () => {
    localStorage.clear();
  }

  const blankFunc = () => { }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>

            <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
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
                {
                  user && user.admin &&
                  adminPages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link to='/salarySlip'>
                        <Typography textAlign="center">{page}</Typography>
                      </Link>
                    </MenuItem>
                  ))
                }
                {
                  user && user.employee &&
                  employeePages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Link to=''>
                        <Typography textAlign="center">{page}</Typography>
                      </Link>
                    </MenuItem>
                  ))
                }
              </Menu>
            </Box>

            <img
              src="./logo.png"
              alt="logo"
              className="hidden md:block w-10 md:mr-4"
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Payroll Management
            </Typography>

            <img src="./logo.png" alt="logo" className="md:hidden w-8 mr-2" />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                // fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Payroll Management
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {
                user && user.admin &&
                adminPages.map((page) => (
                  <Link to="/salarySlip" key={page}>
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))
              }
              {
                user && user.employee &&
                employeePages.map((page) => (
                  <Link to="" key={page}>
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  </Link>
                ))
              }
            </Box>

            {
              user && user.employee &&
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={(user.email).toUpperCase()} src="/static/images/avatar/2.jpg" />
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
                  {employeeSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu} to="/">
                      <Link to={settingsRedirect(setting)}>
                        <Button onClick={setting === 'Logout' ? logout : blankFunc} sx={{ color: "black" }}>
                          <Typography textAlign="center">{setting}</Typography>
                        </Button>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            }

            {
              user && user.admin &&
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  {adminSettings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu} to="/">
                      <Link to={adminSettingsRedirect(setting)}>
                        <Button onClick={setting === 'Logout' ? logout : blankFunc} sx={{ color: "black" }}>
                          <Typography textAlign="center">{setting}</Typography>
                        </Button>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            }

          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default Navbar;
