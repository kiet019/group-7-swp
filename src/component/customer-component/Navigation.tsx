import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { setup } from "../../config/setup";
import { Button, Container, Grid, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import WidgetsIcon from '@mui/icons-material/Widgets';
import { UserContext } from "../login/AuthContext";
import { useContext } from "react";
import SearchBox from "./navigation/SearchBox";
import CartButton from "./cart/CartButton";
export default function UserNavigation({ categoryList }: any) {
  const { logout, user } = useContext(UserContext)
  const settings = ['Profile', 'Logout'];
  const router = useRouter();
  const navItem = [
    { name: "about", url: "" },
    { name: "contact", url: "" },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          paddingBottom: "0.5rem",
          paddingTop: "0.5rem",
          color: setup.color,
          // boxShadow: "none",
          "& .MuiButtonBase-root": {
            boxShadow: "none",
            margin: "0 1rem",
            padding: "0px",
            color: setup.color,
            fontWeight: "700",
            fontSize: "medium",
          },
          "& .MuiButtonBase-root:hover": {  
            backgroundColor: "inherit",
            border: "none"
          },
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <div>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  display: {
                    xs: "none", sm: "block", cursor: "pointer",
                    letterSpacing: '.1rem',
                  },
                  paddingRight: "2rem",
                  fontFamily: 'Roboto Serif'
                }}
                onClick={() => {
                  router.push("/customer");
                }}
              >
                {setup.name}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  display: {
                    xs: "none", sm: "block", cursor: "pointer",
                    letterSpacing: '.1rem',
                    textAlign: "center",
                    fontFamily: 'Charm',
                    fontWeight: "550",
                  }
                }}
              >
                Decoration and Gift
              </Typography>
            </div>
            <SearchBox/>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {navItem.map((item, key) => (
                <Button key={key}>{item.name}</Button>
              ))}
              {user === null ? (
                <Button
                  onClick={() => {
                    router.push("/login");
                  }}
                  sx={{
                    transform: "scale(1.2)"
                  }}
                >
                  Login
                </Button>
              ) : (
                <>
                  <CartButton/>
                  <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, margin: "0 1rem",
                      transform: "scale(1.3)" }}>
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting}onClick={() => {
                  handleCloseUserMenu()
                  setting === "Logout" ? logout() : null
                  setting === "Profile" ? router.push("/customer/profile") : null
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
                </>
              )}
            </Box>
          </Toolbar>
          <div
            style={{
              height: "2rem",
              marginTop: "1rem",
              paddingTop: "0.5rem",
              borderTop: "1px solid white",
            }}
          >
            <Grid container spacing={0}>
              <Grid item xs={2.2}>
                <Button fullWidth>
                  <WidgetsIcon sx={{
                  }} />Danh mục
                </Button>
              </Grid>
              {categoryList != null ? categoryList.map((item: any) => (
                <Grid item xs={2.4} key={item.categoryId}>
                  <Button
                     fullWidth
                    onClick={() => {
                      router.push(`/customer/search?categoryId=${item.categoryId}`);
                    }}
                  >
                    {item.categoryName}
                  </Button>
                </Grid>
              )) : null}
            </Grid>
          </div>
        </Container>
      </AppBar>
    </Box>
  );
}
