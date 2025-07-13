import React from "react";
import "../App.css";
import "./AccountPage.css";

const AccountPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return (
      <main className="main-content mt-5 pt-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="glass-panel rounded-4 shadow p-4 text-center">
                <h2 className="mb-4">Profile</h2>
                <div className="alert alert-warning">
                  You are not logged in.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="main-content mt-5 pt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="glass-panel rounded-4 shadow p-4 text-center">
              <h2 className="mb-4">Profile</h2>
              <div className="mb-3">
                <strong>Name:</strong> <span>{user.name}</span>
              </div>
              <div className="mb-3">
                <strong>Email:</strong> <span>{user.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
