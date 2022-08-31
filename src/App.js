import './App.scss';
import { auth, firestore } from './FireBase/utils';
import { useState } from 'react';

import Homepage from './Pages/Homepage';
import SignIn from './Pages/SignIn';
export let activeUser;

const App = () => {
  const [isUserSignedIn, setIsUserSignedIn] = useState(null)


  auth.onAuthStateChanged((authUser) => {
    activeUser = authUser;
    // console.log(activeUser.uid)
    if(authUser){
      firestore.collection(activeUser.uid).doc("personalInfo").set({
        name: activeUser.displayName,
        email: activeUser.email,
        uid: activeUser.uid,
      })
      return setIsUserSignedIn(true)
    }
    else{
      return setIsUserSignedIn(null)
    }
  })
  return isUserSignedIn ? (
    <>
      <div className="App">
        <div className="main">
          <Homepage/>
        </div>
      </div>
    </>
  ): (
    <>
      <div className="App">
        <div className="main">
          <SignIn/>
        </div>
      </div>
    </>
  )
}

export default App;
