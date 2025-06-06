import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const RegisterUser = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users", {
        name,
        email,
        password,
        confPassword,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form onSubmit={RegisterUser} className="box">
                <p className="has-text-centered">{msg}</p>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input type="text" className="input" value={name}
                      onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input type="email" className="input" value={email}
                      onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input type="password" className="input" value={password}
                      onChange={(e) => setPassword(e.target.value)} placeholder="******" required />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Confirm Password</label>
                  <div className="control">
                    <input type="password" className="input" value={confPassword}
                      onChange={(e) => setConfPassword(e.target.value)} placeholder="******" required />
                  </div>
                </div>
                <div className="field mt-4">
                  <button className="button is-primary is-fullwidth">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;