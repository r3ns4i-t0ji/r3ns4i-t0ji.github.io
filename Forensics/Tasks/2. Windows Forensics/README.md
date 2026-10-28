# Task 2: Windows Forensics
# Windows Registry
## Lý thuyết cơ bản
link tham khảo: 
https://vi.windowsnoticias.com/Regedit%3A-H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-%C4%91%E1%BA%A7y-%C4%91%E1%BB%A7-%C4%91%E1%BB%83-l%C3%A0m-ch%E1%BB%A7-Windows-Registry/
- Windows Registry là một cơ sở dữ liệu tập trung khổng lồ và phân cấp lưu trữ tất cả các thông tin cấu hình, hệ điều hành lẫn ứng dụng, người dùng,...
- Các dữ liệu này có thể liên quan đến phần cứng, phần mềm hoặc thông tin của người dùng. Nó cũng bao gồm dữ liệu về các tệp đã sử dụng gần đây, các chương trình đã dùng, hoặc các thiết bị đã kết nối với hệ thống 
## Cấu trúc của Registry 
- Registry trên bất kỳ hệ thống Windows nào cũng chứa 5 khóa gốc bao gồm:
![image](https://hackmd.io/_uploads/Skc0t0oSbe.png)

### HKEY_CURRENT_USER: 
- chứa thư mục gốc bao gồm thông tin cấu hình của người dùng hiện đang đăng nhập. Các thư mục, screen colors, và cài đặt của Control Panel được lưu trữ ở đây. Thông tin này liên kết với user's profile. Khóa này được viết tắt là HKCU
### HKEY_USERS:
- Chứa tất cả các user profiles đang hoạt động trên máy tính. Khóa này được viết tắt là HKU
### HKEY_LOCAL_MACHINE:
- Chứa thông tin cấu hình đặc thù của máy tính của bất kỳ người dùng nào. Khóa này được viết tắt là HKLM

### HKEY_CLASSES_ROOT:
- Đây là 1 khóa con của **HKEY_LOCAL_MACHINE\Software**. Thông tin được lưu trữ ở đây đảm bảo rằng chương trình chính xác sẽ được mở khi mở một tệp bằng Windows Explorer. Khóa này được viết tắt là HKCR 
- Khóa này cung cấp 1 chế độ xem của registry kết hợp thông tin từ hai nguồn này:
#### - HKEY_LOCAL_MACHINE\Software\Classes: 
- chứa các cài đặc mặc định có thể áp dụng cho tất cả người dùng trên máy tính cục bộ  
#### - HKEY_CURRENT_USER\Software\Classes: 
- có các cài đặt ghi đè lên các cài đặt mặc định và chỉ áp dụng cho interactive user
### HKEY_CURRENT_CONFIG:
- chứa thông tin về cấu hình phần cứng được máy tính cục bộ sử dụng khi khởi động hệ thống
## Các hive quan trọng (Registry Hive)
- Nếu chỉ có quyền truy cập vào disk image, phải biết rõ vị trí của các nhánh Registry trên disk. Phần lớn các nhánh nằm trong thư mục **C:\Windows\System32\Config**
### DEFAULT (HKEY_USERS\DEFAULT)
- Nhánh này lưu trữ cấu hình mặc định cho người dùng mới khi họ đăng nhập vào hệ thống lần đầu, tức là khi một tài khoản người dùng mới được tạo và đăng nhập, Windows sẽ sao chép các thiết lập từ nhánh để tạo user profile trong HKEY_CURRENT_USER
- Nó chứa thiết lập các giao diện mặc định, cấu hình cho các ứng dụng, bàn phím, chuột, ngôn ngữ,....
- Ứng dụng: phân tích cấu hình mặc định của hệ thống, phát hiện dấu vết truy cập từ màn hình khóa, tìm dấu vết của keylogger hoặc persistence, xác định các tài khoản bị ảnh hưởng,...
### SAM (HKEY_LOCAL_MACHINE\SAM)
- SAM là viết tắt của Security Account Manager. Nhánh registry này chứa cơ sở dữ liệu người dùng của Windows bao gồm:
- Tên người dùng (username), SID(Security Identifier), Hash mật khẩu (được mã hóa và bảo vệ), thông tin nhóm (group membership)
- Ứng dụng: xác định tài khoản admin, tài khoản ẩn, hoặc tài khoản bị tạo trái phép, trích xuất hash,...
### SECURITY (HKEY_LOCAL_MACHINE\Security)
- Là nơi Windows lưu trữ các chính sách bảo mật của hệ thống và thông tin liên quan đến quyền truy cập
- Chứa thông tin về Local Security Authority (LSA) như system security policy, thông tin đăng nhập, quyền truy cập tài nguyên
 **Các khóa quan trọng**:
- **Policy\Secrets**: chứa thông tin nhạy cảm như service password, cached credentials, RDP credentials
- **Policy\Accounts**: chứa thông tin về passwd policy, như độ dài tối thiểu, thời gian hết hạn, số lần đăng nhập sai cho phép
- Ứng dụng: Trích xuất mật khẩu đã lưu trong Policy\Secrets, phân tích sec policy, tìm dấu vết persistence,..
### SOFTWARE (HKEY_LOCAL_MACHINE\Software)
Đây là nơi chứa:
- Cấu hình hệ điều hành: phiên bản Windows, thời gian cài đặc, product key,..
- Thông tin các ứng dụng đã cài đặt: tên phần mềm, phiên bản, đường dẫn,...
- Thông tin người dùng và quyền truy cập
- Dấu vết hoạt động của phần mềm: lần chạy cuối, đường dẫn thực thi, cấu hình khởi động
- Ứng dụng: Dò tìm malware, phân tích persistence, tìm dấu vết hành vi, lịch sử truy cập, file gần đây
### SYSTEM (HKEY_LOCAL_MACHINE\System)
 - Chứa thông tin về các driver đã cài, thiết bị phần cứng, thiết lập mạng,...
 - Lưu các thông tin về các ổ đĩa đã từng được mount vào hệ thống
 - Ứng dụng: Phân tích persistence, xác định các thiết bị đã kết nối, thời gian khởi động gần nhất, trích xuất hashkey,...
 ### Các hive khác:
 #### - NTUSER.DAT (HKEY_CURRENT_USER)
 - Là nơi chúa cấu hình cá nhân, lịch sử hoạt động của user đó,...
 - nằm trong thư mục: **C:\User\username\NTUSER.DAT**
 #### - USRCLASS.DAT (HKEY_CURRENT_USER\Software\CLASSES)
- chứa giao diện người dùng (UI) và các hành vi tương tác với hệ thống
- nằm trong thư mục: **C:\Users\<username>\AppData\Local\Microsoft\Windows**
#### - Ampache Hive (C:\Windows\AppCompat\Programs\Amcache.hve)
- hive này dùng để lưu các thông tin về các chương trình đã được chạy gần đây trên hệ thống
### Thu thập dữ liệu để phân tích
- Sau khi tìm hiểu các hive ở trên chúng ta có thể trích xuất ra các artifact cần phân tích trong ổ đĩa bằng cách dùng các công cụ như Autopsy, FTK Imager,...
# Bài lab windows forensic 1 (THM)
link https://tryhackme.com/room/windowsforensics1
- mấy ảnh của artifact em lấy trong lab luôn ạ
## Các artifact được liệt kê trong lab
### OS version (SOFTWARE\Microsoft\Windows NT\CurrentVersion)
![image](https://hackmd.io/_uploads/rkAQehErZe.png)
Chứa các thông tin quan trọng như:
- ProductName: Tên hệ điều hành
- CurrentVersion: Phiên bản chính
- CurrentBuild: Số Build của hệ điều hành
- ReleaseID: Mã phát hành
- EditionID: Phiên bản cụ thể(Pro,Home,..)
- InstallDate: Thời điểm hệ điều hành được cài đặt
- RegisteredOwner: Tên người dùng đăng ký
- SystemRoot: đường dẫn thư mục hệ điều hành
- Ứng dụng: Xác định hệ điều hành đang chạy, so hkhopws thời gian cài đặt OS, phân biệt máy thật hay máy ảo,...
### Current Control Set (HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet)
![image](https://hackmd.io/_uploads/rJrve2EH-g.png)

Các hive chứa dữ liệu cấu hình của máy được sử dụng để điều khiển quá trình khởi động của hệ thống. Chúng ta sẽ thấy hai Control Sets, ControlSet001 và ControlSet002, trong nhánh SYSTEM trên một máy. Trong hầu hết các trường hợp (nhưng không phải lúc nào cũng vậy), ControlSet001 sẽ trỏ đến Control Set mà máy đã khởi động cùng, và ControlSet002 sẽ là last know good configuration.
Chứa các thông tin quan trọng như:
- Services: Danh sách tất cả các driver và service được cấu hình để chạy
- Control: Cấu hình hệ thống như thời gian khởi động, chế độ khởi động, cấu hình mạng
- Enum: Danh sách thiết bị phần cứng đã được phát hiện
- Hardward profiles: cấu hình phần cứng theo từng user profile
- Ứng dụng: Phân tích service và driver đang chạy, xác định thiết bị phần cứng đã kết nối(Enum\USBSTOR), xác định thời gian khởi động gần nhất,...
### Computer Name (HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\ComputerName\ComputerName)
![image](https://hackmd.io/_uploads/SJB_l3EBWx.png)
- Là tên định danh của máy tính trong hệ thống Windows
Nó được dùng để:
- Xác định máy trong mạng nội bộ (LAN)
- Đảm bảo đang làm việc trên đúng máy cần thiết
### Time Zone Information (HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation
)
![image](https://hackmd.io/_uploads/HJIKl34BWe.png)
Đây là nơi Windows lưu trữ thông tin về múi giờ hiện tại của hệ thống, giúp chúng ta hiểu được trình tự thời gian của các sự kiện đã xảy ra
- TimeZoneKeyName: Tên múi giờ hiện tại
- Bias: Độ lệch theo phút giữa giờ địa phương và UTC
- StandardName: Tên múi giờ chuẩn
- ....
- Ứng dụng: Xác định múi giờ hệ thống, phát hiện thay đổi múi giờ bất thường
### LastUsedUsername in **(SOFTWARE/Microsoft/Windows NT/CurrentVersion/Winlogon)**
### User in disk (Microsoft/Windows NT/CurrentVersion/ProfileList)
### Network Interfaces and Past Networks:
#### Network Interfaces (SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces)
![image](https://hackmd.io/_uploads/r1Yqg2NBWg.png)

Mỗi giao diện được biểu thị bằng một khóa con định danh duy nhất (GUID), chứa các giá trị liên quan đến cấu hình TCP/IP của giao diện. Khóa này sẽ cung cấp cho chúng ta thông tin như địa chỉ IP, địa chỉ IP DHCP và Subnet Mask, máy chủ DNS, và nhiều hơn nữa
#### Past Networks (SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Unmanaged)(SOFTWARE\Microsoft\Windows NT\CurrentVersion\NetworkList\Signatures\Managed)
![image](https://hackmd.io/_uploads/SJIjehVrWe.png)
- Artifact này chứa thông tin về các mạng đã kết nối trước đó cũng như thời điểm kết nối lần cuối. Thời gian ghi cuối cùng của khóa registry cho biết thời điểm các mạng này được kết nối lần cuối.
### Processor Architecture (SYSTEM/ControlSet001/Control/Session Manager/Environment/)
### Autostrart Programs (Autoruns)
- Các đường dẫn:

 **NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Run**

**NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\RunOnce**

**SOFTWARE\Microsoft\Windows\CurrentVersion\RunOnce**

**SOFTWARE\Microsoft\Windows\CurrentVersion\policies\Explorer\Run**
**Users\ ... \AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup**
**SOFTWARE\Microsoft\Windows\CurrentVersion\Run** 
![image](https://hackmd.io/_uploads/Bk4TW3Erbx.png)
- Artifact này chauws thông tin về chương trình hoặc lệnh được chạy khi người dùng đăng nhập
### SAM hive and user information(SAM\Domains\Account\Users)
![image](https://hackmd.io/_uploads/HJL_G34BWe.png)

- Artifact này chauws thông tin người dùng, thông tin đăng nhập và thông tin nhóm
- Thông tin được lưu trữ ở đâyy bao gồm cácc mã định danh (RID) của người dùng, số lần người dùng đăng nhập vào, lần gần nhất đăng nhập, lần gần nhất đăng nhập thất bại, lần gần nhất mật khẩu được thây đổi, thời hạn hết hạn mật khẩu, password policy và password hint, và bất kỳ nhóm nào mà người dùng là thành viên
### Recent Files (NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs)
![image](https://hackmd.io/_uploads/BJrt4nNHWx.png)
- Chứa danh sách các tệp được sử dụng gần đây
- có các khóa khác nhau với các phần mở rộng tệp, chẳng hạn như .pdf, .jpg, .docx,... Các khóa này cung cấp cho chúng ta thông tin về các tệp được sử dụng gần đây nhất có phần mở rộng tệp cụ thể
### Office Recent Files
- Giống với recent files, nhưng đây là danh sách các tài liệu đã mở gần đây của Microsoft office nằm trong đường dẫn:
**NTUSER.DAT\Software\Microsoft\Office\VERSION**
- Bắt đầu từ Office 365, Microsoft liên kết vị trí lưu trữ với ID người dùng hiện tại. Trong trường hợp này, các tệp gần đây có thể được tìm thấy tại vị trí sau:
**NTUSER.DAT\Software\Microsoft\Office\VERSION\UserMRU\LiveID_####\FileMRU**
- Ứng dụng: xem các file trong office đã mở gần đây,em có xuất cái NTUSER.DAT của em ra để phân tích nma vì em ch có bản quyền của Microsoft office ở phần Name của file nó kh hiện ạ
![image](https://hackmd.io/_uploads/BkRykHkI-l.png)

### ShellBags, User artifacts in Explorer
- Dùng để ghi lại thông tin về cách người dùng đã mở và xem các thư mục trong File Explorer, lưu trữ thông tin về cách hiển thị thư mục (view mode, kích thước, vị trí cửa sổ, icon, sort order…) nằm trong các đường dẫn:
**USRCLASS.DAT\Local Settings\Software\Microsoft\Windows\Shell\Bags**

**USRCLASS.DAT\Local Settings\Software\Microsoft\Windows\Shell\BagMRU**

**NTUSER.DAT\Software\Microsoft\Windows\Shell\BagMRU**

**NTUSER.DAT\Software\Microsoft\Windows\Shell\Bags**
- Công cụ có thể sử dụng để phân tích sâu hơn là ShellBags Explorer của Eric Zimmerman VD:
![image](https://hackmd.io/_uploads/Syf68hVrZx.png)

Khi người dùng gõ từ khóa vào thanh tìm kiếm của File Explorer, Windows lưu lại lịch sử này trực tiếp vào `NTUSER.DAT` tại khóa:

Đường dẫn Registry:
**HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\WordWheelQuery**
### Open/Save and LastVisited Dialog MRUs
- Khi chúng ta mở hoặc lưu một tập tin, một hộp thoại sẽ hiện ra hỏi chúng ta muốn lưu hoặc mở tập tin đó ở đâu. Có thể bạn sẽ nhận thấy rằng một khi chúng ta mở/lưu một tập tin ở một vị trí cụ thể, Windows sẽ ghi nhớ vị trí đó. Điều này có nghĩa là chúng ta có thể tìm ra các tập tin được sử dụng gần đây nếu chúng ta có được thông tin này, nằm ở các vị trí sau:
 
 **NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\OpenSavePIDlMRU**
 **NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVisitedPidlMRU**
Ví dụ:
![image](https://hackmd.io/_uploads/HJ9pP24SWl.png)
### Windows Explorer Address/Search Bars
- xác định hoạt động gần đây của người dùng: xem các đường dẫn được nhập vào thanh địa chỉ của Windows Explorer hoặc các tìm kiếm được thực hiện. Các đưuognf dẫn: 
 
**NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\TypedPaths**
![image](https://hackmd.io/_uploads/Bkb8OhNHWl.png)
**NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\WordWheelQuery**
### UserAssist
- chứa thông tin về các chương trình đã khởi chạy, thời gian khởi chạy và số lần chúng được thực thi, chứa đường dẫn cụ thể
- nằm trong đường dẫn:
**NTUSER.DAT\Software\Microsoft\Windows\Currentversion\Explorer\UserAssist\{GUID}\Count**
- Dùng registry explorer:

![image](https://hackmd.io/_uploads/HyQdth4SZl.png)
### ShimCache
- sử dụng để theo dõi khả năng tương thích của ứng dụng với hệ điều hành và theo dõi tất cả các ứng dụng được khởi chạy trên máy, đảm bảo khả năng tương thích ngược của các ứng dụng, lưu trữ tên tệp, kích thước tệp và thời gian sửa đổi cuối cùng của các tệp thực thi
-  nằm ở vị trí:
**SYSTEM\CurrentControlSet\Control\Session Manager\AppCompatCache**
- Công cụ sử dụng: AppCompatCache Parser dùng để phân tích dữ liệu và xuất ra một tệp CSV, Cuối cùng là dùng EZViewer để xem thông tin 
- Cách dùng trên cmd/powershell:
**AppCompatCacheParser.exe --csv (Đường dẫn đến thư mục lưu)  -f (Đường dẫn đến thư mục chứa file)** 
VD: Em trích xuất file SYSTEM từ máy em và pphân tích
![image](https://hackmd.io/_uploads/HJNNIznH-e.png)
trong đay chứa các thông tin nêu ở trên 
### AmCache
- tương tự như Shimcache nhưng lưu trữ thêm dữ liệu liên quan đến quá trình thực thi chương trình. Dữ liệu này bao gồm đường dẫn thực thi, thời gian cài đặt, thực thi và xóa, cũng như mã băm SHA1 của các chương trình đã thực thi. Đường đẫn:
**C:\Windows\appcompat\Programs\Amcache.hve**
- Thông tin về các chương trình được thực thi gần đây nhất có thể được tìm thấy tại vị trí sau trong thư mục hive:
**Amcache.hve\Root\File\{Volume GUID}\...**
- Phân tích bằng registry explorer
![image](https://hackmd.io/_uploads/SkPQn2VBWg.png)
### BAM/DAM
- Trình giám sát hoạt động nền (Background Activity Monitor - BAM) theo dõi hoạt động của các ứng dụng chạy ngầm. Tương tự, Trình điều chỉnh hoạt động máy tính để bàn (Desktop Activity Moderator - DAM) là một phần của Microsoft Windows giúp tối ưu hóa mức tiêu thụ điện năng của thiết bị
- các vị trí sau chứa thông tin liên quan đến BAM và DAM. Vị trí này chứa thông tin về các chương trình được chạy lần cuối, đường dẫn đầy đủ và thời gian thực thi lần cuối: 
 **SYSTEM\CurrentControlSet\Services\bam\UserSettings\{SID}**
**SYSTEM\CurrentControlSet\Services\dam\UserSettings\{SID}**
- Phân tích bằng registry explorer:
 ![image](https://hackmd.io/_uploads/HyArp2NrZl.png)
### Device identification
- theo dõi các USB được cắm vào hệ thống. Các vị trí này lưu trữ mã nhà cung cấp, mã sản phẩm và phiên bản của thiết bị USB được cắm vào và có thể được sử dụng để xác định các thiết bị riêng biệt. Các vị trí này cũng lưu trữ thời gian các thiết bị được cắm vào hệ thống
**SYSTEM\CurrentControlSet\Enum\USBSTOR**
**SYSTEM\CurrentControlSet\Enum\USB**
VD: em load thử hive SYSTEM ttrên máy em và thu được
![image](https://hackmd.io/_uploads/ByU1wz3HZe.png)
Trong này chứa các thông tin đã nêu trên
### First/Last Times
- theo dõi thời điểm thiết bị được kết nối lần đầu, lần cuối và lần cuối thiết bị được gỡ bỏ khỏi hệ thống. Vi du:
**SYSTEM\CurrentControlSet\Enum\USBSTOR\Ven_Prod_Version\USBSerial#\Properties\{83da6326-97a6-4088-9453-a19231573b29}\####**
- '####' có thể là 0064: thời điểm kết nối đầu tiên; 0066: thời điểm kết nối cuối cùng, 0067: thời điểm loại bỏ gần nhất
- Ví dụ: Ta có thể đi theo đường dẫn và xem được thời điểm kết nnối cuối cùng  của thiết bị nằm ttrongthuw mục 0066 
![image](https://hackmd.io/_uploads/HJU5URoHbe.png)

### USB device Volume Name(SOFTWARE\Microsoft\Windows Portable Devices\Devices)
- Chúng ta có thể so sánh GUID mà chúng ta thấy ở đây với ID ổ đĩa mà chúng ta thấy trên các khóa được đề cập trong phần device identification để đối chiếu tên với các thiết bị duy nhất
![image](https://hackmd.io/_uploads/HynCbpNSbe.png)
## Writeup chi tiết
### Task 1: Introduction to Windows Forensics
![image](https://hackmd.io/_uploads/BJqWQaEr-x.png)
để trả lời câu hỏi này thì cần đọc dữ liệu từ đây 
![image](https://hackmd.io/_uploads/SkYNma4rWe.png)
### Task 2: Windows Registry and Forensics
![image](https://hackmd.io/_uploads/HkJDmpErZx.png)
dữ liệu được lấy từ đây
![image](https://hackmd.io/_uploads/Hy3KXpVr-l.png)
### Task 3: Accessing registry hives offline
 ![image](https://hackmd.io/_uploads/rJF2maVHZe.png)
 câu trả lời ![image](https://hackmd.io/_uploads/Hy4R764BWe.png)
![image](https://hackmd.io/_uploads/S1ZkVaEr-x.png)
câu trả lời
![image](https://hackmd.io/_uploads/rJ7gNaNHWl.png)
### Task 4: Data Acquisition
![image](https://hackmd.io/_uploads/rkpG464r-l.png)
### Task 5: Exploring Windows Registry
![image](https://hackmd.io/_uploads/BJVEVTErbe.png)
### Task 6: System Information and System Accounts
![image](https://hackmd.io/_uploads/H1X8N6NBZe.png)
vì câu hỏi gợi ý đến currentbuildnumber nên ta sẽ chú ý tới artifact os version
trong ảnh này có chứa dữ liệu mà ta cần
![image](https://hackmd.io/_uploads/H1-q4TESZl.png)
![image](https://hackmd.io/_uploads/B1A94aVBbl.png)
Chú ý tới artifact Current control Set
![image](https://hackmd.io/_uploads/S1iREaNSZl.png)
![image](https://hackmd.io/_uploads/ByNxraES-l.png)
chú ý tới artifact Computer Name 
![image](https://hackmd.io/_uploads/rkcWrT4SZe.png)
![image](https://hackmd.io/_uploads/HJBzSpVSWx.png)
chú ý tới artifact Timezone information, trong phần timezonkeyname
![image](https://hackmd.io/_uploads/SJLBBpVSWx.png)
![image](https://hackmd.io/_uploads/S18USpESZl.png)
chú ý tới artifact network interfaces chứa DhcpIPaddress 
![image](https://hackmd.io/_uploads/BJxtB6Er-l.png)
![image](https://hackmd.io/_uploads/rJJoHaEBWe.png)
chú ý tới artifact SAM hive and user information username guest
![image](https://hackmd.io/_uploads/Bk0nB64Sbe.png)
### Task 7: Usage or knowledge of files/folders
![image](https://hackmd.io/_uploads/SyByLTEBZl.png)
chú ý tới artifact recentfiles chứa target name và opened on 
![image](https://hackmd.io/_uploads/rykMLpESZx.png)
![image](https://hackmd.io/_uploads/BkxQ86EHbe.png)
chú ý tới artifact shellbags khi phân tích bằng shellbagss explorer chứa last interacted
![image](https://hackmd.io/_uploads/r18U8pVBWx.png)
![image](https://hackmd.io/_uploads/BybPUpVSbe.png)
chú ý tới artifact Open/Save and LastVisited Dialog MRUs chứa đường dẫn cụ thể tới chuong trình được thực thi
![image](https://hackmd.io/_uploads/rkb9UpNSbg.png)
![image](https://hackmd.io/_uploads/S1_qL6NBZe.png)
trong artifact trên cũng chứa thời điểm mà file này được mở
### Task 8: Evidence of Execution
![image](https://hackmd.io/_uploads/r1M0U6VS-l.png)
chú ý tới artifact UserAssist có chứa số lần thực thi 
![image](https://hackmd.io/_uploads/ByNePT4rZl.png)
![image](https://hackmd.io/_uploads/rylWDaEBbl.png)
dữ liệu được lấy từ đây
![image](https://hackmd.io/_uploads/rJxGP6NHbg.png)
![image](https://hackmd.io/_uploads/r10fwpEHWe.png)
dữ liệu được lấy từ đây
![image](https://hackmd.io/_uploads/H18NPp4SWe.png)
![image](https://hackmd.io/_uploads/ryp4w64rWx.png)
dữ liệu được lấy từ đây
![image](https://hackmd.io/_uploads/HJD8Dp4HZe.png)
### Task 9: External Devices/USB device forensics
![image](https://hackmd.io/_uploads/HJ9YD6EBZl.png)
trong artifact device identification có chứa dữ liệu này
![image](https://hackmd.io/_uploads/SJR3waEBWg.png)
![image](https://hackmd.io/_uploads/r1TaD6Nr-g.png)
trong artifact trên cũng chứa dữ liệu này
![image](https://hackmd.io/_uploads/SJPJdaNBZx.png)
trong artifact USB device Volume Name có chứa dữ liệu này
![image](https://hackmd.io/_uploads/HkbZdp4BWl.png)
### Task 10: Hands-on Challenge
![image](https://hackmd.io/_uploads/ryOLq64SZl.png)
đối với câu hỏi này em sẽ dùng registry explorer để phân tích từ artifact SAM hive and user information
![image](https://hackmd.io/_uploads/SJ9n9pES-l.png)
![image](https://hackmd.io/_uploads/r1ks2TNSbl.png)
có 3 username
![image](https://hackmd.io/_uploads/B1pGaTVHWx.png)
em check trong phần last login time thì user thm-use2 kh có dữ liệu nên user này là user ch bao h đăng nhập vào
![image](https://hackmd.io/_uploads/rkFH66ESWl.png)
![image](https://hackmd.io/_uploads/rJKTTTVrbx.png)
check trong cột password hint 
![image](https://hackmd.io/_uploads/rye1RpNBWl.png)
![image](https://hackmd.io/_uploads/rkVybC4SZe.png)
vì câu hỏi này file đó được truy cập vào lúc nào nên em sẽ chú ý tới artifact Recent Files nằm trong đường dẫn
(NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs)
em sẽ dùng registry explorer load hive NTUSER.DAT 
![image](https://hackmd.io/_uploads/BkTNJCVB-x.png)
đi theo đường dẫn trên thì ta thấy file changelog.lnk last open vào lúc 2021-11-24 18:18:48
![image](https://hackmd.io/_uploads/BkJzlAVB-g.png)
![image](https://hackmd.io/_uploads/SyuvfRNS-e.png)
em sẽ check trong artifact UserAssist(NTUSER.DAT\Software\Microsoft\Windows\Currentversion\Explorer\UserAssist{GUID}\Count)
![image](https://hackmd.io/_uploads/r1y7GRNSZx.png)
![image](https://hackmd.io/_uploads/BkFr404SWg.png)
em sẽ load hive system và check artifact First/Last Times nằm trong đường dẫn
**SYSTEM\CurrentControlSet\Enum\USBSTOR\Ven_Prod_Version\USBSerial#\Properties{83da6326-97a6-4088-9453-a19231573b29}####**
vì câu hỏi là last connected nên em sẽ check trong thư mục 0066  và được kết quả là
![image](https://hackmd.io/_uploads/S1B4VAEBZe.png)
# Các artifact khác
## Notification Windows artifacts
`\Users\<Username>\AppData\Local\Microsoft\Windows\Notifications` là nơi hệ điều hành Windows lưu trữ cơ sở dữ liệu và dữ liệu tạm thời liên quan đến **Action Center** (Trung tâm thông báo) và các **thông báo ứng dụng** (Toast Notifications).
- `wpndatabase.db`: Đây là tệp cơ sở dữ liệu SQLite quan trọng nhất trong thư mục này. Nó chứa toàn bộ lịch sử thông báo, danh sách ứng dụng được phép gửi thông báo, nội dung văn bản của thông báo, thời gian xuất hiện (timestamps), và các liên kết/hành động liên quan.

## Windows Mail artifacts
[url](https://boncaldoforensics.wordpress.com/2018/12/09/microsoft-hxstore-hxd-email-)
Bài nghiên cứu này nói về `HxStore.hxd`, một artifact liên quan đến dữ liệu email của Windows Mail/Outlook trên Windows 10:
**C:\Users\<Username>\AppData\Local\Packages\microsoft.windowscommunicationsapps_8wekyb3d8bbwe\LocalState\HxStore.hxd**
| Artifact                     | Có trong HxStore.hxd? | Ý nghĩa forensic                                     |
| ---------------------------- | --------------------- | ---------------------------------------------------- |
| **Email subject**            | ✅                     | Tiêu đề email/thread                                 |
| **Email body**               | ✅                     | Nội dung email, thường có thể recover gần như đầy đủ |
| **Conversation/thread**      | ✅                     | Các email trong cùng một conversation                |
| **Timestamp**                | ✅                     | Thời gian liên quan đến message                      |
| **Một phần metadata email**  | Có khả năng           | Xuất hiện xen kẽ trong cấu trúc dữ liệu              |
| **Deleted/previous content** | Có khả năng           | Cần phân tích sâu hơn để xác định                    |
| **Raw binary/unused data**   | ✅                     | Có rất nhiều vùng dữ liệu chưa được giải mã/hiểu rõ  |

Điểm rất đáng chú ý là tác giả phát hiện chuỗi `@body` có thể dùng như một signature để tìm trực tiếp tới các email message trong file. Ngay sau `@body` thường có subject rồi đến nội dung message.
![image](https://hackmd.io/_uploads/Hy1xV_gvMx.png)


## Event Logs
### Lý thuyết
- ghi lại các sự kiện được tạo ra bởi hệ điều hành, các ứng dụng đã cài đặt và các quy trình bảo mật.
- Có thể xem event logs bằng Event Viewer
![image](https://hackmd.io/_uploads/B1lHL0NSWl.png)
Level: mức độ nghiêm ttrọng của logs: có thể chứa  Information, Warning, Error, Critical, Verbose
Date and time: ngày và giờ xảy ra
Source: driver,software hoặc thành phần nào đó của hệ thống gây ra
Event ID: 1 số xác định loại event
Phần detail ở phía dưới cho phép xem dữ liệu thô của event ở các định dạng:
- Friendly view: có cấu trúc, dễ đọc
- XML View: Dữ liệu XML thô để truy cập bằng lập trình hoặc phân tích tự động
### Các loại event log
**Application**: Ghi lại các sự kiện từ phần mềm được cài đặt trên máy tính cục bộ. Ví dụ: nếu Microsoft Word không mở được tệp bị hỏng, nhật ký Ứng dụng sẽ ghi lại tên ứng dụng và chi tiết lỗi.
**Security**: Lưu trữ các sự kiện dựa trên system's security policies. Chúng bao gồm các lần đăng nhập và truy cập tài nguyên. Ví dụ: ID event 4625 được ghi lại khi người dùng không đăng nhập được do thông tin đăng nhập không chính xác
**Setup**: Chứa các evnett liên quan đến quá trình thiết lập và cài đặt Windows. Ví dụ ID event 4902 được ghi lại khi cài đặt Windows Firewall được cập nhật
**System**: Ghi lại các sự kiện liên quan đén thành phần hệ thống Windows, chẳng hạn như trạng thái của device driver hoặc services. Ví dụ ID event 7026 được ghi lại khi device driver không tải được trong quá trình khởi động
**Forwarded Events**: Thu thập các event từ máy khác trên cùng mạng thông qua event subsrciptions. Ví dụ: Nhiều máy chủ có thể chuyển tiếp security logs đến máy trạm của quản trị viên để xem xét
### Windows Event Severity Levels
Mỗi event được gán 1 mức độ nghiêm trọng để chỉ ra tầm quan trọng của nó:
- Information: event có mục này cho biết trạng thái bình thường và event xảy ra mà không có sự cố nào. Ví dụ: information event dựa trên hệ thống là ID event 6013, báo cáo thời gian hoạt động của hệ thống
- Verbose: 1 verbose event có thể mô tả chi tiết từng bước trong quá trình cập nhật Windows. Nó chứa thông tin cấp thấp, tuy nhiên nó có thể hữu ích cho việc khắc phục sự cố và chẩn đoán trong các trường hợp cụ thể
- Warning: Có 1 sự cố tiềm ẩn và nó có thể cần sự chú ý. Ví dụ ID event 51 được ghi lại khi Windows phát hiện ra sự chậm trễ tiềm ẩn trong việc ghi dữ liệu vào đĩa
- Error: Event này cho biết 1 thao tác đã thất bại, nhưng hệ thống vẫn có thể hoạt động. Ví dụ: ID event là 7000 xảy ra khi hệ thống Windows không khởi động được. Một số event error cần được chú ý khẩn cấp, trong khi những event khác không cần được giải quyết ngay lập tức
- Crictical: khi 1 event crictical xuất hiện, điều đó có nghĩa là có 1 sự cố nnghiêm trọng gây ra lỗi lớn. Ví dụ, ID event 1001 được ghi lại khi hệ thống gặp lỗi nghiêm trọng và tạo ra 1 crash dump file
### Ứng dụng
Challenge 
![image](https://hackmd.io/_uploads/B1UxtjjHZe.png)
1. liên quan tới Event ID 1033: Installation
2. liên quan tới Event ID 4657: Regítry Change
3. liên quan tới Event ID 1074: Shutdown
Filter từng Event ID này ra
![image](https://hackmd.io/_uploads/H1G85soH-l.png)
![image](https://hackmd.io/_uploads/Skp8xrk8Wl.png)
![image](https://hackmd.io/_uploads/BJVAxr1LZg.png)
khi xem phần general của phần event thu được các đoạn base64 nằm trong
![image](https://hackmd.io/_uploads/rkrZZr18Zg.png)
![image](https://hackmd.io/_uploads/HymyMHJUbg.png)
![image](https://hackmd.io/_uploads/S1ZffHyUZe.png)
Khi decode thì ta thu được
![image](https://hackmd.io/_uploads/HyhPfSJIbe.png)
## prefetch(C:\Windows\Prefetch\)
### Lý thuyết
- xác định ứng dụng nào đã được chạy, thời điểm chúng được thực thi, tần suất sử dụng và thậm chí cả các tệp và thư mục mà chúng đã truy cập
- Khi 1 chương trình được khởi chạy lần đầu tiên, Windows sẽ tạo ra 1 tệp .pf(Prefetch) cho chương trình đó
Mỗi tập tin .pf chứa:
- Tên và đường dẫn của ứng dụng đã được thực thi
- Số lần ứng dụng đã được thực thi
- Thời gian thực thi lần cuối
- chứa các timestamps
- Các tập ttinvaf thư mục mà ứng dụng đã truy cập
**Nếu tồn tại tệp prefetch cho 1 ứng dụng, điều đó chứng tỏ chương trình đã được thực thi ít nhất 1 lần trên hệ thống**
### Tại sao tập tin Prefetch lại quan trọng trong digital forensics 

 1. Theo dõi quá trình thực thi chương trình

- Prefetch chứng minh một ứng dụng cụ thể đã được chạy trên hệ thống.
Ngay cả khi một ứng dụng đã bị xóa, tập tin Prefetch của nó vẫn có thể tồn tại như bằng chứng.

 2. Xác định hoạt động đáng ngờ

- Nếu tìm thấy tập tin Prefetch cho phần mềm độc hại hoặc công cụ hack (mimikatz.exe, nc.exe), điều đó cho thấy chúng đã được thực thi.

- Việc tìm thấy nhiều tập tin Prefetch cho cùng một tệp thực thi ở các vị trí khác nhau cho thấy tệp thực thi đã được đổi tên hoặc di chuyển, điều này thường thấy trong các kỹ thuật né tránh phần mềm độc hại.

3. Phát hiện phần mềm trái phép và các mối đe dọa nội bộ

- Nếu người dùng khẳng định họ chưa bao giờ sử dụng VPN, nhưng tập tin Prefetch cho NordVPN.exe tồn tại, điều này mâu thuẫn với lời khẳng định của họ.

 4. Thiết lập dòng thời gian của các sự kiện

- Prefetch timestamps có thể giúp tái tạo dòng thời gian về thời điểm các ứng dụng nhất định được thực thi so với một sự cố.
### Tools sử dụng để phân tích 
Prefetch Parser (PECmd.exe) from Eric Zimmerman's tools
cách sử dụng: 
PECmd.exe -f (path-to-Prefetch-files) --csv (path-to-save-csv)
PECmd.exe -d (path-to-Prefetch-directory) --csv (path-to-save-csv)
### Ứng dụng
sử dụng PECmd.exe để phân tích file ta được các thông tin như thời gian tạo, thời gian chỉnh sửa, hash, runcount,....
![image](https://hackmd.io/_uploads/r1IL6R3H-g.png)
Ngoài ra nó còn ccó thể hiện các file,dir liên quan tới file đó
![image](https://hackmd.io/_uploads/SJr6T0hHWe.png)
![image](https://hackmd.io/_uploads/ryt0pRhH-l.png)
ngoài ra các malware có thể nằm ở đây và đổi extension thành .pf để tránh phát hiện
## lnk(C:\Users\<username>\AppData\Roaming\Microsoft\Windows\Recent\)(C:\Users\<username>\AppData\Roaming\Microsoft\Office\Recent\)
### Lý thuyết
- Shortcut files (*.lnk) là các mục Shell của Windows tham chiếu đến một tệp, thư mục hoặc ứng dụng gốc. Hiệu ứng của việc nhấp đúp vào tệp lối tắt giống như việc nhấp đúp vào ứng dụng hoặc tệp mà nó tham chiếu đến. Ngoài ra, các tham số dòng lệnh và thư mục mà mục tiêu nên được mở có thể được chỉ định trong lối tắt. Các tệp lối tắt có số nhận dạng đặc biệt là 0x4C (4C 00 00 00).
- tạo và sửa đổi timestamps của shorcut files thường sẽ cho biết lần đầu và lần ccuốiteepj đích được mở 
### Tools sử dụng để phân tích 
LECmd from Eric Zimmerman's tools
Cách sử dụng
LECmd.exe  --csv <CSV_DIRECTORY_OUTPUT> -f <LNK_FILE>
### Ứng dụng
Sử dụng LECmd để ptich  1 file lnk kết quả ta được các thông tin chi tiết về file đó có thể dùng để tìm Administrator privileges
![image](https://hackmd.io/_uploads/HJ_xn02HZx.png)
![image](https://hackmd.io/_uploads/SypNnAhrbg.png)
![image](https://hackmd.io/_uploads/r1VI3C2Sbg.png)


## Master File Table(MFT)
- Nó là một cơ sở dữ liệu có cấu trúc theo dõi các đối tượng được lưu trữ trong một ổ đĩa
### $MFT 
-  $MFT lưu trữ thông tin về các cụm nơi tất cả các đối tượng khác có trên ổ đĩa được đặt. Tệp này chứa một thư mục của tất cả các tệp có trên ổ đĩa
### $LOGFILE
- $LOGFILE lưu trữ nhật ký giao dịch của hệ thống tập tin. Nó giúp duy trì tính toàn vẹn của hệ thống tập tin trong trường hợp xảy ra sự cố.
### $UsnJrnl
- Nó viết tắt cho Nhật ký Số thứ tự cập nhật (USN). Nó có mặt trong bản ghi $Extend. Nó chứa thông tin về tất cả các tệp đã được thay đổi trong hệ thống tệp và lý do thay đổi. Nó cũng được gọi là nhật ký thay đổi.
### Tools sử dụng để phân tích 
MFT Explorer from Eric ZZimmerman's tools 
cách sử dụng:
MFTECmd.exe -f <path-to-$MFT-file> --csv <path-to-save-results-in-csv>
### Ứng Dụng 
Bài lab: https://app.letsdefend.io/challenge/ntfs-forensics

![image](https://hackmd.io/_uploads/Sy8JqqsSWe.png)
Em sử dụng MFT explorer và load MFT file từ tthư mục challenge sau đó vào Users thì em tthấy có người dùng là LetsDefend em vào mục Download thì tìm được file 
![image](https://hackmd.io/_uploads/SkYG_qoHWl.png)
![image](https://hackmd.io/_uploads/HyE329sr-e.png)
Trong phần hex của file thì em tìm được link để download file này 
![image](https://hackmd.io/_uploads/rJl2T5sHZl.png)
![image](https://hackmd.io/_uploads/HyR039sHWl.png)
phần SI_Created On chính là thời điểm tạo file 
![image](https://hackmd.io/_uploads/S1pDtqir-l.png)



![image](https://hackmd.io/_uploads/SJgGacorZg.png)
Parent Path chính là full path để dẫn tới file này
![image](https://hackmd.io/_uploads/rJ53t9irbe.png)

![image](https://hackmd.io/_uploads/SJyvA5jBbl.png)
Em tìm được trong phần Overview ở Trường Data thì content size của nó là 0x98 
![image](https://hackmd.io/_uploads/ryXq09sS-e.png)
đây là giá trị thập lục em sẽ chuyển về giá trị thập phân 
![image](https://hackmd.io/_uploads/rJIiWjjBWl.png)


![image](https://hackmd.io/_uploads/Byxh09iHWg.png)
Trong phần hex thì em tìm được
![image](https://hackmd.io/_uploads/H11ykjsrbg.png)

![image](https://hackmd.io/_uploads/Sy9-ysoHZe.png)
và lệnh sử dụng để download cũng nằm trong đây
![image](https://hackmd.io/_uploads/r15xyjiHbg.png)




## ost/pst file 
### ost (C:\Users\<TênUser>\AppData\Local\Microsoft\Outlook\)
- cung cấp dữ liệu veef hoạt động email của người dùng ngay cả khi email đã bị xóa khỏi máy chủ
- quá trình pphântisch bao gồm việc khôi phục email đã xóa, theo dõi ttươngtasc của người dùng và xác định các hoạt động đáng ngờ như truy cập trái phép hoặc vi phạm diwx liệu
- phân tích các tệp ost ccótheer theo dõi hoạt đọng của người dùng bao gồm email đã gửi/nhận, việc tạo và sửa đổi thư mục
### pst 
- Khác với OST:
OST: Offline copy đồng bộ với Exchange/Office 365.
PST: File lưu trữ do người dùng tạo (ví dụ: xuất email ra file PST để backup).
### Các tools sử dụng để phân tích
- X-Ways Forensics, EnCase, FTK
- Kernel OST Viewer, BitRecover OST Viewer, SysTools OST Recovery
### Ứng dụng 
![image](https://hackmd.io/_uploads/SJ5EH0sHbg.png)
Ta có thể xem được tin nhắn đến và đi của người dùng khi có được file ost
![image](https://hackmd.io/_uploads/HkpFS0sHbl.png)
Ngoài ra còn có thể xxem được casc tin nhắn đến/đi mà người dùng đã xóa
các tin nhắn trong này có thể là dấu hiệu để giải các bước tiếp theo 
## eml files
### Lý thuyết
- Các tệp EML chứa thông tin liên quan đến email, chẳng hạn như văn bản ASCII cho phần tiêu đề, tệp đính kèm và siêu liên kết. Chúng là các tệp văn bản thuần túy, vì vậy có thể dễ dàng xem bằng Notepad hoặc các trình soạn thảo văn bản khác. Định dạng EML tương tự như MHT (MIME HTML), vì vậy chúng có thể được mở trực tiếp trong các trình duyệt web như Internet Explorer, Opera và Mozilla Firefox bằng cách đổi tên phần mở rộng tệp.
- Nó có thể được mở trực tiếp trong trình duyệt web bằng cách thay đổi phần mở rộng từ “.eml” thành “.mht”, notepad
- phân tích tệp email là cách tốt nhất để thu thập bằng chứng từ các tin nhắn email
### Ứng dụng trong forensics
Challenge
![image](https://hackmd.io/_uploads/HyIgIrkU-x.png)
Sau khi tải challenge em được 1 file email sau
![image](https://hackmd.io/_uploads/HkyuUBJI-g.png)
Sau khi mở notepad ra để phân tích thì em thu được kết quả
![image](https://hackmd.io/_uploads/SJKqLHyLWe.png)
## Alternate Data Streams
- Một tệp là một luồng dữ liệu được tổ chức trong hệ thống tệp. Luồng dữ liệu thay thế (ADS) là một tính năng trong NTFS cho phép các tệp có nhiều luồng dữ liệu được lưu trữ trong một tệp duy nhất. Internet Explorer và các trình duyệt khác sử dụng Luồng dữ liệu thay thế để xác định các tệp được tải xuống từ internet (sử dụng Mã định danh vùng ADS). Phần mềm độc hại cũng được phát hiện ẩn mã của chúng trong ADS.
### Ứng dụng 
- Sử dụng các tools để xem trên powershell/cmd:
- Bằng cách sử dụng `streams`, chúng ta có thể kiểm tra xem tệp nào có  alternate data-streams
Ví dụ:
 ![image](https://hackmd.io/_uploads/r18n5bISbx.png)
$Data là thuộc tính, còn 8 là kích thước
- `Get-Item`
Ví dụ: ![image](https://hackmd.io/_uploads/SJtci-8BZx.png)
- `Set-item` dùng để thêm các luồng vào 1 file 
Cách dùng: set-content - path {path to the file} - stream {name of the stream}
Thao tác này sẽ khởi tạo một cmdlet, nơi có thể nhập nội dung của luồng vào Value[i]
![image](https://hackmd.io/_uploads/BJP73-Lrbg.png)
- Nếu muốn tìm kiếm ADS trong một thư mục hoặc ổ đĩa, bạn có thể sử dụng lệnh này trong thư mục gốc của mục tiêu:
 gci -recurse | %  (gi $_.FullName -stream * ) | where stream -ne ':$Data'
![image](https://hackmd.io/_uploads/r1Ly6b8B-x.png)
- Gỡ bỏ ADS: **remove-item –path {đường dẫn đến tệp} –stream {tên của luồng dữ liệu}**
## ChromeBook artifacts
https://www.magnetforensics.com/blog/chromebook-data-locations/
https://www.magnetforensics.com/resources/targeted-locations-quick-reference-guide-for-android-and-google-takeouts/
## Browser History
### Lý thuyết
- ghi lại toàn bộ hoạt động duyệt web của người dùng
- Phát hiện dấu vết che giấu ngay cả khi người dùng xóa cache hoặc history trong trình duyệt, nhiều artifact vẫn tồn tại trong SQLite DB, cache files, hoặc hệ thống log.
- lịch sử duyệt web IE/Edge là bao gồm cả các tệp đã được mở trong hệ thống, bất kể các tệp đó được mở bằng trình duyệt hay không. Do đó, lịch sử duyệt web IE/Edge là một nguồn thông tin quý giá về các tệp đã mở trong hệ thống. Chúng ta có thể truy cập lịch sử tại vị trí sau:
C:\Users\<username>\AppData\Local\Microsoft\Windows\WebCache\WebCacheV*.dat

Ngoài ra còn các lịch sử duyệt web khác trên từng ứng dụng khác nhau:
VD: C:\Users\...\AppData\Local\...(tên trình duyệt)\Default\History
linhk tham khảo https://hawkeyeforensic.com/browser-forensics-examining-browser-artifacts/
### FireFox(C\Users\USER_NAME\AppData\Roaming\Mozilla\Firefox\Profiles\[profileID].default-release)
- **places.sqlite**: where most of a user's important browsing information is stored in a Firefox profile.
- **places.sqlite-wal**: a temporary log file created by the Firefox browser's SQLite database to optimize data writing performance, The websites most recently visited are usually located in the -wal file and haven't yet been updated in the main .sqlite file so we need to export both files
### Ứng dụng
- Giống như Q5 của cyberdefend thì em thu được 1 file webdata
![image](https://hackmd.io/_uploads/Bk3U341I-g.png)
em có thể xài chrome autofill viewer để xem các tk, mk mà user đã lưu lại trong lịch sử web
![image](https://hackmd.io/_uploads/rJjjnE1Ubx.png)
- Trích dữ liệu tìm kiếm:
Vd: export đc 1 file History của trình duyệt, dùng db browser for SQLite add database vừa export sang tab browse Data  chọn table url  kết quả là lịch sử trình duyệt của ng dùng
![image](https://hackmd.io/_uploads/HyTD9f-8Zg.png)

### Tools dùng để phân tích 
- DB Browser for SQLite

## RDP Cache 
### Lý thuyết
- Khi một người dùng kết nối đến một máy tính khác qua giao thức RDP (Remote Desktop Protocol), để tối ưu hóa băng thông và tăng tốc độ hiển thị, RDP Client sẽ lưu trữ các phần hình ảnh nhỏ (chunks) của màn hình remote xuống ổ cứng của máy Client.
- output: Một tập hợp các tệp tin chứa hàng ngàn "mảnh ghép" hình ảnh nhỏ (thường là 64x64 pixel).
- Các file cache thường nằm trong thư mục **%SystemRoot%\Cache** hoặc **%SystemRoot%\System32\Cache**, **C:\Users\<USER>\AppData\Local\Microsoft\Terminal Server Client\Cache**
### công cụ phân tích
- BMC-Tools cách sử dụng python bmc-tools.py -s SourceDir -d OutputDir -b
link git:  https://github.com/ANSSI-FR/bmc-tools
- Sau khi dùng BMC ra được output dùng 
RdpCacheStitcher để ghép lại các output
link git: https://github.com/BSI-Bund/RdpCacheStitcher
### Tác dụng 
- Khôi phục nội dung phiên RDP: Cho phép điều tra viên tái dựng lại màn hình mà người dùng/kẻ tấn công đã thấy.
- Phát hiện hành vi tấn công: Nếu hacker dùng RDP để di chuyển lateral, cache có thể tiết lộ họ đã mở công cụ quản trị, registry, hay dữ liệu nhạy cảm.
### Ứng dụng
artifact này em kh tìm được bài ctf nào chứa file để tải về thực hành nên em sẽ viết những gì em hiểu trong cách người ta làm
link tham khảo:https://www.thedfirspot.com/post/rdp-bitmap-cache-piece-s-of-the-puzzle
ban đầu ngta có các file rdpcache sau đó ngta sẽ dùng bmc-tools để phân tích 
![image](https://hackmd.io/_uploads/BkPzRrJUbg.png)
![image](https://hackmd.io/_uploads/Byrt0ryIZx.png)
![image](https://hackmd.io/_uploads/r1kjRSkUZx.png)
và thu được các file ảnh bmp kích thước (64x64 pixel)
![image](https://hackmd.io/_uploads/r1SUg8J8Wx.png)
Sau đó ngta sẽ ghép thủ công các ảnh này thành 1 ảnh lớn
bằng RDPCacheStitcher
![image](https://hackmd.io/_uploads/r17jJL18We.png)
ngoài ra còn có công cụ để ptich tự động đó là RDPieces
## Scheduled Tasks
### Lý thuyết
- Là các tác vụ được tạo trong Windows Task Scheduler, có thể chạy theo lịch (ví dụ: mỗi ngày, khi khởi động, khi đăng nhập).
- vị trí: %SystemRoot%\System32\Tasks\ (mỗi task là một file XML)
### Ứng dụng 
- Phát hiện persistence (duy trì truy cập): Malware hoặc attacker thường tạo Scheduled Tasks để tự động chạy payload sau khi reboot. 
- Theo dõi hành vi người dùng: Cho thấy người dùng đã cấu hình tác vụ gì (ví dụ: backup, script tự động).
### Trong Forensics
Khi mở task scheduler 
![image](https://hackmd.io/_uploads/rJXZAi3r-g.png)
có thể có các task lạ thực thi mã độc có thể ẩn tên như clean file system và desscription thì kh có gì lạ nhưng khi vào phần action nó lại thực thi 1 lệnh powershell 
![image](https://hackmd.io/_uploads/B1FvAohBbg.png)
## Powershell History 
### Lý thuyết 
- Là file lưu lại lịch sử các lệnh PowerShell đã được thực thi 
- Vị trí lưu trữ:
**C:\Users\<username>\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt**
### Ứng dụng
![image](https://hackmd.io/_uploads/rJstMpsSbe.png)
- Ví dụ như trong bài lab disk analyst & autopsy ta tìm được các lệnh đã được tttthực thi trong đó có chứa flag
- 
![image](https://hackmd.io/_uploads/S1vGQair-l.png)
- các lệnh này được thực thi ở PowerShell rất qqquan trọng nó thể gợi ý cho ta bt được những gì có thể làm tiếp theo.
## Whatsapp artifact (Users/AppData/Roaming/WhatsApp/Databases)
**msgstore.db / msgstore.db.crypt14** (hoặc crypt15): CSDL chính lưu trữ tin nhắn, thời gian gửi/nhận, trạng thái tin nhắn và ID người gửi.

## Last Shutdown Time
SYSTEM\ControlSet001\Control\Windows\ShutdownTime
# Bài Lab Windows Fundamental 1
## Writeup chi tiết
### Task 1: Windows Edition
![image](https://hackmd.io/_uploads/SktWhmHS-x.png)
chủ yếu task này nói về các phiên bản, lịch sử hình thành của Windows
Đáp án: 
![image](https://hackmd.io/_uploads/SJrHhmBHbg.png)
### Task 2: The Desktop (GUI)
- Task này chủ yếu nói về giao diện và các chức năng của Windows 10
C1:
![image](https://hackmd.io/_uploads/SJga27BHWe.png)
![image](https://hackmd.io/_uploads/B1dD7-8B-x.png)
C2: 
![image](https://hackmd.io/_uploads/SkM6m-8Bbl.png)
![image](https://hackmd.io/_uploads/By5ZVbLHZg.png)
C3:
![image](https://hackmd.io/_uploads/ryKVEZUSWx.png)
![image](https://hackmd.io/_uploads/BJyHSbUrZx.png)
### Task 3: Introduction to Windows
Task này để chạy lab ảo
### Task 4: The File System
![image](https://hackmd.io/_uploads/rJ3XvZISbl.png)
![image](https://hackmd.io/_uploads/ryaNvZUSZg.png)
Các ưu điểm của tập tin NTFS so với FAT16/32 và HPFS:  
- Hỗ trợ các tập tin lớn hơn 4GB
- Thiết lập quyền cụ thể trên các thư mục và tập tin
- Nén thư mục và tập tin
- Mã hóa (Hệ thống Tập tin Mã hóa hoặc EFS)
### Task 5: The Windows\System32 Folders
Thư mục System32 chứa các tập tin quan trọng, thiết yếu cho hệ điều hành.
Thư mục(C:\Windows) được biết đến là thư mục chứa hệ điều hành Windows 
biến môi trường hệ thống cho thư mục Windows là %windir%.
![image](https://hackmd.io/_uploads/HyE20ZUSWx.png)
### Task 6: User Accounts, Profiles, and Permissions
Trên một hệ thống Windows cục bộ thông thường, tài khoản người dùng có thể thuộc một trong hai loại: Administrator & Standard User
- Administrator có thể thực hiện các thay đổi đối với hệ thống: thêm người dùng, xóa người dùng, sửa đổi nhóm, sửa đổi cài đặt trên hệ thống, v.v.
- Standard Users chỉ có thể thực hiện các thay đổi đối với thư mục/tệp được gán cho người dùng đó và không thể thực hiện các thay đổi cấp hệ thống, chẳng hạn như cài đặt chương trình.

Cách để xác định loại user account có trên hệ thống:
- nhấp vào Start Menu --> Other User--> System Settings > Other users . 
Cách khác để xem local user và group management là
**Windows+R --> lusrmgr.msc**

![image](https://hackmd.io/_uploads/rJmqbz8Hbx.png)
![image](https://hackmd.io/_uploads/By4dZG8rZe.png)
![image](https://hackmd.io/_uploads/r1zpZGUHZg.png)
![image](https://hackmd.io/_uploads/rkNRWGUB-x.png)
![image](https://hackmd.io/_uploads/r1LfMG8HZg.png)
![image](https://hackmd.io/_uploads/Hyt7MzLSbx.png)
![image](https://hackmd.io/_uploads/HJXVfz8HZe.png)
![image](https://hackmd.io/_uploads/BkvBfz8SZe.png)
### Task 7: User Account Control 
User Account Control (UAC) hoạt động như thế nào? 
- Khi người dùng có loại tài khoản là Administrator đăng nhập vào hệ thống, phiên làm việc hiện tại sẽ không chạy với quyền nâng cao. Khi cần thực thi một thao tác yêu cầu quyền cao hơn, người dùng sẽ được nhắc xác nhận xem họ có cho phép thao tác đó chạy hay không.
- Ví dụ: ![image](https://hackmd.io/_uploads/Hk3w7fIrWl.png)
### Task 8: Settings and the Control Panel
- Trên hệ thống Windows, các vị trí chính để thực hiện thay đổi là Settings Menu và Control Panel 
![image](https://hackmd.io/_uploads/SyadVGIHWl.png)
![image](https://hackmd.io/_uploads/Skht4fLBbg.png)
### Task 9: Task Manager 
Task manager cung cấp thông tin về các ứng dụng và tiến trình hiện đang chạy trên hệ thống. Ngoài ra còn có các thông tin khác, chẳng hạn như mức sử dụng CPU và RAM, thuộc mục Hiệu năng.
![image](https://hackmd.io/_uploads/HyIVHzUr-g.png)
# Bài Lab Windows Fundamental 2
## Writeup chi tiết
### Task 1: Introduction
### Task 2: System Configuration and Advanced System Settings
#### MSconfig
The System Configuration utility (MSConfig) dùng để khắc phục sự cố nâng cao, mục đích chính là giúp chẩn đoán các vấn đề khởi động.
MSconfig có 5 tab bao gồm:
- General
- Boot
- Services
- Startup
- Tools
Trong tab General, chúng ta có thể chọn thiết bị và dịch vụ nào Windows sẽ tải khi khởi động. Các tùy chọn là: Normal, Diagnostic, Selective 
![image](https://hackmd.io/_uploads/HJlaaMIBZe.png)
Trong tab Boot, chúng ta có thể xác định các tùy chọn khởi động khác nhau cho Hệ điều hành
![image](https://hackmd.io/_uploads/HkE4RzISWl.png)
Trong tab Services, liệt kê tất cả các dịch vụ được cấu hình cho hệ thống bất kể trạng thái của chúng (đang chạy hoặc đã dừng). Services là một loại ứng dụng đặc biệt chạy ngầm.
![image](https://hackmd.io/_uploads/SyfP0G8r-e.png)
Trong tab Startup cách xem chi tiết là Window + R shell:startup. Thao tác này sẽ hiển thị tất cả các chương trình khởi động dưới dạng phím tắt hoặc tệp thực thi được cấu hình để chạy tự động vào lần đăng nhập tiếp theo của người dùng. Đây là nơi bạn có thể xác minh các ứng dụng được cấu hình để khởi chạy khi khởi động hệ thống.
![image](https://hackmd.io/_uploads/BkWbyXUrWl.png)
Trong tab Tools, chúng ta có thể chạy để cấu hình hệ điều hành thêm. Có một mô tả ngắn gọn về mỗi công cụ để cung cấp một số thông tin chi tiết về chức năng của công cụ đó.
![image](https://hackmd.io/_uploads/Hk2Yk7UB-l.png)
#### Advance System settings 
Có thể search View advanced system settings trên search bar để truy cập 
![image](https://hackmd.io/_uploads/r1DFgQLrbe.png)
Windows sử dụng tệp hoán đổi (page file) làm không gian bộ nhớ ảo bổ sung khi RAM vật lý bị đầy. Điều này giúp ngăn ngừa tình trạng chậm hoặc ứng dụng bị lỗi khi hệ thống hết bộ nhớ.
![image](https://hackmd.io/_uploads/Bk6bg7USWg.png)
![image](https://hackmd.io/_uploads/S1YVO7vrbe.png)
Trong tab Performance, tùy chọn advance cũng cho biết kích thước tệp hoán đổi được cấu hình cho các ổ đĩa. Trong trường hợp này, đó là 1048MB. 
![image](https://hackmd.io/_uploads/BkXA_mPrbg.png)
![image](https://hackmd.io/_uploads/r1uyY7wHbl.png)
Tại đây, sẽ có các thiết lập khác nhau cho quá trình khởi động và phục hồi

Câu hỏi:
![image](https://hackmd.io/_uploads/Bkj3qmDHbx.png)
search trên thanh search bar là msconfig xong vào tab services ta được các tác vụ có chứa kết quả 
![image](https://hackmd.io/_uploads/B1agiXwBbl.png)
![image](https://hackmd.io/_uploads/HJOLjQPrbx.png)
vào tab tools--> about windows chọn launch ta được kết quả 
![image](https://hackmd.io/_uploads/rJvVjXwBbl.png)
![image](https://hackmd.io/_uploads/By_y27PrWg.png)
Ở tab tools ta thấy có tool là Windows Troubleshooting  ở dưới có command
![image](https://hackmd.io/_uploads/HJne3mDBbe.png)
![image](https://hackmd.io/_uploads/S1LRhmPBWx.png)
### Task 3: Change UAC settings 
Slider có bốn cấp độ bảo mật, mỗi cấp độ kiểm soát cách Windows cảnh báo bạn khi các ứng dụng hoặc người dùng cố gắng thực hiện thay đổi ở cấp độ hệ thống. Chúng được chia thành bốn loại tiêu chuẩn: 
- Always notify: Đây là mức độ bảo mật cao nhất. Windows sẽ thông báo bất cứ khi nào ứng dụng nào hoặc chính bạn cố gắng thực hiện thay đổi, và màn hình nền sẽ mờ đi
- Notify for apps: Windows chỉ thông báo khi các ứng dụng cố gắng thực hiện thay đổi, nhưng không phải khi bạn thay đổi cài đặt Windows.
- Notify without dimming: : Tương tự như trên (notify for apps), nhưng lần này màn hình không bị mờ
- Never notify: Thông báo bị tắt. Windows sẽ không cảnh báo về bất kỳ thay đổi nào do bạn hoặc bất kỳ ứng dụng nào thực hiện

Câu hỏi: 
![image](https://hackmd.io/_uploads/SyE4RXPH-x.png)
vào tab tools ta có thấy có tools name là Change UAC settings, click vào ta được 
![image](https://hackmd.io/_uploads/BkDDAXDBZg.png)
### Task 4: Computer Management 
Computer Management (compmgmt) có 3 phần chính: System Tools, Storage, and Services and Applications.
#### System tools 
- Task Scheduler có thể tạo và quản lý các tác vụ thông thường mà máy tinnhs sẽ tự động thực hiện vào những thời điểm được cchỉ định. Một tác vụ có thể chạy một ứng dụng, một tập lệnh,... và casc tác vụ có thể được cấu hình để chạy bất cứ lúc nào. Một tác vụ ccótheer chạy khi đăng nhập hoặc đăng xuất. Các tác vụ cũng có thể được cài đặt để chạy theo một lịch trình cụ thể, Ví dụ: cứ sau 5 phút.
Để xem chi tiết các tác vụ chúng ta ccó thể vào **Computer Management ---> Task Scheduler**
![image](https://hackmd.io/_uploads/S18OlVPHWg.png)

- Event Viewer cho phép chúng ta xem các sự kiện đã xảy ra trên máy tính. Các bản ghi sự kiện có thể được xem như logs, được sử dụng để hiểu hoạt đđộngcuar máy tính. Thông tin này được sử dụng để chẩn đđoansuwj cố và điều tra các hành động được thực hiện trên hệ thống 
![image](https://hackmd.io/_uploads/ryPSZEPH-x.png)
Có 5 loại event có thể được ghi vào logs: 
![image](https://hackmd.io/_uploads/HkEs-4wBWg.png)

- Shared Folders là nơi sẽ chứa các danh dách đầy đủ của các thư mục và tài liệu được chia sẻ mà người khác có thể truy cập 
![image](https://hackmd.io/_uploads/ByHMGVvSbl.png)

- Performance, có 1 tiện ích được gọi là Performance Monitor (perfmon). Perfmon được sử dụng để xem dữ liệu hiệu năng, có thể là theo thời gian thực hoặc từ log file. Tiện ích này hữu ích cho việc khắc phục sự cố hiệu năng trên hệ thống máy tính, dù là cục bộ hay từ xa.
![image](https://hackmd.io/_uploads/B1LRzEDrZg.png)

- Device Manager cho phép chúng ta xem và cấu hình phần cứng, chẳng hạn như vô hiệu hóa bất kỳ phần cứng nào được kết nối với máy tính.
![image](https://hackmd.io/_uploads/SydfQNPrZl.png)

- Storage có Windows Server Backup và Disk Management. Disk Management là một tiện ích hệ thống trong Windows cho phép thực hiện các tác vụ lưu trữ nâng caoThiết lập ổ đĩa mới, Mở rộng phân vùng, Thu nhỏ phân vùng, Gán hoặc thay đổi ký tự ổ đĩa
![image](https://hackmd.io/_uploads/SylcXVDBZl.png)

- Services and Applications là một loại ứng dụng đặc biệt chạy ngầm. Có thể xem tất cả các dịch vụ và trạng thái của chúng bằng cách nhấp vào nút Services trong phần Services and Applications
![image](https://hackmd.io/_uploads/Hk_JEVwBWx.png)

- Câu hỏi: 
![image](https://hackmd.io/_uploads/r10YVNDrWl.png)
![image](https://hackmd.io/_uploads/SygoVNwBbe.png)

![image](https://hackmd.io/_uploads/H1B7HNDrZe.png)
vào computer management --> Task Scheduler Librabry vào tab Triggers 
![image](https://hackmd.io/_uploads/ryT4rVDrZg.png)

![image](https://hackmd.io/_uploads/ryQjHEDS-x.png)
![image](https://hackmd.io/_uploads/ByI3SVwBWx.png)
### Task 5: System Information
System Information(msinfo32) Công cụ này thu thập thông tin về máy tính và hiển thị một cái nhìn toàn diện về phần cứng, các thành phần hệ thống và môi trường phần mềm có thể sử dụng để chẩn đoán các sự cố máy tính gồm 3 phần: 
- Hardware Resources
- Components
- Software Environment
![image](https://hackmd.io/_uploads/B1HEI4PHbx.png)
System Summary sẽ hiển thị các thông số kỹ thuật chung của máy tính, chẳng hạn như nhãn hiệu và kiểu máy xử lý.
Hardware Resources là các đường dẫn bus có thể gán và định địa chỉ, cho phép các thiết bị ngoại vi và bộ xử lý hệ thống giao tiếp với nhau. Tài nguyên phần cứng thường bao gồm địa chỉ cổng I/O, vectơ ngắt và các khối địa chỉ bộ nhớ tương đối so với bus. Nó sẽ chứa các mục sau 
![image](https://hackmd.io/_uploads/HyH5UNwHZl.png)
Components có thể xem thông tin cụ thể về các thiết bị phần cứng được cài đặt trên máy tính.
![image](https://hackmd.io/_uploads/rkYrwEPrbe.png)
Software Environment có thể xem thông tin về phần mềm được tích hợp sẵn trong hệ điều hành và phần mềm bạn đã cài đặt
![image](https://hackmd.io/_uploads/Hyj9wNvBWx.png)
(Windows\System32) nơi chứa Environment Variables dùng để lưu trữ thông tin về môi trường hệ điều hành. Thông tin này bao gồm các chi tiết như đường dẫn hệ điều hành, số lượng bộ xử lý được hệ điều hành sử dụng và vị trí của các thư mục tạm thời. Có thể xem các giá trị được gán ở đây
![image](https://hackmd.io/_uploads/H1DmdVvHWx.png)
Một phương pháp khác để xem environment variables là 
**Control Panel > System and Security > System > Advanced system settings > Environment Variables hoặc Settings > System > About > system info > Advanced system settings > Environment Variables**

Câu hỏi: 
![image](https://hackmd.io/_uploads/By38KNDS-e.png)
![image](https://hackmd.io/_uploads/SJnNKNvB-e.png)

![image](https://hackmd.io/_uploads/Bk5otEvB-l.png)
![image](https://hackmd.io/_uploads/SJSct4vHWe.png)

![image](https://hackmd.io/_uploads/r1kgcEDrWg.png)
![image](https://hackmd.io/_uploads/B1b0KVwHZe.png)

### Task 6: Resource Monitor
Resource Monitor(resmon) hiển thị thông tin sử dụng CPU, bộ nhớ, ổ đĩa và mạng cho từng tiến trình và tổng hợp, ngoài ra còn cung cấp chi tiết về các tiến trình đang sử dụng các file handle và module riêng lẻ. Chức năng lọc nâng cao cho phép người dùng cô lập dữ liệu liên quan đến một hoặc nhiều tiến trình (ứng dụng hoặc dịch vụ), khởi động, dừng, tạm dừng và tiếp tục dịch vụ, cũng như đóng các ứng dụng không phản hồi từ giao diện người dùng. Nó cũng bao gồm tính năng phân tích tiến trình có thể giúp xác định các tiến trình bị kẹt và xung đột khóa file để người dùng có thể cố gắng giải quyết xung đột thay vì đóng ứng dụng và có nguy cơ mất dữ liệu 
Resmon gồm 4 phần: CPU, Disk, Network, Memory 
![image](https://hackmd.io/_uploads/HJ3qcVPBbe.png)
- CPU
![image](https://hackmd.io/_uploads/HJMJiVDSZg.png)

- Memory
![image](https://hackmd.io/_uploads/r1-bsEDr-l.png)

- Disk 
![image](https://hackmd.io/_uploads/HJXGsEPSWx.png)

- Network 
![image](https://hackmd.io/_uploads/S1qEiNDr-x.png)

Câu hỏi: 
![image](https://hackmd.io/_uploads/H1dFoVPBZl.png)
![image](https://hackmd.io/_uploads/SJz9jEvHZg.png)

### Task 7: Command Prompt
Command Prompt là cách duy nhất tương tác với hệ điều hành (trong các hệ điều hành đời đầu)
Các dòng lệnh để lấy thông ttin về hệ thống mấy tính 
- **hostname** sẽ xuất ra tên máy tính 
![image](https://hackmd.io/_uploads/rJyqnNDSZx.png)

- **whoami** sẽ hhiển thị tên người dùng đã đăng nhập
![image](https://hackmd.io/_uploads/Syin2VPBZe.png)

- **ipconfig** sẽ hhiển thị cài đdặt network adddress của mmáytinhs 
![image](https://hackmd.io/_uploads/SJyZaVPHZe.png)

Mỗi lệnh sẽ có hướng dẫn giải thích cú pháp cần thiết để thực thi lệnh một cách chính xác, cùng với bất kỳ tham số bổ sung nào có thể được thêm vào lệnh để mở rộng khả năng thực thi của nó.
Lệnh để truy xuất tài liệu hướng dẫn cho một lệnh là **/?**.

- **cls** để clear màn hinhf cmd 

- **netstat** lệnh này sẽ hiển thị số liệu thống kê giao thức và các kết nối mạng TCP/IP hiện tại.
![image](https://hackmd.io/_uploads/r1xhT4PBWe.png)

- **net** chủ yếu được sử dụng để quản lý tài nguyên mạng. Lệnh này hỗ trợ các lệnh con.
1 vài lệnh con ccó thể sử dụng 
![image](https://hackmd.io/_uploads/ByM4AVDSbg.png)

Câu hỏi:
![image](https://hackmd.io/_uploads/rJOhA4Dr-x.png)
![image](https://hackmd.io/_uploads/rJtT0VvBZg.png)

![image](https://hackmd.io/_uploads/B15myHvHZl.png)
![image](https://hackmd.io/_uploads/rJEW1SwBbe.png)

### Task 8: Registry Editor
Windows Registry (theo Microsoft) là một cơ sở dữ liệu phân cấp trung tâm được sử dụng để lưu trữ thông tin cần thiết để cấu hình hệ thống cho một hoặc nhiều người dùng, ứng dụng và thiết bị phần cứng.
Registry chứa thông tin mà Windows liên tục tham chiếu trong quá trình hoạt động như Hồ sơ cho mỗi người dùng, Các ứng dụng được cài đặt trên máy tính và loại tài liệu mà mỗi ứng dụng có thể tạo, Cài đặt bảng thuộc tính cho thư mục và biểu tượng ứng dụng, Phần cứng hiện có trên hệ thống, Các cổng đang được sử dụng.
Cách xem/chỉnh sửa Registry là dùng Registry Editor (regedit)
![image](https://hackmd.io/_uploads/rJUh1SvHWl.png)

Câu hỏi: 
![image](https://hackmd.io/_uploads/BynlgBwBWl.png)
![image](https://hackmd.io/_uploads/HkAC1BDH-e.png)

# Bài Lab Disk Analyst & Autopsy
Đầu tiên em sẽ mở Autopsy và chọn file disk image HASANE01 có sẵn trong máy ảo
![image](https://hackmd.io/_uploads/rJJP-_drWl.png)
Sau khi vào thì đầu tiên em thấy file data source, em check metadata thì thấy md5 hash của file 
![image](https://hackmd.io/_uploads/ByPWM_uH-g.png)
![image](https://hackmd.io/_uploads/Syvxf_Or-g.png)

phần Result sẽ chứa những kết quả mà Autopsy phân tích được
![image](https://hackmd.io/_uploads/By5x7_urZx.png)

Khi vào Operating System Information sẽ chứa các thông tin cơ bản về hệ điều hành và sẽ thu được kết quả
![image](https://hackmd.io/_uploads/ByvY7ddrbl.png)
![image](https://hackmd.io/_uploads/HJCV7d_HWl.png)

Khi vào tab Operating System User Account em thấy có chứa column có phần username của người dùng 
![image](https://hackmd.io/_uploads/H1XGVdurWe.png)
![image](https://hackmd.io/_uploads/BkVJVu_Hbg.png)

Câu tiếp theo cũng tương tự, em thấy column Date Accessed nên em sẽ check xem ai sẽ là người dùng truy cập cuối cùng
![image](https://hackmd.io/_uploads/HyM_4ddBZg.png)

Đối với 2 câu nnnày thì em có tìm được 1 dir Look@LAN trong thư mục Program File(x86) em tìm hhiểu được thì đây là tthư mục kết quả của 1 ccông cụ giám sát mạng và địa chỉ IP cũ dựa trên hệ điều hành Windows cũ nó sẽ tự động phát hiện các thiết bị trên mạng cục bộ. Hiển thị các nút đang hoạt động, địa chỉ IP và tên máy chủ. Cung cấp khả năng phát hiện hệ điều hành, thống kê mạng và logs. Giám sát các thay đổi mạng trong thời gian thực. 
![image](https://hackmd.io/_uploads/HJ_gv__rbg.png)

Khi vào thư mục này thì sau khi check em thấy có file irunin.ini chứa trường IP và MAC address của computer
![image](https://hackmd.io/_uploads/H1p9K_OBZe.png)
![image](https://hackmd.io/_uploads/r18Bcd_rWx.png)

![image](https://hackmd.io/_uploads/B1wp5hsrbx.png)
em tìm hiểu thì biết được thông tin về NetworkCard nằm ở hive SOFTWARE/Microsoft/Windows NT/CurrentVersion/NetworkCards
![image](https://hackmd.io/_uploads/HyK010srbg.png)



Như đã đề cập trước đó thì em thấy có thư mục dir là Look@LAN đây là thư mục của công cụ Look@LAN Network Monitor
![image](https://hackmd.io/_uploads/Bkswcd_rZe.png)

Khi check trong phần Web Bookmarks thì em thu được 1 file có title là kkết quả cần tìm 
![image](https://hackmd.io/_uploads/S1NAj_uHbe.png)
![image](https://hackmd.io/_uploads/r1rTsudSZg.png)

![image](https://hackmd.io/_uploads/r1eEgaiBWl.png)
vì câu hỏi hint là ảnh chứa full name của nó là wallpaper nên em tìm hiểu và bbt được các wallpaper thường nằm ở đường dẫn **[Username] > AppData > Roaming > Microsoft > Windows > Themes** em check từng user và thu được ở user joshwa 1 ảnh chứa full tên 
![image](https://hackmd.io/_uploads/rJ-xbTorWl.png)

![image](https://hackmd.io/_uploads/ryPQWajH-x.png)
CCâu hỏi có đề cập đến PowerShell history nên em sẽ dùng artifact này (C:\Users\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt) em sẽ đi theo đường dẫn và cuối cùng tìm được ở User shreya 1 file chứa các lệnh PowerShell đã tthực thi 
![image](https://hackmd.io/_uploads/rJstMpsSbe.png)
Sau khi xem phần text thì em thu được flag 
![image](https://hackmd.io/_uploads/S1vGQair-l.png)

![image](https://hackmd.io/_uploads/S1NvQTsHbe.png)
Với câu này thì em thấy ở phần PowerShell history em thấy có các lệnh thực thi vào đường dẫn .\Desktop nên em thử vào phần desktop của user đó và thu được flag nằm trong file exploit.ps1
![image](https://hackmd.io/_uploads/SyPwVajB-x.png)

![image](https://hackmd.io/_uploads/Hk6JBpsB-e.png)
em có check thử trong DetectionHistory của windows defender thì em thu được các file gghi lại các tên hack tools 
![image](https://hackmd.io/_uploads/rJbKu6sr-e.png)
![image](https://hackmd.io/_uploads/rJWR_6sHbl.png)

![image](https://hackmd.io/_uploads/S1j4Faor-x.png)
Vì câu hỏi gợi ý đây là file yyara nên em sẽ search các file .yar 
![image](https://hackmd.io/_uploads/Sy15YTsSbe.png)
em thu được 1 file kiwi_passwords.yar và trong đó ccóteen author 
![image](https://hackmd.io/_uploads/Bk9McTjrZx.png)

em search thử MS-NRPC exploit thì em thấy 1 lỗ hổng có tên là Zerologon
![image](https://hackmd.io/_uploads/S15-jTiS-x.png)
em sẽ thử tìm kiếm tên này trên autopsy 
![image](https://hackmd.io/_uploads/ByFtsaoSWl.png)
em thấy có 1 file encrypt đc down bởi sandhya, em thử summit kết quả là phần bôi đen 
![image](https://hackmd.io/_uploads/rkPTspoBbl.png)

# Bài Lab Hireme
##  Q1
![image](https://hackmd.io/_uploads/ryqWyqdBWg.png)
đầu tiên em sẽ dùng FTK Imager để ptich file disk img, khi vào thư mục user thì em thấy có 1 thư mục user tên là Karen nên Karen là đáp án
![image](https://hackmd.io/_uploads/HyavkcOBbx.png)
## Q2 
![image](https://hackmd.io/_uploads/HJV3l5uS-e.png)
Vì câu hỏi hỏi về OS's build number nên em sẽ dùng artifact OS version (SOFTWARE\Microsoft\Windows NT\CurrentVersion). Đầu tiên em sẽ dùng FTK để trích xuất hive SOFTWARE trong thư mục C:\Windows\System32\config 
![image](https://hackmd.io/_uploads/BkOcbc_HWg.png)
Sau đó em dùng registry explorer để phân tích thì em đi theo thư mục tới aartifact đó thì eemthu được
![image](https://hackmd.io/_uploads/HJCRZcuHWg.png)
## Q3
![image](https://hackmd.io/_uploads/rkF8X5dBZx.png)
Em sẽ dùng artifact Computer Name(SYSTEM\CurrentControlSet\Control\ComputerName\ComputerName). Em sẽ làm tương tự như câu trên 
![image](https://hackmd.io/_uploads/HkpOG5uHZl.png)
![image](https://hackmd.io/_uploads/SJAfmcdBWx.png)
## Q4 
![image](https://hackmd.io/_uploads/B1yFL9OHbx.png)
Sau khi check trong FTK thì eem thấy phân vùng thứ 3 có chứa các file thực thi em ktra thì thấy có Skype là 1 ứng dụng liên lạc trực tuyến nên em apply 
![image](https://hackmd.io/_uploads/rJ7dP5_BWg.png)
## Q5 
![image](https://hackmd.io/_uploads/SJBZ0qurZx.png)
phần này em có đọc hint và biết được zip code nnày là phần autofill nằm trong thư mục AppData\Local\Google\Chrome\User Data\Default\Web Data em sẽ export file này ra và dùng Chrome Autofill Viewer để phân tích thì em thu được postal code là 19709  
![image](https://hackmd.io/_uploads/S1QaC9OH-l.png)
## Q6 
![image](https://hackmd.io/_uploads/SypdIIoSWg.png)
Đối với ccâu này em sẽ dùng artifact ost/pst file để pphân tích khi đi theo đường dẫn em tìm được 1 file ost 
![image](https://hackmd.io/_uploads/r1G1ELiHbg.png)
em sẽ export ra để phân tích 
![image](https://hackmd.io/_uploads/ryDzVUjr-x.png)
Sau đó em ssẽ dùng kernel ost viewer để phân tích em sẽ vào mục inbox trong này chứa các tin nhắn đến vvvà đi của Karen và tìm được 1 ttin nhắn được gửi đến từ TAAUSAI cho Karen và người gửi là Micheal Scotch 
![image](https://hackmd.io/_uploads/Hkv3rIsB-x.png)
## Q7 
![image](https://hackmd.io/_uploads/S1aHDUiSZx.png)
Sau khi check tiếp các tin nhắn đến và đi thì em thu được 1 tin nhắn từ TAAUSAI cho Karen để offer mức lương 
![image](https://hackmd.io/_uploads/S1YR8UoH-l.png)
## Q8 
![image](https://hackmd.io/_uploads/Bk7XiIoSZg.png)
Sau khi tìm tiếp thì eeem thu đc 1 email nnma vì có kí tự bị lỗi hiển thị 
![image](https://hackmd.io/_uploads/B1gSKIoH-l.png)
Nên em sẽ dùng thử phần mềm khác là systools ost viewer và eemthu được "27°22’50.10″N, 33°37’54.62″E" 
![image](https://hackmd.io/_uploads/HkO3tIoBbg.png)
Sau đó em sẽ điền tọa độ đó trên GPS coordinate
![image](https://hackmd.io/_uploads/rk1n5IjSWl.png)
và cuối cùng thu được 
![image](https://hackmd.io/_uploads/rJpxo8jSWx.png)
## Q9 
![image](https://hackmd.io/_uploads/SkNchhIsHZl.png)
Vì câu hỏi này hỏi về time zone nên em sẽ dùng artifact Time Zone Information (SYSTEM\CurrentControlSet\Control\TimeZoneInformation) và trích xuất hive system ra để pphân tích  
![image](https://hackmd.io/_uploads/SkD7nUoHZe.png)
ttiếp theo em sẽ dùng registry explorer và đi theo đường dẫn của artifact và thu được  
![image](https://hackmd.io/_uploads/SJC52LsH-e.png)
## Q10 
![image](https://hackmd.io/_uploads/ry4YgDoBWe.png)
Sau khi check phân vùng còn lại thì em thu được 1 file AlpacaCare.docx sau đó em xem properties của file và thu được date Accessed là đáp án vì thời gian là PM nên giờ sẽ là 21 chứ kh pphải là 09 
![image](https://hackmd.io/_uploads/B1DbgDsHZl.png)
## Q11 
em có xem hint bài này và đi theo artifact lnk **Users\Karen\AppData\Roaming\Microsoft\Office\Recent** ở đđâycos 1 file LNK PacaLady trùng vớ tên của Partition 3 mà ttrong ngoặc là A nên em nghĩ nó là phần phân vùng của ổ A 
![image](https://hackmd.io/_uploads/Bk6KzviHZg.png)
## Q12 
![image](https://hackmd.io/_uploads/B108BwjrZx.png)
- tương tự các câu hỏi của ost artifact thì em sẽ dùng kernel ost viewer để check thì em thu được 1 câu hỏi mà quản lý đã gửi cho Karen 
![image](https://hackmd.io/_uploads/H1mAVvsBbl.png)
- và câu trả lời của Karen là 
![image](https://hackmd.io/_uploads/HyYVHPoHWg.png)
## Q13 
![image](https://hackmd.io/_uploads/r1eJUvoHWx.png)
em sẽ tìm tiếp trong phần inbox và thu được
![image](https://hackmd.io/_uploads/rkd6SPoSZg.png)
## Q14 
![image](https://hackmd.io/_uploads/ByQCvPiSbx.png)
Vì câu hỏi này hỏi đến user password nên em sẽ dùng artifact SAM hhive and user information(SAM\Domains\Account\Users) em sẽ trích xuất hive SAM trong FTK Imager 
![image](https://hackmd.io/_uploads/HJx_8wjBWe.png)
tiếp tục em sẽ đi theo đường dẫn của artifact và thu được column last pastword changes của user Karen
![image](https://hackmd.io/_uploads/BJavwPsSZx.png)
## Q15 
![image](https://hackmd.io/_uploads/HyeuqvjBZx.png)
Đối với ccâunayf thì em sẽ dùng artifact Installed Programs(**SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall**) em sẽ load hive Software nãy đã trích xuất trong câu ttrên và đi theo đường dẫn thì em thu được 
![image](https://hackmd.io/_uploads/HJ1X5vsr-l.png)
## Q16 
![image](https://hackmd.io/_uploads/rybVivsSWe.png)
Trong phân vùng thứ 3 em đã tìm được trong câu hỏi trc đó 1 app liên lạc trực tuyến là skype sau khi click vào thì có 1 file là Zone.Identifier ttrongnayf có chứa url để download 
![image](https://hackmd.io/_uploads/SksCqPjS-l.png)
## Q17 
![image](https://hackmd.io/_uploads/r1_UaDiBZe.png)
Câu nnày em sẽ export file AlpacaCare.docx đã tìm được trước đó ra 
![image](https://hackmd.io/_uploads/r12whDiBZg.png)
và mở file đó trong Word, đọc phần cuối ccùa file thì eem thu được kết quả 
![image](https://hackmd.io/_uploads/SkWbpPjB-g.png)
# Bài CTF Sổ đăng ký (Cookie han hoan )
![image](https://hackmd.io/_uploads/HJcGq-nHWx.png)
Khi mở file thì em thu được file NTUSER.DAT 
![image](https://hackmd.io/_uploads/SJqbcb3BWe.png)
file này là 1 registry hive lưu trữ thông tin liên quan đến người dùng nên em sẽ mở registry explorer để phân tích
sau khi đọc đề thì em thấy đề bài liên quan tới artifact Autostart program (Autorun) nên em sẽ check trong thư mục chứa artifact đó là NTUSER.DAT\Software\Microsoft\Windows\CurrentVersion\Run
![image](https://hackmd.io/_uploads/BJOVhbhB-x.png)
kết qủa em thu được trong value của phần thư mục đó là 1 lệnh powershell được thực hiện, em sẽ copy ra note 
![image](https://hackmd.io/_uploads/SkBp3W2BWg.png)
em hhiểu được đoạn lệnh này là Frombase64 là giải mã đoạn base64 được đưa lên và đoạn ssau khi giải mã là 1 file nén nên tiếp theo nó sẽ giải nén sau đó đưa nội dung vào biến $_ và đọc dữ liệu dưới dạng ASCII em sẽ dùng python và thực hiện các bước tương tự 
![image](https://hackmd.io/_uploads/B1qQeMnB-e.png)
em sẽ giải mã đoạn base64, giải nén dữ liệu được giải mã và xuất nó ra thì em thu được dữ liệu ở phần giải mã là flag
![image](https://hackmd.io/_uploads/H1fZWG3rZx.png)

# Bài CTF Basic Disk 2 
![image](https://hackmd.io/_uploads/SkmMjz2BZg.png)
## Câu 1
Câu này hỏi về build number nên em sẽ sử dụng artifact OS version(SOFTWARE\Microsoft\Windows NT\CurrentVersion)
Đầu tiên em sẽ dùng FTK để ptich file disk image trích xuất hive software 
![image](https://hackmd.io/_uploads/r12opGhBWl.png)
Sau khi đi theo đường dẫn thì em thu được Build Number của máy là 19043 
![image](https://hackmd.io/_uploads/rJ5uaMhBWl.png)
và product name là window 10
![image](https://hackmd.io/_uploads/BJwB0Ghr-g.png)
## Câu 2 
Ở phần Recycle Bin thì em có tìm được 1 file chứa mật khẩu 
![image](https://hackmd.io/_uploads/B1pCcG-UZx.png)
Sau đó em sẽ dùng artifact Browser History và trích file History của Microsoft Edge ra 
![image](https://hackmd.io/_uploads/S1OIofZU-l.png)
tiếp theo em sẽ dùng DB Browser for SQLite vào tab Browse Data chọn table là urls
![image](https://hackmd.io/_uploads/SyUFhzZLZe.png)
em tìm đc 1 link sau
![image](https://hackmd.io/_uploads/BJ8hhzb8We.png)
em dán lên web và được
![image](https://hackmd.io/_uploads/HJCyafWUbx.png)
em điền password nãy tìm được vào và thu đc 1 đoạn base64
![image](https://hackmd.io/_uploads/B1tO6GZ8Zl.png)
Sau đó em decode và thu được
![image](https://hackmd.io/_uploads/Byd5pf-U-e.png)
đáp án cuối ccùng là **KCSC{Win10-19043_hehe_y0u_f0und_it}**
# Bài Lab Windows Investigating 
![image](https://hackmd.io/_uploads/HJol7j2rWx.png)
Vì câu này hỏi các thông tin liên quan đến hệ thống nên em sẽ vào system information để check thử
 ![image](https://hackmd.io/_uploads/H1kjzonrWg.png)
 
 ![image](https://hackmd.io/_uploads/r1hFdo2S-x.png)
 Câu này hỏi người dùng đăng nhập cuối là ai ngoài em, em sẽ dung event viewer và filter ra event ID 4624 vì event ID này được ggghi lại khi có lần đăng nhập tthành công 
![image](https://hackmd.io/_uploads/r1hhmjhB-x.png)
kết quả em tìm được người dùng Administrator 
![image](https://hackmd.io/_uploads/SkgNushHZl.png)

![image](https://hackmd.io/_uploads/SyQYqi2S-x.png)
Câu này em sẽ dùng lệnh net user john trong powershell để phân tích, kết quả sẽ hiển thị thông tin chi tiết của user john và cuối cùng em thu được
![image](https://hackmd.io/_uploads/By8hti2B-x.png)

![image](https://hackmd.io/_uploads/HyZ1ps3BZl.png)

Khi vừa khởi động máy ảo thì em thấy trong cmd nó được kết nối với địa chỉ IP nào đó, em summit thử và nó là đáp án
![image](https://hackmd.io/_uploads/S1pHnsnSbg.png)

![image](https://hackmd.io/_uploads/Skg0ainBZx.png)
em sẽ xem các user nằm trong group administrator nnày là ai vì group này là group của administrator 
![image](https://hackmd.io/_uploads/HysIpj2BWe.png)
kết quả em thu được user là Guest và Jenny
![image](https://hackmd.io/_uploads/H1EjajhH-l.png)

![image](https://hackmd.io/_uploads/BkY2Ri3H-e.png)
Khi vào task scheduler em thấy 1 task lạ nó có tên là clean file ssystem và phần description là clear old file nhưng phần action của nó lại thực thi 1 file powershell nên em nghĩ đây là malicious task
![image](https://hackmd.io/_uploads/rJXZAi3r-g.png)
![image](https://hackmd.io/_uploads/B1FvAohBbg.png)

![image](https://hackmd.io/_uploads/Sk2fk2hH-x.png)
Câu này thì em ccheck trong phần action của ảnh trên

![image](https://hackmd.io/_uploads/HJBIJ3nHbe.png)
Câu này thì eem thấy trong phần action của ảnh trên nó thực thi lệnh netcat và tag -l là listening nên theo sau đó 1348 là port

![image](https://hackmd.io/_uploads/rkrll32BZg.png)

Đối với câu này thì em sử dụng lệnh net user giống câu john hồi nãy để hiển thị chi tiết thông tin về user đó và thu được kkếtquar 
![image](https://hackmd.io/_uploads/S1S3y3hB-x.png)

![image](https://hackmd.io/_uploads/SyHgG32Bbe.png)
Vì action của task clean file system được thực hiện trong thư mmục C:\TMP nên em mở file explorer và đi theo đường dẫn thì thu được kết quả 
![image](https://hackmd.io/_uploads/HySR-33B-l.png)

![image](https://hackmd.io/_uploads/SkWPB32rZe.png)
Đói với câu này em có search thử trên gg thì nó có liên quan tới event ID 4672
![image](https://hackmd.io/_uploads/Syfrfnhr-g.png)
em sẽ lọc các event ID là 4672 và khoảng thời gggian compromise diễ ra
![image](https://hackmd.io/_uploads/BkmqmnnrZg.png)
kết quả em tìm được 1 thời gian giống hint của câu hỏi này
![image](https://hackmd.io/_uploads/SkRXBh3Sbl.png)

![image](https://hackmd.io/_uploads/r16WUn2rWg.png)

nãy trong câu hỏi waht date did the compromise take place thì em có tìm được 1 file text trong đó có chứa thông tin veef hacktools mimikatz
![image](https://hackmd.io/_uploads/HyqqH3nrWl.png)

![image](https://hackmd.io/_uploads/H1aTuh2r-l.png)
em có tìm hiểu được thì C:\Windows\System32\drivers\etc\hosts là một tệp văn bản đặc biệt trong hệ điều hành Windows dùng để ánh xạ tên miền tới địa chỉ IP. em sẽ check thử trong này
![image](https://hackmd.io/_uploads/HyHLD3nS-e.png)
bên trong tập ttinnayf chứa cả google.com và www.google.com rất có thể kẻ tấn công đã che giấu địa chỉ IP máy chủ C2(Command and Control) ở đây vì khi ping trong cmd thì nó lại là 1 địa chỉ IP khác nên em nghĩ ngta giấu địa chỉ IP thật trong tên miền này
![image](https://hackmd.io/_uploads/H1MYu33BZx.png)

![image](https://hackmd.io/_uploads/r1-fs2nHZe.png)
em tìm hiểu được thì đường dẫn C:\inetpub\wwwroot là thư mục mặc định mà IIS (Internet Information Services) máy chủ web của Windows sử dụng để lưu trữ các tệp web (như HTML, ASP, PHP, ...) phục vụ cho các trang web chạy trên máy đó. Thư mục này có thể chứa các file mà attacker tải lên máy chủ web để thực thi lệnh từ xa, truy cập file hệ thống, hoặc duy trì quyền kiểm soát
![image](https://hackmd.io/_uploads/SJMFcnnSbl.png)
em tìm được ccác file có phần extension suspectlà .jsp có thể attacker tải lên JSP web shell để thực thi lệnh từ xa, giống như .aspx hay .php 
![image](https://hackmd.io/_uploads/Syx8phnH-x.png)
em mở firewall lên và vào phần inbound rules để xem các kết nối bên ngoài đi vào hệ thống thì thấy firewall cho phép kết nối từ bbên ngoài rất có thể là của attacker
![image](https://hackmd.io/_uploads/SJQKn33BWe.png)
Khi em xem chi tiết hơn bằng properties thì em thấy được protocol và port của kết nnối này 
![image](https://hackmd.io/_uploads/Skg1p2hBbl.png)
![image](https://hackmd.io/_uploads/rJlCi23SWe.png)
như đã đề ccập ở trên thì kẻ tấn công đã che giấu địa chỉ IP máy chủ C2(Command and Control) ở C:\Windows\System32\drivers\etc\hosts vì khi ping trong cmd của google.com thì nó lại là 1 địa chỉ IP khác nên site được nhắm đến là google.com

