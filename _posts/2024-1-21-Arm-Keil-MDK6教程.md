---
layout: post
title: Arm-Keil-MDK6教程
tags:
  - 环境搭建
  - STM32
---

> ⚠️ **注意：本文中的图片因飞书图床时效性已失效**  
> 若想查看完整图文内容和原版教程，请访问飞书文档：[点击查看完整博客](https://sdutvincirobot.feishu.cn/wiki/NfUlwxPTbiHTurktlEXc8TGYnmc?from=from_copylink)

* TOC
{:toc}


**`截止2024年1月21日，MDK6已经完善到完全可以当主力IDE的状态，各项功能都比较完备。`**

`但是由于ARM仍在更新完善MDK6，所以教程会有所出入，但是大体上的步骤不会有太大的变化，有太大的变化的地方本文可能会更新。`

# 一、简介

https://www.keil.arm.com/

As flexible as you are: from cloud to desktop, from CLI to GUI, running on macOS, Linux, and Windows.

暂时无法在飞书文档外展示此内容

# 二、官方教程

https://developer.arm.com/documentation/108029/0000/Get-started-with-an-example-project

  

# 三、Linux配置MDK6环境教程

***`（本教程为2024年1月创建的，可能与以后的版本有些出入）`***

1.  ## 需要准备的软件
    

1.  CubeMX最新版
    
2.  VScode最新版
    
3.  vcpkg包管理工具
    
4.  pyOcd（如何安装下方有教程）
    
5.  ST-Link驱动（如何安装下方有教程）
    

  

2.  ## vcpkg安装与环境配置
    

1.  下载依赖包
    

```bash
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install build-essential tar curl zip unzip
sudo apt-get install default-jre
```

2.  克隆vcpkg仓库
    

https://github.com/microsoft/vcpkg/tree/master

```bash
git clone https://github.com/microsoft/vcpkg.git
```

3.  生成vcpkg程序
    

```bash
cd vcpkg
sudo chmod a+x ./bootstrap-vcpkg.sh
sudo ./bootstrap-vcpkg.sh
```

4.  配置环境
    

```bash
vim ~/.bashrc
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzBiYTY3N2M2NmI0ZDI3MjgwMTI5ODliM2Y4MWM4NzlfRnlmYjdhNkQza0h2em5QNUlzek9PdHd4OTdQV2V5V1NfVG9rZW46V3BpbGJ4N1Rhbzl1djJ4RmxhUWNzTDRvblNiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

这个 **VCPKG\_HOME是vcpkg的目录**

```bash
#配置vcpkg环境 
export VCPKG_HOME=/home/tungchiahui/user/applications/vcpkg  #目录需要改为你的vcpkg的目录
export PATH=$VCPKG_HOME:$PATH
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTlmZDE1NzBlZmI1OTliZmFkMGVlZGQzZWY1ZWJjNTVfWDdpRkJ5dmlsZlEwSFlOOG92MW1VQ2tEQ3FqWWV5Y1pfVG9rZW46TEowcmJRRFNQb1dHc1V4aUx3ZWNUb0NIbjhkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

```bash
source ~/.bashrc
vcpkg --version
```

出现如图提示则安装成功！

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWFhYWZlYTQ1YWFlODBjNmM0ZWNkN2MyMDQ2M2JhYWVfNkhObkc3VTZGWk9XTjhNbUxscHZ4YTFnc3hPQWRrS1FfVG9rZW46VEtKdGJRcGVsbzdBbFR4ckhLemN6cWVabk1iXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

  

3.  ## MDK5工程生成与ARMCLANG(AC6)编译器配置
    

1.  ### 工程生成与编译器配置
    

1.  **方式一** ：配置编译器教程需要在Windows进行，在Linux上目前很难修改编译器选项，可以参考下方Windows教程里的生成工程并配置默认编译器。(实质就是把编译器从默认的AC5改成AC6)
    
2.  **方式二** ：克隆已经生成好的模板（模板目前只有几个常用型号的)
    

仓库链接：

https://github.com/TungChiahuiMCURepos/CubeMX\_CMake\_Template

```bash
git clone https://github.com/TungChiahuiMCURepos/CubeMX_CMake_Template.git
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YmNlMmQzNjI3NDg4MTYzMzU1MTA5ZGE0ODNhMGI5OWVfM21iaHp6NGZkT2FvQjNJUHVkSk1PUkt0R2V3RnFRRmtfVG9rZW46UG05OWJSd0Fxb3d0SHN4dWNoM2M2dnozbjZjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTQyODdjOTE0ZWI1MDU0ZWY5YTM4MmYwMmM3ZDhhNzNfZ2h6U3oybnpudXJvQ0JTSTJyOU94SWtPajlZM3FxOHFfVG9rZW46TEhob2JyZml1b2lPQnp4RDBldGNWdnREbkNkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  ### 工程配置(比如初始化一个GPIO口并创建任务使其电平翻转)
    

先复制一份工程模板

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzNjZmVlMTU0ODg1NWYzNjFjYTZjODljYmExNzc4YWVfTFkwcnlZY1NJWmdEaUxBWlFIVnNPdFpaZjZ1a3o1TGJfVG9rZW46V3l3NmJ3MGlpbzNkMHl4ZzY0Q2NFb2QxbmxmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

重命名工程

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjRhOWFlMmIxZWNjZTljMzA3YTk3Y2NmZGQ3NzY1ZGZfQ2E4SUNpSDVzYWZmV05MbVN1OWsxRGExajdrM3VyeEZfVG9rZW46RFVDbmJXWHd6bzh2RVZ4VkNEVWNIelNGbktmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

打开CubeMX(并点击最上方File->Load Project 或者 直接点击下方图中的图标)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzY5Yzk1OWM1ZjBhNjVmNjk4Y2EyNjYxMTgwODVkMzhfMGYzV1hweFAzZktrM0dYQ1JIUTBqbEtIQkUxc3J3cjBfVG9rZW46VDl3d2JvdmdCb3VLTXJ4S0VYV2NRTVJGbm1jXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

找到工程并Load，并配置好工程

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWRjNDdlOWYyZGFhNWViNDAwMDBiYjYyMmRmMjlkODFfMG1zSU9MSVJ2dVEzanFHbEhyMUN0RzVsbkZDclR4QlhfVG9rZW46RVI5dWI2Z1Nkb1RUNWx4SHdDcmNWVExxbjZmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWY4MWI5NjljNjFjZTQyYzA0MzVhMjdhOGVjNmZhZTdfWnQ3T2U2WVpRelFtVjlyYmpvMHNWUDQwRlAxUlhzNmZfVG9rZW46R05qZGJOUW9Mb1NIWXd4eGd2cGNQZGVkbk5pXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDgzNzg5MDAzOGYwZGEzNGYwOTQzYzZiNDMyZTFjZWJfQjVjUzFQekE3NEZHUHo5UHRHeTJyVHZVb1l2b3E4dkhfVG9rZW46TFV3bWJ2WWlBb1JVZ0R4bXQ0dmNVWU1WbkhjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

在文件夹MDK-ARM下打开终端

```bash
cd MDK-ARM
code .
```

4.  ## 安装并激活MDK6插件
    

下载好ARM Keil Studio Pack

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDU5MjcwODk4ZWQ0MDVhMDE5MjExY2E1NWNhMmZmMjJfaGtwZGhydERiN0oyZFhhVE1TNjFhbkUwdmtPMks1dVFfVG9rZW46THlGRGIzNEcxbzVLVHl4YmtUUGNvVWJSbjFkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

激活MDK6插件

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzBhNjljNjMzOTM2OGFiNThlNGZlZDU0NDA0YWQxNmZfdWFFd3lIY09pWTB2UkkxcWdoTHlkc1R5OVlwUzEycHFfVG9rZW46UDFtemJ0S2pUb2lKaXF4bkZKd2NMcmNNbnVjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODQ1NDQ4Y2U0Mzc1ZjJjNzBjYWZkNWRmYWRhYzNjMDdfTVZvanNZc0xQVXl0SGNtcUM5U1RZdlpuMVhpRzFrellfVG9rZW46QUtXMmJtTkpqb1BkdDB4dzd4bWNGcXFQbk5mXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

4.  ## 初次转化MDK5工程并下载依赖包
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzY3OGQyMDg3M2RjZjNmMDczODU5ZWYxZTgzNzA2NTFfMkFZODRscXoybkhCZ0Y1dWlQV0gzdWprbWVNVllBZnZfVG9rZW46R01KZWJLcEx1b2J1NHR4cklwcmM2WUpIbkVkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

右下角把这些要安装的pack都安装一下，有什么提示要允许的都允许一下

在安装Packs的时候，需要保证一个良好的网络环境(需要一个有魔法的网络环境)，

这个阶段会持续5-20分钟，请慢慢等待。(看你的机场速度而决定)

(只有第一次运行需要这些操作)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGMwYTFhYjhkNTYwYjMxZTViNmZjNTNmNDZjYmNmNDRfbnB3cTZCZGtGb3hha2RzQ0dna0dTbE5rWW5NSWRucm9fVG9rZW46SUJld2JCU3Bwb0lzN254WTQ0MWNMZDlXbkdlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

这个调查可以不查

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Nzc5M2UxNDY5YWIyMWIzZTQzZDA3ODJhNmIyYTAyMzBfNVQ1eDR5RzQwRGNxTGlnSjVUenQxVVo1OXlzZXZYMXZfVG9rZW46VXMwSmJVZDIxb05UNUN4VktnNWN5Q3htblc2XzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

如图即是安装成功

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzM0YTFhNzAyYTFhYTkzMWUzODBlNTZhNzM3N2RhZDhfcFFhTkpjbXFGSlpRRHpkeVBjaUJqVmdvSWdmUU9WbzhfVG9rZW46VTJvNWJBS3gyb296T1N4U1hJTGNhdm1IbmJlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

如果下方环境已经配置好了，请右键点击uvprojx选择Convert

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDFmY2UzOGFlYmZlYjYzYTgxN2FjZDg0YTE1MWQyMjRfM3lvalk2aVk1WmlHRFZRVm5TRVlhdm1nVWREc0RjaFhfVG9rZW46TUZCTWJBcktKb053MnV4d0RBRWNFRWl5bnJoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGRkZWFhNzc2Y2Y5NjRkYjMwN2EyMDM5ZjFmNGQyYmRfMERuZ1JEckg0ODBxRXFUdnQ4NkRZM1JRVG54Y05ieHhfVG9rZW46Q1B6TGJGR1RPb2dGZUJ4VXI2QWM1V3Y3bjVGXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

如果环境没配置好，右键这个文件，选择active environment(图中因为我的环境配置好了，所以是deactive失能)

然后再执行上一步的Convert

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzZjNjJhMGVlNmRlMjc1M2RiMWFiZmNmYjNmZDIxMjRfMk45TGxWUGNtSXUzRUp2YVhwVU54c0o3alVFcmNXcXRfVG9rZW46Q1VTWmJBWklhbzJDMFd4S0FEb2MwUXVnbmFiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

如图已经初始化成功了

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWMyY2U4ZTkwZjRmYzBjMTRiYTc4NmFiYjgzOGNiMjFfdlRta29Ia0V1MnQ4UGx1ME9Id2pnZ2gyWGhnUGVYS0VfVG9rZW46Qm5QQmJPUGtEbzRCb2V4ZVp1MWNpVGQwbjliXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

5.  ## 编译
    

点击build按钮发现文件大小一样就是编译成功了。

若编译失败，则看一下是否是工程文件列表被多配置了一个点。（看下方进阶教程里的添加源文件解决）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODU5YTg4MTllYjU5ZTJkMmEzMjI0ZDFhMTRiYzdmY2NfTW11NGpSR1NIaFhTNDdNS0dDb2xzNTFHemdaaE12Rm9fVG9rZW46R1FBd2I5SkE3b1R6SHN4cTduNmNna01Zbk5nXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTJjNDRlOWVmZWFiZmZjOTE1MDg2NjdhMDgzNzRmYzhfcHk1NDJ6bVVMSmdUV3RhTVJoSzNzSTIwTTZhMEtpRGlfVG9rZW46SVV3YWJ2VXBwb1J1MGt4N0pXSWNaOUFRbjRiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

6.  ## Linux如何配置ST-Link等调试器？
    

1.  ### 安装pyOCD(Linux)
    

https://github.com/pyocd/pyOCD

先打开终端输入（如果你是debian系的系统，如Ubuntu，请看下方的教程）

```bash
sudo apt install python3-pip
python3 -mpip install -U pyocd
# 如果上面的不行，则输入下方的
pip3 install -U pyocd
```

如果还不行，且提示

```bash
error: externally-managed-environment

× This environment is externally managed
╰─> To install Python packages system-wide, try apt install
    python3-xyz, where xyz is the package you are trying to
    install.
```

则使用（debian系的系统）

```bash
sudo apt install python3-pyocd
```

**或者** 说直接克隆仓库

```Python
git clone https://github.com/pyocd/pyOCD.git
cd pyOCD
pip3 install .
```

这样也可以安装pyOCD

  

接下来，我们需要安装ST-Link等调试器的驱动。

pyOCD安装调试器驱动官方教程：

https://github.com/pyocd/pyOCD/tree/main/udev

还是需要用到pyOCD仓库里的文件。

如果你没clone仓库请尽快克隆。

在仓库目录下，输入以下命令

```Python
cd udev
sudo cp *.rules /etc/udev/rules.d
#重启udev
sudo udevadm control --reload
sudo udevadm trigger
```

这样ST-Link就可以正常被检测出来了

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2Q5YzA2OWNjODhlZmFmYTViNDM3NDg1NzUxMjFkMDFfVVYxUWROOFVxc1hnMmRsUk9GaVNRMzljTXo4ZTFXTm9fVG9rZW46RGVybWJLN3VFbzRuZHh4WVJ1YmNhRmNWblVkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

如果没被检测出来，请插拔一下ST-Link，然后点击Add Device添加一下设备。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzhiYjhiMTg1Mzg5ZmQ5MDgxYzI3OWJmYzc3N2JkMDhfUFE0MHVpcHltYzhsVEVzRklNQmlSSHpYdGh4U3llWWJfVG9rZW46WGRFNmJGSE03b0ZXVTF4OUlpZ2NOMXNmbldmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

  

2.  ### 更新ST-Link最新驱动(Linux)
    

https://www.st.com/en/development-tools/stsw-link007.html#get-software

暂时无法在飞书文档外展示此内容

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjZiZjlhZTIxNDdlM2FhZGU1NGYyM2I1ZmU0MzYxMmFfTDBrOGJ4ZlJaSjRWZlE0WVNPMENNeGhWaW5SUlhIMEZfVG9rZW46QnBHdGJCckpPbzBWZXF4OGZXc2NLeGNmbmFkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

下载后的文件解压出来。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=M2RiNGE2ZTE4ZjA5NzY1MGQ4MzRkNzZiY2Y1NjA2ODFfd0JKV1RGa3hnUGtvOVlmakdpWVV4RDRqQTZQOFpCVURfVG9rZW46SmRtNmJNUHB2b3NHTFN4SGh2aWN2Y2IwblFjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

```Python
sudo apt install ./st-stlink-udev-rules-1.0.3-2-linux-all.deb
```

重启VScode即可

(下方还有其他有关的教程操作，请往下滑)

  

# **四、Windows配置MDK6环境教程**

1.  ## 需要准备的软件
    

1.  Keil MDK5.3x及以上
    
2.  VScode最新版
    
3.  CubeMX最新版
    

2.  ## vcpkg安装与环境配置
    

1.  克隆vcpkg仓库
    

https://github.com/microsoft/vcpkg/tree/master

```bash
git clone https://github.com/microsoft/vcpkg.git
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzZlNjZmNjM0ODRkOTcyODUyZmY5YjQwZGNhZmY2YzRfZDRMQzc4cjFJQXN0dUlaU2pSbU1RdU9MTE54a3VFN21fVG9rZW46T25WUGJLNnV4bzB0UFV4a1Fnc2NwNFNIbjhmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  生成vcpkg程序
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGMxNWI1YmNlMWUxZDUyY2MxNDRmZGNiYzVmM2FmMmJfMHhENE04U05Ta1IzNmlCYmFLejJ2U3BTZVk5TWc1c3lfVG9rZW46R3RxdmJjQmVtb2tFT2R4ek9NbmNCdmdHbmNmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzY5M2UxNjdiNzU2MWI0YmQzODc2MjAwNzJlOTU1MmFfd0MxYUF4MGNuMmRnQ3FSaDRRcmQ4OXdPQmQ2RVFwQVNfVG9rZW46WFBkMmJHQmp3bzJtSkt4MElFRGNOajVwbnNjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDRmZDE4YzdmMjczYzZmN2JiOTUzMWY5OGRkODhkZDlfdWo0MHRuWmxkZkkxNVF0ZWVrdmhrbVVzMk83d2NpN0NfVG9rZW46TWVBZGJLUnRqb3JKNzB4R3lMR2NEM2FUbjdmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

3.  配置环境
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzlmOWY5ZmM3MGVlNzVhNmIzODk2NGM0ZDU3ZDA2Y2NfeWdOVDQ4T29JTlE4SWJadFBidXlCeEVGdkhGZGdJMFBfVG9rZW46WDdRN2IzcUptb3RlcUR4Z2pKWWNPOFVkbjZjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

点击高级系统设置

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2RhNGVhM2I5ZDNjOGEyZTllN2U2NTUyOWU4MDNjMmFfQTRseGZ5OVBNdm9OcmNRblVRSzBxNm5rM0tuYjFCbDFfVG9rZW46QVNnT2JwNWpob05hUDd4aFpZWGNCOGhZbnpmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTc2NzMyYWQ2YzlmZTJhMmEyNzRlZjQwOWQ2ZDc4MWFfcWJxcFZtNlZQYjBkUnZ2QzJ3MGJBYTQ4NmRzcjhMbUxfVG9rZW46RVh0T2JGd3FibzBBNXp4dGxIWmNRNktwbmtoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

  

  

将用户环境变量和系统环境变量都配置一下

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzY0M2ZkMDhkNGEzMTYyNjc3YWQ4MWFkMzkxODlkNjFfOFFaNHlvRjVzc2xGV2xObjdZVHFzOUZ6aHdITTVDN2pfVG9rZW46U0lmbGJ2R2xKb1ZMeU94a3ZCU2Mya0w2bmFiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWJkMWE4Y2MzZTQ5ZGY4MGYyMmMzYTliNTJkZGI0M2JfVURCSDVmQ3NJRXozWHA2MlpIeTllTTNIUmp0UnhpTzNfVG9rZW46V3JwM2J2aXhHb2t4bTF4WUtMNGNBNUZtbm1oXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzY3MzU4NDQwNjRkNzY0NzAyMDI2NWJiYWUwMzkzZTVfc1pDdmt6VUJQSGVOeHE1VDk2WTR5VVpUUzlqOExZalNfVG9rZW46Sjdib2J4c293b0lCRjF4b2VMMWNzU0dtbkdmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

4.  测试
    

```bash
vcpkg --version
```

显示如下图所示，则安装成功

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YmIxMDhhZGQyN2U2NWFiZjdjNGM2ZDQxMGNkYTc1NTZfd0RTUlY4dTVKVkkwcXdUYUlzUmlvQjJtMEo3ZkJzOU9fVG9rZW46Qk5DTGIzVjJ6b21zcjZ4RmhVRGNsOXREbkloXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

  

3.  ## 生成工程文件
    

1.  打开CubeMX并登录ST账号
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmJmYmU0NGY3OTIyMWJkODAwMmFjNDFjMjFjNTRlZmFfblBka3l0QUg3VnJrWFRtWTVWaEptUVFualo4VExLNDhfVG9rZW46WEJpd2JRNXF0b09kZ294dmJETGNTZkJGbjllXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  安装好Pack
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDdmZDU2ZDE0ODc1Njc3OTliMjkxNDNjNGZhMDg2Y2Zfd3lOSEdLemZZR0dBZUcxTG9nWDM1MVc4UWhGWXVFVnRfVG9rZW46STFGMmJadm5UbzlRbE94b0tkaWNuNGF2bjdlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDIyM2RhYzljYWQyNWVhN2I5YjA2ZDAyZmE1NTUxZjlfWHZYUHR2UDNMVnY4S2dNNEFSTmg4TFBSanBZeXhmQVRfVG9rZW46QkF2VWJlbVR1b0ZldkR4SkhCaGNsMWpoblNvXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWZiMzVjMWQ2ODcwMTY5ZDM1ZDY5YWJkMTdmODEyMmJfSXVLbnBBZ0l2RDZXQ3N3MldUejZFYlhrdnRWZVZsbW9fVG9rZW46VlJpYmI3aTdEb1pJQnV4TEs1ZmNiSkFJbldoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

3.  配置工程
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzNmY2Q5MzgzNjk4OGEzZWI0ZDk3NWEzZGNkYzhiM2ZfRmluQ3ZJWEptenZZTkg5akd3Z1R1QkI0RTJmTjltZFBfVG9rZW46QkRXSWJzU0Fab0dCVzR4RHlpbWNGdXVEbm9kXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTRiZTRjYmYxM2NjM2JlZWQwZmE0MGMxZmMwMDVhODFfUkxHTFdweVlXT2RtSGRvSHV4dHp6M1NXdm93RWJWVFFfVG9rZW46U200NWI5WTRNb0RhRFZ4QjNSUWNzODN4bk5mXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

4.  ## 打开工程并配置默认编译器
    

1.  配置默认编译器为ARMCLANG(AC6)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGJmMTA0NGU4MDM0ZDBlNGRjYmI1N2FiZGI3ZjY2NTJfWWJFRUt3RzBhczZHN05MdE8wdktacU1PcEhTVDVQa2JfVG9rZW46U1p3V2JNQjJIbzlsZDF4U0VWbmNzOXk4bnBkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NWRmNjhlMjBjZGExMDJlMzlhYmYxM2Y5ZjExNWU3NzFfWXBzSktjOW4waGxydkpzVGpkbXhIMHZhdDVtbzVqOURfVG9rZW46SkRBSWJTa3U1bzlXYlV4UHFScmNPNHdPbkNlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  编译验证
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGQzNzRlYzlmYjE0OWQxYTVkYmY0M2EzN2IyMWFjYWVfaTFtRzRaOTg5UDZ0MVZ3Y1c3QkhzRjJDN3g4ZTdZUkZfVG9rZW46TGZvMmJvVVB2b2xQd0V4WTZzUGNqMXREbjFiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

4.  ## 下载并激活Keil MDK6插件
    

1.  打开VScode
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTBiZWQ3YzBkMzlkMWFhYzIyOWY0NmUzODNmZGIxNTBfSkFnYTVPZ1BDSFBlQk9ySk4yS0VXazFxd3ZaSzFNaFFfVG9rZW46Q2FYOWI5ajV3b3VoNWJ4dHJJMmNQQUxTbmRkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  安装Keil Studio Pack插件
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NWRhZjE4NWE4ODkxMGM3MTFmMjdhOTdhN2JjOTk3ZTJfQm9HY2ViUW5aU1kxSmdpdFI1T0RLWjhGVkU4c1J4N2lfVG9rZW46SGlTdWJEcG9Tb1NLVzN4YmlheGNqOG01bkw2XzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

3.  安装完毕后，重启VScode
    
4.  然后右下角会跳出来两个窗口，点击激活MDK6Community.
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDZkNDNlYTExZTYwY2M4ZDQ1M2IwYTRiYjhkYTdlMmZfNnExaWowdkZoelVweldNQWJYSlJmalNNQ1hQVEppa3pfVG9rZW46TmJWbGI3VUNXbzlMUkh4OXRZdWM5TmNEbjBjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGMyMWZlNTczNmViODVkZjJmYzc0OGQxZjhjNmY1NTFfSzFYNXNOaUdRS29ScXF0a3d0UVdRTXd4VlFBZTJuMHpfVG9rZW46VHJzS2JzSGFsb1RIU2x4UTFLSWNJRXdrbmlHXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

显示这个通知即激活成功。

5.  ## MDK5工程转化为MDK6工程
    

点击Convert进行转化

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzVkYjM2NWVmMmJmMTA2NmFjZWZkYjA4NmE5MzRiOWJfTWdjUEdnc3JkaHhaS09XUTYydUF1SG9KcjN3MUxBSkVfVG9rZW46UWRYemJYSjRvb3EyWmR4b01EcWM5SmVGblNmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

右下角把这些要安装的pack都安装一下，有什么提示要允许的都允许一下

在安装Packs的时候，需要保证一个良好的网络环境(需要一个有魔法的网络环境)，

这个阶段会持续5-20分钟，请慢慢等待。(看你的机场速度而决定)

(只有第一次运行需要这些操作)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzQ5MGRmMWIyN2M5ZDdkNzc3MzA4YTE2ZWEwNGMyMzVfM1czY01DMm5ZRWp0emxac3hkNUJUUnByTldPYndoVUpfVG9rZW46TWFuOWJqb1VPb0RPTVV4bVZHbGNITVBVbnFjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

可以打开任务管理器看cmsis.exe是否在正常下载，如果后面有网速，则说明在正常下载，等待即可。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Yzk4MWU4M2ZlOTVjZThlZTVlMWUxYjdiMTUzNjZmMDhfUFFBZFgxWlBwSDdraW5oTkFhbEtlN0lvYjJqSFE0cHVfVG9rZW46VjJyMGIydGlGb01KVGV4c3ByQ2NNMnRibkRnXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

这个调查可以不查

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjMxNTYxNDNjOGM4NWFhZDM5YTYxYmFiYjZiZjhjODVfMlAzS3F4YVVER1JJdjB4TTloR3EwOGtVUFRuV0RHMmRfVG9rZW46UmlkbWJ3aVJkb1oxTFh4bUNsM2NYY0JQbmNlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

如图即是安装成功

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTcwYzM2MjMzNjRkODI2MjYxNDFiNDFhZDBmODNkYjlfR0Vpc0lTUjB0Z1AwbUFjVmNuVzV0UXhpUld2TmJFaEdfVG9rZW46RFlDb2JxQ01tb2ZtbUN4dUdwbWN4SzNXbnFiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

这里如果是没激活环境，则需要active environment。(图中是取消激活环境)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjBhOTM5MDQ5ZTQ1MDc1ZmYxZjUxOTFkNTNiZjQxYTlfY1c3M29Ka1NYN1JXU1drbmdBcWd6a2FLbW9OcXppYVdfVG9rZW46TjJzMWJreVJrbzgzaTd4R3U2bWNzM2x1blZlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

点击转化MDK5工程

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGJlMTE5NGZhMTk2NmI1NmQ0MjlkMGEwN2VhNWQ0N2NfZ0VJREdyZUJEUjd5dGJ2clpMOThpMGc5MW5oY2wwcHNfVG9rZW46RHhwS2JBblVUb3p0OW94THRnT2M4OG45bjliXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

这样则显示为转化MDK6工程成功。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDE5MTc1NmY5YjE2Yzg5MTIzZTM4ZDg1NGJkODNiMzdfeGk0bzBOZm05d2J4WFJHUlQ4WTF4am1HQURaQmpaTUtfVG9rZW46Wm1vbGJ3b0oxb3lXTlR4dWdXdGN6QTZGbm9nXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

6.  ## 编译
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDdmN2I4ZjY5NGExMThlYzUzNjdhZjAyNDE0ZjBhOTZfbWtPSjZpdGNHVzZ6VHpFRXN4b05PWVNJNTN2TUhaQmFfVG9rZW46U1ZLZ2J4RkVKb1lmTnV4ckpCeGNTbEl2bjNmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmExZGUwYjRhODg5YzE5YzFhNjg5NWRhNTYyZmY4NDRfeW56aTBhVzZWRjFWVjdsRXkzeEV1ekxYQkdaQ2FRcUJfVG9rZW46WVJVaGJWaWtlbzFrT0l4TnhJYWNUQ1VQblljXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

可以看到，通过KEIL MDK6编译后的大小和KEIL MDK5编译后的大小完全相同。

7.  ## Windows如何配置ST-Link等调试器？
    

Windows就更简单了，根本不用多下其他东西，只要你在MDK5上能用，基本在MDK6上也能用。

1.  ### 添加设备选择ST-Link
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzM5NGFhMDhlMjkyMjBiODFhZDQ1ODdkZmViZWVjZTZfQ1pJaTM4aU5ad3RtTHJodHpLa1VkS3hPRGMzRk5nZXNfVG9rZW46UWtnRmJuRmQ3bzF3VUZ4TzRjM2NnVG5RbkNoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjBiNzczODM0OTc1OGY2OGUxNTM2ODc4OWY5MGU3NzVfSTkzb253eFFqNThlTTBWQVpmWDFzV2JDSE9Oc2w0YmlfVG9rZW46RGlsNWJ3RkZmb2lwVGR4ZzVjbWNnNTFNblBlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

  

  

  

  

# **五、进阶使用教程(全平台通用)**

1.  ## Run（运行程序）和Debug（调试程序）？
    

1.  ### 选择packs
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODU3MDEwN2MzYjc2ZmM2MDdjNjJkZWZhYzk4NzA5MTVfdzdYWUVDM1k0NEJZNG4wSW1jTmJydXU1dUFPTFpLNXFfVG9rZW46SUp2NGJVcWtQb0Rxbnh4SGY4NWNldDRCbmdnXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

出现STM32 STLink后，接着点回车Enter

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWNmODJlNTgwMmU2ZmI3NjMyZDVlYTRiOGVhNzIxZGNfQ1FER3Q3cHlqdFloTzI3dk9WbFdpM1JVNkpPbHRBZ2lfVG9rZW46Q0ZFbGJsd1hjbzBPUEp4WlVvZGNRQmZLbmpoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

搜索对应的芯片的Packs并选中

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGU3MGM3NDA2ZWY1NzRmMTQ5OTk0NTY0ZWY4Mzc4YzJfdlM3d0NVS29HZGJSajJ4a21qZDdpUGxiclpXMzR1a3JfVG9rZW46RThYeWJ2aUlGb1k2dE94ODhyRWN1bVlHbnZmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWEzYWY1YjcxZTQ0YzcyMWYxYzg5N2RhNjU1OGNmYTJfYTBXZWZEblN4Y3hMOHNvWEIxYjhLdnd0N1dEVXB2alhfVG9rZW46UzdLdWJrQUJlbzJCdkF4Y0FWcWNZb3hDbndoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  ### (RUN)将程序下载到ST-Link中
    

点击RUN，然后在新弹出的窗口选择对应的型号，比如我选择STM32F103C8

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjE2N2UwMWJhYmZlMTJmYjM4ODk5NzAzODRmZjBlMGZfTVcwQ1hMeTR5VXE2THdXNlM2Um9FNlZYQktwN0xRWHdfVG9rZW46Q01FR2JUb2Fyb2dWYlF4WnNwb2NmZU9RblNTXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

可以看到下方的命令已经把程序烧写进STM32了，然后STM32也正常工作了。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzBjMTRhMmZjZmUzZDhjMDM3NjMxNDYwMmQxZmYxZDVfODZWRWdrd1J3cFlMZ3NsM05FR0RIQzMxdGdwd2FIM2dfVG9rZW46VmRNeWJzVjZ5bzlLYXd4Y1FmcGNwM0l3bmdlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDA5NjIxOWQzNDY2NzE0YTlkMzM5ZjZiZDYwMmU2NGRfUGlrVkRoTkZrVzZiaTZvUkxiZnhLRFVPQkt0d1hLTjlfVG9rZW46TVZYcGJwaTZ1b1pwS3h4T1g1T2NibGtsbmRjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

3.  ### (DEBUG)调试程序
    

打上三个断点

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTQzYWQ3NzE4YzRlY2ExODhiNmUyMWI0NzE0OWNiMjNfaXBMaEp4dWd6VWhkcjBRSFJyM2NXVnp3cU1qWkN3VEdfVG9rZW46TXpSOGJ4Yzlqb0xYQlJ4bHZtMGM5MkFPbnpoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

```cpp
extern "C"
void led_task(void const * argument)
{
    
    
    for(;;)
    {
        static int a = 5;
        bsp_led.LED_Toggle();  //实例化后调用对象翻转电平函数
        osDelay(500);
        a++;
    }
}

```

点击Debug并选中型号

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDJhYzM1YzllODc0YTcyMTlkZDYwMmZhY2ZlMGE0Y2VfaGZOTzJxMXYxWUVPT3BvcGllbW5OOFJpYnprbEFXdDJfVG9rZW46SEdiOWJXeHBjb1pHeE54d3B2dGM2cFlSbmhoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

然后就可以进入Debug界面

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDg1ZTE2MDg5NzRlNTUxZjdkOWJiYWRhNzk4ZmVkYTVfOWRheUhXSGsyUzNTeXV5dG5rSHdIZHA2OW5Ha3pWa1NfVG9rZW46REwzM2JqSk8zb2ZhRkt4U1lJSmNtSHIzbnpoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

点击开始按钮

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWRhNWRmNzlhZTczYjQ1Y2RmMzQxZWI0Yzg4ZTM3NGZfWmgxUzNkajNMTHZtRmliQVhzZXJlQUJ0WUF6WFlKeFdfVG9rZW46WlJuTWJCdjFnbzU4S1V4U3VMdWNwZmFwbjVmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

可以看到断点被成功命中，且可以通过左边窗口查看a的值。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjZjYjg0NjEzOWRmZDEyMDkwMTc1OTRkZGYyZmRmZmZfM3lscGZTRm1aWW5Fd09acWNpdnAwbVg4U2dnU2g2WGJfVG9rZW46VXllVmJqNjdnb0t4OTl4RUdHb2N3MVdqbkhoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

接着点击继续。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDZkYjZjOTZkZDQyODhlNjgxMGI2MmY2ZmM3YzExZGFfdzFBRldROEU3d2d1clJKRFpCY2RCZUlhQkxKYWZPeGdfVG9rZW46WHFjNWJGOENwb1pVcFR4VmVDc2NHc1JYbnRnXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

下一个断点也被命中了

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjU0MTRiNGU1YTIwZjIxMjRmODEzY2VlYzRjZjk1NGNfa21vVENxRXFSTmJBS09lSjcxdmxOakdRRUlLdkVyOFFfVG9rZW46STZnZWJqMFpab1IwNWx4eHpFemNHMDRnblpmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

接着点继续，发现a的值变为了6，符合我们程序的运行。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NWVkYWY4ZmFmMWZjY2Q4YjJhYmQzYzE2ODE1M2YyNTFfUFZMaVFCbDRJZWhRN0tsdHNmMWlqcUh1RDRPWmNxNHNfVG9rZW46U1NLRGI4WkV1b0g3dFN4Mk1zR2NzcDVHblBoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

这样就可以正常debug了。

  

2.  ## VScode头文件配置
    

**(这只是可以更好的编辑代码，这些头文件并没有被加入到编译环境中)**

1.  ### C/C++插件（不推荐）
    

如果有这种找不到头文件的情况，配置一下VScode的C/C++插件的Include Path即可。

但是由于该插件需要同时配置编译器，所以可能会出一些各种各样的小问题。

而且该插件对于大型项目会很卡，可以选择直接看下方的clangd插件教程。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGI2YWEyOGQzMmFjMWZlOGVhNWNkYzA2MmZhNWQxOGVfQkM3Y3NLbHlWTlVvVjhWRk1lWEZUczlHaU1ZTUtxZDlfVG9rZW46V09pQmJKY2dpbzVmUlN4ZzNjdmNUTkg2blZkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmMwOTk5ZGYyMjZmOWU5Y2M3YjgyYWUwNzYwYjUxNzBfTFJVVkVCVmplNUtqb3N2bXNIZEhnUnZMSlJVV011V3VfVG9rZW46QTc4a2JWcEpUb3ljWjB4bUtRb2NLaTZHbnhnXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NWZlM2M3OTkwZDlhYjMxMWE0MjI0NzFhMmRkYmE4NjdfWWZNbkExTDZnTXB3dkxQVnFWS096SXd4c3FtZmwyUDlfVG9rZW46U1VaUWJaRFVzb1N0eHB4YWhRUGNFZGQ2blcxXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

在这里多加一行../\*\*

除了以上这种方式，也可以通过修改c\_cpp\_properties.json文件进行。

输入 `"../**"` (意思是将上一个目录(工程根目录)里的所有文件全部加载到Include Path中)

同时建议也把ARMCLANG的include文件加入到这里面 "`/home/tungchiahui/.vcpkg/artifacts/2139c4c6/compilers.arm.armclang/6.21.0/include/`"

每个人的目录不同，但都是在用户文件夹的.vcpkg隐藏文件夹下，可以自己找找。（下方的图不完整，请根据上访内容进行添加）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTE5ZmRlMDczZDNlNzNjZDVmNzJmOTU3NDJkOGFjZjFfeGVLeFBNQ0paR1g0MEgzMXI4MnBrOFNncE05em1pRFBfVG9rZW46QWRZZmJwR0N5bzI4RU14bWRqQmNwWE95bm9mXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

配置好之后，我们发现代码提示也正常了，虽然头文件还是有可能会被VScode误报错说找不到，但是其实已经可以正常编译了，也可以正常提示这些头文件了。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDI1OGYwZTUyOTRkZjkyZmNjMWRiY2NkM2ZlNGRiMThfWHJxWDlMUGxHMFFkNWliRWRVNUNxYWZMV0hLZEMxUm1fVG9rZW46QWt5NmJ0UGxEb3VKRXF4ZGZ2MGNNZTlCbjNlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2M4YzJmNTQ2YTIxY2I3NGIzMTkwYjQ3MGIzYzQ4MTdfa3A4SXJ4RkljeE4xTXd1RU5LS0hmTjBsSkUyc0ZJa2tfVG9rZW46Um5YNGJERjhKb0w0cFZ4MDlEMmNqQnAwbmpsXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTk3ZjU2YTZhODg2MjNiMmRhYzg5MzViZjI1ZGFkYzBfRncwb1ZtV0tYQ21WTWlxSk1rWlZCbG5LcEJ4VmliRWJfVG9rZW46WnJNVGJkNmJtbzM2Vkh4NUxzU2NkM3RGbmhmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  ### Clangd插件 (非常推荐)
    

1.  优势：由于clangd适合大型的cmake项目，在大型项目里表现比C/C++插件优秀太多，所以笔者与MDK6都建议用clangd的语言服务器。
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjliNjE1OTE2ZjllZTgyYTNlZmFjMzc3NThjYzY3ZGVfNHZ2NGFLdDg0QnFGVGJzNlZPVU5VaDI3cmM4T3V3UGpfVG9rZW46Wjg3T2JxZUJtb3JTYzR4MVhUcGNGekpWbmloXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

现在最新版MDK6自带clangd插件。

  

2.  Windows需要下载安装一下LLVM (Linux一般不用管或者`sudo apt install llvm`)
    

https://github.com/llvm/llvm-project/releases

我下载的是LLVM 18.1.8，中选择`Assets`中选择`LLVM-18.1.8-win64.exe`

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Zjk5ZGE5MTE1NGRjZmEwMmNlMjM4NzA0ZWYxYzRkMGRfejNJQnFhYWdoYjBuNXh4Sm1CaUxFQ21oMlpZRzdpblhfVG9rZW46Sk5vU2Jsd0Q1b1pxRTR4b2JNM2MxUGJtbjVjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

这里选择这个选项`Add LLVM to the system PATH for all users`，其他无脑下一步即可。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWYyNjgzZWYzY2Q2M2M2M2YyZDJlMzM0NWY2ODgxNjhfelVuQ0xFclRyQTJFVnJHcklLR0ZGUVh5NXZ4S2c0S0RfVG9rZW46QVRINWIybnhQb3ZSSGF4VEhkZWNDRzhubk9mXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

可以打开terminal测试一下是否安装成功并配置好环境。

```powershell
clang -v
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWZlNTdlNzM2ZjhjNDk2YTM0M2E4MzAzMDZkY2YzMWZfT3FyV1IxYnRiNFlnaWVWTmo3UUFNUkYxYzA4UmY1VFVfVG9rZW46QW0xZmJJZlFMb1BOcm54cEl6UWNXcXFVbmhiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

  

3.  现在来安装clangd：
    

按住Ctrl shift P打开搜索框

输入clangd 找到下载语言服务器这一项目，点击安装clangd（请保持良好的网络状况）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDNhYzNkZjA4ZDA1MTI0MmFmZDQ3MzBiNzc3NmIwYjlfQU15RlVoY2NaczI1TjJ3OFVodTc2Q1Z1d0pyMjBIYUtfVG9rZW46T2F3SGJmNHFtb1NoMTJ4bHgxYmNNZVdLbjdIXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

4.  接着配置clangd：
    

禁用C/C++的代码提示功能

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjgwZGEzM2YyMTEyODk1ZGFlMzA0ZDZiNTViMGEwMjJfMGpXTHNYU3prbUFqTzJTS3o4YWM1SE54dkxSWHp2NzBfVG9rZW46UVI2NGJuemhQb1VZdkp4ajFYdWNjaXdsbnBnXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

如果没有上图的弹窗，可以进行手动关闭，依然是ctrl shift P,输入settings然后找到如下图的选项

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTM2ZTVjY2M5YzgyZDVjMDQxZTUyM2NhYjVjMGQ2MjhfVk9nU0tBWFZFbExSMUJrMlVKSW4zd01zSWFUeHVtOExfVG9rZW46QndDV2I0c0Qxb3U2QlV4aHVER2NPaU1IbmlmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

找到下图这个选项，改成disabled即可。

`"C_Cpp.intelliSenseEngine": "disabled"`

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzcxOGJiOTdhZGM1YjQ0YTE4YjIwNWUyNmM2ZjI4YzhfS3haOGliTXVLTmJJQVZnNWcyS1NmaFMzVEZES3lMbWtfVG9rZW46UWQzcWJFSTM0b3pKN3p4RDdEeWM4dGhUbjZkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

新建一个settings.json文件

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NGI3YzllYjUwYWQzYTViY2EzYTAwZmZhYWRkMjIwOGZfUVlQRXRlTE1kVXY1S2EwWDkwa1dETFNiMWNQUzVtTXhfVG9rZW46QVZTa2JOS3BBb0NORG54dGNBWmNJd0tZblhnXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

修改里面的内容，该内容是 cmake产生的compile\_commands.json 文件所在的路径(路径会随MDK6版本更新而改变，请自己找文件所在路径)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzZmNDg4OWM3ZWM2MjE3YzA4MDliZmRlZGRmNjFlYmVfbEdqQWRROFA3S0dhdEJJWmhPeGFXN3lqUEVnM0JqeXdfVG9rZW46Qks3ZGJOdnM3b3dkeGJ4VW9POGNiYXRLbk1mXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWUwM2IxZDk2ZTA4NDZhZjJlNTM2OGVmNGFjYWI2NzRfcWl5U3AzMWppWEtFMURMZjVQR2dqazZqM0hrRGxZVVFfVG9rZW46SU1jQWJCS3ZXb0U4N3Z4aVhpcWNyenVDblBmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

接着找到armclang编译器的include目录，也添加进来，一般在用户文件夹下的.vcpkg隐藏文件夹下。

(现在已经无需找了)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTE4ODc0NDBhNWJhMWE4ZDIwZGQ1ODFlMGFiMzliNmFfYW4xRWlZcng3ZGh3bmt1ZWtBVTZwNXZzRzNTZWlJd2xfVG9rZW46TWNyMmJrMDdPbzEzSzF4UXB2ZmNrMnVCbmhtXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

以下是Linux版本的settings.json示例

```
{
    "clangd.arguments": [
        "--compile-commands-dir=${workspaceFolder}/tmp/Template_Linux/TemplateLinux"
    ]
}
```

以下是Windows版本的settings.json示例

需要注意的是，Windows需要把盘符号变为小写，比如`C:/`要改为`c:/`然后`反斜杠\`要改为`斜杠/`。

```json
{
    "clangd.arguments": [
        "--compile-commands-dir=${workspaceFolder}/tmp/Template_Linux/TemplateLinux"
    ]
}
```

然后ctrl shift P搜索clangd找到如下图的选项

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OThhN2MwYzU3Y2NiZDFiNGI0YTBjM2U5ODFlZDQ3ZDlfNHBsZGhXWG1xRkI5U2o3eEFoaDE5cjdSWkhaRHd5UnpfVG9rZW46T2hhQ2JiS29xb1J4VW54S2ZyMmNtM3g0bkpjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

代码提示就正常啦

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmFiNzg1MWZlYWEwYWQ2MmQ2ODA0MmM4NWFhNDFkYjFfTmIxa3NqUHMwdlV5VHRhUU12VmVsMEZxRXBHVlk3SWJfVG9rZW46SmRKaGJXcGJWb2JSZUF4aVMzVmNLbmxxbkplXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

  

  

3.  ## **添加源文件(对应Project Items)和头文件(对应Include Path)到编译环境中**
    

1.  ### 常规方法(修改yaml文件)
    

1.  #### 相关资料
    

添加源文件需要使用yaml标记语言修改cproject.yml文件。

官方为此提供了相关的更为详细的资料文档：https://github.com/Open-CMSIS-Pack/cmsis-toolbox/blob/main/docs/YML-Input-Format.md#source-file-management

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2NlZjY3ZDNjY2Q5OTZiMjM3Mzk3MWFhMmIyZWNiYzZfT2NvejZENGVJbUlwakNRRExvWjJkVlE2T1B5R21RUXRfVG9rZW46QTVpbWJHV0JKb2NyNmZ4NktKYWNkcGpzbjNiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWFmMmJmNGJiMTM2ODRlZDg4MjI2ZGJjMTFkNmExNDFfenZ1WVA1NEl5S2t4eWZHT0pGMGJGWnNBSVdLQjdxQUhfVG9rZW46UnlkNGJqOHVFb0xUTnp4blZ6V2M4YjdXbnliXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  #### 创建文件(.c和.h)
    

我们这里先在bsp中创建4个文件分别放入到Src和Inc中。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDk2MWJlZTM1ZTQ1MGMwNDg2NGVjNGJjZGY4MmY4NTlfdk9NTENvOUpTSUZDclUxeXVHSVdoR3hFb043VlZtcGNfVG9rZW46Q1BXU2JXcE4ybzJpQlV4NlZHVGMzc29PblJmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmNlMTJhZGQ2MjM4YmIyM2JkNGNlZWZiNTFjZTgzZTBfM1FES05YN0wxN09SNngxZzUxd1dNclM0OXdZcGI4ejdfVG9rZW46SzhJMWJJNFR6b1BBQTh4ak5LSWNGcnpobndKXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

  

  

3.  #### 添加头文件路径
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTYzMGEyZTQwNzE0YjA1ZjRmMjNhNmZlMDRkYmNiODhfd1hiRkFFVGxrSEFNTFBGaUN0eU5ySXpHY0FUV1dPM0JfVG9rZW46V2lISmJMTnpEb05WZmF4bHNnamNZN0ZubmdnXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

将头文件所在的目录写入

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWE0YTIzZDVhZDhjMWI5YjMwNDhlOTU5NWNmMjk3MDdfYVBOT0RTcTBtOFBoR2UycXVsUWpFV3Z5RXVSTVpKc2NfVG9rZW46WmlYUmJXWmp0b0tWcjF4SUxZbGNSZFNKbjVlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

```
      add-path:
        - ../Core/Inc
        - ../Drivers/STM32F1xx_HAL_Driver/Inc
        - ../Drivers/STM32F1xx_HAL_Driver/Inc/Legacy
        - ../Drivers/CMSIS/Device/ST/STM32F1xx/Include
        - ../Drivers/CMSIS/Include
        - ../bsp/boards/Inc
        - ../applications/Inc
```

4.  #### 添加源文件与分组
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzQ4YjZmY2I2YjIwODE3MzBmZjUwMTM5OTI1NjkwNTdfcmpNSWY0RnRHT2tHenFzNXJyTlM3SHRYMVljVjA0ZjlfVG9rZW46UFNvcWJ1aVM0b3paSWV4cXFaRGNhQm1VblRkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

在这里输入group的名字和所需要添加的源文件路径（这里因为applications里无源文件，所以我们注释掉）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDM3ZmQ4NmRkZTg3MjE1YmIyNzlmMDQwNzcxMDhiMThfckp1eXNRbzFqM0JMYjBlWVFyQ0lDZXVlWndkR2Y2cmJfVG9rZW46RVhWTWIxUTdBb0JkTld4dk8wNmNjNTI0bnNiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

```ymal
    - group: bsp/boards
      files:
        - file: ../bsp/boards/Src/gpio_demo.cpp
        - file: ../bsp/boards/Src/gpio_test.c
    # - group: applications
    #   files:
```

源文件和头文件都已经成功导入了，我们可以对文件内容进行编写，看其是否能通过编译。

5.  #### 编写文件并编译
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDM3YTIxM2ExN2E4OGVkNDNmZmZjM2VhMzdhNDcyNTVfMHhWQzc5bWlLd0EweHUzeDJnbzYxWUhIdnpQZk8xMHRfVG9rZW46QWk4NWJpYldPb3ExaDR4U2RmS2M2S3BrbkloXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTljZWNkZWE2OThlMWRhNTFkYTA4NTU5ZDU5MDdhOGFfaTJGZm9YTTFMaHFaRVllM0tHTVpLMVlXamtFbVNkVTdfVG9rZW46S3B6WmJXaUNZb2lacHl4cW1YNWM3dHk5bnpmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWFlZWQwYmQzOWJlYmYyMjBkMDJlYmI0YmEyZDllNzJfMUZzSU4xY29xMUpCcFhvV0c3NndhNTlHVFNFZTQ0TkRfVG9rZW46VVBBamJRZ2Eyb3NTRXh4a01YMmNyMUlmbk9oXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjgwNDg2MWZhNTk0YTgwMzI5MDg0NTY2M2NlMGE0MGRfVTU0a1ZLcXlncXl5M0hSWnNJc29HZHZkT0w4QW16VE5fVG9rZW46TGduSWI5M1dxb2p6dUZ4Qmx0WWNBTHNVblhiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzY4N2IzYWU1MGIwYTJiMDlhMjAwYWFmNDI5ZjAxOThfRXNKaVEzcURkbjJJdWQ5RHRuVFo1NTdaeElZTTFJbjZfVG9rZW46UVMxdGJIeXhnb2x0NHN4Wm5qT2NqaThNblpmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

可以看到日志这几行，显示gpio\_demo和gpio\_test都成功被编译了

```Plain Text
[14/22] Building C object CMakeFiles/Template_Linux.dir/home/tungchiahui/user/Source/STM32_Projects/N1_F407ZGT6_GPIO_Test/bsp/boards/Src/gpio_test.o
[15/22] Building C object CMakeFiles/Template_Linux.dir/home/tungchiahui/user/Source/STM32_Projects/N1_F407ZGT6_GPIO_Test/Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_flash_ex.o
[16/22] Building CXX object CMakeFiles/Template_Linux.dir/home/tungchiahui/user/Source/STM32_Projects/N1_F407ZGT6_GPIO_Test/bsp/boards/Src/gpio_demo.o
```

2.  ### 图形化
    

1.  #### 简介
    

由于ARM团队比较给力，短短2个月就搞出来了图形化操作，截止3月初已经更新。

ARM团队更新了什么图形化功能，下方教程就会推迟几天更新一下对应的内容。

2.  #### 添加源文件
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTJkNDM1OTU2NmJiMjAyNTI1YmNiMjFhY2ZjYTcwOWFfY0FSSHdRTjBpSm12aWdxdXBrQ25iVHJhZWExME1WMFNfVG9rZW46RUV6TmJSUzFwb3ZyeHB4bVA0eWN5UFFMblpjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

等待ARM公司更新功能中... ...

  

  

# 六 **、** 常见问题

1.  ## FreeRTOS使用ARMCLANG(AC6)编译报错的问题
    

1.  如果你是使用的模板，那么将模板中的“其他注意事项”文件夹中的Middlewares文件夹复制到根目录即可。
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDc2YjE0NDJjY2E5MTQ2OWM3MDIyNjg2ZjVkZGE2YzNfeGFhUG55UmtiZVJxT0xZamtENUd1YzB4ZkIyeEljTWdfVG9rZW46TmUzMmJkRVJvb2wyaW14RGpIZmNOVGZqbmpnXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjJlN2MxMTY4MGU0ZjU3MjliN2FkY2FkNjc1MjdhZTdfTVg3ZmRjcjhQSW9nQTNIaHNnNmdLa2RBS0NGcHFBelpfVG9rZW46R0NGM2JNeHVxbzFtZmt4VVVsNmNvVTJ2blJiXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  如果你是自己从Windows上从0开始创立的工程(没有使用模板)，那么需要你去寻找CubeMX下载的固件源码
    

比如Linux中固件源码在`/home/tungchiahui(你自己的用户名)/STM32Cube/Repository/`中。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTIxN2IyZWQxZjY4YTVlMGY4OGY4ZGI5ZjYyNzA0YTZfWkJPVGhDTHNFVmIxUHhQT0pUTFZPZUo2bVg2M29WaU5fVG9rZW46T095bWJLaWo4b1g5aFV4UGt1MGNBUmJZbkhnXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

假如你是F103，那么打开`STM32Cube_FW_F1_V1.8.5`文件夹。

如果你是F407，那么打开`STM32Cube_FW_F4_V1.28.0`文件夹。

找到路径`/home/tungchiahui/STM32Cube/Repository/STM32Cube_FW_F1_V1.8.5/Middlewares/Third_Party/FreeRTOS/Source/portable/`。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWJkOWM0YzZkN2Y4MjU2MDgyMTNlMjdhYmU0OGZkZjRfQldsSWlLWDhRS21TSlVTR2lKQk02cEZkR29MaFR3NmJfVG9rZW46Q296QmJ4cWNUb1RtZWl4NVROMmNTR1FZblpjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTA3Y2ViOTIxYzFiNWU3ODJjMjEwZWY2ODg0ZTIwYmRfMzI2RHNPcFVGcjlETTdpOUFOSll3SG9jZFZVazF1eExfVG9rZW46RGdKQmJtbzFub2o4Qm94ejlGYWNrZkNQbjFjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

将这个GCC文件夹里的ARM\_CM3文件夹复制到 **工程文件夹** 对应的RVDS文件夹下。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmRiOWNlMTNkYTcwYWVjMDI5NmY4Y2Y2ZDE3YzQwMTRfZ2poNjBZRzlwWnV6VU1XeFZ2NzR3QmVQc1JSc001SmtfVG9rZW46VHRHdGJvdjg0b0FpSUt4TEFoQWN3ZDRYbkhoXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTJmNDU4OTIyOWU5NmUzOWU2MTBlYmVkMzAzZTk5NWFfbWtLS0ZVUDlHTHBaUnpzUzEwekFTcHRhcnJVeHRwQTFfVG9rZW46UDBBZWJaMEJKb2RVV1F4S1dQVmNIQnFCbnNmXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjdjZjYyOGM0NTYyNDNkNGIyMzk0ZmJhMzIzOGI2ZTNfYnVIUHhTaDk5V0xhclRYa0lWUzRoekhLcnJHMVNhcEVfVG9rZW46R0E5NmJ0bVhwb1JhZ3l4YVFrOGNEa0RFbldkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

2.  ## 错误执行cmake配置
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWI2ZmQ2YzFhMjA0N2MzNmJhZDFjNjdjNjQwMjE1NzFfTlFjdXo1c0RJbTB2TncyVzlYNTFVOUpVZDdPNXlXVThfVG9rZW46VEpQVWJjdXRobzNtQVJ4THJuVGMwSDdObnBkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

如果遇到`error cbuild: error executing 'cmake' configuration`这种错误。则删掉MDK-ARM文件夹下的tmp文件夹。再重新编译即可。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWIxZWZmNDUxNWJiYzA4ODE3YjZmYjZlYmFhMDFjYjNfUnl6Zm1NVnRUcmVNQjBOd0dTeU9kUUFQbXBCR1JrdWJfVG9rZW46Rmg2UWJGaWFTb0VmOGN4RWk0emNVOEs4bmdkXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

```bash
#删除tmp文件夹
rm -rf ./tmp
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODdlZDQ0ZWNjZjY3MGY1NjZlY2M3MzEzMGM2Y2M3NzFfV3FUZWhJcXVrblpBRnVQcUk2SmloMDNaclpuSFFrR3VfVG9rZW46VzhkamJBNHVGb0syNGd4SWYycWNZNldXbnRlXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

3.  ## 修改汇编语言的编译器为ARMClang集成的汇编编译器
    

这是个警告，不影响正常使用，但是咱们尽量可以修改一下。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Mzg2ZTQ0YWVmYzE0NzhmNjQ4OTM1YzdkN2JkNjcwMDZfVE1mVXE4MEdSN1hsNU1qUmVUYjFBNTV5WW1ORFdUMkZfVG9rZW46WFNuZmJHVWVVb3lKTkx4VmtNcGNTV1JNbjdjXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

```Plain Text
Warning: A1950W: The legacy armasm assembler is deprecated. 
Consider using the armclang integrated assembler instead.
0 Errors, 1 Warning
```

暂时没找到解决方案

4.  ## 出现某些工具没被下载的情况
    

按下面的arm tools然后进入下面的界面选择对应版本,再点击update tool registry即可.(最常见的就是编译器和调试器的库没自动下载.)

如果不知道需要哪些工具,建议可以全部都选上最新版本.(亲测全选最新版本是可以正常使用的)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzBmYzdiNDVjZWU5OWMwNTBkMWE0NzhhZGIyMzNjNzhfN0dCYTRwUTZCSFlSckpKTHlFU0h4TWVPUWR0QWxjeUlfVG9rZW46R1RSWmJqTzlGb1ZOUjB4QWZyZ2NMSHlZbkRQXzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2Q1NzdiOTQ4MmI0NmQzYjBhMmIzMDE1YmU1MjhkOTdfWW5zcTN5dUlCYmk3VHU2OVJ0eVRSRENzbnF3Y1BqeVFfVG9rZW46V2JSY2JzV1RYb3Rzc2x4MUlpcmNFMmZGbnI5XzE3NjA5NTgyNjM6MTc2MDk2MTg2M19WNA)