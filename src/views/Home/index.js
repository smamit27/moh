import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Dashboard from '../../components/molecules/Dashboard'
import SignIn from '../../components/molecules/SignIn'
import { backDropLoaderCloseAction } from '../../components/molecules/BackDropLoader/logic' 

const Home = () => {
    const dispatch = useDispatch()
    const {flag} = useSelector(state => state.signIn)
    useEffect(() => {
        if(flag ){
            dispatch(backDropLoaderCloseAction())
        }
      },[flag,dispatch])

    return (
        <>
        { flag ? <Dashboard /> : <SignIn /> }
       </>
    )
}

export default Home