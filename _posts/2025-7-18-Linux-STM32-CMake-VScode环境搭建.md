---
layout: post
title: Linux-STM32-CMake-VScode环境搭建
tags:
  - 环境搭建
  - Linux
  - STM32
  - RTOS
---

> ⚠️ **注意：本文中的图片因飞书图床时效性已失效**  
> 若想查看完整图文内容和原版教程，请访问飞书文档：[点击查看完整博客](https://sdutvincirobot.feishu.cn/wiki/F3Htw5Id9ih63okH9npcszeWn4g?from=from_copylink)

* TOC
{:toc}


***`（本教程为2025年7月创建的，可能与以后的版本有些出入）`***

https://blog.csdn.net/SankeXhy/article/details/138418371?shareId=138418371&sharefrom=link&sharerefer=APP&sharesource=2301\_80523028&sharetype=blog

1.  # 简介
    

*   CubeMX + CMake +GCC + HAL + VSCode + Clangd + Ozone 构成了全链路嵌入式开发方案： CubeMX解决硬件配置问题，CMake统一构建流程，GCC提供编译支持，HAL库屏蔽硬件差异，VSCode+Clangd打造智能编辑器,Ozone实现更方便高效的debug调试功能。
    
*   该组合降低开发门槛（尤其对跨平台项目），提升代码质量与可维护性，并适配从原型到量产的全生命周期需求，是STM32等ARM嵌入式开发的推荐实践。
    

2.  # Linux
    

1.  ## 环境介绍
    

本教程环境介绍：

1.  系统：Fedora 42 KDE Edition Linux
    
2.  系统内核：Linux 6.15.6-200.fc42.x86\_64
    
3.  架构：X86\_64
    

其他Linux环境也可以。

2.  ## 安装各种环境
    

1.  ### 安装C/C++环境
    

```bash
# debian系
sudo apt-get install gcc g++ gdb cmake-gui make

# rhel系
sudo dnf install gcc g++ gdb cmake-gui make
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTI1ODNlZDU2OTkxMGYzYjU1MWVlODBhNGQ0OWY5ZTlfUGgzUmFDRHdzZnQ5eWRpaU1VZWl2OHRHS0pIQUxCTHhfVG9rZW46SGxlRmJJb3lpb1BGb1l4Znk4a2NNTlBmblBnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

查看是否环境安装成功

```
gcc -v
g++ -v
gdb -v
cmake --version
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODE3ZjU0NTRkOTIwYzBiNDg3ZjE3MjAzOGM4YTMzMGRfeE0zbEFkR0ZBendCS0t0Rm5uVXZKODdTVTBtMWJsYzZfVG9rZW46RHVrTmJHOWE0b3VyZkd4bzJNY2NnNlpIbkVnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTBkZTlmODU5OTFiM2Q4M2NlOTJjYTcxNjM3ZWQ4MDRfQUk1cm5tZTJpcGhEMkhablhpa3dVTHhZb2lsVEVoV1hfVG9rZW46QzZIZ2JyVXVsb0VHR2p4R0VlVWMzTXIybkhkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjVjMzM4ZTVjZmU1NWRiMzFlNDNjZmFhNDRhYjFkNTNfMFhBTmF6ZWFmR3lpRTUxeFNDZURPSnk5T2NIekd2Q2tfVG9rZW46UFpWVmJucW12b2hYNjR4cEttM2NDaFc0bnNjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjEyZjZmY2Q4MDllZDRkZjI1MjgzNGMzNWUzYjI1MGJfdTVObFpTRjlBVG56OXgyMVNYaVNUdk9YRng4VFdFM3JfVG9rZW46SUhpbWJHa0Rab1FjVDl4bkxweWNHR0RnbmFmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

接下来测试是否能够对C/C++正常编译，请找一个存放C++代码的文件夹，然后在终端中cd进去。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmQ3N2FkNWQ0MzU2MWI1ZDhhYmQ4MjRkMDc4MDc2ODBfbE45d0ZFb0ZLb2xpZDJVSFhNUkpoTmRoYUc5NUwyVUVfVG9rZW46WEpRYmJVRU1VbzlMZlB4ajc5RGNLeERybjhmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后创建一个.cpp文件并用vim编辑

```bash
vim hello.cpp
```

复制以下代码到该文件里

```cpp
#include <iostream> 
int main(int argc,char **argv) 
{ 
    std::cout << "你好，机电创新学会！" << std::endl; 
    return 0; 
}
```

然后编译

```bash
g++ -o hello hello.cpp
ls
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGYxYmQ1MDA1MzIyNGFjMGY3ZmUwNDJmNmRhZjQzNDBfZU5jMUJ6cTd1NTc3cXdaMGZGQ2dqRU5WQXdRYWlpYWZfVG9rZW46UkdXWWJIQlBWb1VRa2R4Y3BmMGNqUjREbkJoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

运行

```bash
./hello
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGY5Y2NkNWFkNDJkYmI0M2JkMmNlMGQ5YmM3MzI0MWRfcktLVXl2STVGVlBxMGFOVGNob0M2Z0gySjlEcHV1YThfVG9rZW46WkE2aWJVNVk3b09VcFJ4SE0ybWNkWFFabmlnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

说明环境已经配置好了

  

2.  ### 安装CubeMX
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDkxOTM5N2JjYmFkMzUwYjNmZTdlNmIzMTBmNjhkMDdfcEl1N2xTckM1bk5FNWhSQTdiNFIyelY4UXlzTXVNZFJfVG9rZW46Q0VvVWJrTUdnbzJua0x4VTNRVmNvQVdMbk9jXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

下载地址：

https://www.st.com.cn/zh/development-tools/stm32cubemx.html

**推荐下载6.14.1版本（不要下载6.15.0,这个版本有bug，不知道后续何时会修复）**

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzljNTMxZTY2M2RhNjMzZWU5YzExZWE5NzZlMDY5NTZfRnJlTVh2NURQM3BkUWNuNTI1aTJNT09VUG1adjdSbTRfVG9rZW46V2RQYmJ1VnhSb3FrRnV4enloRWNrSmhtbnBiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmQ4YTczMTdhYjBmZjJjNjQ0NTVkZTFmYWEzMDcxMmZfd0NxSnBEWDN0N0pmY1JCNXR2UmE4WFB0bVQ4cEJuSW1fVG9rZW46V0syWmJKNzJ5b3hrMjd4ekd4RGN1VWR1bmVkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

解压出来

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWM1MmViNzY5MTk1YmYyMTY3ZjkwYjdhODFjZjlhMzdfejRNUFJsa2Ixc1RHRmZHWG5kQkZ6N29XS0JHZ3JtcDBfVG9rZW46WDZSdWJuNjJjb1I4NkF4UjF4M2M2MnZBbk9iXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

用root权限打开这个软件`SetupSTM32CubeMX-6.15.0`

```cpp
sudo ./SetupSTM32CubeMX-6.15.0
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzI0NDc0MTY1ZDYwM2Q3ZmQ0ZjVhNTBiMmNhMDcwYzZfYUhQZ0JabVhpWUlNaGsyTFRYZXlrV1B0U0hlemVqcFZfVG9rZW46UTZmdGI1ZU54b3RXd2V4T1FOeGM4dVNGbjNiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

在新弹出的界面一直点下一步就行，安装结束后出现如下图就成功了。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTM0OGIyZDQxNzg0MTE5MzgwYmYzNTM2NTMwNDJiMGFfb2tuZjd2eHkyb2pPSldLMXlERXVlTk1SWkFpdGRkOWVfVG9rZW46T3ZDdGJOeWVvb0dDVG54OWxnMGNrVE0wblpiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

`/usr/local/STMicroelectronics/STM32Cube/STM32CubeMX`进入这个文件夹，然后打开终端输入

```cpp
./STM32CubeMX
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDM0ZWFmMTg4YjI1MTE2YzIzOWE0OGYzNzRjOTg1Y2ZfUzFVWWRQeXJITFU3d2w0QlBkZGJydGg2WVZVZTgwdGtfVG9rZW46VjF4dGJUcjlIb3pwVVF4RHhRUWM3UEd3bnZiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

点击Help

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDc2ZTczNDM4ODM4ODFjYTU4MzAyMjc2ZTA5NzIyZTZfWHVScGxFcmplYmtpMDJnNzJ3cjdhblpVMjIwMUo2aVJfVG9rZW46VDJmM2I4dURwb0ZGbGZ4N2NvVmNGOFJ2blRuXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

选`Manage embedded software packages`，把STM32F1，F4，H7的第一个最新的固件勾上。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTdhZDJlZWUzYTI5OTQ3NDY0MTc1YjUwMDE2OTBjNzFfQ2lNQ3hHRU9CaVR0enNWbWxTWno2WlVwRkhicGxzaTlfVG9rZW46TVIyZWI1ZXM1b2xoeGF4SGtaaGN1WWhSbmdiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

点install

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDFkMzEyOTc2Y2U0OWY0NzliMWE0MmQ5NDU2N2NhZDNfdXNBSXM1bndOOHRGWU1vbE02YWtJQzE5T09lOUhqN3ZfVG9rZW46QXpHcWJiZEJZb0ppQzl4cmxVeGNNV3B1blJmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

登陆上账号

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWJmM2YyOGZkZWFhMDU2NTcwZGExNWY0NTdiMDg0MzJfMUtvMnhzWUFEVjk1cnB6T2U0NWFteGNxTVkxR2o4NGhfVG9rZW46RnNJWmJOV0NybzZpQWF4Q1ZEWGNGYUxobktjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后等下载和安装完

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmEwN2RhNWQ5MjNkOTdiOGM4MGM5MmVhOWMxNGM3YzBfNlowU3BzSUlZWUFUcU5ER1g4STk4Njh5Z2NDeWNteFlfVG9rZW46SDMzOGJYV1Fpb1o0Wlh4OFFaQWNjU2VqbnhBXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

下载好就行了。

接下来可以把CubeMX应用配置一个桌面快捷方式等可以快速打开，教程详见[Vinci机器人队Linux入门教程](https://sdutvincirobot.feishu.cn/wiki/GIKnwJo39iREkHkFGvqcy5Osntc)的Appimage章节，可以用ctrl+F快速定位该章节。

桌面快捷方式如下：

```cpp
[Desktop Entry]
Name=STM32CubeMX
Exec=/usr/local/STMicroelectronics/STM32Cube/STM32CubeMX/STM32CubeMX
Icon=/usr/local/STMicroelectronics/STM32Cube/STM32CubeMX/help/STM32CubeMX.png
Type=Application
Categories=Development;Electronics;Embedded;
Comment=STM32CubeMX configuration and code generation tool
Terminal=false
```

根据教程做，就可以实现这种效果啦。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NGYzYzVlMTUwOWFmY2IxMTk1NzcyMzM0OTlkZDkxMTlfVFRvODFUN1ZhZzExaFJwVjNuZ2NJeG5IYmZTS1NUMmhfVG9rZW46Q0Z5S2JFZm5Eb0tFcmx4RjFIcmNJWm5WbkZlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjEwYTdkNGM2ZjE2ZTkzMGNmNDUxNDY0MDljMDQyNGNfT2ZMODlSZjc4OHUzWmo5eHBqYXB6R21rS0JGUXJCTVJfVG9rZW46RDdob2JRdnh4b1htTjZ4ZVZwY2NKZnlWbmpoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

  

3.  ### 安装VScode
    

https://code.visualstudio.com/Download

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTMyMzg2ZDgwMWQwMzdjODVmYWJkMThmZGEwMzY1NGZfYjluWDhuUnJnMlE0eUtpVGx0SU43WFhqMkFLMDZmYTRfVG9rZW46RHI3a2I1QXcyb1dXMDd4Z09ic2NrZ0lIbmZjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

如果是debian系下载deb,如果是rhel系下载rpm.

下载完之后，点击浏览器，找到这个安装包的文件夹，并在该路径打开终端。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWNmOTJkODIwZTA3ZjlhMjZiYzViMzJiMWFhNzMzMTJfamtNSVBCT2VCUTVVZTlMRVdGV2VCNFo0aWtxRlB3TEtfVG9rZW46QWl3RmIyU1I4b0JualR4bFRVTGNOV3VnbkNkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

Debian系：输入`sudo apt install ./code`然后按`tab`按键补齐文件名，回车。

RHEL系：输入`sudo dnf install ./code`然后按`tab`按键补齐文件名，回车。

例如补齐后的：

```bash
sudo dnf install ./code-1.102.1-1752598767.el8.x86_64.rpm
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzJlOWMyZjE0OTg4ZWUyMmE4YWQ3ZWFhOTYzYjdhYzhfUHl0WEI4Z2twTnMyekxaa1VRdThMN2F0UFFnVEw1Z3dfVG9rZW46RnBjWWJ1RUkxb2ZHR0J4dDM2QmNkWVlLbjlkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后打开VScode，在终端输入下面的命令

```bash
code
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDkyZjczNGQ1M2RhMWU4NzhhZGE0YWVhNzdiYmRlM2RfS3NWYnA0d2VRamxubkFKZm9NdnRiOXlYRTYwc3RhTDFfVG9rZW46RWVaWmIzMnJHb3NBdkd4MHBvc2NXTkRubktiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后安装一些插件

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjhiYTM2NWQ2OWM5ZmQzMDE1YTlhZGM2NDdmN2Q0MTNfSGlKckx2UmlocEtpandwcFltaW1RZzZMMGFLMGN4dE9fVG9rZW46Rmx2Z2JFMDR6b21XbFV4dUhaM2NrZWxGbjZkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

下面这些都要装

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmVjZTBmNTYxZWUwODZlZDg4YTZhMDE2NzRhZWJmYjZfUm1jazdYWW54bDZWMU4yampra3BiV0daTnR3RENRZ29fVG9rZW46UVBqRmJyM0pLb0RkWlF4SXN4cWNRZVpzblFoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWY4YTA3NWJjMjBkYzU1YmFiYTY0YmFlZDY5NWFmOThfZmFNSmtQQmIwZ3FncWZTNjlkbGdRNXFxSVVzc0w0SllfVG9rZW46QUMzaWJGRVV3b2JFSk54UWhDdmNYazhvbmxnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2FjMjc1ZWVmZTIzNDJiZDM1ZGRkN2UyOTgzNjMyNGZfdU1MeW5Hc0ZXTEh4OGdQbFZQSUxlRUtIUGNYU1RUeWpfVG9rZW46V3lnaGJYTVU4bzltMTB4VVdXemNFeXkwbmFmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmMxNTM5OWEyNGQwY2VkZjAwNDc3OGU1MWRiZGMyOTZfeTNweTRlV04zZ0Z1WUlBOEFLTGdCbTNTWU95YjZ1UTNfVG9rZW46SEUyR2JVRFVMb3RKcUZ4VHl4V2NRYVhmbnJiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

4.  ### 安装ARM GNU工具链
    

编译工具比较：

<!--br {mso-data-placement:same-cell;}--> td {white-space:nowrap;border:0.5pt solid #dee0e3;font-size:10pt;font-style:normal;font-weight:normal;vertical-align:middle;word-break:normal;word-wrap:normal;}
| 特性 | ARM GCC (GNU 工具链) | Keil AC5 (ARM Compiler 5) | Keil AC6 (ARM Compiler 6) |
|:---|:---|:---|:---|
| 核心身份 | 基于GNU GPL的开源编译器 | ARM自家的传统编译器 | 基于LLVM/Clang的现代编译器 |
| 许可模式 | 免费、开源 | 商业收费（包含在MDK中） | 商业收费（包含在MDK中） |
| 代码生成/优化 | 良好，持续改进 | 优秀（尤其在小代码尺寸上） | 极佳，在性能与尺寸间有最佳平衡 |
| 标准兼容性 | 紧跟最新C/C++标准（如C17，C++17/20） | 主要支持C++98，较陈旧 | 支持现代C++（C++11/14/17），兼容性更好 |
| 错误/警告信息 | 比较清晰易懂 | 相对晦涩 | 非常清晰和友好，类似GCC/Clang |
| 与Keil MDK集成 | 需要手动配置或通过CubeIDE | 原生、无缝集成 | 原生、无缝集成，是ARM推荐选择 |
| 链接脚本 | 使用自有的链接脚本语法（.ld文件） | 使用ARM自家的分散加载文件语法（.sct） | 使用ARM自家的分散加载文件语法（.sct） |
| 汇编语法 | 使用GNU汇编语法（.S文件） | 使用ARM汇编语法（.s） | 使用ARM汇编语法（.s），但AC6更严格 |
| 生态与未来 | 生态强大，是很多开源项目（如Zephyr，ESP-IDF）和IDE（CubeIDE，VS Code）的首选 | 处于维护模式，ARM不再增加新功能，不推荐新项目使用 | 是ARM的未来和主力，持续更新和优化 |

* * *

1.  #### 安装
    

**建议都用****官方法****进行安装。**

1.  ##### 方法一（官网法）
    

https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmM2YjdkOGQwMGE4YWM4NGYzYWVmZDU3ZjM5Y2QwNGVfcmtxSHZWcG9JOTdKVTNwNHI5a2U5aFpSanA5aEhqS3ZfVG9rZW46SVZFRWJsc1Ztb0Q3cVB4TW1mQ2NpdFY3bjVkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

进入下载目录并打开终端

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDUzMTYxOGZiOTYxZWM5MmRhYzNjNDY1MzZiZjUyYjJfcGNBRHRSeVNFbkZ3MWYxREhUOFhnQ3ZwRWJEYkNCVGxfVG9rZW46RDdWRWJNaVVCbzNqR0d4OXZXWmNCVGgzbmZoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

在终端里输入下列命令，将编译器文件tar压缩包复制到你存放程序的文件夹（这个文件夹你自己定，建议在home分区，别以后删了就行）。

  

具体命令为`cp ./arm-gnu`然后按`tab`补齐，然后空格，再跟上你要复制到的文件夹的路径。

比如下面的命令：

```bash
cp ./arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi.tar.xz ~/UserFolder/Applications/
```

  

然后进入复制到的文件夹：

```bash
cd ~/UserFolder/Applications/
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmRiYTRjODQ5ODEyZDZmY2Q3OWVjMDRjZGY1ODRjMGFfbjQ3Y0duZUFDTURZUGRjbUZORno1dDJlVUNOOXlYdldfVG9rZW46R2Y4NWJTOVdub3E5Njd4emZGQmNxVlBsbm9jXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

在终端里输入`tar -xvf ./arm-gnu`并按`tab`补齐。

例如我补齐后的：

```bash
 tar -xvf ./arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi.tar.xz
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWRmZTc3MGY4MDFlYzZhZjIxMGRjZTQ0NTE4MThjOWZfRVlNNXJCbGtYZ1lqV0Nic0d4NGd1NURMRVo0T3FBa1FfVG9rZW46WlQ2V2JLd2V1b0xCM3h4ZW9WU2NRSkFXblplXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

再进入这个解压后的文件夹

`cd ./arm-gnu`按`tab`补齐。

```bash
cd ./arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi/
cd ./bin
```

查看文件夹路径

```bash
pwd
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmM5MDMzNTM5MjdkNjZhOTRhZDE1YmNkMTdlNWU5MGRfdjh0NWxsRGRpd3BXSlB3RlljYjNUcWRaWmlsR3VQU3FfVG9rZW46VXRHSGJTeEFRb3lIWXB4OHBodmNFZkV4bm1nXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

复制一下`/home/tungchiahui/UserFolder/Applications/arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi/bin`

  

然后需要配置环境

```bash
vim ~/.bashrc
```

在末尾输入下面的命令，把下面`~/UserFolder/Applications/arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi/bin`替换成你刚才复制的路径，`/home/用户名`可以用`~`来代替。

```bash
export PATH=/home/tungchiahui/UserFolder/Applications/arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi/bin:$PATH
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjA0ZWQ5NGUxZTJmZjQ0MjVjNWEwMzA3ZDZiZDhlMDdfSVNjd29LdjVrN05FbVppQ05RdlhtVzFQMEhtdHJVUFRfVG9rZW46VEZyQmJCVzEyb3lreTd4ZENqOGNYdm5WbmhiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

加载环境

```bash
source ~/.bashrc
```

  

  

  

2.  ##### 方法二（系统仓库法）
    

**不建议本法**

```bash
# Debian系
sudo apt install arm-none-eabi-gcc
# Rhel系
sudo dnf install arm-none-eabi-gcc
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDBjNGVhODRjNmM5NDhiMjU3OWIwY2M0YThkOGEwMmJfd1pGQVdmQ2hCVEJSRmM5V2E3NDZaV2VBclYwQk5NcWdfVG9rZW46UXp1cWJmcVprb3Bjenh4MHkxQ2NDSUw3blplXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

2.  #### 测试
    

检查版本

```bash
arm-none-eabi-gcc -v
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWUzZGUzZWRkNzA0MTRjMjFiM2RhZDJhZGRiMWVlOWFfWlpBUzVpbkZWR1c5Qm50elFFQUoyaFhyVG90eGdxRjJfVG9rZW46R2dwZ2J1VXdPb3lHMW54bnpsTGN3MUVjbmJnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

5.  ### 安装JLink驱动
    

1.  #### 安装libreadline库
    

我们烧录会用到JLinkExe的命令，而JLinkExe会用到libreadline库，所以要安装libreadline库，执行如下命令安装：

```bash
# debian系
sudo apt-get install libreadline-dev
# rhel系
sudo dnf install readline-devel
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzFlYzY4M2NhMGNlZjg4ODdlMDdlZTQzNGMzMTYyZWVfRURlT0dPaEh2bGp6ZEl2dkRvYzhkSDB6Z20xUHZjb2tfVG9rZW46QW9nMmJHVHdvb3ltZTl4ZjRPZ2NtQTRpbnJiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

2.  #### 安装JLink驱动
    

https://www.segger.com/downloads/jlink/

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmJlZTdiZjE5ODhiYjY2ZDAwOTQzMDBjZWM3ZGFhZTFfYjdJV3pZU29BNUdCYUxqVGltd09KcTlxdXVzUDMxZTRfVG9rZW46TjIxcGIxdm5Gb1ZMOVB4dzdMcGNWbEJDbnVkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

是Debian系下载64位DEB

是RHEL系下载64位RPM

（这里的64位指的是amd64和X86\_64,如果你是ARM64请下载下方那个Linux ARM里的64位）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjk3OTY3YjcxYTliNWY1ZGE3MTMxN2QxMWY4NmJjMmZfOGh2T20zV0lFM2tDU2tyUGJUOXhIWVRGV3puUGo4THVfVG9rZW46SllMQ2I3Z1Vrb1ZiYUN4NlRFTGM2UG1hbkRiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

打开下载到的文件夹，并打开终端

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjE3NWI3MGQ5NzRiMjg2MDZlMWQ0ZTQ1ZjA5NGRmYWJfdTFJbWRTc1UyNU5OcWYydXFzYTZYaEk2QkNDU0VMeVhfVG9rZW46WjdzRGJvUGhhbzlXRXh4Sk1qN2NGZ3R6bmxjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后`sudo apt install ./JLink`然后tab补齐。

然后`sudo dnf install ./JLink`然后tab补齐。

```bash
sudo dnf install ./JLink_Linux_V852_x86_64.rpm
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODRmYTBiMGMzOGU4NThhZWIxN2ZkYjI2ZjcwZTUxZTJfb1hGQXFZcExpYzNUNmV6NkZ1UG52M2ZvbDB4WEV3RzdfVG9rZW46RU9HaGJyZTFHb1drOU54WmhrMmNmRmRObmZnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

检查是否安装成功

```bash
JLinkExe
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWI5ZWM4NmZkMDc2MGFhNzc2MjZiYzEwYjE2MmFmNjVfcEt1UjFRNHpBYXhMdGRnd1hyUm9RaE45Y2pySW85UWRfVG9rZW46TlpST2J4MXFGb3B6SmR4UHRFZWNHcHpabjVkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

我们点击No，然后会进入Commander交互模式，在这种模式下，我们可以执行各种 J-Link Commander 提供的命令来连接、配置调试器，下载程序或文件到目标设备等操作，感兴趣的同学可自行学习。

执行“q”指令退出该模式。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTMxNjkxOGY5YWViOTgwNTIyZWE4YWRkN2FlNmMxOWNfYVRja2pRV0NzMFNDRHFFNDlLMXpndWRSV2tBUGxmbVZfVG9rZW46VnZEZ2JONVRkb1NmN1p4UjhhQWN2QVZ6bmRoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

  

3.  #### 下载并安装Ozone
    

https://www.segger.com/products/development-tools/ozone-j-link-debugger/

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWZmZjIwOTdiYTZiZjM1YjczNWUxOTVlMjMyNTExYmJfYXlhaEtGb3VHRmFodWdvNE40NmowcUV3aXVEc1JDQm5fVG9rZW46S0laa2JhRnlsb2llZ014RHQ1c2NOZ0NlblZjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWZlNTk4MjI3ZjJkOThlOTE2ZWU4Njg1ODM5M2MyMWVfdVlmSnFhb0QxNFhlaEFnakJRSm95M3ZBdmVLVjYxQWlfVG9rZW46WTRpRGJZWG40b2lQNHl4aWYzT2NlNVNubnpmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

是Debian系下载64位DEB

是RHEL系下载64位RPM

（这里的64位指的是amd64和X86\_64,如果你是ARM64请下载下方那个Linux ARM里的64位）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDE3ZDM3N2E1MDMzY2RhMzI1YjFlMjY0MmU4OWEzNGJfbks2dzVpRkN1ZlRUMndUOUdzYzJXWWhSbkZ2UGpyU3ZfVG9rZW46TDdGWWJPTDg4bzdNSDR4aXRtRmNqakI5bkJlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后`sudo apt install ./Ozone`然后tab补齐。

然后`sudo dnf install ./Ozone`然后tab补齐。

```bash
sudo dnf install ./Ozone_Linux_V338g_x86_64.rpm
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTI3ZjJkYmI3MjdhMDJlYzUwMjU0M2NhMTRkOGE2OThfY1hlUVpNanIzdW5hYXJObmFKVmRHaFdBN2ExR3owV2tfVG9rZW46VWk3RmJjeU5Cb2JBenJ4WXJPQ2NwWHJtbk1iXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

4.  #### 测试
    

打开终端输入

```bash
ozone
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTgzYWQ1YzEwMTk4MjA4ZWYxODAzYTc0MWFhYjk3ODVfclZJMmpha3NCQXpUaDdUODRaYTZvNEFwVFFKM0VIYWRfVG9rZW46TTZINmJrdUV1bzdaaHJ4cmZWbWNhc3VybmFoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

  

6.  ### 下载SVD
    

https://www.st.com.cn/content/st\_com/zh.html

在搜索里搜索芯片型号，如stm32f103c8t6

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDY5MzNiMWMyMmEwNThlZTg3YTE0ZjM3MGZlYjU5ODJfR3hWcGVTbWlHU3dxcVBXMzBvQjE3aWRXa3NDRTJ3TGNfVG9rZW46Q05hcGJ3cUZVbzJXUHd4VnBacWNkc293bkZkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

点CAD资源

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjUzYjQxYTM0MTg1ODhmM2MzZDNlMjIwMmY3MDc5NzhfejRqdzZpNW9wN0s0SmFzdmNxNmw1REd5ZlVHOFplYVdfVG9rZW46QWRIV2I5RXU3b0xqTTl4eGd2WWNPa0dGbjlDXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

下载SVD，鼠标点红色框的区域就可以下载了

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDE1ZTdkOWUxNzhiMjk1NjcyZTI2YzgzZTZhYmRlOTVfTHNVZDlGbENXZTk1WjhVSkVqTHVMNGs5M2hXUUcydGZfVG9rZW46WGxwa2JSRzlZbzRJaFh4dFVSTWNqRjNWbjViXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

解压后就可以获得F1系列的SVD文件了

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWQ2YzAxNDczODJkYmY5NmU4YTA3MjBkYTk4YThhYWZfcWNwdkxmTzdPY2w5c0FvQWozQzJydlRGRXlxeklOcEFfVG9rZW46RXRuMGJkSWg5b0RjZG94NmtvUmNmTVVybjFnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

依次把F4和H7的也下载解压了就可以了。（可以解压到一个文件夹里）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjRhMzNmZjkxZTQ2MGZlY2ZjOTllYWNjZDQ3ODA4YzFfNDhCU2hDc041aHo1OVgzNXNDUHplcFN6T243NElCSGFfVG9rZW46SFBsN2JsNXJZbzJqTGl4aDJrNGNOUnFMbmpnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后在上面的文件夹打开终端

将这些文件夹全部复制到Ozone的`Config/Peripherals/`目录下。（你需要提前确定一下ozone的配置是否是这个路径再复制）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWZkNmYyZWU4NTE1NzFlNWQ2ZTExOWVjMGUzODVhZThfMHVmcFlTVENkSVBoYTdmZkhJUzZ0M3hCREpWb3dYa0JfVG9rZW46UGFmaGIxSWJCb0p1TVF4RTlidmNvclE2bm5nXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

```bash
sudo cp ./*.svd /opt/SEGGER/Ozone_V338g/Config/Peripherals/
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGIyY2RhNTY4ZWJjMDkzZjIwNzI2Njk2YmE3ZDFkOWFfOG9NTVdMdmNyODl6Wm5KbWN2ZWl6QjVUeWVTc0RZT0pfVG9rZW46T1B6emJDSUJ0b0ZEcW94WFFISWM1cFo0bmFiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTliOGQ2YTNiMGI5MWVhODI5OGI5ZjBmNTdiOWVjNTZfZHZyZW8wS2RtODhpR1Q1ajdUaHJRdGtSTG5PNE9vaElfVG9rZW46SnNGY2JjQjRLb1BFVEV4dVhvcWNoTHgwbkFjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

  

  

3.  ## 工程创建与测试
    

1.  ### 使用CubeMX创建工程
    

点击进入单片机挑选的按钮

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmM3ZmIzZjU3NWJkMTVkMjRiMjkyMDI3Mjg2YTI2ZmZfd1dXSlRoY3dBa09EbTNPQjVBWFRubGhVejBIWGVsSzhfVG9rZW46U1RlNGJRMG01b3c0THZ4QzZOVmNROFBLbmhmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

搜索对应芯片，并双击对应芯片选项。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGI2OTBmMTRjYzQ0ZDg0YzI0NDE4ZWJhZDlmNjRhMjNfQWtQMWpBR2hIZEs5SFpNN0hWZUJnR1EwdVEzWGN5c2xfVG9rZW46UGZLc2JVaXN6b0UzR3N4VDBiZGNkV1VIbnBiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

进行一些配置，以下都是很基础的东西，你在看这个视频前肯定都会了

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDNiYjMzNWRhYzkwYWZiODg2MWJiNTI2MWUyNTMyNTdfZUVlb2J6b0FmcXo3VTdkZFUzeW1EdVVNNXlCUW5XR1ZfVG9rZW46UjNjOWJWenU1b21QaGd4SVVjb2NGVlhpbkRlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTgyNjcwODk3MjYwMmU4ZTkyOTMxYzhlOTZiZjQ4OGFfcmd6bVI1UlhheVdiRjYyM1prOTBkZ2RBUWRNcGg0cnRfVG9rZW46UWVIOGJpS1FHb1MzUHN4MVdvQmN2VjVDbnViXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

随便开一个IO用来测试，比如LED的GPIO

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTdmZjZmZjZhYjMxODNhNmMyNjRmYzA1MWExNDRlOGNfVURpZURQSDRvYlNMOFdJY0ZLQTllNUFPODh1d1ZIVjlfVG9rZW46REZSMWJ1Nnlzb3F3Nk54SGl1dGM3ZVdhbklkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGM4YmUzNDVjMzI3MDE0MmQxZWMyOWZkNDc3ZTMyMGRfNFVRSENYNEpGZ1prS3kwTHRGZFFydGFCeTc2dnAyUWRfVG9rZW46SGZiYmJhNGdDb05UMk54VUI5R2NwemltbjBlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

FreeRTOS也要配置一下。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDhlNzQ2Zjg1ZTgwOGY1MWM3NjhjODg2OGU1NWFjZjFfaFpucWZQUjVMS0l5OG9taHRidmI4OTF2d3VXNFF1elRfVG9rZW46T2ZFaGJBZENVb0Mya0h4NjhBa2NIQnFObmdmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjliZWRiYWJkMmQzNWZjOTJkZDY4ZGUyYTZjOGNhMzRfSjJnYlRtcjM4bHQwaXBVUmNsbEludlVwdG1weVZibzhfVG9rZW46WWI0VWJZakg5b0xDZWJ4SGgweGNTVnpCbmdlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

这些文件夹也要配置好，最后Toolchain选择CMake,编译器选择GCC(6.14.1及之前没有选择编译器这个选项很正常)

（但是CubeMX6.15.0有bug,这个选择GCC编译器并没有用，还需要后续自己手动选择编译器，以后可能会修复这个bug.）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmU1ZmU5ODNkMzI3ZGUxMzM1MGQ2NGJkMDlkN2U2MTNfREQ0N3p5NERZV2pyWkFWQm85cHI3TmNGZk1qbVBtUVpfVG9rZW46WEV4ZWJVR0JQb2RLNWF4and5d2NIb0ZDbkNiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjE0Zjc2YjM3MDRkZWI2NzhiZDBlOTc2NGZiZTI3YjNfRWx5WkRiMVo1dG9rUXJ5RFJmQldaWlRPdHAxbVFreDJfVG9rZW46Qk1KZGJWMnJwb2xKTU54RUNxUmN6ZTVnblRlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

2.  ### 对工程进行配置与编译
    

在工程文件夹打开终端

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NGRmNjJiOGE3OTU0YzlhMWYyNWIxNmMxYmI0ZTFkMDBfNnNRRlZoRVNsenRCUkV4N2pQUjJTRmI2cWtaSmZNTk1fVG9rZW46TDM5Q2JKcGRRb01YZzd4NUM4Z2NPc3FsbmhoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后打开vscode

```bash
code .
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTIyMjUxOTViNTk2ZTNiNjQyNWVhNzEyZmQ4ZDA2YTlfczJTWm9xaFFnNUpUTTdVd0lVV0FJNEF5cXcxY085MllfVG9rZW46WDBROGJvVWNWb0JrcVJ4SnNtbWMyOVZWbkJlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

进入vscode后，点击目录下的CMakeLists.txt

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWQ1MTM0MzQzM2ZjNDFkMzNlOTQ1NjE2MjZjZmMyZGNfNzdRTWVQSVdQY3NnZ0dpVHNGY0NoOGF4dDllbVVOcUZfVG9rZW46R0lCMWJkZng1b0FqVWR4ZFhwa2NEMUtkbmFlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

检查第25行左右是否有下面这行，如果没有，你需要手动给他加上这两行。(6.14.1版本没有这个bug)

*tips1：这就是上面说的CubeMX6.15.0版本的bug,因为这个版本增加了对clang编译器的支持，在CubeMX里也支持了选择编译器的操作，但是这个选项估计是工程师没写好，选择编译器不管选哪个，他都不会选择咱们选择的编译器，所以咱们需要手动选择。*

*tips2:这CubeMX6.15.0有第二个bug,这个工作区根CMakeLists.txt他说了只会生成一次，后续不会再重新覆盖生成，但是发现每次在CubeMX修改配置后，然后重新生成代码，其他命令都被保留了，就这个命令不会被保留。不知道后续会不会被修复，或者直接修复上面tips1的bug.所以每次重新配置CubeMX后，需要再把这句加上。*

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YmVlODdkNjc2NGM0NTk2NjBhOGEzZTNlNjgxZmU4MWZfNTVjMzdZUXNIWHhJSXlaVm9IUkxGNzcwbGZ4VU9Sb0xfVG9rZW46R2VWbWJ1WVNBb2t3c2F4dnlJRWNxSkZCbnZmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

```bash
# Include toolchain file
include("cmake/gcc-arm-none-eabi.cmake")
```

  

按ctrl+～打开内置终端。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzJiMTNjMDFjODRmYTk2MTc0MDRjOWYyMzljYTE3OWJfNHBBVDZHRDhoT1M0YUNnU0pXU1g5aThmZnlFSFdybFdfVG9rZW46V0ZtOGJkWHhVb21CRzh4UVFGSGNKMHhMbnJmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

使用下方命令创建并进入build文件夹

```bash
mkdir build
cd build
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTYwNWFmNGExMDVhN2MyZDQ5NTMyNzk1YzA2NTQ1MGNfQzA4VEJDOGpCb1VLdTdXSGdWc04yRnFWT3RLTkZJWDlfVG9rZW46UUl2VmJBTnlmbzNJbFJ4TGNTUmNhRXFzbnFiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

接下来使用cmake命令生成makefile文件

```bash
cmake ..
```

检查一下是否ARM的C/C++以及汇编编译器都被找到了（如果没有，请检查上面的教程是否有做错的地方）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGI3MjhjYjU4MTFjNmE2MmM5NjRkNTg5YWJjYTczYTNfSGRid1F4dG5oWkkwZVdZV2dKRmhWZW51TktIVTZSS2VfVG9rZW46Vkk5eGJGSXgxb1NxajF4M3QyYWNOTUtRbjNkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后使用make命令进行编译，命令为`make`或者`make -jxx`,这里的xx是你想使用CPU的几个线程来进行编译，比如我电脑是8核16线程，我就可以让xx是比16低的数字。而`make`是默认用一个线程。如果你并不知道你CPU有几个线程，那你就老老实实用`make`命令，别用`make -jxx`命令了。

```bash
make -j16
```

这样就是编译成功了。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTQzOGZkOGFmYTY5NTJjNGNmZDY3NzVhODBiOTczYjdfMHFHYWdsenVjUEJPdDFKQnNSUENIZDJ4ZHFTcElpbU9fVG9rZW46QTVoSGJiZWFmb1l1czJ4QWZhM2NPOGt4bnNiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

3.  ### 对代码提示进行配置
    

在VScode中按Ctrl+Shift+P,搜索clangd,并选择下载语言服务

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzRjNzRlM2Y4ODRkZDBmMzhhZTU0MWNkZmYwMzFiODZfbTJvRmRBZWVuY1daU2h3TjlEUlhsQVZJWWVQaDdkbFVfVG9rZW46RFRNdWJldHBGb3o1bHJ4RFhmZ2NuZFhobk1jXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

在右下角选择安装即可，安装完就会出现下图提示。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTNkNDdlYWNiNWQ0YmI1ZWM1ODlhZDQ3ZGU0MzFiNDFfNnpHR2Ntdm9DS2U1VVJORUdheG44ZGxMZTRvZUxlVldfVG9rZW46SmhVYmJnV2M2b1FDckJ4V2RpNmN6UjN4bmQ2XzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

接着禁用C/C++插件的代码提示功能(如果没这个界面，请往下看)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDM3OTM4OTA0OTkzZjc1YjVhOTU1YmU4NzQ4OWIwNjhfbjgxUGltNVpDZzVRN2sxdVR0THRzZDFIc1Jma25laHpfVG9rZW46R0xoNmJOb0FxbzR3Nnd4ZHN2dWNuSmVqbktjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

如果没有上图的弹窗，可以进行手动关闭，依然是ctrl shift P,输入settings然后找到如下图的选项

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDU1MWViNDk0OTQ0Y2I0M2I3OGVlMjhlYzQ3OGEyYmFfZnBqNUV4WHRCYnlPU1VNYzIxVEE0dXNhR3VzWXRlT1RfVG9rZW46RjRLb2I5YkFab1d2a2R4MmlvRGN4bTlDbnpmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

找到下图这个选项，改成disabled即可。

`"C_Cpp.intelliSenseEngine": "disabled"`

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTJlMjNmZjJkYmM3NzdlOGE3ZWM4ODY2ZjhiOWI2NzBfaEhidXVyQ2g1MXhFZzJ1dzF0WWJoS3NiTW5EckNDRjlfVG9rZW46S3dJTWJTd0NTb1luWDZ4MTBTWGNSZ2xtbjRmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

在VScode中再按Ctrl+Shift+P,搜索clangd,并选择重启clangd语言服务(重启clangd语言服务之前必须编译过一遍代码了)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTBmN2IxZjM3MDlhNWRiMzY4Yzg5ZTFmYzNlYTAzZGRfVGZqYUR0WUl2SU9VSFdkYmIzZmVlYmZ5N2VNeUt2bENfVG9rZW46Q3RzYmJJeWNkb0FEdU14R2xMdWNGamVNbjZnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

此时，可以看代码里头文件都正常识别了,代码提示也正常了。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=M2I2OTFhN2VmNTQ4MTllMzdlMTgzNTUxZWMzZDQzY2ZfS2xLbk1ucDdUM2dqRGZtM2daNkpJQXRrWUZMVXdYWWpfVG9rZW46TFh0emJmd0cyb21WVHV4ZjJvNGNjWW5JblRlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2Y2MTA1ZWE0MTdmZTdmMjY3MDY0YWI2NDJiZjM4NzhfS0xSWEVtOVFKb2hCbFRZZTNsVzMxTnlHWGU5U241N1RfVG9rZW46Szlvb2J2MVdqb2xEbGZ4TGN5OWN1OWtzbktjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzAxNjY3YmFmOTUxYWFkZGUyZTBkODAyNjRlYzgyOTlfTFJQVDQ0OUc2UUluWUVwZll6VHZBQmhhVFFwTlZsTW1fVG9rZW46SXduQWJKVURWb0h0dmx4Nk9aTmNHbXJLbjRjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

⚠️注意：Clangd 默认找的是 **本机系统的 libc/include 路径（比如 x86\_64 的 `/usr/include`）** ，而我们工程里面实际使用的是 **ARM 工具链的头文件路径** ，这就有概率导致包含C/C++库函数的头文件报错

例如：

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODQwNTdlMTE3YmY2ZmU0MDBmN2VlODZkODczM2Y2MTBfSndiN1pWRHRvejVGWmp2ZEFIV1FFdmg4M2ExTERrTGVfVG9rZW46WG56MmJ0OTZyb21oN3V4dWZPdmN5TTZJbnBkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

这里的 #include <math.h>显示找不到头文件，但是我们进行编译的时候却没有报错，说明是clangd的配置有问题 。以下介绍一种解决方法：

1.  运行以下命令，获取 ARM GCC 使用的标准 include 路径：
    

```bash
arm-none-eabi-gcc -x c -E -v - </dev/null
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTBkY2RmOTc4YTIwNTc2NDBhZGE1YmY5MmRhMzgyNjJfRXhIWUlhZE5EVHdsUUgzQzV2bHFhdmlPdHdIWEZ1cU9fVG9rZW46RWdaTWJrUHZabzgzUnB4d01NVmNERUV1bkVnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

2.  在工程根目录下面创建 .clangd 文件 将自己的头文件路径包含进去（引号里面替换成你自己的arm gcc头文件路径）
    

```
CompileFlags:
  Add: [
    "-isystem", "/home/xiaofang/Applications/arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi/lib/gcc/arm-none-eabi/14.3.1/include",
    "-isystem", "/home/xiaofang/Applications/arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi/lib/gcc/arm-none-eabi/14.3.1/include-fixed",
    "-isystem", "/home/xiaofang/Applications/arm-gnu-toolchain-14.3.rel1-x86_64-arm-none-eabi/arm-none-eabi/include"
  ]
```

保存，此时刷新一下clangd,头文件提示正常

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWNmZGNkODU5ZWJiOTc1MTVkNzUzZDZmYzUwNTFjNDlfa1h4UnNqR053TzZrYnJzTHFFU2Z5TTlyc0dqYTRwWlJfVG9rZW46V0hESWJPSHd4b0dINnh4b1VqYmNteThSbmxkXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

4.  ### 移植Vinci机器人队标准C/C++工程模板
    

用git clone命令克隆仓库:https://github.com/tungchiahui/CubeMX\_MDK5to6\_Template

```bash
git clone https://github.com/tungchiahui/CubeMX_MDK5to6_Template.git
```

把仓库里的“工程文件移植”文件夹里的 **所有内容** 复制到我们CMake工程的目录里。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmEzODJmMTMyZTBkMmIxZTNmNjNkMDQ2NWUwMzgzYjRfcEZuY0ozeE5WZENwSzh4dURWZlRsbnk3aXFhQkhnb1ZfVG9rZW46R0x0MGJIQmFYb3ZCYkh4Z2ZiQ2M2eXQybjJmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

然后打开applications文件夹，在Src和Inc文件夹分别创建led\_task.cpp和led\_task.h，内容分别如下:

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDM0ZmE4YmFjZTBmNDUzN2ZiZWRhOTUxNzg1YjE4ODZfTHZEZFhsM3E1Y1dPMzJ6UnhVTElRdVVmUHVvSEN3RHhfVG9rZW46WVZ3UWJIYlVvb2RyeVR4S3FKT2N4ZjhsbnhIXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

led\_task.cpp:

```cpp
#include "led_task.h"
#include "cmsis_os.h"
#include "stm32f1xx_hal.h" 

GPIO_PinState pinstate = GPIO_PIN_RESET;

extern "C"
void StartDefaultTask(void *argument)
{
  for(;;)
  {
    HAL_GPIO_WritePin(GPIOC,GPIO_PIN_13,pinstate);
    pinstate = (pinstate == GPIO_PIN_RESET) ? GPIO_PIN_SET : GPIO_PIN_RESET;
    osDelay(500);
  }
}
```

led\_task.h:

```cpp
#ifndef __LED_TASK_H_
#define __LED_TASK_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include "cpp_interface.h"

    

#ifdef __cplusplus
}
#endif
    
#endif

```

然后打开`cmake/user`文件夹下的`CMakeLists.txt`，把刚才新建的led\_task.cpp添加上去。

详细介绍（可以不看）：这里的`cmake/stm32cubemx`下的`CMakeLists.txt`是被CubeMX管理的，你重新用CubeMX生成新代码后，这个文件里的东西会被覆盖。而工作区根目录下的`CMakeLists.txt`是不会被重新覆盖的，而且给我们留了一些区域加源文件和头文件，但是这样会让这个文件太过于嘈杂。所以我们选择新建一个user文件夹，然后在这里面弄一个`CMakeLists.txt`，再用顶层`CMakeLists.txt`去加载这个子`CMakeLists.txt`，这个子`CMakeLists.txt`方便咱们修改，文件结构也更加明显。（这些都不需要咱们自己创建，我已经给创建到 **工程文件移植** 里了，你在上面复制的时候已经复制过来了）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2Q5NjFhYmMzOWNlNzI1ZGFiM2M2YTg4ZWY4ZjIyMWZfVUhOT1YyTWxyV0NFVmRCa3JwNkpFWWNHNkR2NEs2bVRfVG9rZW46S0V3UmJvTkxpb1g5ZXh4bkFuMmMzcmxBbkUwXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后要去最顶层的CMakeLists.txt里加上这句话来引用我们自己的CMakeLists.txt。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDBmMmExNmVkMmZmOGVjZDUxNGJkNzY1NjM2ZTczZmRfVW9vNjhkTlpOVjhlRUZRV2UzZDdjR2FvZldqUHB6cWdfVG9rZW46UFUxbWI5SHVob2J0NDh4SW1oMWNRQUNzbjNmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

```cmake
# Add USER generated sources
add_subdirectory(cmake/user)
```

大功告成，编译一次试试。可以看到下图，那些新加的文件都编译上了。

```cpp
cmake ..
make
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTBhNzFiZjI0M2I2OTJmMjlmZGE3ODY2ZjI1YzFkMzNfUjV3Ykt5cDhTSkpZQk5UVHNuU3l3a2hhZUVOVDFsT25fVG9rZW46T3pkSWI2TXBPbzJoc0d4VUZyRWNXUVhvbnZoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后去main.c中引用cpp\_interface.h头文件，并将cpp\_main()函数在main函数的这个地方调用。(我这里是开RTOS了，所以需要在启动RTOS之前调用cpp\_main函数，如果你是没有用RTOS的裸机程序，则在while (1)的上方调用cpp\_main即可)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2M0NzNkYjZkYWZkYjhjMGJkMmUwNzYyYmY3N2Q4ZTlfNjdVWEp4SGJuRHl0N25iNDBCRU91bENUV2NVSWUzelFfVG9rZW46SG9wR2I2WFc5b2kzaXN4c244TWNCVlI2bnJlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Yzk2NmFkNTUwMDE3NzE1ZWNkMGY1Y2YwNGEzZmY3ZjdfOUE2NUhVcGUybU5wbWVzUFVqck9JNW0zeVR2U3JNVVJfVG9rZW46QWVFUmJzeGVOb0N3eTh4Wk1XVGNSNHl0blhiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后在cpp\_interface.h里修改isRTOS这个宏来让程序知道你是否开启了RTOS，如果开启了，宏就为1，裸机就填0。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWQ3OTQzOWJjMjNhYjQ0N2U1MDhjOTQwNDZjNjdkZDdfU1BUaFZDTjJESTVqRTM0ZkhSU0FLV3ZDZnFERHU4RmNfVG9rZW46Q3BabmJBbFkxbzBSZFV4cVlzRWN4dDdYbm9SXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGZjZWI1YTFjNTMyZTI0YmY5ZDc5MjM0ZTMxM2Q2ODVfYWNBOHZ2VkRKWU9SUTBoNUNxa0Y4eTFGUDI1ZTA1WllfVG9rZW46VW8wU2JUdVd2bzJvUUt4WEFNQmMxcWpsbmdmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

其他更加详细的关于STM32的C/C++工程介绍请看[Vinci机器人队单片机教程](https://sdutvincirobot.feishu.cn/wiki/PqsGwcPCuidbN6k13jfcGWtWn0b)。

此时在build文件夹下进行编译程序，发现成功!

```cpp
cmake ..
make
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTlmOTJiNjg4MmMxOGMwYWVkZjBmZGUyM2E1MTI1ZTlfMFAxM1pFUEZQTWlkMzJPU0lPN2l0RFFqclBCU2dORzhfVG9rZW46Q0JlMGJja054b2d2dFV4d2s3QWM3Rmw1bkloXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

5.  ### 下载程序到板子
    

1.  #### 配置CMake生成.bin和.hex文件
    

在下载程序到板子之前，我们需要去看看咱们之前编译的到底生成了啥文件。

通过下图可知，他只生成了.elf文件，并没有咱们常见的.bin和.hex文件。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2UzNmZlOTJiZTAyOGExZTU1NTgyZmYyOGNjMzNjYmFfMldUWW1xQlVmcWUxZzY1NDJmckFxR01KU3lmSUZzeVhfVG9rZW46Q0NqV2JuSTVnb2FYQUh4SEpEYWNRZEpHbllVXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

咱们需要再更改一下工作区下的CMakeLists.txt从而来让编译的时候生成.hex和.bin（没办法，就得这么麻烦，我也不知道为啥CubeMX不给全干好）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODFhYThiOGRhMmMzNjBhMmQzNTBkZWE2YTg1MWQ2MzNfY05mdGI2OERuOVBCcEppekhxS2JMTm8wczhoRzY5ZWxfVG9rZW46QmJadGJMUE53b1BUWXZ4QWRMcWNNNnRrbkxjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

```cmake
# 生成 .bin 和 .hex 文件
find_program(OBJCOPY arm-none-eabi-objcopy REQUIRED)

add_custom_command(TARGET ${CMAKE_PROJECT_NAME} POST_BUILD
    COMMAND ${OBJCOPY} -O binary ${CMAKE_PROJECT_NAME}.elf ${CMAKE_PROJECT_NAME}.bin
    COMMAND ${OBJCOPY} -O ihex   ${CMAKE_PROJECT_NAME}.elf ${CMAKE_PROJECT_NAME}.hex
    COMMENT "Generating ${CMAKE_PROJECT_NAME}.bin and ${CMAKE_PROJECT_NAME}.hex from ${CMAKE_PROJECT_NAME}.elf"
)
```

这些需要在工作区主CMakeLists.txt里添加的命令我全都写在这个记事本里了，每次生成新工程直接复制即可。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzNhN2RlN2Y4ZDA2MDZjN2FlNDRmODYzYzVmNmJiNjVfV1Z1TUdzQ3JJbE5KZ0pkQjFrUXFPbVpCaXJxYVJ1b1hfVG9rZW46SHc3TWJNRE5Sb1Eycml4UUJ5WWNEbk5ZbkVoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2UzMDk2ZjQwY2RjODFjNjUzMmM4MTQzMjYyZmFmNWJfVmd0NVpDRk5lMUdUMEFKU09wQTh3RnlBWEJTQXJaY1BfVG9rZW46VDdPOWI1dWNWb2IzRFF4MGV6QWNXNDdjblBGXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

然后再次编译

```
cmake ..
make
```

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGIwNGY1NTNmMzg4MDlkMGU0MzY4ZDRkM2QwZjViMWRfWWV4eENMNDVIYTZuSDRGSDFYV1Y0NmNTMThxaWxiZ1pfVG9rZW46RW1nZGJBNEFIb2xUczF4R3JWZmNwb3dnbmxoXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

此时再看build目录：咱们需要的.hex或者.bin就出来了

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWM0ZDQyYWI4Mzg0ODFlZDdlZmQ3ZmFhMTg2YzM1NGNfMVE5V01zbWJkNzkyRWNyeE5VM1owS3BJWW5RbG5qU29fVG9rZW46V2JPVWJneE83b3VnWTd4UG4yQWNXT1pFbk1iXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

2.  #### 将设备连接到JLink并烧录程序
    

1.  ##### 图形界面烧录
    

```Plain Text
#打开终端输入
JFlashLite
```

选择对应的芯片型号和速度

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDZlMjNkMTUzODc2YzQzMDE4YmQ0OGE0N2NhZTk3OWVfaWd4akNDZlBTYURibHNUSnpZZTRCd0tUbGxDd2tURWRfVG9rZW46R3VGSGJuNGNCbzVURTR4QVBmQ2NmSVZlbk1jXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

添加hex文件

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWEwODk1NTM0NzNkZTk0YzY4NWI5OWVjNTkzYTI1M2VfOWUxM0pJQTZLMllveHBnUmN6eThOVTE2ekpjQk1wVXZfVG9rZW46UzhSU2I3UGtVb0ZkVmx4VWRmSmNzZjd5bmdnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjFhZDkzNTU1ODM0Nzk0NWFmNTg2ODQxYzI2OTgwMzZfZWxNNW95MWZFemR4UWJONndvOHF3a09HbnlCZFU3TEdfVG9rZW46WDlxQWJTdWpPb3pESVZ4QnBVZGNIcm1pbm5lXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

点击烧录并完成：

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjFhMmMzNzgyOTJhYmI3MzE1MjdhM2VhYmM4MmRhNjZfT1hBR2tyMEc0V2pnQk55QjZ0RU5xQk9XNUVseUhhTnJfVG9rZW46SFNXYmJFdXpab0pyU1R4bW5JOGNEaDJablpmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

成功点亮led：

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWQ0YTFiNTE1ODE5NDUyODM0NjE5M2Q1ZWFkZWI4NzRfR2ZxN3JjWXFjc25IY2hEbmtPZGFkSDg4cXZTTXBZa2dfVG9rZW46UnhGS2J0M1pKb0hzR0d4WUhmWWN6WFM3bjRiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

2.  ##### 终端烧录
    

算鸟算鸟，太麻烦了。

  

6.  ### 配置VScode任务
    

咱们在上面编译，一直需要输入以下命令

```cmake
cd build
cmake ..
make
```

这样每次编译过于麻烦了，所以我们使用强大的VScode来一键编译。

首先创建`.vscode`文件夹和`tasks.json`文件

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjMzNjRiOWFhMjNjZjkwNWI3MTA2ODBhMGM4ODEyMzZfbzZtWGVXUWIzaktkeUhhbEQwRTZPcjYyTjA5ZWQ0UkhfVG9rZW46Vkh5OWJPOEJ4bzRiZGd4b05GTWNTalJFbnNiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

以下是`tasks.json`的内容：

```json
{
    "version": "2.0.0",
    "options": {
        "cwd": "${workspaceFolder}/build"    //需要进入到我们执行tasks任务的文件夹中
    },
    "tasks": [    //tasks包含4个任务
        {
            "type": "shell",
            "label": "stm32-cmake",    //第一个任务的名字叫cmake
            "command": "bash",
            "args": [
                "-c",
                "mkdir -p ../log && echo \"===== CMake started at: $(date) =====\" | tee -a ../log/cmake.log && cmake .. 2>&1 | tee -a ../log/cmake.log"
            ],
            "problemMatcher": []    //这里需要添加一个空的问题匹配器，否则会报错
        },
        {
            "label": "stm32-make",    //第二个任务的名字叫make
            "command": "bash",
            "args": [
                "-c",
                "mkdir -p ../log && echo \"===== Make started at: $(date) =====\" | tee -a ../log/make.log && make -j$(grep -c ^processor /proc/cpuinfo) 2>&1 | tee -a ../log/make.log"
            ],
            "problemMatcher": []    //这里也需要添加一个空的问题匹配器，否则会报错
        },
        {
            "label": "stm32-Build",    //第3个任务的名字叫Build
            "group": {               //默认是build任务
                "kind": "build",
                "isDefault": true
            },
            "dependsOrder": "sequence",    //顺序执行依赖项
            "dependsOn":[    //依赖的2个项为cmake、make
                "stm32-cmake",    //即第一个任务的label
                "stm32-make"      //即第二个任务的label
            ]
        },
        {
            "type": "shell",
            "label": "stm32-clean",    //第四个任务：清理 build 文件夹
            "command": "bash",
            "args": [
                "-c",
                "echo \"===== Clean started at: $(date) =====\" && rm -rf * && echo \"Build folder cleaned.\""
            ],
            "options": {
                "cwd": "${workspaceFolder}/build"    //只清理build目录下的文件
            },
            "problemMatcher": []    //不需要问题匹配器
        }

    ]
}
```

**方法一：**

在VScode标题栏上，找到`终端`，然后再选择`运行构建任务`，快捷键是`Ctrl+Shift+B`。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTRhOGE0NGNlZDJjOWM4ZTdjZTI1MzhlODlhOTVhZWFfOXdZYWFzcmYwQ0l0UThrdkh5WldCbExqdWUyRXd5T2VfVG9rZW46SUtmRmJUS2hNb3QzWkV4a3U0OGNZYUVubjVnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

可见任务已经被运行了。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQxMDRhNDc5ZWMwZDU2NjRmY2VjOTMwY2Q4NjhjMjNfWTNmT2RuUGZRRWw5VTNxSXBDTVNqTVpSNnVLZDNReVZfVG9rZW46Qm5McGI2dnFWb0xmYnh4V29zT2MxQTZtbjRnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

**方法二：**

在VScode标题栏上，找到`终端`，然后再选择`运行任务`。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjQ1YWEzNWI2NGFiNmFhYzU1ZjE1OTZmOWFjMjcxYmFfajFPcDQyakVIdXY1bGFoZ0Q0UVpjYzU0SEYweDZodGZfVG9rZW46UU90U2J3dW9MbzNRU0F4SEpDMmNVckxhbnVnXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

下面有4个stm32的任务，第一个是`stm32-Build`任务，运行后的效果和刚才方法一是一样的，方法一的那个`运行构建任务`的按钮，就是运行的这个`stm32-Build`任务。

这个`stm32-Build`任务包含stm32-cmake和stm32-make任务。

然后`stm32-clean`任务就是清除build文件夹下的所有文件。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzVlY2M0NmY2NzZhMzYzN2FhOThiZmQ1Y2FiYWU2YWFfbkw2Y1EzbjJuU3ZLdFRnWXZIZ2YwcHQzOTR4V1loUHlfVG9rZW46SGRXNmJkR1lHb3Jrcmt4Rmh1NWN2TlJQbnVmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

可以试一下`stm32-clean`任务。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTYyNTcyZWIyMjM3OTY5NTVhOTY2ZDljNDcyODQ0ZTRfVGhKelgwRUE1b3VxbUhFaE12Mk9RTEo3TUpSRUQ4bUdfVG9rZW46WmQ3WGI5VU4xbzlxbUt4RDBubmM5alhzblJjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

可以发现都删完了。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmFiYTk1YzI4NDBjY2JkYmI0YjMwMjIwMThiYWU5YjVfRjFNOFJtQ0JxdmZ2WFF1ODVZUzZ1WGJlcHNtOGNOcUZfVG9rZW46TGQ0SGJ6M2M3b3JYOTh4cnpEbmNOMVV2bkFiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

**你不用担心每次新建工程都需要配置那么多东西。**

以上大多数配置文件全部都已经包含在https://github.com/tungchiahui/CubeMX\_MDK5to6\_Template仓库下的***`工程文件移植(创建新模板请看这里)`***文件夹了，到时候新建一个工程后，直接把这个文件夹下的所有文件全部复制过来即可。

  

7.  ### 使用ozone进行Flash烧录和Debug调试
    

1.  #### 基础配置
    

打开终端输入ozone打开软件或者直接找到应用图标打开ozone

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDZhOGViNGZjYWU5MzRiOWI0ZTkyYWY1MGU3ZjdkZGZfakdiTW9CTjVJYXhhNUdncE9DZ0ptd0s2YmtucTV3cFBfVG9rZW46T2ZwOWJ1QkpKbzNpcUF4VDc0WGM1ZnNCbkNmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NGFkZjNmZDQ1MzBhM2JiMmNlM2Q1NGYxYjU1OWJhZWZfMzhCcG5jTEk2UWJxbk1JM2toSzVpQWhCcXdva01IclFfVG9rZW46Q29yRGJNUTdrbzFWNEh4UWtEb2NDNjlTbkFlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

先选择device，比如我是STM32F407VET6

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmVkODQ4ZGZjMWIwMjAwYWE4OTcyNDdiOWI5OWRkY2FfdkVBRHlnR0YwZlVPeXZkajEyc2JSYTBLZDZ3akV0ekZfVG9rZW46QnVHMmJBVXd2b3NPa2p4RG5qV2N4MGFCbk9iXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjg2Y2U1YTE0YjI0OWY5ZGI0ZDNiYWYyMzgzMmM5ZmZfWWMzdDlqOTJ2UHpRTUpUM2ExeTVGUlc3RlQxYmtYaGNfVG9rZW46Sjk4cGJWVDJxb211Z1d4MGJMQmM1UkZFbk9mXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

选择Peripherals:

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjcwNzQ1OGEzNWU5NzhlZDM4NGM0MTE2YzIyZjExZmNfRTZwc1IwZDJrSXJETzlFcnBOZ3NicFpON0JNQlpRYmRfVG9rZW46SUVOY2JSRnlFb3RvMHl4M1VLMGNzZzV5bkJlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

点击下一步

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTAyMjFlYzFhMWVjMTcyODU2NzkzMGQzOGY1NDM4ZGFfVFROWmllVmlOZDVsMHlpalNaeGpNS2lCUEd6eUVVYzVfVG9rZW46STRvNWJKcHhKb2ZneER4TnlPT2NHSFZYbnhlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

你用的SWD就填SWD，是JTAG就填JTAG

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YmNkYjJkMzdmYTY3N2FkYTc5N2ZjZWVlNjAwMWFhMGZfbDBFQ29PMjNUdXlPWEp4bmcwOGlsRlJDMTlzU08xSXdfVG9rZW46R0N1eWIwZlRTb2RaRlR4MDByUmNXZ0RQbnhiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

选择ELF

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGIwYjIyMDk0ZWQyZGYzOWQ5Yjk5MzdlYWJiMjVmMWJfb29zeG5KalJsS2k5OEVVdlpqc0JzckRTYUkzcHJTTkhfVG9rZW46SWpJeGJrYjVZb1lSZm14bVNydWN0blVwbnRiXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

elf,hex,bin都可以选，一般选elf就行。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjExZDdjNzBjMmRjNDIwMmM4YjIwNjNkZDEyOTJmMGZfR3Q4VUVzdTZiWmg2RE9mVW41QXpiQzJRNUZsaG1aTjVfVG9rZW46SnA1bmIxWFRZb0x1dkR4T3EyOWNoT0x4bkViXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

这一步保持默认即可。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGI3MWM5YTdhNjE0MDc0ZDI2ODBhNGU1ZWMyOWZmZGVfbm9MeTYxYVZjVm9YMENSWE9WTXlGYWh6OUFoT0RlUUZfVG9rZW46SkJoYWI0aDRnbzhyTW94aVR2N2NMZ0E5bk5iXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

如果你开启了RTOS可能会遇到这个问题。

```bash
warning (138): The target application seems to be using FreeRTOS, but FreeRTOS-awareness is not enabled.
```

意思是你的目标应用似乎使用了 FreeRTOS，但当前没有启用对 FreeRTOS 的调试支持（RTOS-awareness）。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWExYmI0OGU2N2MzMTdmNGQxNzNlNTQ2OTJiNzM3YzBfMjVabFBzRE0wWEtSTlZvMG5Nb3RuaXdza25vcm5GT2JfVG9rZW46SzhHNWJPRWFZbzg3N1J4VXJ5Q2NOVE1PbjdmXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

直接按照他底下的提示应用修复即可。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2E5YmRkM2RjZDU3ZmE3Nzg4ZmExNDBkZWU5Zjg0ZTlfR3RSUENodUI0ejg4MVR0YUhFcUszRWZ2YWVSaDMzYnVfVG9rZW46TTdFb2JvYTNrb2JQY0N4Q0dhUmNnNmxPbkFlXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

点继续就行。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGJmZDI5NTY3MDc3OTAxM2U3NDllZTQ5NDgwMzM4ODlfVlNTWkhiMXBWUjFXblBMc2FsVlE0TkQyOHJBSW1nRzdfVG9rZW46Qm13cWJGWk5Db1lublN4OThPS2N4aUNEbjdjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YmZhYmVlNTcyOGE4ZjNjN2MyZTUzYjE0ZDIwNjEzNGVfNUl3NEQ0R0EwbEtmWVlyRThvc2g3RU1KWGl0cUJuTW9fVG9rZW46QUcwVGJXMFJSb0dSOEp4MU1ZU2NBT1RibnZjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

2.  #### 烧录与调试
    

可以看下面这个视频，讲的挺好的。**(从30:10开始看）**

https://www.bilibili.com/video/BV1yrLHzZEoE

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjBhZjE5NjBhOThkYjM3ODg3M2M5ZmQ0ZmUxNjEwYzRfUHBEUnU5cWt1MnhvR1FUVDY3NXU1d2RtMkRNMDZmYU1fVG9rZW46VzdKQWJXTmxwb2diTmF4c1VnbWMwR2NJbmg4XzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

点击File让他按文件名排序。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2UyOGNlOTI1MTNlOWRiODlmZGFkNjg1OTczYjNkNzVfaVk3bE93dFRjaE1sUGI0TDdvdXdjSThNcEFmSHBYTWhfVG9rZW46TW43VGJ5Y2Rab21yUWt4VEFpR2NOd1dEbkZjXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

找到led\_task.cpp点击就可以打开这个源文件啦。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzYwOGI2YWZhNWQwZTRjMDVmZDg5ODRkMTEwNDllZWRfYzBLb05MSWVLT3U0TFYxWXhNY2ZaaHJMWkRUSk9lR1lfVG9rZW46RTE4WGJabDVxb1BTZ3R4VzAycGNYbGN5bmlFXzE3NjA5NTU2OTk6MTc2MDk1OTI5OV9WNA)

  

  

3.  # Windows
    

1.  ## 环境准备
    

本教程环境介绍：

1.  系统：Windows 11 LSTC
    
2.  系统内核：Windows NT
    
3.  架构：X86\_64
    

算鸟算鸟，肝部东啦