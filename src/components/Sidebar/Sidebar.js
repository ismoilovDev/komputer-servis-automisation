import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { MdArrowDropDown, MdArrowDropUp, MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { HiOutlineDocumentAdd, HiOutlineUsers } from "react-icons/hi";
import { RiPlayListAddLine } from "react-icons/ri";
import { IoLayersOutline } from "react-icons/io5";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CgMenuGridR } from "react-icons/cg";
import { FiServer } from "react-icons/fi";
import Drawers from '../Drawer/Drawer'
import { Link } from 'react-router-dom';
import { Collapse, ListItemButton, Tooltip, Alert } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { VscHistory } from "react-icons/vsc";
import { makeStyles } from '@mui/styles';
import { RiShoppingBag3Line } from "react-icons/ri";
import http from '../../Services/getData';
import './Sidebar.css';

const drawerWidth = 240;
const useStyles = makeStyles({
   linkIcon: {
      minWidth: "30px",
      display: 'none'
   },
   linkSvg: {
      fontSize: "1.2rem",
      fontWeight: 400,
      marginLeft: '15px'
   }
})

function ResponsiveDrawer(props) {
   const { window } = props;
   const classes = useStyles();
   const [mobileOpen, setMobileOpen] = useState(false);
   const [open, setOpen] = useState(false);
   const [state, setState] = useState(false)
   const [categories, setCategories] = useState([])

   useEffect(() => {
      getAllCategory()
   }, [])

   const getAllCategory = async () => {
      await http
         .get("/category/categories")
         .then(res => {
            console.log(res.data);
            setCategories(res.data);
         })
         .catch(err => console.log(err))
   }

   const handleClick = () => {
      setOpen(!open);
   };

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const toggleDrawer = () => {
      setState(!state);
   };
   const drawer = (
      <div className='drawer sidebar'>
         <Toolbar className='toolbar'>
            <Link className='logo' to="/">
               Logo
            </Link>
         </Toolbar>
         <Box sx={{ overflowX: 'hidden' }}>
            <List>
               <div className='category-link-box'>
                  <span className='category-link'>??????????????????</span>
                  <ListItemButton onClick={handleClick}>
                     <ListItemIcon className="my_link">
                        <AiOutlineAppstoreAdd className={classes.linkSvg} />
                     </ListItemIcon>
                     <ListItemText className='for-font' primary="????????????????" />
                     {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" className='drop_collapse' unmountOnExit>
                     <Link to="/add-categories" onClick={() => setMobileOpen(false)} className='collapse_link'>
                        <ListItem button>
                           <ListItemText primary='??????????????????' />
                        </ListItem>
                     </Link>
                     <Link to="/add-sub-categories" className='collapse_link'>
                        <ListItem button>
                           <ListItemText primary='?????? ??????????????????' />
                        </ListItem>
                     </Link>
                     <Link to="/add-double-sub-categories" className='mb-1 collapse_link' >
                        <ListItem button>
                           <ListItemText primary='?????? ?????? ??????????????????' />
                        </ListItem>
                     </Link>
                  </Collapse>
                  <Link to="/categories" onClick={() => setMobileOpen(false)}>
                     <ListItem button>
                        <ListItemIcon className="my_link">
                           <IoLayersOutline className={classes.linkSvg} />
                        </ListItemIcon>
                        <ListItemText primary='??????????????????' />
                     </ListItem>
                  </Link>
               </div>
               <div className='category-link-box'>
                  <span className='category-link'>????????????????</span>
                  <Link to="/add-products" onClick={() => setMobileOpen(false)}>
                     <ListItem button>
                        <ListItemIcon className="my_link">
                           <RiPlayListAddLine className={classes.linkSvg} />
                        </ListItemIcon>
                        <ListItemText primary='????????????????' />
                     </ListItem>
                  </Link>
                  <Link to="/products" onClick={() => setMobileOpen(false)}>
                     <ListItem button>
                        <ListItemIcon className="my_link">
                           <FiServer className={classes.linkSvg} />
                        </ListItemIcon>
                        <ListItemText primary='????????????????' />
                     </ListItem>
                  </Link>
               </div>
               <div className='category-link-box'>
                  <span className='category-link'>????????????</span>
                  <Link to="/add-baskets" onClick={() => setMobileOpen(false)}>
                     <ListItem button>
                        <ListItemIcon className="my_link">
                           <HiOutlineDocumentAdd className={classes.linkSvg} />
                        </ListItemIcon>
                        <ListItemText primary='???????????????? ????????????' />
                     </ListItem>
                  </Link>
                  <Link to="/all-baskets" onClick={() => setMobileOpen(false)}>
                     <ListItem button>
                        <ListItemIcon className="my_link">
                           <VscHistory className={classes.linkSvg} />
                        </ListItemIcon>
                        <ListItemText primary='?????????????? ????????????' />
                     </ListItem>
                  </Link>
               </div>
               <div className='category-link-box'>
                  <span className='category-link'>??????????????</span>
                  <ListItem onClick={toggleDrawer} button>
                     <ListItemIcon className="my_link">
                        <HiOutlineUserAdd className={classes.linkSvg} />
                     </ListItemIcon>
                     <ListItemText className='for-font' primary='????????????????' style={{ "cursor": "pointer" }} />
                  </ListItem>
                  <Link to="/clients" onClick={() => setMobileOpen(false)}>
                     <ListItem button>
                        <ListItemIcon className="my_link">
                           <HiOutlineUsers className={classes.linkSvg} />
                        </ListItemIcon>
                        <ListItemText primary='??????????????' />
                     </ListItem>
                  </Link>
               </div>
               <div className='category-link-box'>
                  <span className='category-link'>??????????????????</span>
                  <Link to="/postmans" onClick={() => setMobileOpen(false)}>
                     <ListItem button>
                        <ListItemIcon className="my_link">
                           <RiShoppingBag3Line className={classes.linkSvg} />
                        </ListItemIcon>
                        <ListItemText primary='Postmans' />
                     </ListItem>
                  </Link>
               </div>
            </List>
         </Box>
      </div>
   );

   const container = window !== undefined ? () => window().document.body : undefined;

   return (
      <Box sx={{ display: 'flex' }}>
         <CssBaseline />
         <AppBar
            className="header"
            position="fixed"
            style={{zIndex: 1200}}
            sx={{
               width: { sm: `calc(100% - ${drawerWidth}px)` },
               ml: { sm: `${drawerWidth}px` },
            }}
         >
            <Toolbar className='d-flex justify-content-between'>
               <Typography className="cate_link h-100" component="div">
                  <CgMenuGridR />
                  <nav className='my_drop'>
                     <ul className='my_drop_ul'>
                        {
                           categories.map((cate, id) => {
                              return (
                                 <li key={id} className='my_drop_main_ul_li'>
                                    <div className='drop_text one'>
                                       <Link to={`/selected-products/${cate.id}`}>{cate.name}</Link>
                                       {
                                          cate.children.length !== 0 ? <MdKeyboardArrowRight /> : ""
                                       }
                                    </div>
                                    <div className='sub_child'>
                                       {
                                          cate.children.length !== 0 ? (
                                             <ul className='sub_child_ul'>
                                                {
                                                   cate.children.map((sub_cate, i) => (
                                                      <li key={i} className='sub_child_ul_li'>
                                                         <div className='drop_text two'>
                                                            <Link to={`/selected-products/${sub_cate.id}`}>{sub_cate.name}</Link>
                                                            {
                                                               sub_cate.children.length !== 0 ? <MdKeyboardArrowRight /> : ""
                                                            }
                                                         </div>
                                                         <div className='sub_sub_child'>
                                                            {
                                                               sub_cate.children.length !== 0 ? (
                                                                  <ul className='sub_sub_child_ul'>
                                                                     {
                                                                        sub_cate.children.map((sub_sub_cate, index) => (
                                                                           <li className='sub_sub_child_li' key={index}>
                                                                              <div className='drop_text three'>
                                                                                 <Link to={`/selected-products/${sub_sub_cate.id}`}>{sub_sub_cate.name}</Link>
                                                                              </div>
                                                                           </li>
                                                                        ))
                                                                     }
                                                                  </ul>
                                                               ) : (
                                                                  <Alert severity="warning">?? ?????? ?????? ??????????????????!</Alert>
                                                               )
                                                            }
                                                         </div>
                                                      </li>
                                                   ))
                                                }
                                             </ul>
                                          ) : (
                                             <Alert severity="warning">?? ?????? ?????? ??????????????????!</Alert>
                                          )
                                       }
                                    </div>
                                 </li>
                              )
                           })
                        }
                     </ul>
                  </nav>
               </Typography>
               <div className="d-flex align-items-center justify-content-between w-100">
                  <div>
                     <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                     >
                        <MenuIcon />
                     </IconButton>
                  </div>
                  <div>
                     <Tooltip title="Role">
                        <Typography className='d-flex align-items-center justify-content-between' variant="h6" noWrap component="div">
                           <FaUserCircle className='mx-2' />
                           <p>
                              Buxgalter
                           </p>
                        </Typography>
                     </Tooltip>
                  </div>
               </div>
            </Toolbar>
         </AppBar>
         <Drawers
            state={state}
            setState={setState}
            toggleDrawer={toggleDrawer}
         />
         <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
         >
            <Drawer
               container={container}
               variant="temporary"
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true,
               }}
               sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
               }}
            >
               {drawer}
            </Drawer>
            <Drawer
               variant="permanent"
               sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
               }}
               open
            >
               {drawer}
            </Drawer>
         </Box>
      </Box>
   );
}

ResponsiveDrawer.propTypes = {
   window: PropTypes.func,
};

export default ResponsiveDrawer;