var gateway = `ws://${window.location.hostname}/ws`;      //wss://s-usc1a-nss-2018.firebaseio.com/     //ws://${window.location.hostname}/ws
var websocket;

window.addEventListener('load', onLoad);

function onLoad(event) {
    initWebSocket();
    initButton();
}

function initWebSocket() {
    console.log('Trying to open a WebSocket connection...');
    websocket = new WebSocket(gateway);
    websocket.onopen    = onOpen;
    websocket.onclose   = onClose;
    websocket.onmessage = onMessage;
}

function onOpen(event) {
    console.log('Connection opened');
}

function onClose(event) {
    console.log('Connection closed');
    setTimeout(initWebSocket, 2000);
}

function onMessage(event) {
    let data = JSON.parse(event.data);
    //document.getElementById('led').className = data.status;
}

function initButton() {
    document.getElementById('change-form').addEventListener('click', onText);
}

function onText(event) {
        const name=document.getElementById("wifi_home").value;  
        const password=document.getElementById("wifi-password").value;
        const Id_user=document.getElementById("user_id").value;
        const stt=document.getElementById("stt_bo").value;  
        const repeat=document.getElementById("repeat").value;
        
        if (name=="" || password==""){  
          alert("Name and Pass can't be blank");  
          return false;  
        }else if ( repeat != password){
          alert("Giá trị Pass không đồng nhất chưa được chấp nhận");  //action="/set_wifi"
          return false;
        }else {
            const uid =  Id_user;
            var path  = db.ref(uid + "/board_" + stt +"/outputs");   //+ document.getElementById("level").value + "/outputs" 
            var path_new= path.push();
            
            path_new.set({                                           // Thiết lập giá trị mới cho node thuộc tính nào đó
              SSID: name,                                            //name là "new value 1"
              PASS: password                                         //password "new value 2"
            });
            
            // Lắng nghe sự kiện thay đổi dữ liệu
            path_new.on('value', snapshot =>{
              const data = snapshot.val();
              console.log(data);
              // Gửi dữ liệu mới cho client, ví dụ: gửi qua socket
              socket.send(JSON.stringify(data));
            });
            /*const xhr = new XMLHttpRequest();
                xhr.open("GET", "/set_wifi?name="+ name + "&password="+ password + "&uid="+ Id_user + "&stt="+ stt, true);xhr.send();*/
          document.getElementById('change-form').reset();
          alert("Chúc Mừng Bạn! Hãy khởi động lại bộ vi mạch bằng nút nhấn Reset, ESP32 sẽ truy cập Wifi-Internet");  
          return true;  
          }  
}
