

# Các cách Dump RAM 
## 1. Using Software 
Có nhiều công cụ Dump RAM khác nhau, chẳng hạn như Volatility, DumpIt và Belkasoft RAM Capturer
## 2. Using Hardware
Một phương pháp để dump RAM là sử dụng các phương pháp dựa trên phần cứng. Các kỹ thuật này liên quan đến việc sử dụng các công cụ và thiết bị chuyên dụng để tháo rời các mô-đun bộ nhớ và lấy dữ liệu được lưu trữ trong đó.
## 3. Dumping RAM on Windows
### Dùng Task Manager 
Chọn Create Memory Dump File 

![image](https://hackmd.io/_uploads/HynvLvct-e.png)

Sau khi chọn thì thu được

![image](https://hackmd.io/_uploads/BksAUDqKbg.png)

Tiếp theo dùng `Windbg` để phân tích

![image](https://hackmd.io/_uploads/BkyOOvcY-g.png)

thu được

![image](https://hackmd.io/_uploads/Hk6ZFwcYbl.png)

### Dùng WinPmem
Sau khi tải và dùng Winpmem để dump RAM

![image](https://hackmd.io/_uploads/BkQMfuqYWe.png)

thì em thu được 1 file raw sau 

![image](https://hackmd.io/_uploads/HyB4MO9F-x.png)

## 4. Dumping RAM on Linux 
### Dùng LiME 
Trong quá trình build thì em thấy sau build thì nó bị lỗi symbol module trong khi em đã sài cùng phiên bản củakernel và linux header nên em chuyển qua cái khác

![image](https://hackmd.io/_uploads/r1cbkYcYbe.png)

### Dùng avml (Acquire Volatile Memory for Linux)
Sau khi tải và chạy

![image](https://hackmd.io/_uploads/BkMXxtct-l.png)

thì em thu được 1 file RAM dump 

![image](https://hackmd.io/_uploads/ByvElFcFbg.png)

# Tìm hiểu Volatility2, Volatility3
## Volatility là gì
- Volatility là framework mã nguồn mở dùng để phân tích bộ nhớ. Nó cho phép trích xuất thông tin chi tiết từ file dump RAM
- Bộ nhớ RAM lưu trữ dữ liệu dưới dạng các chuỗi bit thô (raw data). Nó không có hệ thống tập tin (file system) như ổ cứng.

- Hệ điều hành (Windows, Linux) vốn được lập trình chủ yếu bằng ngôn ngữ C. Dữ liệu trong RAM thực chất là hàng triệu cấu trúc dữ liệu C (C structs) đan xen vào nhau, ví dụ như task_struct quản lý tiến trình trên Linux hay EPROCESS trên Windows.
- Sức mạnh của Volatility nằm ở chỗ: Nó sử dụng mã nguồn Python để định vị, đọc hiểu và dịch ngược các cấu trúc C thô cứng đó thành thông tin mà con người có thể đọc được (như danh sách tiến trình, mật khẩu, kết nối mạng, mã độc đang chạy ngầm).

## Volatility 2 (Vol2) 
- Ngôn ngữ nền tảng: Viết hoàn toàn bằng Python 2.

- Cơ chế hoạt động cốt lõi: Dựa trên cấu hình (--profile=) . Vol2 yêu cầu người dùng phải cung cấp chính xác một "Profile" (Hồ sơ) của hệ điều hành. Profile này chứa bản đồ bộ nhớ và các cấu trúc dữ liệu cụ thể của phiên bản nhân (Kernel) lúc máy bị dump RAM.

  - Với Windows: Vol2 tích hợp sẵn hàng trăm profile (từ Win XP đến Win 10).

  - Với Linux: Bắt buộc phải tự tạo Profile bằng cách trích xuất file dwarf và biên dịch các module phụ trợ ngay trên hệ thống mục tiêu. Nếu phiên bản Kernel hơi lệch một chút (như lỗi không tương thích phiên bản), Vol2 sẽ từ chối đọc file dump.

**Ưu điểm:**

Sở hữu hệ sinh thái Plugin (module mở rộng) khổng lồ do cộng đồng đóng góp qua nhiều năm.

Rất ổn định khi phân tích các hệ thống cũ hoặc mã độc đời cũ.

**Nhược điểm:**

Python 2 đã chính thức bị khai tử (End-of-Life) từ năm 2020. Việc cài đặt và duy trì các thư viện phụ trợ (dependencies) cho Vol2 hiện nay cực kỳ khó khăn và nhiều lỗi.

Tốc độ quét tương đối chậm khi xử lý các file RAM dung lượng lớn (16GB - 32GB).

## Volatility 3 (Vol3) 


- Ngôn ngữ nền tảng: Viết bằng Python 3, tận dụng các tính năng lập trình bất đồng bộ và quản lý bộ nhớ hiện đại.

- Cơ chế hoạt động cốt lõi (Symbol Tables - ISF): Vol3 loại bỏ hoàn toàn khái niệm "Profiles" phiền phức. Thay vào đó, nó dùng định dạng ISF (Intermediate Symbol Format) dựa trên JSON.

- Khi đưa file dump.mem vào, Vol3 sẽ tự động quét, nhận diện hệ điều hành, cấu trúc Kernel và tự động tải về các bảng Symbol tương ứng từ internet (hoặc dùng bản offline).

- không cần phải nhớ hay đoán xem máy tính mục tiêu đang chạy Windows 10 bản build bao nhiêu hay Linux Kernel bản nào nữa.

**Ưu điểm**:

Tự động hóa cao: Tiết kiệm hàng giờ đồng hồ mò mẫm tìm Profile. Phân tích Linux giờ đây dễ thở hơn rất nhiều.

Tốc độ cực nhanh: Khả năng xử lý song song giúp Vol3 quét các file RAM lớn nhanh gấp nhiều lần Vol2.

Dễ dàng tích hợp vào các kịch bản tự động hóa hoặc viết các công cụ giao diện người dùng (GUI) nhờ cấu trúc API rõ ràng.

**Nhược điểm**:

Vì là bản viết lại, một số Plugin chuyên sâu (đặc biệt là để phân tích các dạng mã độc hiếm) từ thời Vol2 vẫn chưa được cộng đồng port (chuyển đổi) sang cấu trúc mã của Python 3.
# Tìm hiểu cách thức build profile cho Linux Memory
## Vol2
nguồn tham khảo: [ở đây](https://encient.github.io/blog/2023/12/30/build-a-linux-profile-for-volatility-2/#introduction)

**Biên dịch module.dwarf**

![image](https://hackmd.io/_uploads/HyedLY9tbg.png)

**Tạo Profile**
Đóng gói file module.dwarf và file System.map của máy thành một file zip ở thư mục ~/volatility/volatility/plugins/overlays/linux/.

![image](https://hackmd.io/_uploads/S1JtiYcYbg.png)

## Vol3 
**Lấy file vmlinux có chứa Debug Symbols**

![image](https://hackmd.io/_uploads/By_DW59Kbe.png)

**Tải và build dwarfjason2**

![image](https://hackmd.io/_uploads/S1Cif5qtbl.png)

**Tạo file Symbol (JSON)**

Sử dụng dwarf2json để trích xuất thông tin từ file vmlinux và System.map

![image](https://hackmd.io/_uploads/rkl0Xq5FWe.png)

**Cài đặt Symbol Table vào Volatility 3**

![image](https://hackmd.io/_uploads/Bk3JL95YWe.png)

# Thực hành build profile cho file mem dump 

Đầu tiên em sẽ strings và grep ra version của file mem dump này

![image](https://hackmd.io/_uploads/ByHMokhtWg.png)

kết quả thu được nó đang xài OS ubuntu 18.04 và kernel là 5.4.0-150-generic sau đó em sẽ tạo file docker, các lệnh  được thực hiện như cách build profile ở trên

![image](https://hackmd.io/_uploads/SJuiRkhFWl.png)

# Memlab 1
Đầu tiên em sẽ xác định profile của file dump đó

![image](https://hackmd.io/_uploads/r1R1jEhYZg.png)

Sau khi đọc phần description thì em thấy có 2 điểm cần chú ý đó là black window pop up và draw something

![image](https://hackmd.io/_uploads/HJi4oV3Y-e.png)

em sẽ dùng plugin console để xem thì em thấy 1 đoạn khá khả nghi 

![image](https://hackmd.io/_uploads/BkhajV2tWe.png)

Em decode thử thì thu được

![image](https://hackmd.io/_uploads/BJBZ2NhYZg.png)

`flag{th1s_1s_th3_1st_st4g3!!}`

Đối với hint thứ 2 thì em tìm được trong plugin cmdline 1 file mspaint liên quan

![image](https://hackmd.io/_uploads/HyPm3Entbl.png)

Em thử dump file này ra thử

![image](https://hackmd.io/_uploads/B17c3N2YWl.png)

Sau đó em thử mở gimp lên để phân tích sau 1 hồi chỉnh sửa trong gimp thì em thu được flag

![image](https://hackmd.io/_uploads/SykMpN2Kbe.png)

`flag{Good_Boy_good_girl}`
mảnh flag cuối thì nãy ở cmdline em thấy file Winrar thực thi trên 1 file khá khả nghi

![image](https://hackmd.io/_uploads/SyH8TE3KZx.png)

em dùng plugins của filescan và tìm thử offset của file đó để dump ra 

![image](https://hackmd.io/_uploads/SywhaN3tWl.png)


![image](https://hackmd.io/_uploads/HJMk042F-l.png)

Sau khi em dump ra và giải nén thì em thấy nó cần dùng mật khẩu là mã hash NTLM của account Alissa nên em sẽ dùng plugin hashdump

![image](https://hackmd.io/_uploads/r1o00E2Fbx.png)

Qua tìm hiểu thì em bt được plugin hashdump chứa
**User : RID : LM Hash : NTLM Hash :::**
Sau đó uppercase

![image](https://hackmd.io/_uploads/rJuwkS2t-x.png)

Sau khi em extract ra thì thu được flag 

![image](https://hackmd.io/_uploads/BJyskB2t-l.png)

`flag{w3ll_3rd_stage_was_easy}`

# Memlab 2
Đầu tiên em sẽ check profile của file mem

![image](https://hackmd.io/_uploads/H1LkjFnYbg.png)

Sau khi đọc description thì em thấy nó chỗ này có vẻ như là hint liên quan tới envars

![image](https://hackmd.io/_uploads/SybQqF2t-g.png)

Em check thử plugin envars thì em thấy có 1 đoạn mã lạ

![image](https://hackmd.io/_uploads/r1bB3FnFbx.png)

decode thử thì em thu được flag đầu tiên

![image](https://hackmd.io/_uploads/S1k53FnFWg.png)

`flag{w3lc0m3_T0_$T4g3_!_Of_L4B_2}`

Tiếp theo em check trong phần cmdline thì em thấy có keepass và notepad thực thi trên file khá khả nghi là Hidden.kdbx 

![image](https://hackmd.io/_uploads/rkqVaF3tZl.png)

em sẽ tìm offset của file này và dump nó ra

![image](https://hackmd.io/_uploads/ByS-RK3t-l.png)

em chuyển nó ra Windows và open bằng keepass thì em thấy  nó cần master password

![image](https://hackmd.io/_uploads/S1CE0F3FZx.png)

Sau khi grep pass trong plugin filescan thì em thấy có file lạ

![image](https://hackmd.io/_uploads/r1Ullc2tZx.png)

Em thử dump nó ra và mở lên thì em thấy có passwd

![image](https://hackmd.io/_uploads/HJ2KgqhYWg.png)

Em nhập vào keepass tìm trong phần recycle bin thì em thấy có 1 username tên là Flag

![image](https://hackmd.io/_uploads/S1pmbchFbx.png)

Em copy passwd thì thu được flag

`flag{w0w_th1s_1s_Th3_SeC0nD_ST4g3_!!}`

Em đọc lại phần description thì thấy nó nhắc tới browser

![image](https://hackmd.io/_uploads/SyptG9nK-g.png)

Trong cmdline thì em thấy khá nhiều file chrome được thực thi nên em nghĩ em sẽ tìm file History trong filescan của chrome 
và dùng artifact Browser History, em tìm được offset của nó là

![image](https://hackmd.io/_uploads/HJY5X93tbl.png)

Sau khi dump thì em sẽ mv file đó ra windows và dùng DB Browser để phân tích thì thấy có url này khả nghi

![image](https://hackmd.io/_uploads/SkFL452KWg.png)

Sau khi đi theo url và tải về file thì em có đđược1 file zip nma nó yêu cầu mật khẩu là SHA1 của flag thứ 3 

![image](https://hackmd.io/_uploads/SJgMS53KWe.png)

Em sẽ tính SHA1 của nó 

![image](https://hackmd.io/_uploads/Hy6mwcnt-x.png)

và extract thì thu được flag là

![image](https://hackmd.io/_uploads/HkaPv53K-g.png)

`flag{oK_So_Now_St4g3_3_is_DoNE!!}`

# Memlab 3

Đầu tiên em cũng sẽ tìm profile của file đó

![image](https://hackmd.io/_uploads/SyNOvh2YZx.png)

Sau khi dùng plugin cmdline thì em thấy có 2 proccess khả nghi

![image](https://hackmd.io/_uploads/HJUg_22KWl.png)

Em tìm 2 offset của 2 file này trong plugin filescan và dump nó ra 

![image](https://hackmd.io/_uploads/HJ9g5n2Kbe.png)

Sau khi đọc script file python thì em thấy nó mã hóa file bằng thuật toán xor với key là 3 và sau cùng là base64

![image](https://hackmd.io/_uploads/rJ6V523YZe.png)

Em sẽ lấy đoạn bị mã hóa trong file vip.txt để giải mã và thu được 1 phần của flag

![image](https://hackmd.io/_uploads/Hye26532Y-e.png)

Vì phần note của challenge có đề cập tới việc sử dụng steghide mà công cụ này hỗ trợ các file ảnh là jpg và bmp

và các file âm thanh khác, em sẽ lọc ra thử file ảnh jpeg trong filescan trước và em thấy được 1 file khả nghi

![image](https://hackmd.io/_uploads/B1iynh2tbl.png)

Em sẽ dump file ra và extract thử bằng passwd là first flag thì thu được

![image](https://hackmd.io/_uploads/rkIu2n2Kbg.png)

`inctf{0n3_h4lf_1s_n0t_3n0ugh}`
# Memlab 4
Đầu tiên em sẽ check profile của file memory trước

![image](https://hackmd.io/_uploads/HkXtA2ht-x.png)

Vì description có nói tới Important file nên em thử grep ra keyword là Important trong plugin filescan thử

![image](https://hackmd.io/_uploads/SJs4yTnFbe.png)

Em thử dump ra từ offset này 

![image](https://hackmd.io/_uploads/Sk2OyahF-x.png)

Nma sau khi dump ra thì ở dir output kh có kết quả nên em nghĩ file đã bị xóa nên sẽ dùng plugin mftparser 

![image](https://hackmd.io/_uploads/r1oJe6ntZl.png)

em mv nó ra windows và dùng notepad++ để find ra file Important.txt thì thu được

![image](https://hackmd.io/_uploads/rJtNgp2F-g.png)

`inctf{1_is_n0t_EQu4l_7o_2_bUt_th1s_d0s3nt_m4ke_s3ns3`

# Memlabs 5 

Đầu tiên em sẽ xác định profile của file mem

![image](https://hackmd.io/_uploads/HkHiKR2K-l.png)

Sau đó em dùng plugin cmdline để check thì thấy nó dùng Winrar để thực thi file nén gì đó

![image](https://hackmd.io/_uploads/Bku85C2Y-l.png)

em sẽ tìm offset file này trong filescan và dump ra 

![image](https://hackmd.io/_uploads/rJxRc0hKZg.png)

Sau đó em giải nén thì thấy nó yêu cầu mk nên phải tìm flag ở stage 1 trc

![image](https://hackmd.io/_uploads/r1X7jR3tZl.png)

Nhìn lại trong plugin cmdline thì em thấy có vài process thực thi bằng browser Internet Explorer 

![image](https://hackmd.io/_uploads/S1XYsCnK-l.png)

Em thử dùng plugins iehistory để liệt kê ra lịch sử của browser thì em thấy 1 số link lạ có chứa mã

![image](https://hackmd.io/_uploads/BJOV2A2YZg.png)

Em decode bằng base64 thì thu được

![image](https://hackmd.io/_uploads/H1LDn0nYbg.png)

`flag{!!_w3LL_d0n3_St4g3-1_0f_L4B_5_D0n3_!!}`
Vì file rar nãy yêu cầu mk mà description lại bảo cần có được flag 1 ms có flag 2 nên em sẽ dùng first flag làm passwd thì thu được

![image](https://hackmd.io/_uploads/BkExpA2YWl.png)

`flag{W1th_th1s_$taGe_2_1s_c0mPL3T3_!!}`

# Memlabs 6 
Đầu tiên em cũng sẽ xác định profile của file mem này

![image](https://hackmd.io/_uploads/rkVVyk6Fbe.png)

Sau đó em sẽ check trong plugin cmdline thì thấy có file 

![image](https://hackmd.io/_uploads/r1ZqyyTtWe.png)

Em sẽ tìm offset của file và dump ra nma khi giải nén thì nó cần mk 

![image](https://hackmd.io/_uploads/r1wmb1Tt-l.png)

Em check trong plugin consoles thì em thấy nó có dùng env 

nma kh được có thể là hint 

![image](https://hackmd.io/_uploads/SktiWJpK-g.png)

nên em thử xài plugin envars thì em thấy pass của nó là 

![image](https://hackmd.io/_uploads/Byu7M1Ttbl.png)

Sau khi giải nén thì em thu được 1 ảnh chứa 1 phần của flag

![image](https://hackmd.io/_uploads/HyGuzJpKZl.png)

em vào lại cmdline thì thấy có Explorer.EXE được thực thi nên em sẽ check thử trong browser history của internet explorer 
qua plugin iehistory nma kh có

Trong cmdline em cũng thấy nó có dùng chrome nên em sẽ tìm file History của chrome và dump nó ra


![image](https://hackmd.io/_uploads/S1ZhSy6YWe.png)

Sau khi dump thì em sẽ dùng db browser để pphân tích thì em thấy 1 có 1 url pastebin đáng nghi

![image](https://hackmd.io/_uploads/HyF3DkpFZl.png)

Sau khi đi tới thì có 1 url mới

![image](https://hackmd.io/_uploads/HJaRvypFbx.png)

Em đi theo link đó thì thấy có 1 link nữa và đến cuối thì nó cần key để tải 


![image](https://hackmd.io/_uploads/BJXpdy6KWl.png)

Em grep mega trong file trên thì thấy key của nó là 

![image](https://hackmd.io/_uploads/SkWkckpYbx.png)

Sau khi tải thì em thấy ảnh bị corrupt nên em vào hexedit thì thấy chunk của nó bị sai đáng ra phải là IHDR mà nó lại là 
iHDR 

![image](https://hackmd.io/_uploads/rynDqJTt-e.png)

Sau khi recover lại thì em thu được 

![image](https://hackmd.io/_uploads/rkf0qk6Y-x.png)

Tóm lại thì flag là: 

`inctf{thi5_cH4LL3Ng3_!s_g0nn4_b3_?aN_Am4zINg!igU3Ss???_}`

# Tóm tắt những gì học được từ Memlab 
- Volatility: Sử dụng công cụ phân tích bộ nhớ RAM 
- Nhận diện các tiến trình độc hại, lệnh thực thi ẩn và hành vi bất thường trên hệ điều hành Windows.
- Khôi phục dữ liệu ngầm: Trích xuất file, ảnh, mật khẩu, khóa mã hóa và lịch sử trình duyệt trực tiếp từ bản dump RAM
- Sử dụng được các plugin cơ bản và học được thêm các plugin mới
# command và extension của windbg
## Standard Commands 
- Điều khiển thực thi (Execution):
  - g (Go): Tiếp tục chạy chương trình cho đến khi gặp breakpoint tiếp theo.
  - p (Step Over): Chạy qua lệnh hiện tại (không nhảy vào bên trong hàm).
  - t (Step Into): Nhảy vào bên trong hàm đang được gọi.
  - gu (Step Out): Chạy cho đến khi thoát khỏi hàm hiện tại.
- Điểm dừng (Breakpoints):
  - bp <address) : Đặt một breakpoint tại địa chỉ cụ thể.
  - bl: Liệt kê danh sách tất cả các breakpoints đang có.
  - bc <ID): Xóa một breakpoint theo ID (ví dụ: bc 0, hoặc bc * để xóa hết).
  - bd <ID) / be <ID): Vô hiệu hóa (disable) / Kích hoạt (enable) breakpoint.

- Kiểm tra dữ liệu (Memory & Registers):
  - r: Hiển thị giá trị của các thanh ghi (registers) hiện tại.
  - d, dd, dq: Đọc (dump) bộ nhớ theo byte, DWORD (32-bit), hoặc QWORD (64-bit).
  - e: Chỉnh sửa (edit) giá trị trong bộ nhớ.
  - u: Disassemble - dịch mã máy tại một địa chỉ ngược lại thành hợp ngữ (assembly).

- Luồng và Call Stack (Threads & Stack):
  - ~: Liệt kê tất cả các luồng (threads) của tiến trình.
  - ~0s: Chuyển ngữ cảnh (switch context) sang luồng số 0.
  - k, kb, kp: Hiển thị Call Stack (ngăn xếp lời gọi hàm) của luồng hiện tại.
## Meta Commands
`.symfix`: Tự động cấu hình đường dẫn tải Symbols (tập tin .pdb) từ máy chủ của Microsoft. Đây thường là lệnh đầu tiên bạn nên gõ khi phân tích file dump.

`.reload`: Tải lại/làm mới tất cả các tập tin Symbols dựa trên cấu hình hiện tại.

`.cls`: Xóa sạch màn hình console của WinDbg.

`.hh <command>`: Mở cửa sổ Help (trợ giúp) cho một lệnh cụ thể.

`.dump /m <filename>`: Tạo ra một file memory dump tại thời điểm hiện tại.

`.cxr <address> / .exr <address>`: Chuyển đổi ngữ cảnh sang Context Record hoặc Exception Record cụ thể (rất hay dùng khi phân tích lỗi crash).
## Extension Commands 
`!analyze -v`: Lệnh quan trọng nhất. Nó sẽ chạy một kịch bản phân tích tự động toàn diện để tìm ra nguyên nhân gốc rễ (Root Cause) của file crash hoặc màn hình xanh.

`!peb`: Khảo sát Process Environment Block (Chứa thông tin về tiến trình trong User-mode như biến môi trường, đường dẫn module).

`!teb`: Khảo sát Thread Environment Block (Thông tin về luồng hiện tại).

`!gle`: Viết tắt của "Get Last Error", hiển thị mã lỗi cuối cùng của luồng hiện tại trong User-mode.

`!process 0 0`: (Dành cho Kernel-mode) Liệt kê tất cả các tiến trình đang chạy trên hệ thống.

`!thread`: Xem chi tiết thông tin về một luồng

## Quản lý Extensions (DLLs)
Kiến trúc của WinDbg rất linh hoạt nhờ việc load các file DLL mở rộng.

`.chain`: Liệt kê danh sách các extension DLL đang được nạp vào WinDbg.

`.load <tên_dll>`: Nạp một extension mới.

`.unload <tên_dll>`: Hủy nạp một extension
# Các plugin khác của vol2 và vol3 
`editbox`: Nó quét các vùng nhớ đệm (buffer) để tìm lại những đoạn text mà người dùng đã gõ vào các ô nhập liệu của Windows (ví dụ: ô tìm kiếm, form đăng nhập, hoặc text trong các hộp thoại)

`CobaltStrikeScan`: Quét bộ nhớ để lôi ra thông tin cấu hình của Cobalt Strike Beacon (một công cụ hacker rất hay dùng để điều khiển máy nạn nhân).

`MalConfScan`: Chuyên trích xuất file cấu hình bị giấu kín của các họ mã độc tống tiền hoặc đánh cắp dữ liệu.

`clipboard`: Trích xuất ngay lập tức nội dung (text, đường dẫn, đôi khi là file) đang được lưu tạm trong Clipboard (do ai đó bấm Ctrl+C) tại thời điểm dump RAM.

`notepad`: Giúp khôi phục lại toàn bộ nội dung văn bản đang được mở trên ứng dụng Notepad, kể cả khi file đó chưa hề được nhấn "Save" xuống ổ cứng.

`shellbags`: Phân tích một cấu trúc dữ liệu đặc biệt của Windows trên RAM để biết chính xác người dùng đã mở những thư mục nào, vào thời gian nào, trên ổ đĩa hay USB nào

`mimikatz`: Nó cho phép đọc thẳng vào tiến trình lsass.exe để trích xuất mật khẩu đăng nhập Windows dưới dạng plaintext hoặc mã băm (NTLM hash)

`keepass`: Mò mẫm trong bộ nhớ của tiến trình KeePass (phần mềm quản lý mật khẩu) để trích xuất Master Key (khóa chính) hoặc các mật khẩu con đang được giải mã tạm thời.

`bitlocker / truecryptpass`: Plugin này sẽ cào bộ nhớ để tìm các chuỗi byte đóng vai trò là FVEK (Full Volume Encryption Key), giúp điều tra viên mở khóa ổ đĩa mà không cần biết mật khẩu của nạn nhân.

`hollowfind`: Hacker sẽ tạo ra một tiến trình Windows hợp lệ (như svchost.exe), rút ruột code chuẩn của nó ra và bơm code mã độc vào. Plugin này sẽ phát hiện sự bất thường về cấp phép bộ nhớ (Memory Permissions) để lôi tiến trình giả mạo ra. 

`threadinject`: Tìm kiếm các luồng (threads) đang chạy mã thực thi nhưng lại không thuộc về bất kỳ module (.dll, .exe) hợp pháp nào được nạp trên hệ thống.

`autoruns`: Quét toàn bộ các vị trí mà một chương trình có thể đăng ký tự khởi động cùng Windows (Registry, thư mục Startup, Services) đang nằm trên RAM, giúp tìm ra cách mã độc bám trụ lại hệ thống.

`skype / telegram`: Phân tích cấu trúc dữ liệu của các ứng dụng này trên RAM để trích xuất các đoạn tin nhắn chat, danh bạ, hoặc lịch sử cuộc gọi chưa bị ghi đè.

`rdp_clip`: Khi hacker hoặc người dùng Remote Desktop vào một máy khác, họ thường copy/paste dữ liệu qua lại. Plugin này sẽ móc nội dung clipboard của phiên RDP đó, giúp biết họ đã tuồn dữ liệu gì ra ngoài.
