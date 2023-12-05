document.addEventListener("DOMContentLoaded", function(){
        // Để lấy hồ sơ thông tin người dùng, hãy sử dụng các thuộc tính của một Người dùng phiên bản. Ví dụ:
        // const user = auth.currentUser;
    /* if (auth.currentUser !== null) {
        // Đối tượng người dùng có các thuộc tính cơ bản như tên hiển thị, email, v.v. thì khai báo
                 const displayName = user.displayName;
                 const email = user.email;
                 const photoURL = user.photoURL;
                 const emailVerified = user.emailVerified; 
    
        //  Mỗi người dùng có 'UID' là duy nhất cho node RealTime. Không được dùng giá trị uid này để xác thực với Firebase,
        //  nếu bạn có một. Thay vào đó nên sử dụng 'User.getIdToken()' để thay thế. 

             const uid = user.uid;
             user.providerData.forEach((profile) => {
                 console.log("Sign-in provider: " + profile.user.providerId);
                 console.log("  Provider-specific UID: " + profile.user.uid);
                 console.log("  Name: " + profile.user.displayName);
                 console.log("  Email: " + profile.user.email);
             });
           }    
    */

    // lắng nghe sự thay đổi trạng thái auth (listen for auth status changes)
    auth.onAuthStateChanged(user => {
        if (user) {                 // Người dùng đã đăng nhập, xem tài liệu để biết danh sách các thuộc tính có sẵn
                                    // https://firebase.google.com/docs/reference/js/firebase.User
            console.log("user logged in");
            //console.log(user);
            if (auth.currentUser !== null) {
                localStorage.setItem("uid", auth.currentUser.uid );
                localStorage.setItem("email", auth.currentUser.email);
               } 
            setupUI(user);
        } else {
            console.log("user logged out");
                localStorage.removeItem("uid");    // xóa bộ nhớ vói tên biến "name of localStorage variable" ; 
                localStorage.removeItem("email");  // xóa bộ nhớ vói tên biến "name of localStorage variable"
                setupUI();                         //Để lấy giá trị biền x có trong bộ nhớ  localStorage.getItem("x")
        }
    })
    

    // login
    const loginForm = document.querySelector('#login-form');                        // Truy vấn vào database có id '#login-form' lấy data gán cho biến loginForm
    loginForm.addEventListener('submit', (e) => {
            e.preventDefault();                                                     // get user info mặt định trước đó
            const email = loginForm['input-email'].value;                           // gán giá trị ô 'input-email' vào biến email
            const password = loginForm['input-password'].value;                     // gán giá trị ô 'input-password' vào biến password
            auth.createUserWithEmailAndPassword(email, password).then((cred) => {   // log the user in
                loginForm.reset();                                                  // close the login modal & reset form
                alert("Bạn phải ghi nhớ 'Mật Khẩu' cho lần đầu Login để nhận dãy mã định dạng user 'Uid' do App tạo ra cho việc điều khiển bo mạch IoT");
            })
            .catch((mess) =>{
                const mess_Code = mess.code;
                // const errorMessage = error.message;
                if(mess_Code){
                  auth.signInWithEmailAndPassword(email, password)
                    .then(()=>{
                      alert('Xin chúc mừng, Bạn đăng nhập thành công vào ứng dụng Au_Control');
                      loginForm.reset();
                     })
                    .catch(() =>{
                      alert('Bạn phải nhập đúng mật khẩu đã được đăng ký lần đầu để vào App')
                      loginForm.reset();
                    });
                }
            });
        });

    // logout
    const logout = document.querySelector('#logout-link');
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut();
    });


    //    // Tạo liên kết email để đặt hay thay đổi lại mật khẩu mới
    //    var userEmail = document.getElementById("input-email").value //'thinh.doq@gmail.com';
    //    auth.generatePasswordResetLink(userEmail, actionCodeSettings)
    //        .then((link) => {
    //            // Xây dựng mẫu Form đặt lại mật khẩu, nhúng liên kết và gửi tới máy chủ SMTP tùy chỉnh.
    //            return sendCustomPasswordResetEmail(userEmail, displayName, link);
    //            })
    //        .catch((error) => {
    //                alert('Bạn chưa được lưu mật khẩu đăng ký mới trên Firebase')
    //            });
       
    //    // Construct the email link credential from the current URL.
    //    var credential = firebase.auth.EmailAuthProvider.credentialWithLink(
    //        email, window.location.href);
       
    //    // Link the credential to the current user.
    //    firebase.auth().currentUser.linkWithCredential(credential)
    //        .then((usercred) => {
    //        // The provider is now successfully linked.
    //        // The phone user can now sign in with their phone number or email.
    //        })
    //        .catch((error) => {
    //            alert('Some error occurred.')
    //        });
   
    //    //Google singin provider
    //    var ggProvider = new firebase.auth.GoogleAuthProvider();
    //    //Facebook singin provider
    //    var fbProvider = new firebase.auth.FacebookAuthProvider();
    //    //Login in variables
    //    const btnGoogle = document.getElementById('btnGoogle');
    //    const btnFaceBook = document.getElementById('btnFacebook');
   
    //        //Sing in with Google
    //    btnGoogle.addEventListener('click', e => {
    //            firebase.auth().signInWithPopup(ggProvider).then(function(result) {
    //                var token = result.credential.accessToken;
    //                var user = result.user;
    //                console.log('User>>Goole>>>>', user);
    //                userId = user.uid;
   
    //            }).catch(function(error) {
    //                console.error('Error: hande error here>>>', error.code)
    //            })
    //        }, false)
   
    //        //Sing in with Facebook
    //    btnFaceBook.addEventListener('click', e => {
    //            firebase.auth().signInWithPopup(fbProvider).then(function(result) {
    //                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //                var token = result.credential.accessToken;
    //                // The signed-in user info.
    //                var user = result.user;
    //                console.log('User>>Facebook>', user);
    //                // ...
    //                userId = user.uid;
               
    //            }).catch(function(error) {
    //                // Handle Errors here.
    //                var errorCode = error.code;
    //                var errorMessage = error.message;
    //                // The email of the user's account used.
    //                var email = error.email;
    //                // The firebase.auth.AuthCredential type that was used.
    //                var credential = error.credential;
    //                // ...
    //                console.error('Error: hande error here>Facebook>>', error.code)
    //            });
    //        }, false)
    
});