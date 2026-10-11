# HTB
## RedTrails 
![image](https://hackmd.io/_uploads/rkNfw1_i-l.png)
### Những gì học được từ challenge 
- Persistence: Cắm backdoor duy trì quyền truy cập qua MOTD (Reverse Shell) và tệp SSH authorized_keys.
- Redis Exploitation: Lạm dụng lệnh CONFIG SET ép server ghi file thư viện độc hại (.so) xuống ổ cứng.
- Dùng IDA dịch ngược mã độc
### Writeup chi tiết 
![image](https://hackmd.io/_uploads/B1tqwSmibg.png)
Sau khi follow theo các packet thì em thấy ở stream 0 nó có thực hiện 1 lệnh wget tải 1 package khá lạ về 
![image](https://hackmd.io/_uploads/Sk7x5rQiZx.png)
Khi qua stream 1 thì em thấy 1 đoạn khá khả nghi thường thì padding '==' khi dữ liệu đc mã hóa bằng base64 sẽ để ở cuối nma cnay nó lại để ngược lên trên 
![image](https://hackmd.io/_uploads/r1US5SQjbx.png)
Em cóp đoạn mã này và vào cyberchef để decrypt bằng reverse và base64 thử thì em thu được 1 đoạn script bash
![image](https://hackmd.io/_uploads/ry5NoBmi-l.png)
Ở hàm đầu tiên thì em thấy nó gán từng phần của đoạn base64 vào từng biến xong echo các biến đó ra r decode, em decode thì thu được
![image](https://hackmd.io/_uploads/r1N6oSmsbx.png)
lệnh này ghi một payload bash reverse shell vào file `/etc/update-motd.d/00-header` Các tập lệnh MOTD (Message of the Day) được thực thi mỗi khi có người dùng đăng nhập vào hệ thống qua SSH hoặc terminal cục bộ để hiển thị thông báo chào mừng. Bằng cách đặt payload ở đây, tập lệnh đảm bảo rằng mỗi khi có quản trị viên đăng nhập, máy chủ sẽ âm thầm kết nối ngược lại với máy của kẻ tấn công (địa chỉ IP 10.10.0.200 ở cổng 1337) và cấp cho họ quyền điều khiển từ xa, em thấy ở hàm thứ 2 nó cũng làm y chang v nên em decode tiếp
![image](https://hackmd.io/_uploads/SJ8v3HQoZx.png)
Tiếp theo em thấy hàm này lấy một khóa SSH công khai (public key) do kẻ tấn công kiểm soát và chèn thêm vào cuối tệp `~/.ssh/authorized_keys` của người dùng hiện tại. Điều này cho phép kẻ tấn công đăng nhập vào tài khoản đó bất cứ lúc nào thông qua SSH mà không cần mật khẩu, chỉ cần sử dụng private key 
![image](https://hackmd.io/_uploads/HyKgpBXoZx.png)
từ đoạn trên thì em cũng thu được 1 phần của flag **HTB{r3d15_1n574nc35**
ngoài ra ở stream 0 thì em cũng có thấy mảnh flag thứ 2 ở gần cuối file 
![image](https://hackmd.io/_uploads/HkeS1Umobx.png)
**_c0uld_0p3n_n3w**
tiếp theo khi qua stream 2 thì em thấy 1 đoạn khá khả nghi
![image](https://hackmd.io/_uploads/H1TZeI7sWl.png)
![image](https://hackmd.io/_uploads/ryfmeLXjbx.png)
![image](https://hackmd.io/_uploads/SyqNxUmsWe.png)
Em thấy lệnh:
- `AUTH 1943567864`: Kẻ tấn công đăng nhập vào máy chủ Redis bằng mật khẩu 1943567864
- `CONFIG SET DIR /data` và `CONFIG SET dbfilename x10SPFHN.so`: Ép máy chủ nạn nhân lưu tập tin đồng bộ độc hại vừa tải về vào thư mục /data với cái tên x10SPFHN.so.
Sau đó em tiếp tục tìm trong các stream thì thấy 1 file có định dạng elf khá khả nghi 
![image](https://hackmd.io/_uploads/ByCEZ87jWg.png)
Sau khi lấy stream này ra thì em bắt đầu tìm offset của file elf và trích xuất file này ra
![image](https://hackmd.io/_uploads/BJM-ML7iWg.png)
Sau khi trích xuất thì em thu được 1 file thực thi
![image](https://hackmd.io/_uploads/HyONG8QoWx.png)
Tiếp theo em dùng IDA và mở file này lên em open subview -> strings thì thấy có 1 hàm tên khá lạ
![image](https://hackmd.io/_uploads/Bk6WDUmj-g.png)
Em decompile hàm này
![image](https://hackmd.io/_uploads/Hy54DLmiZx.png)
thì thu được code gốc là 
![image](https://hackmd.io/_uploads/B1UuDLQjWl.png)
![image](https://hackmd.io/_uploads/rkHFPImsWe.png)
Em thấy hàm aes_256_cbc được gọi nên em nghĩ nó mã hóa dưới dạng aes256cbc với key 32bytes là biến `src` còn IV 16bytes là biến `v28`, với lại ở streams thứ 2 em thấy có nhiều đoạn mã hex nma khi dùng cyberchef các đoạn này là những đoạn kh có nghĩa nên em nghĩ nó đã được mã hóa bằng aes này 
![image](https://hackmd.io/_uploads/HyTFu8msZg.png)
Em sẽ decrypt các đoạn hex này với key và IV tìm được ở trên 
![image](https://hackmd.io/_uploads/SJJIFLms-e.png)
Sau khi decrypt các đoạn đó thì em thu được flag thứ 3 là
**_un3xp3c73d_7r41l5!}**
Flag của bài này là: **HTB{r3d15_1n574nc35_c0uld_0p3n_n3w_un3xp3c73d_7r41l5!}**
## Fishy HTTP
![image](https://hackmd.io/_uploads/SJAW0LXsWg.png)
### Những gì học được từ challenge 
- **HTML Tag Encoding**: dùng để Ánh xạ các thẻ HTML (button, div...) sang mã Hex tương ứng
- **First-letter Steganography**: Dùng chữ cái đầu của các từ tiếng Anh ngẫu nhiên để giấu mã Base64
- **Junk Data**: Dùng thẻ `<li>` hoặc các từ ngẫu nhiên để làm nhiễu payload thực
- Dùng ILSpy để dịch ngược file exe 
### Writeup chi tiết
Sau khi đi qua các stream thì em thấy ở mỗi phần feedback mà server phản hồi nó sẽ đều có các ký tự như vầy và thường sẽ có các dấu bằng ở cuối, em thấy nó giống như mỗi chữ nó chỉ lấy 1 ký tự đầu sau đó sẽ thành 1 chuỗi kí tự được mã hóa 
![image](https://hackmd.io/_uploads/rybHAIQsZx.png)
Em thử lưu các stream này về và chỉ lấy đúng 1 ký tự đầu để decrypt thì thấy có 1 file chứa 1 phần của flag
![image](https://hackmd.io/_uploads/BkuM1PQoWl.png)
**h77P_s73417hy_revSHELL}**
Tiếp theo em sẽ phân tích file .exe sau khi ném vào ILSpy thì em thu được  script sau
![image](https://hackmd.io/_uploads/r1y70owiWx.png)
![image](https://hackmd.io/_uploads/HyIKRiPs-e.png)
![image](https://hackmd.io/_uploads/BkZ5Aiwsbe.png)
em để ý tới hàm decode data 
- Nó tìm các thẻ tag như `<button>, <div>, <span>...`
- Nó bỏ qua thẻ `<li>`

Với mỗi thẻ tìm được, nó tra bảng tagHex (ví dụ: button là 7, div là 8).

Ghép các số này lại thành chuỗi Hex và đổi ngược lại thành văn bản (ASCII).
Trong wireshark em cũng thấy các stream chứa html như sau 
![image](https://hackmd.io/_uploads/rk1Hx3Dsbe.png)
Sau đó em viết script để decode các đoạn này
![image](https://hackmd.io/_uploads/B1I-ZnDsWx.png)
Sau khi decrypt các stream ccó chưá html thì em thu được
![image](https://hackmd.io/_uploads/SyYpbnPoZl.png)
flag: **HTB{Th4ts_d07n37_h77P_s73417hy_revSHELL}**
## TrueSecrets 
![image](https://hackmd.io/_uploads/rkza7cvjWl.png)
### Những gì học được từ challenge 
- Sử dụng `tcplay`: dùng `tcplay` để mở các container mã hóa
- plugin `truecryptmaster` : Trích xuất các Master Keys  và các thông số kỹ thuật của ổ đĩa 
- plugin `truecryptpassphrase` : Tìm kiếm mật khẩu (passphrase) dưới dạng văn bản thuần trong file mem 
- plugin `truecryptsummary`: xem TrueCrypt có đang chạy hay không, liệt kê các tiến trình liên quan
### Writeup chi tiết
Vì ở Description của bài này em thấy nó cung cấp file memory capture nên em sẽ sử dụng volatility để phân tích, đầu tiên em sẽ dùng plugin `imageìnfo` để xd profile của file mem này 
![image](https://hackmd.io/_uploads/H1MaN9Pibx.png)
Đầu tiên em sẽ chạy plugin `cmdline` để xác định các process đã được thực thi thì em thấy nó chạy 2 process khá khả nghi là TrueCrypt.exe và 7zFM.exe 
![image](https://hackmd.io/_uploads/HyR0H5Psbx.png)
process thứ 2 em thấy nó tác động lên 1 file backup_development.zip nên em sử dụng plugin `filescan` để tìm offsset của nó thì thu được
![image](https://hackmd.io/_uploads/H139U5DiZx.png)
h em sẽ dump nó ra bằng plugin `dumpfiles` 
![image](https://hackmd.io/_uploads/S1HZvcwibl.png)
Sau khi dump ra và giải nén thì em có được file development.tc 
![image](https://hackmd.io/_uploads/rkPHDqDj-x.png)
Vì nãy em thấy ở plugin `cmdline` nó có chạy TrueCrypt nên em nghĩ file development.tc này là một tệp tin chứa ổ đĩa ảo được mã hóa bằng phần mềm đó, mà muốn phân tích được file này thì phải có passphrase nên em sẽ sử dụng plugin `truecryptpassphrase` để tìm passphrase của nó trong file mem này thì thu được 
![image](https://hackmd.io/_uploads/B1nhK5Psbg.png)
tiếp theo em sẽ tạo ổ đĩa ảo và gắn tệp tin này vào
![image](https://hackmd.io/_uploads/By0VqcPjWg.png)
sau đó em sẽ sử dụng `tcplay` để phân tích và sử dụng passphrase thu được hồi nãy để giải mã file ổ đĩa TrueCrypt này
![image](https://hackmd.io/_uploads/S1hIp9wobl.png)
tiếp theo em sẽ mount nó
![image](https://hackmd.io/_uploads/BJl2TqwiWe.png)
sau khi mount thì em thấy có 1 file .cs 
![image](https://hackmd.io/_uploads/S1ZVCqDj-x.png)
![image](https://hackmd.io/_uploads/H1E80cvobl.png)
Vì em thấy có hàm DESCryptoServiceProvider cùng với key và iv nên em nghĩ script này sẽ mã hóa 1 file nào đó bằng DES với key và iv tương tự như trong ảnh, em tìm trong thư mục sessions thì thấy có các file được mã hóa 
![image](https://hackmd.io/_uploads/ByQ0AqviZx.png)
Em sẽ cp các file này ra và decrypt 
![image](https://hackmd.io/_uploads/ByZMyswsZg.png)
đầu tiên thì em thấy ndung file nó giống với các đoạn mã base64 nên em sẽ decrypt bằng base64 trc
![image](https://hackmd.io/_uploads/BkdCyovsZl.png)
Sau khi decrypt file 1 và file 2 thì em thấy kh có gì 
![image](https://hackmd.io/_uploads/HyDreswoZg.png)
đến file cuối cùng thì em thấy flag 
![image](https://hackmd.io/_uploads/S1lKxivoZl.png)
flag: **HTB{570r1ng_53cr37_1n_m3m0ry_15_n07_g00d}**
# Texsaw 2026
## layers
### Những gì học được từ challenge
- Artifact ADS
- Recover file, Search for lost data, mount bằng disk drill
### Writeup chi tiết
Khi giải nén thì em thấy có 3 file 
![image](https://hackmd.io/_uploads/Syz7Unvo-x.png)
khi giải nén layer 1 thì em thấy có 1 file disk drill image 
![image](https://hackmd.io/_uploads/SyJwL3PoWe.png)
Em sẽ phân tích file này bằng disk drill, sau khi em search for lost data bằng disk drill thì em thấy có 1 file này chưá password 
![image](https://hackmd.io/_uploads/Bkmew2Ps-l.png)
Em dùng passwd đó và giải nén layer 2 thì thu được file này
![image](https://hackmd.io/_uploads/SkOEvnDjZx.png)
Sau đó em sử dụng tiếp disk drill để phân tích tiếp thì thấy sau khi attach nó mount thẳng về ổ D của em
![image](https://hackmd.io/_uploads/S1AKwhPjbl.png)
Em kiểm tra các file thì em thấy kh có gì liên quan, em nhớ tới artifact ADS của Windows nên em kiểm tra thử thì thấy ở 1 file report.txt có 1 streams khác có tên secret.bin
![image](https://hackmd.io/_uploads/rk-xunwoWl.png)
Sau đó em đọc ndung của streams này thì thấy nó là 1 đoạn base64
![image](https://hackmd.io/_uploads/ByR8_hwjWx.png)
Sau khi decode thì em thu được password của layer 3 
![image](https://hackmd.io/_uploads/S1NYd3PiZg.png)
Sau khi giải nén thì em thu được file này
![image](https://hackmd.io/_uploads/Sy2sO3PiWg.png)
Em mở disk drill và tiếp tục phân tích file này thì thấy file flag.txt nó kh có gì nma còn 2 file gz 
![image](https://hackmd.io/_uploads/r18lF2Psbl.png)
Em recover lại file và giải nén thì thu được flag 
![image](https://hackmd.io/_uploads/rkqVFhPjWx.png)
**texsaw{m@try02HkA_d0!12}**
## Journaling 
### Những gì học được từ challenge
- Dựng timeline trong autopsy 
### Writeup chi tiết
Đầu tiên em thấy tên bài nó gợi ý về file Journaling mà các file này nằm ở `$UrnJrnl` và xuất ra datastream `$J` của nó
![image](https://hackmd.io/_uploads/By3f3CPsWe.png)
Sau đó em sẽ dùng MFTECmd để phân tích file này 
![image](https://hackmd.io/_uploads/SJlblJ_iZe.png)
tiếp theo em sẽ mở file phân tích đc bằng Timelineexplorer thì thấy 
![image](https://hackmd.io/_uploads/SkOmz1dsWe.png)
Tiếp theo em sẽ dựng timeline trong autopsy
![image](https://hackmd.io/_uploads/rksoE1us-x.png)
và em thấy trong file `$J` sẽ có 3 segment laf  **u5njOurn@l,unc0v3rs,f1les**
![image](https://hackmd.io/_uploads/r1LUH1_jbx.png)
em kéo xuống thì thấy có thêm 1 segment nữa là **3fd19982505363d0** 
![image](https://hackmd.io/_uploads/H1-jHJdjZg.png)
Em kh bt tìm ở đâu segment thứ 4 nên em filter strings flagsegment và thu được cái cuối cùng là **4lter3d**
![image](https://hackmd.io/_uploads/H1Lb8kOsbg.png)
flag là: **texsaw{u5njOurn@l_unc0v3rs_f1les_4lter3d_3fd19982505363d0}**
## Different Side Channel
Trong các thiết bị phần cứng, năng lượng tiêu thụ tại một thời điểm thường tỉ lệ thuận với số lượng bit "1" được xử lý (gọi là Hamming Weight - HW).Điểm yếu nhất của AES thường nằm ở vòng đầu tiên (Round 1), cụ thể là tại đầu ra của tầng S-Box. Công thức tính giá trị trung gian này là:

$$V = \text{SBox}(P \oplus K)$$

Trong đó:
$P$: Byte Plaintext.
$K$: Byte Key dự đoán (0-255).
$V$: Giá trị trung gian rò rỉ năng lượng.
tính toán tương quan cho từng byte trong 16 byte của khóa: Sử dụng hệ số Pearson Correlation để so sánh dãy năng lượng giả định với dãy năng lượng thực tế.
![image](https://hackmd.io/_uploads/SJ80d0Ds-l.png)
![image](https://hackmd.io/_uploads/H1LkY0vjWe.png)
![image](https://hackmd.io/_uploads/By2mFCDo-l.png)
![image](https://hackmd.io/_uploads/r1SbFRPobx.png)
kết quả thu được là: 
![image](https://hackmd.io/_uploads/HJgLFCDobe.png)
tiếp theo sẽ xác định chế độ mã hóa AES
- Vì file encrypted_flag.bin không cho biết chế độ mã hóa,  ta cần thử các chế độ phổ biến: ECB, CBC, CTR.
- Với chế độ AES-CBC, sử dụng 16 byte đầu của file làm IV (Initialization Vector) và phần còn lại làm ciphertext, ta thu được chuỗi có nghĩa.

![image](https://hackmd.io/_uploads/BylBjKAvj-x.png)
Script sau khi chạy
![image](https://hackmd.io/_uploads/Skwf50wi-g.png)
**texsaw{d1ffer3nti&!_p0w3r_@n4!y51s}**
