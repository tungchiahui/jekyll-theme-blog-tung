---
layout: post
title: Arm-Keil-MDK6教程
tags:
  - 环境搭建
  - STM32
---

<!-- > ⚠️ **注意：本文中的图片因飞书图床时效性已失效**  
> 若想查看完整图文内容和原版教程，请访问飞书文档：[点击查看完整博客](https://sdutvincirobot.feishu.cn/wiki/NfUlwxPTbiHTurktlEXc8TGYnmc?from=from_copylink) -->

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

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image1.png)

这个 **VCPKG\_HOME是vcpkg的目录**

```bash
#配置vcpkg环境 
export VCPKG_HOME=/home/tungchiahui/user/applications/vcpkg  #目录需要改为你的vcpkg的目录
export PATH=$VCPKG_HOME:$PATH
```

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image2.png)

```bash
source ~/.bashrc
vcpkg --version
```

出现如图提示则安装成功！

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image3.png)

  

3.  ## MDK5工程生成与ARMCLANG(AC6)编译器配置
    

1.  ### 工程生成与编译器配置
    

1.  **方式一** ：配置编译器教程需要在Windows进行，在Linux上目前很难修改编译器选项，可以参考下方Windows教程里的生成工程并配置默认编译器。(实质就是把编译器从默认的AC5改成AC6)
    
2.  **方式二** ：克隆已经生成好的模板（模板目前只有几个常用型号的)
    

仓库链接：

https://github.com/TungChiahuiMCURepos/CubeMX\_CMake\_Template

```bash
git clone https://github.com/TungChiahuiMCURepos/CubeMX_CMake_Template.git
```

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image4.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image5.png)

2.  ### 工程配置(比如初始化一个GPIO口并创建任务使其电平翻转)
    

先复制一份工程模板

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image6.png)

重命名工程

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image7.png)

打开CubeMX(并点击最上方File->Load Project 或者 直接点击下方图中的图标)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image8.png)

找到工程并Load，并配置好工程

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image9.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image10.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image11.png)

在文件夹MDK-ARM下打开终端

```bash
cd MDK-ARM
code .
```

4.  ## 安装并激活MDK6插件
    

下载好ARM Keil Studio Pack

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image12.png)

激活MDK6插件

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image13.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image14.png)

4.  ## 初次转化MDK5工程并下载依赖包
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image15.png)

右下角把这些要安装的pack都安装一下，有什么提示要允许的都允许一下

在安装Packs的时候，需要保证一个良好的网络环境(需要一个有魔法的网络环境)，

这个阶段会持续5-20分钟，请慢慢等待。(看你的机场速度而决定)

(只有第一次运行需要这些操作)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image16.png)

这个调查可以不查

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image17.png)

如图即是安装成功

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image18.png)

如果下方环境已经配置好了，请右键点击uvprojx选择Convert

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image19.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image20.png)

如果环境没配置好，右键这个文件，选择active environment(图中因为我的环境配置好了，所以是deactive失能)

然后再执行上一步的Convert

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image21.png)

如图已经初始化成功了

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image22.png)

5.  ## 编译
    

点击build按钮发现文件大小一样就是编译成功了。

若编译失败，则看一下是否是工程文件列表被多配置了一个点。（看下方进阶教程里的添加源文件解决）

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image23.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image24.png)

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

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image25.png)

如果没被检测出来，请插拔一下ST-Link，然后点击Add Device添加一下设备。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image26.png)

  

2.  ### 更新ST-Link最新驱动(Linux)
    

https://www.st.com/en/development-tools/stsw-link007.html#get-software

暂时无法在飞书文档外展示此内容

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image27.png)

下载后的文件解压出来。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image28.png)

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

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image29.png)

2.  生成vcpkg程序
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image30.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image31.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image32.png)

3.  配置环境
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image33.png)

点击高级系统设置

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image34.png)![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image35.png)

  

  

将用户环境变量和系统环境变量都配置一下

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image36.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image37.png)![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image38.png)

4.  测试
    

```bash
vcpkg --version
```

显示如下图所示，则安装成功

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image39.png)

  

3.  ## 生成工程文件
    

1.  打开CubeMX并登录ST账号
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image40.png)

2.  安装好Pack
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image41.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image42.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image43.png)

3.  配置工程
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image44.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image45.png)

4.  ## 打开工程并配置默认编译器
    

1.  配置默认编译器为ARMCLANG(AC6)
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image46.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image47.png)

2.  编译验证
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image48.png)

4.  ## 下载并激活Keil MDK6插件
    

1.  打开VScode
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image49.png)

2.  安装Keil Studio Pack插件
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image50.png)

3.  安装完毕后，重启VScode
    
4.  然后右下角会跳出来两个窗口，点击激活MDK6Community.
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image51.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image52.png)

显示这个通知即激活成功。

5.  ## MDK5工程转化为MDK6工程
    

点击Convert进行转化

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image53.png)

右下角把这些要安装的pack都安装一下，有什么提示要允许的都允许一下

在安装Packs的时候，需要保证一个良好的网络环境(需要一个有魔法的网络环境)，

这个阶段会持续5-20分钟，请慢慢等待。(看你的机场速度而决定)

(只有第一次运行需要这些操作)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image54.png)

可以打开任务管理器看cmsis.exe是否在正常下载，如果后面有网速，则说明在正常下载，等待即可。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image55.png)

这个调查可以不查

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image56.png)

如图即是安装成功

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image57.png)

这里如果是没激活环境，则需要active environment。(图中是取消激活环境)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image58.png)

点击转化MDK5工程

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image59.png)

这样则显示为转化MDK6工程成功。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image60.png)

6.  ## 编译
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image61.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image62.png)

可以看到，通过KEIL MDK6编译后的大小和KEIL MDK5编译后的大小完全相同。

7.  ## Windows如何配置ST-Link等调试器？
    

Windows就更简单了，根本不用多下其他东西，只要你在MDK5上能用，基本在MDK6上也能用。

1.  ### 添加设备选择ST-Link
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image63.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image64.png)

  

  

  

  

# **五、进阶使用教程(全平台通用)**

1.  ## Run（运行程序）和Debug（调试程序）？
    

1.  ### 选择packs
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image65.png)

出现STM32 STLink后，接着点回车Enter

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image66.png)

搜索对应的芯片的Packs并选中

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image67.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image68.png)

2.  ### (RUN)将程序下载到ST-Link中
    

点击RUN，然后在新弹出的窗口选择对应的型号，比如我选择STM32F103C8

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image69.png)

可以看到下方的命令已经把程序烧写进STM32了，然后STM32也正常工作了。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image70.png)![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image71.png)

3.  ### (DEBUG)调试程序
    

打上三个断点

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image72.png)

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

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image73.png)

然后就可以进入Debug界面

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image74.png)

点击开始按钮

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image75.png)

可以看到断点被成功命中，且可以通过左边窗口查看a的值。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image76.png)

接着点击继续。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image77.png)

下一个断点也被命中了

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image78.png)

接着点继续，发现a的值变为了6，符合我们程序的运行。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image79.png)

这样就可以正常debug了。

  

2.  ## VScode头文件配置
    

**(这只是可以更好的编辑代码，这些头文件并没有被加入到编译环境中)**

1.  ### C/C++插件（不推荐）
    

如果有这种找不到头文件的情况，配置一下VScode的C/C++插件的Include Path即可。

但是由于该插件需要同时配置编译器，所以可能会出一些各种各样的小问题。

而且该插件对于大型项目会很卡，可以选择直接看下方的clangd插件教程。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image80.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image81.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image82.png)

在这里多加一行../\*\*

除了以上这种方式，也可以通过修改c\_cpp\_properties.json文件进行。

输入 `"../**"` (意思是将上一个目录(工程根目录)里的所有文件全部加载到Include Path中)

同时建议也把ARMCLANG的include文件加入到这里面 "`/home/tungchiahui/.vcpkg/artifacts/2139c4c6/compilers.arm.armclang/6.21.0/include/`"

每个人的目录不同，但都是在用户文件夹的.vcpkg隐藏文件夹下，可以自己找找。（下方的图不完整，请根据上访内容进行添加）

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image83.png)

配置好之后，我们发现代码提示也正常了，虽然头文件还是有可能会被VScode误报错说找不到，但是其实已经可以正常编译了，也可以正常提示这些头文件了。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image84.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image85.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image86.png)

2.  ### Clangd插件 (非常推荐)
    

1.  优势：由于clangd适合大型的cmake项目，在大型项目里表现比C/C++插件优秀太多，所以笔者与MDK6都建议用clangd的语言服务器。
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image87.png)

现在最新版MDK6自带clangd插件。

  

2.  Windows需要下载安装一下LLVM (Linux一般不用管或者`sudo apt install llvm`)
    

https://github.com/llvm/llvm-project/releases

我下载的是LLVM 18.1.8，中选择`Assets`中选择`LLVM-18.1.8-win64.exe`

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image88.png)

这里选择这个选项`Add LLVM to the system PATH for all users`，其他无脑下一步即可。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image89.png)

可以打开terminal测试一下是否安装成功并配置好环境。

```powershell
clang -v
```

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image90.png)

  

3.  现在来安装clangd：
    

按住Ctrl shift P打开搜索框

输入clangd 找到下载语言服务器这一项目，点击安装clangd（请保持良好的网络状况）

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image91.png)

4.  接着配置clangd：
    

禁用C/C++的代码提示功能

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image92.png)

如果没有上图的弹窗，可以进行手动关闭，依然是ctrl shift P,输入settings然后找到如下图的选项

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image93.png)

找到下图这个选项，改成disabled即可。

`"C_Cpp.intelliSenseEngine": "disabled"`

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image94.png)

新建一个settings.json文件

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image95.png)

修改里面的内容，该内容是 cmake产生的compile\_commands.json 文件所在的路径(路径会随MDK6版本更新而改变，请自己找文件所在路径)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image96.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image97.png)

接着找到armclang编译器的include目录，也添加进来，一般在用户文件夹下的.vcpkg隐藏文件夹下。

(现在已经无需找了)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image98.png)

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

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image99.png)

代码提示就正常啦

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image100.png)

  

  

3.  ## **添加源文件(对应Project Items)和头文件(对应Include Path)到编译环境中**
    

1.  ### 常规方法(修改yaml文件)
    

1.  #### 相关资料
    

添加源文件需要使用yaml标记语言修改cproject.yml文件。

官方为此提供了相关的更为详细的资料文档：https://github.com/Open-CMSIS-Pack/cmsis-toolbox/blob/main/docs/YML-Input-Format.md#source-file-management

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image101.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image102.png)

2.  #### 创建文件(.c和.h)
    

我们这里先在bsp中创建4个文件分别放入到Src和Inc中。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image103.png)![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image104.png)

  

  

3.  #### 添加头文件路径
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image105.png)

将头文件所在的目录写入

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image106.png)

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
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image107.png)

在这里输入group的名字和所需要添加的源文件路径（这里因为applications里无源文件，所以我们注释掉）

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image108.png)

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
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image109.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image110.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image111.png)![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image112.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image113.png)

可以看到日志这几行，显示gpio\_demo和gpio\_test都成功被编译了

```bash
[14/22] Building C object CMakeFiles/Template_Linux.dir/home/tungchiahui/user/Source/STM32_Projects/N1_F407ZGT6_GPIO_Test/bsp/boards/Src/gpio_test.o
[15/22] Building C object CMakeFiles/Template_Linux.dir/home/tungchiahui/user/Source/STM32_Projects/N1_F407ZGT6_GPIO_Test/Drivers/STM32F1xx_HAL_Driver/Src/stm32f1xx_hal_flash_ex.o
[16/22] Building CXX object CMakeFiles/Template_Linux.dir/home/tungchiahui/user/Source/STM32_Projects/N1_F407ZGT6_GPIO_Test/bsp/boards/Src/gpio_demo.o
```

2.  ### 图形化
    

1.  #### 简介
    

由于ARM团队比较给力，短短2个月就搞出来了图形化操作，截止3月初已经更新。

ARM团队更新了什么图形化功能，下方教程就会推迟几天更新一下对应的内容。

2.  #### 添加源文件
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image114.png)

等待ARM公司更新功能中... ...

  

  

# 六 **、** 常见问题

1.  ## FreeRTOS使用ARMCLANG(AC6)编译报错的问题
    

1.  如果你是使用的模板，那么将模板中的“其他注意事项”文件夹中的Middlewares文件夹复制到根目录即可。
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image115.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image116.png)

2.  如果你是自己从Windows上从0开始创立的工程(没有使用模板)，那么需要你去寻找CubeMX下载的固件源码
    

比如Linux中固件源码在`/home/tungchiahui(你自己的用户名)/STM32Cube/Repository/`中。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image117.png)

假如你是F103，那么打开`STM32Cube_FW_F1_V1.8.5`文件夹。

如果你是F407，那么打开`STM32Cube_FW_F4_V1.28.0`文件夹。

找到路径`/home/tungchiahui/STM32Cube/Repository/STM32Cube_FW_F1_V1.8.5/Middlewares/Third_Party/FreeRTOS/Source/portable/`。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image118.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image119.png)

将这个GCC文件夹里的ARM\_CM3文件夹复制到 **工程文件夹** 对应的RVDS文件夹下。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image120.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image121.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image122.png)

2.  ## 错误执行cmake配置
    

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image123.png)

如果遇到`error cbuild: error executing 'cmake' configuration`这种错误。则删掉MDK-ARM文件夹下的tmp文件夹。再重新编译即可。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image124.png)

```bash
#删除tmp文件夹
rm -rf ./tmp
```

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image125.png)

3.  ## 修改汇编语言的编译器为ARMClang集成的汇编编译器
    

这是个警告，不影响正常使用，但是咱们尽量可以修改一下。

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image126.png)

```Plain Text
Warning: A1950W: The legacy armasm assembler is deprecated. 
Consider using the armclang integrated assembler instead.
0 Errors, 1 Warning
```

暂时没找到解决方案

4.  ## 出现某些工具没被下载的情况
    

按下面的arm tools然后进入下面的界面选择对应版本,再点击update tool registry即可.(最常见的就是编译器和调试器的库没自动下载.)

如果不知道需要哪些工具,建议可以全部都选上最新版本.(亲测全选最新版本是可以正常使用的)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image127.png)

![](https://cdn.esa.r2.tungchiahui.cn/tungwebsite/assets/images/2024-01-21/image128.png)