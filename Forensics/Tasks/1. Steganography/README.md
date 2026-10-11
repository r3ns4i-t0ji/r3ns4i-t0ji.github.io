# Task 1: Steganography
# File type và magic bytes
 - Magic byte là một chuỗi byte cố định xuất hiện ở đầu file 
##  File Type và magic bytes của file ảnh:
 - PNG: 89 50 4E 47 0D 0A 1A 0A
 - JPEG: FF D8 FF
 - GIF: 47 49 46 38
## File Type và magic bytes của file âm thanh:
 - MP3: 
 - nếu có metadata: 49 44 33 (ID3)
 + nếu không có metadata: FF FB hoặc FF F3, FF F2 (FF)
 - WAV: vị trí 1-4: 52 49 46 46 (RIFF),vị trí 5-8: 4 byte file size,9-12: 4 byte format 57 41 56 45 (WAVE)
 - FLAC: 66 4C 61 43 (fLaC)
## File Type và magic bytes của file nén: 
- Zip: 50 4B 03 04 hoặc 50 4B 05 06 hoặc 50 4B 07 08
- 7z: 37 7A BC AF 27 1C
- Gunzip: 1F 8B 08
## Cách nhận biết File type:
 + Dựa vào phần mở rộng: .jpg,.png,.wav.....
 + Dựa vào magic bytes(header) trong hexdump: 
 + VD:
   PNG 89 50 4E 47 0D 0A 1A 0A
 Zip: 50 4B 03 04
 + Nếu là file data bị corrupt xem magic bytes (header) các file  gần giống --> thử chỉnh sửa
# Cấu trúc của file PNG:
- (https://birdcomesfirst.wordpress.com/2020/11/25/learn-forensic-day5-ngam-cuu-ve-dinh-dang-png-theo-tai-lieu-cua-png-dev-group-3/) em có đọc qua link này
## Phần mở đầu (signature) 8 byte đầu của mọi file PNG luôn là: 
 - 137 80 78 71 13 10 26 10(dec) 
 - 89 50 4E 47 0D 0A 1A 0A(hex)
) - LF (
) (13 10/0D 0A): (Carriage Return - Line Feed, các kí tự điều khiển đánh dấu ngắt dòng tệp văn bản) giúp nhận diện lỗi truyền kém(bad transfer) làm thay đổi trình tự dòng, kí tự "ctrl-Z" (26/1A) để ngưng hiển thị tệp trong MS-DOS, Cuối cùng là kí tự LF (
)(0A) nữa để kiếm tra quá trình dịch CR-LF có bị đảo ngược hay không. 
##  Khối dữ liệu (chunk): 
### Cấu trúc chunk(gồm 4 phần)
 + Length: 4 byte cho biết số byte dữ liệu trong chunk data (không được vượt quá 2^31-1)
+ Chunk Type: 4 byte, là tên loại chunk (chỉ dùng chữ cái A-Z hoặc a-z) (IHDR,IDAT,IEND,...) 
 + Chunk Data: nội dung dữ liệu của chunk (có thể rỗng)
 + CRC (Checksum): 4 byte để kiếm tra dữ liệu có bị lỗi hay không
 - Các chunk có thể xuất hiện theo nhiều thứ tự nhưng IHDR phải đứng đầu và IEND phải đứng cuối
###  Tên chunk gồm 4 chữ cái, chữ hoa/thường của từng ký tự mang ý nghĩa đặc biệt:
  - Chữ cái đầu:
 +Chữ hoa là critical(quan trọng, bắt buộc để hiển thị ảnh)
 +Chữ thường là ancillary(phụ trợ, có thể bỏ qua)
  - Chữ cái thứ hai:
 +Chữ hoa là public(chuẩn PNG)
 +Chữ thường là private(do ứng dụng tự định nghĩa)
  - Chữ cái thứ ba:
 +Bắt buộc là chữ hoa
  - Chữ cái thứ tư:
 +Chữ hoa: unsafe to copy (không an toàn để copy nếu không hiểu chunk)
 +Chữ thường: safe to copy (có thể copy ngay cả khi không hiểu chunk)

# Thư viện PIL (Pillow) và Thư viện OpenCV trong python
- Thư viện PIL là thư viện xử lý ảnh cơ bản, hỗ trợ nhiều định dạng tập tin giúp tăng cường độ sáng hình ảnh, làm mờ ảnh, trích xuất văn bản từ ảnh và nhiều thao tác khác…
- Thư viện OpenCV (Open Source Computer Vision Library) là một thư viện mã nguồn mở chuyên về xử lý ảnh và thị giác máy tính, được dùng cực kỳ rộng rãi trong AI, robotics, nhận diện khuôn mặt, phân tích video, xe tự lái…
- em có xem qua video này: https://www.youtube.com/watch?v=5QR-dG68eNE&t=2299s và tham khảo link anh Duy gửi ạ: https://birdcomesfirst.wordpress.com/2020/12/01/learn-forensic-day-kien-thuc-de-code-script1/
 2 cái này giúp em hiểu các hàm cơ bản trong thư viện Pillow để áp dụng
## bài tập 1a: Viết script ghi tất cả giá trị pixel của một file ảnh bất kỳ vào một file

![image](https://hackmd.io/_uploads/SJAhe-nE-x.png)

 + đầu tiên em sẽ mở file ảnh cần lưu pixel và chuyển ảnh sang mode RGB, gán vào biến img
 + sau đó em sẽ tải dữ liệu pixel của ảnh bằng hàm load()
 + tiếp theo em sẽ lấy giá trị width và height của ảnh = hàm size
 + sau đó em sẽ mở file đầu ra cần lưu giá trị pixel ở mode write 
 + dòng đầu tiên em sẽ ghi lại giá trị độ rộng và độ cao của ảnh
 + em sẽ dùng vòng lặp đi qua từng vị trí ở tọa độ(x,y) trong ảnh và gán giá trị r,g,b cho từng dữ liệu pixel tại tọa độ(x,y)
 + cuối cùng em sẽ ghi lại các giá trị r,g,b của file ảnh thành từng dòng
 +  vd: ảnh này

![image](https://hackmd.io/_uploads/SyTxlbnVWx.png)

- gán 2 giá trị cần thiết cho hàm

![image](https://hackmd.io/_uploads/Sk_y-b3VWe.png)

- kết quả là:

![image](https://hackmd.io/_uploads/H11XWbnE-e.png)


## bài tập 1b: ngược lại, trích xuất pixel từ file thành 1 ảnh

![image](https://hackmd.io/_uploads/H1qwkXRVWx.png)


  - đầu tiên em sẽ mở file text hồi nãy mở mode read để đọc 2 giá trị width và height của ảnh và gán vào giá trị do_rong và do_cao
 + sau đó em sẽ tạo 1 list pixel
 + dùng vòng lặp đi qua từng dòng trong text hồi nãy gán lần lượt 3 giá trị vào biến r,g,b
 + thêm lần lượt 3 giá trị r,g,b vào list
 + tiếp theo em sẽ tạo ảnh bằng hàm Image.new ở mode RGB và size từ 2 biến do_rong và do_cao sau đó em sẽ dùng hàm putdata để ghi từng giá trị r,g,b vào file ảnh
 + và cuối cùng là lưu ảnh ở file đầu ra thêm phần extension là .png

![image](https://hackmd.io/_uploads/Sy4UQZnNWg.png)

- kết quả ta thu được ảnh ban đầu

![image](https://hackmd.io/_uploads/ByUHU1pNZg.png)

## bài tập 2a: viết script giấu 1 đoạn text vào 1 file ảnh bằng kỹ thuật LSB
- em có xem qua video này để làm bài tập 2: https://www.youtube.com/watch?v=fGI4VhnrGAQ

![image](https://hackmd.io/_uploads/rkw5LSREWe.png)


![image](https://hackmd.io/_uploads/Bybyvr0Ebg.png)

 - đầu tiên em sẽ mở ảnh và chuyển sang mode RGB, gán vào biến img
 - tiếp theo nhập đoạn text cần giấu và gán vào biến text, đánh dấu kết thúc chuỗi = hàm chr(0)
 - tiếp theo em sẽ tải dữ liệu pixel của ảnh bằng hàm load(), gán giá trị width,height của ảnh vào biến do_rong,do_cao bằng hàm size , cho biến data_index=0
 - tiếp theo em se chuyển đoạn text vừa nhập thành mã nhị phân bằng cách là chuyển từng ký tự đó thành mã số nguyên Unicode, sau đó em dùng hàm format để chuyển về mã nhị phân 8bit = '08b' (số 08 là nếu độ dài không đủ 8 chữ số thì sẽ thêm số 0 vào đầu cho đủ 8 còn b là chuyển thành nhị phân)gán giá trị độ dài của đoạn text ở dạng nhị phân vào biến data_length sau đó em sẽ dùng vòng lặp đi qua từng tọa độ (x,y) trong ảnh bước đầu là gán giá trị pixel theo mode rgb tại tọa độ(x,y) vào 3 biến r,g,b sau đó em sẽ chuyển lần lượt các giá trị của biến r,g,b thành mã nhị phân 
 - tiếp theo em sẽ xét nếu mà độ dài của đoạn text ở dạng nhị phân lớn hơn giá trị (ban đầu = 0) (còn dữ liệu để giấu) thì em sẽ lấy dữ liệu nhị phân của biến r bỏ đi bit cuối cùng và thêm vào bit với chỉ số [data_index] của biến binary(mã nhị phân chứa dữ liệu cần giấu) sau đó em tăng biến data_index+=1  rồi lần lượt gán các giá trị tương đương với chỉ số [data_index] của biến binary vào các kênh màu theo thứ tự lần lượt là r,g,b mỗi lần lặp(có thể giấu ở bit cuối 1 kênh màu th cũng được nhưng ở đây em giấu ở bit cuối của 3 kênh màu) cho đến khi biến data_length=data_index[giấu xong dữ liệu r cuối cùng là gán lại từng giá trị r,g,b ở tọa độ(x,y) (đã giấu text bằng kỹ thuật LSB và chuyển lại thành số ở dạng thập phân bình thường) vào biến pixel ở tọa độ (x,y) ban đầu, sau đó lưu lại hình có chứa đaonj text đã giấu bằng hàm save]
 - cuối cùng là gán các giá trị r,g,b không ẩn dữ liệu vào pixel có tọa độ (x,y) ban đầu, rồi lưu lại ảnh thôi
 VD: ảnh này

![image](https://hackmd.io/_uploads/B10P3m0VZe.png)

 chạy code 

![image](https://hackmd.io/_uploads/rkw_nQRVbl.png)

 kết quả thu được

![image](https://hackmd.io/_uploads/BkSc2mRVZl.png)

## bài tập 2b: viết script xem đoạn text đã giấu bằng kỹ thuật LSB

![image](https://hackmd.io/_uploads/B1LYiU0VWl.png)

 - đầu tiên em sẽ mở ảnh đã giấu text và chuyển sang mode RGB, gán vào biến img sau đó tải dữ liệu pixel bằng hàm load(), gán giá trị width,height của ảnh vào biến do_rong,do_cao=hàm size
 - tạo 1 chuỗi trống và gán vào biến binary sau đó em sẽ chạy vòng lặp tại từng tọa độ(x,y) của ảnh gán giá trị pixel theo rgb tại tọa độ (x,y) vào biến r,g,b
 - tiếp theo em sẽ chuyển từng biến r,g,b thành định dạng mã nhị phân 8bit bằng hàm format và lấy ra bit cuối cùng của từng biến + vào chuỗi binary
 - tiếp theo em sẽ tạo biến text để xíu lưu các byte đã chuyển thành ascii vào đây sau đó em sẽ dùng vòng lặp duyệt qua từng byte với bước nhảy là 8 (do 1 byte=8bit) 
 - tiếp theo em cắt ra thành từng byte(8bit) sau đó chuyển nó về dạng thập phân xong chuyển nó về ký tự ascii bằng hàm chr và gán vào biến char
 - vì nãy trong phần code hide text em có đánh dấu phần kết thúc của text cần giấu là chr(0) nên khi gặp phần kết thúc thì em sẽ dừng lại
 - cuối cùng là gộp lại từng ký tự bằng vào biến text thôi
 thử code

![image](https://hackmd.io/_uploads/H1KdeHC4-e.png)

 VD(ảnh đã hide ở bt2a):
 kết quả là

![image](https://hackmd.io/_uploads/HkCxbH0Ebe.png)

# Các loại mã hóa
## Các loại Base 
 ### Base16 (hexadecimal): biểu diễn mỗi byte bằng 2 ký tự hex(0-9,A-F) 
 - Ví dụ byte 128 dạng thập phân được biểu diễn là 80 dạng hex ,250 dạng thập phân được biểu diễn là  FA dạng hex
 ### Base64: Chia dữ liệu thành 3 byte(24bit), biểu diễn bằng 4 kí tự ASCII(A-Z,a-z,0-9,+,/)  
- Ví dụ: S0NTQw== (KCSC)
 ### Base85: Biểu diễn 4 byte dữ liệu bằng 5 ký tự ASCII
 - Ví dụ: 91)WF (KCSC)
## Các loại mật mã 
link em tham khảo : https://tailieusinhvien.net/bai-giang-nhap-mon-an-toan-thong-tin-chuong-2-phan-1-ma-hoa-tran-thi-kim-chi-1746/
### RSA (Mã hóa bất đối xứng) 
dùng cặp khóa gồm: 
 + khóa công khai(publickey): để mã hóa
 + khóa riêng tư(privatekey): để giải mã
 + Ứng dụng: Trao đổi khóa an toàn, chữ ký số, xác thực danh tính, mã hóa email. Do chi phí tính toán cao, RSA ít dùng để mã hóa dữ liệu lớn trực tiếp
 + bảo mật: mạnh với độ dài khóa lớn(2048bit)
 + Tốc độ: Chậm do RSA sử dụng số nguyên tố rất lớn, đòi hỏi nhiều tài nguyên
 
### AES (đối xứng) 
- Mã hóa khối (block cipher) với kích thước khối 128 bit; hỗ trợ độ dài khóa 128/192/256 bit. Dùng cùng một khóa để mã hóa và giải mã nhanh, phù hợp cho dữ liệu lớn và thời gian thực
 - Ứng dụng: Mã hóa dữ liệu lưu trữ (disk, database), bảo mật truyền thông (TLS), và phần cứng (TPM, HSM). Do tốc độ cao, AES thường là “động cơ” mã hóa chính trong hệ thống
- Ví dụ: em có xem qua video ngắn này để hiểu hơn về AES https://www.youtube.com/watch?v=S6zlQXj35rI
 ### Câu hỏi: Mỗi 1 loại mã hoá nếu được mã hoá hoặc giải mã ở mỗi ngôn ngữ lập trình có khác gì nhau không?
 - Giống nhau: kết quả giải mã đều phải giống nhau nếu dùng cùng thuật toán, khóa,...
 - Khác nhau: 
 - Các thư viện hỗ trợ, Kiểu dữ liệu,...
 - Cách mã hóa: Có thể trả về raw bytes hoặc base64 / hex,.../
# Các công cụ:
##  Hex editor: Xem và chỉnh sửa dữ liệu thô của file ở dạng hex
 ### VD: challenge Corrupt file(picoCTF)

![image](https://hackmd.io/_uploads/HycSmk24-x.png)


 khi check = file thì file này chỉ là file data 

![image](https://hackmd.io/_uploads/BkzcQknVbg.png)

 - nhưng khi dùng hexedit để xem dữ liệu thô thì phần sau dữ liệu có JFIF khá giống với cấu trúc dữ liệu của 1 file ảnh jpeg nhưng phần magic bytes (3bytes đầu) đã bị thay đổi làm cho file này kh phải là file ảnh thông thường nên em sẽ chỉnh sửa phần magic bytes về đúng với magic bytes của nó là FF D8 FF ở 3 bytes đầu ![image](https://hackmd.io/_uploads/ryIqE1hE-l.png)khi dùng file check lại thì đây đã là file ảnh jpeg, h thì chỉ cần chuyển phần extension thành .jpg và mở file thôi.Kết quả thu được là

![image](https://hackmd.io/_uploads/Skf-rJn4bl.png)

 1 hình ảnh có chứa flag bên trong
 
##  Binwalk: phân tích firmware/binary, tìm dữ liệu nhúng
 ### VD: challenge hideme (picoCTF)
 khi mở ảnh thì đây chỉ là 1 ảnh bình thường

![image](https://hackmd.io/_uploads/r1W-K1hEbg.png)

 khi dùng binwalk ta thầy có 1 file zip được nhúng trong file ảnh png đó

![image](https://hackmd.io/_uploads/S1Ajdk2N-e.png)

 h thì trích xuất file đó ra thôi

![image](https://hackmd.io/_uploads/SyCVtk34bg.png)

 ta thu được 1 dir secret 

![image](https://hackmd.io/_uploads/HJZ_tynVWg.png)

 khi vào thì có 1 file flag.png khác và khi mở lên thì đây chính là ảnh chứa flag

![image](https://hackmd.io/_uploads/ByGoKkhNbe.png)

##  Steghide: giấu/giải mã dữ liệu trong ảnh (JPEG,BMP) hoặc âm thanh (WAV,AU)
 ### VD:challenge Hidden in plainsight
 khi down file về ta được 1 file ảnh như vầy

![image](https://hackmd.io/_uploads/SJVAhl3EZe.png)

 khi dùng exiftool để xem metadata của file thì ta thấy có chuỗi khả nghi

![image](https://hackmd.io/_uploads/B12l6l2Ebx.png)

 sau khi decode thì ta thu được

![image](https://hackmd.io/_uploads/r1HLpxnV-e.png)

 decode thêm 1 lần nữa chuỗi base64,ta được password của steghide

![image](https://hackmd.io/_uploads/Hk1t6x2EWx.png)

 h thì trích xuất ra bằng steghide và password là:pAzzword thôi 

![image](https://hackmd.io/_uploads/r1A0pl3VWg.png)

 Sau đó ta sẽ thu được 1 file flag.txt trong đó có chứa flag

![image](https://hackmd.io/_uploads/HJBbRg3Vbe.png)

## Stegsolve: phân tích ảnh theo bit-plane, màu, lớp
 ### VD: chall Easy Stego (Tenable CTF)
 ta có 1 hình ảnh này 

![image](https://hackmd.io/_uploads/SJa-VJTNbx.png)

 h thì dùng stegsolve để xem từng bitplane th

![image](https://hackmd.io/_uploads/SJP9Sya4-x.png)

 cuối cùng ta thu được các hình ảnh ở các kênh màu khác nhau có chứa flag ẩn

![image](https://hackmd.io/_uploads/SJaHBJTE-l.png)


![image](https://hackmd.io/_uploads/Hyb08r16E-x.png)


![image](https://hackmd.io/_uploads/SyxOSJTVbe.png)

## foremost: khôi phục file dựa trên header
 ### VD: challenge like1000(picoCTF)
 đây là 1 challenge chứa file nén tar nếu ta chỉ giải nén thông thường thì nó sẽ chỉ ra các file tar khác và nếu giải nén đến file tar cuối cùng thì nó sẽ ra nhưng nó khá lâu

![image](https://hackmd.io/_uploads/rJ9SoknNZx.png)

 ta sẽ sử dụng foremost lệnh này sẽ khôi phục dữ liệu bị nhúng trong file đó

![image](https://hackmd.io/_uploads/HymF2k3VZe.png)


![image](https://hackmd.io/_uploads/BJYqhJ2NZx.png)

 cuối cùng chúng ta sẽ thu được 1 ảnh png chứa flag

![image](https://hackmd.io/_uploads/BklTh1h4Ze.png)

## gimp: phần mềm chỉnh sửa ảnh
### VD: crop ảnh bằng gimp

![image](https://hackmd.io/_uploads/r1KdRT34Ze.png)

 chọn vùng cần crop

![image](https://hackmd.io/_uploads/HkC2RahV-g.png)

 crop to selection

![image](https://hackmd.io/_uploads/Skak1C34-e.png)

 và ta được 1 ảnh cần crop 

![image](https://hackmd.io/_uploads/ryqGk03VWx.png)

## ImageMagicK: Bộ công cụ dòng lệnh xử lý ảnh (convert,réize,...)
### Ví dụ: tách từng kênh màu bằng magick
 Ta có hình ảnh

![image](https://hackmd.io/_uploads/H1VrzR3EWx.png)

 Ta có thể tách từng kênh màu bằng lệnh

![image](https://hackmd.io/_uploads/S1EizAnNbg.png)

 kết quả thu được,channel 0 tương ứng với red, 1 tương ứng với Blue và 2 tương  ứng với green

![image](https://hackmd.io/_uploads/By1azAnNWg.png)

channel-0

![image](https://hackmd.io/_uploads/rk1QQC2N-l.png)

channel-1

![image](https://hackmd.io/_uploads/HkQ8QCnVZg.png)

channel-2

![image](https://hackmd.io/_uploads/r1Uum0hVbx.png)

### Ví dụ: tăng độ tương phản bằng lệnh

![image](https://hackmd.io/_uploads/ByJfER3N-l.png)

 kết quả thu được

![image](https://hackmd.io/_uploads/ryzHV024Wl.png)

##  pngcheck: kiểm tra tính hợp lệ của file png, liệt kê chunk
### Ví dụ: 1 file có định dạng khác nhưng lại để extension là png thì khi sd pngcheck nó sẽ báo lỗi

![image](https://hackmd.io/_uploads/rkrSLAnVZl.png)

 nếu là file png thật nó sẽ báo như sau

![image](https://hackmd.io/_uploads/SkhxDA2V-x.png)

 có thể hiển thị chunk của 1 file png = cách thêm tag -v(có thể có các chunk lạ chính là dấu hiệu)

![image](https://hackmd.io/_uploads/S1XSdA2E-l.png)


##  Sonic visualiser: phân tích và trực quan hóa file âm thanh
### Ví dụ: chúng ta có thể trích xuất flag thông qua quang phổ của 1 file âm thanh bằng cách pane-->add spectrogram--> all channels mixed

![image](https://hackmd.io/_uploads/H1Bu50hVbl.png)

 ta được kết quả là 

![image](https://hackmd.io/_uploads/BJdFiR24bx.png)

##  sstv: giãi mã ảnh thành từ tín hiệu âm thanh truyền qua radio
### VD: challenge m00nwalk 
 challenge này sẽ cho ta 1 file âm thanh ta có thể nghe được tiếng rè/beep rất có thể có file ảnh được giấu

![image](https://hackmd.io/_uploads/Sy8DRJnE-e.png)

 nên ta sẽ dùng sstv để trích xuất

![image](https://hackmd.io/_uploads/B1Ljkx3Nbe.png)

 kết quả ta sẽ thu được 1 file png chứa flag

![image](https://hackmd.io/_uploads/SJbZll3E-g.png)

## zsteg: phát hiện dữ liệu ẩn trong png/bmp bằng kỹ thuật lsb
### VD: challenge St3g0 (picoCTF)
 khi nhìn vào thì đây chỉ là ảnh thông thường

![image](https://hackmd.io/_uploads/B1c6ry3Nbg.png)

 nhưng khi dùng zsteg để trích xuất lsb của file này thì ta thu được kết quả

![image](https://hackmd.io/_uploads/Skw-L1nNbg.png)

 có đoạn text ẩn khi zsteg lấy LSB R,G,B của ảnh 
# bài CTF:
- bài này gần giống với bài tunn3l v1s10n trong picoCTF em từng solve(dạng này thì sẽ sửa hex của file) (nma do em kh viết writeup nên em kh nhớ tới hướng này mà đi sang mấy hướng khác)
ảnh đề cho là: 

![image](https://hackmd.io/_uploads/H1EbyLRN-e.png)

 đầu tiên em sẽ kiểm tra metadata của ảnh bằng exiftool

![image](https://hackmd.io/_uploads/r1smJ80N-g.png)

 em biết được 2 chỉ số width và height của ảnh là 1280 và 776

 sau đó em có đọc qua web này https://en.wikipedia.org/wiki/JPEG
 và có được bảng này

![image](https://hackmd.io/_uploads/rkWcJIA4Wx.png)

 em để ý tới Bytes FF C0 chính là marker chứa các variable size của ảnh nên em mở hexedit và tìm tới 2 byte FF C0

![image](https://hackmd.io/_uploads/Sy4De8RE-l.png)

 và em có được dòng này 

![image](https://hackmd.io/_uploads/SkIYlIRVbl.png)

 em thấy sau FF C0 là các byte có chứa byte về width và height của img nên em dùng python để xem hex của chỉ số width và height là gì, nãy khi xem metadata em bt đc chỉ số width là 1280 và height là 776 nên em bt được các byte width là 05 00 và các byte height là 03 08

![image](https://hackmd.io/_uploads/ryQd-UCE-e.png)

 em thấy có các byte nối tiếp là 03 08 và 05 00 trong hexedit nên em thử sửa width lên 1400 và height lên 900 bằng cách em dùng python và xem hex của 2 chỉ số này và em thu được 

![image](https://hackmd.io/_uploads/ryD4GIR4We.png)

 h em thử sửa hex trong hex edit là 05 78 và 03 84 

![image](https://hackmd.io/_uploads/BJE0f8RVbg.png)

 khi em mở ảnh thì em thấy có đoạn text nma nó bị bóp rộng ra theo width nên em nghĩ em kh cần thay đổi width

![image](https://hackmd.io/_uploads/ryWBXLA4bx.png)

 em thử sửa lại width về ban đầu và giữ nguyên height

![image](https://hackmd.io/_uploads/S16dXLAEbx.png)

 thì em thu được ảnh có chứa flag sau 

![image](https://hackmd.io/_uploads/rJ3omI04-l.png)
