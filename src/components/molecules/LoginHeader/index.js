import Box from '@mui/material/Box' 
import React from 'react'
import './LoginHeader.scss'
import imageSrc from '../../../assets/Images/momentum_logo_grey.jpg'


const LoginHeader = () => {
    return (
        <Box component='header' boxShadow={3} p={1}> 
            <Box >
                <span data-testid='header-image-link' className="logo">
                        <img data-testid='logo-image-click'
                            src={imageSrc}
                            alt={'Momentum Logo'}
                            style={{width: '200px',height:'30px',padding:"10px"}}
                            />
                    </span>            
            </Box>
    </Box>
    )
}

export default LoginHeader