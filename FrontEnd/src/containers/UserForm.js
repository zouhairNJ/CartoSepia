import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { register } from "../features/user";

function UserForm() {
  const dispatch = useDispatch();
  const { registered, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  // distruction
  const { firstname, lastname, email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onsubmit = (e) => {
    e.preventDefault();
    dispatch(register({ firstname, lastname, email, password }));
  };

  if (registered) return <Navigate to={"/login"} />;

  return (
    <div>
      <form onSubmit={onsubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="firstname">
            First Name
          </label>
          <input
            className="form-control"
            type="text"
            name="firstname"
            value={firstname}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="lastname">
            Last Name
          </label>
          <input
            className="form-control"
            type="text"
            name="lastname"
            value={lastname}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={email}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={password}
            onChange={onChangeHandler}
            required
          />
        </div>
        {loading ? (
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div class="text-center pt-1 mb-5 pb-1">
            <button
              class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
              type="submit"
            >
              Register
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
export default UserForm;
