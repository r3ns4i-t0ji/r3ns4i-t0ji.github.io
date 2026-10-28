# Mô hình OSI 
nguồn: https://vietnix.vn/mo-hinh-osi-la-gi/

![image](https://hackmd.io/_uploads/SJTGC3Lc-e.png)

**Mô hình OSI (Open Systems Interconnection)**: là một khung tham chiếu tiêu chuẩn do Tổ chức Tiêu chuẩn hóa Quốc tế (ISO) phát triển, nhằm mô tả cách các hệ thống mạng máy tính giao tiếp với nhau. Mô hình này chia quá trình truyền thông mạng thành 7 tầng (layer), mỗi tầng đảm nhận một chức năng riêng biệt, giúp đơn giản hóa, chuẩn hóa và tăng khả năng tương thích giữa các thiết bị, phần mềm và giao thức mạng khác nhau.
## 1. Physical Layer:
Tầng dưới cùng và là tầng duy nhất tiếp xúc trực tiếp với môi trường phần cứng.
- **Chức năng**: Chuyển đổi các bit nhị phân (0 và 1) của Frame thành các tín hiệu vật lý như xung điện (trên cáp đồng), ánh sáng (trên cáp quang) hoặc sóng radio (mạng không dây) để truyền đi. Nó quy định các yếu tố vật lý như điện áp, tốc độ truyền cáp, cấu hình chân cắm.
- **Thiết bị**: Cáp mạng, Hub, Repeater, Modem.
- **PDU**: Bit
## 2. Data Link layer:
Tầng này chịu trách nhiệm truyền dữ liệu giữa hai thiết bị nằm trực tiếp trên cùng một mạng vật lý (node-to-node).
- **Chức năng**: Đóng gói các Packet từ tầng 3 vào các Frame. Tầng này sử dụng địa chỉ vật lý (MAC Address) được in cứng trên card mạng để xác định thiết bị gửi và nhận cục bộ. Nó cũng kiểm tra lỗi vật lý sinh ra trong quá trình truyền tải (thông qua mã FCS/CRC).
- **Thiết bị**: Switch (Bộ chuyển mạch), Bridge, Card mạng (NIC).
- **Giao thức tiêu biểu**: Ethernet (mạng dây), Wi-Fi (802.11), PPP.
- **PDU**: Frame
## 3. Network layer: 
Tầng 3 giúp dữ liệu đi xuyên qua các mạng khác nhau.
- **Chức năng**:  Định tuyến (Routing): Tìm đường đi ngắn nhất và tốt nhất cho gói tin đi qua các router.
- **Địa chỉ hóa logic (Logical Addressing)**: Gắn địa chỉ IP nguồn và IP đích vào gói tin.
- **Thiết bị**: Router (Bộ định tuyến).
- **Giao thức tiêu biểu**: IPv4, IPv6, ICMP (dùng cho lệnh ping), IPsec.
- **PDU**: Packet (Gói tin).
## 4. Transport layer: 
Tầng này vận chuyển dữ liệu từ tiến trình này sang tiến trình khác (process-to-process) một cách đáng tin cậy hoặc nhanh chóng.
- **Chức năng**: Phân chia dữ liệu lớn từ tầng trên thành các phần nhỏ hơn (Segmentation). Kiểm soát luồng (Flow control) để tránh làm quá tải máy nhận. Kiểm soát lỗi (Error control) và yêu cầu gửi lại các phần dữ liệu bị mất.
- **Giao thức tiêu biểu**: 
  - TCP: Chậm nhưng chắc chắn, đảm bảo dữ liệu đến đủ và đúng thứ tự.
  - UDP: Nhanh nhưng không đảm bảo, thích hợp cho livestream hoặc game online.
- **PDU**: Segment (với TCP) hoặc Datagram (với UDP).
## 5. Session layer: 
Quản lý việc thiết lập, duy trì và kết thúc phiên truyền thông giữa các ứng dụng.
- **Chức năng**: Thiết lập, duy trì, đồng bộ hóa và chấm dứt các phiên giao tiếp giữa hai ứng dụng. Nó cung cấp các điểm đánh dấu (checkpoints) trong quá trình truyền dữ liệu. Nếu mạng bị rớt giữa chừng, quá trình tải lại có thể tiếp tục từ checkpoint gần nhất thay vì phải tải lại từ đầu.
- **Giao thức tiêu biểu**: NetBIOS, PPTP, RPC.
## 6. Presentation layer: 
Đảm bảo định dạng dữ liệu phù hợp cho ứng dụng nhận.
- **Chức năng**: Chuyển đổi dữ liệu từ định dạng của ứng dụng sang định dạng chung của mạng (ví dụ: chuyển văn bản thành mã ASCII).
  - **Mã hóa/Giải mã (Encryption/Decryption)**: Đảm bảo bảo mật (ví dụ: SSL/TLS).
  - **Nén dữ liệu (Compression)**: Thu gọn kích thước dữ liệu để truyền đi nhanh hơn.
- **Định dạng/Giao thức**: JPEG, PNG, MP4, SSL/TLS.
## 7. Application layer: 
Cung cấp các dịch vụ truyền thông cho các ứng dụng, như truyền tệp, truyền thư điện tử, hoặc truyền hình ảnh.
- **Chức năng**: Xác định đối tượng giao tiếp, xác định tính khả dụng của tài nguyên mạng và đồng bộ hóa giao tiếp.
- **Giao thức tiêu biểu**: HTTP/HTTPS (lướt web), FTP (truyền file), SMTP/IMAP (email), DNS (phân giải tên miền).
# Cấu trúc thành phần các gói tin trong mô hình OSI, độ dài các trường dữ liệu và tác dụng
nguồn: https://www.geeksforgeeks.org/computer-networks/physical-layer-in-osi-model/ em có đọc và lấy thông tin từ phần explore

![image](https://hackmd.io/_uploads/rJNzZa8cZg.png)

- Quá trình đóng gói dữ liệu qua các tầng tạo ra các Đơn vị Dữ liệu Giao thức (PDU - Protocol Data Unit)
- Khi dữ liệu di chuyển từ Tầng 7 xuống Tầng 1 ở máy gửi, mỗi tầng sẽ thêm thông tin điều khiển của riêng mình. 
## Tầng 4:Transport Layer - Cấu trúc Segment
- Tại tầng này, dữ liệu được chia nhỏ thành các Segment (Đoạn). Giao thức phổ biến nhất là TCP (Transmission Control Protocol). Header của TCP có kích thước tiêu chuẩn là 20 bytes (có thể lên đến 60 bytes nếu có phần Options).

| Tên trường (Field) | Độ dài | Tác dụng (Chức năng) |
| :--- | :--- | :--- |
| **Source Port** | 2 bytes | Xác định cổng của ứng dụng gửi dữ liệu. |
| **Destination Port** | 2 bytes | Xác định cổng của ứng dụng nhận dữ liệu. |
| **Sequence Number** | 4 bytes | Đánh số thứ tự cho gói tin để bên nhận sắp xếp lại đúng thứ tự ban đầu. |
| **Acknowledgment Number** | 4 bytes | Xác nhận đã nhận được các segment trước đó một cách an toàn. |
| **Data Offset / Header Length** | 4 bits | Xác định kích thước của TCP header, giúp định vị nơi bắt đầu của dữ liệu thực. |
| **Reserved** | 3 bits | Dành riêng cho sử dụng trong tương lai (luôn bằng 0). |
| **Control Flags** | 9 bits | Chứa các cờ điều khiển trạng thái kết nối (URG, ACK, PSH, RST, SYN, FIN). |
| **Window Size** | 2 bytes | Cho biết kích thước bộ đệm (số byte) mà bên nhận có thể tiếp nhận hiện tại (Flow control). |
| **Checksum** | 2 bytes | Kiểm tra lỗi cho cả Header và Dữ liệu để đảm bảo tính toàn vẹn. |
| **Urgent Pointer** | 2 bytes | Chỉ ra vị trí kết thúc của dữ liệu khẩn cấp (chỉ dùng khi cờ URG được bật). |
| **Options** | 0 - 40 bytes | Chứa các tùy chọn bổ sung (như kích thước Segment tối đa - MSS). |
## Tầng 3: Network Layer - Cấu trúc Packet
Tại tầng này, Segment được đóng gói thêm Header của tầng mạng để tạo thành Packet (Gói tin). Giao thức tiêu chuẩn là IPv4. Header của IPv4 có kích thước từ 20 bytes đến 60 bytes.
| Tên trường (Field) | Độ dài | Tác dụng (Chức năng) |
| :--- | :--- | :--- |
| **Version & IHL** | 1 byte (4 bits + 4 bits) | Xác định phiên bản IP (IPv4) và chiều dài của IPv4 Header (IHL). |
| **Type of Service (ToS)** | 1 byte | Xác định mức độ ưu tiên của gói tin (Quality of Service - QoS). |
| **Total Length** | 2 bytes | Kích thước tổng cộng của toàn bộ gói tin IP (bao gồm Header và Data). |
| **Identification** | 2 bytes | Dùng để nhận diện các mảnh vỡ của một gói tin lớn khi bị phân mảnh (Fragmentation). |
| **Flags & Fragment Offset** | 2 bytes (3 bits + 13 bits) | Điều khiển phân mảnh (có được phép cắt nhỏ không) và vị trí của mảnh vỡ đó so với gói tin gốc. |
| **Time to Live (TTL)** | 1 byte | Ngăn chặn gói tin lặp vô hạn trong mạng. Mỗi khi qua một Router, TTL trừ đi 1. Bằng 0 thì gói tin bị hủy. |
| **Protocol** | 1 byte | Xác định giao thức của tầng trên (Tầng 4) đang sử dụng (VD: 6 cho TCP, 17 cho UDP). |
| **Header Checksum** | 2 bytes | Kiểm tra lỗi chỉ dành riêng cho IPv4 Header. |
| **Source IP Address** | 4 bytes | Địa chỉ IP (logic) của thiết bị gửi. |
| **Destination IP Address** | 4 bytes | Địa chỉ IP (logic) của thiết bị nhận. |
| **Options** | 0 - 40 bytes | Các tùy chọn bảo mật hoặc định tuyến (ít khi được sử dụng). |
## Tầng 2: Data Link Layer - Cấu trúc Frame
Packet tiếp tục được đóng gói thành Frame (Khung dữ liệu) để truyền trên môi trường vật lý. Giao thức phổ biến nhất cho mạng LAN là Ethernet (IEEE 802.3). Kích thước Header và Trailer của một Frame chuẩn là 18 bytes.
| Tên trường (Field) | Độ dài | Tác dụng (Chức năng) |
| :--- | :--- | :--- |
| **Preamble & SFD** | 8 bytes | (Thường tính ở Tầng 1) Giúp đồng bộ hóa xung nhịp giữa bên gửi và bên nhận, đánh dấu sự bắt đầu của Frame. |
| **Destination MAC Address** | 6 bytes | Địa chỉ MAC (vật lý) của thiết bị nhận trực tiếp trong cùng mạng nội bộ. |
| **Source MAC Address** | 6 bytes | Địa chỉ MAC (vật lý) của thiết bị gửi trực tiếp trong cùng mạng nội bộ. |
| **EtherType / Length** | 2 bytes | Cho biết giao thức nào đang được đóng gói trong phần Payload (VD: 0x0800 cho IPv4). |
| **Payload (Dữ liệu)** | 46 - 1500 bytes | Chứa gói tin IP (Packet) nhận từ Tầng 3. Nếu dữ liệu nhỏ hơn 46 bytes, nó sẽ được đệm thêm (padding). |
| **FCS (Frame Check Sequence)** | 4 bytes | Thêm vào cuối Frame (Trailer). Sử dụng thuật toán CRC để phát hiện lỗi trong quá trình truyền tải tín hiệu vật lý. |
# Các giao thức 
nguồn: https://kungfutech.edu.vn/posts/giai-thich-cac-giao-thuc-internet-ip-tcp-udp-http-va-hon-the
## IP (Internet Protocol)
**Chức Năng**: Định tuyến và địa chỉ các gói tin qua các mạng.
- IPv4: Địa chỉ 32-bit (ví dụ: 192.168.0.1)
- IPv6: Địa chỉ 128-bit để đáp ứng nhu cầu nhiều thiết bị hơn.
**Trách Nhiệm**:
- Địa chỉ: Gán địa chỉ duy nhất cho các thiết bị.
- Chuyển tiếp gói tin: Gửi gói từ nguồn đến đích.
**Tính Năng**:
- Giao thức không kết nối (không đảm bảo giao hàng)
Phân mảnh và tái hợp gói tin.
- Sử dụng IPv6 khi có thể để tránh thiếu địa chỉ.
- Đảm bảo cấu hình chính xác cho địa chỉ IP để tránh xung đột.
**Hạn Chế**:
- Không sử dụng kết nối không bảo mật cho các ứng dụng quan trọng.
## TCP (Transmission Control Protocol)
**Chức Năng**: Giao  dữ liệu đáng tin cậy, có thứ tự và kiểm soát lỗi.
- Hoạt động trên IP (mô hình TCP/IP)

**Tính Năng Chính**:
- **Kết nối có định hướng**: Thiết lập kết nối thông qua bắt tay ba bước.
- **Phân đoạn**: 
  - Chia dữ liệu thành các đoạn.
  - Phát hiện lỗi và truyền lại.
  - Kiểm soát luồng và kiểm soát tắc nghẽn.
- Trường Hợp Sử Dụng: Lướt web (HTTP/HTTPS), email (SMTP, IMAP), truyền tệp (FTP)
## UDP (User Datagram Protocol)
**Chức Năng**: Giao tiếp đơn giản, nhanh chóng, không kết nối.
- Hoạt động trên IP

**Tính Năng Chính**:
- Không kết nối: Không có bắt tay 3 bước.
- Không đảm bảo đủ dữ liệu hoặc thứ tự.
- Tải trọng tối thiểu, độ trễ thấp.

**Trường Hợp Sử Dụng**: Truy vấn DNS, truyền phát video/audio, trò chơi trực tuyến, VoIP

## HTTP (Hyper Text Transfer Protocol)
**Chức Năng**: Giao thức giao tiếp cho web.

- Hoạt động trên TCP (thường là cổng 80)
  - HTTP/1.1: Giao thức dựa trên văn bản với mô hình yêu cầu/phản hồi.
  - HTTP/2: Đa phân kênh và đóng gói nhị phân để hiệu suất cao hơn.
  - HTTP/3: Sử dụng QUIC qua UDP để giảm độ trễ và cải thiện độ tin cậy.

**Thành Phần**:
- Yêu cầu: Phương thức (GET, POST, PUT, DELETE)
- Phản hồi: Mã trạng thái (200, 404, 500)

## HTTPS (Giao Thức Truyền Tải Siêu Văn Bản Bảo Mật)
- Phiên bản bảo mật của HTTP
- Sử dụng TLS/SSL để mã hóa và xác thực.
- Ngăn chặn việc nghe lén và can thiệp.
## DNS (Hệ Thống Tên Miền)
**Chức Năng**: Chuyển đổi tên miền thành địa chỉ IP.
- Hệ thống phân phối phân cấp.
- Các loại bản ghi DNS:
  - A: Địa chỉ IPv4
  - AAAA: Địa chỉ IPv6
  - CNAME: Tên chuẩn
  - MX: Máy chủ thư
## SMTP, IMAP, POP3 
- **SMTP (Simple Mail Transfer Protocol)**: Gửi email.
- **IMAP (Internet Message Access Protocol)**: Truy cập email từ xa, hỗ trợ thư mục.
- **POP3 (Post Office Protocol v3)**: Tải email và tùy chọn xóa trên máy chủ.
## FTP / SFTP / SCP
**FTP**: Truyền tệp cơ bản qua TCP (cổng 20/21), không mã hóa.
**SFTP**: Truyền tệp an toàn qua SSH.
**SCP**: Sao chép an toàn qua SSH, đơn giản hơn SFTP.
## ICMP (Internet Control Message Protocol)
**Chức Năng**: Chẩn đoán mạng và thông báo lỗi.
- Được sử dụng bởi các công cụ như ping và traceroute.
Không được sử dụng cho việc truyền dữ liệu.
- Báo cáo lỗi như máy chủ không thể đến hoặc thời gian vượt quá.
## SNMP (Simple Network Management Protocol)
**Chức Năng**: Giám sát và quản lý các thiết bị mạng.

- Cung cấp số liệu từ bộ định tuyến, công tắc và máy chủ.
- Các phiên bản: SNMPv1, v2c, v3 (với các cải tiến về bảo mật).
## DHCP (Dynamic Host Configuration Protocol)
**Chức Năng**: Gán địa chỉ IP tự động.
- Gán địa chỉ IP tự động cho các thiết bị.
- Cung cấp subnet mask, gateway, máy chủ DNS.
- Giảm thiểu cấu hình mạng thủ công.
# Wireshark và Tshark
## Wireshark 

![image](https://hackmd.io/_uploads/SyQ9f6P5be.png)

Wireshark là một phần mềm dùng để phân tích và giám sát lưu lượng mạng.
- Phân tích Gói Tin: Wireshark cho phép theo dõi và phân tích từng gói tin dữ liệu trên mạng. Wireshark có thể xem các thông tin chi tiết như nguồn, đích, loại gói tin, dữ liệu payload và nhiều thông tin khác.
- Đánh giá Hiệu suất Mạng: Wireshark cung cấp thông tin về thời gian phản hồi (response time), độ trễ (latency), và các thống kê khác, giúp đánh giá hiệu suất của mạng.
Phân tích Giao thức: Wireshark hỗ trợ nhiều giao thức mạng khác nhau. Có thể phân tích giao thức HTTP, TCP, UDP, IP, DNS, và nhiều giao thức khác.
- Điều tra Vấn đề Mạng: Khi xảy ra vấn đề mạng, Wireshark là một công cụ mạnh mẽ để phân tích và xác định nguyên nhân của sự cố.

Ví dụ về wireshark:

![image](https://hackmd.io/_uploads/S1GYmpwq-l.png)

## Tshark 

![image](https://hackmd.io/_uploads/rkigsTw5bg.png)

TShark là một công cụ thuộc Wireshark, được thiết kế để chụp và phân tích các gói dữ liệu từ dòng lệnh.
- TShark có thể lắng nghe trên các card mạng (interfaces) của hệ thống (ví dụ: eth0, wlan0) để chụp lại toàn bộ dữ liệu đang lưu thông.
- TShark cho phép đọc và phân tích trực tiếp các file bắt gói tin đã lưu trước đó .pcap, .pcapng

Ví dụ trích xuất hid data của các packet usb bằng tshark: 

![image](https://hackmd.io/_uploads/HJLUDTwcWe.png)

# Scapy 
nguồn: https://scapy.readthedocs.io/en/latest/usage.html#interactive-tutorial
## Các hàm tra cứu tích hợp sẵn trong Scapy:
- `ls()`: Liệt kê tất cả các giao thức (layers) mà Scapy hỗ trợ.
- `ls(IP)`: Hiển thị chi tiết các trường (fields) của một giao thức cụ thể (ví dụ: IP).
- `lsc()`: Liệt kê tất cả các hàm (commands) do Scapy cung cấp (như sniff, sr, send...).
- `explore()`: Mở giao diện tương tác GUI/CLI để duyệt qua các giao thức.
- `help(sniff)`: Xem tài liệu hướng dẫn của một hàm cụ thể.
- `conf`: Hiển thị cấu hình hiện tại của Scapy (interface, routing, v.v.).
## Các tầng giao thức
Scapy sử dụng toán tử `/` để xếp chồng các giao thức
**Layer 2 (Data Link)**
- `Ether()`: Giao thức Ethernet (MAC nguồn, MAC đích, type).
- `ARP()`: Giao thức phân giải địa chỉ (ARP Request, ARP Reply).
- `Dot1Q()`: VLAN 802.1Q (VLAN ID).
- `Dot11()`: Wi-Fi / 802.11 (Quản lý các frame beacon, probe request/response).

**Layer 3 (Network)**
- `IP()`: IPv4 (src, dst, ttl, chksum, flags).
- `IPv6()`: IPv6.
- `ICMP()`: Ping, Error messages (type, code).
- `IPsec() / AH() / ESP()`: Các giao thức bảo mật IP.

**Layer 4 (Transport)**
- `TCP()`: Transmission Control Protocol (sport, dport, flags (S, A, R, P, F, U), seq, ack).
- `UDP()`: User Datagram Protocol.
- `SCTP()`: Stream Control Transmission Protocol.

**Layer 7 (Application)**
- `DNS() / DNSQR() / DNSRR()`: Truy vấn và phản hồi DNS.
- `DHCP() / BOOTP()`: Cấp phát IP động.
- `HTTP() / HTTPRequest() / HTTPResponse()`: (Cần load module load_layer("http")).
- `NTP()`: Network Time Protocol.
- `SNMP()`: Simple Network Management Protocol.
- `ISAKMP()`: Dùng trong thiết lập VPN (IKE).

**Payload & Raw Data**
- `Raw(load="data")`: Chứa dữ liệu thô (ví dụ: payload của TCP/UDP).
- `Padding()`: Các byte đệm thêm vào cuối gói tin.
## Gửi và nhận gói tin
| Hàm | Cấp độ | Mục đích |
| --- | --- | --- |
| `send(pkt)` | Layer 3 | Gửi gói tin, không chờ phản hồi. |
| `sendp(pkt)` | Layer 2 | Gửi gói tin ở Tầng 2 (cần định nghĩa MAC). |
| `sr(pkt)` | Layer 3 | Gửi và nhận nhiều gói tin. |
| `sr1(pkt)` | Layer 3 | Gửi và nhận **1** gói tin phản hồi đầu tiên. |
| `srp(pkt)` | Layer 2 | Gửi và nhận nhiều gói tin ở Tầng 2. |
| `srp1(pkt)` | Layer 2 | Gửi và nhận **1** gói tin ở Tầng 2. |
| `srloop(pkt)` | Layer 3 | Gửi gói tin liên tục trong một vòng lặp. |
## Bắt gói tin và lưu trữ (Sniffing & PCAP)
`sniff(filter="tcp port 80", iface="wlan0", count=100, prn=lambda x: x.summary(), store=True)`
- `filter`: BPF filter (giống Wireshark: arp, icmp, tcp and host 1.1.1.1).
- `iface`: Card mạng để bắt (VD: eth0, wlan0).
- `count`: Số gói tin cần bắt (0 là bắt mãi mãi).
- `prn`: Callback function để xử lý từng gói tin (như in ra màn hình).
- `store`: Cờ xác định có lưu gói tin vào bộ nhớ hay không (False nếu bắt thời gian dài để tránh tràn RAM).
`timeout`: Dừng bắt sau X giây.

**Đọc & Ghi PCAP**
- `wrpcap("file.pcap", pkts)`: Ghi danh sách gói tin ra file.
- `rdpcap("file.pcap")`: Đọc file PCAP vào một danh sách.
- `PcapReader("file.pcap")`: Đọc file PCAP dưới dạng generator (tiết kiệm RAM cho file lớn).
## Phân Tích & Thao Tác Gói Tin (Packet Manipulation)
`pkt = IP(dst="8.8.8.8")/TCP(dport=80)/Raw(b"GET / HTTP/1.1\r\n\r\n")`
- `pkt.show()`: Hiển thị cấu trúc gói tin (rất chi tiết, phân chia theo từng Layer).
- `pkt.summary()`: Hiển thị một dòng tóm tắt (VD: IP / TCP 192.168.1.5:4532 > 8.8.8.8:80 S).
- `pkt.haslayer(TCP)`: Kiểm tra xem gói tin có chứa Tầng TCP không (trả về True/False).
- `pkt.getlayer(TCP) hoặc pkt[TCP]`: Lấy ra trích xuất của tầng TCP.
- `pkt.command()`: Trả về chuỗi lệnh Python để tạo lại chính gói tin này.
- `hexdump(pkt)`: In ra mã Hex của gói tin (giống xxd).
- `bytes(pkt) hoặc raw(pkt)`: Chuyển gói tin thành chuỗi byte thô để gửi qua socket.
# Các bài lab
## netlab0 
Trong file pcap thì em thấy đc 1 packet
![image](https://hackmd.io/_uploads/BJRFsFP5Wl.png)
Em decode theo ROT13 thì thu được
![image](https://hackmd.io/_uploads/ryk0iYwqZl.png)
**Flag{NetLab0_FTP_1s_n0t_s3cUr3333}**
## netlab1
Khi em vào phần export object của wireshark thì em thấy có 1 file nén và 1 file password text
![image](https://hackmd.io/_uploads/Bk0H3Yw5Zx.png)
em extract 2 file này ra và sử dụng mk của file passwd để giải nén file 
![image](https://hackmd.io/_uploads/S1pa2FDcZl.png)
Em thấy nó là 1 file database
![image](https://hackmd.io/_uploads/rkL-aFP9Wl.png)
Em dùng DB browser để phân tích file này 
![image](https://hackmd.io/_uploads/HJawaKvqZe.png)
Sau đó em thấy flag được ẩn trong cột Billing City
**Flag{Netlab1_N0w_Y0u_SMB??}**
## netlab2 
Ở http em có tìm được 1 file update.sh nhưu sau 

![image](https://hackmd.io/_uploads/ryx00UF9-e.png)

đoạn bash này nó sẽ lấy từng file trong thư mục, nén và mã hóa những file đó bằng base64, tiếp theo nó sẽ chia nhỏ dữ lệnh `sed "s/.\{$b\}/&\n/g"` Vì một tên miền DNS có giới hạn về độ dài (tối đa 253 ký tự, mỗi label/subdomain không quá 63 ký tự), đoạn mã phải dùng sed để cắt chuỗi Base64 siêu dài ở trên thành các đoạn nhỏ, mỗi đoạn dài 50 ký tự, Vòng lặp này lấy các đoạn 50 ký tự (biến `$i`) và gộp cứ 4 đoạn lại với nhau (do biến `$s=4`). Giữa các đoạn được nối bằng chuỗi -., `$(echo $f|base58)`: Nó lấy tên file gốc ($f), mã hóa bằng chuẩn Base58 rồi gắn vào cuối chuỗi subdomain kia để máy chủ đích biết dữ liệu này thuộc về file nào. 
Trong bảng mã Base64 có chứa hai ký tự là dấu cộng + và dấu gạch chéo /. Tuy nhiên, hai ký tự này không hợp lệ trong cấu trúc tên miền DNS. Lệnh `tr`sẽ thay thế `+ thành } và / thành { ` để đảm bảo lệnh truy vấn DNS không bị lỗi.
Vì vậy ở dns em thấy các domain của nó đã bị biến thành 

![image](https://hackmd.io/_uploads/Bkaw4DKq-g.png)

### Tshark
Đối với tshark em sẽ trích xuất tất cả các domain này ra 

![image](https://hackmd.io/_uploads/rkryIPK5-g.png)

Tiếp theo em sẽ thay thế các chuỗi mà nó bị biến đổi 

![image](https://hackmd.io/_uploads/SJN78wY9Zl.png)

Vì cứ mỗi 4 chuỗi data là sẽ có 1 chuỗi chứa tên của file được mã hóa bằng base58 nên em sẽ dịch các chuỗi, sau khi decode thì em thấy chuỗi này có đoạn tên base58 của nó là Flag.kbdx khá khả nghi   

![image](https://hackmd.io/_uploads/SyxiIPY5-g.png)

em sẽ trích data base64 của nó, tách các chuỗi kh cần thiết và decode thì em thu được

![image](https://hackmd.io/_uploads/HkRvPvF5-x.png)

Giải nén tiếp thì em thu được 

![image](https://hackmd.io/_uploads/HJZ1OPK9Ze.png)

Khi mở file thì eem thấy nó cần có mật khẩu

![image](https://hackmd.io/_uploads/SydH_vtcbx.png)

Đầu tiên em sẽ ttrích xuất hash của nó 

![image](https://hackmd.io/_uploads/rywq_Pt9We.png)

Sau đó em crack bằng john thì thu được 

![image](https://hackmd.io/_uploads/HJtMFvF5-g.png)
h nhập pass là iloveyou th, Sau đó em copy passwd ở đây

![image](https://hackmd.io/_uploads/SkZwtwYqWg.png)

**Flag{NetLab2_DNS_3xf1ltr4t10n_15_5t3al7hy}**
### Scapy 
Em viết script trích xuất như sau 

![image](https://hackmd.io/_uploads/BJLz2DFqbe.png)

Em dùng hàm `rdpcap()` đọc file pcap, sau đó duyệt qua từng packet, dùng hàm `.haslayer()` chỉ giữ lại những gói có giao thức DNS, đồng thời gói đó phải chứa DNSQR
Trong cấu trúc DNS, cờ `qr`:
- `qr == 0`: Là máy khách đang đi Hỏi (Query) máy chủ xem tên miền này IP là gì. 
- `qr == 1`: Là máy chủ đang Trả lời (Response) kết quả IP về cho máy khách.
ở đây thì em cần `qr==0` tiếp theo trích xuất các trường query name bằng hàm .qname sau đó decode thành utf-8 th 
chạy code thì em thu được

![image](https://hackmd.io/_uploads/Bk_bCPF9Zx.png)

Sau đó tiếp tục decode như bước ở tshark và thu được flag

## netlab5
### Tshark 
Ở bài này thì em thấy nó giấu từng chữ ở mỗi packet theo method SYN của tcp protocol 

![image](https://hackmd.io/_uploads/H1PvKVFqWx.png)

Em filter ra và em thấy nó giấu trong trường tcp payload 

![image](https://hackmd.io/_uploads/Sys7qVtcbl.png)

H em dùng tshark và trích xuất nó ra 

![image](https://hackmd.io/_uploads/ByoscNt5bx.png)

Sau khi trích thì em thu được 1 đoạn được mã hóa. em decode thì thu được flag 

![image](https://hackmd.io/_uploads/H1bLi4Y9Zg.png)

**Flag{NetLab5_SYN_FL0od_b4nN3d}**
### Scapy 
Như ở trên thì em thấy nó gửi 1 đống packet method SYN có chứa tcp payload có flag nên em sẽ trích xuất nó bằng scapy 

![image](https://hackmd.io/_uploads/HkloSIF9Wg.png)

đầu tiên em sẽ đọc các packet bằng hàm `rdpcap()` sau đó em sẽ duyệt qua từng gói tin kiểm tra có protocol TCP hay kh bầng 
hàm `haslayer()` sau đó em sẽ lấy giá trị của nó bầng hàm `.flags` và nêú giá trị của nó bằng `S` trong scapy được hiểu là SYN thì em tiếp tục kiểm tra xem có tầng `Raw(chứa payload)` bằng hàm `.haslayer()` tiếp theo em trích xuất payload bằng hàm load và print ra th, em chạy và xóa các ký tự xuống dòng thì thu được

![image](https://hackmd.io/_uploads/rkZ6B8tc-x.png)


## netlab6
Ở giao thức tcp em thấy có các đoạn mã base64 lạ 

![image](https://hackmd.io/_uploads/HkpZeqwcbe.png)

nma khi em decode thì nó chỉ là những con số vô nghĩa

![image](https://hackmd.io/_uploads/HJq8eqPqbx.png)

vào phần export thì em thấy có 1 file configure khá lạ, em thử extract dữ liệu ra

![image](https://hackmd.io/_uploads/rJZ1bcPcZl.png)

Em thấy nó là 1 file thực thi ELF nên em nghĩ em sẽ dịch ngược đoạn này, Đầu tiên em sẽ dùng pyinstxtractor để trích file này thành bytecode

![image](https://hackmd.io/_uploads/B1khb9Pqbg.png)

Sau đó em lên decompiler.com để dịch ngược và thu về code gốc

![image](https://hackmd.io/_uploads/HJrtz9DqZg.png)

Em thấy đoạn code theo dõi các phím mà người dùng gõ, mã hóa dữ liệu và gửi về một máy chủ (server) từ xa do kẻ tấn công kiểm soát.
`self.log.encode()`: Lấy đoạn text nạn nhân vừa gõ chuyển thành dạng byte.
Cuối cùng, nó biến con số độ dài này thành chuỗi, rồi thành byte và gửi đi
`key = int(base64.b64decode(self.socket.recv(9192)).decode())`
Sau khi biết độ dài dữ liệu, Server sẽ tạo ra một khóa mã hóa tương ứng, bọc nó trong lớp Base64 và gửi về
`self.log = long_to_bytes(bytes_to_long(self.log.encode()) ^ key)`
thực hiện phép toán XOR
Em viết 1 đoạn code để decrypt như sau

![image](https://hackmd.io/_uploads/BkR_qnv9Wg.png)

`hex_encrypted_data`: Chuỗi dữ liệu rác màu đỏ bạn lấy từ Wireshark, đang ở hệ cơ số 16 (Hex).

`bytes_to_long(...)`: Tương tự như quá trình làm key, hàm này gom toàn bộ đống byte thô kia lại thành một con số toán học (encrypted_long).

`decrypted_long = encrypted_long ^ key`: XOR lại với key gốc để tìm ra đoạn số khủng kia
`decrypted_text = long_to_bytes(decrypted_long).decode('utf-8')`: hàm long_to_bytes lấy con số khổng lồ từ biến decrypted_long, băm ngược trở lại thành một chuỗi các byte và giải mã chuỗi theo utf-8
Sau khi decode thì em thu được 1 đoạn 

![image](https://hackmd.io/_uploads/BkgGP2nwcWl.png)

Sau khi đọc và làm theo nó thì em thu được flag là

![image](https://hackmd.io/_uploads/B17Aa3vcWg.png)

**Flag{NetLab6_B3c4rEfUl_w1Th_k3yL0gg3r!!!!}**
## Netlab7
Bài này là bài dạng kiểu usb em tìm được tools khá hay có thể decode các dạng nằm trong kiểu này https://github.com/Nissen96/USB-HID-decoders
Đầu tiên em trích hid data của file này ra

![image](https://hackmd.io/_uploads/SkDJWaDq-l.png)

Sau đó em decode theo mouse thì thấy kh có gì đặc biệt

![image](https://hackmd.io/_uploads/rk4db6P9bl.png)

nên em thử decode theo keyboard thì thu được 

![image](https://hackmd.io/_uploads/SykAW6w9Zl.png)

**Flag{SuCh_4_b0r1n9_ch4LL_1n_3veRy_CTFs}**
