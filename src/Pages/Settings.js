import React, { useState, useEffect } from 'react';

function Settings() {
    return (
        <div className="bg-light-blue" style={{ minHeight: '100vh', backgroundColor: '#8CBCE0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-8 col-md-10 col-sm-12">
                        <div className="card custom-shadow p-5">
                            <h2 className="mb-4 text-center">Account Settings</h2>
                            <h6 className='text-center'>Your data is secured & encrypted in our databases </h6>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input type="text" className="form-control form-control-lg" id="fullName" placeholder="Enter full name" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="eMail" className="form-label">Email</label>
                                    <input type="email" className="form-control form-control-lg" id="eMail" placeholder="Enter email ID" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input type="text" className="form-control form-control-lg" id="phone" placeholder="Enter phone number" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="website" className="form-label">Bank Info</label>
                                    <input type="url" className="form-control form-control-lg" id="website" placeholder="Website url" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="Street" className="form-label">Street</label>
                                    <input type="name" className="form-control form-control-lg" id="Street" placeholder="Enter Street" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="ciTy" className="form-label">City</label>
                                    <input type="name" className="form-control form-control-lg" id="ciTy" placeholder="Enter City" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="sTate" className="form-label">State</label>
                                    <input type="text" className="form-control form-control-lg" id="sTate" placeholder="Enter State" />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="zIp" className="form-label">Zip Code</label>
                                    <input type="text" className="form-control form-control-lg" id="zIp" placeholder="Zip Code" />
                                </div>
                                <div className="col-12">
                                    <div className="text-center">
                                        <button type="button" id="submit" name="submit" className="btn btn-secondary me-2">Cancel</button>
                                        <button type="button" id="submit" name="submit" className="btn btn-primary">Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;
