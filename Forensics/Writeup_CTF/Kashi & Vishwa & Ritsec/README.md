# KashiCTF 
## Easy Forensics
![image](https://hackmd.io/_uploads/SyG4CAx3Zg.png)
Bài này thì em thấy nó dùng dns exfiltration 
![image](https://hackmd.io/_uploads/HyvpRRxhZe.png)
flag: **kashiCTF{dns_exfiltration_is_sneaky}**
## Mid Forensics 
![image](https://hackmd.io/_uploads/ryMqy1-hWl.png)
Bài này thì em thấy nó dùng protocol ICMP và các giá trị thay đổi chỉ là các giá trị ttl ở khoảng 64 và 65 nên em nghĩ 64 là bit 0 còn 65 là bit 1
![image](https://hackmd.io/_uploads/BJzOe1-h-e.png)
Sau khi trích ra bằng tshark thì em thay như trên và thu được
![image](https://hackmd.io/_uploads/By7CeJWhbg.png)
flag: **kashiCTF{ttl_stego_is_evil}**
## Burnt Ashes 
Sau khi mở Disk Drill và scan file này thì em thấy file này bị xóa hay sao đó nên nó nằm trong thư mục Deleted or Lost 
![image](https://hackmd.io/_uploads/rJc9ZyWnbe.png)
flag: **kashiCTF{ledger_ashes_remember_every_ritual}**
## Em lỡ kh note lại tên bài này :( 
Bài này cho 1 file mem.dmp nma kh phân tích được bằng volatility và Windbg, em dùng strings thì thấy có 1 đoạn hint dùng steghide 
![image](https://hackmd.io/_uploads/BJqW7ybnbg.png)
Mà steghide cần mk nên em tìm tiếp trong đây thì thấy 
Key Fragment thứ nhất nằm ở 
![image](https://hackmd.io/_uploads/r1rOm1-h-l.png)
![image](https://hackmd.io/_uploads/r1wKX1-nbl.png)
Key Fragment thứ 2 là 
![image](https://hackmd.io/_uploads/Hk-imJW3Wx.png)
nma em dùng steghide 2 key này thì kh đc nên em nghĩ key fragment thứ 2 bị thiếu vì strings nó chỉ lọc ra các ký tự đọc được th nên em mở hex lên và tìm tới đoạn đó thì thấy key chuẩn của nó là mamu_jamali
![image](https://hackmd.io/_uploads/BJVoVyW2-e.png)
h em khôi phục lại file ảnh và dùng steghide 
![image](https://hackmd.io/_uploads/SJiJHkb3Wg.png)
Sau khi extract thì em thu được
![image](https://hackmd.io/_uploads/rJzSrkZ3Zg.png)
flag:**kashiCTF{arey_fikar_na_kar_baccha_hai_tu_mera_chal_aja_tujhe_fanta_pila_hun}**
## mahashamshan 
Bài này trong quá trình giải thì em thấy có nhiều fake flag ở các protocol ICMP,DNS,... nma ở tcp thì em thấy phần sequence number của các packet này khả nghi khi mà các packet bình thường thì chỉ số sequence number(raw) của nó sẽ rất lớn và kh tuân theo quy luật gì, tuy nhiên em thấy các packet này có các sequence number(raw) tuân theo 1 giá trị nhất định nằm trong khoảng từ 20000-23000 và hầu như các packet đều cách nhau khoảng 50 đơn vị em nghĩ nó tương ứng với 50 bytes để chia nhỏ dữ liệu và truyền đi 
![image](https://hackmd.io/_uploads/Hkn3uJWhZl.png)
Sau khi trích và sort bằng tshark thì em thấy payload của các packet này nằm ở cột t2
![image](https://hackmd.io/_uploads/ByNbhJW2bl.png)
nên em chỉ trích cột t2 ra và lấy dữ liệu theo ascii luôn thì thu được 
![image](https://hackmd.io/_uploads/HJeLnkbnWe.png)
flag: **kashiCTF{urg_p01nt3r_1s_4_l13}**
# Ritsec
## Zipped up 
Khi một file ZIP được thiết lập mật khẩu:
- Trình nén sẽ thực hiện Nén dữ liệu trước , sau đó mới Mã hóa. Một chuỗi 12 byte ngẫu nhiên sẽ được thêm vào ngay trước phần File Data mã hóa để hỗ trợ quá trình xác thực mật khẩu.
- **Mã hóa Traditional PKWARE ZipCrypto** là một dạng Stream Cipher. Nó hoạt động dựa trên 3 khóa nội bộ 32-bit
  - Cách Stream Cipher hoạt động: Từ 3 private key, thuật toán tạo ra một luồng byte giả ngẫu nhiên gọi là Keystream ($K$).Dữ liệu mã hóa (Ciphertext - $C$) được tạo ra bằng cách XOR dữ liệu gốc (Plaintext - $P$) với Keystream:
   $$C = P \oplus K$$
   Vì $C = P \oplus K$, nên suy ra $K = C \oplus P$.
Nghĩa là: Nếu chúng ta có Ciphertext (lấy từ file ZIP) và chúng ta biết trước một phần Plaintext (dữ liệu gốc chưa mã hóa), chúng ta có thể tính ngược ra được đoạn Keystream $K$ và `bkcrack` có thể tận dụng lỗ hổng này 

Khi em kiểm tra định dạng nén và các file đc nén thì
![image](https://hackmd.io/_uploads/HJwhGgZnWx.png)
chúng ta có thể dùng signature bytes của file png vì nó mặc định sẽ kg thay đổi để làm plaintext
Đối với dạng nén: 
- **Stored**: thì nó sẽ dùng offset là 0 
- **Deflate**: Bắt buộc phải có một phần Header dài chính xác 5 byte 
  - **1 byte đầu tiên**: Chứa 3 bit cờ (BFINAL để báo hiệu có phải block cuối không, và BTYPE = 00 để báo hiệu đây là block không nén), cộng với 5 bit rác (padding) để làm tròn thành 1 byte.

  - **2 byte tiếp theo (LEN)**: Lưu giá trị độ dài của đoạn dữ liệu thô (tối đa 65,535 byte).

  - **2 byte tiếp theo (NLEN)**: Lưu phần bù 1 của LEN (để kiểm tra xem dữ liệu có bị lỗi hỏng không).

Vì ở bài này dùng file png để crack nên cần dùng offset là 5
Em sẽ dùng 12 byte đầu của file png và chuyển nó thành raw và lưu vào 1 file  
![image](https://hackmd.io/_uploads/SJpcDlbh-g.png)
Sau khi chạy bkcrack thì em thu được 
![image](https://hackmd.io/_uploads/SkwnteZ2Wg.png)
Sau đó em trích xuất file đó ra
![image](https://hackmd.io/_uploads/BkRBclZn-e.png)
![image](https://hackmd.io/_uploads/Bk1u5ebnZx.png)
flag: **RS{F41ling_4t_z1p_and_Crypt0}**
# Vishwa 
## BOOT 
Bài này thì em thấy chuỗi được mã hóa ở cuối file này 
![image](https://hackmd.io/_uploads/rJSljeZhbx.png)
Sau khi giải mã thì em thu được 
![image](https://hackmd.io/_uploads/SyeujgZ3be.png)
flag: **VishwaCTF{iM4G35_4Re_n0t_th4T_c00L}**
