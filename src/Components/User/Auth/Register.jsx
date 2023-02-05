import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import "../../../Assets/common.css";
import { FaLock } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import { db, auth } from "../../../config/firebase";
import { toast, Toaster } from "react-hot-toast";
import ReactLoading from "react-loading";

export const Register = () => {
  const navigate = useNavigate();
  const [registerLoading, setregisterLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const registerWithEmailAndPassword = async (email, password) => {
    const authentication = getAuth();
    setregisterLoading(true);
    try {
      const res = createUserWithEmailAndPassword(
        authentication,
        email,
        password
      )
        .then((response) => {
          const user = response.user;
          setregisterLoading(false);
          db.collection("users").doc(user.uid).set({
            uid: user.uid,
            email,

            admin: false,
            amount: "0",
          });

          toast.success(`welcome ${response?.user?.email}`);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        })

        .catch((error) => {
          setregisterLoading(false);
          toast.error(` Wrong !${error?.message}`);
        });
    } catch (err) {
      setregisterLoading(false);
      toast.error(`Oops , Something went wrong...`);
    }
  };

  return (
    <>
      <div className="main-div">
        <div class="login-form">
          <div>
            <form>
              <div class="avatar">
                <FaLock />
              </div>
              <div class="login-logo">
                <img
                  src="/Images/logo1.jpg"
                  width={"100px"}
                  style={{ background: "transparent" }}
                ></img>
              </div>
              <h4 class="modal-title">Register</h4>
              <div class="form-group">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter Email"
                  required
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter Password"
                  required
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                />
              </div>

              {registerLoading ? (
                <ReactLoading
                  type={"spin"}
                  color={"#000000"}
                  height={30}
                  width={30}
                />
              ) : (
                <button
                  type="submit"
                  class="btn btn-primary btn-block btn-lg"
                  value="Login"
                  onClick={(e) => {
                    e.preventDefault();
                    registerWithEmailAndPassword(
                      registerData.email,
                      registerData.password
                    );
                  }}
                >
                  Register
                </button>
              )}
            </form>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "-16px 0 5px 0",
                background: "#f0eeee",
                padding: "5px 0px",
                color: "black",
              }}
            >
              Welcome to BetWinPlace
            </div>
          </div>
          <div class="text-center small">
            Do you have an account?{" "}
            <a
              style={{
                color: "black",
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </a>
          </div>
        </div>

        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          bottom: "-15px",
          position: "absolute",
          width: "100%",
          background: "#00000063",
          color: "white",
          padding: "3px 15px",
          fontSize: "8px",
        }}
      >
        For Inquiry and Balance Withdrawal Contact : 86 69 64 69 69 / 86 69 65
        69 69
      </p>
    </>
  );
};
