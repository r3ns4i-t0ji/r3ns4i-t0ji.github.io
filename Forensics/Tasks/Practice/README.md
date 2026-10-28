# SIT 
Desc: When I have started my computer, my secret document is encrypted. I think I am a victim of a targeted attack
link download: https://drive.google.com/file/d/1IsUmTXV76tuO5u3CZa2Lx8cTg-6h0sN5/view
## Những gì học được từ challenge 
- Đây là Kỹ thuật Persistence thả shortcut của malware vào thư mục Startup của người dùng file bị lợi dụng là UnikeyNT, mã của nó trên Mitre Attack là:
**T1547.001:Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder**
- thuộc **T1547 - Boot or Logon Autostart Execution**. Đây là nhóm các kỹ thuật làm cho mã độc tự chạy khi hệ thống khởi động hoặc người dùng đăng nhập.
- dịch ngược file exe của application thu về code gốc python bằng tools https://github.com/extremecoders-re/pyinstxtractor để thu về bytecode sau đó dùng https://pylingual.io để thu về code python gốc 
## Writeup chi tiết
Khi đọc phần desc, vì nó nói khi khởi động máy thì tài liệu của nó đã bị mã hóa nên em sẽ check trong startup của user admin 

![image](https://hackmd.io/_uploads/ByvJTvgwZx.png)

em thấy 1 file thực thi UnikeyNT thông thường thì nó là phần mềm gõ tiếng việt thường được người dùng cho khởi động cùng máy nma khi em mở phần properties lên để check phần target thì em thấy target của nó đến 1 file tailieu lạ

![image](https://hackmd.io/_uploads/BkmKTDxP-g.png)

em copy full phần target ra notepad thì em phát hiện đường dẫn thực thi trỏ đến datahost.exe với đối số là file tailieu

![image](https://hackmd.io/_uploads/SkSCTPgvWl.png)

em đi theo đường dẫn để tìm file exe đó

![image](https://hackmd.io/_uploads/Byq9k_xwbx.png)

em tính md5sum của file này và dán lên virustotal thì thu được đây là 1 malicious file 

![image](https://hackmd.io/_uploads/HksyltlvZl.png)

em tìm hiểu được thì khi lập trình viên viết code bằng Python, họ thường dùng PyInstaller để đóng gói code .py thành một file .exe duy nhất để người dùng có thể chạy mà không cần cài đặt Python và em có tìm được 1 tool để dịch ngược quá trình này để thu về code gốc của python là tool này

https://github.com/extremecoders-re/pyinstxtractor

Sau đó em tải tool này về và dùng nó để phân tích file exe đó bên linux 

![image](https://hackmd.io/_uploads/rkhaZdeDZe.png)

Sau đó em thu được file datahost.pyc file này chứa mã nguồn Python đã được dịch sang một dạng ngôn ngữ trung gian gọi là Bytecode.

![image](https://hackmd.io/_uploads/Byocz_eDZe.png)

Tiếp theo em sẽ ném file đó lên `pylingual.io` để thu về code gốc 

![image](https://hackmd.io/_uploads/SkjCXOxwZl.png)

Sau đó em tải về file này và mở lên thì thu được code

![image](https://hackmd.io/_uploads/Hk2IEOePbl.png)

code này là một đoạn mã mã hóa file dạng ransomware nó sẽ
Lấy file đầu vào từ dòng lệnh, Dùng thuật toán AES để mã hóa nội dung, Lưu file đã mã hóa với đuôi .huhu và xóa file gốc.
`sed_ = int(os.path.getctime(filename))` hàm này lấy thời gian tạo file gốc làm hạt giống (seed) cho bộ sinh số ngẫu nhiên nên nếu biết thời gian tạo file sẽ biết chính xác trạng thái của bộ sinh số ngẫu nhiên. 
`key = SHA256.new(str(random.randint(1, 13374953)).encode('utf-8')).digest()`
Sinh một số nguyên ngẫu nhiên x trong khoảng (1, 13374953) Tạo ra key 32 bytes
`iv = MD5.new((platform.node() + '-' + os.path.dirname(os.path.abspath(filename))).encode('utf8')).digest()`
hàm này sẽ tạo iv 16 bytes từ: tên máy (Hostname) + - + Đường dẫn thư mục chứa file 
Sau đó em đi theo đường dẫn để tìm file tailieu bị mã hóa thì em thấy 1 file tailieu.huhu nghĩa là nó đã mã hóa xong r

![image](https://hackmd.io/_uploads/H1sUCwgwbe.png)

khi mở thử bằng notepad thì em thấy file này toàn ký tự được mã hóa 

![image](https://hackmd.io/_uploads/B180dulDZx.png)

Tiếp theo em sẽ decrypt để decrypt được thì em cần tìm được thời gian tạo file gốc, path, hostname của nó
Đầu tiên em sẽ dùng artifact MFT để tìm được thời gian tạo file gốc, path, em sẽ dùng MFT explorer và đi theo đường dẫn đến file đó thì thu được path và time lần lượt là  **C:\Program Files\Common Files\Microsoft Shared\TextConv**, 

**2023-08-24 17:08:53**

![image](https://hackmd.io/_uploads/Hk9aKdlD-g.png)

Sau đó em sẽ dùng artifact Computer Name(SYSTEM\CurrentControlSet\Control\ComputerName\ComputerName) để tìm hostname em mở registry explorer đi theo path và thu được host name là **KTMM**

![image](https://hackmd.io/_uploads/BkKsq_gPbe.png)

Sau đó em dùng 3 cái này để decrypt (đoạn này em nhờ AI viết code)

![image](https://hackmd.io/_uploads/ryuJiulvZx.png)
![image](https://hackmd.io/_uploads/H1rHiulvbg.png)
![image](https://hackmd.io/_uploads/rJxUjOgPWx.png)

Sau đó em chạy code

![image](https://hackmd.io/_uploads/H1-fndlvWx.png)

thì thu được 1 file pdf chứa QR 

![image](https://hackmd.io/_uploads/SJsr2_lvbe.png)

Sau đó em parse QR code trên cyberchef thì thu được

![image](https://hackmd.io/_uploads/ry1jndgDWx.png)

flag là: **{Wh3n_Pl4y1n9_CTF,_pl@Y_w1tH_4ll_Ur_h34r7}**

# Job Interview

## Những gì học được từ challenge
## Writeup chi tiết 
Khi tải challenge thì em có thu được 1 file disk sau đó em mở FTK lên, em mở file đó thì chỉ thấy có 1 file này nên em export nó ra và ném sang kali để phân tích

![image](https://hackmd.io/_uploads/SJ02VlvDbl.png)

Em có check file đó thì thấy nó là file nén tar nên em sẽ giải nén ra

![image](https://hackmd.io/_uploads/Hk75BgPD-x.png)

Sau khi giải nén thì em thu được 1 file bmc nên em sẽ dùng artifact RDP cache đề ptich

![image](https://hackmd.io/_uploads/SyZ0HevPbg.png)

Sau khi dùng bmc tools thì em thu được 

![image](https://hackmd.io/_uploads/SJjfIgDPWl.png)

Sau đó em sẽ mv ra windows r dùng RdpCacheSticher để ptich tiếp 

![image](https://hackmd.io/_uploads/H1PA8ePwbl.png)

Sau khi mở RdpCacheStitcher thì em thu được

![image](https://hackmd.io/_uploads/HJxeYlvPZx.png)

flag là: **RdP_l3av3s_Trac3S**

# Ecoji
## Những gì học được từ challenge 
- Em có đọc và tham khảo qua research của link [này](https://res260.medium.com/%EF%B8%8F-%EF%B8%8F-windows-forensics-how-to-retrieve-and-parse-the-emoji-picker-history-in-the-filesystem-d3766282325a)
- file `settings.dat` là một Registry Hive 

Nội dung chứa:
- Lịch sử sử dụng Emoji: Các emoji mà người dùng thường xuyên sử dụng hoặc mới sử dụng gần đây.

- Cấu hình Clipboard: Có thể chứa các thiết lập liên quan đến Clipboard History (Win + V), bao gồm các mục đã ghim (pinned items) hoặc dữ liệu clipboard nếu tính năng đồng bộ được bật.
- file `settings.dat` nằm ở:
**%localappdata%\Packages\InputApp_cw5n1h2txyewy\Settings (Windows 10 1809)** **%localappdata%\Packages\MicrosoftWindows.Client.CBS_cw5n1h2txyewy\Settings (Windows 10 21H1)**

link github ở [đây](https://github.com/keith-turner/ecoji) mà em tìm được dùng để encode và decode các emoji
## Writeup chi tiết 
Em sẽ đi theo 2 path ở trên và tìm file setting.dat 

![image](https://hackmd.io/_uploads/Hy9C6FZwbx.png)

Sau đó em sẽ mở registry explorer lên để phân tích file này thì thu được 2 value

![image](https://hackmd.io/_uploads/ry8LCY-wWe.png)

em tìm hiểu thì value `CategorySetMRU_CategorySet.ExpressiveEmoji.Common` lưu trữ danh sách các emoji mà người dùng mới sử dụng gần đây
còn value `CategorySetMRU_CategorySet.Kaomoji.Common` lưu lịch sử các Kaomoji mà người dùng đã sử dụng gần đây nhất 
Kaomoji: Là các biểu tượng cảm xúc dạng ký tự văn bản kiểu Nhật Bản (ví dụ: ¯\_(ツ)_/¯ , (o_o)).
Em sẽ trích xuất value data của `CategorySetMRU_CategorySet.ExpressiveEmoji.Common` này ra 

![image](https://hackmd.io/_uploads/SJiMkc-P-e.png)

Sau đó em sẽ dán lên cyberchef và decode như hướng dẫn ở research 

![image](https://hackmd.io/_uploads/S1da1q-P-l.png)

Sau khi decode thì em thu được các emoji sau: 
🧙‍♂️🍌📰🛁💅🚂🖖🐰👩🚃🍔🤛🧬🍨☕
tiếp theo em sẽ tải tool kia về và decode các emoji này 
Sau khi decode thì em thu được

![image](https://hackmd.io/_uploads/HyolmqbDbg.png)

Cuối cùng flag là: **CHH{Em0ji_f0r3n}**
# Hunter 
## Những gì học được từ challenge
- [web này](https://www.timestamp-converter.com/) dùng để convert time sang UTC 
- SID của computer nằm ở **SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList**
- Việc thực thi các công cụ như Nmap sẽ để lại artifacts trong thư mục Prefetch, giúp xác định được lịch sử thực thi (execution history) và dấu thời gian (timestamps) của ứng dụng.
- file xml của nmap là result của tool nmap   
- xem file xml bằng https://jsonformatter.org/xml-viewer
- **Skype** lưu trữ lịch sử chat cục bộ trong các file SQLite (tên là main.db) nằm ở path **C:\Users\\AppData\Roaming\Skype\\main.db**
- **Skyperious** là công cụ chuyên dùng để quản lý, xem và thao tác với cơ sở dữ liệu lịch sử chat của Skype
- file Uninstall.log cho biết chính xác thời điểm phần mềm được cài đặt (dựa trên timestamp của file log) và cấu trúc thư mục mà phần mềm đó đã tạo ra, giúp truy vết lại các thay đổi hệ thống. 
path: `C:\Program Files\<Tên_Nhà_Phát_Hành>\<Tên_Phần_Mềm>\Uninstall.log`
`C:\Program Files (x86)\<Tên_Nhà_Phát_Hành>\<Tên_Phần_Mềm>\Uninstall.log`
`C:\Users\<Tên_User_Của_Bạn>\AppData\Local\<Tên_Phần_Mềm>\Uninstall.log`
`C:\Users\<Tên_User_Của_Bạn>\AppData\Roaming\<Tên_Phần_Mềm>\Uninstall.log`
- [Jumplist](https://artifacts-kb.readthedocs.io/en/latest/sources/windows/JumpLists.html)
- Sử dụng các tools PECmd, ShellBags Explorer,JLECmd...
## Writeup chi tiết
Đầu tiên em sẽ mở FTK Imager ra để phân tích 

![image](https://hackmd.io/_uploads/B1eA49-wZl.png)

### Q1

![image](https://hackmd.io/_uploads/HJiCrqZPWl.png)

Vì câu hỏi này hỏi tới computer name nên em sẽ dùng artifact đó nằm ở **SYSTEM\CurrentControlSet\Control\ComputerName\ComputerName**  em sẽ trích hive system ra 

![image](https://hackmd.io/_uploads/HkO4BqZDWl.png)

Sau đó em sẽ load hive này trên registry explorer và đi theo path trên kết quả em thu được

![image](https://hackmd.io/_uploads/BkV6Sc-vbl.png)

### Q2

![image](https://hackmd.io/_uploads/BkiGwqZPbg.png)

câu hỏi này hỏi địa chỉ IP của máy nên em sẽ dùng artifact Network Interfaces **(SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces)** để phân tích, vì câu trc em đã trích hive system ra r nên h chỉ cần theo path th, em thu được

![image](https://hackmd.io/_uploads/ByjZViWv-g.png)

### Q3

![image](https://hackmd.io/_uploads/HylQEo-vWg.png)

em tìm được DHCP LeaseObtainedTime của nó trong artifact network interfaces là

![image](https://hackmd.io/_uploads/S1x3Xsbvbx.png)

em sẽ dùng web [này](https://www.timestamp-converter.com/) để convert time sang UTC thì thu được kết quả

![image](https://hackmd.io/_uploads/B1XRmjWPZl.png)

### Q4

![image](https://hackmd.io/_uploads/SkTCu3-D-x.png)

em tìm ở **SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList** có chứa SID của computer

![image](https://hackmd.io/_uploads/SJYfY2-DWx.png)

### Q5

![image](https://hackmd.io/_uploads/By9vF3-wZl.png)

Vì hỏi đến OS version nên em sẽ theo artifact này **OS version (SOFTWARE\Microsoft\Windows NT\CurrentVersion)** và thu được 

![image](https://hackmd.io/_uploads/ryEqY3-vZl.png)

### Q6

![image](https://hackmd.io/_uploads/Skb5n3WvWe.png)

Em sẽ đi theo artifact **Time Zone Information(SYSTEM\CurrentControlSet\Control\TimeZoneInformation)** và thu được 

![image](https://hackmd.io/_uploads/SJpm22-DWg.png)

em search Pacific Standard Time thì thu được

![image](https://hackmd.io/_uploads/B1QY3n-D-e.png)

### Q7 

![image](https://hackmd.io/_uploads/SkMAG6bwbe.png)

Vì hỏi đến tt user nên em sẽ trích hive SAM xong dùng Registry Explorer để phân tích thì em thu được Login count là 3

![image](https://hackmd.io/_uploads/SJHazpWw-e.png)

### Q8 

![image](https://hackmd.io/_uploads/B1ZYm6WPWx.png)

cũng trong hive SAM em thu được last login time của user đó 

![image](https://hackmd.io/_uploads/By5TQpWDbg.png)

### Q9

![image](https://hackmd.io/_uploads/ryG5IpbPZg.png)

- Em đọc hint thì biết được các công cụ như Nmap thường để lại dấu vết trong thư mục Prefetch

![image](https://hackmd.io/_uploads/HkTfDpWwWg.png)

Em thấy trong dir User Hunter 1 dir là zenmap em tìm hiểu thì biết được Zenmap là giao diện đồ họa người dùng (GUI - Graphical User Interface) chính thức và miễn phí của Nmap (Network Mapper) là 1 network scanner tools 

![image](https://hackmd.io/_uploads/H1KHB6-vbl.png)

Em sẽ export file này ra và dùng PECmd để phân tích thì thu được lastrun của nó là 

![image](https://hackmd.io/_uploads/By1BIa-P-e.png)

### Q10

![image](https://hackmd.io/_uploads/SJUXK6Wvbx.png)

Em có tìm thấy 1 file xml của nmap trong thư mục Desktop của user Hunter

![image](https://hackmd.io/_uploads/BkYFvpbvZl.png)

Em sẽ export file này ra và xem file xml bằng web [này](https://jsonformatter.org/xml-viewer)  

Sau khi load file thì em thu được time finish của nó là 

![image](https://hackmd.io/_uploads/SkaCO6WDbl.png)

### Q11

![image](https://hackmd.io/_uploads/Sy1l36Ww-e.png)

Em check trong phần nmap run,scaninfo thì em thấy có 1000 port được quét 

![image](https://hackmd.io/_uploads/rJfhjpZPZg.png)

### Q12

![image](https://hackmd.io/_uploads/S1WyjTWwbg.png)

Tương tự em check trong web kia phần xml tree trong host,port và state của từng port thì thấy có các port này là open 

![image](https://hackmd.io/_uploads/S1Ys96WDZe.png)

### Q13

![image](https://hackmd.io/_uploads/SyNUnp-Dbl.png)

Trong phần output thì em có tìm được 

![image](https://hackmd.io/_uploads/B1mQ26WvWl.png)

### Q14

![image](https://hackmd.io/_uploads/rJW3eC-w-e.png)

Em đọc trên web [này](https://www.bitrecover.com/blog/find-skype-chat-history-location/) thì biết được Skype chat history 
nằm ở 

![image](https://hackmd.io/_uploads/H1wyCpWwWg.png)

Em theo path và tìm được file main.db em sẽ export nó ra và dùng Skyperious 

![image](https://hackmd.io/_uploads/ryQHAaWwWx.png)

Sau khi mở Skyperious và vô phần chat thì em thu được

![image](https://hackmd.io/_uploads/BJ5s1CWwZe.png)

### Q15

![image](https://hackmd.io/_uploads/HJc8-R-PWg.png)

Trong phần chat thì em có thu được

![image](https://hackmd.io/_uploads/S1qdZ0bPWe.png)

### Q16

![image](https://hackmd.io/_uploads/HJVC-AWwbx.png)

Em check trong phần Information thì thu được

![image](https://hackmd.io/_uploads/Sks6bCWPZx.png)

### Q17 

![image](https://hackmd.io/_uploads/SyzY_A-wWl.png)

Trong phần Documents em có tìm được file pst của Outlook 

![image](https://hackmd.io/_uploads/S1MjMCZPbg.png)

Tiếp theo em sẽ dùng Kernel outlook pst viewer để xem file này thì em thấy được 1 đoạn tin nhắn này có đính kèm file kia

![image](https://hackmd.io/_uploads/HJS6wRZv-l.png)

Em vào phần trash thì thấy file đó cũng bị xóa 

![image](https://hackmd.io/_uploads/SywMOA-Pbx.png)

và file đó chứa 

![image](https://hackmd.io/_uploads/rJzvOCWPZx.png)

### Q18 

![image](https://hackmd.io/_uploads/BkV9c0bw-l.png)

Em check trong phần document thì có các file pdf 

![image](https://hackmd.io/_uploads/Bk2s9RbvZl.png)

Em export ra các file thì thấy có file Ryan_VanAntwerp_thesis.pdf nói về kỹ thuật này

![image](https://hackmd.io/_uploads/rJGT5C-vZx.png)

### Q19

![image](https://hackmd.io/_uploads/r1veCA-wWe.png)

Em tìm hiểu được thì file Uninstall.log cho biết chính xác thời điểm phần mềm được cài đặt (dựa trên timestamp của file 
log) và cấu trúc thư mục mà phần mềm đó đã tạo ra, giúp truy vết lại các thay đổi hệ thống. 
Em check trong phần Uninstalled Log thì thu được 

![image](https://hackmd.io/_uploads/r1l1nRZvZg.png)

### Q20 

![image](https://hackmd.io/_uploads/BJCR11zw-g.png)

Em sẽ dùng artifact Device Identification và tìm được 2 serial number của nó là

![image](https://hackmd.io/_uploads/HkAqRRWv-g.png)

### Q21 

![image](https://hackmd.io/_uploads/BkjZW1Gv-l.png)

![image](https://hackmd.io/_uploads/Sk-XZ1fwWg.png)

### Q22 

![image](https://hackmd.io/_uploads/SyXvzkGDWg.png)

Em sẽ export nguyên dir Prefetch ra

![image](https://hackmd.io/_uploads/HJ9pWyMvZg.png)

Tiếp theo em sẽ dùng PECmd để phân tích 

![image](https://hackmd.io/_uploads/SyJHGJMwWe.png)

kết quả em thu được 174 file 

### Q23

![image](https://hackmd.io/_uploads/ry77E1MwZl.png)

Em sẽ dùng PECmd để phân tích file prefetch này

![image](https://hackmd.io/_uploads/Hk4nM1fvZl.png)

![image](https://hackmd.io/_uploads/Hkb6QJfPZe.png)

kết quả sau khi ptich là

![image](https://hackmd.io/_uploads/ryHMN1fDbg.png)

### Q24 

![image](https://hackmd.io/_uploads/BkmPS1Mw-x.png)

Em sẽ export file này ra

![image](https://hackmd.io/_uploads/HyDPEyMwZg.png)

tiếp tục dùng PECmd để ptich 

![image](https://hackmd.io/_uploads/H112V1GvZx.png)

thì em thu được lastrun của nó là

![image](https://hackmd.io/_uploads/H1gZS1zPbx.png)

### Q25 

![image](https://hackmd.io/_uploads/B14L3yzPbl.png)

Vì nó nói 1 file .jar đã được thực thi nên em sẽ export pf của file này ra để ptich

![image](https://hackmd.io/_uploads/rkyoUJGwWg.png)

thì em thấy nó có liên quan tới 1 file burpsuit ở đây

![image](https://hackmd.io/_uploads/Bkri3yGDZl.png)

### Q26

![image](https://hackmd.io/_uploads/HJrzpJzv-x.png)

Em check trong file pst hồi nãy thì có 1 file 

![image](https://hackmd.io/_uploads/rk_Ya1fvbe.png)

### Q27

![image](https://hackmd.io/_uploads/Syq5llMv-x.png)

Em export file Urclass.dat để phân tích shellbag

![image](https://hackmd.io/_uploads/H1cVJxMDZg.png)

em tìm được 1 folder exfil trong path mà user đó đã mở 

![image](https://hackmd.io/_uploads/BJJtelGP-g.png)

### Q28 

![image](https://hackmd.io/_uploads/HJei_lMPbe.png)

Ở recyclebin thì em tìm thấy 1 ảnh là

![image](https://hackmd.io/_uploads/SkbPuxzP-g.png)

Em check trong phần Pictures thì tìm được 1 ảnh giống với 1 phần của ảnh trong recyclebin nnên ảnh này sẽ là ảnh bị xóa

![image](https://hackmd.io/_uploads/rJEr_lzDZe.png)

### Q29 

![image](https://hackmd.io/_uploads/rkgrjeGv-x.png)

![image](https://hackmd.io/_uploads/ryGToxGPbx.png)

em tìm được bài ns về question này nó nằm ở path 

**C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Recent\AutomaticDestinations**
### Q30

![image](https://hackmd.io/_uploads/SkNnTeMDbe.png)

Em export ra file đề bài nói 

![image](https://hackmd.io/_uploads/HyQknlGw-e.png)

Em sẽ dùng JLECmd để ptich

![image](https://hackmd.io/_uploads/rJ7HplzP-g.png)

và thu được path là

![image](https://hackmd.io/_uploads/r1PpaeGwWg.png)

# 2-layer security
## Những gì học được từ challenge
- kỹ thuật obfucate (làm rối mã)
- decode từ key và IV của aes và gpg 
- check zsh_history, PS history 
## Writeup chi tiết
Đầu tiên em sẽ check zsh_history của user 

![image](https://hackmd.io/_uploads/BydunGPv-x.png)

Sau khi mở lên thì em thấy nó tải các công cụ cần thiết, tạo các key GPG, Mã hóa một tài liệu  (RestrictedAccess.pdf) và 
xóa bản gốc, cố gắng tìm flag ẩn trong file mật khẩu hệ thống, che giấu file đã mã hóa bằng tên ngẫu nhiên, dọn dẹp và khởi 
động lại máy

![image](https://hackmd.io/_uploads/HygP3fPwZe.png)

Ngoài ra em thấy nó sử dụng pwsh để mở powershell nên em sẽ check trong lịch sử powershell 

![image](https://hackmd.io/_uploads/H1Q36GDvZe.png)

Em mở ra thì thấy nó đang mã hóa 1 đoạn bằng base64 

![image](https://hackmd.io/_uploads/B156TzvDbl.png)

Sau đó em sẽ giải base64 đoạn đó và thu được

![image](https://hackmd.io/_uploads/S1f5xmwwbe.png)

Em thấy lệnh iex dùng để thực thi trong powershell nên em sẽ bỏ lệnh iex và dán đoạn này và powershell để thu về source 
code, em gán vào biến $decode 

![image](https://hackmd.io/_uploads/BJ2WZmPvZe.png)

Sau đó em dùng Write-Host thì thu được

![image](https://hackmd.io/_uploads/rkmBWQPvZe.png)

xem qua đoạn code này thì em thấy nó mã hóa bằng:
Thuật toán: AES-256, Mode CBC, Padding Zeros.
Key: Tái tạo lại bằng cách SHA256 chuỗi passphrase tìm thấy trong code.
IV: Lấy 16 byte đầu của Key.
Sau khi phân tích tiếp đoạn zsh_history thì em thấy nó đổi tên file từ T3C4U.SOS thành recycle.bin và khởi động lại máy nên em thấy file bị mã hóa bằng code powershell chính là file recycle.bin ttrong Desktop
Sau đó em sẽ decrypt file recycle.bin

[image](https://hackmd.io/_uploads/H1Lv9mDDZe.png)
![image](https://hackmd.io/_uploads/Sk6t9XDD-x.png)

Sau khi decrypt thì em thấy được file đã decrypt xong sau khi mv sang kali thì em dùng file để xác định loại file thì thấy được file này là file bị mã hóa bởi PGP RSA 

![image](https://hackmd.io/_uploads/rkMfiQPvZx.png)

Sau đó em tìm trong các thư mục thì em thấy trong thư mục .gnupg chứa key để decrypt 

![image](https://hackmd.io/_uploads/rJlKs7ww-g.png)

nên em sẽ dùng gpg để decrypt và lưu ndung vào file flag


![image](https://hackmd.io/_uploads/HyBb2QDD-l.png)

sau khi dùng file để xác định thì em thấy đây là file pdf 

![image](https://hackmd.io/_uploads/S1k4n7PDZx.png)

em mv nó ra windows và mở lên thì thu được

![image](https://hackmd.io/_uploads/SkrDnXvDbg.png)

flag là: **idek{Cr34t1n9_ch4ll3ngEs_6_d4ys_6_n1gts_w1th0ut_sl33p}**

# Romcom
## Những gì học được từ challenge
- Kỹ thuật Persistence:**Boot or Logon Autostart Execution: Shortcut Modification**
- Sử dụng MFTExplorer 
- Đối chiếu timestamp
- CVE-2025-8088: Lỗ hổng tấn công vượt quyền truy cập thư mục ảnh hưởng đến phiên bản WinRAR trên Windows cho phép kẻ tấn công thực thi mã tùy ý bằng cách tạo ra các tệp lưu trữ độc hại.
## Writeup chi tiết 
### Task 1

![image](https://hackmd.io/_uploads/HkLN7MPPbx.png)

Em có search trên gg và thu được 

![image](https://hackmd.io/_uploads/SJWwmGDvbl.png)

### Task 2

![image](https://hackmd.io/_uploads/BJxkqEfDDZx.png)


Em cũng dựa trên description của lỗ hỗng đó

### Task 3 

![image](https://hackmd.io/_uploads/rksOjBDDWx.png)

Em mount file tải về lên máy

![image](https://hackmd.io/_uploads/SyyNwVvP-g.png)

Sau đó em dùng MFTExplorer để phân tích trong thư mục Documents của user susan thì thu được

![image](https://hackmd.io/_uploads/r1F_CHPw-x.png)

### Task 4


![image](https://hackmd.io/_uploads/BkH0AHPPZg.png)
![image](https://hackmd.io/_uploads/rke-yLwPbl.png)

### Task 5 

![image](https://hackmd.io/_uploads/HkUY18Pw-x.png)

![image](https://hackmd.io/_uploads/ryu9yIvvbe.png)

### Task 6 

![image](https://hackmd.io/_uploads/HklVlUPv-e.png)

![image](https://hackmd.io/_uploads/Sk1He8PPZx.png)

### Task 7


Ở thư mục C:\Users\susan\AppData\Local thì em thấy có 1 file .exe mà thời điểm file đó được tạo gần với thời điểm mà chạy file .rar kia nên em nghĩ backdoor của nó là ở đây

![image](https://hackmd.io/_uploads/BkmNGLvD-e.png)

### Task 8

![image](https://hackmd.io/_uploads/rkkJEIDPbl.png)

Vì câu hỏi có nhắc đến Persistence nên em sẽ check thử trong thư mục startup của user susan thì thu được 1 file lnk lạ

![image](https://hackmd.io/_uploads/HJ06XUPP-x.png)

### Task 9

![image](https://hackmd.io/_uploads/B13OEUDvbg.png)

Em tìm được mã mitre của nó là

![image](https://hackmd.io/_uploads/S1Ac48Dv-l.png)

### Task 10 

![image](https://hackmd.io/_uploads/S1sHHIDwbg.png)

em check trong phần Documents file pdf hồi nãy thì em thu được

![image](https://hackmd.io/_uploads/rJlOr8PPZx.png)

# Hacked
## Những gì học được từ challenge 
- Drupalgeddon (CVE-2014-3704):Kẻ tấn công đang lợi dụng tham số post_render của Drupal để chạy hàm assert (một hàm trong PHP có thể thực thi mã lệnh), từ đó chạy tiếp hàm eval() để giải mã và thực thi đoạn mã độc được mã hóa Base64
- Sử dụng Disk drill để recover các file bị xóa
- xem lại những gì có trong log của linux 

## Writeup chi tiết 
### Q1

![image](https://hackmd.io/_uploads/BJsVJPKwZx.png)

Em vào phần /etc/timezone thì thu được 

![image](https://hackmd.io/_uploads/ry681PtD-x.png)

### Q2 

![image](https://hackmd.io/_uploads/B1CckDKw-g.png)

em xem trong phần auth.log thì thu được

![image](https://hackmd.io/_uploads/rkt3yvKPZg.png)

### Q3

![image](https://hackmd.io/_uploads/HJ0JxvtwWl.png)

cũng trong phần auth.log 

![image](https://hackmd.io/_uploads/r1N-xDYDWl.png)

### Q4

![image](https://hackmd.io/_uploads/B1hUxvFD-x.png)

Em tính từ thời điểm này đến thời điểm session closed for user mail là khoảng 1 phút

![image](https://hackmd.io/_uploads/ryhClvKv-l.png)

### Q5

![image](https://hackmd.io/_uploads/SyVIWPYwZx.png)

![image](https://hackmd.io/_uploads/HJfrbPtw-e.png)

### Q6 

![image](https://hackmd.io/_uploads/HkPcbDFvbe.png)

Em thấy có khá nhiều lần passwd bị fail nên em nghĩ tới brute force

![image](https://hackmd.io/_uploads/HJckzwYvbe.png)

### Q7

![image](https://hackmd.io/_uploads/SJF8MDFP-l.png)

Em mở file export và mở file lastlog ra thì chỉ thấy có 2 địa chỉ IP 

![image](https://hackmd.io/_uploads/ByAOGwKvZl.png)

![image](https://hackmd.io/_uploads/BJJ5MwFDZx.png)

### Q8 

![image](https://hackmd.io/_uploads/H1fk4vtPZl.png)

Em vào file /etc/passwd và chỉ đếm những user kh có nologin và false thì thu được 5 user 

![image](https://hackmd.io/_uploads/B1DpmwYDZl.png)

### Q9

![image](https://hackmd.io/_uploads/BJdpnuKw-g.png)

Em sẽ export file passwd và file shadow ra

![image](https://hackmd.io/_uploads/HyrpHDFP-x.png)

Sau khi unshadow 2 file đó thì em dùng john để crack và thu được

![image](https://hackmd.io/_uploads/rJ122uKwWx.png)

### Q10 

![image](https://hackmd.io/_uploads/Bk4FqwtwWl.png)

Sau khi có quyền root thì em thấy attacker sử dụng để add user php

![image](https://hackmd.io/_uploads/Bk-n9PYP-l.png)

### Q11 

![image](https://hackmd.io/_uploads/rkN3oDFPWl.png)

Em xem trong file /etc/group và đếm thì thu được 58 

![image](https://hackmd.io/_uploads/BypTjPFv-g.png)

### Q12 

![image](https://hackmd.io/_uploads/rk8fhDFw-x.png)

Em thấy có 2 user nằm trong gr sudo nên đáp án sẽ là 2

![image](https://hackmd.io/_uploads/HkQg3vKPbx.png)

### Q13 

![image](https://hackmd.io/_uploads/B17tnPFw-l.png)

Ở file auth.log hồi nãy thì em thấy được user php nằm trong dir

![image](https://hackmd.io/_uploads/S1CP3vYw-g.png)

### Q14 

![image](https://hackmd.io/_uploads/S1HiTDYDZg.png)

![image](https://hackmd.io/_uploads/rkUc6PFP-e.png)

### Q15

![image](https://hackmd.io/_uploads/H1wk0PKDWx.png)

Em vào file bash_history của user root thì thu được

![image](https://hackmd.io/_uploads/HJKZRDKPZx.png)

### Q16 

![image](https://hackmd.io/_uploads/ry---_YDWg.png)

Em sẽ dùng disk drill để recover vì ở Q15 nó đang đứng ở thư mục tmp và xóa nên em sẽ tìm trong thư mục /tmp và thu được

![image](https://hackmd.io/_uploads/B1CMbdKD-g.png)

### Q17

![image](https://hackmd.io/_uploads/S1bgX_tw-e.png)

![image](https://hackmd.io/_uploads/rJDkX_twZx.png)

### Q18

![image](https://hackmd.io/_uploads/S1sg4_twWx.png)

Em find trong dpkg.log thì thu được

![image](https://hackmd.io/_uploads/SymAQ_YwZx.png)

### Q19

![image](https://hackmd.io/_uploads/rJj3quKvWl.png)

Ở phần auth.log thì em đã bt được địa chỉ IP của thg attacker là 192.168.210.131

![image](https://hackmd.io/_uploads/r1CGr_Fv-g.png)

nên em sẽ filter IP này trong file access.log 

![image](https://hackmd.io/_uploads/SyJ-LOtDZx.png)

Sau khi filter em tìm được 1 đoạn base64 em sẽ dán lên cyberchef decode thì em được

![image](https://hackmd.io/_uploads/SkaocOtwbx.png)

# Lucky Shot

## Những gì học được từ challenge

- attacker lợi dụng dir cron.d và chèn mã độc vào thư mục này

- attacker có thể chèn lệnh vào file .bashrc,.profile 

- phân tích auth.log, bash_history,...

- Dùng web https://cachedview.com/ để recover lại ndung của web khi web đã bị xóa 

## Writeup chi tiết 

### Task 1

![image](https://hackmd.io/_uploads/Sy6HSFFP-x.png)

Em thấy có rất nhiều lần thử passwd nên nó sẽ là bruteforce

![image](https://hackmd.io/_uploads/BkRNHFKPbx.png)

### Task 2

![image](https://hackmd.io/_uploads/HyTdg5FvZl.png)

Từ câu trên em có suy ra được IP của attacker là 192.168.161.198 sau đó em filter ra từ accepted thì thu được

![image](https://hackmd.io/_uploads/BJwnxcFvbe.png)

### Task 3

![image](https://hackmd.io/_uploads/SyHg-qKDbe.png)

cũng giống câu trên thì attacker sử dụng passwd để log vào account administrator

![image](https://hackmd.io/_uploads/HkvZ-5KwZe.png)

### Task 4

![image](https://hackmd.io/_uploads/BJbBM9KDbl.png)

Em check trong bash_history của user administrator thì thấy

![image](https://hackmd.io/_uploads/B1CmzcKDWe.png)

### Task 5

![image](https://hackmd.io/_uploads/S133M5FDbe.png)

Em check tiếp trong bash_history thì thấy

![image](https://hackmd.io/_uploads/SyOiMqYDbg.png)

### Task 6 

![image](https://hackmd.io/_uploads/r1WI75YPWx.png)

Em check tiếp thì thấy

![image](https://hackmd.io/_uploads/ry8BX5KDWg.png)

### Task 7

Từ task 1 suy ra

![image](https://hackmd.io/_uploads/S1Jb49YwWg.png)

### Task 8 

![image](https://hackmd.io/_uploads/rJArE5FPZl.png)

Trong bash_history thì em thấy nó thực thi 1 file

![image](https://hackmd.io/_uploads/HyvmVqYDZe.png)

### Task 9

![image](https://hackmd.io/_uploads/ryA0VqYwbl.png)

Em vào file hash của challenge để kiếm file script đó thì thấy 

![image](https://hackmd.io/_uploads/BJVo4qFDbl.png)

### Task 10

![image](https://hackmd.io/_uploads/HJ8Jc5tD-g.png)

Em check trong auth.log lúc nó thực thi script đó thì thấy 1 file đc chạy dưới quyền root

![image](https://hackmd.io/_uploads/H19M9ctDWg.png)

### Task 11 

![image](https://hackmd.io/_uploads/Hy3CGsKPWe.png)

khi vào file .profile của root thì em thấy có lệnh ncat trên port 9000

![image](https://hackmd.io/_uploads/SJhDzstwbl.png)

còn file .bashrc trên port 7575 

![image](https://hackmd.io/_uploads/H1k0MoYvZl.png)

### Task 12 

![image](https://hackmd.io/_uploads/SyFZBiYw-g.png)

ở file này thì em có tìm được

![image](https://hackmd.io/_uploads/rkPlBoYwbl.png)

### Task 13&14

![image](https://hackmd.io/_uploads/H1lcBstwbl.png)

Ở trong file auth.log thì em có thấy

![image](https://hackmd.io/_uploads/rk_DroFvbg.png)

### Task 15 

![image](https://hackmd.io/_uploads/rJBYOiFv-l.png)

Ở crontab file syscheck em thấy nó sử ddụng command

![image](https://hackmd.io/_uploads/rJ7nuiKDZg.png)

Đoạn mã này cứ mỗi phút một lần, kiểm tra curl, tải một đoạn mã bí mật từ Pastebin, đảo ngược nó lại, giải mã nó và chạy 
ngay lập tức với quyền root.

### Task 16

![image](https://hackmd.io/_uploads/HyDAcpFDbe.png)

Em sẽ dùng https://cachedview.com/ web này để khôi phục lại nội dung của web thu được ở Task thì thu được 1 đoạn này

![image](https://hackmd.io/_uploads/rkKNqTtwbe.png)

Sau khi dùng rev và base64 như Q15 thì em thu được 

![image](https://hackmd.io/_uploads/SkwXqTFDZl.png)



