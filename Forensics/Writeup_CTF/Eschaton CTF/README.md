# Eschaton CTF 
## Old School messaging
![image](https://hackmd.io/_uploads/SkKpMR6LWl.png)
### Những gì học được từ challenge
- protocol SMTP có thể chứa các Data Fragment chứa flag
- Sửa magic bytes để phục hồi img
- protocol SMTP dùng để gửi và chuyển tiếp các email
### Writeup chi tiết
Lúc đầu em tìm thấy mấy packet sài protocol lạ là smtp nên filter ra thử sau khi đi theo streams thì em tìm được 1 ảnh png được mã hóa bằng base64 
![image](https://hackmd.io/_uploads/rkTHrAa8Wl.png)
![image](https://hackmd.io/_uploads/H1kFrAaUWe.png)
Sau đó em sẽ dán đoạn base64 này lên cyberchef để decode bằng base64 
![image](https://hackmd.io/_uploads/ry9CHApIbe.png)
em thấy mấy phần byte đầu là magicbyte của PNG mà kh render img được nên em down về phần output em thấy byte đầu của ảnh png bị sửa thành 00 nên em sẽ sửa lại là 89 
![image](https://hackmd.io/_uploads/r1YHICpLWe.png)
Sau khi mở ảnh đã sửa hex thì em thu được 1 ảnh QR
![image](https://hackmd.io/_uploads/SyA2LCpIZg.png)
Sau khi quét QR thì em thu được flag là: 
**esch{c0mmunicat1on_d3c0d3d_th3_0ld_way}**
## Exfil
![image](https://hackmd.io/_uploads/BkhVvCTL-l.png)
### Những gì học được từ challenge 
-  lỗ hổng Unrestricted File Upload
-  đọc bash để decrypt dữ liệu bằng thuật toán xor 
### Writeup chi tiết 
Em vô phần protocol hierachy và lọc ra trường data
![image](https://hackmd.io/_uploads/H1aJd0pIWg.png)
thì em thấy có 1 packet sài method post
![image](https://hackmd.io/_uploads/HkemuCT8Wx.png)
em follow stream thì thu được 
![image](https://hackmd.io/_uploads/rkFJFA6UWl.png)
Sau khi tìm hiểu thì em thấy đây là một Web Shell đang được kẻ tấn công cố gắng tải lên máy chủ thông qua lỗ hổng Unrestricted File Upload
------WebKitFormBoundary...: Đây là chuỗi phân cách (boundary) dùng trong kiểu dữ liệu multipart/form-data. Nó cho biết đây là request được gửi từ trình duyệt (hoặc tool giả lập) để upload form
filename="avatar_update.php" thay vì upload một file ảnh (như .jpg, .png), người này đang upload một file có đuôi .php

Nội dung của đoạn code đó là: 
- Kiểm tra xem người dùng có gửi tham số 'cmd' lên không      lấy câu lệnh từ tham số 'cmd'
- Thực thi câu lệnh đó trực tiếp trên hệ điều hành của        server (OS Command)
In kết quả ra màn hình

Mục đích là để đạt được RCE (Remote Code Execution - Thực thi mã từ xa).

Sau khi kiểm tra tiếp trường Data thì em thu được các câu lệnh được thực hiện được thu lại thành packet theo giao thức tcp 

![image](https://hackmd.io/_uploads/Byx69ApU-l.png)

sau khi xem tiếp các lệnh được thực thi thì em thấy nó thực hiện 1 đoạn xor mã hóa nội dung `2e195405354a402366402a524734671f395a5a323e451e625d2c2507142b504a27064a` trong biến $Encrypt
![image](https://hackmd.io/_uploads/S14Ui0pUWg.png)
và em thấy nó cho key bằng biến $DEPLOY_TOKEN 
![image](https://hackmd.io/_uploads/SkchsCaU-e.png)
em tìm biến đó và thu được key là `Kj7mN2pQ9sR4vX8y`
![image](https://hackmd.io/_uploads/SJcy3AaU-e.png)
tiếp theo em sẽ lên cyberchef để decrypt xor 
Đầu tiên em sẽ thêm from hex để giải mã đoạn dữ liệu ban đầu 
![image](https://hackmd.io/_uploads/rJ1L20TIbg.png)
Sau đó em thêm xor và đoạn key tìm được lên thì thu được 
![image](https://hackmd.io/_uploads/HkGY20T8be.png)
cuối cùng flag là: **esch{x0r_3xf1l_fr0m_pwn3d_w3bsh3ll}**
## Retro Recall
![image](https://hackmd.io/_uploads/SyR3-yRIWg.png)
### Những gì học được từ challenge
- Cách giải mã đoạn dữ liệu được mã hóa bằng uuencode 
### Writeup chi tiết 
Khi down file thì em thấy có 1 web hiện này và kh có file nào tải về 
![image](https://hackmd.io/_uploads/BkzOb108Wx.png)
qua tìm hiểu thì em bt được đoạn này `MN@L!M G-(;1,S2%E<V-H>T0Q9%]Y,'5?57,S7T%N7S-M=6PT=#!R7T]R7V0S
*8S!M<#%L17)])
` là nội dung được mã hóa bằng Uuencode cần decrypt em có hỏi AI đoạn code để decrypt
![image](https://hackmd.io/_uploads/rkcYZJALbx.png)
sau cùng thì thu được
![image](https://hackmd.io/_uploads/rkqSW1A8-x.png)
kết quả thu được: **esch{D1d_y0u_Us3_An_3mul4t0r_Or_d3c0mp1lEr}**
## 
