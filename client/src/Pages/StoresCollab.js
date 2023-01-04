import React, { Fragment } from 'react'
import StoresNavBar from '../Components/StoresNavBar'
import StoresSignUpForm from '../Components/StoresSignUpForm'
import StoresStartingSteps from '../Components/StoresStartingSteps'
import StoresWhyUs from '../Components/StoresWhyUs'

function StoresCollab() {
    return (
        <Fragment>
            <StoresNavBar />
            <StoresSignUpForm />
            <StoresWhyUs />
            <StoresStartingSteps />
        </Fragment>
    )
}

export default StoresCollab