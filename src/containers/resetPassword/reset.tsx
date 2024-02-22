import React from 'react'
import { Route, Routes } from 'react-router-dom';
import EmailVerification from './emailVerification';
import ResetPasswordForm from './resetPassword';

export default function 
() {
  return (
    <div>
        <Routes>
            <Route path='/email' element={<EmailVerification />}></Route>
            <Route path='/reset' element={<ResetPasswordForm />}></Route>
        </Routes>
    </div>
  )
}
