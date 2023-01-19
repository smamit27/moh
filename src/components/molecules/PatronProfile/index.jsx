import React from "react"
import "./PatronProfile.scss"
import Divider from "@mui/material/Divider"
import { useSelector } from "react-redux"

const PatronProfile = () => {
  const {data:patronLocalDetail} = useSelector(state => state.patronLocalDetails)
  return (
    <>
      <div
        className="patron-details"
        data-testid="local-property-patron-details">
        Local Property Patron Details
      </div>
      <div className="widgets">
        <div className="widget">
          <div className="left">
            <span className="title" data-testid="patron-account-number">
              Account Number
            </span>
            <span className="counter">{patronLocalDetail?.accountNumber} </span>
          </div>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div className="widget">
          <div className="left">
            <span className="title" data-testid="patron-first-name">
              First Name
            </span>
            <span className="counter">{patronLocalDetail?.firstName} </span>
          </div>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div className="widget">
          <div className="left">
            <span className="title" data-testid="patron-last-name">
              Last Name
            </span>
            <span className="counter">{patronLocalDetail?.lastName} </span>

          </div>
        </div>
        <Divider orientation="vertical" variant="middle" flexItem />
        <div className="widget">
          <div className="left">
            <span className="title" data-testid="patron-date-of-birth">
              Date of Birth(MM/DD/YYYY)
            </span>
            <span className="counter"> {patronLocalDetail?.dob} </span>

          </div>
        </div>
        {/* <Divider orientation="vertical" variant="middle" flexItem />
        <div className="widget">
          <div className="left">
            <span className="title" data-testid="patron-status">
              Status
            </span>
            <span className="counter"> {patronLocalDetail?.status} </span>

          </div>
        </div> */}
      </div>
    </>
  )
}
export default PatronProfile

