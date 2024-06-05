import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import UserForm from "./UserForm";
import UserAccount from "./UserAccount";
import API from "../../utils/API.js";




export default function FormComponent({ setForm, form, setToken, token, userData }) {

  const [edit, editUser] = useState(false)


  //console.log(userData)
  const close = () => {
    document.querySelector("#root").classList.remove("scrolled");
    setForm(false)
  }
  const exit = () => {
    window.localStorage.clear()
    close()
    setToken(false)
  }
  return (

    <div className={form ? "modalBox " : "modalBox hidden"}>
      <div className={`modalBox__container ${!token ? 'phone' : ''}`}>
        <div className="close-btn__container cursor-pointer relative z-30" onClick={close}>
          <div className="close-btn">
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="modalBox__container__content">
          {token ?
            <>
              {!userData.first_name || edit ?
                <UserForm setForm={setForm} form={form} userData={userData} token={token} /> :
                <UserAccount userData={userData} editUser={editUser} photos={userData.eggs_photos} exit={exit} />}
            </>
            :
            <LoginForm setToken={setToken} editUser={editUser} setForm={setForm} />}
        </div>
      </div>
    </div>
  )
}
