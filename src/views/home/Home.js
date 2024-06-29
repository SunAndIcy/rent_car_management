import React from 'react';
import './Home.css'

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <div className="container">
        <div className="section">
          <h2>About Us</h2>
          <p>Our car rental platform is designed to better serve the New Zealand market, ensuring convenience and accessibility for all local communities, including Māori. We aim to provide a user-friendly and inclusive service that meets the unique needs of New Zealanders.</p>
          <div className="feature">
            <h3>User Interface</h3>
            <ul>
              <li><strong>Easy Registration and Login:</strong> Users can quickly sign up and log in using their email and password.</li>
              <li><strong>Profile Management:</strong> Users can manage their profiles, update personal information, and view rental history.</li>
            </ul>
          </div>
          <div className="feature">
            <h3>Car Listings</h3>
            <ul>
              <li><strong>Diverse Fleet:</strong> A wide range of vehicles to choose from, including compact cars, SUVs, and luxury vehicles.</li>
              <li><strong>Detailed Descriptions:</strong> Each car listing includes detailed information such as make, model, year, mileage, and price per day.</li>
            </ul>
          </div>
          <div className="feature">
            <h3>Flexible Rental Options</h3>
            <ul>
              <li><strong>Booking:</strong> Users can easily book cars for their desired dates and times.</li>
              <li><strong>Real-Time Availability:</strong> Check the real-time availability of vehicles to ensure you get the car you want when you need it.</li>
            </ul>
          </div>
          <div className="feature">
            <h3>Secure Transactions</h3>
            <ul>
              <li><strong>Secure Payments:</strong> Multiple payment options with secure processing to ensure the safety of your transactions.</li>
              <li><strong>Transparent Pricing:</strong> Clear and upfront pricing with no hidden fees.</li>
            </ul>
          </div>
          <div className="feature">
            <h3>Community Focus</h3>
            <ul>
              <li><strong>Inclusive Service:</strong> Our platform is designed to be inclusive and accessible to all communities, ensuring cultural sensitivity and respect.</li>
              <li><strong>Local Support:</strong> Dedicated support for local communities to address their specific needs and preferences.</li>
            </ul>
          </div>
        </div>
        <div className="section mission">
          <h2>Our Mission</h2>
          <p>Our mission is to provide a reliable and convenient car rental service that enhances the travel experience for everyone in New Zealand. By focusing on the needs of the local population, including Māori, we aim to create a platform that is not only functional but also culturally aware and supportive.</p>
        </div>
      </div>
    </div>
  );
}
