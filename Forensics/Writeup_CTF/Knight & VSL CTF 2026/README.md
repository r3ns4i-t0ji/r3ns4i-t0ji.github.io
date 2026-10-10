
# Challenge Reconnaissance 
![image](https://hackmd.io/_uploads/Sk-41Rx8Zx.png)
## Những gì học được từ challenge
- challenge này giúp em hiểu hơn về quy trình kết nối của attacker tới target
- phát hiện được lưu lượng truy cập bất thường để lần theo và tìm được port mà attacker kết nối với target 
## Writeup chi tiết 
đầu tiên em mở wireshark ra để ktra file pcap  
![image](https://hackmd.io/_uploads/B1ORyRlIWl.png)
tiếp theo em mở phần conversation lên để ktra thì em thấy có tới 132,433 packet được gửi và nhận từ 2 địa chỉ mac trong ảnh, em đọc đề thì em nghi ngờ 2 địa chỉ mac này là của attacker và target
![image](https://hackmd.io/_uploads/ryile0xL-g.png)
Sau đó em tìm hiểu thì biết được đề kết nối với server của target thì attacker phải đi qua quá trình tcp 3-way handshakes 
![image](https://hackmd.io/_uploads/rkYhgCgIZe.png)
tiếp theo em sẽ filter ra đchi mac của attacker và target và tcp flag ack tại vì nó là bước cuối của quá trình 3 handshakes kết quả em thu được 2 port là 80 và 22 mà attacker đã kết nối được
![image](https://hackmd.io/_uploads/Sk-fQRg8Wx.png)
còn tcp flag [rst,ack] em tìm hiểu được thì nó là nhận được gói tin nhưng kết nối kh hợp lệ hoặc ip nhận kh muốn nhận thì nó sẽ ngắt kết nối và kh nhận gói tin đó nữa
đáp án: **KCTF{2}**
# Challenge Gateway Identification 
![image](https://hackmd.io/_uploads/BkwHHAxU-x.png)
## Những gì học được từ challenge
- Cách xem conversation và lần theo hoạt động của attacker 
## Writeup chi tiết
Challenge này em có vào lại phần conversation nãy em đã tìm được mac của target và attacker nma trong phần này nó lại có 3 địa chỉ mac mà attacker gửi tới
![image](https://hackmd.io/_uploads/SkMphRlUZl.png)
em thử filter ra target thứ 2 thì em tìm được src là của thg attacker gửi tới des là mac cần tìm để nó thăm dò network infrastructure theo như đề bài
![image](https://hackmd.io/_uploads/B1A1kkbUWl.png)
nên em phân giải mac address này ra và thu được
![image](https://hackmd.io/_uploads/H1tPJyWLWe.png)
kết quả cuối cùng là: **KCTF{Netis_Technology}**
# Challenge Exploitation
## Những gì học được
- Nếu trang web không dùng HTTPS (chỉ dùng HTTP), có thể đọc được Username/Password ngay trong phần Body của gói tin theo phương thức POST.
## Writeup chi tiết
Challenge này em cũng đi từ conversation và dựa theo cái mac address của thg attacker mà em đã tìm được từ trước
em dò các packet mà 2 thg này trao đổi cho nhau 
![image](https://hackmd.io/_uploads/HyQvrJZL-e.png)
thì em có tìm được 1 packet method POST 
![image](https://hackmd.io/_uploads/HkQnByZLWl.png)
em follow stream thì em thấy được nó đang cố dùng log và passwd để đăng nhập vào wordpress version 6.9
![image](https://hackmd.io/_uploads/r18SDyW8Ze.png)
ở đây em tưởng là username là tushar nma kh phải em có lùi lại 2 streams thì thấy được nó dùng log là kadmin_user
![image](https://hackmd.io/_uploads/SynRw1ZLWg.png)
cuối cùng em thử summit và được flag là: **KCTF{6.9_kadmin_user}**
# Challenge Vulnerability Exploitation
![image](https://hackmd.io/_uploads/BkFQtyZIZg.png)
## Những gì học được từ challenge
- lỗ hổng CVE-2019-9978 của plugin social warfare của wordpress
## Writeup chi tiết 
Em sẽ check tiếp các conversation mà thg mac address: 08:00:27:0e:62:25 liên quan tới, em có check thử conversation này
![image](https://hackmd.io/_uploads/B1bejJWIWl.png)
thì em tìm được mấy cái warfareplugins
![image](https://hackmd.io/_uploads/S1n7iy-I-l.png)
em tìm hiểu thì đây là 1 lỗ hổng RCE ngoài ra khi một lập trình viên viết xong plugin và muốn đưa nó lên Kho Plugin chính thức của WordPress (WordPress Plugin Repository), họ bắt buộc phải tạo file readme.txt. Nếu không có file này (hoặc file viết sai định dạng), hệ thống của WordPress sẽ từ chối nhận plugin. Em sẽ vào phần export và check file đó sau khi follow stream thì em được tên Plugin là Social Warfare và stable tag là bản hiện tại của nó là 3.5.2
![image](https://hackmd.io/_uploads/rJYHllb8bg.png)
đáp án cuối cùng: **KCTF{social_warfare_3.5.2}**
# MTA SEC challenge "Bài này dễ nhưng new tech"
## Writeup chi tiết
Khi mở file pcap thì em thấy có thiết bị usb virtual mouse được kết nối vào máy
![image](https://hackmd.io/_uploads/SJEFFgWIZg.png)
Qua quá trình tìm hiểu thì em có biết được 1 tools liên quan tới challenge này link: https://github.com/WangYihang/USB-Mouse-Pcap-Visualizer
![image](https://hackmd.io/_uploads/H14fclZU-e.png)
Sau khi chạy thì em thu được 1 file output.csv 
![image](https://hackmd.io/_uploads/HJ91jlbIbg.png)
Sau đó em tải lên đây: https://usb-mouse-pcap-visualizer.vercel.app/
khi em xem em thấy ngta vẽ có chữ MSE trong MSEC em nghĩ đến đây xong viết script ghi lại nét chuột là ra nma em viết script xong vẫn đang bị đứng ở khúc này
![image](https://hackmd.io/_uploads/rJGTgZ-Ibx.png)
# VSL CTF 2026

## Writeup chi tiết
![image](https://hackmd.io/_uploads/SJ04gRWLbe.png)
ban đầu em filter ra http sau đó em thấy có vài packet theo method POST em follow stream và tìm được các đoạn base64 sau 
![image](https://hackmd.io/_uploads/H1gTlRWIZx.png)

![image](https://hackmd.io/_uploads/BkP9gC-8Ze.png)

![image](https://hackmd.io/_uploads/BkX1-0WUbx.png)

em có decode và thu được 1 phần của flag, 
![image](https://hackmd.io/_uploads/BkPWZAZIbe.png)
em nghĩ trong packet này chứa flag nên các địa chỉ ip có thể liên quan tới attacker em filter ra ip 10.23.11.27 thì thu được các packet có chứa flag được giấu bằng kỹ thuật dns exfiltration
![image](https://hackmd.io/_uploads/H1JgX0WUbe.png)
decode tiếp thì thu được
![image](https://hackmd.io/_uploads/Hk4tERW8Zl.png)
em lướt xuống thì thấy các packet theo ICMP request có các đoạn base64
![image](https://hackmd.io/_uploads/HyEHNCWIWg.png)
em decode các đoạn base64 trong này thì thu được
![image](https://hackmd.io/_uploads/Hycbr0-UZx.png)
flag: **VSL{n3tw0rk_tunn3l1ng_15_c0mm0n_4tt4ck_t3chn1qu3}**


