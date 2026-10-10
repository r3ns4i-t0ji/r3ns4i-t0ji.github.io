# Challenge: Dark Tracers (Scarlet CTF)
## Tóm tắt các ý chính và những gì học được từ challenge:
- challenge này giúp em hiểu được cách truy vấn các hash, giao dịch bất thường trên các sàn, cách sử dụng các công cụ truy vấn hash như blockchain.com và wallet explorer.com
- challenge này khá cơ bản để tập làm quen với truy vấn hash
- các bước thực hiện: truy vấn các giao dịch bất thường theo hint của đề bài
- Đề bài: 
![image](https://hackmd.io/_uploads/ryeF69krZl.png)
## Writeup chi tiết 
- đề bài cho em 1 big hint là:
![image](https://hackmd.io/_uploads/Hkej7JiJB-e.png)
- từ hint đề bài cho em chú ý tới dữ liệu 0.358 BTC ( có thể liên quan tới số tiền của giao dịch bất thường )
- em track theo cái hash thì được các giao dịch chuyển tiền mã hóa đến và đi
- ![image](https://hackmd.io/_uploads/HymfVn1rWx.png)
- sau đó em tiếp tục track cái tài khoản nhận được btc đó
- em check tài khoản    bc1qadgwek3qhng2jfc25epwuvg4cfsuq3dy4p8ccj sau đó em tiếp tục check dòng tiền đc chuyển đi 
- ![image](https://hackmd.io/_uploads/B1i2N2kHWe.png)
- check tiếp tài khoản bc1q44mw0cffurnex8jxqvtvap3fwv3et0v9lxdc3t thì em thu đc dòng tiền xấp xỉ 0.358 trùng với hint của để bài nên em 
đi theo id của transaction và thu được mã hash của transaction đó 
![image](https://hackmd.io/_uploads/SysJBn1r-x.png)
copy lại mã hash và summit theo format 
![image](https://hackmd.io/_uploads/B1g0Frh1SZl.png)
- kết quả cuối cùng là **RUSEC{57ce32d129f4824aa8c7e71e56cf4908dcc32103f5fff3c3d6a08bd7bae78c48}**
# Challenge Forensics/Peel That Off! (Scarlet CTF)
## Tóm tắt các ý chính và những gì học được từ challenge:
- cũng như challenge trc thì challenge này giúp em tập làm quen với các công cụ track hash của các giao dịch btc như 
blockchain.com,walletexplorer.com,... và cách hacker có thể che giấu các giao dịch bất hợp pháp không rõ nguồn gốc
- đối với bài này thì em sẽ track các giao dịch từ mã hash đề bài cho và đi đến giao dịch nhận được btc cuối cùng theo đề bài gợi ý
- Đề bài:
![image](https://hackmd.io/_uploads/r14pI21rWg.png)
## Writeup chi tiết
- đầu tiên em sẽ track theo hash ban đầu và thu được các transaction
![image](https://hackmd.io/_uploads/ryGftnJH-x.png)
- em thấy có gần 17 giao dịch thì em bt đây là 1 giao dịch consolidation - gom BTC từ nhiều ví nhỏ về 1 ví lớn
- em tiếp tục track dòng tiền của ví lớn nhận được sau đó sẽ đi đâu 
![image](https://hackmd.io/_uploads/H1Vot31Hbg.png)
![image](https://hackmd.io/_uploads/H1V2tn1B-l.png)
![image](https://hackmd.io/_uploads/rJm6Y2JHZl.png)
![image](https://hackmd.io/_uploads/ryG0Y2yrbe.png)
![image](https://hackmd.io/_uploads/Skxk93yS-l.png)
![image](https://hackmd.io/_uploads/Hkq1c31rWl.png)
![image](https://hackmd.io/_uploads/r1rgchJrZx.png)
![image](https://hackmd.io/_uploads/ByzWchJSWe.png)
![image](https://hackmd.io/_uploads/By6ZqhkB-x.png)
![image](https://hackmd.io/_uploads/HJDm5n1HZe.png)
![image](https://hackmd.io/_uploads/BJ1vchySbl.png)
![image](https://hackmd.io/_uploads/B1bdcnkBZl.png)
- cuối cùng dòng tiền này dừng lại và số lượng btc lớn không được chuyển đi đâu khác nữa nên em có thể suy ra dòng tiền này là dòng tiền mà nhóm scammer nhận được
- Sau đó em copy lại mã hash của transaction này: 87bb6410cf4d11b4220a0ff32e6d63fa95308898a8704cd9b48e5587b565f179
![image](https://hackmd.io/_uploads/Sywpq3ySbg.png)
- tiếp theo em sẽ dùng walletexplorer để xem các giao dịch này được chuyển từ sàn điện tử nào (copy lại hash và dán ) 
- Đây là giao dịch đó
![image](https://hackmd.io/_uploads/Byex621S-e.png)
- em có check thử giao dịch ở trên và biết được dòng tiền này được giao dịch trên sàn binance 
 ![image](https://hackmd.io/_uploads/HJqXahJB-e.png)
- cuối cùng lưu lại time giao dịch là 2021/11/07
![image](https://hackmd.io/_uploads/SJfD621rbl.png)
- summit flag theo đúng format: **RUSEC{87bb6410cf4d11b4220a0ff32e6d63fa95308898a8704cd9b48e5587b565f179:11/07/2021:binance}**
# Challenge Forensics/Advanced Packaged Threat (Scarlet CTF)
## Tóm tắt các ý chính và những gì học được từ challenge:
- challenge này thì em mới làm được 1 nửa phần sau có dính tới reverse nên em ch làm được ạ ( em sẽ làm lại challenge này sau )
- challenge này giúp em bt cách check hash của file bằng virustotal để bt cách nó hoạt động,...
- giúp em biết thêm về kỹ thuật deobfucate, cách dịch bash,..
- đối với bài này em sẽ phân tích các gói tin bằng wireshark, các gói chứa domain name lạ cụ thể là "knowledge-universal" trong giao thức HTTP, check hash file lạ bằng virustotal, xem detail của virustotal... 
- Đề bài: 
![image](https://hackmd.io/_uploads/H1Rl7yeSWl.png)

## Writeup chi tiết:
- Mở Wireshark lọc theo giao thức http dựa trên host có chứa tên miền là knowledge-universal em được các gói tin sau
![image](https://hackmd.io/_uploads/BJbwMpyBWe.png)
- khi tải về thì em được các gói sau
![image](https://hackmd.io/_uploads/BJcAmayrZx.png)
- em thử giải nén thì các file được nén có Packages.* là các file mà em kh giải nén được, còn file symbols.zip thì em có thể unzip nhưng nó yêu cầu mật khẩu, còn file cmdtest.deb là file em có thể giải nén nên em sẽ giải nén nó ra ban đầu sẽ thu được 1 file là data.tar sau đó em giải nén tiếp thì em thu được thư mục usr của người dùng (thư mục này là thư mục root của người dùng)
- Sau 1 lúc thì anh Hậu có hint cho em lên virustotal để unzip file symbols.zip bằng details từ hash trên virustotal bằng cách follow httpstream của filter http.host == "knowledge-universal"
![image](https://hackmd.io/_uploads/B1sGvpyHbl.png)
- em sẽ copy lại mã hash sha256 của package cmdtest và dán lên virustotal em thu được 1 script cách unzip file nén symbols.zip của người dùng 
![image](https://hackmd.io/_uploads/S1i3P61r-l.png)
- h thì em sẽ unzip file đó với password là very-normal-very-cool sau khi unzip thì em thu được 1 file disk_cleanup
![image](https://hackmd.io/_uploads/HJh__pJHZg.png)
- sau khi kiểm tra thì em bt được đây là kỹ thuật deobfucate (làm rối đoạn mã) của file thực thi bash
 ![image](https://hackmd.io/_uploads/H132d6kS-x.png)
- em thử trích ra đoạn dữ liệu mà nó print và dán lên cyberchef để decrypt ( em dán lên dcode thì em bt đc nó được encrypt = base64 nên em sẽ decrypt = base64) 
![image](https://hackmd.io/_uploads/B1RM96krZl.png)
- sau đó em bt được từ detect file type của đoạn decrypt này là 1 file zip nên em sẽ thêm tag gunzip vào 
![image](https://hackmd.io/_uploads/ryUeop1S-e.png)
- em thu được 1 đoạn deofucate nữa và có phần ndung được mã hóa nên em sẽ lấy phần nội dung đó và decrypt tiếp, em thấy có chuỗi deofucate ''ev <<< ' giống với rev nên em reverse thử và được 1 đoạn base64 
![image](https://hackmd.io/_uploads/ry07CAyHZg.png)
- em sẽ tiếp tục decrypt = base64 và em thu được 1 đoạn bash sau đến đây em có hiểu được 1 chút
![image](https://hackmd.io/_uploads/BJ1F00JrZg.png)
- dòng thứ nhất sẽ giải mả đoạn text bằng base64 4 lần và gán vào biến fajkfgidagGASnggaagaw
- dòng thứ 2 sẽ reverse lại chuỗi được echo là  ehcac-evloser-dmetsys_/pmt/
- dòng thứ 3 em hiểu là nó sẽ gán thư viện cho biến fAJFAIOhj23jgge35t 
- dòng thứu 4 là sẽ ghi vào cuối file đoạn hex đó 
- dòng thứ 5 là decrypt file gunzip là biến fAJFAIOhj23jgge35t tiếp tục ghi đè vào biến asfa2wfn2GFAfg
và thêm quyền thực thi cho biến đó đoạn sau em vẫn ch hiểu lắm nên em ch làm tiếp được ạ 
# Challenge Baby Exfil (UoftCTF)
## Tóm tắt các ý chính và những gì học được từ challenge:
- đối với challenge này thì em có học được cách dùng cyberchef để decrypt hình ảnh, thuật toán xor,key (encrypt, decrypt)
- em bt được thêm các hình ảnh file jpg có thể được giấu dưới dạng đoạn hex trong trường databyte
- đối với challenge này thì em có thu được 1 file python ở phần export và bt được thuật toán mã hóa xor + key, trong giao thức http có các packet chứa các databyte là hex của img em chỉ cần lên cyberchef và decrypt theo xor  
- Đề bài: 
![image](https://hackmd.io/_uploads/SyJvfJlBWx.png)
## Write up chi tiết:  
- Lúc đầu em có check ở phần export objects theo giao thức HTTP khi mở file final.pcapng bằng wireshark và thu được 1 file python, tiếp theo em sẽ lưu file này về
![image](https://hackmd.io/_uploads/r1pWEklBWx.png)
- Sau khi cat để xem thì em bt được đây là 1 file mã độc python:
- quét toàn bộ thư mục trong biến base_path và tìm các file có phần extension là nội dung chứa trong biến extensions sau đó nó sẽ mã hóa nội dung bằng thuật toán XOR với key=G0G0Squ1d3Ncrypt10n
![image](https://hackmd.io/_uploads/SJ1rE1lHbx.png)
![image](https://hackmd.io/_uploads/HyOtS1xBZe.png)
- Sau khi đọc code thì em xác định được tiếp theo mình cần tìm các file có phần extension đó trên wireshark
- Sau 1 hồi tìm thì em có tìm được 1 số file png,jpg theo giao thức HTTP có phần info là upload và ở phần dưới content chính là nội dung của những file đó được mã hóa dưới dạng hex
![image](https://hackmd.io/_uploads/S1ThIJxBWg.png)
- Đến đây em chỉ cần trích xuất ra cái đoạn hex bằng cách copy value trong trường Data thôi
![image](https://hackmd.io/_uploads/BJjuv1lrWe.png)
- Sau khi copy thì em sẽ lên cyberchef để giải mã các đoạn hex, và thuật toán xor (do các file này đã upload lên destination địa chỉ ip 34.134.77.90 giống với đoạn code nên chứng tỏ file này đã bị mã hóa bằng xor) em sẽ thêm xor vào và dán key chính là key encrypt trong đoạn code = G0G0Squ1d3Ncrypt10n kết quả em sẽ được 1 ảnh được hiển thị ở output 
![image](https://hackmd.io/_uploads/rywCq1xHWx.png)
- Em thử từng packet hồi nãy và thu được ảnh chứa flag sau
![image](https://hackmd.io/_uploads/rkUdi1erZe.png)
**kết quả cuối cùng là: uofctf{b4by_w1r3sh4rk_an4lys1s}**
# Challenge Forensics/:( (Scarlet CTF)
## Tóm tắt các ý chính và những gì học được từ challenge:
- challenge này khá giống với challenge Event-Viewing trong picoCTF em đã từng solve, chall này giúp em học được cách phân tích các file evtx bằng evtx_dump
- các bước solve dùng evtx_dump, tìm đoạn mã giấu trong output  
- Đề bài:
![image](https://hackmd.io/_uploads/HySuPjgSbe.png)
## Writeup chi tiết:
- Bước đàu tiên em sẽ unzip và thu được 1 file evtx, vì file này là 1 file event log nên em sẽ dùng evtx_dump để phân tích
![image](https://hackmd.io/_uploads/SywE_jlS-e.png)
- Sau đó em được 1 file output chứa các phần đã dump, thường thì base64 sẽ kết thúc bằng '==' nên em thử dùng strings và grep trong file output 
![image](https://hackmd.io/_uploads/ByPauolSWg.png)
- kết quả là được 1 đoạn các mã base64 được gán vào tag Binary, sau đó em sẽ strings và grep tag "<Binary>" để có đầy đủ các dữ kiện và trích xuất dữ liệu cần ra
- Sau đó em sẽ lên cyberchef để decrypt sau khi decrypt 1 lần base64 thì em thấy 1 đoạn base64 nữa nên em sẽ decrypt thêm lần nữa và được kết quả:
![image](https://hackmd.io/_uploads/BJwKijlSbe.png)
- Vì flag được giấu trong phần output cùng các ký tự không đọc được nên em sẽ trích xuất flag ra 
- kết quả cuối cùng: **RUSEC{3ternal_blu3_s@d_fac3_smbv1_3890cn2k29}**

