HƯỚNG DẪN KẾT NỐI - ĐIỀU KHIỂN TỰ ĐỘNG-THIẾT BỊ ĐIỆN
            “AU-CONTROL IoT” 
SMART HOME - BẤT CỨ NƠI NÀO TRÊN THẾ GIỚI

Cài thiết lập APP điều khiển rất dễ. Bạn vào bất kỳ thanh trình duyệt nào cũng được (google, chrom,…) gõ  chuổi ký tự https://dkhien-auto-00001.firebaseapp.com
Trên Smartphone (hay trên desktop máy tính), bạn có thể tạo Icon (đặt tên tùy thích… bạn muốn)

Để vào App bạn chỉ cần Register một tài khoản có thể điều khiển cho nhiều Board cùng lúc. Việc Register ban đầu là để đăng ký tài khoản. (Mỗi Căn nhà hay Căn hộ, Biệt thự…. thậm chí một chung cư) gọi là Client. Sẽ được cấp cho một Register và sẽ được mã hóa bảo mật một cách chắc chắn nên cực an tâm vấn đề riêng tư khi sử dụng. 

Đặc tính hay của APP:
• Trên App có vị trí khai báo Board_No___ để điều khiển từng board hoặc bạn có thể điều khiển cùng lúc tất cả các bo trên hệ thống (bao nhiêu Board cũng được tất)
• Mỗi BoardESP có khả năng điều khiển dược 18 Relay tương úng với 18 thiết bị điện độc lập như (Tv, Tủ lạnh, Máy điều hòa, đèn chùm, đèn ngủ, quạt treo, rèm cửa, cửa phòng ... v.v).
• Trạng thái đóng mở cho các thiết bị Bạn có thể đấu nối giống như công tắc điện mạch cầu thang thông thường.

Bước 1: Register Au-Control GPIOs
            ![image](https://github.com/Trucscc/dkhien-Auto-ESP32/assets/34645554/c4e6f8b0-98e9-4621-80c7-16a24ad3e621)

Là việc Register bước đầu đăng ký phần mềm (điều khiển tự động từ xa bất cứ đâu trên thế giới):
Trong Ô Email bạn gõ địa chỉ mail vào đó.  Ví du: users@gmail.com.  Ban nên tạo tên luôn có chữ @abc…. giống với địa chỉ hộp thư mà bạn hay sử dụng. 
Đặc biệt bạn phải nhớ từng ký tự Pass_ (1) cho ô nhập thứ hai lần đầu tiên bạn đăng ký.
Lưu ý :  
      (1)password là duy nhất không thể thay đổi được khi bạn đã quên nó hay đánh mất. Nếu bạn đã quên việc tạo lại đăng ký cho quá trình cài đặt lại từ đầu Vì mỗi bo mạch thiết bị điều khiển phải có (2)Uid điều khiển. Quản lý server (Admin) hoàn toàn không lưu thông tin hay lấy lại Password này cho bạn.
      Sau khi đã hoàn tất đăng ký lần đầu. Chương trình sẽ tự động sinh ra 1 mã Uid (2) duy nhất cho thiết bị board mạch ESP bạn đăng ký. Bạn cần ghi chép lại mã Uid lưu trữ này để nhập khai báo cho bước bước2 kế tiếp.

Bước 2:  Kết nối truy cập để điều khiển Bo mạch IoT hay toàn bộ tủ tổng.
    Thiết lập hệ thống điểm phát sóng trên Smartphone của bạn với 
      • User điểm phát là     :	admin, 
      • Password điểm phát là : 	admin123
Cắm cáp nguồn nuôi (5v) cho Bo mạch ESP có điện.
Kế tiếp, trên máy tính (hay smartphone thứ hai) dò tìm điểm phát sóng của Smartphone 1, bật chế độ wifi ESP32_01 của điểm phát sóng này. 
Vào thanh trình duyệt nào đó hãy gõ: 192.168.9.9 (nếu thắt mắc hãy gọi dt số 0945582037)
Xuất hiện trang web mới, Trang này dùng để thay đổi tham số trạm phát sóng Wifi để bo có thể truy cập được Internet thường xuyên(Điều kiện tiên quyết để điều khiển từ xa qua Internet hay qua dt 4G, 5G)
            ![image](https://github.com/Trucscc/dkhien-Auto-ESP32/assets/34645554/173d62d3-de05-4d71-819e-be41f73b6e02)

Bước 3: Hướng dẫn tiếp của bước 2 kết nối trạm phát thông qua Smartphone.
Sau quá trình nhập chính xác cho các ô nhập trạm phát sóng của nhà bạn, cùng tham số Uid cho Bo mạch ESP. Click CHANGE  .Máy tự khởi động lại để cập nhật tham số. 
     Ô User Wifi: bạn chọn router Wifi nơi có thể truy cập internet cho ESP của bạn có thể sủ dụng sim 3G, 4G hay 5 G phát sóng wifi kết nối được Internet.
     Ô Pass Wifi: bạn nhập chính xác ký tự bắt được kết nối mạng thế giới. 
     Ô repeat Pass: bạn nhập đúng ký tự phải trùng với ký tự của ô Ô Pass Wifi để chắc rằng khớp ký tự do router phát.
     Ô Uid : Bạn gõ đúng từng ký tự một liên tục không có cách khoảng do phần mềm đăng ký App đã sinh ra gởi cho bạn ở bước 2.
     Ô cuối : định nghĩa thú tự bo bạn kết nối trong hệ thống.
Click  Au_Control App chính là vào lại ứng dụng App của trang WWW https://dkhien-auto-00001.firebaseapp.com.

Bước 4:
Bước cuối cùng bạn gọi cho tôi,  theo số 0945582037.
   Tôi sẽ kích hoạt việc kết nối (nếu bạn đã có thiết bị do tôi cung cấp cho bạn) là bạn có thể điều khiển mọi thiết bị đầu cuối thông qua công tác đấu nối các Relay cho các chân GPIOs cho ESP.

Bước 5:
   Là bước tự bạn ra đề cương cho việc thiết kế để đấu nối với các thiết bị ngoại vi theo ngữ cảnh của từng ngôi nhà riêng biệt của mình. Có thể phân thiết bị theo tầng hay theo phòng, sử dụng nhận dạng giọng nói để điều khiển  theo không gian của nhà bạn. 

