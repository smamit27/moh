import  React, { useState } from 'react'
import {Link} from "react-router-dom"
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import imageSrc from "../../../assets/Images/momentum_logo_grey.jpg"
import LogoutIcon from '@mui/icons-material/Logout'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { theme } from "../../../theme"
import { useDispatch } from 'react-redux'
import {navigateHomeOpenAction} from './logic'

const HeaderBar = () => {
  const dispatch = useDispatch()
  const [anchorElUser, setAnchorElUser] = useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
const redirectToHome = () => {
  dispatch(navigateHomeOpenAction())
}
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1}} data-testid='header-image-link' className="logo" >
                        <img data-testid='logo-image-click'
                            src={imageSrc}
                            className="logo"
                            alt={'Momentum Logo'}
                            style={{width: '200px'}}
                            />
        </Box>

          <Box sx={{ flexGrow: 0,mr: 2 }} onClick={redirectToHome}>
          <HomeOutlinedIcon fontSize='large'/>
         </Box>
          <Box sx={{ flexGrow: 0}}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Mohegan" src="/static/images/avatar/2.jpg" />
              </IconButton>              
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
            <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="left">User : 13200</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="left">Local  Property : MSCT</Typography>
            </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0,ml: 2 }}>
          <Link to="/login"><LogoutIcon fontSize='large'  sx={{ color: theme.palette.customSvgIcon }} ></LogoutIcon></Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default HeaderBar
