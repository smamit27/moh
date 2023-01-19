import { styled } from '@mui/system'
import React from 'react'

const LabelComponent = styled('label')({
    fontSize: "16px",
    lineHeight: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.6)",
    display: "block"
})

function Label(props) {
  return (
    <LabelComponent {...props}>
      {props.children}
    </LabelComponent>
  )
}

export default Label
