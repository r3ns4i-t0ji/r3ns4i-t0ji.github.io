# Last Byte Standing

![image](https://hackmd.io/_uploads/By6mxRM9bl.png)

## Những gì học được từ challenge
- author cài thêm 1 extranous byte vào mỗi packet, chỉ cần extract các packet là xong
## Writeup chi tiết
Sau khi xem các packet thì em thấy các packet theo protocol dns có byte thừa được thêm vào

![image](https://hackmd.io/_uploads/HJYIadLqWx.png)

Tiếp theo em xem phần filter của nó 

![image](https://hackmd.io/_uploads/r1CA6dI5Wx.png)

![image](https://hackmd.io/_uploads/SkJwRu8cbg.png)

em extract ra bằng tshark và vì em thấy các byte dư (01) này phần frame nó = 30 với số 0 và 31 với số 1 nên em filter ra

![image](https://hackmd.io/_uploads/Hypigt8cZx.png)

Sau đó em xóa số 3 đi và decode bằng binary thì thu được 

![image](https://hackmd.io/_uploads/ByD-ZYU5bx.png)

**utflag{d1g_t0_th3_l4st_byt3}**

# Silent Archive 

![image](https://hackmd.io/_uploads/Bk01xCzcWe.png)

## Những gì học được từ challenge
- compare 2 file ảnh giống nhau để tìm ra các offset khác nhau, sau đó decode bằng octal
- dùng foremost khi có nhiều file nén được nén trong 1 file để tìm ra và khôi phục file nén cuối cùng
## Writeup chi tiết 
Đề cho 2 file

![image](https://hackmd.io/_uploads/rJM71_Uc-x.png)

Ở File đầu tiên thì em thấy có 2 file ảnh giống nhau, em sử dụng các câu lệnh để phân tích theo kỹ thuật stego thì em thấy kh có gì khả nghi sau đó em thử dùng lệnh `cmp` để tìm ra các byte khác biệt của 2 file thì thấy có nhiều offset mà byte của 2 file khác nhau

![image](https://hackmd.io/_uploads/BJcD-_IqWe.png)

Em để ý thì thấy nó bị thiếu 3 offset giống nhau là 118850 118851 và 118872

![image](https://hackmd.io/_uploads/SJ7qUdLqbl.png)

Em lấy lại 3 offset đó và trích từng cột ra để decode 

![image](https://hackmd.io/_uploads/r1kXDuL5Ze.png)

Em decode ở cột thứ 2 thì em thấy 

![image](https://hackmd.io/_uploads/BkqGO_89be.png)

Em tiếp tục trích byte thiếu của offset 

![image](https://hackmd.io/_uploads/SyPxKdI9Wx.png)

kết quả decode em thu được 
`0r4ng3_ArCh1v3_T4bSp4ce!`

![image](https://hackmd.io/_uploads/BJF_FdUcZg.png)

Sau khi giải nén file 2 thì em thấy nó có vô số file nén 

![image](https://hackmd.io/_uploads/rJdhKu85-g.png)

Nên em sẽ dùng `foremost`  thì thu dược 1 file zip 

![image](https://hackmd.io/_uploads/rJufq_IcZg.png)

Em thấy nó có yêu cầu passwd nên em thử nhập cái em vừa decode ra hồi nãy và thu được 1 file txt em cat thử thì thấy nó toàn dòng trống 

![image](https://hackmd.io/_uploads/BkTYcuI5-l.png)

Em đọc cái phần decode ở trên thì thấy nó có liên quan đến tabspace em cat -A thì thấy

![image](https://hackmd.io/_uploads/Hyqqjd8c-g.png)

Em xóa dấu $ thay ^I thành 1 và space thành 0 sau đó decode thì thu được

![image](https://hackmd.io/_uploads/H1s7nuUqWx.png)

**utflag{d1ff_th3_tw1ns_unt4r_th3_st0rm_r34d_th3_wh1t3sp4c3}**

# Half Awake 

![image](https://hackmd.io/_uploads/BymVgRf5bx.png)

## Những gì học được từ challenge
- Em thấy bài này khá dễ 1 file này chỉ có tầm hơn 30 packets, trace từ từ là có thể ra 
## Write up chi tiết 
Em mở Wireshark lên thì em thấy có 1 file instruction.hello nó có nội dung như vầy 

![image](https://hackmd.io/_uploads/SJwp5vL5Zg.png)

Em có lọc mdns và thấy key của nó là 00b7 

![image](https://hackmd.io/_uploads/BJcvoPU5Wg.png)

Em kéo xuống tìm thêm ở các packet còn lại thì em thấy có 1 packet có ndung như là file zip 

![image](https://hackmd.io/_uploads/SJEk2vI5Wx.png)

Em extractract ra thì thu được 2 file

![image](https://hackmd.io/_uploads/HysThDU5Zg.png)

em thấy file stage2.bin khá giống với flag nên em thử xor file này với key vừa tìm được hồi nãy thì em thu được flag là

![image](https://hackmd.io/_uploads/rybE6wI9Wx.png)

**utflag{h4lf_aw4k3_s33_th3_pr0t0c0l_tr1ck}**

# Landfall

![image](https://hackmd.io/_uploads/HkDR-KLqZe.png)

## Những gì học được từ challenge

- Dùng artifact Powershell History
## Writeup chi tiết

![image](https://hackmd.io/_uploads/SJUbNYLqbg.png)

Sau khi tải thì em thấy phần Brief có chứa ndung như sau, 

Em dùng artifact Powershell history để kiểm tra thì thấy trong Console_History của user jon có chứa

![image](https://hackmd.io/_uploads/r199VY8c-l.png)

Sau khi decode từng đoạn thì em thấy đoạn cuối là khả nghi nhất vì nó thực thi mimikatz để leo quyền 

![image](https://hackmd.io/_uploads/HJCSBY89bg.png)

em thấy ở phần howtosolve 

![image](https://hackmd.io/_uploads/B15eIK8qbl.png)

em tính md5 hash 

![image](https://hackmd.io/_uploads/SklGcFI5Wx.png)

và dùng nó làm mk để giải nén file nén thì thu được 

![image](https://hackmd.io/_uploads/rJhNqK89Zg.png)

**utflag{4774ck3r5_h4v3_m4d3_l4ndf4ll}**

# Cold Workspace 

![image](https://hackmd.io/_uploads/ByG0yAf9Wg.png)

## Những gì học được từ challenge
- Em nghĩ bài này tác giả cố tình làm cho file mem này kh phân tích được bằng các tools như vol2 vol3, windbg.
## Writeup chi tiet
Em có check loại file thì thấy

![image](https://hackmd.io/_uploads/Sk9s-cUqZe.png)

Em thử dùng windbg, vol2,vol3 đều kh được nên em thử grep ra Desktop

![image](https://hackmd.io/_uploads/H1nJzc8qZg.png)

em thấy có file flag.enc nó nằm trong env nên em grep ra tiếp phần env của file đó thì thu được

![image](https://hackmd.io/_uploads/r1X7fqUcWg.png)

Sau khi decode 1 hồi thì em thu được

![image](https://hackmd.io/_uploads/r1msEcU9Zg.png)
