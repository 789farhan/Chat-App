import React from 'react'

function Login() {
  return (
    <div className="formcontainer">
    <div className="forwrapper">
      <span className="logo">Logo</span>
      <span className="tite">Login</span>
      <form action="">
        <input type="email" title="email" placeholder="email" />
        <input type="password" title="password" placeholder="password" />
        <button>Sign in </button>
      </form>
      <p>You Dont have an account? Register</p>
    </div>
  </div>
  )
}

export default Login

