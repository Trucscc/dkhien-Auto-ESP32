// Lấy phần tử hiển thị văn bản được chuyển đổi
const output = document.querySelector('#output');
let voice_Input = document.getElementById("search-input");

function StartListening(){
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    let recognition = new window.SpeechRecognition();
        recognition.interimResults = true;                               // interimResults false: hiện kết quả toàn bộ văn bản sau khi kết thúc chuỗi đọc
        recognition.maxAlternatives = 1;                                 //                true : hiện ra ngay từng tù hay chuỗi ra màn hình cho thấy
        recognition.continuous = false;
        recognition.lang=document.getElementById("Languages").value;

    let isPaused = false;
    voice_Input.value = '';

    recognition.onresult = (event) => {
      const results = event.results;
      let finalTranscript = ''; 
      let interimTranscript = '';
      for (var i = event.resultIndex ; i < results.length; i++) {    // Lặp qua các mãng và hiển thị văn bản được chuyển đổi
        let transcript = results[i][0].transcript;                   // tạo biến mãng transcript cho văn bản nhận
        if (results[i].isFinal) {                                    // kiểm trả có mãng có nhận được không?
          finalTranscript += transcript;                             // hứng giá trị mãng văn bản nhận dược
          finalTranscript = CapitalizeSentences(finalTranscript);
          //console.log(finalTranscript)  ;
          
          /*if(finalTranscript.indexOf(".") != 0){                   // xác định "số phần tử thứ tự mãng, nếu khác 0 thì 
            //finalTranscript = finalTranscript.replace(" ", " ");   // thay ký tự . thành khoảng trống
           
          }*/
         } else {
            interimTranscript += transcript;                         //console.log(interimTranscript);    
          }
      }
      
      voice_Input.value = finalTranscript + '' + interimTranscript ;
      
      if( voice_Input.value !== "" || voice_Input.value.length !== 0){
        
            nhap_Text();
            control_Drone();
            control_Car();

        voice_Input.splice(0,voice_Input.value.length-1);            // Xóa hết các phần tử mãng text 'voice_Input'
        isPaused = true;
        setTimeout(() => {
              isPaused = false;
         }, 1000);
       }
    }
    recognition.onend = function() {
        if (!isPaused) {
          recognition.start();
        }
    };
    recognition.start();
}

function CapitalizeSentences(inString=""){                              // Lệnh chuyển đổi một câu hoàn chỉnh "Viết hoa đầu câu và cuối cùng có dấu chấm câu."
    var StringReturn = "";
    var IsStartOfSentence = false;
    var PreviousChar = "";      
    var CurrentChar = "";
    for (var i = 0; i < inString.length; i++) {
      CurrentChar = inString.substring(i,i+1) ;
      IsStartOfSentence = (i ==0) || (PreviousChar == ".");
      if (IsStartOfSentence){
          StringReturn = StringReturn + CurrentChar.toUpperCase();
      }else{
          StringReturn = StringReturn + CurrentChar ;
        }        
      if (CurrentChar !== " ")
        {PreviousChar = CurrentChar}
    }
    
    return(StringReturn);      
  }

function speak (message) {
    var msg = new SpeechSynthesisUtterance(message)
    var voices = window.speechSynthesis.getVoices()
        msg.rate = 1;                                            // 0.1 to 10, Set tham số  tốc độ nói (0.1 - 10) 0.9 hay 1 là bình thường
        msg.pitch = 1;                                           // 0 to 2, Set tham số độ cao trầm bỏng hay giọng nam hay nữ (0 - 2), mặt định nên chọn 1 
        msg.volume = 1;                                          // 0 to 1, Set tham số (âm lượng từ 1 - 10) mặt định nên chọn > 1
        msg.lang =  document.getElementById("Languages").value;  //"vi-VN" ;
        msg.voice = voices[0]
    window.speechSynthesis.speak(msg);
    voice_Input.value = "";
}

function control_Drone(){
    var yc_Drone = voice_Input.value;
        if(yc_Drone == "Tắt điện hệ thống" || yc_Drone == "Tắt toàn bộ hệ thống"){
            Off_Sys();
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }
        if(yc_Drone == "Tắt điện động cơ" || yc_Drone == "Tắt tất cả cánh quay"){
            off_Eng();
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }
        
        if(yc_Drone == "Khởi động không tải" || yc_Drone == "Khởi động bốn cánh quay" || yc_Drone == "Khởi động 4 cánh quay"){
            On_Sys(35);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }
        
        if(yc_Drone == "Dừng lại" || yc_Drone == "Xác định điểm cân bằng" || yc_Drone == "Xác định giá trị cân bằng"){
            balance_drone(35);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }

        if(yc_Drone == "Xoay phải"){
            setInterval(turn_Right(35, 5), 1000);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }

        if(yc_Drone == "Xoay trái"){
            setInterval(turn_Left(35, 5), 1000);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }

        if(yc_Drone == "Nâng độ cao"){
            setInterval(increase_Altitude(35, 20), 1000);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }

        if(yc_Drone == "Hạ thấp cao độ" || yc_Drone == "Hạ thấp độ cao"){
            setInterval(reduce_Altitude(35, 15), 1000);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }

        if(yc_Drone == "Dịch sang trái"){
            setInterval(move_Left(35, 5, 15), 1000);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }

        if(yc_Drone == "Dịch sang phải"){
            setInterval(move_Right(35, 5, 15), 1000);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }

        if(yc_Drone == "Tiến tới"){
            setInterval(move_Up(35, 10, 25), 1000);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }

        if(yc_Drone == "Lùi về" || yc_Drone == "Lùi lại"){
            setInterval(move_Down(35, 10, 15), 1000);
            yc_Drone = "Đã " + voice_Input.value ;
            speak (yc_Drone);
        }
    voice_Input.value = yc_Drone;
}

function control_Car(){
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;                                    
    var bo_Car =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_Car  + "/outputs/digital/";
    
    var yc_Car = voice_Input.value;
        if(yc_Car == "Tắt toàn bộ hệ thống"){
            Off_Sys();
            yc_Car = "Đã " + voice_Input.value ;
            speak (yc_Car);
        }

        if(yc_Car ==  "Khởi động đề 3 xe" || yc_Car ==  "Start Car"){
            db.ref().child(path+12).set(1);
            yc_Car = "Đã " + voice_Input.value ;
            speak (yc_Car);
        }
    voice_Input.value = yc_Car;
}

function nhap_Text(){
    const uid =  localStorage.getItem("uid");
    var yc_Re = voice_Input.value;

    var esp_ = document.getElementById("esp_").value ;
    if(esp_ == 32){
        if(yc_Re == "Turn on all board" || yc_Re == "Mở toàn bộ bo mạch được lắp đặt" || yc_Re == "Bật toàn bộ bo mạch được lắp đặt"){
            var so_Bomach = document.getElementById("level").value ;
            for (var so_Bomach = 1; so_Bomach <= 20; so_Bomach++){
                var path_dẫn = uid + "/board_" + so_Bomach  + "/outputs/digital/";
                for (var j = 0; j < 34; j++){
                    if(j!=1 && j!=3 && j!=6 && j!=7 && j!=8 && j!=9 && j!=10 && j!=11 && j!=20 && j!=24 && j<=26){
                        var yc = j ;
                        document.getElementById('state'+yc.toString()).innerText= 'ON';
                        document.getElementById(yc.toString()).checked = true ;
                        db.ref().child(path_dẫn+yc).set(100);
                    }
                    if(j>= 26 && j!=28 && j!=29 && j!=30 && j!=31){
                        var yc = j ;
                          document.getElementById('state'+yc.toString()).innerText= 'ON';
                          document.getElementById(yc.toString()).checked = true ;
                          db.ref().child(path_dẫn+yc).set(1);
                    } 
                }
            }
            yc_Re = "Đã " + voice_Input.value ;
            speak (yc_Re);yc_Re = "";
         }else if(yc_Re == "Turn off all board" || yc_Re == "Đóng toàn bộ bo mạch được lắp đặt" || yc_Re == "Tắt toàn bộ bo mạch được lắp đặt"){
            var so_Bomach = document.getElementById("level").value ;
            for (var so_Bomach = 1; so_Bomach <= 20; so_Bomach++){
                var path_dẫn = uid + "/board_" + so_Bomach  + "/outputs/digital/";
                for (var j = 0; j < 34; j++){
                    if(j!=1 && j!=3 && j!=6 && j!=7 && j!=8 && j!=9 && j!=10 && j!=11 && j!=20 && j!=24 && j!=28 && j!=29 && j!=30 && j!=31){
                        var yc = j ;
                        document.getElementById('state'+yc.toString()).innerText= 'OFF';
                        document.getElementById(yc.toString()).checked = false ;
                        db.ref().child(path_dẫn+yc).set(0);
                    }
                }
            }
            yc_Re = "Đã " + voice_Input.value ;
            speak (yc_Re);yc_Re = "";
          }

        var path1 = uid + "/board_" + document.getElementById("level").value  + "/outputs/digital/";
        if(yc_Re == "Turn on all" || yc_Re == "Bật tất cả công tắc điện" || yc_Re == "Bật tất cả công tắc đèn" || yc_Re == "Bật hết công tắc điện" || yc_Re == "Bật tất cả thiết bị đang đóng" || yc_Re == "Mở CB tổng" || yc_Re == "Bật CB tổng"){
                    for (var j = 0; j < 34; j++){
                        if(j!=1 && j!=3 && j!=6 && j!=7 && j!=8 && j!=9 && j!=10 && j!=11 && j!=20 && j!=24 && j<=25){
                            var yc = j ;
                              document.getElementById('state'+yc.toString()).innerText= 'ON';
                              document.getElementById(yc.toString()).checked = true ;
                              db.ref().child(path1+yc).set(100);
                        }
                        if(j>= 26 && j!=28 && j!=29 && j!=30 && j!=31){
                            var yc = j ;
                              document.getElementById('state'+yc.toString()).innerText= 'ON';
                              document.getElementById(yc.toString()).checked = true ;
                              db.ref().child(path1+yc).set(1);
                        }  
                    }
                    
                    yc_Re = "Đã " + voice_Input.value ;
                    speak (yc_Re);
                    yc_Re = "";yc_Re = "";
            }else if(yc_Re == "Turn off all" || yc_Re == "Tắt tất cả thiết bị điện" || yc_Re == "Tắt hết thiết bị điện" || yc_Re == "Tắt toàn bộ thiết bị điện"|| yc_Re == "Tắt CB tổng" || yc_Re == "Đóng CB tổng" || yc_Re == "Tắt toàn bộ thiết bị đang mở" || yc_Re == "Đóng tất cả thiết bị điện" || yc_Re == "Đóng toàn bộ thiết bị điện" || yc_Re == "Đóng hết thiết bị điện" ){
                for (var j = 0; j < 34; j++){
                    if(j!=1 && j!=3 && j!=6 && j!=7 && j!=8 && j!=9 && j!=10 && j!=11 && j!=20 && j!=24 && j!=28 && j!=29 && j!=30 && j!=31){
                        var yc = j ;   
                            db.ref().child(path1+yc.toString()).set(0); 
                            document.getElementById('state'+yc.toString()).innerText= 'OFF';
                            document.getElementById(yc.toString()).checked = false ;
                    }   
                }
                
                yc_Re = "Đã " + voice_Input.value;
                speak (yc_Re);yc_Re = "";
            }else if( yc_Re == "Bật toàn bộ công tắc bên phải" || yc_Re == "Mở toàn bộ công tắc bên phải" || yc_Re == "Right all switches turn on"){
                for (var j = 0; j < 34; j++){
                    if(j!=1 && j!=3 && j!=6 && j!=7 && j!=8 && j!=9 && j!=10 && j!=11 && j!=12 && j!=13 && j!=14 && j!=20 && j!=24 && j!=25 && j!=26 && j!=27 && j!=28 && j!=29 && j!=30 && j!=31 && j!=32 && j!=33){
                        var yc = j ;
                            db.ref().child(path1+yc).set(100);
                            document.getElementById('state'+yc.toString()).innerText= 'ON';
                            document.getElementById(yc.toString()).checked = true ;
                    }  
                }
                
                yc_Re = "Đã " + voice_Input.value;
                speak (yc_Re);yc_Re = "";
            }else if( yc_Re == "Bật toàn bộ công tắc bên trái" || yc_Re == "Mở toàn bộ công tắc bên trái" || yc_Re == "Left all switches turn on"){
                for (var j = 12; j < 34; j++){
                    if( j!=15 && j!=16 && j!=17 && j!=18 && j!=19 && j!=20 && j!=21 && j!=22 && j!=23 && j!=24 && j!=28 && j!=29 && j!=30 && j!=31){
                        var yc = j ;
                            db.ref().child(path1+yc).set(100);
                            document.getElementById('state'+yc.toString()).innerText= 'ON';
                            document.getElementById(yc.toString()).checked = true ;
                    }  
                }
                
                yc_Re = "Đã " + voice_Input.value;
                speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "Đóng toàn bộ công tắc bên phải" || yc_Re == "Tắt toàn bộ công tắc bên phải" || yc_Re == "All right switches turn off"){
                for (var j = 0; j < 34; j++){
                    if(j!=1 && j!=3 && j!=6 && j!=7 && j!=8 && j!=9 && j!=10 && j!=11 && j!=12 && j!=13 && j!=14 && j!=20 && j!=24 && j!=25 && j!=26 && j!=27 && j!=28 && j!=29 && j!=30 && j!=31 && j!=32 && j!=33){
                        var yc = j ;
                            db.ref().child(path1+yc).set(0);
                            document.getElementById('state'+yc.toString()).innerText= 'OFF';
                            document.getElementById(yc.toString()).checked = false ;
                    }  
                }
                
                yc_Re = "Đã " + voice_Input.value;
                speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "Đóng toàn bộ công tắc bên trái" || yc_Re == "Tắt toàn bộ công tắc bên trái" || yc_Re == "All left switches turn off"){
                for (var j = 12; j < 34; j++){
                    if( j!=15 && j!=16 && j!=17 && j!=18 && j!=19 && j!=20 && j!=21 && j!=22 && j!=23 && j!=24 && j!=28 && j!=29 && j!=30 && j!=31){
                        var yc = j ;
                            db.ref().child(path1+yc).set(0);
                            document.getElementById('state'+yc.toString()).innerText= 'OFF';
                            document.getElementById(yc.toString()).checked = false ; 
                    }  
                }
                
                yc_Re = "Đã " + voice_Input.value;
                speak (yc_Re);yc_Re = "";
        }

        if(yc_Re == "Đóng công tắc 1" || yc_Re == "Tắt công tắc 1" || yc_Re == "Tắt đèn chùm phòng khách" || yc_Re == "Off relay one" ){
                    var yc = 2 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Đóng công tắc 2" || yc_Re == "Tắt công tắc 2" || yc_Re == "Tắt tivi phòng khách" || yc_Re == "Off relay two" ){
                    var yc = 4 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Đóng công tắc 3" || yc_Re == "Tắt công tắc 3" || yc_Re == "Tắt máy lạnh phòng khách" || yc_Re == "Off relay three"){
                    var yc = 5 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay four" || yc_Re == "Off relay 4" || yc_Re == "Đóng công tắc 4" || yc_Re == "Tắt công tắc 4" || yc_Re == "Đóng rèm phòng khách"){
                    var yc = 12 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay five" || yc_Re == "Off relay 5" || yc_Re == "Đóng công tắc 5" || yc_Re == "Tắt công tắc 5"){
                    var yc = 13 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay six" || yc_Re == "Off relay 6" || yc_Re == "Đóng công tắc 6" || yc_Re == "Tắt công tắc 6" || yc_Re == "Tắt công tắc Sáu"){
                    var yc = 14 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay seven" || yc_Re == "Off relay 7" || yc_Re == "Đóng công tắc 7" || yc_Re == "Tắt công tắc 7"){
                    var yc = 15 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay eight" || yc_Re == "Off relay 8" || yc_Re == "Đóng công tắc 8" || yc_Re == "Tắt công tắc 8"){
                    var yc = 16 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay nine" || yc_Re == "Off relay 9" || yc_Re == "Đóng công tắc 9" || yc_Re == "Tắt công tắc 9" || yc_Re == "Tắt công tắc chính"){
                    var yc = 17 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay ten" || yc_Re == "Off relay 10" || yc_Re == "Đóng công tắc 10" || yc_Re == "Tắt công tắc 10"){
                    var yc = 18 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay 11" || yc_Re == "Đóng công tắc 11" || yc_Re == "Tắt công tắc 11"){
                    var yc = 19 ;
                    db.ref().child(path1+yc).set(0);
                    document.getElementById('state'+yc.toString()).innerText= 'OFF';
                    document.getElementById(yc.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay 12" || yc_Re == "Đóng công tắc 12" || yc_Re == "Tắt công tắc 12"){
                    var yc_Re = 21 ;
                    db.ref().child(path1+yc_Re).set(0);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'OFF';
                    document.getElementById(yc_Re.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay 13" || yc_Re == "Đóng công tắc 13" || yc_Re == "Tắt công tắc 13"){
                    var yc_Re = 22 ;
                    db.ref().child(path1+yc_Re).set(0);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'OFF';
                    document.getElementById(yc_Re.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay 14" || yc_Re == "Đóng công tắc 14" || yc_Re == "Tắt công tắc 14"){
                    var yc_Re = 23 ;
                    db.ref().child(path1+yc_Re).set(0);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'OFF';
                    document.getElementById(yc_Re.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay 15" || yc_Re == "Đóng công tắc 15" || yc_Re == "Tắt công tắc 15"){
                    var yc_Re = 25 ;
                    db.ref().child(path1+yc_Re).set(0);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'OFF';
                    document.getElementById(yc_Re.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay 16" || yc_Re == "Đóng công tắc 16" || yc_Re == "Tắt công tắc 16"){
                    var yc_Re = 26 ;
                    db.ref().child(path1+yc_Re).set(0);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'OFF';
                    document.getElementById(yc_Re.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay 17" || yc_Re == "Đóng công tắc 17" || yc_Re == "Tắt công tắc 17"){
                    var yc_Re = 27 ;
                    db.ref().child(path1+yc_Re).set(0);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'OFF';
                    document.getElementById(yc_Re.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay 18" || yc_Re == "Đóng công tắc 18" || yc_Re == "Tắt công tắc 18"){
                    var yc_Re = 32 ;
                    db.ref().child(path1+yc_Re).set(0);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'OFF';
                    document.getElementById(yc_Re.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Off relay 19" || yc_Re == "Đóng công tắc 19" || yc_Re == "Tắt công tắc 19"){
                    var yc_Re = 33 ;
                    db.ref().child(path1+yc_Re).set(0);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'OFF';
                    document.getElementById(yc_Re.toString()).checked = false ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                
            };
            
        if(yc_Re == "Bật công tắc 1" || yc_Re == "Mở công tắc 1" || yc_Re == "Bật đèn chùm phòng khách" || yc_Re == "On relay 1" || yc_Re == "On relay one"){
                    var yc = 2 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "Bật công tắc 2" || yc_Re == "Mở công tắc 2" || yc_Re == "Bật tivi phòng khách" || yc_Re == "On relay 2" || yc_Re == "On relay two" ){
                    var yc = 4 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "Bật công tắc ba" || yc_Re == "Bật công tắc 3" || yc_Re == "Mở công tắc 3" || yc_Re == "Bật máy lạnh phòng khách" || yc_Re == "On relay 3" || yc_Re == "On relay three" ){
                    var yc = 5 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 4" || yc_Re == "On relay four" || yc_Re == "Bật công tắc 4" || yc_Re == "Mở công tắc 4" || yc_Re == "Mở rèm phòng khách"){
                    var yc = 12 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 5" || yc_Re == "On relay five" || yc_Re == "Bật công tắc 5" || yc_Re == "Mở công tắc 5" ){
                    var yc = 13 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 6" || yc_Re == "On relay six" || yc_Re == "Bật công tắc 6" || yc_Re == "Mở công tắc 6" || yc_Re == "Bật công tắc Sáu" ){
                    var yc = 14 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 7" || yc_Re == "On relay seven" || yc_Re == "Bật công tắc 7" || yc_Re == "Mở công tắc 7" ){
                    var yc = 15 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 8" || yc_Re == "On relay eight" || yc_Re == "Bật công tắc 8" || yc_Re == "Mở công tắc 8" ){
                    var yc = 16 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 9" || yc_Re == "On relay nine" || yc_Re == "Bật công tắc 9" ||yc_Re == "Mở công tắc 9" || yc_Re == "Bật công tắc chính"){
                    var yc = 17 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 10" || yc_Re == "On relay ten" || yc_Re == "Mở công tắc 10" || yc_Re == "Bật công tắc 10" ){
                    var yc = 18 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 11" || yc_Re == "Mở công tắc 11" || yc_Re == "Bật công tắc 11" ){
                    var yc = 19 ;
                    db.ref().child(path1+yc).set(100);
                    document.getElementById('state'+yc.toString()).innerText= 'ON';
                    document.getElementById(yc.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 12" || yc_Re == "Mở công tắc 12" || yc_Re == "Bật công tắc 12" ){
                    var yc_Re = 21 ;
                    db.ref().child(path1+yc_Re).set(100);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 13" || yc_Re == "Mở công tắc 13" || yc_Re == "Bật công tắc 13" ){
                    var yc_Re = 22 ;
                    db.ref().child(path1+yc_Re).set(100);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 14" || yc_Re == "Mở công tắc 14" || yc_Re == "Bật công tắc 14" ){
                    var yc_Re = 23 ;
                    db.ref().child(path1+yc_Re).set(100);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 15" || yc_Re == "Mở công tắc 15" || yc_Re == "Bật công tắc 15" ){
                    var yc_Re = 25;
                    db.ref().child(path1+yc_Re).set(100);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 16" || yc_Re == "Mở công tắc 16" || yc_Re == "Bật công tắc 16" ){
                    var yc_Re = 26 ;
                    db.ref().child(path1+yc_Re).set(1);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 17" || yc_Re == "Mở công tắc 17" || yc_Re == "Bật công tắc 17" ){
                    var yc_Re = 27 ;
                    db.ref().child(path1+yc_Re).set(1);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 18" || yc_Re == "Mở công tắc 18" || yc_Re == "Bật công tắc 18" ){
                    var yc_Re = 32 ;
                    db.ref().child(path1+yc_Re).set(1);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }else if(yc_Re == "On relay 19" || yc_Re == "Mở công tắc 19" || yc_Re == "Bật công tắc 19" ){
                    var yc_Re = 33 ;
                    db.ref().child(path1+yc_Re).set(1);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
            }

            if(yc_Re == "Bật phòng ngủ Gia Chủ" || yc_Re == "Bật điện phòng gia chủ" || yc_Re == "Mở điện phòng ngủ Gia Chủ" || yc_Re == "Bedroom master turn on"){
                    for (var j = 12; j < 17; j++){
                        if( j!=15 && j!=16 ){
                            var yc = j ;
                              db.ref().child(path1+yc).set(1);
                              document.getElementById('state'+yc.toString()).innerText= 'ON';
                              document.getElementById(yc.toString()).checked = true ; 
                        }  
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Mở điện Phòng ngủ 1" || yc_Re == "Mở phòng ngủ 1" || yc_Re == "Bật Phòng ngủ 1" || yc_Re == "Bedroom one turn on"){
                    for (var j = 25; j < 34; j++){
                        if( j!=28 && j!=29 && j!=30 && j!=31 ){
                            var yc = j ;
                              db.ref().child(path1+yc).set(1);
                              document.getElementById('state'+yc.toString()).innerText= 'ON';
                              document.getElementById(yc.toString()).checked = true ; 
                        }  
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Mở điện phòng ngủ 2" || yc_Re == "Bật phòng ngủ 2" || yc_Re == "Bật điện phòng ngủ 2" || yc_Re == "Bedroom two turn on"){
                    for (var j = 17; j < 24; j++){
                        if( j!=20 ){
                            var yc = j ;
                              db.ref().child(path1+yc).set(1);
                              document.getElementById('state'+yc.toString()).innerText= 'ON';
                              document.getElementById(yc.toString()).checked = true ; 
                        }  
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Tắt điện phòng gia chủ" || yc_Re == "Tắt điện phòng ngủ Gia Chủ" || yc_Re == "Bedroom master turn off"){
                    for (var j = 12; j < 17; j++){
                        if( j!=15 && j!=16 ){
                            var yc = j ;
                              db.ref().child(path1+yc).set(0);
                              document.getElementById('state'+yc.toString()).innerText= 'OFF';
                              document.getElementById(yc.toString()).checked = false ; 
                        }  
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Tắt điện Phòng ngủ 1" || yc_Re == "Tắt điện phòng ngủ một" || yc_Re == "Tắt Phòng ngủ 1" || yc_Re == "Bedroom one turn off"){
                    for (var j = 25; j < 34; j++){
                        if( j!=28 && j!=29 && j!=30 && j!=31 ){
                            var yc = j ;
                              db.ref().child(path1+yc).set(0);
                              document.getElementById('state'+yc.toString()).innerText= 'OFF';
                              document.getElementById(yc.toString()).checked = false ; 
                        }  
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Tắt điện phòng ngủ 2" || yc_Re == "Tắt điện phòng ngủ hai" || yc_Re == "Tắt phòng ngủ 2" || yc_Re == "Bedroom two turn off"){
                    for (var j = 17; j < 24; j++){
                        if( j!=20 ){
                            var yc = j ;
                              db.ref().child(path1+yc).set(0);
                              document.getElementById('state'+yc.toString()).innerText= 'OFF';
                              document.getElementById(yc.toString()).checked = false ; 
                        }  
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                };
            
            if(yc_Re == "Khóa nắp ca po" ){
                    var yc_Re = 26 ;
                    db.ref().child(path1+yc_Re).set(1);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Khóa cửa sau" ){
                    var yc_Re = 25 ;
                    db.ref().child(path1+yc_Re).set(1);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Khóa hai cánh bên trái" ){
                    for (var j = 32; j <= 33; j++){ 
                        var yc = j ;
                          db.ref().child(path1+yc).set(0);
                          document.getElementById('state'+yc.toString()).innerText= 'OFF';
                          document.getElementById(yc.toString()).checked = false ;   
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Khóa hai cánh bên phải" ){
                    for (var j = 26; j <= 27; j++){ 
                            var yc = j ;
                              db.ref().child(path1+yc).set(0);
                              document.getElementById('state'+yc.toString()).innerText= 'OFF';
                              document.getElementById(yc.toString()).checked = false ;   
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Khóa tất cả các cửa" ){
                    for (var j = 25; j < 34; j++){
                        if( j!=28 && j!=29 && j!=30 && j!=31 ){
                            var yc = j ;
                              db.ref().child(path1+yc).set(0);
                              document.getElementById('state'+yc.toString()).innerText= 'OFF';
                              document.getElementById(yc.toString()).checked = false ; 
                        }  
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Kính cửa trước kéo xuống" ){
                    for (var j = 16; j <= 17; j++){ 
                        var yc = j ;
                          db.ref().child(path1+yc).set(1);
                          document.getElementById('state'+yc.toString()).innerText= 'ON';
                          document.getElementById(yc.toString()).checked = true ;   
                    }
                    yc_Re =   voice_Input.value + " Đã kéo xuống" ;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Kính cửa trước kéo lên" ){
                    for (var j = 16; j <= 17; j++){ 
                        var yc = j ;
                          db.ref().child(path1+yc).set(0);
                          document.getElementById('state'+yc.toString()).innerText= 'OFF';
                          document.getElementById(yc.toString()).checked = false ;   
                    }
                    yc_Re = voice_Input.value; + " Đã kéo lên" ;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Kéo kính cửa phía sau xuống" ){
                    for (var j = 18; j <= 19; j++){ 
                        var yc = j ;
                          db.ref().child(path1+yc).set(1);
                          document.getElementById('state'+yc.toString()).innerText= 'ON';
                          document.getElementById(yc.toString()).checked = true ;   
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Kéo kính cửa phía sau lên" ){
                    for (var j = 18; j <= 19; j++){ 
                        var yc = j ;
                          db.ref().child(path1+yc).set(0);
                          document.getElementById('state'+yc.toString()).innerText= 'OFF';
                          document.getElementById(yc.toString()).checked = false ;   
                    }
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Kéo kính cánh trái xuống" ){
                    for (var j = 16; j <= 19; j++){ 
                        if(j!=17 && j!=19){
                        var yc = j ;
                          db.ref().child(path1+yc).set(1);
                          document.getElementById('state'+yc.toString()).innerText= 'ON';
                          document.getElementById(yc.toString()).checked = true ;   
                        }}
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Kéo kính cánh trái lên" ){
                    for (var j = 16; j <= 19; j++){ 
                        if(j!=17 && j!=19){
                        var yc = j ;
                          db.ref().child(path1+yc).set(0);
                          document.getElementById('state'+yc.toString()).innerText= 'OFF';
                          document.getElementById(yc.toString()).checked = false ;   
                        }}
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Kéo kính cánh phải xuống" ){
                    for (var j = 16; j <= 19; j++){ 
                        if(j!=16 && j!=18){
                        var yc = j ;
                          db.ref().child(path1+yc).set(1);
                          document.getElementById('state'+yc.toString()).innerText= 'ON';
                          document.getElementById(yc.toString()).checked = true ;   
                        }}
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Kéo kính cánh phải lên" ){
                    for (var j = 16; j <= 19; j++){ 
                        if(j!=16 && j!=18){
                        var yc = j ;
                          db.ref().child(path1+yc).set(0);
                          document.getElementById('state'+yc.toString()).innerText= 'OFF';
                          document.getElementById(yc.toString()).checked = false ;   
                        }}
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Xoay kính chiếu hậu trái" ){
                    var yc_Re = 4 ;
                    db.ref().child(path1+yc_Re).set(1);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                }else if(yc_Re == "Xoay kính chiếu hậu phải"){
                    var yc_Re = 5 ;
                    db.ref().child(path1+yc_Re).set(1);
                    document.getElementById('state'+yc_Re.toString()).innerText= 'ON';
                    document.getElementById(yc_Re.toString()).checked = true ;
                    
                    yc_Re = "Đã " + voice_Input.value;
                    speak (yc_Re);yc_Re = "";
                };    
        trangthai();
    }else if(esp_ == 82){
        var path0 = uid + "/board_"+ document.getElementById("level").value  + "/outputs/digital/D";
        if(yc_Re == "Turn on all" || yc_Re == "Bật tất cả công tắc"){
            db.ref().child(path0+"4").set(1);             // D4 mượn nút 25 của esp32
            db.ref().child(path0+"2").set(1);             // D2 mượn nút 22  esp32
            db.ref().child(path0+"1").set(1);             // D1 mượn nút 21  esp32
            db.ref().child(path0+"3").set(1);             // D3 mượn nút 23  esp32
            db.ref().child(path0+"6").set(1);             // D6 mượn nút 27  esp32
            db.ref().child(path0+"7").set(1);             // D7 mượn nút 32  esp32
            db.ref().child(path0+"5").set(1);             // D5 mượn nút 26  esp32
            db.ref().child(path0+"8").set(1);             // D8 mượn nút 33  esp32
            
            yc_Re = "Đã" + voice_Input.value;
            speak (yc_Re);
         }else if(yc_Re == "Bật công tắc 1" || yc_Re == "Bật công tắc D1"){
            db.ref().child(path0+"1").set(1); yc = 21;
            document.getElementById('state'+yc.toString()).innerText= 'ON';
            document.getElementById(yc.toString()).checked = true ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Bật công tắc 2" || yc_Re == "Bật công tắc D2"){
            db.ref().child(path0+"2").set(1); yc = 22;
            document.getElementById('state'+yc.toString()).innerText= 'ON';
            document.getElementById(yc.toString()).checked = true ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
           }else if(yc_Re == "Bật công tắc ba" || yc_Re == "Bật công tắc 3" || yc_Re == "Bật công tắc D3"){
            db.ref().child(path0+"3").set(1); yc = 23;
            document.getElementById('state'+yc.toString()).innerText= 'ON';
            document.getElementById(yc.toString()).checked = true ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Bật công tắc 4" || yc_Re == "Bật công tắc D4"){
            db.ref().child(path0+"4").set(1); yc = 25;
            document.getElementById('state'+yc.toString()).innerText= 'ON';
            document.getElementById(yc.toString()).checked = true ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Bật công tắc 5" || yc_Re == "Bật công tắc D5"){
            db.ref().child(path0+"5").set(1); yc = 26;
            document.getElementById('state'+yc.toString()).innerText= 'ON';
            document.getElementById(yc.toString()).checked = true ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Bật công tắc Sáu" || yc_Re == "Bật công tắc 6" || yc_Re == "Bật công tắc D6"){
            db.ref().child(path0+"6").set(1); yc = 27;
            document.getElementById('state'+yc.toString()).innerText= 'ON';
            document.getElementById(yc.toString()).checked = true ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Bật công tắc 7" || yc_Re == "Bật công tắc D7"){
            db.ref().child(path0+"7").set(1); yc = 32;
            document.getElementById('state'+yc.toString()).innerText= 'ON';
            document.getElementById(yc.toString()).checked = true ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Bật công tắc 8" || yc_Re == "Bật công tắc D8"){
            db.ref().child(path0+"8").set(1); yc = 33;
            document.getElementById('state'+yc.toString()).innerText= 'ON';
            document.getElementById(yc.toString()).checked = true ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }

        if(yc_Re == "Turn off all" || yc_Re == "Tắt tất cả công tắc" ){
            db.ref().child(path0+"4").set(0);
            db.ref().child(path0+"2").set(0);
            db.ref().child(path0+"1").set(0);
            db.ref().child(path0+"3").set(0);
            db.ref().child(path0+"6").set(0);
            db.ref().child(path0+"7").set(0);
            db.ref().child(path0+"5").set(0);
            db.ref().child(path0+"8").set(0);

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re); yc_Re = "";
         }else if(yc_Re == "Tắt công tắc 1" || yc_Re == "Tắt công tắc D1"){
            db.ref().child(path0+"1").set(0); yc = 21;
            document.getElementById('state'+yc.toString()).innerText= 'OFF';
            document.getElementById(yc.toString()).checked = false ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Tắt công tắc 2"|| yc_Re == "Tắt công tắc D2"){
            db.ref().child(path0+"2").set(0); yc = 22;
            document.getElementById('state'+yc.toString()).innerText= 'OFF';
            document.getElementById(yc.toString()).checked = false ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
           }else if(yc_Re == "Tắt công tắc 3" || yc_Re == "Tắt công tắc D3"){
            db.ref().child(path0+"3").set(0); yc = 23;
            document.getElementById('state'+yc.toString()).innerText= 'OFF';
            document.getElementById(yc.toString()).checked = false ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Tắt công tắc 4" || yc_Re == "Tắt công tắc D4"){
            db.ref().child(path0+"4").set(0); yc = 25;
            document.getElementById('state'+yc.toString()).innerText= 'OFF';
            document.getElementById(yc.toString()).checked = false ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Tắt công tắc 5" || yc_Re == "Tắt công tắc D5"){
            db.ref().child(path0+"5").set(0); yc = 26;
            document.getElementById('state'+yc.toString()).innerText= 'OFF';
            document.getElementById(yc.toString()).checked = false ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Tắt công tắc 6" || yc_Re == "Tắt công tắc D6"){
            db.ref().child(path0+"6").set(0); yc = 27;
            document.getElementById('state'+yc.toString()).innerText= 'OFF';
            document.getElementById(yc.toString()).checked = false ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Tắt công tắc 7" || yc_Re == "Tắt công tắc D7"){
            db.ref().child(path0+"7").set(0); yc = 32;
            document.getElementById('state'+yc.toString()).innerText= 'OFF';
            document.getElementById(yc.toString()).checked = false ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }else if(yc_Re == "Tắt công tắc 8" || yc_Re == "Tắt công tắc D8"){
            db.ref().child(path0+"8").set(0); yc = 33;
            document.getElementById('state'+yc.toString()).innerText= 'OFF';
            document.getElementById(yc.toString()).checked = false ;

            yc_Re = "Đã " + voice_Input.value;
            speak (yc_Re);yc_Re = "";
          }
        trangthai();
    };

voice_Input.value = yc_Re;
}