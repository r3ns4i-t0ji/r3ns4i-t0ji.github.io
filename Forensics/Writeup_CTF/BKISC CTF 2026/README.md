# Lookout 

![image](https://hackmd.io/_uploads/rka55S1yfg.png)

From the description, Because strange things happened on the computer after opening the mailbox. I will check the ost/pst artifact, It's location in **(C:\Users\AppData\Local\Microsoft\Outlook)**, I used FTK and export the ost file

![image](https://hackmd.io/_uploads/B1-RoBykzx.png)

First, I will use Systools OST Viewer to parse this file. Then, I saw a suspicious message with an attached file, report.zip

![image](https://hackmd.io/_uploads/ByIhhBkkMx.png)

Because the limited of this tools so I will export this file by `readpst` command, this will create a folder for each mail folder (Inbox, Sent, etc.). Inside, each email will be a .eml file, and attachments will be saved separately next to that email file.

![image](https://hackmd.io/_uploads/rk6u0H11Mx.png)

I will extract this zip file using the password 123 from the message content, Then I obtained an xlsx file.

![image](https://hackmd.io/_uploads/HJMLk8Jkze.png)

I uploaded this hash file to VirusTotal and found that it's related to CVE 2016-7262

![image](https://hackmd.io/_uploads/SycnJLJyGe.png)

Because xlxs and doc files are compressed files, I will decompress them. I saw this image in media folder but I think it's irrelevant

![image](https://hackmd.io/_uploads/SySzMLkJMx.png)

**xl/worksheets/sheet1.xml** It contains all the data you enter into the cells (A1, B2...), mathematical formulas, and display formatting. The attacker didn't modify the file's code; they simply inserted a "malicious" formula into a hidden cell (like cell N12). Instead of simple addition or subtraction, this formula points to an external link: =[1]!A0. This turns a static data cell into an external link.

![image](https://hackmd.io/_uploads/HkEDfLyyGe.png)

**xl/externalLinks/externalLink1.xml** used to manage external links. The attacker changed the link type from "External Workbook" (another Excel file) to "DDE Link". They inserted a system execution command into the ddeTopic property. Instead of retrieving data, Excel ran the cmd.exe command to download malware.

![image](https://hackmd.io/_uploads/S1HamUkyfx.png)

Next, I will check the Windows logs to see if there are any logs of PowerShell commands, and then I will export them.

![image](https://hackmd.io/_uploads/ByIpVI1Jzx.png)

I found a suspicious log from executed PowerShell commands containing a piece of code encoded in base64. Moreover, I think it's the content of report.txt file

![image](https://hackmd.io/_uploads/BkCHHI1yGe.png)

this code will turning the Outlook application into a backdoor by forcing the Inbox to load a theme from a hacker's server (192.168.1.189) instead of displaying emails normally.

![image](https://hackmd.io/_uploads/Hy_nHUy1Ge.png)

In addition, I also found a pcap file in Desktop folder of the user

![image](https://hackmd.io/_uploads/B1hcIIyyGx.png)

I will use this pcap file and find HTTP protocol requests with the hacker plugin.

![image](https://hackmd.io/_uploads/SJIFwLy1fe.png)

I found a suspicious packet leading to another plugin, so I will filter out packets from that plugin.

![image](https://hackmd.io/_uploads/ryn1_UyJMl.png)

I later found this packet

![image](https://hackmd.io/_uploads/BkftALJ1fx.png)
![image](https://hackmd.io/_uploads/ryFOu8ykGl.png)

the code Sets up an automatic loop to download and run new malware from the hacker's server (192.168.1.189) every 10 seconds via the setTimeout command and uses the XOR algorithm to convert hexadecimal strings into executable commands, Look at the last line of code: 
```c
ay = readreg("Software\Microsoft\Office\" & Left(outlookapp.version,4) & "\Outlook\UserInfo", "KEY") 
```
The variable `ay` is the variable that stores the Key used for the XORfunction.It is read from the Registry path: **HKEY_CURRENT_USER\Software\Microsoft\Office\[Outlook_Version]\Outlook\UserInfo**

![image](https://hackmd.io/_uploads/H1vhRIykfg.png)

then I extract reg NTUSER.dat, parse it with Registry Explorer and found that the key is `o4WlfbKbx1xik1TgTQGeOQ`

![image](https://hackmd.io/_uploads/SJ8xeP1kMx.png)

I used it to decrypt this packet

![image](https://hackmd.io/_uploads/S10DxDkJzl.png)

the result is

![image](https://hackmd.io/_uploads/HJduxPkyMl.png)

copy and run =)) 

![image](https://hackmd.io/_uploads/HkX3xPJkMg.png)

the flag is 
>BKISC{l0oK_Ou7_f0R_0u71o0k_C2!!!}
# Homework

![image](https://hackmd.io/_uploads/B1lMdqg1fg.png)

Because the description related to the message of online class, I will find some online meeting application in this file. I found that the user used Zoom for online class so our goal is to decode Zoom chat.

![image](https://hackmd.io/_uploads/HkSPh5e1Mx.png)

The first thing I would like to tell is that: 
- `DPAPI` is essentially a set of Windows APIs that provides symmetric encryption services for users or systems that depend on login credentials. 
  - `DPAPI` does not require users to manage encryption keys. Instead, it generates a **Master Key** based on the user's login password through hashing functions. This key is stored in the user folder **%APPDATA%\Microsoft\Protect**. It is extremely secure: only when you log in with the correct account can Windows decrypt this Master Key for use. Because the key depends on the **SID (Security Identifier)** and password of each user, user A on the same computer cannot decrypt user B's data, even if they have administrator privileges.
- In the context of DPAPI, a `BLOB (Binary Large Object)` is not simply encrypted data, but rather a specific formatted data structure returned after executing the `CryptProtectData` function.

I think I'll get the user password first because it will help me find the master key to decrypt the data. I export the SAM and SYSTEM hive and use it with `impacket-secretsdump` command to find the ntlm hash of the user

![image](https://hackmd.io/_uploads/r1j9Joe1fl.png)

After using hashcat to crack the hash, I found that password of the user KangTheConq is `Sup3rR0ckP4ss`

![image](https://hackmd.io/_uploads/BJaxxjx1fe.png)

The key is stored as a base64-encoded string under the variable name win_osencrypt_key, it locate in `zoom.us.ini` file, and it starts with the marker ZWOSKEY

![image](https://hackmd.io/_uploads/r1WLfolkMg.png)

Because ZWOSKEY is the marker, I remove it, decode with base64 and convert to hex so I have the structure of the DPAPI Blob here

![image](https://hackmd.io/_uploads/Sk60EieJfe.png)

**Offset 0x00: 01 00 00 00**
> version

**Offset 0x04: d0 8c 9d df 01 15 d1 11 8c 7a 00 c0 4f c2 97 eb**
> DPAPI provider GUID

**Offset 0x14: 01 00 00 00**
> masterkey version

**Offset 0x18: e2 66 4f 1d d9 0a 0b 4e 9f 17 c5 26 c4 92 06 24**
>MasterKey GUID

Windows GUID uses **little-endian** for the first three parts, so change it like this:

![image](https://hackmd.io/_uploads/ryV_rjxkGx.png)

so DPAPI MasterKey file for Zoom is `1d4f66e2-0ad9-4e0b-9f17-c526c4920624` and it stored in **C:\Users\xxx\AppData\Roaming\Microsoft\Protect\<SID>**

![image](https://hackmd.io/_uploads/rJheQslkMx.png)

Then, I will use mimikatz to extract master key 

![image](https://hackmd.io/_uploads/Bk51tieJzg.png)

and use it to decrypt DPAPI Blob in file Zoom.us.ini

![image](https://hackmd.io/_uploads/HJLfcjl1Mx.png)

I have the zoom key after decode it

![image](https://hackmd.io/_uploads/S1Lw9iekfl.png)

Moreover, Zoom has 
- **zoomus.enc.db**: The main database stores account information, contacts, and chat history. It contains important login tokens (usually DPAPI BLOBs) used to maintain user sessions.
- **zoommeeting.enc.db**: This service stores meeting logs including Meeting ID, time, topic, and participant list. It's a crucial resource for retrieving interaction history and scheduled meetings

Those file is encrypted with zoom key. Next, I will use DB Browser(SQLCipher) to decrypt it by the zoom key I had before
, set page_size to 1024 and kdf_iter to 4000

![image](https://hackmd.io/_uploads/S1pa6sl1fg.png)

After that, I have recovered the chat history in Zoom

![image](https://hackmd.io/_uploads/HJlM1nlkGe.png)

In the chat, I found the link to get file homework.rar

![image](https://hackmd.io/_uploads/HyGIkhgyGl.png)

I Inflated the file and found 2 files in there

![image](https://hackmd.io/_uploads/ryRty3lkfx.png)

With the keyword.txt, I will use ADS to parse it, and found secret stream in this file

![image](https://hackmd.io/_uploads/S1BLxngJfe.png)
![image](https://hackmd.io/_uploads/r1Xuxhe1Me.png)

I think it will encrypt the jpg file with aes cbc, key `N3v3rG0n4G1v3UUP` and IV is `5778a7db75851bc63d8deed06a5d894f`, I use cyberchef to encrypt the jpg file and found the magic bytes of png file but it's corrupt to render

![image](https://hackmd.io/_uploads/S1Cfbngyfl.png)

I found that chunk IHDR is change to aaaa, and after chunk IEND also have gibberish byte, I recover it and found the png 

![image](https://hackmd.io/_uploads/S1dgr3gkzl.png)

so the flag is 
> BKISCTF{Y0u_G0t_A_F0r_Th1s_St3g4n0gr4phy_Cl4ss}
