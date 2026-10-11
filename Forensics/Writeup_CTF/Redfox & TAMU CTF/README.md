# Redfox CTF
## Code of the Nine Realms 
Ở 1 packet của http thì em thấy có 1 file này

![image](https://hackmd.io/_uploads/ByTFAUC9Wl.png)

Thường thì base64 sẽ có padding là dấu '=' ở cuối đoạn encrypt mà cnay em thấy file === tức là dấu = ở cuối đã được đẩy lên trên nên em sẽ reverse lại đoạn này và decrypt bằng base64 thì thu được flag

![image](https://hackmd.io/_uploads/BkgX1wCqWg.png)

**REDFOX{Unauthorized_Access123}**
## Ghost of Sparta
Ở bài này thì nó cho 1 ảnh jpg 

![image](https://hackmd.io/_uploads/ByTgewR5Zg.png)

giải này đóng web server nhanh quá nên em kh lưu được description :( , nchung description nó liên quan đến việc mở rộng ảnh vì ảnh JPEG nên các byte FF C0 sẽ chứa các variable size, em xác định được width, height của nó là 617x205 

![image](https://hackmd.io/_uploads/rk-igwCq-e.png)

Sau khi dùng hex thì em xác định được hex của height là
00 CD 

![image](https://hackmd.io/_uploads/r1YgWwRc-l.png)

Sau khi filter ra FF C0 thì em thấy được hex của height

![image](https://hackmd.io/_uploads/HyVEbwC5Wx.png)

Sau đó em sửa height thành 300 thì thu được flag

![image](https://hackmd.io/_uploads/rkPP-D0c-l.png)

**REDFOX{Th3_Gh0s7_0f_Sparta_15_h3r3}**
## Rieck Roll
### Những gì học được từ challenge này
- phân tích các bit có chứa data bằng zsteg và sửa lại byte
### Writeup chi tiết
Ban đầu em có chạy zsteg thì nó báo lỗi do file ảnh này có dung lượng khá lớn nên em thêm dòng này và chạy lại RUBY_THREAD_VM_STACK_SIZE=50000000 thì thấy

![image](https://hackmd.io/_uploads/Bko8MD09bl.png)

Ở bit b2,rgba,lsb,xy có chứa data, nên em sẽ trích đoạn data này ra 

![image](https://hackmd.io/_uploads/ryrm7vRcZl.png)

Sau khi xác định thì em thấy file này là file data

![image](https://hackmd.io/_uploads/r15Mmv0qWg.png)

nma khi em vào hexedit để xem thì thấy 4 bytes sau là magic bytes của png còn các byte đầu em thấy nó chỉ là file rác

![image](https://hackmd.io/_uploads/B1eD7wAc-e.png)

Em dùng dd để tạo 1 file khác bỏ 4 byte đầu đi

![image](https://hackmd.io/_uploads/HJyp7wA9Zg.png)

thì thu được ảnh 

![image](https://hackmd.io/_uploads/ryxgVPA9bg.png)

Em tiếp tục dùng zsteg để kiểm tra thì thấy nó cũng ẩn data dưới bit b2,rgb,lsb,xy 

![image](https://hackmd.io/_uploads/ryM74vA9-e.png)

Em trích xuất nó ra 

![image](https://hackmd.io/_uploads/S1Gi4D05Wx.png)

Em thấy 4 byte đầu của nó cũng bị chỉnh sửa

![image](https://hackmd.io/_uploads/BJwp4D0q-g.png)

nên em sẽ làm tương tự như bước trên và thu được 1 ảnh như này

![image](https://hackmd.io/_uploads/HyGfHv0cWg.png)

Sau khi chỉnh thì được như này

![image](https://hackmd.io/_uploads/r1L1vw09-x.png)

**REDFOX{LOOk_WH0_ShOw3D_uP!}**
## Secure Recomms 
### Những gì học được từ challenge này
- các packet của protocol tls thường sẽ bị mã hóa ở wireshark, nhưng khi tìm được private key thì có thể xem được dữ liệu bên trong
### Writeup chi tiết
Sau khi xem trong http request thì em thấy có 1 request liên quan đến key log của ssl 

![image](https://hackmd.io/_uploads/SywE4dCqWe.png)

Sau khi follow stream thì em thấy có đoạn mã này, em có tìm hiểu trên mạng thì bt dữ liệu TLS truyền trên mạng thường sẽ bị mã hóa, Wireshark mặc định chỉ nhìn thấy những chuỗi byte vô nghĩa, nếu Wireshark có tập tin chứa các khóa bí mật thì có thể dùng chìa khóa đó để mở khóa dữ liệu.

![image](https://hackmd.io/_uploads/r1RH4d05Zl.png)

h em sẽ cóp dữ liệu của packet kia vào 1 file 

![image](https://hackmd.io/_uploads/Sk0vrOA5We.png)

Sau đó em chọn file key đó trong phần Edit-->Preferences--> Protocol--> TLS để giải mã các dữ liệu ẩn 

![image](https://hackmd.io/_uploads/HJQaHuA9Wg.png)

Sau đó em tìm lại trong http thì thấy có packet này

![image](https://hackmd.io/_uploads/HybmLdAqWe.png)

Sau khi follow xem dữ liệu của packet này thì em thấy biến auth nó giống với 1 đoạn base64 

![image](https://hackmd.io/_uploads/Bk-8IOC9-l.png)

Sau khi decode thì em thu được

![image](https://hackmd.io/_uploads/SJqtUdC5bl.png)

**REDFOX{R0b_LuCc1_I5_Sc4r3d_0f_b4ll00n5!}**
## Magnite's Oversight
:))) bài này của giải này em thấy file,cách giải, lẫn flag y chang bài Code of Nine Realms 
## Kratos' Rage
### Những gì học được từ challenge 
- Dùng `olevba` để phân tích file doc, nếu server web kh phản hồi thì có thể dùng truy vấn DNS để tìm flag
### Writeup chi tiết
Bài này thì em có dùng olevba để phân tích file doc thì em thấy có lệnh thực thi powershell sau 

![image](https://hackmd.io/_uploads/r1xJro05be.png)

Em có dịch đoạn mã từ octal thì thu được 

![image](https://hackmd.io/_uploads/HkbpHoAcWx.png)

em có truy cập trang này nma server nó kh phản hồi, em hỏi anh Nam thì bt được khúc này dùng truy vấn DNS TXT thì thu được flag

![image](https://hackmd.io/_uploads/SkgRC8sC5-x.png)

**REDFOX{NO0ne_W1ll_M4k3_A7R3US_S4D!}**
# TAMUctf
## Time Capsule
### Những gì học được từ challenge này 
- Tác giả có thể dùng mtime để ẩn chữ ví dụ 14:01:43 tương ứng với 1 phút 43 giây tương đương 103 trong decimal tương đương với chữ g trong ascii
### Writeup chi tiết 
bài này cho em 1 file 

![image](https://hackmd.io/_uploads/S1UOC909bg.png)

Em có tìm sơ qua trên gg thì em thấy có tài liệu hướng dẫn để mount file này về máy
https://righteousit.com/wp-content/uploads/2024/04/how-to-mount-dirty-ext4-file-systems.pdf
Em đọc và mount về

![image](https://hackmd.io/_uploads/HkRhRq05Ze.png)

Sau đó em có vào thư mục nostalgia thì em thấy có 17 bức ảnh

![image](https://hackmd.io/_uploads/rkTx1sA5be.png)

Em xem gợi ý trong thread của anh Nam thì em thấy các file này hầu như ở phầnTime Modification của mỗi file nó đều khác

![image](https://hackmd.io/_uploads/Byih1iA9Zl.png)

Thay vì giấu ndung ở trong bức ảnh thì ngta chỉnh sửa trực tiếp thông số phút và giây trong mtime của bức ảnh đó.
**Ví dụ**: ở file đầu tiên thì 14:01:43 tương ứng với 1 phút 43 giây tương đương 103 trong decimal tương đương với chữ g trong ascii với sau khi tính hết các file thì em thu được

![image](https://hackmd.io/_uploads/SJUUzi09-x.png)

## colonel
### Những gì học được từ challenge
- Các plugin về vol3 của linux: 
  - `linux.bash`: Khôi phục lịch sử gõ lệnh terminal
  - `linux.kmsg`: Đọc log của kernel
  - `linux.pagecache.Files`: Quét các file có trên file mem của linux
  - `linux.pagecache.Inodepages`: Quét và trích xuất (dump) nội dung các file đang được đệm trên RAM
### Writeup chi tiết
bài này thì đầu tiên em sẽ build profile cho vol3 bằng dwarf2json

![image](https://hackmd.io/_uploads/S1CkssCqbx.png)

Em sẽ mv file này vào thư mục sau 

![image](https://hackmd.io/_uploads/BkJGoiR5Wx.png)

Sau khi build thì h có thể dùng vol3 để phân tích, đầu tiên em sẽ dùng plugin linux.bash để truy xuất lịch sử các câu lệnh trong file memory thì thu được 

![image](https://hackmd.io/_uploads/S1geTjA9Wg.png)

Em thấy ngta đã load một file có tên là check_service.ko vào nhân kernel của hệ điều hành cũng như truyền cho nó một tham số là key_path=validation, tiếp theo ngta unload module đó ra và load module đó vào kernel một lần nữa, nhưng lần này truyền tham số khác là key_path=validation2.
Tiếp theo em tìm đường dẫn tuyệt đối của 2 file này bằng plugin linux.pagecache.Files

![image](https://hackmd.io/_uploads/SkQEWhRqWl.png)

Sau khi fix 1 số lỗi thì em đã dump được 2 file này ra

![image](https://hackmd.io/_uploads/BkErVnR5bx.png)

Sau khi dùng plugin linux.kmsg để xem các lỗi giống như dmesg thì em thấy validation thì sai index 9 21 31 còn file validation2 thì sai index 0 12 23 29

![image](https://hackmd.io/_uploads/rJrdr2AcWg.png)

h em sẽ chỉnh sửa trong này

![image](https://hackmd.io/_uploads/HJq4_hR5bg.png)

cnay tìm index sai và thay thế index đó bằng index file còn lại th, sau khi dò thì file validation đúng sẽ là
`Qx+KvRQ1NQRR66IxSM5VjjrGKg09FH2e`
Sau khi decrypt thì em thu được

![image](https://hackmd.io/_uploads/BkLeKh05Zx.png)

**gigem{bl3ss3d_4r3_th3_c010n31_m33k}**
