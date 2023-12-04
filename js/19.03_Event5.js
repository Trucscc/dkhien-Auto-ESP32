
setInterval("trangthai()",1000);

function Pin_PWm(element) {
  const uid =  localStorage.getItem("uid");
  var path1 = uid + "/board_" + document.getElementById("level").value + "/outputs/digital/";
  
  var number = element.id.substring(5) ;                    //console.log(thanhxx);                       //charAt(element.id.length-1);     
  var value_ = document.getElementById("thanh"+ number.toString());    //console.log(sliderValue);
      document.getElementById("slider"+ number.toString()).value = parseInt(value_.value);

      db.ref().child(path1+ number).set(parseInt(value_.value));
      
      document.getElementById("slider"+ number.toString()).innerText = 'Brightness: ' + parseInt(value_.value)+ ' %'; 
  
  trangthai();
}

function Pin_(element) {
  const uid =  localStorage.getItem("uid");
  var esp_ = document.getElementById("esp_").value ;
    if(esp_ == 32 ){
            var path1 = uid + "/board_" + document.getElementById("level").value + "/outputs/digital/";
            if(element.checked == true && (element.id)<=25){ 
                  db.ref().child(path1+element.id).set(100);
                  document.getElementById('state'+element.id).innerHTML = '<i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i>';
                  document.getElementById(element.id).checked = true ;
                  document.getElementById('thanh'+(element.id).toString()).style.display= "block" ;document.getElementById('thanh'+element.id).value = 100 ;
                  document.getElementById("slider"+ (element.id).toString()).innerText = 'Brightness: ' + parseInt(document.getElementById("thanh"+ element.id).value) + ' %';  //parseInt(document.getElementById("thanh"+ element.id).value)
                  
                }else if(element.checked == false && (element.id)<=25){ 
                    db.ref().child(path1+element.id).set(0);
                    document.getElementById('state'+element.id).innerHTML= '<i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                    document.getElementById(element.id).checked = false ;
                    document.getElementById('thanh'+(element.id).toString()).style.display= "none" ;
                    document.getElementById("slider"+ (element.id).toString()).innerText='' ;
              }else if(element.checked == true && (element.id)>=26){
                      db.ref().child(path1+element.id).set(1);
                      document.getElementById('state'+element.id).innerHTML = '<i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i>';
                      document.getElementById(element.id).checked = true ;
              }else if(element.checked == false && (element.id)>=26){
                    db.ref().child(path1+element.id).set(0);
                    document.getElementById('state'+element.id).innerHTML= '<i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                    document.getElementById(element.id).checked = false ;
              }

        }else if(esp_ == 82 ){
        var path0 = uid + "/board_"+ document.getElementById("level").value + "/outputs/digital/D";
        var number = element.id.substring(0) ;
        var sonut = document.getElementById(element.id) ;
        if(element.checked){
          document.getElementById("state"+ (element.id).toString()).innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> '; 
          if(sonut == 5){             // 5 là D1
                document.getElementById("stateD1").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                db.ref().child(path0+1).set(1);
              }else if(sonut == 4){    // 4 là D2
                document.getElementById("stateD2").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                db.ref().child(path0+2).set(1);
              }else if(sonut == 0){    // 0 là D3
                document.getElementById("stateD3").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                db.ref().child(path0+3).set(1);
              }else if(sonut == 2){     // 2 là D4
                document.getElementById("stateD4").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                db.ref().child(path0+4).set(1);
              }else if(sonut == 14){     // 14 là D5
                document.getElementById("stateD5").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                db.ref().child(path0+5).set(1);
              }else if(sonut == 12){     // 12 là D6
                document.getElementById("stateD6").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                db.ref().child(path0+6).set(1);
              }else if(sonut == 13){     // 13 là D7
                document.getElementById("stateD7").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                db.ref().child(path0+7).set(1);
              }else if(sonut == 15){     // 15 là D8
                document.getElementById("stateD8").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                db.ref().child(path0+8).set(1);
              }else if(sonut == 16){     // 15 là D8
                document.getElementById("stateD0").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                db.ref().child(path0+0).set(1);
              }
        }else {
          document.getElementById("state"+ (element.id).toString()).innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i>  '; 
          if(sonut == 5){
                document.getElementById("stateD1").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                db.ref().child(path0+1).set(0);
              }else if(sonut == 4){
                document.getElementById("stateD2").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                db.ref().child(path0+2).set(0);
              }else if(sonut == 0){
                document.getElementById("stateD3").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                db.ref().child(path0+3).set(0);
              }else if(sonut == 2){
                document.getElementById("stateD4").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                db.ref().child(path0+4).set(0);
              }else if(sonut == 14){
                document.getElementById("stateD5").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                db.ref().child(path0+5).set(0);
              }else if(sonut == 12){
                document.getElementById("stateD6").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                db.ref().child(path0+6).set(0);
              }else if(sonut == 13){
                document.getElementById("stateD7").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                db.ref().child(path0+7).set(0);
              }else if(sonut == 15){
                document.getElementById("stateD8").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                db.ref().child(path0+8).set(0);
              }else if(sonut == 16){
                document.getElementById("stateD0").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                db.ref().child(path0+0).set(0);
              }
          }

        if(document.getElementById("16").checked == true){     // D1 mượn nút 5  esp32
            db.ref().child(path0+"0").set(1);
         }else{  
            db.ref().child(path0+"0").set(0);
            }

        if(document.getElementById("5").checked == true){     // D1 mượn nút 5  esp32
            db.ref().child(path0+"1").set(1);
         }else{  
            db.ref().child(path0+"1").set(0);
           }
      
        if(document.getElementById("4").checked == true){     // D2 mượn nút 4  esp32
            db.ref().child(path0+"2").set(1);
         }else{  
            db.ref().child(path0+"2").set(0);
            }
            
        if(document.getElementById("0").checked == true){     // D3 mượn nút 0 esp32
            db.ref().child(path0+"3").set(1);
          }else{
            db.ref().child(path0+"3").set(0);
            }

        if(document.getElementById("2").checked == true){      // D4 mượn nút 2 của esp32
              db.ref().child(path0+"4").set(1);
            }else{
              db.ref().child(path0+"4").set(0);
              }

        if(document.getElementById("14").checked == true){    // D5 mượn nút 14  esp32
              db.ref().child(path0+"5").set(1);
            }else{
              db.ref().child(path0+"5").set(0);
              }

        if(document.getElementById("12").checked == true){     // D6 mượn nút 12  esp32
            db.ref().child(path0+"6").set(1); 
          }else{
            db.ref().child(path0+"6").set(0);
            }

        if(document.getElementById("13").checked == true){     // D7 mượn nút 13  esp32
            db.ref().child(path0+"7").set(1);
          }else{
            db.ref().child(path0+"7").set(0);
            }

        if(document.getElementById("15").checked == true){    // D8 mượn nút 15  esp32
          db.ref().child(path0+"8").set(1);
          }else{
            db.ref().child(path0+"8").set(0);
            }
    };
    trangthai();
}

function trangthai(){
    const uid =  localStorage.getItem("uid");
    var esp_ = document.getElementById("esp_").value ;

    if(esp_ == 32 ){
      var path1 = uid + "/board_" + document.getElementById("level").value + "/outputs/digital/";
          for (var i = 0; i < 34; i++){
               var X = document.getElementById('state'+i.toString());
               var Y = document.getElementById(i.toString());
               let thanh = document.getElementById('thanh'+ i.toString());
               let slider = document.getElementById('slider'+ i.toString());
              if(i>=26 && i!=28 && i!=29 && i!=30 && i!=31){
                    db.ref().child(path1+i).on('value', snap => {
                       if( snap.val() >= 1 ){
                          X.innerHTML = '<i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i>';
                          Y.checked = true;
                        }else{
                          X.innerHTML = '<i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i>';
                          Y.checked = false;  
                        }
                    })
               }else if ( i<=25 && i!=1 && i!=3 && i!=6 && i!=7 && i!=8 && i!=9 && i!=10 && i!=11 && i!=20 && i!=24){
                    db.ref().child(path1+i).on('value', snap => { 
                           if (snap.val()>= 1 ){
                                  X.innerHTML = '<i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i>';
                                  Y.checked = true;
                                  thanh.style.display = 'block' ;
                                  thanh.value = snap.val() ;
                                  slider.innerHTML = 'Brightness: ' + snap.val() + ' %';
                            }else{
                              X.innerHTML = '<i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i>';
                              Y.checked = false; 
                              thanh.style.display = 'none' ;
                              slider.innerHTML ='' ; 
                             }

                    })
                }
          } 
        }else {
          var path0 = uid + "/board_"+ document.getElementById("level").value + "/outputs/digital/D";
            
          db.ref().child(path0+(0)).on('value', snap => {
                if(snap.val()==1) {
                  document.getElementById("16").checked = true ;
                  document.getElementById("state16").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                }else{
                  document.getElementById("16").checked = false ;
                  document.getElementById("state16").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                }
            });

            db.ref().child(path0+(1)).on('value', snap => {
                if(snap.val()==1) {
                  document.getElementById("5").checked = true ;
                  document.getElementById("state5").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                }else{
                  document.getElementById("5").checked = false ;
                  document.getElementById("state5").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                }
            });

            db.ref().child(path0+(2)).on('value', snap => {
                if(snap.val()==1) {
                  document.getElementById("4").checked = true ;
                  document.getElementById("state4").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                }else{
                  document.getElementById("4").checked = false ;
                  document.getElementById("state4").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                }
            });

            db.ref().child(path0+(3)).on('value', snap => {
                if(snap.val()==1) {
                  document.getElementById("0").checked = true ;
                  document.getElementById("state0").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                }else{
                  document.getElementById("0").checked = false ;
                  document.getElementById("state0").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                }
            });

            db.ref().child(path0+(4)).on('value', snap => {
                if(snap.val()==1) {
                  document.getElementById("2").checked = true ;
                  document.getElementById("state2").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                }else{
                  document.getElementById("2").checked = false ;
                  document.getElementById("state2").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                }
            });

            db.ref().child(path0+(5)).on('value', snap => {
                if(snap.val()==1) {
                  document.getElementById("14").checked = true ;
                  document.getElementById("state14").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                }else{
                  document.getElementById("5").checked = false ;
                  document.getElementById("state14").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                }
            });

            db.ref().child(path0+(6)).on('value', snap => {
                if(snap.val()==1) {
                  document.getElementById("12").checked = true ;
                  document.getElementById("state12").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                }else{
                  document.getElementById("12").checked = false ;
                  document.getElementById("state12").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                }
            });

            db.ref().child(path0+(7)).on('value', snap => {
                if(snap.val()==1) {
                  document.getElementById("13").checked = true ;
                  document.getElementById("state13").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                }else{
                  document.getElementById("13").checked = false ;
                  document.getElementById("state13").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                }
            });

            db.ref().child(path0+(8)).on('value', snap => {
                if(snap.val()==1) {
                  document.getElementById("15").checked = true ;
                  document.getElementById("state15").innerHTML = ' <i class="fas fa-lightbulb" style="color: rgb(233, 24, 42) ;"> ON</i> ';
                }else{
                  document.getElementById("15").checked = false ;
                  document.getElementById("state15").innerHTML= ' <i class="fas fa-lightbulb" style="color: rgb(0, 0, 0) ;"> OFF</i> ';
                }
            });

        }
  }

var action = setTimeout(function(){                                         // hành động something  
document.location.reload();
//window.location.reload(true);                                             //tải lại trang hiện tại với POSTdữ liệu
//window.location.href = 'https://dkhien-auto-00001.firebaseapp.com/'       // tải lại trang web không bao gồm POST dữ liệu
}, 100);
clearTimeout(action);                                                         // hủy hành động
