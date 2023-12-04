const khoidong_Pwm  = 25 ;                                   // tạm thời khởi động ở mức (Pwm = 25%) để quay các động cơ 
const luc_nang  = khoidong_Pwm + 5 ;                         // tạm thời lấy lý thuyết (delta_Pwm = 5%) 
const p_balance =  luc_nang;                                 // Cần kiểm định thục tế để xác định lục nâng = trọng lượng tổng thể của Drone
                                                             // xác định điểm cân bằng tại chổ không rơi, không di chuyển sẽ có Deltga chính xác là bao nhiêu %
function On_Sys(balance){
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
    var Run_khongtai ;
    for (var k = 12; k <= 19; k++){
        if( k!=16 && k!=17 && k!=18 && k!=19){
            Run_khongtai = k ;
            db.ref().child(path+Run_khongtai).set(0.8*balance);
            document.getElementById('state'+Run_khongtai.toString()).innerText= 'ON';
            document.getElementById(Run_khongtai.toString()).checked = true ;
    }}
}

function Off_Sys(){
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
    var off_hethong;
    for (var k = 1; k < 34; k++){
        if(k!=1 && k!=3 && k!=6 && k!=7 && k!=8 && k!=9 && k!=10 && k!=11 && k!=20 && k!=24 && k!=28 && k!=29 && k!=30 && k!=31){
            off_hethong = k ;
            db.ref().child(path+off_hethong).set(0);
            document.getElementById('state'+off_hethong.toString()).innerText= 'OFF';
            document.getElementById(off_hethong.toString()).checked = false ;
    }}
}

function off_Eng(){
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;                                    
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
    var balance_trongluc;
    for (var k = 12; k <= 19; k++){
        if( k!=16 && k!=17 && k!=18 && k!=19){
            balance_trongluc = k ;
            db.ref().child(path+balance_trongluc).set(0);
    }}
}

function balance_drone(balance){
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;                                    
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
    var balance_trongluc;
    for (var k = 12; k <= 19; k++){
        if( k!=16 && k!=17 && k!=18 && k!=19){
            balance_trongluc = k ;
            db.ref().child(path+balance_trongluc).set(balance);
    }}
}

function move_Up(balance, độ_chênh, gia_tốc){ 
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;                                   
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
        db.ref().child(path+12).set(balance + gia_tốc);
        db.ref().child(path+13).set(balance + gia_tốc);
        db.ref().child(path+14).set(balance+độ_chênh + gia_tốc);
        db.ref().child(path+15).set(balance+độ_chênh + gia_tốc);
    setTimeout(balance_drone(balance), 100);
}

function move_Down(balance, độ_chênh, gia_tốc){
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;                                    
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
        db.ref().child(path+12).set(balance+độ_chênh + gia_tốc);
        db.ref().child(path+13).set(balance+độ_chênh + gia_tốc);
        db.ref().child(path+14).set(balance + gia_tốc);
        db.ref().child(path+15).set(balance + gia_tốc);
    setTimeout(balance_drone(balance), 100);  
}

function move_Right(balance, độ_chênh, gia_tốc){    
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;                                
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
        db.ref().child(path+12).set(balance+độ_chênh + gia_tốc);
        db.ref().child(path+13).set(balance + gia_tốc);
        db.ref().child(path+14).set(balance + gia_tốc);
        db.ref().child(path+15).set(balance+độ_chênh + gia_tốc);
    setTimeout(balance_drone(balance), 100);
}

function move_Left(balance, độ_chênh, gia_tốc){         
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;                           
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
        db.ref().child(path+12).set(balance + gia_tốc);
        db.ref().child(path+13).set(balance+độ_chênh + gia_tốc);
        db.ref().child(path+14).set(balance+độ_chênh + gia_tốc);
        db.ref().child(path+15).set(balance + gia_tốc);
    setTimeout(balance_drone(balance), 100);
}

function increase_Altitude(balance, gia_tốc){
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
         for (var k = 12; k <= 19; k++){
            if( k!=16 && k!=17 && k!=18 && k!=19){
                var yc = k ;
                    db.ref().child(path+yc).set(balance + gia_tốc);
             }
          }
    setTimeout(balance_drone(balance), 200);
}

function reduce_Altitude(balance, gia_tốc){
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
        /*giam_h = db.ref(path);
        giam_h.set({ 
            digital : {12:balance - gia_tốc, 13:balance - gia_tốc, 14:balance - gia_tốc, 15:balance - gia_tốc} 
        });*/
        for (var k = 12; k <= 19; k++){
            if( k!=16 && k!=17 && k!=18 && k!=19){
                var yc = k ;
                db.ref().child(path+yc).set(balance - gia_tốc);
             }
         }
    setTimeout(balance_drone(balance), 200);
}

function turn_Right(balance, độ_chênh){ 
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;                                   
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
        db.ref().child(path+12).set(balance+ độ_chênh);
        db.ref().child(path+13).set(balance- độ_chênh);
        db.ref().child(path+14).set(balance+ độ_chênh);
        db.ref().child(path+15).set(balance- độ_chênh);
    setTimeout(balance_drone(balance), 100);
}

function turn_Left(balance, độ_chênh){
    const uid =  localStorage.getItem("uid");
    const esp_ = document.getElementById("esp_").value ;                                    
    var bo_drone =document.getElementById("level").value ;
    var path = uid + "/board_" + bo_drone  + "/outputs/digital/";
        db.ref().child(path+12).set(balance- độ_chênh);
        db.ref().child(path+13).set(balance+ độ_chênh);
        db.ref().child(path+14).set(balance- độ_chênh);
        db.ref().child(path+15).set(balance+ độ_chênh);
    setTimeout(balance_drone(balance), 100);
}