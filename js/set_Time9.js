function Set_Timer() { 
    const uid =  localStorage.getItem("uid");
    var esp_ = document.getElementById("esp_").value ;
    var pwm_Val = document.getElementById("Value_PWM").value ;
    var path1 = uid + "/board_" + document.getElementById("level").value + "/outputs/digital/";
    
    let today = new Date();
    const loop_day = document.getElementById("loop_day");
    const loop_week = document.getElementById("loop_week");         
    var t_on  = (7*60*60) + (new Date(document.getElementById("On").value)).getTime()/1000;
    var t_off = (7*60*60) + (new Date(document.getElementById("Off").value)).getTime()/1000; 
    var pin_out = document.getElementById("Click-button").value ;
    var time_Set = document.getElementById("time_Set").value ;
    
    localStorage.setItem("t_on_"+ pin_out +"_"+ time_Set, parseInt(t_on) );                      
    localStorage.setItem("t_off_"+ pin_out +"_"+ time_Set, parseInt(t_off) );
    localStorage.setItem("Val_"+ pin_out+"_"+ time_Set, parseInt(pwm_Val) );
    localStorage.setItem("Pin_", parseInt(pin_out));
    localStorage.setItem("set_Lần_thứ", time_Set );
    
    if(loop_day.checked == true && loop_week.checked == false){
        localStorage.setItem("day_"+ pin_out+"_"+ time_Set, parseInt(loop_day.value));
        localStorage.setItem("week_"+ pin_out+"_"+ time_Set, 0);
      }else if(loop_week.checked == true && loop_day.checked == false) {
          localStorage.setItem("week_"+ pin_out+"_"+ time_Set, parseInt(loop_week.value));
          localStorage.setItem("day_"+ pin_out+"_"+ time_Set, 0);
      }else if(loop_day.checked == false && loop_day.checked == false){
            localStorage.setItem("day_"+ pin_out+"_"+ time_Set, 0);
            localStorage.setItem("week_"+ pin_out+"_"+ time_Set, 0);
        }else if(loop_day.checked == true && loop_day.checked == true){
              localStorage.setItem("day_"+ pin_out+"_"+ time_Set, parseInt(loop_day.value));
              localStorage.setItem("week_"+ pin_out+"_"+ time_Set, 0);
          } 
    var path_Time = db.ref(uid + "/board_" + document.getElementById("level").value + "/outputs/SetTime") ;
    var path_new= path_Time.push();
    path_new.set({ 
          KeyT_on  : "T_on_"+ pin_out+"_"+ time_Set ,
          T_on     : t_on,
          KeyT_off : "T_of_"+ pin_out+"_" + time_Set ,
          T_off    : t_off,
          KeyV_on  : "Value"+ pin_out+"_" + time_Set ,
          Value_on : parseInt(pwm_Val),
          Pin_Out  : parseInt(pin_out),
          Time_Set : parseInt(time_Set), 
          Lday_ij  :  loop_day.checked,
          Lwek_ij  :  loop_week.checked,
      });

    path_new.on('value', snapshot =>{
        const data = snapshot.val();
        console.log(data);
    })

    alert("Thanks you - Bạn đã Thiết lập thời gian xong cho Relay: " + parseInt(pin_out) + " lần thứ: " + time_Set);
    
    var now = parseInt(today.getTime()/1000) + (7*60*60) ;      
    for(var j = 1; j <=localStorage.getItem("set_Lần_thứ"); j++){
      for (var i = 0; i <34; i++){
        if(i!=1 && i!=3 && i!=6 && i!=7 && i!=8 && i!=9 && i!=10 && i!=11 && i!=20 && i!=24 && i!=28 && i!=29 && i!=30 && i!=31){
            if(parseInt(localStorage.getItem("t_on_"+ i +"_"+ j)) == now ){
                  localStorage.setItem("t_on_"+ i +"_"+ j, now );
                      if(i<=25){
                           firebase.database().ref().child(path1+i).set(localStorage.getItem("Val_"+i+"_"+ j));
                       }else{ 
                           firebase.database().ref().child(path1+i).set(1); 
                        }
                  if (parseInt(localStorage.getItem("day_"+ i +"_"+j)) == parseInt(loop_day.value)){
                      localStorage.setItem("t_on_"+ i +"_"+ j, (parseInt(localStorage.getItem("day_"+ i +"_"+j)) + parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                   }else if( parseInt(localStorage.getItem("week_"+ i+"_"+j)) == parseInt(loop_week.value)){
                      localStorage.setItem("t_on_"+ i +"_"+ j, (parseInt(localStorage.getItem("week_"+ i+"_"+j)) + parseInt(localStorage.getItem("t_on_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                   }
            }else if(parseInt(localStorage.getItem("t_on_"+ i +"_"+ j)) < now ){
                localStorage.removeItem("t_on_"+ i +"_"+ j);
                localStorage.removeItem("Val_"+i+"_"+ j);
              }

            if(parseInt(localStorage.getItem("t_off_"+ i +"_"+ j)) == now ){
                  localStorage.setItem("t_off_"+ i +"_"+ j, now );
                  firebase.database().ref().child(path1+i).set(0);
                  if (parseInt(localStorage.getItem("day_"+ i+"_"+j)) == parseInt(loop_day.value)){
                      localStorage.setItem("t_off_"+ i +"_"+ j, (parseInt(localStorage.getItem("day_"+ i +"_"+j)) + parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                  }else if(parseInt(localStorage.getItem("week_"+ i+"_"+j)) == parseInt(loop_week.value)){
                      localStorage.setItem("t_off_"+ i +"_"+ j, (parseInt(localStorage.getItem("week_"+ i+"_"+j)) + parseInt(localStorage.getItem("t_off_" + document.getElementById("level").value +"_"+ i +"_"+ j))));
                   }
             }else if(parseInt(localStorage.getItem("t_off_"+ i +"_"+ j)) < now ){
                localStorage.removeItem("t_off_"+ i +"_"+ j);
              }

            if(localStorage.getItem("day_"+ i +"_"+j) == 0 && localStorage.getItem("week_"+ i+"_"+j)== 0){
                localStorage.removeItem("day_"+ i +"_"+j);  localStorage.removeItem("week_"+ i+"_"+j);
              }else if (localStorage.getItem("day_"+ i +"_"+j) == 86400 && localStorage.getItem("week_"+ i+"_"+j)==0) {
                    localStorage.removeItem("week_"+ i+"_"+j);
              }else if(localStorage.getItem("day_"+ i +"_"+j) == 0 && localStorage.getItem("week_"+ i+"_"+j)==604800){
                    localStorage.removeItem("day_"+ i +"_"+j);
                } 
        } 
      }
      trangthai();
    }
}
//localStorage.removeItem("set_Lần_thứ");  // xóa bộ nhớ vói tên biến "name of localStorage variable"