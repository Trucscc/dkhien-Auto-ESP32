
const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");
// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {                                          // toggle UI elements. if user is logged in
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    //userDetailsElement.innerHTML = user.email;       //userDetailsElement.innerHTML = user.email;
    userDetailsElement.innerHTML = "Email: " + user.email + "<br> Uid: " + user.uid;    
  } else{                                              // toggle UI elements. if user is logged out
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
  // if (auth.currentUser !== null) 
  //   console.log("uid: " + auth.currentUser.uid);
}
