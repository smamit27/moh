import Box from "@mui/material/Box"
import React from "react"
import "./Footer.scss"
import imageSrc from "../../../assets/Images/mohegan_logo.png"

const Footer = () => {
  return (
    <>
      <Box component="footer" className="footer">
        <div className="footerbar"></div>
        <Box>
          <a data-testid="footer-image-link" className="logo" href="/">
            <img
              data-testid="logo-image-click"
              src={imageSrc}
              className="footerImage"
              alt={"Momentum Logo"}
              height={60}
            />
          </a>
        </Box>
      </Box>
    </>
  )
}

export default Footer
