# Disk Operating System

![image](https://hackmd.io/_uploads/S1j7Y4Z3-e.png)

Bài này cho 1 file qcow2

![image](https://hackmd.io/_uploads/rJF1wQ-3-l.png)

**QCOW2 (QEMU Copy-On-Write)** là một tệp lưu trữ toàn bộ nội dung của một ổ đĩa cứng vật lý. Bên trong container này bao gồm:
- **Header**: Chứa thông tin về phiên bản, kích thước đĩa, bảng ánh xạ dữ liệu.

- **L1/L2 Tables**: Các bảng chỉ mục giúp hệ điều hành tìm thấy dữ liệu nằm ở đâu trên đĩa ảo.

- **Data Clusters**: Các khối dữ liệu thực tế của hệ điều hành (trong trường hợp bài CTF của bạn là các file của MS-DOS).

Vì 7z có chức năng Filesystem Parsers để phân tích các file ảnh đĩa nên em sẽ dùng nó để phân tích

![image](https://hackmd.io/_uploads/HyD2BQWhWl.png)

Sau khi giải nén thì em thu được

![image](https://hackmd.io/_uploads/r1lEvm-2Ze.png)

Sau đó em sử dụng dosbox để mount 

![image](https://hackmd.io/_uploads/H16tEEZ2bx.png)

Sau khi mount thì em vào thư mục DOS và thử các lệnh bằng cách gọi tên vì trong MS-DOS các file lệnh thực thi là file .COM 

![image](https://hackmd.io/_uploads/HyWe8Ebn-x.png)

Sau khi chạy hầu như các lệnh thì em thấy nó đều bị như vầy
![image](https://hackmd.io/_uploads/S1JUINZ3bl.png)

nma lệnh MORE.COM lại chạy được và thông thường lệnh more chỉ có -- More -- và kh có kí tự nào đằng sau 

![image](https://hackmd.io/_uploads/S1SdUEZ2bx.png)

![image](https://hackmd.io/_uploads/BJdiLEZhZe.png)

![image](https://hackmd.io/_uploads/ryUhUEZ3We.png)

![image](https://hackmd.io/_uploads/Byma8Nbnbe.png)

![image](https://hackmd.io/_uploads/HyaTIN-3bl.png)

![image](https://hackmd.io/_uploads/BkKALNZ3Zg.png)

![image](https://hackmd.io/_uploads/r1Ekv4Zn-e.png)

Sau khi chạy thì em xác nhận flag được giấu trong lệnh này ở cuối chữ MORE do tên giải là srdnlen và em kéo xuống tiếp và ghép lại thì được full flag là: **srdnlen{d1d_y0u_kn0w_th4t_th3_D0S_s0urc3_w4s_r3l34s3d?}**
# Cheese with friends

![image](https://hackmd.io/_uploads/rJHO4rb2-g.png)

Sau khi mở wireshark lên thì em thấy bài này là 1 bài liên quan tới usb nên em sẽ dùng tools USB-HID-decoders để phân tích 

![image](https://hackmd.io/_uploads/B1A7uEW2Zl.png)

Em extract hid data thì thấy nó là keyboard encode 

![image](https://hackmd.io/_uploads/r1NxK4Zn-l.png)

Sau đó em dùng keyboard decode thì thu được 
```Blog #17

Title: My Unsettling Encounter with Casu Martzu.

I had always considered myself an adventurous eater, eager to try the world<Alt+3><Alt+9>s most exotic delicacies.
When I visited Sardinia, the promise of experiencing Casu Martzu - the infamous <Alt+3><Alt+4>rotten cheese<Alt+3><Alt+4>, teeming with live maggots - felt like a once-in-a-lifetime opportunity. This wasn<Alt+3><Alt+9>t just food; it was a cultural ritual, steeped in tradition and controversy.
However, nothing could prepare me for the reality of facing that wiggling block of pecorino. As the host ceremoniously removed the covering, revealing the cheese alive with larvae, my confidence began to waver.
The smell hit first: a potent, ammonia-like aroma mixed with a hint of decay. My stomach tightened as I stared down at the challenge on my plate, unsure if I could muster the courage.

When I finally worked up the nerve to take a bite, it was an experience like no other. The taste was a sharp assault on my senses: intensely tangy, rich, and bitter all at once.
I could feel a slight crunch that I tried hard to ignore. I told myself it was part of the cheese<Alt+3><Alt+9>s crust, but deep down, I knew better.
To make matters more surreal, I had to constantly guard my plate because the larvae were capable of jumping several inches high. My dining companions laughed, calling it the <Alt+3><Alt+4>dancing cheese<Alt+3><Alt+4>, but my nerves were frayed. It wasn<Alt+3><Alt+9>t just a meal, it was a gauntlet.

The texture, though creamy, was complicated by the knowledge of its tiny inhabitants. It seems like this:
*****$%***%*****$$%%$church%*$chu
*%*chu
%%$$chu	%%****$$chu	%*%*%*chu
**$$chu
%%$$chu
%**$chu	%%$$chu
%$%%*
$+$%%&&$<Alt+3><Alt+9>%%&+$%<Alt+9><Alt+6>$&&$<Alt+3><Alt+9>%$=$&$&$+$%$=&$<Alt+3><Alt+9>%$=$$&$&$&$&%)$&&$&%&$&&$%%&$$+$+*&%$=$&$<Alt+3><Alt+9>%$=**&chu
$=$&$&%&$&&$&%&$&&$<Alt+3><Alt+9>%%&$$+$+&$&*&$&$&$&$$+$+$&chu
$=$&$&$
$$%$%%*$+$+&$$%$=$$+$%$=$&$&%&chu	$$&&chu
$+$$%$%%**$&$chu
&$&$&$&$&$+$%$=$$%$%%&chu
$$&+$chu
&%*%&chu
$$&&$chu	&=$=$$
$=%%$=&$&$$&$(%&$&&$&$&$&&$&&$$%%+&$&$&$&<$<$$&$$%$<$&$&%&$&&$&%$$+$+*chu
)$&&$&$&$&**chu	)$&&$$%$$&&$&%&$&&$&*$+$+$&$&chu	&$&%&$&$+$+*chu
<Ctrl+Shift+ENTER>$&chu
+&%&*=%%,%&&%&$&%&&%&$=chu
&&%&$&%&$&$&$&%&$=%=$=chu	+$$=%%&+%+*&chu
%+$&%&$&%&chu
%%&chu
%+$&%&$&%&$=chu
+$&%&*+%+*=chu	%&=%%,%&+%+*&chu
%+$&$&$)$&$>$>
&&%&$&%&$&$&$&%&$=%=$=chu
+$$=%%&+%+*&chu
%+$&%&$&%&chu	%%&chu
%+$&%&$&%&$=chu
+$&%&*+%+*=chu	%&=%%,%&+%+*&chu
%+$&$&$
$$chu
$<Ctrl+Shift+k><Ctrl+END>$%$%%<Ctrl+u>
<Shift+RIGHT><Ctrl+f><Alt+ENTER>   <ESC><Ctrl+END>

Even hours later, I couldn<Alt+3><Alt+9>t shake the feeling of Casu Martzu. The taste lingered in my mouth, and my mind replayed the scene like a slow-motion horror film.
Reflecting on it now, I<Alt+3><Alt+9>m not entirely sure if I regret the experience or cherish it for its sheer audacity.
This cheese is banned in many countries for safety reasons, and after trying it, I understand why. But in a strange way, I also respect the Sardinian people for preserving such a raw and unapologetic tradition.
Eating Casu Martzu was disconcerting, to say the least, but it was also an unforgettable reminder of how food can push the boundaries of culture, comfort, and even courage.

by @Church
$$%%&$&$%$%%$$&$&$$chuUPUPUPUP<Shift+Alt+2><Shift+Alt+2>UP<Shift+Alt+8><Shift+Alt+8><Ctrl+Shift+1>|<Shift+LEFT><Ctrl+c>$$%$%%*$+$+&$$%$=$$+$%$=$&$&%&chu	$$&&chu	$+$$%$%%**$&$chu<Ctrl+h><Alt+4><Alt+3>	<Ctrl+a></><Ctrl+Alt+ENTER><ESC><Ctrl+END><Ctrl+h><Alt+6><Alt+1>	<Ctrl+a><Alt+9><Alt+2><Ctrl+Alt+ENTER><ESC><Ctrl+Shift+1><Ctrl+h><Alt+3><Alt+8>	<Ctrl+a><Ctrl+v><Ctrl+Alt+ENTER><ESC><Ctrl+END>chu	<Ctrl+F2>___<ESC><Ctrl+Shift+1><Ctrl+BACKSPACE><Alt+3><Alt+7><Shift+LEFT><Ctrl+Shift+l>_<ESC><Ctrl+g>19
<Shift+RIGHT><Ctrl+Shift+l> <ESC><Ctrl+Shift+1><Ctrl+g>15
&$&$&$&$&$+$%$=$$%$%%&chu	$$&+$chu
<Ctrl+x>&%*%&chu	$$&&$chu
&=$=$$
**************$=%=************$$&chu	%%&******************$$+%+$$
```

đến đây thì em kh bt làm sao nữa :( em có tìm được kqua decode của ngta là
```
Blog #17

Title: My Unsettling Encounter with Casu Martzu.

I had always considered myself an adventurous eater, eager to try the world's most exotic delicacies.
When I visited Sardinia, the promise of experiencing Casu Martzu - the infamous "rotten cheese", teeming with live maggots - felt like a once-in-a-lifetime opportunity. This wasn't just food; it was a cultural ritual, steeped in tradition and controversy.
However, nothing could prepare me for the reality of facing that wiggling block of pecorino. As the host ceremoniously removed the covering, revealing the cheese alive with larvae, my confidence began to waver.
The smell hit first: a potent, ammonia-like aroma mixed with a hint of decay. My stomach tightened as I stared down at the challenge on my plate, unsure if I could muster the courage.

When I finally worked up the nerve to take a bite, it was an experience like no other. The taste was a sharp assault on my senses: intensely tangy, rich, and bitter all at once.
I could feel a slight crunch that I tried hard to ignore. I told myself it was part of the cheese's crust, but deep down, I knew better.
To make matters more surreal, I had to constantly guard my plate because the larvae were capable of jumping several inches high. My dining companions laughed, calling it the "dancing cheese", but my nerves were frayed. It wasn't just a meal, it was a gauntlet.

The texture, though creamy, was complicated by the knowledge of its tiny inhabitants. It seems like this:
                _         _                 __ ____    ___   _   _____  _____              ____   _   _   ___        _____  ____       _____  ____ __   
  ___  _ __  __| | _ __  | |  ___  _ __    / /|  _ \  / _ \ | |_|___  ||___ /  _ __       | ___| | | | | / _ \  _ __|___  |/ ___|_   _|___  || ___|\ \  
 / __|| '__|/ _` || '_ \ | | / _ \| '_ \  | | | |_) || |_| || __|  / /   |_ \ | '_ \      |___ \ | |_| || |_| || '__|  / /| |   | | | |  / / |___ \ | | 
 \__ \| |  | (_| || | | || ||  __/| | | |< <  |  _ < | |_| || |_  / /   ___) || | | |      ___) ||  _  || |_| || |    / / | |___| |_| | / /   ___) | > >
 |___/|_|   \__,_||_| |_||_| \___||_| |_| | | |_| \_\ \___/  \__|/_/   |____/ |_| |_|_____|____/ |_| |_| \___/ |_|   /_/   \____|\__,_|/_/   |____/ | | 
                                           \_\                                      |_____|                                                        /_/  


Even hours later, I couldn't shake the feeling of Casu Martzu. The taste lingered in my mouth, and my mind replayed the scene like a slow-motion horror film.
Reflecting on it now, I'm not entirely sure if I regret the experience or cherish it for its sheer audacity.
This cheese is banned in many countries for safety reasons, and after trying it, I understand why. But in a strange way, I also respect the Sardinian people for preserving such a raw and unapologetic tradition.
Eating Casu Martzu was disconcerting, to say the least, but it was also an unforgettable reminder of how food can push the boundaries of culture, comfort, and even courage.

by @Church
```
# DFIR 1 - Malvent

![image](https://hackmd.io/_uploads/S19pqmMnbg.png)

![image](https://hackmd.io/_uploads/H1Xks7fh-l.png)

## 1. What is the name of the suspicious service installed 
Lúc đầu thì em có tìm và thu được event id 4697 như sau

![image](https://hackmd.io/_uploads/HJBDhmfhZg.png)

Tuy nhiên khi em vào security log để filter ra thì nó lại không có kết quả nào 

![image](https://hackmd.io/_uploads/BJ8n3mf2Wl.png)

Qua tìm hiểu thì em mới biết được là hệ thống phải được cấu hình bật policy Audit Security System Extension Hoặc các Audit advanced thì nó mới ghi nhận log này, Sau đó em có tìm tiếp thì em thấy có 1 event tương tự nma id nó lại là 7045 

![image](https://hackmd.io/_uploads/BJtQ6mz3Wg.png)

![image](https://hackmd.io/_uploads/BJ_bAQznZl.png)

![image](https://hackmd.io/_uploads/HkPA6Qfh-x.png)

Em thấy event id này khả nghi vì hacker có thể đã có backdoor access vào server với lại event id 7045 cũng kh cần cấu hình mà nó tự động ghi lại mỗi khi `Security Control Manager` cài đặt một service mới. Em filter ra id này trong system log thì thấy có 2 event và thu được

![image](https://hackmd.io/_uploads/H11Lk4MnWg.png)
**answer: QcUcMElh**
## 2. From which process it has been generated? Give also the extension? 
Cũng ở event id đó thì em process được tạo là 

![image](https://hackmd.io/_uploads/S1_JZNG3-e.png)

**answer:lmIcgUEQ.exe** 
## 3. What is its event ID?
**7045**:)) 
## 4. Give the events IDs corresponding to unsecured data (e.g. cryptography). If more than one put a comma
- Windows sử dụng `Bitlocker` để mã hóa và bảo mật dữ liệu, `BitLocker` là một tính năng bảo vệ dữ liệu tích hợp với hệ điều hành để giải quyết các mối đe dọa về trộm cắp hoặc lộ dữ liệu từ các thiết bị bị mất, bị đánh cắp hoặc bị ngừng hoạt động không đúng cách. Nó sử dụng thuật toán AES ở chế độ XTS hoặc CBC với độ dài khóa 128 bit hoặc 256 bit để mã hóa dữ liệu trên ổ đĩa 
có thể đọc thêm ở trang [này](https://learn.microsoft.com/en-us/windows/security/book/operating-system-security-encryption-and-data-protection)


![image](https://hackmd.io/_uploads/BJgh_Vfh-e.png)

- Sau khi đọc thêm ở [đây](https://learn.microsoft.com/en-us/windows/security/operating-system-security/data-protection/bitlocker/countermeasures) thì em thấy trước khi Windows khởi động, các tính năng bảo mật được triển khai như một phần của phần cứng và phần mềm của thiết bị bao gồm `TPM` và `secure boot` 
- `TPM`là một chip được thiết kế để cung cấp các chức năng liên quan đến bảo mật cơ bản, chủ yếu liên quan đến các khóa mã hóa. BitLocker liên kết các khóa mã hóa với TPM để đảm bảo rằng thiết bị không bị can thiệp khi hệ thống ngoại tuyến. 

![image](https://hackmd.io/_uploads/SyNBu4f3Zx.png)

- Em nghĩ lỗi liên quan đến mã hóa hệ thống thường bắt nguồn từ lỗi giao tiếp giữa Windows và `TPM` và đề bài có nói là dữ liệu kh còn an toàn nữa nên cơ chế mã hóa `BitLocker/TPM` đã bị hỏng hoặc ngừng hoạt động.
- Sau đó em có vào evtx và filter ra các id bị error thì thấy TPM đã gặp lỗi không thể khắc phục trong phần cứng và ngăn cản việc mã hóa dữ liệu của TPM

![image](https://hackmd.io/_uploads/H1ado4f3Ze.png)

- Sau khi filter ra thêm từ khóa TPM thì em thấy thêm 1 event id 18 liên quan đến việc này 

![image](https://hackmd.io/_uploads/SyoEpVM3-l.png)

Event id 18 xuất hiện khi TPM đang bị lỗi trạng thái và phải chạy lại bước kiểm tra Provisioning, BitLocker hoàn toàn không thể trích xuất được khóa để giải mã hoặc bảo vệ dữ liệu 
**answer: 15, 18**
## 5. Which event ID is related to the state of the account protection?
Source Directory Service SAM chủ yếu ghi lại các nỗ lực truy cập, thay đổi hoặc truy vấn vào cơ sở dữ liệu SAM. 
- Hoạt động của tài khoản cục bộ: Tạo mới, xóa, đổi tên hoặc thay đổi mật khẩu của các User và Group cục bộ (không phải tài khoản Domain).
- Truy vấn từ xa (Remote Calls): Ghi lại khi có ai đó từ máy khác cố gắng "hỏi" danh sách User trên máy này (thường qua giao thức RPC). Đây là dấu hiệu của việc dò quét mạng (Enumeration).
- Kiểm soát truy cập hệ thống: Các thông báo về việc khởi tạo hoặc kiểm tra tính toàn vẹn của file cơ sở dữ liệu SAM khi máy tính khởi động.
Em filter ra source này thì em thấy có 3 event ID

![image](https://hackmd.io/_uploads/HJ3vXPf3-e.png)

Tuy nhiên đề bài hỏi tới tình trạng bảo mật của tài khoản nên em nghĩ đó là event 16977 vì nó cho biết mật khẩu của tài khoản không đáp ứng độ dài tối thiểu
## 6. Give the compromised CLSID stating that malicious code could be executed. If more than one, put a comma (e.g. str1, str2)
đầu tiên em tìm hiểu về CLSID thì thấy `CLSID` là mã định danh duy nhất dùng để xác định đối tượng `COM class` đại diện cho các module ẩn bên trong hệ điều hành. Trong Windows Event Viewer, khi hệ thống ghi nhận một lỗi liên quan đến các module này, nó luôn luôn sinh ra log từ source có tên là `DistributedCOM`

![image](https://hackmd.io/_uploads/ByHBQBznWx.png)

Sau đó em filter source này  

![image](https://hackmd.io/_uploads/By53NBM3bl.png)

- Em thấy có 2 module là `Windows.SecurityCenter.SecurityAppBroker` và `Windows.SecurityCenter.WscBrokerManager` bị ảnh hưởng bởi event id 10016

![image](https://hackmd.io/_uploads/rJHLrrGnWx.png)
![image](https://hackmd.io/_uploads/Hy7vrrzhWx.png)

- `Event ID 10016` là một sự kiện được ghi lại khi một ứng dụng hoặc dịch vụ cố gắng khởi chạy hoặc truy cập vào một thành phần DCOM (Distributed Component Object Model) nhưng bị hệ điều hành từ chối do thiếu quyền
  - `Module: Windows.SecurityCenter.WscBrokerManager`: chịu trách nhiệm quản lý việc đăng ký và báo cáo trạng thái của Antivirus, Firewall.
    - **Mục tiêu của mã độc**: sử dụng kỹ thuật `WSC Spoofing`  gửi lệnh giả mạo đến `WscBrokerManager` để khai báo rằng: "Máy này đã có phần mềm diệt virus rồi". Khi đó, `Windows Defender` sẽ tự khóa mình lại, để lại một hệ thống  cho mã độc hoành hành.
  - `Module: Windows.SecurityCenter.SecurityAppBroker`: Khi  mở security dashboard để kiểm tra trạng thái máy tính, ứng dụng đó phải gọi qua `SecurityAppBroker` để lấy dữ liệu từ `SYSTEM` và hiển thị lên. Nó cũng quản lý các thông báo về bảo mật trên thanh Taskbar 
    - **Mục tiêu của mã độc**: chặn các thông báo cảnh báo khi virus xâm nhập.
    
**answer: Windows.SecurityCenter.SecurityAppBroker, Windows.SecurityCenter.WscBrokerManager**
## 7. What is the port number listening for remote control?
Em tìm được các port nằm ở các event id: 

![image](https://hackmd.io/_uploads/Hkv7gLfnWe.png)

- Trong Windows, các dịch vụ muốn lắng nghe các kết nối mạng dựa trên giao thức HTTP/HTTPS không cần phải tự mình viết code quản lý cổng. Thay vào đó, chúng nhờ tầng nhân Kernel tên là http.sys và `Event ID 112`  là thông báo URL Reservation. Khi một dịch vụ như RDP Gateway khởi động, nó yêu cầu driver http.sys giữ chỗ một địa chỉ URL cụ thể trên một cổng cụ thể.
- vì đề bài có nhắc tới remote control nên em nghĩ giao thức được sử dụng trong bài này là rdp(remote desktop protocol)

![image](https://hackmd.io/_uploads/HJ_igUM2-l.png)
![image](https://hackmd.io/_uploads/B1P3lIfnWg.png)

Em thấy có 2 port
- **3387**: Sử dụng http:// không mã hóa.
- **3392**: Sử dụng https:// có mã hóa.

Thông thường, cổng HTTP 3387 được mở ra trước để tiếp nhận kết nối ban đầu hoặc thực hiện chuyển hướng (redirection) sang cổng bảo mật nên em nghĩ đáp án sẽ là **3387**

## 8. Give the event ID related to the manipulation of specific data (e.g. registry key manipulation, deletion, creation, modification)
Em tìm thấy event ID 16 của Kernel có liên quan tới việc thao tác với các registry key 

![image](https://hackmd.io/_uploads/HJ4hN8fh-e.png)
![image](https://hackmd.io/_uploads/rJnpV8M3-e.png)
![image](https://hackmd.io/_uploads/ry-mPLfhZl.png)

Em tìm hiểu thì bt được `Event ID 16` dùng để DeleteValueKey (Xóa dữ liệu) và nó luôn tồn tại trong kernel Windows log Kernel khó bị hacker can thiệp hay xóa bỏ hơn so với log Security hay Sysmon, em nghĩ nó đã xóa các value để malware có thể xâm nhập vào hệ thống 
**answer: 16**
## 9. Give the application name whose corruption could depend from the malware. (First letter uppercase, add also the extension).
Khi vào event ID của Application.evtx thì em thấy có 1 level Error liên quan đến source Aplication

![image](https://hackmd.io/_uploads/rkORvLM3-x.png)

và em thấy nó bị crashing nên em nghĩ nó bị corruption có thể liên quan đến malware 

![image](https://hackmd.io/_uploads/HJfX_Uf2Zx.png)

**answer: Widgets.exe**
## 10. Is Windows Defender on?
Khúc này của [bài viết](https://learn.microsoft.com/en-us/defender-endpoint/microsoft-defender-antivirus-compatibility) có nói tới Window Security Center có liên quan tới phần Window Defender 

![image](https://hackmd.io/_uploads/ryJe3UGhWg.png)

Em vào log Security thì thấy các event liên quan tới Window Defender có liên quan tới Source SecurityCenter và phần General nó cũng có nói là Windows Defender được bật

![image](https://hackmd.io/_uploads/BJh_n8znWg.png)

**answer: yes**
## 11. What is the event ID stating this?
**answer:15**
## 12. Give the event ID related to the wrong management of different sessions and users in remote desktop.
Winlogon là  điều phối việc đăng nhập. Khi có một hành động (như đăng nhập, đăng xuất, khóa máy), Winlogon sẽ gửi "thông báo" đến các dịch vụ liên quan (subscribers). em nghĩ nó có thể liên quan tới Winlogon nên sẽ filter ra 

![image](https://hackmd.io/_uploads/ByrugPz2We.png)

thì em thấy có event ID liên quan tới các session và nó bị unavailble nên có thể đây có thể là wrong management 

![image](https://hackmd.io/_uploads/r1BhxvG2bl.png)

**answer:6003**
## 13 Which event ID states that the malware could have read the credentials?
ở security evtx thì em thấy có các evtx nói credentials were read nên em nghĩ đây là event liên quan

![image](https://hackmd.io/_uploads/rJr2WvMnWe.png)

**answer: 5379**
# DFIR 2 - Malnet 
## 1. Which packet contains the header of an executable file?
Vì các executable file đều có magic bytes ở ASCII là "MZ" nên em sẽ filter các packet này ra

![image](https://hackmd.io/_uploads/Hk2aguQnbx.png)

em tìm trong các packet thì thấy đây là file thực thi mà đề bài yêu cầu
**answer:2137**
## 2. To which flow does it correspond? (PROTOCOLO FLOW_ID, e.g. HTTP 1)
Sau khi em bấm follow stream của packet đó thì thấy stream của nó là 40 

![image](https://hackmd.io/_uploads/S1rUWOQ2Zl.png)

**answer: tcp 40**
## 3. Into how many parts is the executable fragmented? Give the total number of files.
em follow packet chứa header MZ thì thấy **MS-CorrelationId** đại loại thì nó sẽ thực hiện theo cơ chế: 
- **Khởi tạo**: Khi yêu cầu đầu tiên chạm đến hệ thống (hoặc được gửi đi từ client), một mã định danh duy nhất (thường là chuỗi UUID/GUID) sẽ được tạo ra và gán vào header MS-CorrelationId.
- **Truyền tải**: Mã định danh này sẽ được đính kèm vào mọi yêu cầu nội bộ tiếp theo khi các dịch vụ giao tiếp với nhau.
- **Ghi log**: Mỗi khi một dịch vụ thực hiện xong phần việc của mình hoặc gặp lỗi, nó sẽ ghi lại log kèm theo chính cái MS-CorrelationId đó.
tóm lại thì nó giúp gom tất cả các sự kiện phân mảnh lại với nhau

![image](https://hackmd.io/_uploads/H15Ryq73Zg.png)

sau đó em filter ra các packet có MS id này thì thu được

![image](https://hackmd.io/_uploads/SyszW9QnWe.png)

Em đếm thì có **29 packet**
**answer:29**
## 4. What is the resource name accessed in the GET resource containing the executable file?. Give the complete name (e.g. /myfile/file1/this-is-the-file?A0=something&A1=other%3d%3d).
cnay thì nó nằm ở method GET của stream đó th

![image](https://hackmd.io/_uploads/BJGp-5mhbg.png)

answer:  **/filestreamingservice/files/7d9cd93c-1d5e-449b-9ad7-f1e8d6b90509?P1=1736543287&P2=404&P3=2&P4=A4bbVZMC2rLzoHuEoqkGyn%2bfjFNZYtKNVXsPbIbY5Amz3v4r%2bQitB5Uc%2fXCKOEvShr8HAJPOsSVdpx2t0DGgKQ%3d%3d**
## 5. What is the sha256 of the first part of the executable file?
Vì packet tìm ở đầu nó thuộc flag ACK nên nó sẽ kh chứa toàn bộ dữ liệu của packet chứa file thực thi đó mà nó chỉ báo cáo trạng thái 

![image](https://hackmd.io/_uploads/Hk2aguQnbx.png)

HTTP là giao thức ở tầng ứng dụng, chịu trách nhiệm mang nội dung thực tế (văn bản, hình ảnh, file,...) khi server chia nhỏ file để gửi đi, phần thân của gói phản hồi `206 Partial Content` chính là nơi trực tiếp chứa các byte dữ liệu của file, em filter ra packet đó và lưu file về 

![image](https://hackmd.io/_uploads/HyRl35X2Ze.png)

em tính sha256sum của file thì thu được

![image](https://hackmd.io/_uploads/Sy8shqQnWe.png)

**answer: b56b0ee4af8f4395455ed4f83b2d25498444c939fcf77d49ec9ec83c68983e52**
## 6. What is the sha256sum of the reconstructed file?

## 7.  How many downloaded chrome extensions are not corrupted?
Đối với câu này thì em vào phần export object và lưu các file có content type là `application/x-chrome-extension` về 

![image](https://hackmd.io/_uploads/ByhN1uJpZg.png)

Vì bản chất của file `.crx` nó chỉ là một tệp nén ZIP được Google cho thêm lớp bảo mật ở bên ngoài. Em sẽ chạy script test  đọc từng file .crx dưới dạng byte thô để tìm chuỗi `PK\x03\x04` Magic bytes của định dạng ZIP giúp bỏ qua hoàn toàn chữ ký `Cr24` của Chrome Extension và phần rác HTTP phía trên. Sau đó, nó cắt lấy phần lõi từ chữ PK trở xuống, lưu thành file tạm, rồi dùng hàm `testzip()` của thư viện chuẩn để bung nén thử Nếu không báo lỗi, file đó sẽ là file kh bị corrupt
```
import glob
import zipfile
import os

print("Bắt đầu kiểm tra tính toàn vẹn của 13 files...")

for f in glob.glob("file*.crx"):
    with open(f, "rb") as file:
        data = file.read()
        
        # Tìm vị trí bắt đầu của lõi ZIP (Magic bytes: PK)
        idx = data.find(b'PK\x03\x04')
        
        if idx != -1:
            # Cắt bỏ phần rác HTTP/Cr24 ở trên và tạo file zip tạm
            with open("temp.zip", "wb") as temp:
                temp.write(data[idx:])
            
            try:
                # Dùng thư viện chuẩn để test archive
                with zipfile.ZipFile("temp.zip") as z:
                    if z.testzip() is None:
                        print(f"[+] Not Corrupted : {f}")
                    else:
                        print(f"[-] Corrupted     : {f}")
            except zipfile.BadZipFile:
                print(f"[-] Corrupted     : {f}")
        else:
            print(f"[-] Corrupted     : {f}")

# Dọn dẹp file tạm
if os.path.exists("temp.zip"):
    os.remove("temp.zip")
```
Sau khi chạy script thì em thu được 5 file là not corrupted

![image](https://hackmd.io/_uploads/ByMEfuJT-g.png)

**answer: 5**
## 8. Which packet is related to cryptomining?
Giao thức đào coin thường truyền thông tin như tên thuật toán hoặc mỏ đào dưới dạng văn bản không mã hóa nên em sẽ filter ra các packet tcp có chứa từ khóa "crypto"

![image](https://hackmd.io/_uploads/H1O97O1aWe.png)

và thu được packet là 290 
## 9. To which flow does it correspond? (PROTOCOLO FLOW_ID, e.g. UDP 0)
Em follow stream của packet đó thì thu được

![image](https://hackmd.io/_uploads/HJXu4d1TWl.png)

Vì HTTP chạy trên nên TCP nên có thể đáp án sẽ là HTTP 8 hoặc TCP 8
## 10. What is the resource name? Give the complete name (e.g. /myfile/file1/this-is-the-file?A0=something&A1=other%3d%3d).
Câu này thì nhìn vào stream của nó th

![image](https://hackmd.io/_uploads/BklZB_1aZx.png)

answer: **/filestreamingservice/files/dfeb2940-49d3-4f29-8fd8-d984a787dc6e?P1=1736222766&P2=404&P3=2&P4=H1jtSvldNZpuTpd5fP9uKkWsRR%2f5pXzccLVud6a0mJoxofqoKB34dNqF4qXGEwhkbPhjKQoon413psf1XzNktA%3d%3d**
## 11. Give the sha256 of the file related to cryptocurrency.
Em lưu stream này dưới dạng raw 

![image](https://hackmd.io/_uploads/B1LOSuka-l.png)

Sau đó em dùng cyberchef cắt header và lưu lại file hoàn chỉnh 

![image](https://hackmd.io/_uploads/Sk9crdkaZe.png)

Và em tinh sha256 của nó thì thu được đáp án:  **364dfe0f3c1ad2df13e7629e2a7188fae3881ddb83a46c1170112d8d3b5a73de**
# DFIR 3: RAMsomwhere
## 1. What is the PID of the process found in the evtx analysis?
Như ở câu 2 bài DFIR 1 thì process được tạo là **lmIcgUEQ.exe** nên em chạy plugin `pstree` và grep ra nó

![image](https://hackmd.io/_uploads/H1dblfCnZe.png)

**PID: 2240**
## 2. Which IP does not compare in the given pcap file?
Câu này thì em sẽ vào lại file pcap để xem các IPv4 trong phần conversation và đối chiếu các IP r đưa ra IP nào kh có trong đó, trong file pcap thì em thấy 

![image](https://hackmd.io/_uploads/ryWwF_yTZe.png)
![image](https://hackmd.io/_uploads/r1Nnod1pbg.png)

Sau đó em sẽ chạy plugin `windows.netscan` của vol3 để trích xuất toàn bộ danh sách các kết nối mạng và cổng đang mở (bao gồm IP, Port, và trạng thái) nó giúp chỉ ra tiến trình (PID) nào đang thực hiện kết nối, em thấy có IP này là kh khớp với file pcap

![image](https://hackmd.io/_uploads/BJYAjOya-e.png)

**answer: 127.0.0.1**
## 3. What is the name in the manifest of the chrome extension found in the pcap and not in the RAM?
Mỗi tiện ích extension của Chrome đều có 1 file  manifest.json chứa một trường có tên name với một giá trị cụ thể mô tả tên của tiện ích mở rộng Chrome, Như ở câu 7 thì em đã bt được có file `.crx` thứ `8,9,10,11,13` là kh bị corrupt, em export từng file và cat các file `manifest.json` này đối với file8 thì em có 

![image](https://hackmd.io/_uploads/r1YQCOy6Ze.png)

đối với file9

![image](https://hackmd.io/_uploads/Bkx_0OJa-x.png)

file 10

![image](https://hackmd.io/_uploads/rywc0uk6-x.png)

file 11

![image](https://hackmd.io/_uploads/rknh0uJTZl.png)

file 13 

![image](https://hackmd.io/_uploads/rkhAROJ6We.png)

Đối với file memory kia thì em sẽ dùng plugin `windows.filescan` để liệt kê tất cả các tệp đang mở tại thời điểm thu thập RAM và sau đó sử dụng `grep` để chỉ in ra các tệp `manifest.json` vì câu hỏi liên quan tới chrome extension th nên em sẽ chỉ dump các file có folder liên quan tới chrome 

![image](https://hackmd.io/_uploads/HkjYQFy6bx.png)

Sau đó em sẽ dump các file này ra

![image](https://hackmd.io/_uploads/SyTxLFk6We.png)

Sau đó em thấy nó có tất cả các manifest của file pcap trừ cái **AutofillCore** nên đây sẽ là đáp án

![image](https://hackmd.io/_uploads/ByaGLtk6-e.png)
![image](https://hackmd.io/_uploads/rJ5mLYJ6Wx.png)

**answer:** **AutofillCore** 
## 4. Give the PID of the displayed suspicious processes (do not consider does already analysed, neither their sons). If more than one put a comma (e.g. 1, 2)
Sau khi chạy plugin `pslist` thì em thấy có 2 process có tên lạ

![image](https://hackmd.io/_uploads/BkBWdFkTZl.png)

**answer: 6444, 1236**
## 5. What is the directory of the file related to process 6444? Give the complete path from the root directory to the extension. (e.g. C:\path\my\process.extension)
đối với câu này thì em chạy plugin `windows.filescan` và `grep` ra tên của file exe đó th

![image](https://hackmd.io/_uploads/rk1ZFKkT-l.png)

**answer: C:\Users\User\kOIUsMQU\MEMYUoYU.exe**
## 6. What is the directory of the file related to process 1236? Give the complete path from the root directory to the extension. (e.g. C:\path\my\process.extension)
Câu này thì làm tương tự câu trên thôii

![image](https://hackmd.io/_uploads/SySutYy6Ze.png)

**answer: C:\ProgramData\hwQkYMwk\ceIcEMkw.exe**
## 7. What is the parent PID of the malicious processes?
Sau khi chạy plugin `pslist` thì em thấy nó có cùng PPID là 4680 

![image](https://hackmd.io/_uploads/ryrM5YJTWe.png)

**answer:4680**
## 8. How many files have been encrypted? 
Đối với câu này thì em sẽ dùng plugin `malfind` nó sẽ giúp liệt kê các lệnh đáng ngờ trong quá trình thực thi

![image](https://hackmd.io/_uploads/HkTIaYypbg.png)
![image](https://hackmd.io/_uploads/H1AOTKJTZx.png)

cả hai đều mở một tệp "ZcgU.txt" bằng notepad ngay sau khi bắt đầu thực thi, sau đó em sẽ dùng plugin `filescan` để tìm ra offset của file này để dump

![image](https://hackmd.io/_uploads/Sk6V0Fkp-l.png)

Sau khi dump và cat để xem ndung bên trong thì em thấy

![image](https://hackmd.io/_uploads/SJcuAKka-e.png)

file này chứa danh sách các file nếu nhìn vào câu hỏi của câu 9 thì em thấy file này là file chứa danh sách các file bị mã hóa nên em sẽ chạy lệnh `wc` để đếm lại số dòng tương ứng với số file th

![image](https://hackmd.io/_uploads/r17J1cyTbl.png)

**answer: 288**
## 9. Give the filename of the file containing the list of the files to be encrypted. (only the filename not the whole path).
như ở câu 8 thì filename của nó là **ZcgU.txt**
## 10. Which cryptocurrency is used?
em phân tích trong output của plugin `malfind` thì thấy dòng này 

![image](https://hackmd.io/_uploads/HJpHecJTWg.png)

**answer: Bitcoin**

## 11. Which GET request is not present in the pcap? Give the whole request (METHOD resource, e.g. POST /accessed/resource)
câu này thì em grep trong output của plugin `malfind` method GET th 

![image](https://hackmd.io/_uploads/S1cyW5JpWx.png)

**answer**: **GET /maps/api/staticmap?center=32.33597550,-111.
04410110&zoom=14**	
## 12. Why did you have to pay a fine?
Đầu tiên em dùng plugin `memmap` để trích xuất vùng nhớ của của process khả nghi sau đó grep ra từ khóa của câu hỏi thôi

![image](https://hackmd.io/_uploads/B1yTmqJpbx.png)

**answer: Unauthorized or pirated software**
## 13. What is the amount of fine? (e.g. €10,000)
câu này thì em grep ra từ khóa `fine`

![image](https://hackmd.io/_uploads/S11wV9J6Zx.png)

**answer**: **$250,000**
## 14. What is the BitCoin address at charts01.bitcoincharts.com?

Câu này thì em dump vùng nhớ của pid 1236 bằng plugin `memmap` sau đó em chạy grep với link đó thì thu được

![image](https://hackmd.io/_uploads/H1gGv5JT-x.png)

**answer: 1yQBzAaZx7FojqMmTtHPTfZ42T4t6Q1Uh**
## 15. From which directory does process 6444 come from? Give only the local path with directory name (NOT the absolute path, i.e. without Desktop, e.g. mydirectory)
Plugin `handles` liệt kê các handle đang mở (tập tin, khóa registry, mutex...) được liên kết với các tiến trình trong bản ghi bộ nhớ nên em sẽ dùng plugin này cho process đó 
và thu dược

![image](https://hackmd.io/_uploads/H1cTDq1pWg.png)

**answer: ch2**
