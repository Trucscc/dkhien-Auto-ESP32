
setInterval("startTime()",1000);  
function startTime() {  
    const uid =  localStorage.getItem("uid");
    var esp_ = document.getElementById("esp_").value ;
    var pwm_Val = document.getElementById("Value_PWM").value ;
    var path1 = uid + "/board_" + document.getElementById("level").value + "/outputs/digital/";
    var button_click = document.getElementById("Click-button").value ;   
    let today = new Date();
    var now = parseInt(today.getTime()/1000) + (7*60*60) ; // Lấy giá trị thời gian hiện tại theo chuẩn quốc tế + 7*60*60(múi giờ VN) gán vào biến now, tính bằng giây;
    const Thư =new Array(7);
        Thư[0]="Chủ Nhật";
        Thư[1]="Thứ Hai";
        Thư[2]="Thứ Ba"; 
        Thư[3]="Thứ Tư";
        Thư[4]="Thứ Năm";
        Thư[5]="Thứ Sáu";
        Thư[6]="Thứ Bảy";
        var Gio = today.getHours();
        var Phut = today.getMinutes();
        var Giay = today.getSeconds();
      if(Gio<10){Gio="0"+Gio;}  ;
      if(Phut<10){Phut="0"+Phut;}  ;   
      if(Giay<10){Giay="0"+Giay;}  ;  
        var day = Thư[today.getDay()];
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
    document.getElementById("clock").innerHTML = "Hôm nay: " +day+ ", " + dd + "/" + mm + "/" +yyyy+ ", " +Gio+ ":" +Phut+ ":"+Giay;
        //localStorage.removeItem('myItem'): Để xóa các mục riêng lẻ
    for (var i = 0; i <34; i++){
      if(i!=1 && i!=3 && i!=6 && i!=7 && i!=8 && i!=9 && i!=10 && i!=11 && i!=20 && i!=24 && i!=28 && i!=29 && i!=30 && i!=31){

        for(var j = 1; j <=localStorage.getItem("set_Time_" + button_click); j++){
            if(parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j)) == now ){
                localStorage.setItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j, now );
                //document.getElementById('state'+i.toString()).innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                document.getElementById(i.toString()).checked = true ;
                    if(i<=25){firebase.database().ref().child(path1+i).set(parseInt(pwm_Val));}else{ 
                        firebase.database().ref().child(path1+i).set(1); }
                if ( parseInt(localStorage.getItem("day_"+ i +"_"+j)) >> 0  ){
                    localStorage.setItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j, (parseInt(localStorage.getItem("day_"+ i +"_"+j)) + parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                }else if( parseInt(localStorage.getItem("week_"+ i+"_"+j)) >> 0){
                    localStorage.setItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j, (parseInt(localStorage.getItem("week_"+ i+"_"+j)) + parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                }
                  
                if( (parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j)) > parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ (j-1)))) && (parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ (j-1))) < now )){
                    localStorage.removeItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ (j-1));
                    localStorage.removeItem("day_"+ i +"_"+(j-1));
                    localStorage.removeItem("week_"+ i +"_"+(j-1));
                } 
            }else if(parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j)) < now){
                localStorage.removeItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j);
                localStorage.removeItem("day_"+ i +"_"+(j));
                localStorage.removeItem("week_"+ i +"_"+(j));
             }

            if(parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j)) == now ){
                localStorage.setItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j, now );
                //document.getElementById('state'+i.toString()).innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                document.getElementById(i.toString()).checked = false ;
                       firebase.database().ref().child(path1+i).set(0);
                if (parseInt(localStorage.getItem("day_"+ i +"_"+j)) >> 0){
                      localStorage.setItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j, (parseInt(localStorage.getItem("day_"+ i +"_"+j)) + parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                  }else if(parseInt(localStorage.getItem("week_"+ i+"_"+j)) >> 0){
                      localStorage.setItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j, (parseInt(localStorage.getItem("week_"+ i+"_"+j)) + parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                    }

                if( (parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j)) > parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ (j-1))))  && (parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ (j-1))) < now)  ){
                        localStorage.removeItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ (j-1));
                        localStorage.removeItem("day_"+ i +"_"+(j-1));
                        localStorage.removeItem("week_"+ i +"_"+(j-1));
                  }  
            }else if(parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j)) < now){
                localStorage.removeItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j);
                localStorage.removeItem("day_"+ i +"_"+(j));
                localStorage.removeItem("week_"+ i +"_"+(j));
             }

        }
        
      }
    }
    setInterval(trangthai(),1000);
}
  
function Set_Timer() { 
    const uid =  localStorage.getItem("uid");
    var esp_ = document.getElementById("esp_").value ;
    var pwm_Val = document.getElementById("Value_PWM").value ;
    var path1 = uid + "/board_" + document.getElementById("level").value + "/outputs/digital/";
    
    let today = new Date();
    const loop_day = document.getElementById("loop_day").value;
    const loop_week = document.getElementById("loop_week").value;         
    var t_on  = (7*60*60) + (new Date(document.getElementById("On").value)).getTime()/1000;
    var t_off = (7*60*60) + (new Date(document.getElementById("Off").value)).getTime()/1000; 
    var button_click = document.getElementById("Click-button").value ;
    var time_Set = document.getElementById("time_Set").value ;

    var path_Time = db.ref(uid + "/board_" + document.getElementById("level").value + "/outputs/TIME/") ;
    var path_new= path_Time.push();
    path_new.set({ 
          T_ON: t_on,
          T_OFF: t_off,
          LAN_X: time_Set,
          L_DAY: loop_day,
          L_WEK: loop_week,
          BOARD: "/board_" + document.getElementById("level").value,
          P_PWM: document.getElementById("Click-button").value,
          V_PWM: pwm_Val
      });

    path_new.on('value', snapshot =>{
        const data = snapshot.val();
        console.log(data);
    })
    
    localStorage.setItem("t_on_" + document.getElementById("level").value +"_"+ button_click +"_"+ time_Set, parseInt(t_on) );                      
    localStorage.setItem("t_off_" + document.getElementById("level").value +"_"+ button_click +"_"+ time_Set, parseInt(t_off) );
    localStorage.setItem("Button_", button_click );
    localStorage.setItem("set_Time_" + button_click, time_Set );
    
    if(document.getElementById("loop_day").checked == true && document.getElementById("loop_week").checked == false){
        localStorage.setItem("day_"+ button_click+"_"+ time_Set, parseInt(loop_day));
        localStorage.setItem("week_"+ button_click+"_"+ time_Set, 0);
      }else if(document.getElementById("loop_week").checked == true && document.getElementById("loop_day").checked == false) {
          localStorage.setItem("week_"+ button_click+"_"+ time_Set, parseInt(loop_week));
          localStorage.setItem("day_"+ button_click+"_"+ time_Set, 0);
      }else if(document.getElementById("loop_day").checked == false && document.getElementById("loop_week").checked == false){
            localStorage.setItem("day_"+ button_click+"_"+ time_Set, 0);
            localStorage.setItem("week_"+ button_click+"_"+ time_Set, 0);
        }else if(document.getElementById("loop_day").checked == true && document.getElementById("loop_week").checked == true){
              localStorage.setItem("day_"+ button_click+"_"+ time_Set, parseInt(loop_day));
              localStorage.setItem("week_"+ button_click+"_"+ time_Set, 0);
          } 
    alert("Thanks you - Bạn đã Thiết lập thời gian xong cho Relay: " + button_click + " lần thứ: " + time_Set);
    
    var now = parseInt(today.getTime()/1000) + (7*60*60) ;      
    for (var i = 0; i <34; i++){
      if(i!=1 && i!=3 && i!=6 && i!=7 && i!=8 && i!=9 && i!=10 && i!=11 && i!=20 && i!=24 && i!=28 && i!=29 && i!=30 && i!=31){
        for(var j = 1; j <=localStorage.getItem("set_Time_" + button_click); j++){
            if(parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j)) == now ){
                  localStorage.setItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j, now );
                  document.getElementById('state'+i.toString()).innerHTML = "ON";
                  document.getElementById(i.toString()).checked = true ;
                      if(i<=25){firebase.database().ref().child(path1+i).set(parseInt(pwm_Val));}else{ 
                                firebase.database().ref().child(path1+i).set(1); }
                  trangthai();
                  if (parseInt(localStorage.getItem("day_"+ i +"_"+j)) >> 0){
                      localStorage.setItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j, (parseInt(localStorage.getItem("day_"+ i +"_"+j)) + parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                  }else if( parseInt(localStorage.getItem("week_"+ i+"_"+j)) >> 0){
                      localStorage.setItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j, (parseInt(localStorage.getItem("week_"+ i+"_"+j)) + parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                   }
            }

            if(parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j)) == now ){
                  localStorage.setItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j, now );
                  document.getElementById('state'+i.toString()).innerHTML = "OFF";
                  document.getElementById(i.toString()).checked = false ;
                      firebase.database().ref().child(path1+i).set(0);
                  trangthai();
                  if (parseInt(localStorage.getItem("day_"+ i+"_"+j)) >> 0){
                      localStorage.setItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j, (parseInt(localStorage.getItem("day_"+ i +"_"+j)) + parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                  }else if(parseInt(localStorage.getItem("week_"+ i+"_"+j)) >> 0){
                      localStorage.setItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j, (parseInt(localStorage.getItem("week_"+ i+"_"+j)) + parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                   }
            }

            //localStorage.removeItem("set_Time_" + button_click);  // xóa bộ nhớ vói tên biến "name of localStorage variable"
        }
        
      }
    }
}