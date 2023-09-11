import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
function App() {
  const [count, setCount] = useState(0)
  const handleClick = async ()=>{
    try {
      // Define your API key and other request data
      const API_KEY = 'api_KlPhDoOuNEZFw5gJ17ZszliXvRIoNm3NSArtpe2qJ2XgyIlXpikhjZ9Ob2PmeJt7';
      const checkoutData = {
        client: 'Your Client Name',
        client_email: 'client@example.com',
        invoice_number: '123456', // Replace with your order number
        amount: 100, // Replace with your order total amount
        discount: 10, // Replace with your discount percentage
        back_url: 'https://your-website.com/checkout/success', // Replace with your success URL
        webhook_url: 'https://your-website.com/api/payment-webhook', // Replace with your webhook URL
        mode: 'EDAHABIA', // or 'CIB', choose the payment method
        comment: 'Payment for Order #123456', // Replace with your payment description
      };
      console.log(checkoutData);
  
      // Make the POST request to create a payment
      const response = await axios.post('http://epay.chargily.com.dz/api/invoice', checkoutData, {
        headers: {
          'X-Authorization': API_KEY,
          'Accept': 'application/json',
        },
      });
  
      // Handle the response
      if (response.status === 201) {
        // Payment created successfully
        const checkoutUrl = response.data.checkout_url;
        // Redirect the user to the checkout URL
        window.location.href = checkoutUrl;
      } else {
        console.error('Payment creation failed');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
