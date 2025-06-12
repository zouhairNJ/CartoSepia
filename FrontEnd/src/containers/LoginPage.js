import React, { useEffect, useState } from "react";
import "./LogineStyle.css";
import { Link, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { login, resteTegistered } from "../features/user";

function Login() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(resteTegistered());
  }, []);
  const { email, password } = formdata;

  // const onsubmit = async (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     return alert("password missmatch!");
  //   }
  //   dispatch(login({ email, password }));
  // };

  if (isAuthenticated) return <Navigate to={"/Product"} />;
  const onChangeHandler = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };
  return (
    <Layout title="Cartosepia | Login Page" content="Login Page">
      <div class="container">
        <div class="col-xl-12">
          <div class="card rounded-3 text-black">
            <div class="row g-0">
              <div class="col-lg-6">
                <div class="card-body p-md-5 mx-md-4">
                  <div class="text-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                      style={{ width: "185px" }}
                      alt="logo"
                    />
                    <h4 class="mt-1 mb-5 pb-1">We are The CartoSepia</h4>
                  </div>
                  <form onSubmit={onsubmit}>
                    <p>Please login to your account</p>
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

                    {/* <div className="form-group">
                      <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={onChangeHandler}
                        required
                      />
                    </div> */}

                    {error && (
                      <div className="alert alert-danger mt-2" role="alert">
                        {error}
                      </div>
                    )}
                    {loading ? (
                      <div class="d-flex justify-content-center">
                        <div class="spinner-border text-danger" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div class="text-center pt-1 mb-5 pb-1">
                          <button
                            class="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="submit"
                          >
                            Log in
                          </button>
                          <a class="text-muted" href="#!">
                            Forgot password?
                          </a>
                        </div>

                        <div class="d-flex align-items-center justify-content-center pb-4">
                          <p class="mb-0 me-2">Don't have an account?</p>
                          <Link to="/Register">
                            <button
                              type="button"
                              class="btn btn-outline-danger"
                            >
                              Create new
                            </button>
                          </Link>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </div>
              <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                  <h4 class="mb-4">We are more than just a company</h4>
                  <p class="small mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
