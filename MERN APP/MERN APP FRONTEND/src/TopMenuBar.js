import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

const TopMenuBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#333" }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          DataCast
        </Typography>
        <Typography sx={{ color: "white" }}>Pune: 29°C</Typography>
        <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
          <List>
            <ListItem
              button
              component={RouterLink}
              to="/home"
              onClick={toggleMenu}
            >
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/upload"
              onClick={toggleMenu}
            >
              <ListItemText primary="Upload Data" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/datagenerator"
              onClick={toggleMenu}
            >
              <ListItemText primary="Sample Data Generator" />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/contact"
              onClick={toggleMenu}
            >
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenuBar;
