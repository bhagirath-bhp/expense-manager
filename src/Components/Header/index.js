import React from 'react'
import { activeUser } from '../../App'
import { auth } from '../../FireBase/utils' 
import './styles.scss'

function signOut(){
  auth.signOut();
}

function Header() {
  return (
    <div className='main-head'>
        <h1>Expense Manager</h1>
        <div className="profile">
            <div className="profile-photo" style={ { backgroundImage: `url(${activeUser.photoURL})` } }>
              <div className="profile-details">
                <div className="user-name">{activeUser.displayName}</div>
                <button className="sign-out" onClick={signOut}>Sign Out</button>
              </div>
            </div>
            {/* <img src="https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg" alt="" className="profile-photo" /> */}
        </div>
    </div>
  )
}

export default Header