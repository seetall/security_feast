import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBell } from 'react-icons/fa';
import './Profile.css'; // Import custom CSS for profile page styling
import Navbar from '../../components/navbar/Navbar';

const Profile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        location: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = () => {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData) {
                setUser(userData);
            }
        };

        fetchUserData();
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(user));
        setMessage('Profile updated successfully');
    };

    return (
        <div>
            <Navbar/>

            <br/>
            <br/>
            <div className="profile-container">
                <div className="card profile shadow">
                    <div className="card-body">
                        <div className="profile-header">
                            {/* Profile picture removed */}
                            <div className="profile-info">
                                <h2 className="profile-name">{user.firstName} {user.lastName}</h2>
                                <p className="profile-email">{user.email}</p>
                            </div>
                            <button className="close-button" onClick={() => navigate('/')}>×</button>
                        </div>
                        {message && <p className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-danger'}`}>{message}</p>}
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="firstName" className="form-label">Name</label>
                                <input type="text" id="firstName" name="firstName" value={user.firstName} onChange={(e) => setUser({ ...user, firstName: e.target.value })} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email account</label>
                                <input type="email" id="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mobileNumber" className="form-label">Mobile number</label>
                                <input type="text" id="mobileNumber" name="mobileNumber" value={user.mobileNumber} onChange={(e) => setUser({ ...user, mobileNumber: e.target.value })} className="form-control" placeholder="Add number" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Location</label>
                                <input type="text" id="location" name="location" value={user.location} onChange={(e) => setUser({ ...user, location: e.target.value })} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-primary">Save Change</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
