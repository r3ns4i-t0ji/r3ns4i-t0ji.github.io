# There will be a cake 

![image](https://hackmd.io/_uploads/HkV7eKpBGg.png)

Because the hint is about a cake that can find on almost website, I think about Cookies, I filter out tcp protocol in wireshark and found a malicious code in method POST of HTTP

![image](https://hackmd.io/_uploads/SyfbZKpSfx.png)

After decoded in base64, I found the flag 

![image](https://hackmd.io/_uploads/Byx_ZF6SGx.png)

>byuctf{Th3_C4k3_!s_4_L!3_HTC56zeE}
# Alright. Time Paradox.

![image](https://hackmd.io/_uploads/B1ycZK6HGg.png)

This challenge hint is about the time asssociated with NTP protocol, I filter out NTP protocol 

![image](https://hackmd.io/_uploads/rylBXFpBMg.png)

Moreover, In NTP, the Reference Timestamp field is 64 bits (8 bytes):
- First 32 bits: number of seconds since 01/01/1900
- Last 32 bits: fraction of a second

Then, I follow stream and found that data is hided one by one in reference time, origin time, receive time, transmitt time 

![image](https://hackmd.io/_uploads/rJ9RQFaBGl.png)

Final, I remove unnecessary characters in this stream and found the flag: 

> byuctf{S0_My_P4r4d0x_!d34_D!dnt_W0rk}
# Are You Still There?:

![image](https://hackmd.io/_uploads/HJN4HFprfg.png)

Because the hint is how to check the server is online? My answer is that use ping in icmp protocol. If the server responds, it's online, but if not, it's the opposite. I filter icmp reply packet in wireshark 

![image](https://hackmd.io/_uploads/rJkxIt6Bzg.png)

I see the flag is hidden in data fields so I use tshark and extract it 

![image](https://hackmd.io/_uploads/SkMcUt6Sze.png)

after decoded from hex, I found the flag 

![image](https://hackmd.io/_uploads/r19nIKprzl.png)

> byuctf{Turr3t_R3d3mpt!0n_L!n3s_4r3_N0t_R!d3s}
# Corrupted Cores: 

![image](https://hackmd.io/_uploads/HJugvY6SMg.png)

The hint is about the flag doesn't belong to a single identity so I think there might be multiple different sources sending messages to the server so I filter out the icmp request 

![image](https://hackmd.io/_uploads/S1BkOtaSGl.png)

I found that data can be hidden in source IP address, because there are many IP sources sending messages to the server, I use tshark to filter it and decode 

![image](https://hackmd.io/_uploads/B1zR_F6Hzl.png)

> byuctf{Th3_P4rt_Wh3r3_H3_K!lls_Y0u}
