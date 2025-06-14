import React, { useEffect } from 'react';
import  { useParams, useNavigate } from 'react-router-dom';
import { BACKEND_API_URL } from '../services/constants';

const ActivateAccount = () => {
    const navigate = useNavigate()
    const { token } = useParams()

    console.log(`Bearer: ${token}`)

    useEffect(() => {
        const activateUser = async() => {
            let response = await fetch(`${BACKEND_API_URL}/users/activate-account/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "token": token
                })
            })

            if (response.ok) {
                navigate("/login")
            } else {
                alert("Account activation failed!!, contact administrator for assistance!")
            }
        };
        activateUser()
    }, [])

  return (
    <div className='container'>
        <div className='row'>
            <h4>Your account has been successfully activated, you can not login</h4>
            <a href='/login'>Click here to login</a>
        </div>
    </div>
  )
}

export default ActivateAccount