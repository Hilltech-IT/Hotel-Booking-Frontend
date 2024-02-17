import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams, useLocation } from "react-router-dom";


const PaymentCallback = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const trxref = searchParams.get('trxref');
    const reference = searchParams.get('reference');

    console.log(`Ref: ${reference}, Txr: ${trxref}`)
    

    const handleCallbackData = async(e) => {
        //e.preventDefault();

        try {
            const response = await fetch(`http://34.171.61.167:3000/payments/paystack-callback/?trxref=${trxref}&reference=${reference}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (response.ok) {
                // Registration successful, you can redirect or perform other actions here
                console.log("Password reset successful!");
                navigate("/");
            } else {
                // Handle registration errors here
                const errorData = await response.json(); // Assuming the server sends error messages in JSON format
                setError(errorData.message || "An error occurred. Please try again.");
            }
            
        } catch (error) {
            console.error("Error occurred:", error);
            setError("An error occurred. Please try again."); // Update error state in case of a network or other errors
        }
    }
    handleCallbackData()
  return (
    <div>
        <h5>TRXREF: {trxref}</h5>
        <h5>Ref: {reference}</h5>
    </div>
  )
}

export default PaymentCallback