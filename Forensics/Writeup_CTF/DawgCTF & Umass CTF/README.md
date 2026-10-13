# DawgCTF 
## I Love Bacon 
Bài này thì em thấy nó dùng dns exfiltration nma giấu vào 2 trường đó là dns qry name và các truy vấn txt  

![image](https://hackmd.io/_uploads/HylUvM9hWg.png)

đầu tiên em trích xuất nó ra và lọc ra các ký tự kh cần thiết 

![image](https://hackmd.io/_uploads/rk_3Pzqnbg.png)

Sau khi trích xuất và decode bằng base32 và chạy strings thì em thu được mảnh đầu

![image](https://hackmd.io/_uploads/BkPvnE53Ze.png)

em cũng làm tương tự với các truy vấn txt 

![image](https://hackmd.io/_uploads/BywAFzq2Zg.png)

cuối cùng flag thu được là **DawgCTF{s1zzlin_succul3nt_c2_b4con}**
## Gen-Z found my registry 
Khi mở file bằng notepad thì em thấy các chỉ số khá lạ +7 và -6, nó kh tuân theo quy tắc nào của Windows và "even", "odd" lần lượt là số chẵn và lẻ 

![image](https://hackmd.io/_uploads/HJSKON5hbl.png)


Sau khi tìm thấy em thấy có các kí tự như sau 

![image](https://hackmd.io/_uploads/HyqbqV5nbx.png)

Em nghĩ nó sẽ tương ứng với quy tắc đối với số lẻ thì nó sẽ lấy mã ASCII của kí tự tương đương và -6 xong còn số chẵn thì +7, Sau khi tổng hợp thông tin thì 

| STT | Loại | Ký tự mã hóa | Mã ASCII | Phép tính | Kết quả ASCII sau tính | Ký tự tương đương |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **1** | Lẻ | J | 74 | 74 - 6 | 68 | **D** |
| **2** | Chẵn | Z | 90 | 90 + 7 | 97 | **a** |
| **3** | Lẻ | } | 125 | 125 - 6 | 119 | **w** |
| **4** | Chẵn | dấu nháy | 96 | 96 + 7 | 103 | **g** |
| **5** | Lẻ | I | 73 | 73 - 6 | 67 | **C** |
| **6** | Chẵn | M | 77 | 77 + 7 | 84 | **T** |
| **7** | Lẻ | L | 76 | 76 - 6 | 70 | **F** |
| **8** | Chẵn | t | 116 | 116 + 7 | 123 | **{** |
| **9** | Lẻ | w | 119 | 119 - 6 | 113 | **q** |
| **10** | Chẵn | n | 110 | 110 + 7 | 117 | **u** |
| **11** | Lẻ | 9 | 57 | 57 - 6 | 51 | **3** |
| **12** | Chẵn | , | 44 | 44 + 7 | 51 | **3** |
| **13** | Lẻ | t | 116 | 116 - 6 | 110 | **n** |
| **14** | Chẵn | X | 88 | 88 + 7 | 95 | **_** |
| **15** | Lẻ | 6 | 54 | 54 - 6 | 48 | **0** |
| **16** | Chẵn | _ | 95 | 95 + 7 | 102 | **f** |
| **17** | Lẻ | e | 101 | 101 - 6 | 95 | **_** |
| **18** | Chẵn | m | 109 | 109 + 7 | 116 | **t** |
| **19** | Lẻ | n | 110 | 110 - 6 | 104 | **h** |
| **20** | Chẵn | , | 44 | 44 + 7 | 51 | **3** |
| **21** | Lẻ | e | 101 | 101 - 6 | 95 | **_** |
| **22** | Chẵn | a | 97 | 97 + 7 | 104 | **h** |
| **23** | Lẻ | 7 | 55 | 55 - 6 | 49 | **1** |
| **24** | Chẵn | o | 111 | 111 + 7 | 118 | **v** |
| **25** | Lẻ | 9 | 57 | 57 - 6 | 51 | **3** |
| **26** | Chẵn | v | 118 | 118 + 7 | 125 | **}** |

**Flag**: **DawgCTF{qu33n_0f_th3_h1v3}**
## Let's Doing Math
bài này thì em thấy nó có 120 mẫu và mỗi mẫu nó có thông tin như sau và gồm có 2 chỉ số cần quan tâm là Known Threat Depth và Detected Threat Depth 

![image](https://hackmd.io/_uploads/rJxPkBc2Zg.png)


Để làm bài này thì em sẽ chia nó ra làm 4 trường hợp 
- **TP (True Positive)** **Ví dụ**:

![image](https://hackmd.io/_uploads/SJsMFBc2bx.png) 

  - **Known Threat**: major
  - **Detected Threat**: major 
  - **Hành vi**: Tiêm nhiễm tiến trình (process injection) và duy trì sự hiện diện bằng tác vụ lập lịch (persistence via scheduled task)
  - **Kết luận**: Máy đã phát hiện đúng mối đe dọa nghiêm trọng.
- **TN (True Negative)** **Ví dụ**:

![image](https://hackmd.io/_uploads/SkqK5H9n-x.png)

  - **Known Threat**: minor
  - **Detected Threat**: minor 
  - **Hành vi**: gọi các API nghi ngờ, sửa đổi registry 
  - **Kết luận**: Máy đã không phát báo động giả mức độ cao cho một lỗi chỉnh sửa Registry đơn giản
- **FP (False Positive) Ví dụ**: 

![image](https://hackmd.io/_uploads/H1WL2rchWg.png)

  - **Known Threat**: medium 
  - **Detected Threat**: major
  - **Hành vi**: gọi các API nghi ngờ, sửa đổi registry
  - **Kết luận**: máy đã báo sai, và lỗi này đáng ra chỉ ở medium mà máy lại báo là major 

- **FN (False Negative) Ví dụ:** 

![image](https://hackmd.io/_uploads/H1Ci6B9nWx.png)

  - **Known Threat**: major
  - **Detected Threat**: minor 
  - **Hành vi** Sử dụng PowerShell bị làm mờ (obfuscated) và kỹ thuật chống máy ảo (anti-VM)
  - **Kết luận**: Kẻ địch cực kỳ nguy hiểm nhưng máy lại báo là minor, khiến hệ thống đứng trước nguy cơ bị phá hoại mà không hay biết.

**Công thức tổng quát**: Chúng ta sử dụng 3 công thức chính để tính 9 chỉ số của bạn:
- **Độ chính xác (Accuracy)**: $rac{TP + TN}{	ext{Tổng số mẫu (120)}}$
- **Tỷ lệ Dương tính giả (FPR)**: $rac{FP}{FP + TN}$ (Tỷ lệ báo động nhầm trên tổng số các mẫu "sạch").
- **Tỷ lệ Âm tính giả (FNR)**: $rac{FN}{FN + TP}$ (Tỷ lệ bỏ sót trên tổng số các mẫu "nguy hiểm").

**Nhóm 1: Cấp độ Minor (Nhẹ)**:
Dựa trên phân tích 120 mẫu, ta có: TP=38, FP=4, FN=2, TN=76. 

- **Độ chính xác**:$$Accuracy = rac{38 + 76}{120} = rac{114}{120} = 0.95$$
- **Tỷ lệ Dương tính giả**:
 $$FPR = rac{4}{4 + 76} = rac{4}{80} = 0.05$$
- **Tỷ lệ Âm tính giả**:
 $$FNR = rac{2}{2 + 38} = rac{2}{40} = 0.05$$

**Nhóm 2: Cấp độ Medium (Trung bình)**: TP=30, FP=8, FN=10, TN=72$
- **Độ chính xác:**
$$Accuracy = rac{30 + 72}{120} = rac{102}{120} = 0.85$$
- **Tỷ lệ Dương tính giả**: $$FPR = rac{8}{8 + 72} = rac{8}{80} = 0.1$$
- **Tỷ lệ Âm tính giả:**$$FNR = rac{10}{10 + 30} = rac{10}{40} = 0.25$$

**Nhóm 3: Cấp độ Major**
Số liệu: TP=31, FP=9, FN=9, TN=71
- **Độ chính xác**:$$Accuracy = rac{31 + 71}{120} = rac{102}{120} = 0.85$$
- **Tỷ lệ Dương tính giả**:$$FPR = rac{9}{9 + 71} = rac{9}{80} = 0.1125$$
- **Tỷ lệ Âm tính giả**:$$FNR = rac{9}{9 + 31} = rac{9}{40} = 0.225$$

**Flag: DawgCTF{0.95,0.05,0.05,0.85,0.1,0.25,0.85,0.1125,0.225}**
## The Step After Pcap
Phần đầu của file log có để lại một manh mối cực kỳ quan trọng: "Notable IOC: Repeated TLS JA3 hash observed in multiple flows to the same IP address." (Chỉ báo xâm phạm đáng chú ý: Mã băm TLS JA3 lặp lại được quan sát thấy trong nhiều luồng dữ liệu đến cùng một địa chỉ IP).

![image](https://hackmd.io/_uploads/Sy1yk8onZx.png)


Đề bài yêu cầu lấy các payload theo đúng trình tự thời gian  và phân tách chúng bằng dấu gạch dưới `_`. Từ gợi ý ở Bước 1, nhiệm vụ của chúng ta là rà soát file log để tìm ra địa chỉ IP đích và mã băm JA3 nào đang xuất hiện lặp đi lặp lại nhiều lần. Có một nhóm luồng dữ liệu liên tục gửi đến Dst IP: 45.76.123.45 với cùng một TLS JA3 Hash: `d2b4c6a8f0e1d3c5b7a9f2e4d6c8b0a1`. Chỉ những luồng gửi đến IP và có mã JA3 này mới mang theo một chuỗi ký tự ngẫu nhiên ở phần Payload Fragment


![image](https://hackmd.io/_uploads/BkIYJUjh-e.png)


Các mốc thời gian dường như không theo thứ tự. Có thể thấy file log nhảy lộn xộn từ **Record `#0218`** (05:21:46) xuống **Record** `#0144` (03:28:42). Phải dựa vào trường `Timestamp`  của các bản ghi sau đó sắp xếp chúng tăng dần từ cũ nhất đến mới nhất
cuối cùng ghép các chuỗi lại với nhau và thu đựơc flag là: **DawgCTF{HBRPO_IG8F1_CBFNO_6B9M8_0O2RA_K1VRJ_NVGFY_GWWQC_38HYF_9SXME_COSFO_GYR3X_KXWNR_EK8PK_3YR9O_UDOCU_ZRENU_N5Z3J_QIP98_Q1ZXO_I65FD_HJK1E_YY37Q_9AH8R_VHS1K_3AQ6L_6GT6M_JXK87_AU5BH_XTPDP_FF5E8_II49K_Q71N8_MTZX2_72HPO_EVB9O_OAEDO_ECVE6_PR5N8_I4P40_MGG1W1}**
## Modem Metamorphosis
Bài này yêu cầu flag theo format: **DawgCTF{Manufacturer_Model_OldFirmwareVersion_NewFirmwareName_NewFirmwareVersion}**

Em thấy có 2 packet method `POST` của packet upgrade khả nghi

![image](https://hackmd.io/_uploads/SkJeQUs2be.png)

Em thấy có chuỗi sau trong packet đó `openwrt-24.10.0-bcm47xx-generic-linksys_wrt610n-v1-squashfs.bin`

![image](https://hackmd.io/_uploads/rJyl4UjnWg.png)

- `openwrt`: Đây là NewFirmwareName nó cho biết chiếc router được thay đổi từ hệ điều hành gốc của nhà sản xuất sang OpenWrt 
- `24.10.0`: Đây là NewFirmwareVersion là phiên bản cụ thể của OpenWrt được tải lên
- `bcm47xx`: Đây là dòng chip xử lý của router Broadcom BCM47xx
- `generic`: Kiểu build chung cho dòng chip đó
- `linksys_wrt610n-v1`: Đây là Manufacturer (Linksys) và Model (WRT610N phiên bản phần cứng v1).

Em tìm thấy packet chứa version của nó nằm ở packet 230

![image](https://hackmd.io/_uploads/S1gxG88o3bx.png)

**Flag**: **DawgCTF{Linksys_WRT610N_1.00.00B18_OpenWrt_24.10.0}**
## Frequency 3000 
Em thấy 1 file flag.txt có chứa các đoạn mã hex, sau khi decode thì thu được

![image](https://hackmd.io/_uploads/ryydwLinWe.png)

Ở cuối file thì em thấy nó có fake flag :)) 

![image](https://hackmd.io/_uploads/rJV2D8on-e.png)

``` 
from collections import Counter

def solve_dawgctf():
    with open('Space Pilot 3000 Transcript.txt', 'r', encoding='utf-8') as f:
        text = f.read()
    text = text.lower()
    text = text.replace('{fake_flag_for_reasons}}', '')
', '')
    freq = Counter(text)
    targets = [390, 1002, 580, 1314, 191, 1589, 33, 1526, 141, 762, 352, 88, 1293, 379, 50]
    
    flag_chars = []
    
    
    for target_num in targets:
        for char, count in freq.items():
            if count == target_num:
                flag_chars.append(char) # Thêm ký tự đó vào mảng
                break 
    print(f"DawgCTF{{{''.join(flag_chars)}}}")

if __name__ == '__main__':
    solve_dawgctf()
```
- `text.lower()`: Biến tất cả chữ in hoa thành in thường vì bộ đếm phân biệt hoa/thường. Chữ W và w mã ASCII khác nhau. Nếu không gom chúng lại thành w hết, số đếm sẽ bị chia nhỏ
- `replace('{fake_flag...}', '')`: Tìm chuỗi cờ giả và thay thế nó bằng '' nghĩa là chuỗi rỗng.
', '')`: Trên hệ điều hành Windows, khi bấm phím Enter để xuống dòng, máy sẽ lưu 2 ký tự ẩn là 
 (Về đầu dòng + Xuống dòng mới). Trên Linux thì chỉ dùng 
 đi để số lượng ký tự đếm được đồng nhất với tác giả.
```
freq = Counter(text)
targets = [390, 1002, 580, 1314, 191, 1589, 33, 1526, 141, 762, 352, 88, 1293, 379, 50]
``` 
- `freq = Counter(text)`: Biến `freq` lúc này chứa một cuốn từ điển khổng lồ, liệt kê chính xác mỗi chữ cái/dấu câu xuất hiện bao nhiêu lần trong kịch bản đã làm sạch.
- `targets` = [...]: Đây là Mảng chứa các tần suất mà ta giải mã được từ file hex. Thứ tự của các con số này cực kỳ quan trọng vì nó chính là thứ tự của các chữ cái tạo nên flag.
```
flag_chars = []
for target_num in targets:
    for char, count in freq.items():
        if count == target_num:
            flag_chars.append(char)
            break
```
h thì tìm ra các chữ ascii tương ứng với số lần lặp này thôi

![image](https://hackmd.io/_uploads/S1xICLjh-g.png)

Sau khi chạy script thì em thu được

![image](https://hackmd.io/_uploads/S1MsRLonWg.png)

**Flag: DawgCTF{whyn0tzo!db3rg?}**
# UmassCTF 
## Click here for free bricks 
em thấy phần export của http có chứa các file installer.py và file launcher khả nghi 

![image](https://hackmd.io/_uploads/H1Tf1ws3be.png)

Em thấy code của file installer.py là 
``` 
import subprocess
import subprocess
import hashlib
import nacl.secret

def fix_error():
    seed = "38093248092rsjrwedoaw3"
    key = hashlib.sha256(seed.encode()).digest()
    box = nacl.secret.SecretBox(key)
    with open("./launcher", "rb") as f:
        data = f.read()
    decrypted = box.decrypt(data)
    with open("./launcher", "wb") as f:
        f.write(decrypted)

print("Hello World")

try:
    fix_error()
    print("Installed Correctly")
    result = subprocess.run(["ping", "-c", "2", "76.54.32.144"])
    print(result)

except Exception as e:
    print(f"Installation failed, please try again {e}")           
```      
hàm `fix_error()` mặc dù được đặt tên là sửa lỗi nma script của nó lại là giải mã các bước thực hiện của nó là:
- **Tạo khóa giải mã**: Nó sử dụng một chuỗi ký tự cố định (seed = "38093248092rsjrwedoaw3") và băm nó qua thuật toán SHA-256 (hashlib.sha256) để tạo ra một khóa bí mật (key).
- **Thiết lập công cụ giải mã**: Sử dụng thư viện mã hóa `nacl.secret.SecretBox` với khóa vừa tạo.
- **Đọc và giải mã**: Nó sẽ mở một tệp tin có tên là `./launcher` trong cùng thư mục (dưới dạng byte nhị phân rb), đọc nội dung đang bị mã hóa của nó, và tiến hành giải mã (box.decrypt(data)).
- **Ghi đè**: Cuối cùng, nó ghi đè phần nội dung đã được giải mã trở lại chính tệp `./launcher` đó.
- Nếu giải mã thành công, nó sử dụng thư viện `subprocess` để chạy lệnh hệ thống: `ping -c 2 76.54.32.144`. Lệnh này sẽ gửi 2 gói tin mạng đến địa chỉ IP `76.54.32.144`

Đề bài  yêu cầu tính sha256 của file mã độc đó nên em sẽ viết script giải mã 
```
import hashlib
import nacl.secret

def extract_payload():
    seed = "38093248092rsjrwedoaw3"
    key = hashlib.sha256(seed.encode()).digest()
    box = nacl.secret.SecretBox(key)
    with open("./launcher", "rb") as f:
        encrypted_data = f.read()
        decrypted_data = box.decrypt(encrypted_data)
    with open("./launcher_decrypted.bin", "wb") as f:
        f.write(decrypted_data)     

if __name__ == "__main__":
    extract_payload()
```
Sau khi chạy thì em tính sha256  của nó và thu được

![image](https://hackmd.io/_uploads/BkDjavi3-g.png)

**Flag: UMASS{e7a09064fc40dd4e5dd2e14aa8dad89b328ef1b1fdb3288e4ef04b0bd497ccae}**
## Lost and Found 
Đầu tiên em import file máy ảo này vào vm và login account root mà kh dùng passwd 

![image](https://hackmd.io/_uploads/HJag3tinZx.png)

Sau đó em chỉnh file cấu hình ở path /etc/ssh/sshd_config ở mục PermitRootLogin thành yes để xíu dùng mobaxsterm truy cập bằng ssh 

![image](https://hackmd.io/_uploads/H1WYhFs2bx.png)

Em check ip address để connect ssh thì thấy 

![image](https://hackmd.io/_uploads/HyyAhtj3-g.png)

h em tạo session trong mobaxsterm và connect bằng ssh 

![image](https://hackmd.io/_uploads/SJaDe9inWl.png)

Em thấy trong file .ash_history của user root chứa 

![image](https://hackmd.io/_uploads/S1HMZcs3be.png)

các lệnh này sẽ Cài đặt công cụ Thiết lập môi trường trên Alpine Linux và tải các công cụ hỗ trợ như ngôn ngữ lập trình (Rust, Python) và tiện ích mã hóa (xor). Tạo nhiễu (Red Herring): Sử dụng vòng lặp và Git để tạo ra hàng loạt file rác vô nghĩa nhằm đánh lạc hướng.
Xóa dấu vết: Mở và can thiệp trực tiếp vào file .ash_history bằng vi để chỉnh sửa và che giấu lịch sử các lệnh vừa thực thi.
Em vô thư mục `/home` thì thấy có rất nhiều dir đã được mã hóa tên

![image](https://hackmd.io/_uploads/Skelf9inbl.png)

Bài CTF này mô phỏng một cuộc tấn công Ransomware nhắm vào mã nguồn. Kẻ tấn công đã xâm nhập vào máy chủ, thấy một thư mục dự án Git và quyết định mã hóa nó bằng thuật toán `Repeating-Key XOR`. Hắn làm hai việc để hủy hoại dữ liệu:
- **Mã hóa nội dung**: Mọi nội dung bên trong file đều bị XOR với một khóa $K$ bí mật.
- **Mã hóa cấu trúc thư mục**: Để nạn nhân không biết đâu là file nào, hắn XOR luôn cả tên của từng thư mục và từng file, sau đó biểu diễn dưới dạng Hex.

**Lỗ hổng KPA**:
Hắn đã mã hóa toàn bộ hệ thống bằng một Key duy nhất, nhưng lại quên xóa các file `boilerplate` của Git. Bất kỳ kho lưu trữ Git nào khi khởi tạo bằng lệnh `git init` đều tự động sinh ra những file có nội dung cố định, nổi tiếng nhất là file `.git/info/exclude`

Vì file này luôn tồn tại và nội dung của nó là public , nó trở thành `Known Plaintext - P` hoàn hảo để phá vỡ hệ thống mã hóa.
**Công thức Mã hóa của XOR** :$$C = P \oplus K$$
**Công thức trích xuất Khóa**:$$K = C \oplus P$$**Chứng minh** :$$C \oplus P = (P \oplus K) \oplus P = K \oplus (P \oplus P) = K \oplus 0 = K$$
Tên file cũng bị `XOR` với cùng một Key đó, thuật toán Ransomware đã duyệt qua từng lớp thư mục, và mỗi khi mã hóa một cái tên, nó khởi động lại Key từ vị trí `index 0`.

File `.git/info/exclude` mặc định của Git luôn có một dung lượng cố định (thường là đúng 240 bytes) khi `find` thì em tìm được file đó

![image](https://hackmd.io/_uploads/Bkmkv9i2bx.png)

```
import os

plaintext_exclude = (
    b"# git ls-files --others --exclude-from=.git/info/exclude
"
    b"# Lines that start with '#' are comments.
"
    b"# For a project mostly in C, the following would be a good set of
"
    b"# exclude patterns (uncomment them if you want to use them):
"
    b"# *.[oa]
"
    b"# *~
"
)


target_file = "5457501C/135E5F07/1F485A0400120D" 

def extract_clean_key():
    with open(target_file, "rb") as f:
        ciphertext = f.read()
    raw_key = bytes([c ^ p for c, p in zip(ciphertext, plaintext_exclude)])
    cycle_length = 0
    for i in range(10, len(raw_key) // 2):
        if raw_key[:i] == raw_key[i:2*i]:
            cycle_length = i
            break
    if cycle_length == 0:
        cycle_length = 165
    clean_key = raw_key[:cycle_length]
    print(f"[+] Tìm thấy Key  (Độ dài chu kỳ: {cycle_length} bytes)")
    print("-" * 60)
    print(clean_key.decode(errors="ignore"))
    print("-" * 60)
    with open("clean_key.bin", "wb") as f:
        f.write(clean_key)

if __name__ == "__main__":
    extract_clean_key()
```
Đoạn code thực thi tấn công `KPA` ($K = C \oplus P$) bằng cách lấy file mã hóa XOR với bản rõ mặc định của Git để tạo ra một chuỗi khóa thô. Tiếp đó, thuật toán `Cycle Detection` sẽ tự động quét để tìm điểm chuỗi bắt đầu lặp lại chính nó nhằm xác định chính xác độ dài chu kỳ khóa. Cuối cùng, nó tự động cắt bỏ phần dữ liệu thừa ở đuôi để trích xuất ra đoạn Key nguyên bản dùng cho việc giải mã toàn hệ thống. Sau đó em chạy script và thu được key là 

![image](https://hackmd.io/_uploads/S1O7tqonWx.png)

Sau đó viết code để giải mã toàn hệ thống từ key đó 
```
import os
KEY = b"z09huvhu33i3bbuvuxzciohzcxviho3wryyudsfyuzcvxhyuhyuwrhyufdsuhhyuzvxcijlfkdasjknvoxzcihuwefijdsokncvlxznouhwe8dsoiljkcxnnnwue9fdsp8oicjxlvnbefhsoaduijkcvxnbywu9e8f0d9"

def xor_cipher(data, key):
    return bytes([data[i] ^ key[i % len(key)] for i in range(len(data))])

def decrypt_system(target_dir="."):
    for root, dirs, files in os.walk(target_dir, topdown=False):
        for name in files:
            if name.endswith('.py') or name.endswith('.bin'): 
                continue
            old_path = os.path.join(root, name)
            
            try:
                with open(old_path, 'rb') as f:
                    encrypted_content = f.read()
                decrypted_content = xor_cipher(encrypted_content, KEY)
                name_bytes = bytes.fromhex(name)
                decrypted_name = xor_cipher(name_bytes, KEY).decode('utf-8')
                new_path = os.path.join(root, decrypted_name)
                with open(old_path, 'wb') as f:
                    f.write(decrypted_content)
                os.rename(old_path, new_path)
            except Exception:
                pass
        for name in dirs:
            try:
                name_bytes = bytes.fromhex(name)
                decrypted_name = xor_cipher(name_bytes, KEY).decode('utf-8')
                old_path = os.path.join(root, name)
                new_path = os.path.join(root, decrypted_name)
                os.rename(old_path, new_path)
            except Exception:
                pass
if __name__ == "__main__":
    decrypt_system()
```
- `Thuật toán Bottom-up (topdown=False)`: Script bắt buộc phải dùng chế độ duyệt cây thư mục từ dưới lên. Nếu đổi tên thư mục cha trước, đường dẫn trỏ đến các file con bên trong sẽ bị gãy  khiến script báo lỗi File not found.
- `Cơ chế XOR độc lập`: Hàm `xor_cipher` được gọi riêng biệt cho từng khối dữ liệu (Tên file, Tên thư mục, Nội dung file). Điều này mô phỏng chính xác thuật toán của `Ransomware`: Reset vòng lặp khóa (Key index) về 0 mỗi khi xử lý một đối tượng mới.
- `Phục hồi Git`: Sau khi giải mã, tất cả các Blob, Tree và Commit object đều được trả về cấu trúc nén Zlib hợp lệ. Lúc này, Git có thể đọc được dữ liệu
Sau khi khôi phục thì em thấy 

![image](https://hackmd.io/_uploads/rJHo2qo2Wg.png)

Kẻ tấn công đã lợi dụng cấu trúc `Directed Acyclic Graph (DAG)` của Git để đánh lừa công cụ phân tích. Thay vì commit Flag lên nhánh hiện tại, tác giả sử dụng git stash. Bản chất của `git stash` là khởi tạo các Commit objects chứa dữ liệu tạm thời nhưng không liên kết chúng vào branch hiện hành, mà lưu tham chiếu tại `refs/stash`.
Do lệnh `git log` tiêu chuẩn chỉ duyệt đồ thị từ con trỏ `HEAD` ngược về các commit cha, nó hoàn toàn bỏ qua nhánh `stash` và chỉ hiển thị các commit rác trên nhánh `master` nên em sẽ dùng lệnh `git stash list` để xem ndung của nhánh `stash` thì em thu được 

![image](https://hackmd.io/_uploads/HytKpqihWg.png)

**Flag: UMASS{h3r35_7h3_c4rg0_vr00m}**


