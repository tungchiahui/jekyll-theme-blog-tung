---
layout: post
title: STM32-FreeRTOS教程
tags:
  - STM32
  - RTOS
---

> 📄 本教程已发布于飞书文档：[点击查看](https://sdutvincirobot.feishu.cn/wiki/PqsGwcPCuidbN6k13jfcGWtWn0b?from=from_copylink)

1.  # 前言
    

**本文只负责指导一些问题，学****单片机****MCU****还是以下列视频为主:**

单片机MCU环境配置:[电控组环境搭建大全](https://sdutvincirobot.feishu.cn/wiki/FQszwXIR5iQgCfk7pRwc9rYpnqg)

1.  正点原子HAL库视频：
    

https://www.bilibili.com/video/BV1bv4y1R7dp

2.  正点原子电机专项视频：
    

https://www.bilibili.com/video/BV1hv4y1g7s3

3.  正点原子FreeRTOS：
    

https://www.bilibili.com/video/BV19g411p7UT

4.  大疆开发板C板开发教程：[大疆开发板C型嵌入式软件教程文档.pdf](https://sdutvincirobot.feishu.cn/file/VTXjbEQQTohL3lxITmUcZokbnke)
    
5.  正点原子开发板资料(请下载A盘资料)：
    

http://www.openedv.com/docs/boards/stm32/zdyz\_stm32f103\_warshipV4.html

http://www.openedv.com/docs/boards/stm32/zdyz\_stm32f407\_explorerV3.html

6.  【【中科大RM电控合集】手把手Keil+STM32CubeMX+VsCode环境配置-哔哩哔哩】 https://b23.tv/5mwveRt
    
7.  【ARM与STM32啥关系？不来了解一下嘛？-哔哩哔哩】 https://b23.tv/VvcYgUD
    

2.  # arduino库(了解即可)
    

1.  ## arduino库（Qualcomm Arduino、esp32）
    

Qualcomm Arduino 的语言系统在设计时参考了C、C++、Java，是一种综合性的简洁语言，语法更类似于C++，但是不支持C++的异常处理，没有STL库，你可以把它当作是精简后的C++。

资料:[Arduino常用库函数和速学参考](https://sdutvincirobot.feishu.cn/docx/HxRYd0Ixpoq1s6xyeQYcNBwun1s)

```C++

int led0 = 13;

// 初始化函数
void setup()    //运行一遍
{
  //将LED灯引脚(引脚值为13，被封装为了LED_BUTLIN)设置为输出模式
  pinMode(led0, OUTPUT);
//OUTPUT输出信号，输出让led灯亮的信号 给引脚写数据
}
 
// 循环执行函数
void loop()         //while(true)
{
  digitalWrite(led0, HIGH);   // 打开LED灯   HIGH高电平
  delay(1000);                       // 休眠1000毫秒ms
  digitalWrite(led0, LOW);    // 关闭LED灯
  delay(1000);                       // 休眠1000毫秒ms
}
```
```C++
int main()
{
    
    
    
    while(true)
    {
        
    }
}
```
```C++
int main()
{
    setup();
    
    while(true)
    {
        loop();
    }
}
```

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGVhOGNiMDIwMjJiMGYxNDNkOTM4ZmYyZDE3ZmJlNDlfTER4amxJajVVMjA3eUoydFVJRXJhczZ1bzRialpkclZfVG9rZW46RmpMWGJmZXNNb091b014QWpWQmNsc01ybmtIXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzA0NjU5NDA1YWNlZTUzZGVjZjhiMzJjMmY1MzM2ZDlfdDZOMkhCT1o3VHh1aDN0VEZCbUZPa2NtZm9lemdVQ2tfVG9rZW46U3VzRmJzVzc1b0NGUGV4OTdIemNSTGw2blFnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWQzYjcwYzdmNGNlZmUwYTYzZmQ1ZjQyNDNjNjE5OGNfaXZYa0diQzJnRkg5Y0txS2FXSzlWM0k3MkVVUE9QVGJfVG9rZW46Rjg4T2JwZjUyb2hNaDV4bFc1UWNkY0cxbkdaXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

I/O口初始化函数pinMode()

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2ZhMmYwMmVhZmM1ZTIxOTQ3MzhkM2ZiMTViODUzZmZfNTA5NnltR0dTWTZDbmVYc3RMYkY5aDVyeHFPcEJzZ1lfVG9rZW46VDlmbmIzNzdFbzlxRFd4WlVvSWM5TjNIbjBiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

I/O输出函数

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTIxMTAwZmI3MGM4Njg1MjU1YzYwNTk1MDM2OWUzMDZfbFJLRnZ3STBWaVhYVTZQYXF3NnUzMGhEQ213WXhtSnlfVG9rZW46THc3TGJ4N1dXb29YQk54WmVCNWNEMUt4bkhjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

I/O输入函数

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzhmNDlhZDMwZWRjMTdlODRkNTU0MWY0MDNiNTA2YmRfS2JnY3g4SmVMSjhJcHpMZmxlZTZmWkRHVHVZeHoxTFRfVG9rZW46WE5Pb2I3WG1tb2VxNkt4anZmY2N5djBPbmVjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  ## 最简单的电机驱动板使用讲解
    

**L298N电机驱动板介绍**

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGViZjQ4YTJiYzhjMjVkOTQyYzM4NDEyY2QxZWI3MzBfZHZqMUJlS2hpTDRKRVo1RDVqZlpJZkFBRGUzTjVVZFBfVG9rZW46UGh2V2JZWlZlb3JJMXB4dHdWemM4cFdObktnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjA3ZjZjYWI0NGM0YmE3YTRjODg0OTg3MWE2MDc0N2ZfaFN4YUw2dDM1VlVvMHJ2azB1UW5YWkpnWElyRkE2VllfVG9rZW46V0xoUWIxNEhlb3lJcVF4NVNSSGNRdDBUblpiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGQxM2U1ZDVmYWQwN2VhNGFjZjZkODgyMjBhNjlkYzlfd1JnUU5sUjJXSUdaeXNOVWtuNkxjZDVMMHNER2hUSEFfVG9rZW46V2FicWJnSkNVbzVJWGl4cHlzOWNZNktUbmdiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

  

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTQ4OTNhNTRjZDYzYjdmYjljNjQ1YmNiNTQ3NjAxZDFfajZyUFd0dm53UjRYVzVpaFhvTzdUdWdLUlBWS0ZQYlhfVG9rZW46RWpGNGJ2a09xb1Bhemd4SFR0VGNmVk80bkZmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2E2MzZiOWQ4YWM1ZTE2MDIxYThlZGE0Y2MzZWVjZTFfMXJHT2lnVG1xUWVKU2FwaDJQU2t3RFY2WGRnanNGaUNfVG9rZW46VmlEbmJzNmxsb0tNYjh4T0xwamNFUUNwbjZJXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzY1NGE3Y2YwZGIwMjM2ZTIyNWNlNTkyOWJjODNlNGVfR05UNG0yUGRtRG9ucFA1RnVSV0RKZ2JXRjFnSVhZZDRfVG9rZW46VUppQ2JUVHlob0FYM3l4YU9QdGM0bXhVblZmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

***如何给******单片机******和电机驱动板L298N供电呢？***

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Yzc3NDM5ZDBjNDVhYzM1NTk1NmY3OTdiNGIzMDJlYjlfMnQydmsxbkwzczREMXpnb0oxcVZWYmhjaUUzSURvdEFfVG9rZW46TFVRRWJaUnZRb1ZqTXN4ZkZ2bmN0VHU1blplXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Njg2NjllNDU3NTlhZTE4OWI0NmY0OTBlNmE5ZDEwMmRfeHBUaGkwaHZ2eEtCRFJIZ3VZbkpZMHdSZHVSQURBTDJfVG9rZW46V2tOSGJoQjA3bzUzUm14QVhjSmNUMk5ibnlmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWM2MDMwZDU1ZDlhYWJjZjZmNDNhNzZlMDQzYmRkNTNfTHZaS2V0YUdYYjF6aFlKdzF0bDMwWk9nRXJhQ09menZfVG9rZW46QlFUNmI4T1FXbzR3Vmp4QnFJVWNmdTZObmRkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTNkOTgxMTQ0OThkYjYxNGY4NDk3MWEzOTViMzIyMzdfcDF6WVo0U2ozUlh2OVVZOTMxOWtFeXBGZmJOUGwzYWtfVG9rZW46V2hzQmJHQk5ub2kxNDh4c1p4TWNQWFF5bkJkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  # 51单片机(了解即可)
    

以STC89C52为例子

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzZjYmM3NWU4NWZmMmEwYTk0OGY3NzAxOGNkNzVhYWNfWG53ekVTaXlZckRVNHRwUmVoakQ2WEZWUFA2UXdRbUFfVG9rZW46SkJzeGJLTGNpbzlpeEl4VlUwa2NHQUVwbnJnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Yzc1YmU2NDNmY2M3ZTk3YTMwNmZkM2IxMTFkNTBjMzJfbDAxSERiRlI3Vzg4QjlHZ1NCTlZxQVh0YVNSSHBOY1ZfVG9rZW46R3lxbmJPc1hsb0F5bkJ4eDBZbGNocDhZbmhoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

点一个亮灯

```C++
#include "reg51.h"
 
void main ()
{
        P2 = 0xFE;// 等同于  P2 = 0b   1111 1110;
        
        
        while (true)
        {
            
        }
}
 
```

延时函数定义

```C++
//固定延时函数
void Delay500ms()                //@12.000MHz
{
        unsigned char i, j, k;
 
        _nop_();
        i = 4;
        j = 205;
        k = 187;
        do
        {
                do
                {
                        while (--k);
                } while (--j);
        } while (--i);
}
```

让灯闪烁

```C++

#include "reg51.h"
void Delay500ms()                //@12.000MHz
{
        unsigned char i, j, k;
 
        _nop_();
        i = 4;
        j = 205;
        k = 187;
        do
        {
                do
                {
                        while (--k);
                } while (--j);
        } while (--i);
}
 
 
void main ()
{



        while (1)
        {
                P2 = 0xFE;
                Delay500ms();
                P2 = 0xFF;
                Delay500ms();
        }
}
 

```

4.  # stm32单片机(重点)
    

1.  ## 单片机介绍
    

### ①什么是单片机?

单片机又称[单片微控制器](https://baike.baidu.com/item/%E5%8D%95%E7%89%87%E5%BE%AE%E6%8E%A7%E5%88%B6%E5%99%A8/2790468?fromModule=lemma_inlink)，它不是完成某一个逻辑功能的[芯片](https://baike.baidu.com/item/%E8%8A%AF%E7%89%87/32249?fromModule=lemma_inlink)，而是把一个计算机系统集成到一个芯片上。相当于一个微型的计算机，和计算机相比，单片机只缺少了I/O设备。概括的讲：一块芯片就成了一台计算机。它的体积小、质量轻、价格便宜、为学习、应用和开发提供了便利条件。同时，学习使用单片机也是了解[计算机原理](https://baike.baidu.com/item/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%8E%9F%E7%90%86/1221312?fromModule=lemma_inlink)与结构的最佳选择。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTYyMmU0ZTJmYjM1ZDlmNjA1OTI5OGRhZGE3OGUxYjZfSjJSb0duU3VDemhhMjJTMjNhcVZRdW9TUlVISG14ZUtfVG9rZW46TXZXaGJ2Qlpvb2pXb3F4N21GNGNQMTRnbmxDXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

### ②单片机的应用?

1.  物联网(※)
    
2.  医用设备
    
3.  工业控制
    
4.  计算机网络通信(※)
    
5.  ... ...
    

  

### ③stm32单片机组成部分

1.  CPU（中央处理器）
    
    1.  芯片框图
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmUwMzdiMzdkMjFmZjFmNjBjZmYxMjdlYjZmZjY2MmFfQWhjbmY5YWJQTW1obEw1dldycnBNWE05b1hVUzE4eThfVG9rZW46VERZWmI2T1JLbzYyQkh4dmVEZWNqcjZRblZnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    3.  处理器内核（内核这个东西了解一下，以后要根据内核的架构和操作系统来判断下什么版本的软件)
        
        1.  介绍与作用 : CPU所有的计算、接收/存储命令、处理数据全部由内核执行。
            
        2.  指令集分类 : ARM架构、X86架构、LoongArch架构，RISC-V架构
            
            1.  ARM架构指令集
                
                1.  应用:广泛应用于移动行业（手机、平板、工控机等）等需要很强的能耗比的场景中
                    
                2.  架构分类: ARM32、AArch64（ARM64）等
                    
                3.  内核分类：ARM Cortex-X(手机) 、ARM Cortex-A（手机） 、 ARM Cortex-R（嵌入式） 、 ARM Cortex-M（嵌入式）
                    
                4.  了解CPU Soc和CPU内核的区别
                    
                
                        小米玄戒o1，华为麒麟9000，意法半导体STM32F407VET6这三个芯片都是基于ARM架构。他们的CPU的核心的前端设计都是由英国ARM公司设计好的，ARM的内核决定了这个CPU的性能，总线，浮点运算器等等。
                
                        而小米，华为，意法半导体只对CPU核心进行后端设计，对CPU性能等影响不会太大，**CPU绝大部分特征都是由ARM的前端设计决定的**。
                
                        **所以，我们在使用F407IG，F407VE的时候，因为他们的CPU内核都是Cortex-M4,所以CPU特征都一样，所以代码也几乎都一样的。**
                
                ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzE5ZGU3MGE4NTJkYzNiMzI1YjYwNjcyMGYxODgzNjlfYjFpUXFkRzBReEpXdjNnR1FkQ0lPbkY4V285c0NPMGNfVG9rZW46TzJTSWJGZlVIbzV6a294N1JwTWNjMXc5blZoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjcyM2M4YzJiNjAwOWQyNDc5NDdhMjU4NTZiM2ViNjRfd25DbGhNNEpxNTY4MjJnQ1ZDSkhqQzQ3Qjg3cGN0ZGtfVG9rZW46VXM1QWJhMHM3b3pMT1V4TTR3aWNMcmdEbk1lXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
                
                  
                
                  
                
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDE0Njc0OWRlMTg3MTQ2MjQxMGEzZmEyYTk2MzExYjhfaWxxY3FsajgwcXNyMGhXRmdIazl0a214RVloTUFWWjhfVG9rZW46VnJEMWJocTFob1RZekJ4dmR1S2N2MVhSbnFnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Yzk2ZTczYWY2MmZlMzg0MTNlYmY1NDg5NjNmYzVhMDhfelduOFk1S2F2UFNtRnJyZ3lkSVpBWjE1ZW5vQ09kZ1JfVG9rZW46TEZHcmI4OEZGb0x2a1R4NmpycGNPZnVrblpkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
              
            
              
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDlmYTdmYTQyMDE2ZWZjNzU4M2RlYjYwZjg1MzczY2ZfSExOU3RqNjBXdHdxTFdVNnpydFdSUE1TTXk5bWljcWhfVG9rZW46RjRSZWJlRHNFb1lYd2Z4REd1TmNXTm84bnFkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGU0ODg2MGM4Zjc4ZmM3ZGNmMzA1MzE1YjVhMGRlMjBfTnlGcmxCbktMMFBZdzFPQ2pKWXdiTjRCZVMySmdQWVVfVG9rZW46RDgwOGI2cXBrbzZia3B4NGtZdmM4THU5bmhmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
              
            
              
            
            10.  X86架构指令集
                
                1.  应用：广泛应用于电脑、软路由、工控机等需要高性能计算的场景中
                    
                2.  分类：X86、AMD64(X86\_64)
                    
            11.  LoongArch架构
                
                1.  应用：政府单位采购、军工采购、个人电脑等
                    
                2.  分类：龙架构32位、龙架构64位
                    
            12.  RISC-V架构
                
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWE3ZmU1OTMxZjliZjdjYTY4N2VkNTQwMjc5MmViMzBfb3h3SWpHWHdvTVlQUGdGN0x5MDN6V2Z6Unk5WTE0UlZfVG9rZW46WkZyTWJ2QXNMb2ZLYlJ4YWk5Y2NpOFhLblJlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTZlZjFiNWRlNTRhOGM1MWFiNWY4NDYyNmE4NTk4ZjdfQzlzc090STlEWUFOVk9lVTZZNWVOazNGN1lKU1NGU3pfVG9rZW46Vzk3Q2JFTmlqb0FkdUt4WTZZVWM0YnhYbk9MXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    5.  GPIO(通用输入/输出端口General-Purpose IO ports)
        
        1.  定义：CPU与外部进行信息交换的端口（Input输入、Output输出）
            
        2.  理解：CPU上的“金手指”（注意和电路板PCB上的引脚区分）
            
        3.  所在位置：通常把CPU焊在电路板PCB上，一般地，GPIO端口在电路板上经过某些电路最终被引出来成为电路板引脚
            
        4.  数量：STM32F407系列具有上百GPIO端口，由于数量过多，将其分为7个组(A,B,C... ...)，每组共16个IO口(0,1,2,3...15)
            
        5.  命名：P+GPIO组+IO口号（比如PA2,PB6等）
            
        6.  应用
            
            1.  普通输出IO口：输出高电平，或低电平
                
            2.  普通输入IO口：读取外部高低电平
                
            3.  复用IO口：可变为通信IO口与电脑、电机、蓝牙模块等通信（定时器PWM、串口UART、CAN通信、SWD调试通信、晶振IO口）
                
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDA4MjdmMTRhNTI0MDllZWIzZWFkYzEwM2MwZDBjZjBfdDE1c2pSMWNyZW5vYkdxNGNMa0tLM2ZaQmdGZzdmZ2hfVG9rZW46UDlXUmJrVDlKb2x4bDd4N2ptd2NKTW9vbjljXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            ###       ④原理图
            
            6.  介绍：[顾名思义](https://baike.baidu.com/item/%E9%A1%BE%E5%90%8D%E6%80%9D%E4%B9%89/1481950?fromModule=lemma_inlink)就是表示[电路板](https://baike.baidu.com/item/%E7%94%B5%E8%B7%AF%E6%9D%BF/10106124?fromModule=lemma_inlink)上各[器件](https://baike.baidu.com/item/%E5%99%A8%E4%BB%B6/8755458?fromModule=lemma_inlink)之间[连接](https://baike.baidu.com/item/%E8%BF%9E%E6%8E%A5/70199?fromModule=lemma_inlink)原理的[图表](https://baike.baidu.com/item/%E5%9B%BE%E8%A1%A8/1252386?fromModule=lemma_inlink)。（各元件在原理图中是用整体形式来表示，进行二次接线的图）
                
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTBkNDk5YzQ2MzZkZTcwMWE1YzdkMDlmOWYzYTNlMTJfYkhzdzNnOGllUEVMejZmU2R2REwxaGQzazN4NThxTHdfVG9rZW46T21ITGJWbmFWb2NjcTh4dUM2dWNQMWFobmxkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmIxOGVmNzQ0MTFiMTFmZWE3ZGY2YjllOGJkNTlkMDFfSXhVY1BmMWlZTTc2RUdPamVMUTQ2U0xOTUlBOTRlZTJfVG9rZW46WnR0UGJFWnd1b1JRVjJ4SENVbWNqOUFybnBoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            9.  组成部分：
                
                1.  元器件（包括元器件端口）
                    
                2.  导线
                    
                3.  网络标号
                    
                4.  电源符号
                    
                5.  等... ...
                    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDYzYjAzZjkyYTI1NDRlYmMzMGVkNDdlOTQ2OGIxMTNfTVN1M0J4WDNvT0dMb24wNVIxZUdmS0ZEMzVOM0tSM21fVG9rZW46QkJNTmJtRXMwb3hSUmF4T1EzcGNlc1FGbm9jXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDVlNDYwOTgwYTk1ZjdhYjAxZjZjNzU2MjU4Y2I3MmFfalZheFlVYlJhWmRJU1BkM2Zma0x0RFF4WDVMRnVaNTBfVG9rZW46Vm80MWJZVmIzb1lwV2p4MVFTR2M4bnhEbkFkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDg3ZTk3MGI2NmIyMWUzMmQ4YzllZDJlYmI5Y2ZhZmJfYVl2ejR0aVRmSkdreGhZc1VBMzZTU3R3SWhpUzBPc3NfVG9rZW46QzgxRGI5R1lsb015STN4WWZ5c2MwTkpibmRnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjYzNGY2NTlkMzZiMGViNDUwYmJhYzU4NzQxZGRlYjFfazhYcUdGclZxcUw3RklYeUJxdUhhc0U5dGNFR09yMndfVG9rZW46TGpPTGI0YkRDb1Q1aVZ4bUNUZWNSdFNMbldkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmMyOTUwMjQ4YzEzZGU3NWY1MTM4MjBjYmE0ODRjODlfa01hRVRyZkU3MkJrRTZxZmVNWTc3aUNhbWpMZ0dFUXFfVG9rZW46VEJsd2IwNUJhb3FEY2V4MnRoYmN0Q29SbjhnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NWYyMTA4NjMwYTI3ZWZlMWExYzA4NjQ0MmUwMmY3YzRfVERiT2FBQVVkM2RTYWJDY1cwTXI4d0FGY1U5ZktrelNfVG9rZW46TVl4cGJwbGx3b1VreFV4dEFiYmNKMXFJbndmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTBhNzU0N2NmNjJkYjc2Zjk5ZGI3YTQ1YWZkM2NkMWZfbUNGTTRSaXlEN2Npak5GZm9pYVZDc2N5Y01PaXdnRE5fVG9rZW46R01OeGJRZFF4b0hhTW54a3NsVGNrYm15bnRmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjUxM2FjOWYwZDk4N2JmZDhlZTA1ZmIxNDFmZDIzMzJfc2o4SUd0RWtvalZXbTNKZHA2R3ltWG1iOUJjbXVkYzhfVG9rZW46TWk3cGJxWHJOb3Vqc0x4Wkl3Z2NSTTc3bmxnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

### ⑤芯片手册

1.  作用：查询各种芯片信息（比如CPU频率，IO定义，时钟树等等）
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjg2MDhiMmNlODk3NTA3ZmNjMjg3YzlmOThiYjI0MDJfeUsxdGZUVDh2Z1pocUU5UlVQQTk0TjRMeVZOMDBQYUpfVG9rZW46QVh2YWJGcmU4bzZkYlJ4R2hHY2N5amJSbnVVXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YThhMDdlY2I4MzE3MWNmODFiOGI1OWNjMTFmNWQ0OThfTzhxM1NRelRnWDZETUx2eVM0bWJPRmV3SlNteVgzc3JfVG9rZW46WEN1OGJGSXA1b0hKMjR4RmpzNmNPak1YbnZoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzhmMmE2MjhmM2JkYzE4NDhhODg0MTk0YTUzMTg4MTNfa2daZ0ZjMXVvQlJjQWVTbFdCU1l6bWtYTHhramFBRlhfVG9rZW46WGlXaWJKbmRab0F4czl4YU1nUWN1d0VTbklkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTkzYWY5ZTNmNDQ0MTJmNDc4MTg5NjYzZjJhODY2ZjJfNlQ4M3FmbG1oOFBEd3ZBZFpLZWlBZ0NsNDE0MW1qZzBfVG9rZW46UllQSmJ0M3lOb0VCQ214Wjh1bWNSQnF1bnVoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  ## 软件介绍
    

1.  STM32库
    
    1.  各种开发方式：寄存器，标准库，HAL库，LL库
        
        1.  寄存器功能简单了解：寄存器就是一个离CPU内核更近的存储结构，所以与CPU内核交换数据比内存（RAM）更快，每个寄存器都有不同的功能，在寄存器里存不同的值，CPU读取后都会实现对应的不同功能。
            
        2.  库：库是源文件+头文件。stm32的库是由汇编语言、C语言混合编译而成（HAL库、LL库兼容C++）。现有标准库、HAL库、LL库（标准库已淘汰，咱们实验室使用HAL库和LL库）
            
        3.  各种开发方式的优缺点：
            
            1.  寄存器：这种开发方式硬件执行效率高，但由于STM32寄存器过于多，用寄存器写可读性差，且麻烦繁琐，故不建议全用寄存器写，在某些场合下可以偶尔使用。（比如在流水灯可直接对寄存器进行移位操作、在调PWM占空比时可直接对CCR寄存器进行赋值等）
                
            2.  标准库：太老了，现在已经淘汰，该库使用汇编+C语言进行开发，代码可读性很高，但是由于初期对标准库设计有些问题以及一些专利上的问题，导致会出一些问题（比如IIC通信），且时钟配置过于麻烦繁琐，所以咱们于2021级开始就不再使用标准库。
                
            3.  HAL库、LL库（力推）：ARM公司与ST意法半导体力推的库，符合ARM CMSIS标准，该标准是当今嵌入式开发者都需要遵循的一个标准。该库由汇编语言+C语言进行开发，且兼容C++（头文件中有extern "C"条件编译），使用C++的OOP（面向对象）进行开发要方便一万倍。HAL库和LL库仍然被ST公司维护中，其解决掉了标准库的各种确定，比如硬件IIC无法正常使用，时钟配置及其容易。ARM CMSIS标准介绍:https://www.arm.com/technologies/cmsis
                
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODQ5MGU5OWZkZmJhNGUyYjJiMDY1NTFmZmRjYmJkODRfazdVZFpTMld6bVNENG1OWFI2YUkzcXRtdmxZMHhWVzBfVG9rZW46WVhQWmJLcEF1bzlCSnV4QUczSGNVTjBKblZnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTlkMGI3YjU3YTRjMDM2NzZkOWZmNjMyY2MyNWNkYmRfSzdTMXlVNUJsTlIwSDJCZjJkZThDNHJ3aW1TTVRuSGpfVG9rZW46Qkp6WWJHTHpVb3VYb2N4RHhaTmNFdlFpbmdlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmNmMzYwNWEzMjE3N2JmZjUxMzg5YmFkNzdmODY0ODRfU0Rxb3NXUUlneXlqc1dTc2ZSUllsd05NOThpS2hLenJfVG9rZW46SFVYeWJvUkg1b2NFamh4U0xqUWNaTTl6bnhnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzE3OGUxNjNiZjZmZjBmYzJmZThkZGNiZDJiODFkOGJfN1A3VHY0OEpNNVV6T3RTSDJXQmJPaWd3NE5MQjd6aklfVG9rZW46VFFkR2JhdHg5bzVacGp4eXI0bGNiODVtbmZnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=M2U1NDhkOTEzNDU0YTk1YTVlMzI1ODdiZjBlYTllYzdfVlJiQ0Z3dDVPN3NacjJDNVVMU2Y0WHpOcEJ1MHpGOExfVG9rZW46RENnMGJyVDMzb3hIQnl4YzhXc2NObmcwbkZkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzViMjY0YzIwOTU4ZDI3Y2JmYzQ3ZjNmMjFjZTUwMjlfYXV3cFRQY0F6cE5Jd1AwV1laMEZTeHBrV3Rob0RwZG5fVG9rZW46Wk5vS2JYaW5Mb1BVZnZ4ZmZBSGNsYW9ybndjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  开发软件介绍：
    
    1.  搭建环境教程:[STM32 Windows开发环境软件安装教程](https://sdutvincirobot.feishu.cn/wiki/FQszwXIR5iQgCfk7pRwc9rYpnqg)
        
    2.  ARM Keil MDK
        
        1.  介绍：可进行开发各种基于ARM Cortex系列内核开发的CPU的单片机（比如stm32），也可以开发其他类型单片机（例如51单片机）
            
        2.  作用：进行单片机的代码编辑(edit)、编译(compile)、构建(build)以及下载(download)与调试(debug)。
            
        3.  版本选择：
            
            1.  MDK 5.3及以上：建议使用，但需要自己装ARMCC编译器。其只能在Windows平台进行开发，且图形界面过于丑陋，且没有黑暗模式，夜晚开发及其辣眼，但由于其使用ARMCC和ARMCLANG编译器，比ARM-GCC编译器生成的量要小很多，且因为其对ARM Cortex内核兼容性极好，所以仍选择用MDK 5.3版本。
                
            2.  MDK 6及以上：详见下方的VScode
                
            3.  折中方案(Keil MDK5 + VScode +Keil Assistant): 详见下方的VScode
                
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmJkZWE5NmZkZTBiZWM2NjE5ZjMyYzZiMzk5NGRhNDdfZ2RDQURQRzVFQ3c1RXJTYjJ5VVUxYUV4Sm1NTjdJZDBfVG9rZW46REoyYWJLSWI1bzBjM2R4UlJIRWNHV0dFbk5iXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTEyOTY0M2VhMTVlMDNiZmVkYmYwODNjNjk5NWE1NjhfODc5SjlxM3JNN2RxSm1hdmwyVUh1VHNVaUxzNEFoNk1fVG9rZW46T1VoM2JqdE1Pb3ZYdmZ4MTZKdWNOd3pCbjJRXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
    3.  STM32 CubeMX
        
        1.  介绍：用图形界面生成STM32 HAL库部分驱动层代码的软件，由ST公司开发，仅支持STM32系列单片机。
            
        2.  作用：后期开发使用，进行STM32单片机的驱动层的基本配置（比如时钟树、GPIO、各种外设通信、中断、嵌入式实时操作系统等的配置），**前期新手禁止使用STM32 CubeMX这款软件****，不然就和没学一样。****前期新手只可以用该软件生成时钟函数****，其他的一切操作概不允许，可以了解一下，但不准作为主力开发工具。** （大概熟练掌握CAN通信，DMA等就可以使用该软件了）
            
    4.  STM32 CubeIDE（选用，没有需求就不要去使用）
        
        1.  介绍：跨平台的STM32单片机开发平台，仅支持STM32系列单片机，且只能用ARM-GCC编译器(该编译器远远比不上MDK5和MDK6上的ARM-Clang编译器，甚至部分性能也比不上ARM-CC编译器)
            
    5.  VScode
        
        1.  介绍：由微软开发的，开源的，世界第一的万能编辑器
            
        2.  作用：只是个编辑器（类似记事本），不自带编译器（比如GCC、MSVC，ARMCC(AC5)，ARMCLANG(AC6)，ARM-GCC），需要自己配置环境才能够正常开发C/C++，CMake，Python，ROS2，单片机等。
            
        3.  优点：①图形界面非常优美，②可跨平台，在Windows，Linux，MacOS上均能使用，③有非常多好用的插件。
            
        4.  缺点：①VSCode是使用Electron开发的，约等于塞了一个Google Chromium浏览器内核，非常占内存。②且环境难配置，但是这是必须要学的。
            
        5.  插件：
            
            1.  Keil Studio Pack(Keil MDK 6，截止2024年1月2日，推荐熟练使用keil5后再使用) MDK6已经基本完善了，可以使用，但是不建议使用。MDK6学习成本比较高，对新手不友好，且MDK5还在更新维护，所以建议使用MDK5.3及以上。但MDK 6基于MS VScode编辑器开发，实现了跨平台，可在Windows，Linux，MacOS上进行开发，且界面非常优美，所以未来可期。[ARM Keil MDK6使用教程](https://sdutvincirobot.feishu.cn/docx/SJ9FdnLXwoR3cTx93eOc4lZfnzh)
                
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDM0NGY2NTkwNjIwMzhkZDMwM2U1MzNiMjVkMjYzMzVfNFNvZU5PNHZEdE01bUQwVUxyR2dnMHVGaUJmcUpJOURfVG9rZW46WjF1dmJuVjBBb3Jockx4TVlXaWNzcFZjbkpoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            3.  Keil Assistant（后期开发建议使用，可以代替Keil MDK 5.3 完成代码编译(edit)，但是编译，构建，下载，调试仍然建议在Keil MDK 5.3 上使用）在Windows上用MDK5软件配合Vscode的keil assistant插件进行开发。【VS Code开发stm32和51单片机的教程，vscode代替Keil-哔哩哔哩】 https://www.bilibili.com/video/BV18e4y1H7xX
                
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGU1ZjQ3YzQ4MzZkZjIwYTg5OGY2MWVlNDVkZGJhYTBfNnl2ZXp5STRZdjE0UkU2dVhPSjdqQ2hIN2k1dHNYNHlfVG9rZW46QkZjemJOMmZSb3M4NjV4Mkg4MGNIWUpTbjhkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            

3.  ## 时钟树
    

### ①使用CubeMX配置时钟的步骤

1.  时钟配置介绍：这是每一个工程都需要做的事情，给予CPU正常的心跳。
    
2.  作用：给予CPU正常的心跳，并且给予各个外设的心跳，让CPU和其各个外设正常工作。（比如延时函数的准确度，定时器PWM波形的准确度）
    
3.  STM32F1系列CPU时钟框图：
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTYxYmNmYzI2OTJiZDU1NDE5YTJkZjlmYTM5YjExZDlfeGE3cWhkTTVNbVZTaWt3TXpHMFBRT0RZbFByMTNWYzBfVG9rZW46UzNaRWJSU1Q4b3NzdDF4dlZsMWNNYkFMbmplXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

4.  配置需要注意的事项：
    
    1.  注意电路板上HSE的真实晶振频率，填高了会导致超频，会出现比较严重的问题
        
    2.  配置时建议用CubeMX配置时钟函数，然后复制到正点原子模板工程中（因为手撸时钟函数太难了）
        
    3.  CubeMX参考文档：[大疆开发板C型嵌入式软件教程文档.pdf](https://sdutvincirobot.feishu.cn/file/VTXjbEQQTohL3lxITmUcZokbnke)
        
5.  配置步骤（这里只点出几个要注意的点，详细步骤请看大疆C板开发文档）：
    
    1.  打开大疆C板开发文档
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2I5NWVkYzZiM2MyMzIxZTM1MjJlMzhmOWQ1NmE5MzRfNmlOMkJMazRYS2FjQnJTcXpiU25Udkk5NllDWGFPRGJfVG9rZW46R0Z4YWJSdnFmb2lFcmt4TUV1aGM4VjJybnllXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
    2.  找到目录，点击0.4.2
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2IxMDYzYWI1MzdlMGFhZTYyMzE4YWFhNTgzMzRhYWZfRXh3Nlk2THIzTVVmdDk5R1BOVWxyeURiTDRWbTkxa01fVG9rZW46UkFSOWJCblRmbzRTM3N4cE9iTWNSeUJCbmhnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    4.  按照0.4.2的步骤开始操作（每一步必须都得做，特别是Debug选Serial Wire，不选的话该工程代码会让板子假变砖）
        
        1.  需要注意板子型号，大疆板子是stm32f407igh6，咱们需要根据咱们实际的板子型号进行选择
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGEyMjA1ZTQ0OTI5YTFjNWM3ODJmZmIwZDM2M2YwZmJfZmhjWnF0Q1FnTHJXV2o0NjByT2xTWlJyeExvdXNSUWpfVG9rZW46QVNvVWJWUkFFb1h0RDR4Z0ZvamNudHZNbjdlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        3.  配置时钟树时，需要注意HSE的时钟频率，按照实际原理图上的HSE频率来配置
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzI2NzkxOTEwOTFjMmI2NTgwODNmOTI0NDkwYmI2ZThfOWNMT1NqVGtTZVlpcDluNVlrREpMbFE2Y2ZpU1FRUExfVG9rZW46WUI3VGJRN3VEb01nOUN4U0FGVWNYb2tlbmRkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTVhZDdkYjZhN2E1YjMzMTBiNzJiYjgxNmIwZTE2YTFfYVdrTjJLT0ZVaGZSSWRVREFnenFkZERhQ0pHMTBRRm9fVG9rZW46Q2VudmJUODEybzQwZHR4UTVraWM2dVBHbnpmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        6.  代码路径必须全是英文，并且不能有连续两个空格，建议直接不要空格，单词之间用下划线（不可以放在桌面上）
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzY2NDg0NzUxNzcyMTg4YTNmM2FmNDBiNzVhZDhjNTJfYjFWUWw0T2xGZENiWTNBSmo2VlhwTWFwNlhmUTVCdHpfVG9rZW46TU1yQmJpUjR5b1V0MzJ4S0tudGMzME90bldmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        8.  解释
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmUyMmFkNWRjMDViZTFhZjBlZjQwOWFkYzA2ZGE5MzBfbm5HYjh3Vkx2OExBbWxQdm1jMFAzRnFTV3BiMzdiVnRfVG9rZW46SEFZU2JBR1hIb3o0dER4alVKamMxaE03blZkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjU3MDczOTFhYjY4ZDExOGVmZTIzNTQ2N2YxMjM2OGVfNTZha3FsUGt0ZUdCWjdMeDhSYWJIVjhWakpoMjcwOU5fVG9rZW46SWhZOGJyTlhvb0Q5djl4aUM2emM0STBnbkFnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
    5.  打开CubeMX生成的MDK 5工程
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTE2NjA2MDRhNjk3YjVmMTRkZmQ5YzM2MDNjYmM1OTdfa0llSXVlbHFGZFoxcUdMRGs2eUpLRms1a01uMnhVRFpfVG9rZW46RUJIeGJVMHpWb0k1Nm94N21scWM0Z1V1bmRkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    7.  再复制一个并打开正点原子的模板工程
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NWI0NWMzYmMxYmFjMzI0MDM3M2Y5OTZlNTg5YmEyNWRfMktOc1VXVkF3bzNpcnRXYWlrZzBDeE9EQW1TakR3UG9fVG9rZW46RnlSRmJWaWRvb0pNSzB4YlNPNWN0dExsblZlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTdkYjQzNWQ5ODQ0ZTBiMzQ3ZmMxMTAyMDJmMzcyNWNfVWY2aDdvUVNrazhuckJPcFE2Q2NLSEpZa2hpMTMyUmdfVG9rZW46Tlc5TmJLUEIxb05tVXN4alJONmNmZW8wbmxiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    10.  在CubeMX HAL库工程中的main.c中找到时钟函数void SystemClock\_Config(void)的定义
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWY1NWJmNGNkODY4NjkyOTVlMTAyMmVkZTc3MDVmMTBfSXhLQ3E5enJJNExZRXN4NWJuOTdDWGVpcFAwNWlVaDNfVG9rZW46TlpoTWJremVxb1JHNGZ4bnA4a2Nyb054bjFnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    12.  复制整个void SystemClock\_Config(void)函数的定义
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmNhNzMwMTc3YjkxYzBjNjQzMzE5YjViNmMwZmE5YmVfMTdZREVMbEEwNkplQWtJdjRpUVJLRzlOa2VQcGZMZjBfVG9rZW46VW43RmIyUjlEb0lZRTZ4YnFhM2NETHF0blRjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    14.  然后打开正点原子的工程，在main函数中找到sys\_stm32\_clock\_init(RCC\_PLL\_MUL9)函数，右键该函数，并go to definition of "sys\_stm32\_clock\_init"找到这个函数的定义。
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTkyYzMwMDI4ZWU5YjI2MGUwOGY1ZmU1ZjE5MTJkOGNfaXZWNXRPdEIxV0N4YnpxYTdVOHBidTRBbUs3VVI0QmpfVG9rZW46THZHbGJEN1FUb2s4b054dkhUTmNhd21CbmZlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        3.  如果弹出下方的问题，请按照这个框框中的提示来解决，说的很明白。（如果看不懂英语，就去百度搜，锻炼下搜索能力）
            
              
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjJmYTcyZmNjMjFiNGNlMmY3NWMyNjNjZGRjYjg0Y2JfbFVFaU1ZTTNoNXpZNFkydnAzQXdGeEU3RmMwa0thaUNfVG9rZW46R2Q0MWJsWVJIb1E1SkF4Y25FYWNIQnhqbmRiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
    15.  go to definition of "sys\_stm32\_clock\_init"完后找到这个函数的定义，删掉整个函数，并把刚才复制的CubeMX HAL库里的时钟函数复制到这里。并将Error\_Handler();直接删掉，或者替换成while(1)；
        
        1.  找到sys\_stm32\_clock\_init函数定义
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODNlYjYwYTJkMTE5MTU0ZGVlZWRmZWFhMjJiODdkYmRfbmxMN1pJMFpwc09hTHBlMzc2YWZKME54aWRTaWIwekZfVG9rZW46V0xLVmJkNGZlb09OMmd4dVdxZWNBTXhMbjhmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        3.  框选后删掉
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzIyYTEzNGUzM2MxYjBmOWMxNjM1MTA1NWRlZjJjMDVfOEl1elZ3Sk82cGs5RkkxM0p0bDFPOU5rSHpSOUR2M3hfVG9rZW46T1VCMWJncXNjb21mdVN4bHRlU2NvWkZ5bkFmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        5.  把复制的CubeMX HAL库里的时钟函数复制到这里。
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmY2NTYzM2FmYzA3ZGQ1ZDJkN2Y2ZjYyNTdkMzhlZTZfRzR5YXZxV2pNQndsVE82dDBxQnRZbWhuY0FWaElHd0FfVG9rZW46SXJjUmJuclNrb0w4bzF4R2o0amNGSHFlbjJmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        7.  用while(1)；替换掉Error\_Handler();或直接删掉。
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWQ2MTQ2NmNlYWFmMzEyNTNjOGIwYWJkMzY4ZTVkY2JfTmVGampZMG5sd0xZV2dyNkRCNlJsMWY0MVlrNDhheUJfVG9rZW46V3NBSGJuekRCb0NJeHN4SGtqNmNObkxRblRjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWIzNTE1OWI2ZGU1ZWZiMTc2YzFhMWYxYmU1YjJjNDRfQklkUGJ3OVplWGtpSVA2SndRVDRwY2YwTGdoOURobG9fVG9rZW46TFpXZmJaYkltb1FYSlF4S3BLSmNLZ3EwblFoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
    16.  找到void SystemClock\_Config(void)函数所在的源文件sys.c对应的头文件sys.h
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWNiNWRjNWQ4NTc5M2E4OWI5NDQ3YjE2NWMxOTRmMmNfeVdlVFlQTWdmZ0VTaDM2NkdyWUM2b2ZNVlNwblk2RUVfVG9rZW46WjhoV2I1cUpYb3RReXV4ZkJhZGNWZ3Jybm1kXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    18.  找到sys\_stm32\_clock\_init(uint32\_t plln)函数，删掉，替换成void SystemClock\_Config(void)的声明。
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2MzMzkyNzViY2NjZDY1NWNkMGFiYTU5NWU4MTNlMmVfWjdPWVVqdEpka3JNem54RmZpYmc0TW9hSVFZbEFwVE5fVG9rZW46SmJ6RGJ5cE9wbzlsd0F4Z2xXSmNsQTlMbnllXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjNiZTMxNTg2ZGFjOTVlYzBmN2RiOTcwYjk1MDJiMmNfUnlBUVd2Q0lDT2wzWjNZeEdXamllTkxNMkRCbTJpNkRfVG9rZW46QzV3YmJlUWdRb244VGZ4a21vdmNjanZObnVnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    21.  回到主函数，找到sys\_stm32\_clock\_init(RCC\_PLL\_MUL9);函数，删掉，并调用咱们新的时钟函数
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Mzk5NDEzMzE3N2QzMWVmZDkyOGMxNzk4MzI3OWFlZGZfZ2RxcWNvUzUxNEhIVFVOWHh5NzZQR2pSdkJsTUQ3cWJfVG9rZW46QnB1aGJoU3lPb2sySlh4c1FrZ2NhZ3VMbmpnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzY3YjRhNzRmM2JjYWI5NDk0ZjdjMDRiNDIzMTA5ZDRfTkhucG1OaVRMWTI1NE83dDdFSjhOWXVUbHNJdjF6ZVZfVG9rZW46UGJLNGJEeWd2b3J2bld4dGVDOWNtWjBMbjhjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    24.  修改HSE\_VALUE
        
        1.  随便找个地方输入HSE\_VALUE并go to definition（go to definition完毕后，就可以删掉这个自己写的HSE\_VALUE）
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmI2ZTg1MjNiMjU5Y2QxZWQ3NjNiOGExY2RmNGM3MWNfQmdVMDJ3STdnOHdBNHpmWlg2RlhSQ1gydlhSVEg0YjdfVG9rZW46RE5sdGIxcmozb1VIWDF4dkx4Y2NJMlNFbndmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        3.  修改HSE\_VALUE的值(如果是8MHz就写8000000U，如果是12MHz就写12000000U)
            
        
            通过看原理图可知，该板子为8MHz。（具体填多少，看你板子HSE的原理图，对应OSCIN和OSCOUT这俩IO口）
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWE3ZDdjMTJkNjM5OTA4OGVhMmZjZDQ1ZjE1MWM1ODBfQnhSbURVMExsbTlJVlV5WUxqdEJUUmFwR0NOdERXbHBfVG9rZW46WjM2R2JaTzBFbzhOOXJ4aDdrOWNBSnhiblVjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTIxN2I4ODE3MTk4OWIwZGFiM2I2ZDM0MGMzZGNhYjlfdUtJZ3hZNXRoZDZLRXNqaXc0NjdyaXJMckR3Q3ZSYlJfVG9rZW46Q2JtN2JHR3Fhb2NVM2h4MWpNWmM2aWVLbmFjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        7.  删掉原来用来go to definition才写的HSE\_VALUE
            
    25.  删掉多余的代码
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjk3NDYxMTRiYjUzNGYzNTY0OTZjZTI4ZWNlZjg3NTJfWGxTOWNPMjg5UVBhQ2NSdU1VYms1QWk3VTYxRWdUeHVfVG9rZW46SXBtTmIzUG95b2w0bGh4NVZ1bmN0UUx3bnBkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    27.  第9行的delay\_init的入口参数具体填什么值，先查看一下他的定义
        
        1.  查看delay\_init的定义，得知其入口参数为sysclk（系统时钟）
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=M2U0MzRiOWYwNzNmNTJhMzU5NmYwOGViYWEyOGFhMjRfY1BaNzZVUVg4THk1WGNXV2JoOVNtZVpiTWsyN0pIdVJfVG9rZW46S1V1Y2IxeFBqb3JFa3h4QWd5TGNWakhubllkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        3.  查看CubeMX的时钟树框图，得知SYSCLK的值为72MHz
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmE3Y2YzMDRiNjY5MmI2YzM2Y2M3OTYyYTUwN2U4N2JfYll5dlFPY051SnpPNXZCMUgzTm93WW9IeGNpaUtUNldfVG9rZW46UzQyemJzeHlab0k2YnZ4ZkVUV2N1S2JubkZzXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        5.  把delay\_init的值改为时钟树中的SYSCLK的值
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDZhNTJlMGY3ODEzYjM3MGI1ODcyZDNlYjk3NGFiNGVfb29SRmM1cEtLQUEydHZSeTVIZkhvMWV6TlV5YlNMZ2VfVG9rZW46Rk8wQ2JIdXczb0tFVDN4eDR4ZmNnQ3hoblJlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        7.  然后编译所有文件
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2FlNTBiZTgyNThhZWNmNjZjOTU5ZDcwYzRmN2IyZWRfOTNCUzBjUW9FMTUwbzR0T3BxMWVGWDFRU0lIWlRvMmxfVG9rZW46TncxVmJPREpub1ZLQVB4SkhBZGNNaGlUbm5vXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        9.  零错误零警告即配置成功，有错误有警告请自行百度、谷歌
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGFkNzNmNjNjYjUzNWRmNTkxMTA2NDk1Yzc0MjE1OWRfZnZpbnBwUm5CdnZHUTZEZ0xiNldlQ1djaTZ2TUxpVm1fVG9rZW46SW5pSGJMYXhCb05Bd1F4TVJ1N2M2ZU5KbmliXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        

### ②查询某个外设时钟频率的方法（拿定时器来举例子）

1.  打开tim.c
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODY0ZWVjMDhlOTc0NmNkMjE3OGQ5NjgwYTU3NjI4NTlfeDRhdTlXbDB6M1Fjd1ZkWnQxZmt0SjdpcXh2dmxMRVlfVG9rZW46VGZxOWJQejM3b296WGh4OVhUdmNRYnVMbkN6XzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  找到Msp初始化弱函数（看TIM的基句柄得知是哪个TIMx）
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDAwNDUzZjE0MzQ0OWMzZmFhNjQzNmE0NDk2OTlmY2FfU2JJazZTZWZKZGVjN0k3ZVFoUzJzdTE0TUtKNGUwVkpfVG9rZW46VVBLdWJmeDdlb00xRHB4Wk9YM2NTRkg3bktjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  查找\_\_HAL\_RCC\_XXX\_CLK\_ENABLE()的定义
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTI1YjNjNTZlYTExNTI1NTZhMDZkZTdmOThhYjMwMjBfTmlWREl1cUVZcnJER2V2cFBQbGVVdUtSejA4SERnRFZfVG9rZW46THpvN2JPb1Z4b3N1aFR4QmRtYWNONFlIbnNjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

4.  根据函数定义，可以看出TIM1挂载在APB2上
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjVjOTE1MmE5ZmFmNTIyZmNjMzhkNzk5ODBmNDVkZThfVXR2VEdiVzVqdDFqTmpLY3J6WndZbU4wamEzOXlWemFfVG9rZW46RjhlVmJydk9rb3VmNlF4RkZxZGNzbURjbldDXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

5.  查询时钟树，找APB2 Timer Clock可得TIM1的TCLK是168MHz
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjM4OTY5M2E4ZDdjMjJhMzYzOWQyMjQ4NjU2OGMxYjVfM1JYbXNMNjdVaG5TdkFzQU5FZ2pBc2p1NmhrMWpEeDdfVG9rZW46TFZXT2JZWlZ0b0RFc0Z4V0M3RmNSeGdybkdnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

6.  所以得知，TIM1的TCLK频率为168MHz
    

4.  ## stm32程序组成
    

1.  ### 基本介绍(主函数等)
    

1.  工程构成：stm32工程是由C语言和汇编语言的库组成的工程，所以有主函数，符合C/C++语言的结构。
    
2.  程序运行顺序：除了预编译等，程序从主函数开始运行，而且非常符合C/C++运行顺序，从主函数开始会逐行运行代码，然后会进入死循环。
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGNjMWVjODZjNjhlODVjMTdmODMxYmUxMWVkYTI1NzFfckV4TVdTYXYxTlIzNVEwVFpCSFpEUkhKSU5HWUF0aDVfVG9rZW46Ujh0QWJESzUyb2lsMWR4WnRiVGNWTFZmblBkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
3.  主函数内必须的组成部分：死循环\[while(true)或者for(;;)\]，因为单片机要一直运行下去，所以有个死循环。
    
4.  HAL库 与 用户自定义库
    
    1.  库：
        
        1.  .h文件声明函数
            
        2.  .c/.cpp文件定义函数
            
        3.  .c/.cpp文件调用函数
            
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzY0Njg2ZGNmY2QzYTA0NzRmZGIyNGFhMWUzMTlhYzhfUXV0VmZZRHk1T2xGU2QxMW5qeHRRQVhHV3hTdTJUbHFfVG9rZW46TExSd2JxTGU2bzlJWFN4RnpRdGNDeDBIbjJnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTg2NTM1M2E1NGJlMWVmNTNiYzZjZWQzNjNjY2ViZjhfQTBZNnB1SmJqaTZHdm9IMml3QU5ldWljTlQ1bXZBRklfVG9rZW46UFljcGI2UDh4b1R4M0d4M2ZBbmN6bjR6blNiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2RlNjZlNmVkNTFiY2ZjZGQ0ODRlMWQ5OTJmYjQwNGNfS0R6MDFFTnIxS3BWYzgzNFk1Tk5zNmdoRkRMZERLcTNfVG9rZW46UVRBNmJyaGRVb0Y2UER4YTNYQ2Nod1ZPbmdiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

1.  ### 中断服务函数的介绍
    

5.  特殊函数(中断服务函数)：中断服务函数是由汇编定义的，与芯片硬件更紧密，是由芯片中断事件所触发，并不满足常规C/C++调用顺序。
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmU3ODM0ZDI4NDc5YzZjZjJiYWE4NjhiYThlODUxOWNfUzRzSWF3NWZHRWpOSXg4WG9UMjl2YkpKZ3cwclgyMk9fVG9rZW46Q2dyWmJ5dmk0b3h2Qlp4OXVuY2M0NlFybmxjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    2.  中断服务函数的调用方式：由中断事件所触发。一旦满足某个中断事件，就立马从正在运行的地方切换到中断服务函数里开始运行，然后运行完中断服务函数后，再返回刚才运行的地方接着运行。
        
    3.  中断事件：比如说第X条线的外部中断事件、systick滴答定时器中断(普通延时函数的实现方式)、UART接收中断事件、UART发送中断事件、TIM定时器溢出更新中断、TIM定时器输入捕获中断、CAN通信发送中断事件、CAN通信接收中断事件、RTOS的PendSV中断等等。（每个事件对应的中断服务函数一般都不相同，但是也有一些中断事件会共用同一个中断服务函数）
        
    4.  中断服务函数处理过程：
        
        1.  CPU检测到有中断事件的发生
            
        2.  保护现场，将当前位置的PC地址压栈(程序计数器(Program Counter))；
            
        3.  跳转到中断服务函数，执行中断服务程序；
            
        4.  恢复现场，将栈顶的值回送给PC;
            
        5.  跳转到被中断的位置开始执行下一个指令。
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Yjg4YWE3NWVlM2YzYzMxNWFjZmFkMDc0MDI4OWI0ZDVfVnlrUUJpUXhjSG1PblFQN0U5bHl5eHlzczlEN2hIdGhfVG9rZW46RHhNdGJwbVhib1lYUFZ4NVBBaWNBOXZmbm9kXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjBkNGY3NzhjZThkNDhiMzZmZGJkMjAxOTkzZTM5OWFfbGFidVFBQ2s4MFFoOElVVUhLWkhaRkxKQnJHbGt2aVVfVG9rZW46RXp3R2JCZjJNb2FyRkd4eXpMdmN5UFZkblBlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmUyN2E5ZTFmMWJjNjlkZmI0NWVhNWY3ZTkwYzNjY2ZfWjEwaXRHNjV5TDBERERxaEVZZjRqdlVWMWRKaHlIaVpfVG9rZW46WlpDM2JIWFFSb0RsODF4WFVmS2NwSFZrbjllXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    7.  中断优先级与分组
        
        1.  优先级：抢占优先级和子优先级
            
        2.  分组0-5
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2Q5YzZmNzQ4ODVhNTJmYzk2ZjYxM2I5YTIwYzJhZmZfOXlIam9VUFFiVjRBUWdXUk5mb3lxd1lkT2FyQkpPVDlfVG9rZW46UGtsZGJuTTFib2dSQXp4VE00cGN6S2NqbmxjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        4.  更改分组(在HAL\_Init中更改)
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjY0YTNiYTAxZWVjZDg5ODI0ZDVmM2QzY2Q2ZTY3NmJfYVB4T3VDaTFBcllhdjloQXlLV0NIOUJra2Y0emh2Vk5fVG9rZW46SU5ieGJpbVpGb3Bad2J4aG96TmNJR0hXbmxnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmM3ODQ4NWRkNzU0NWM0NGY1ZjI5N2M4N2M1MDlkMWNfcDYyVDhJOXBqak1TZzNBNElzTnpqejlDcThIdlJjOHlfVG9rZW46TzhrcGJzNFo5b3NXTlN4WFVqd2NlblBubnFkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzEwNjY4ZGVlNjdhNzA5NDg5Y2JjZTFmYTEzN2UwYjJfWURJZ3lTWjlzaGtRcmlCRWI5bDhBNEMyTXZmblFheXNfVG9rZW46VTF2NWJQUnVLb1VTMHp4NjlPQWNoZDlnblpnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGZlZjI0NDJjNDk1YzhjY2Q4N2Y3NDRkMWY5NjcxYTlfbkQ3MmFmZXVHdGtTNUNyaEZKeUtRY3ZQVll1TW54N3pfVG9rZW46SFRyYWJ4T3RBb2dsNGp4NExWUmNUZkVmbjdnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        9.  中断服务函数内容：
            
            1.  先查询中断标志位，确定被触发的中断事件
                
            2.  清除对应标志位，防止中断一直被触发，好让下次中断正常运行
                
            3.  接收数据等（可选）
                
            4.  逻辑业务代码实现（可选，比如数据处理等）
                
        10.  中断服务函数的特点：
            
            1.  中断服务函数不能传入参数；
                
            2.  中断服务函数不能有返回值；
                
            3.  中断服务函数应该做到短小精悍；
                
            4.  迫不得已的情况下，不准在中断服务函数中使用延时函数，如果要使用延时，请设置好延时和中断的优先级，否则程序出卡死（除了外部中断为了软件消抖而设立的延时）
                
            5.  不要在中断服务函数中使用printf函数，会带来重入和性能问题。
                
        11.  举例：
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjUwYTBiYWVmMTRmYWQ5MTM1ZGJhN2RkZmIyODRkODhfMFBDdm9WdVBpTG9jRkZsMGtndVBFYkFnT0hhS1pvYjVfVG9rZW46Q2R0S2I4cnQxb1d0bnN4R1ZBQWNMeWh6bndlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            2.  USART1\_IRQHnadler函数
                
                1.  中文名：串口1\_中断服务函数
                    
                2.  声明定义：由汇编声明，需要用户自己去定义(如果使能了，用户还不定义，程序将会卡在汇编代码中）
                    
                3.  调用条件：由CPU中断事件调用
                    
                4.  作用：被CPU调用，并调用紧急的中断程序(中断程序也就是中断服务函数里的内容)
                    
            3.  HAL\_UART\_IRQHnadler(句柄)
                
                1.  中文名：串口\_中断**公共**服务函数(公共的意思指串口1,2,3,4,5......等所有的串口都共用这一个函数实现功能，由后面的句柄决定究竟是哪个函数被触发)
                    
                2.  声明定义：ST公司编写的HAL库声明和定义
                    
                3.  调用条件：由中断服务函数调用
                    
                4.  作用：
                    
                    1.  先查询中断标志位，确定被触发的中断事件
                        
                    2.  清除对应标志位，防止中断一直被触发，好让下次中断正常运行
                        
                    3.  接收数据等（可选）
                        
                    4.  调用中断事件对应的中断回调函数
                        
                    5.  其他操作（比如特殊的，在串口接收中断里会disable失能中断，也就是关掉中断）
                        
            4.  HAL\_UART\_RxCpltCallback(句柄)
                
                1.  中文名：串口\_中断回调函数(因为他被中断公共服务函数调用，所以句柄是由调用它的中断公共服务函数所决定)
                    
                2.  声明定义：ST公司编写的HAL库声明为弱函数，需要用户自己去定义
                    
                3.  调用条件：被中断公共服务函数调用
                    
                4.  作用：先确定是哪个句柄调用的，再进行相应的业务逻辑实现（可选，比如数据处理等）
                    
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjEzOWZjZmU1MDYyMjk2MzIwYTlmNDNkYjczNzE5OTFfbnUwQ1psSkVjUlRLSnB3Vm1vcm9IUjVmNXN3NnZXb3FfVG9rZW46TTVtWGJJUDJib21LSGh4Ymd5OGNjNEdpbm5oXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDcyN2ExOWVmNjAzMGFiY2E2YTFkZDFiNWZmYWFhNDJfMExLek9rd0JBcG5aU3k4dWt1YUZ5N0lEc3BUNTFCMHNfVG9rZW46RTZXa2JiR0VZb3N2Q0Z4SmdSaGNwOHNibjRjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDY0OGQzYjMyZTllZDdkMzZhYjMzMTBlMDg1MDM0NDRfYmk2QmlQSlhjWFJSaXhPY0pZQUdMZWt2OUppSXROODBfVG9rZW46V3plVmJ6clFWb0p4blZ4U2FRcWNRUkRkblBlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

1.  ### RTOS与ROS/ROS2简单了解
    

6.  进阶（非裸机开发，基于RTOS系统开发）
    
    1.  常见的RTOS(嵌入式实时操作系统)：FreeRTOS、Nuttx、RT-Thread、μC/OS-II、Xiaomi VelaOS
        
    2.  FreeRTOS官网：https://www.freertos.org/zh-cn-cmn-s/
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Mjk5OGVkZTU5YzQwNjY5NzA4NzI5Nzc0YmZmODk3OTZfUkhkcW04V3EwRHlRazFXYkRDcXg0VzdoV243djUweTlfVG9rZW46Wk16VmJaVzZMb3hZd1Z4dkFOc2NsbXhRbkliXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    4.  FreeRTOS简单理解：拥有多线程库特性并兼容POSIX标准的操作系统
        
    5.  多线程：系统拥有多个任务(线程)，每个任务(线程)独立并同时运行(可以理解成每个任务都是一个主函数，这些任务都是同时在执行的。具体实现方式以后再学，原理就是PendSV中断等)
        
7.  进阶(非裸机开发，基于RTOS和ROS2\_MicroROS)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzBhNmI2NWE0ZjkzMzM4MGM5Y2UwYTlhZDdhOGQ0OTNfcEVlT1NIbGpSeEMwaERIajBlNUhUa3BsTExqa2txTW9fVG9rZW46RWttVGJwTjY0b1NOTHh4aUxkemNENjVvbnBkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    2.  使用方式：ESP32使用arduino库+FreeRTOS+MicroROS并通过串口与STM32进行通信。
        
    3.  主要作用之一：可通过WIFI远程与上位机（电脑、工控机）的ROS2进行更加安全、稳定的通信，对比直接用串口通信（rosserial），要好很多(DDS分布式)。
        
    4.  MicroROS Vs ROSserial的详解链接: https://mp.weixin.qq.com/s/1lQXAA3sV-4GpXAzHiGChQ
        

5.  ## 寄存器
    

  

1.  理解：是CPU内部用来存放数据的一些小型存储区域，用来暂时存放参与运算的数据和运算结果。
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGRjZDZhZjA4ZjVmYWVmMDFjMWE2ZWVlNzc1MmQ1ZGJfRlhvcE1DeFZaWW5VcEI2a29DTUVNN0E3QklJWlRRSG9fVG9rZW46Rm0yYWJpcktyb0RvSlB4NWF3dWNOUlNJbmVlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  实现的功能：
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmUzODA1NDZiMzI1Yjg5MTQ2OWJiN2FlYWU2Y2NjNzVfbmhQRkpveHlsWXc5d01LUmlqQ1N5SUx6dXB1VGNraTNfVG9rZW46Qzd1VmJDaDNWbzU4NTR4dkw4MmN1VjVMbkpkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzQwMWQ1NDZhNDU2ZDBhNGFiYzY4MWM4YTZmN2NlODNfZFdOa0xTWnFCR2JYZXFvWno2c2Zvd1pVeUhWMGROWEFfVG9rZW46VGJhYmJ0TWZzb3F1VjF4VnhZdGM2RVNJbnVkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  寄存器如何在基于C语言的HAL库中发挥作用的呢？（应该说是 C语言HAL库实现stm32单片机控制的原理是什么？）
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWFlZTExNDdiNjZlMWYwYzNjOWYwNTBhNjU2ODU4ZThfanVIbGFhT2RRYW90QmplYThWZFlLR0JOUW12OHAwRklfVG9rZW46QVpQdmIzTGFxbzlweWZ4SUpmbWNlS2N1bm9iXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTFjMWNmODIyZGI0YzZkN2ZiN2U4ZmFhZTc5MmJjNzBfVnlOWTg2alVaTW5iQVZSWDVMVW9IRHlOalpvaDdqT1BfVG9rZW46WFJqR2JtbGhCb3RZYlh4OEVseGNXcDVqbnliXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

6.  ## Vinci机器人队标准工程格式
    

1.  ### 英语
    

必须用 **英语** ，工程文件名、函数名、变量名必须用英语！(走出中文舒适圈，最起码一些专业英语你要认识)

2.  ### 正点原子HAL库工程标准：
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGZmNjMxMzQ2NTQwN2U3N2QwMjdmODcwY2Q1MzVkZjdfU0pqMDVOTU9oVHdXRGtUeWZpT3JXZldlR1dJZWIyYndfVG9rZW46TTRoSGJBOUYwb1NVOEt4SkN5YWNiRFl0bmdmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWFkMTczNGEzYzk4MjliNjJlNjY5ZGE3NTVkOTAyOGJfb3pta2tmeGhtZ0t6b2YxMllPN0RFQ3hPQUJPRk05YnZfVG9rZW46Ukd5dGI5eXpVb1p2VnF4TnBWT2NvSFA3bnljXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  ### Vinci机器人队STM32工程标准(Cube+C语言)：
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjI2ZWU5YjRjZGEwZGMzYTJkZmM2ZDFmMDgzZmI1OTRfQmZLQW1HTGFWWk1ZeHFEOGM5TDF2ZGxYaTh1SXBpWUdfVG9rZW46WXhTQmJIQ0lsbzZzb3N4R3VEQ2NUQmFWbnNnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    1.  applications应用层
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDQ0ZDU0NmE1MWZkYjVlMjg0OGY0MThlNWU4YjlmOTFfOXFkcVlaaEJhUzN2cGlmbFJSSmpwU2VVVTdXZHRxSGtfVG9rZW46U3F6S2IzSUt3b1cyUUF4OFZxU2NvTU5vbmdlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
    2.  bsp驱动层
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Yzg5YTAzMGM3ZDYyM2JlYTU4NzY5YTY1N2MyMzFlMjZfTGtrNU5uR0lKeHhBNW9jdm5BY3NSdXFmRzFCYTBHMGFfVG9rZW46UW5lTGJSQjE4b3dIWjN4bzVLSWNsUHlabnlkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    3.  Middlewares中间层
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWRjOGQ1NmZhNjFhZGNiMDk2YTk3OTU0NTk1ODYzZTdfeVU4ZlBKUW51MmRrRVlPd0xRSmcxSW80Y3hvQ2JuUWRfVG9rZW46UUZoZWJISUozb3FPUzR4N1FwbmNxNUZCbmJiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    4.  Core(主函数所在地，条件编译配置HAL库的头文件所在地)
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTk1NTU0ZTQxMjZjM2VmZjJiZTM2N2FhYTc2NTg1ZDlfaHVlM0ZMSlR0dGxVbHNmcmI1cmNWMmczb3BYNXZ4Q3lfVG9rZW46RERFY2JPMThyb3U3WDN4ZFhtZWNLa042bjBsXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzkwNTM5OGU1ODIzOWVlZGFmYWVhZGMwN2I1OThjN2RfdElxTVM0ekxVeTF6bzB1Q0hjblU4TTlDZDJUZHBDVk5fVG9rZW46RzE1eWJWUXZBb0w4VXF4cnpVT2NxaE02bkplXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    4.  ###   Vinci机器人队STM32C/C++工程标准(类正点原子，试运行，***不建议***，`建议用下一节的类Cube_Cpp`):
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjJhMzRiYmQ4ZDk0YmQwNmMxMzc5N2Q5NDM4NWQxNjJfdDVXS3hMNXg2bVI4WEkxQUR0SzFQQ2hYNVhTTFByQmxfVG9rZW46V3VmdWJQNVM1b2hNZW54NGlPOGMzQUhibk1oXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        1.  应用层、驱动层等采用模块集成式，不再采用Src和Inc分离式
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWQwOWE3NTQxNDU0NTAyMDZiZDM0MDExZGI4MzhjNmZfR0xVd0JPSVpsWDl0bmxQc016MHhCam9vZGUzbm9qdEpfVG9rZW46RkFTQmJncG5hb1A5OGJ4WUJONWM1YXlrbkdnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzA5OTBhYzQxNDJkODg3YTM5NWRhNjU3MWJhMGY3MjNfdkNKVFJWbWRFNDVqWFJka21xVEs3a2FNdDBTbUlnb0NfVG9rZW46TldCUGJIczdQb3hoNlR4NlFJTmMyT1JPbnhmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        2.  公共兼容层：
            
        3.  C++子main兼容库
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTJjMDExNzcxNTVmOWIwNzMwNWIwNjlkNDg0NGI1NzJfZUpBT3hYS3Z0dldkdGhPb0YyNkVCQmprbjNQbUppUWxfVG9rZW46SmVDTWJxY3N2b1o0VGx4b1JYSmNtOG1qbjlnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            2.  作用：在.cpp文件中创建一个普通的函数，该函数调用C++的代码，然后被C语言main.c文件中的main函数所调用。
                
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjUxYTM2OWVjMjQ2YjQ2MjA5ZTZiYWYyOTc3ZTE1NjRfSFZ5VFVoYmx3cUo3TUhkdGtBZ1NJWnE1dWdwSFpzcUJfVG9rZW46U1hVSmJudWphb2FyMWl4TFlwNmNmVGpTbkxiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDlkOGE1YjhiZjZlNjUzMjczYTA0OWRmN2VmNGI5MmVfc3huMXpETzJqbTNYZWJnNTVPNVE4YlFPUDNkclFYYVBfVG9rZW46RFd0NWJybkh1b3pXT0l4S2xOaWNFVW5DbnZEXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            5.  弱函数\_回调函数库（该文件的源文件全局要有extern "C",因为弱函数是C语言的东西，C++无法正常识别）
                
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Zjg4MjcxODUxNzYzNTY0NThmMmNkOGFjY2ZhOTA3YzVfMUtnYVZHdXZZWk9uME9WdGtRMWNkU2hpNDNLdzFHNDFfVG9rZW46WWtFWGJRd2Rqb3FVS0h4Wk5PUWN1dTJybjdkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjliMDUxNGU1NWU5ZWJhYjFhZWRiMGQ4ZmE1YmQyNTFfMFpQM2RaYm5ycHgzQ2lqYmloT0RJNmt0bkpGV1dQQVhfVG9rZW46RzE4UWIxVTdsb0ZMdnR4Qjk4d2NiTUFabkpnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWU0YzU0ODA0NGNhZGM1NGVkZDRkZjY0MjAzYmFlMGZfVGtndk8wcHE5bTVxWnZkUkdQOFBIM2c0VzFVMmE3VnhfVG9rZW46RUVpemJJU1Jyb280Y2V4U1QwT2NFYWdhbk1mXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWY1NjIxMjdjNjkyMzhjODEwMDA0NGRkY2EzZTlhYWVfRGxjMHc2QmU5OWpmTTJWZmtDOWxrUmV6S2hMMVduMmlfVG9rZW46SW4wdWJvaTFQbzBoRUp4dUhSeWNjdHlDbjRkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
    

5.  ### **(建议)Vinci机器人队STM32Cube C/C++工程标准(类Cube，试运行，建议):**
    

1.  #### 首先打开CubeMX进行工程配置，比如我们这里用裸机开发使一个LED灯闪烁
    

然后选择OpenFolder打开文件夹

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTJkZWJmMmJmNjliY2Q0MDBkNTQ0MjlhMDFiMDBlMjlfb0FsQWh1dkpWcmk0WktBS25rYTZpWExRQWZOQTVwVWxfVG9rZW46WjFyRmJxczR1b0E3TjJ4Wjc4RWNoNHVXbllkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  #### 打开Github将一些必备文件进行克隆
    

仓库链接：

https://github.com/tungchiahui/CubeMX\_MDK5to6\_Template

或者直接打开terminal输入

```Bash
git clone https://github.com/tungchiahui/CubeMX_MDK5to6_Template.git
```

3.  #### 打开克隆的模板与刚才CubeMX生成的工程
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDFlNmMxMzU5YmU2ZjQxYjNhYjdhMmUwYmUyMDE5YTdfeVdzd0FGVUJ4TnJuUEhRTmdiRVlLQ3RnTWdHZWNyb01fVG9rZW46QzB4b2JjaEM3b3J2YTR4M21KZWNGSHd2blFoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzEyM2EyYmM0OTgwMDE1YzhiNjVlNTYzOTU0YjcxMWFfQW9VcnlnMFhYWjRBY2lTT2NPeEkwMjRFWkxWYVR5bkFfVG9rZW46TjdRYWJxSklIbzdCRlF4Rk1FM2NwamVhbndoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

打开模板中的***`工程文件移植(创建新模板请看这里)`*** 文件夹，然后将里面的文件全部复制到CubeMX工程文件中。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWRiY2YyMDljYjFlZjQ2Zjk1NTE4YjY5NGUwMDkyNWNfWFBxR1BFYkdra1d0Ymt6bU5wN0owRDM3SWpxWUNWR09fVG9rZW46VW1SVWJwWmhpb29rWUh4dVdOVmNyQ2tabmZkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

移动后：

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODI3Mjg1MTdlNzYxMGI5YWQwY2FhMThlZjdmMzMzMDBfUVdnc0JkVWRybDByRFJhaVpOQWxJQVdrcjhxMUdPSDhfVG9rZW46SVdyQWJMbnA4b0Uyanp4eGdJMWNab1kxbkFiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

4.  #### 打开工程设置工程
    

1.  打开MDK5工程
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODBkYTY4ZGZiZTI2N2JkMjEzZWJhOWM4MjcxZjJjOTJfbUJwTE5Hb3FBNjZvejBsQW9Od2VucUZXNm5Tc1AzU0VfVG9rZW46SmluUGJYMk5nb210SHN4THF4OGNmZmZBblFmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzhhYmNjOTNmYzUzNWQzOTE1MzkxNmM4MjE5ZWM4ODJfMnozM0hvRGJ6ZWI1ZTBpMUN4VkZqZGJsb1pDVjRSTjVfVG9rZW46Q0Y3d2JlOTlxb3pTS094OGNEVGNQa2hybnliXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  点击Options for Target
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDk5OWM3MDdkYmFkN2Q2YjM2ZGI2ZjU5Mzk4MGEwNTNfTThxNjRUOVRJTkVjdGJWZXpGZHFiQkFuYWVrWWF4NEVfVG9rZW46VnRNNGJzMzVUb1U4TWJ4S0dJYmNUMG9kbllkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  修改编译器为`ARMClang[ARM Compiler6 (AC6)]` **替换掉** `ARMCC[ARM Compiler5 (AC5)]`
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjhiOTQ3YTUxMDAyNGJkNzIwZTA3NzMyZjU3OGM4MzdfSG5WeHJnOFU5VTlhN1RRdXRlZEo0SG9GRlVobXE5QkNfVG9rZW46WVZqRWJMVG5kbzAzMTd4V0pBRmNMeTZsbm1oXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

4.  添加头文件的路径(Include Path)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWVmNTVmMTAzYThjNDlkYzUwNzU5YjA2NTA4MzY2MTlfY05JN21VbmlzOG5IckswVzl5N2JqeEtKZnpLWThMNEdfVG9rZW46QVV2aWI3bUo3b25FQVV4dUFFYmNoOThjbjhjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmZjYzVjOWI5N2ZmNTcxYTdjYTRhNzkwMWVjYTY3YjRfcEY4SlpkMmZFOTdJS0xJd0RrRE1WODBEUHh1czlka3BfVG9rZW46QWk0eGJwNHVCb3lhSXV4dFJsN2NIdUtXbng0XzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

添加applications中的Inc文件夹

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTUwMGYzOGJmM2ZhMTg3NTE3MTIyMzgxMDllZTg4OGRfWjkzTzc0aTdZSEY4aGpkYUdKZHNucFlWYjNYbDhjRzRfVG9rZW46Vld3SWJWMmRub0d6c294SmFxRGM2M1cyblNmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

添加bsp/boards中的Inc文件夹

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWU3ZmU1ZmQxOTZmM2UxZGY4ZTU2OTk3MDZmY2MyNzNfa2Z0Zk9DaWoxSERidmVvcFdVTWdzSXVQZ3lRd2xZakdfVG9rZW46UndtT2JPMXNKb3ltOGF4OWs3WmN6YWFFblVjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

点击OK即可

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDMzYzY0MDZiNjk3NDc0YTI1NjFhOGUwOWExYjA1MzdfMlE2MjFvekRNbGpYWHRIamdtMnZ3dW9uSjBmZGIxSzlfVG9rZW46QWkwN2JUckNHb2lqZXp4ZG9LcGNBN242bmZkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

5.  添加源文件.c/.cpp等
    

打开Manage Project Items

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGJmMGU0ZGM0MTVkMjkyZDliYTFkMzdiMWE5NTc3ZGFfWDBzUVRnWlNhUUhxaG83d2puV3l2bmg2T3VFMmpDNmlfVG9rZW46QW5GY2JkdEFsb3kwVld4TlpBVmNXWXIyblhnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

创建两个分组

分组的名字分别叫

applications

bsp/boards

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGRlOGQ4NDFmMzdjNjA5MzQ3ZDgyMWZkZjU3NTVmYjVfU0gwZXRCcmpmMUVERzg2RzRFS1RjVW5ySGJtRzBRbjJfVG9rZW46Skk0VGJFNVZSb01HeHF4akJuRWNMSlBYbmpiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

将Core/Src目录下的startup\_main.cpp加入到Application/User/Core组中。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2EyMGQ4MWQzYmFlMGQwYzcwNWQyZTM1N2FiODg4YWVfN3NFZ1FFU0dNd2xxeXZkWkp6UldabmJRNmtuRVhTY2pfVG9rZW46TjdGWmJOemJab2h1ZjB4MjBpeWNVWVhrblFlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

将bsp/boards/Src目录下的bsp\_delay.cpp加入到bsp/boards组中。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjFlNWY0MDU2MGFhNzA2ZjQ1ZjhhYjgxZWFmYjkwMjVfNW40bzJ6QU5Tb2M1dWp3RnU1djFNSDZjbUloY2VkcVJfVG9rZW46WmtRcWIwY0E4b0pWdm14d0psV2NsYVA2bnJmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

可以看到工程里的文件都就绪了。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2I5ZTA0ZWRjZDY0M2RhZmE2OWYzMDdhMzEzYTI0YWRfcWI0SnZndlE2VHdRQlRkRmtnZkFLN0pXU2pOUW9qT2dfVG9rZW46TWFzUWJwemFxb3o5TjN4eUd4eWNhMk81bkk0XzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

5.  #### 编译并配置一些必要代码
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjNhYzQzNDM0ZjkzOGYxYTM5NDlkODRkYzkyYjM0NzNfZUJaRGxJVTAxeGhkYWY2a0JGMjQ1U29qSGJDZ21SNGlfVG9rZW46TzlROWJjMHRMb2pTaXF4cUdmYWNYTUlmblNnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmM5MjVlNjMzY2NlMjQzNGM3MDcwNTk4MTk5NzQxNmRfaDB5M0Z4cGFDT2xTVlhKM2dGbHF0cGRrOHp2MGRNWHlfVG9rZW46V0lydmJlZjJIb3RQZXJ4RVpQbWN5WklFbmllXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

可以右键头文件，然后点Open Document "xxx.h"来打开头文件，用来检查头文件是否导入成功。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjQ2MWU1MTM1NTYzODYzYWVmOTA5ZjE2OGVjODk1YzJfZnVKQjV0bWRVYWxVZW9OM1hTeEdDdmYxdDN3SlNUTkNfVG9rZW46VFZZTWJ3NVkyb0NvQVh4djZla2M0TE5kbkFoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

找到main.c文件，准备在主函数main()中调用C++的类主函数startup\_main();

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTY0NDJhY2Y4ODQxNzgzOTBkMDJkOTY0MmI5MjhhMzRfd2hLT3ZWMDQyQkdiTFFQYk5JNXExMnpLMU5CamRHSkFfVG9rZW46UVJwbGJaN0Nzb3Nrb0R4R0haSmNFSzNjblZlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

在USER CODE BEGIN Includes和USER CODE END Includes这两行注释中间 `引用startup_main.h` ***(因为不放在BEGIN和END之间的代码在CubeMX重新配置后，代码都会消失)***

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWQ3ZmQxNDJlNmEzNWRlNGVhMzY0NjE4MWViYWUwZDdfUXpLWjVFUld5b3BxdGV3eVA5enJ5T0VZNTBxcXBac0JfVG9rZW46U0hzTmJhSldUb2tLa2h4UWZ4NWN6bFI4bndlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

在USER CODE BEGIN和USER CODE END这两行注释中间 `调用startup_main();`***(因为不放在BEGIN和END之间的代码在CubeMX重新配置后，代码都会消失)***

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDcyMDc5ZGJiZWMxNTg2MTUyMmQwZTJhZDJjZDlhZjNfQWRWZEhyVkNDRnlkYXJJV1BZQmJFUFJVM2I4QWNLcWFfVG9rZW46TkxiVmJnNlVRb0d0d214cGRRZGMwTVdublZoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2FiNzRmYzVhOTY3ZjEzZTY0MTBmOWFiZDExOWRiNzlfQ3NtbjBkSWM1SjJhdTlGNk5CUXZ3YnQxcWxiQWpDSWZfVG9rZW46WEJXQ2JUbWZ5bzFnenN4UU1GMmM0ZDc5bkxIXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

打开startup\_main.h

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=M2E0N2JlMmJiNWEzNDVmZjg2ZWQ5ZmExMzg2OTBlYWZfam5PcU9IckVtdlluWEVoNDR3bmc1SDYwa3o4SEhMY2hfVG9rZW46RW9BQ2JHMkJHb2wxOGJ4Z3QxQ2NxdVd5blJlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

更改isRTOS宏的值，如果是裸机开发则为0，如果使用了FreeRTOS则改为1。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWZkMWY4NzUyNGI3NmU1YWY4OWUxMWQyNDRmOTYwOWJfZVAyS0d1UTlXYW9zREFMRk1pWENFMDV1ZE5WU1BBQ05fVG9rZW46RVJGYWJGem1Ib2lMSU14VWE3OWNJanJ2bnZmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

至此，你可以在startup\_main()函数中随意调用C/C++库中的代码啦。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzM3NTcyMmE4ZTdhYTk4YzAyYTZmYTRjZDJkYjlhYjJfZnFYc1dURmRQeUdjVzN3Rmt1Tm1xcUJieEZYZ1BKWTJfVG9rZW46RnBLdWJsZjYwb1MyTGh4cXBIU2NITkc3bk5kXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

6.  #### C++库的头文件格式
    

拿bsp\_delay.h举例

```C++
#ifndef __BSP_DELAY_H_
#define __BSP_DELAY_H_

#ifdef __cplusplus
extern "C" 
{
#endif

#include "startup_main.h"

class BSP_Delay
{
        public:
                class F1
                {
                        public:
                                void Init(uint16_t sysclk);
                                void us(uint32_t nus);
                                void ms(uint16_t nms);
                }f1;
                class F4
                {
                        public:
                                void Init(uint16_t sysclk);
                                void us(uint32_t nus);
                                void ms(uint16_t nms);
                }f4;
                class FreeRTOS
                {
                        public:
                                void Init(void);
                }freertos;
};

extern BSP_Delay bsp_delay;

#ifdef __cplusplus
}
#endif

#endif

```

条件编译肯定不能少，一个是防止头文件重复引用的条件编译，一个是把C++链接为C语言的条件编译。（如果忘了，请看[Vinci机器人队C/C++资料](https://sdutvincirobot.feishu.cn/docx/N0GAdx6IDoqnRnx1q0TcX1Wfnvc)）

然后引用startup\_main.h头文件

再创建该模块的类，比如说class BSP\_LED等，我这里为延时的类，所以是class BSP\_Delay。

然后写类里的声明。

注意：不要在.h文件里写任何代码实现，也就是不能写任何函数的定义。

然后第35行的extern BSP\_Delay bsp\_delay;是在主函数中进行了创建对象bsp\_delay，我们要在这里声明(extern)一下对象(变量)。方便其他的源文件调用。

理论上你是可以看懂上面所说的的，如果你实在看不懂，就照葫芦画瓢，画着画着也就理解了。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODRjNjk4N2VmMzQwMmMzMTIzNTUxMzBlYzFiODQyYTNfUW9tdEdyRzVsVDVqeWhvcnZkc1VFbnFvTUNMaGIxelhfVG9rZW46RVFVTGJvR0tQb0gxOWp4TmVUSGNXampIbm1oXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

7.  #### C++库的源文件格式
    

拿bsp\_delay.cpp举例

```C++
#include "bsp_delay.h"

#if isRTOS == 1
    #include "cmsis_os.h"
#endif

static uint32_t g_fac_us = 0;       /* us延时倍乘数 */

BSP_Delay bsp_delay;

/**
 * @brief       初始化延迟函数
 * @param       sysclk: 系统时钟频率, 即CPU频率(HCLK)
 * @retval      无
 */
 void BSP_Delay::F1::Init(uint16_t sysclk)
{
    SysTick->CTRL = 0;                                          /* 清Systick状态，以便下一步重设，如果这里开了中断会关闭其中断 */
    HAL_SYSTICK_CLKSourceConfig(SYSTICK_CLKSOURCE_HCLK_DIV8);   /* SYSTICK使用内核时钟源8分频,因systick的计数器最大值只有2^24 */

    g_fac_us = sysclk / 8;                                      /* 不论是否使用OS,g_fac_us都需要使用,作为1us的基础时基 */
}

/**
 * @brief       延时nus
 * @param       nus: 要延时的us数.
 * @note        注意: nus的值,不要大于1864135us(最大值即2^24 / g_fac_us  @g_fac_us = 9)
 * @retval      无
 */
void BSP_Delay::F1::us(uint32_t nus)
{
    uint32_t temp;
    SysTick->LOAD = nus * g_fac_us; /* 时间加载 */
    SysTick->VAL = 0x00;            /* 清空计数器 */
    SysTick->CTRL |= 1 << 0 ;       /* 开始倒数 */

    do
    {
        temp = SysTick->CTRL;
    } while ((temp & 0x01) && !(temp & (1 << 16))); /* CTRL.ENABLE位必须为1, 并等待时间到达 */

    SysTick->CTRL &= ~(1 << 0) ;    /* 关闭SYSTICK */
    SysTick->VAL = 0X00;            /* 清空计数器 */
}

/**
 * @brief       延时nms
 * @param       nms: 要延时的ms数 (0< nms <= 65535)
 * @retval      无
 */
void BSP_Delay::F1::ms(uint16_t nms)
{
    uint32_t repeat = nms / 1000;   /*  这里用1000,是考虑到可能有超频应用,
                                     *  比如128Mhz的时候, delay_us最大只能延时1048576us左右了
                                     */
    uint32_t remain = nms % 1000;

    while (repeat)
    {
        us(1000 * 1000);      /* 利用delay_us 实现 1000ms 延时 */
        repeat--;
    }

    if (remain)
    {
        us(remain * 1000);    /* 利用delay_us, 把尾数延时(remain ms)给做了 */
    }
}



/**
 * @brief     初始化延迟函数
 * @param     sysclk: 系统时钟频率, 即CPU频率(rcc_c_ck), 168MHz
 * @retval    无
 */  
void BSP_Delay::F4::Init(uint16_t sysclk)
{
    HAL_SYSTICK_CLKSourceConfig(SYSTICK_CLKSOURCE_HCLK);/* SYSTICK使用外部时钟源,频率为HCLK */
    g_fac_us = sysclk;                                  /* 不论是否使用OS,g_fac_us都需要使用 */
}


/**
 * @brief       延时nus
 * @param       nus: 要延时的us数.
 * @note        nus取值范围 : 0~190887435(最大值即 2^32 / fac_us @fac_us = 21)
 * @retval      无
 */
void BSP_Delay::F4::us(uint32_t nus)
{
    uint32_t ticks;
    uint32_t told, tnow, tcnt = 0;
    uint32_t reload = SysTick->LOAD;        /* LOAD的值 */
    ticks = nus * g_fac_us;                 /* 需要的节拍数 */
    told = SysTick->VAL;                    /* 刚进入时的计数器值 */
    while (1)
    {
        tnow = SysTick->VAL;
        if (tnow != told)
        {
            if (tnow < told)
            {
                tcnt += told - tnow;        /* 这里注意一下SYSTICK是一个递减的计数器就可以了 */
            }
            else 
            {
                tcnt += reload - tnow + told;
            }
            told = tnow;
            if (tcnt >= ticks)
            {
                break;                      /* 时间超过/等于要延迟的时间,则退出 */
            }
        }
    }
}

/**
 * @brief       延时nms
 * @param       nms: 要延时的ms数 (0< nms <= 65535)
 * @retval      无
 */
void BSP_Delay::F4::ms(uint16_t nms)
{
    uint32_t repeat = nms / 540;    /*  这里用540,是考虑到可能有超频应用, 比如248M的时候,delay_us最大只能延时541ms左右了 */
    uint32_t remain = nms % 540;

    while (repeat)
    {
        us(540 * 1000);        /* 利用delay_us 实现 540ms 延时 */
        repeat--;
    }

    if (remain)
    {
        us(remain * 1000);    /* 利用delay_us, 把尾数延时(remain ms)给做了 */
    }
}

void BSP_Delay::FreeRTOS::Init(void)
{
        //调用FreeRTOS自带的延时即可。
        //osDelay
        //vTaskDelay
        //vTaskDelayUntil
}



/**
  * @brief HAL库内部函数用到的延时
           HAL库的延时默认用Systick，如果我们没有开Systick的中断会导致调用这个延时后无法退出
  * @param Delay 要延时的毫秒数
  * @retval None
  */
void HAL_Delay(uint32_t Delay)
{
#if isRTOS==0   //如果是裸机开发
        
        #ifdef STM32F1  //如果是裸机开发且为F1
                        bsp_delay.f1.ms(Delay);
        #endif
        
        #ifdef STM32F4  //如果是裸机开发且为F4
                        bsp_delay.f4.ms(Delay);
        #endif
        
#elif isRTOS==1          //如果是FreeRTOS开发
                 osDelay(Delay);
#endif
}

```

刚上来肯定要引用自己的头文件。

这个条件编译不用管，因为延时在裸机开发和RTOS开发时有区别，所以我加了一行条件编译。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2IxZDUyOTllZTYxYWRjMjNhNDE4OTY0ZWU3ZTI3MmNfYzFuRnFaTkVkRVpPaW5qM1lnejJQUlJsemNwbWJrOEpfVG9rZW46RW5tdGIyYW5Zb0lUZWd4UlVDTGNORjRGblhmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

上来要先创建一下类对象bsp\_delay;

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzFjYjg4MTM3YzZmZGUzY2FlM2JkNGUzMmNiZGMyZGFfbzNxRUN0ODd4S1JVejJUcmFOYXZRc0xRZllIcUVqN3RfVG9rZW46QTFwV2JCN1A2b3AwZkd4YmlpNmM4U1hKbktOXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

然后把类里的函数都进行定义。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGIyMmQ0ODM4YzFlNTNlZjZiYmUxYzFmMjZjMGE5NTdfR0c3S0hDVU9wUUk0UG9nNDdFeW9LYTNYWklzREloV1NfVG9rZW46VXNJa2J0cnRib0NNcEx4YTBFWGNyV2VIblFiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

**函数注释格式：**

这一块是该函数的注释，以后尽量都这样写注释。（在以后MDK6中进行调用函数时，会提示该注释，一目了然）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWEyZmI2ZTFkMGJmOTEwMDI2MmFhYWFlMDc2MDIzYTFfUXBRdlZwbTl1cEY0NzhjMDVsVXRoSnJ0RDUwekpud2pfVG9rZW46RW9pSmJXZnpvb0hDZlR4WFBnS2NkdjBJblFlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

这样写注释的好处，在调用时，会显示入口参数需要填什么，会显示返回值是什么。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDcyODgwOGNmNmM2NjIyYjk3YjNiNDlmYmZhNjQ1Mjhfa0RXUUEzSTRvMkE2OW14emJEdTRkTjJwNVhIWjhHSmpfVG9rZW46Q1B6WmJDcTdWb01YVld4Qkw1S2NiS3c5bm5mXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

brief 函数摘要

param 入口参数

retval 返回值

note或attention 注意事项

注意这里，有几个param入口参数，就写几个param

比如

```C++
/**
 * @brief       CAN1通信发送函数
 * @param       motor1: 第1个电机的相对电流值
 * @param       motor2: 第2个电机的相对电流值
 * @param       motor3: 第3个电机的相对电流值
 * @param       motor4: 第4个电机的相对电流值
 * @retval      bool是否发送成功
 * @note        无特殊注意事项
 */
 bool CAN_BUS::CAN1::CMD1(int16_t motor1,int16_t motor2,int16_t motor3,int16_t motor4)
 {
 // ... ...
 }
```

8.  #### 注意事项
    

1.  在.cpp源文件中，弱函数的定义前面要加个extern "C" 因为\_\_weak是C语言(汇编向量)特有的，所以必须把代码以C语言的形式链接。
    
2.  代码要写在Begin和End之间，否则再次用CubeMX配置代码后，代码会消失。
    

7.  ## 驱动
    

1.  驱动，驱动程序全称设备驱动程序，能够使计算机与相应的设备进行通信。驱动程序是硬件厂商根据操作系统编写的配置文件，可以说没有驱动程序，计算机中的硬件就无法工作。
    
2.  普通模块的驱动：GPIO初始化程序+通信协议程序 数据协议处理程序
    
    1.  例子：LED灯，只需要GPIO初始化程序；蓝牙模块，需要写GPIO初始化程序和通信协议程序+数据处理程序
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWYyM2E5MGE1YzZmYTExNjFiNjk0NTdjNTYyNWM2YjhfOVQ4NmVVU010ZjFadW1wMmtkY0JnaU15NlJmT2Y5c1hfVG9rZW46STFITWJzUlhCb21pQVJ4YkZWSGNiQ1hSbjZlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTU3MGE5NWM4Yjg3ZDRiODk5Zjc2ZmRkMjVkYjlhYWRfQjJ4S3lwbEE1WVVHd2lMb1ZuY3hNekxncXQxczFTd3JfVG9rZW46TFhjemJzTUlxb0tCcjZ4ZjB6V2NFWnlObmNnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    4.  GPIO程序：
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTc2ODQwY2I3Mjc2OWQ4NmRlMmIzYjE5NDRhNjgxY2VfQ3BCZm9TbXlFU3kyc2ZPeW5IS1l6TlVpNGlBV1p3VndfVG9rZW46TlRnR2JyMks3bzlRODF4MzBqamNQMjhMbmdWXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    6.  通信协议程序：如图是串口的通信协议程序以及GPIO程序
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDJiMTkzYmExYTc3NDE2MGUxMTdhZGIxMGI4ODgyNzJfVUE5VjhkZmEwYk5oN3JhOWtPQ2JLcWhKMEN0eGtKVjFfVG9rZW46S1hLSWJmY0xwb0dvNU54N3ZaUGNyVkRLbnNlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    8.  数据解析程序：如图是PS2手柄的数据处理函数（见C++题库数据解析的题型，主要用二进制，十六进制，位操作符等）
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Mzg0MDc3YmI2ZWI0ZGEyNjdmOTczZmQ5ZDAxNTU2M2VfcXBLVlRmY1Y5VEhhNndMU0RYTkFRYVV4VTl6TGpsSGlfVG9rZW46TWxuemJ4RW1tb09rOUx4OWR6aWN3ejN4blpkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        2.  数据单位变换：
            
            1.  1Mbps（比特率） = 1000 000 bit/s（比特/秒） 1 byte（字节） = 8 bit（比特）= 8位二进制 （非常重要） 1 kbyte（千字节） = 1024 byte（字节） 1Mbyte（兆字节） = 1024 kbyte（千字节） 1Gbyte （千兆字节） = 1024Mbyte（兆字节）
                
            2.  1个字符 = 1 byte（字节）
                
            
                  1个阿拉伯数字 = 1个字符
            
                  在GBK编码下，1个汉字 = 2个字符
            
                  在Utf-8编码下，1个汉字 = 3个字符
            
        3.  数据命名格式（详细请见C++文档）：
            
            ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDA3ZTJmMGVmMGZkMjBjZjc1NGZhMTAyMTUwNzA2NGJfREk5YTBGZ3ZyVVM3SU42ZnozTGpEZk9aS0lNbkhQTm9fVG9rZW46TzBXcWJxOXNHb0M2WWd4WWt1ZWNjNlF2bkNiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
            
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjIyMzZmMTcwOWY3ODZiZjU2ZWFjMDg4ODc5ODZmNTNfdlRuSFkwSUZSY3Q3Q2RjU09icDVnQUpySHl0YlFQYm5fVG9rZW46WkpEV2JNZkw5b3QwRmx4SWE0bWNqTm81bk9iXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjI0MzM0ZDVlM2QxM2VhMmMzZWQ0NmU4YTk1ODVhNzRfYUU4VmpOZE8wWHdXd0x1ZlhnMHFJWWVqcXhrWG51NlpfVG9rZW46VjFFOWIyNnN4bzJmWFR4SkhrRmNYNUc0bklnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWM5ZTEzNGFlODc2YjQ5MWM5NmRiNGYxMDhiN2Q1MjRfZzYyYjhOclFRdHpjbUt4ZzJFc3duaUJQcWVocjV3UmRfVG9rZW46Q1NUQmJsRG5pbzNkaEp4YmgwOGNJZTE0bkJkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    12.  针对HAL库外设API的填参方法：
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODg4YmRmZjhhMjUwMzM3ODYyYmJlYzBjNTdiMzNiZWRfaTU5b1NUalR3YkYxV0J5ZW9FZTZNWDlTbmR2YnZSNHNfVG9rZW46REt2VWJ0N2FZb2pxYmh4WVZKSmNWWjBVbllGXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        2.  查看对应的数据类型
            
        3.  查数据手册查函数的内容的注释
            
    
    8.  ##   大疆电机控制(CAN)
        
    
    ###   ①CAN通信简介
    
3.  什么是CAN通信？
    

[CAN总线](https://so.csdn.net/so/search?q=CAN%E6%80%BB%E7%BA%BF&spm=1001.2101.3001.7020)通信系统是**串行通信**的一种，要优于串口[RS485](https://so.csdn.net/so/search?q=RS485&spm=1001.2101.3001.7020)总线。与I2C、SPI等具有时钟信号的同步通讯方式不同，CAN通讯并不是以时钟信号来进行同步的，它是一种**异步****半双工**通讯。（差分信号，半双工）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTNjZWZhMTI2M2ExYmZiOGEwODYwNDk5MDZhYTk4ZjZfbHVOVWdkazlnWjBZTHJyR2dCUzRvZ0xMQmhRMkgxTnBfVG9rZW46STRXbWJ0MWM4b0c2MEV4SkRSaGNrNzM3bjVjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  串口通信逻辑电平表示方法的分类
    
    1.  TTL（单片机上引脚常用电平，串口全双工，芯片IO口为TTL电平的RX,TX;信号线为TTL电平的RX,TX）
        
    2.  RS232（电压范围比TTL高的一种电平，抗干扰较好，串口全双工，芯片IO口为TTL电平的RX,TX;信号线为RS232电平的RX,TX）
        
    3.  RS485（差分信号，抗干扰极好，Modbus协议，串口半双工，芯片IO口为TTL电平的RX,TX;信号线为A和B）
        
3.  CAN通信信号线
    
    1.  差分信号，抗干扰极好，半双工，芯片IO口为TTL电平的CAN\_RX,CAN\_TX;信号线为CAN\_H和CAN\_L;（类似RS485)
        

### ②电机库代码解析（该库内容要求尽量全部看懂，尽量一行不差）

4.  代码及其初始化
    
    1.  这部分正点原子都有讲，只需要把参数改为大疆电机的
        
    
    代码仓库链接:https://github.com/SDUTEMIS/SDUT\_VinciRobot/tree/main/1.Embedded\_STM32\_Driver%2FC%2F4.Motor\_Drivers%2F1.DJI\_CAN\_PID
    
      
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmU4NjViZTdiMzhjMGI4MWM3ZTcyNDBiYTY4MTFiMzlfcmlRTzE3YmpnSkxUOHJOemlyQVhaSEt1Y2d2a3NIS2tfVG9rZW46QlJWVmJkYzBwbzl6bXV4bElWQmNvODNGbnNjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmQ2MGQwM2M5ZDQ4MmRlNDcwM2Y3OGZjMzVkOTZlMTJfRjA4RTFZM2F1MVZjbWZhbjZ2ekJRdTkydjZ4NVVheHZfVG9rZW46WTZnYmJ1VU1ob1pLSm54Z2pGemNsdHpibkRoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGRmOWNmMTk1MmIyODY2NDlmZWI1ZmYyYWZmOGQ3MDZfZ1U5M0hVN001S1NoVFJNRVBET1JPZVNQdjZZaVRCWVhfVG9rZW46T0Z2dGIzTXlQbzJicFR4Y1cwT2N4cjVsbjliXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NGFhMmE1ZWRjZjFiMWQ1MmM0MzVlNjRkMmRmM2I1ZTNfcGZzUzB6RElORnVXMXpoQkloaWZ5MU91dlBFQ3VVanpfVG9rZW46R01KcWJxSDFtbzNSWkZ4MFg1MmNXeXhobk9mXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YThhMWJiMDJkY2Y3NGI1NTJkYjFkOTIyODM5OWQyNDNfTzV2RFpJNWFDMWZZdGxidkZpeXNXUTMwRTJKQWNDcWdfVG9rZW46T21EZGJxRzRyb1FZMmV4VXdSbmNQT3l5bnNmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

5.  大疆电机库开环代码解析：库由往届学长学姐对大疆官方库代码修改后的。
    
    1.  CAN报文发送函数解析
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NGU3OTQ5YTFlYmNmNDJiYmQzMzc0MzI0ODQxZmI3NjFfU3JJVzczclNmT2ltZUN4ZGdwVmRBZFpyVmtNUWRCd2VfVG9rZW46UWdpbGJrU00yb2llcG14d09oQWNSWVZjblhlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmI1M2RmYzk5NTg3MGE0NDA2MTUxM2IzZjEyOTNiMjBfczFoa1I2aEVoU2UyaDg3aFBJMUpnTGF2NWp1b2lpRWRfVG9rZW46UDJTNmJsQmFwb0FYaFd4Vkd0a2NUWnU4bm5iXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTcwNTU0MTVkNjFmOTM3NzA5MWNlY2E5NmZhYzcwMDlfZE9EbnhyNkVxUWdvZUdwdGpLYWxjeTJWN1VoYktMbVFfVG9rZW46RWo0ZWJnNDN5b3lZaXJ4NHVaVGNGYk9jbkFjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWZhNWNiOGJmNTc2MzY2ODdiYTFhNGI1ZmJjYWIzNjVfUlpVRWN6djlncXhPRmxwaWtiNWNIS3ZTZVZaTVI0N3dfVG9rZW46RHVKMWJvVDZTb0pJODB4a3N5Q2M0NG1XbkFnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
       **此函数是将电流值发送给大疆CAN1通信电机，CAN1通信每次只能发送8比特的数据，电流值是16比特的数据，所以把电流值向右移8位，然后再发送给电机。电机接收到电流值就开始转动（入口参数是电调ID为1-4的电机电流值）**
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Mzc4NGMyNzU3MTdlNzkzMmE4MTY4OTJhNzU4NmVmYzRfM25rZWp3WENDMGNNekVaUGJXbkRvYzlpWTZBT1hGeTlfVG9rZW46WHFwdGJXWVhHb05vTjd4OXhtcWNLYXJBbjVQXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjkzMjg5NmZkM2Y5NzZlMjAyZGE1MzMyMTVmY2JlMmFfN0RlWE56UEc5bVNsR2dLOENpSmtKUFpuaU9CdE5QU2FfVG9rZW46Q1pma2J5NEc5b1pLRlh4R1pTdWNzeXVUblNmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
       **此函数是将电流值发送给大疆CAN1通信电机，CAN1通信每次只能发送8比特的数据，电流值是16比特的数据，所以把电流值向右移8位，然后再发送给电机。电机接收到电流值就开始转动（入口参数是电调ID为5-8的电机电流值）**
    
    10.  CAN报文发送函数调用
        
    ```C++
    int16_t Current_Motor_Target[1];
    
    void chassis_task(void const * argument)
    {
      //wait a time
      //空闲一段时间
      vTaskDelay(20);  //等待所有设备准备就绪
      
      while(1)   //可以在定时器中断里实现
      {
        Current_Motor_Target[0] = 1000;    //测试电机闭环是否可用的代码，正式使用时请注释该行代码
        CAN1_CMD_1(Current_Motor_Target[0],0,0,0);  //对电调ID为1的电机发送1000电流使其开环转动。
        //系统延时
        vTaskDelay(2);  //等同于osDelay(2);      
      }
    
    }
    ```
    
6.  大疆电机库闭环代码解析：库由往届学长学姐对大疆官方库代码修改后的。（在开环基础上又加了CAN报文接收，以及一系列数据解析程序）
    
    1.  CAN通信接收中断回调函数(CAN\_RX0接收中断回调函数用来处理CAN通信电机发来的数据，也就是 **电机的速度，角度，温度** 等数据。)
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDJmOWRlYzdhYzE1NWVhNjZhMDk0YmMzZjM4ZWU4YzdfVFRlYmZaVlZyR0dkdEkxZmdDbGxHWGpmaXpJc2FaZGlfVG9rZW46SWlybWJ1Q3dIbzI0N2J4V1FIUmNjSnJTblRkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmMwODc3OTJjZTkxZGJhODVmYWRiNjkwZTY5MjU2MzhfZDB5bFJFRm14a1d3WmdHUlBiNUE5WEV0TTNGYkZWUE5fVG9rZW46WkFPSWJDMjJ6bzIydTl4a1ZYS2NtakRmbm9jXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Njc4YzdhMjViYWY1OGU0MGNiZDA4MDY4ZWVlNjM4ZTdfakRFYURoNmg0R0gzdFI2MWRoUlR3bnM1NDhFbUdSNHJfVG9rZW46TjZWdGJJN1Nob3VVOHB4QVBaMGNnMVBwblFoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGVmNjIwMzhhOTg4YjYxMjkxZmQ4ZjYzOWUwYzg4NjNfcGt1Wm5zdlVvSjRrSG5qZTJoRXNkdFV5TER0RlFjZjJfVG9rZW46RERkdWJFejYzb0JPbWx4ODlqemN5YlBVbnRjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    6.  数据解析函数
        
        1.  电机编码器分为增量式编码器和绝对值编码器
            
            1.  增量式编码器：上电时数据会丢失，角度从0开始
                
            2.  绝对值编码器：掉电后数据不会丢失。
                
            3.  M3508和M2006编码器都为绝对值编码器，掉电后数据不会丢失，但是因为记录的是转子的角度，转子连接了一个减速器，所以导致数据是错误的，所以我们要用代码将绝对值编码器的数据转化为增量式编码器的数据来使用。(结构体里的total是绝对编码器的角度，而total\_angle是我们处理后改为增量式编码器的总角度)
                
        2.  记录上电角度
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NWEwN2ViY2Y2NDQ3ODJiYzQ1MTgwOTAzOGE2NDNiMWRfTHhtMUk2dllsanV5cWxxM2N0bnpYMVhxMGxpU3VrUHVfVG9rZW46UkttdWJaZE5Hb01MSUV4c0ZjUmNwM0tPbm9iXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        4.  计算总角度（经代码处理后，上电时总角度 = 圈数(0) \*8192 + 当前绝对值编码器的角度(假设为A) - 上电时捕获到的上电角度(因为此时为上电时，所以也为A) = 0）
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWUyZDFkMDE0NWMzZjNhMmEyYjkyMWI1NDFkNTgyMTFfQmFXSks1SWZwNVQ3THBFc2dxMFNXQWhIajZKV2FQRThfVG9rZW46QWNLb2JrTXgxb1lUalV4QzlKemNFS1BWbkhoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        6.  暂时用不着的函数(此函数没有被调用)
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmMzNDEyZGM5ZWVhZWE5YzcwZmViM2RjMWUwYmNiNTdfTkdsZnpSdTVsdlJySU1ROE9rOGtCbk4zOHNkUEtMSU1fVG9rZW46UklZMGJrRFdvbzR6dUJ4MXRaVWM0WUhGbmlnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        

### ③PID控制器

1.  PID算法简介：
    
    1.  MATLAB\_PID控制器介绍：https://www.mathworks.com/help/control/pid-controller-design.html?s\_tid=CRUX\_lftnav
        
2.  PID算法原理
    

关于理解PID控制算法最典型的一个例子就是一个漏水的水缸的问题。

有个漏水的水缸，而且漏水的速度还不是恒定的。然后我们还有个水桶，我们可以控制往水缸里面加水或者从水缸里面舀水出来。另外我们可以检测水平面。现在我们的目的就是要控制水平面稳定在我们想要的任何一个平面上。

注意我们使用PID需要在一个闭环系统里面。什么叫闭环系统，就是有输入有反馈，输入就是能输入一个量去影响和控制我们的系统，反馈就是我们要能知道我们最终控制的东西的状态。在这个漏水的水缸系统中，输入就是这个水桶，我们能通过水桶往水缸里面加水或者从水缸里面舀水出来来影响我们水缸的水平面，反馈的话也就是说我们要能测量水平面，知道水平面是多少。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDczNjFhMzQyNzIyMWFhNGM2M2JhZTg2NWVlNDZjZDJfZ0pON1lPQm1iME81Q25pWU00dmxFN3VzOHhQMEhBY3dfVG9rZW46VzVnYWJIeTVUb3NRYTJ4MU0xbmNKNkRsbmhjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

a, **比例控制理解**

*首先是比例控制。比例控制就好比是通过水桶往水缸加水或者从水缸舀水。假设我们需要把水平面稳定在A平面，而实际水平面在B平面，那么水平面差值Err=A-B，那这个时候我们需要往里面加水的量就是Kp\*Err，Kp就是我们的比例控制系数。*

*如果A>B，Err为正，就往水缸里面加水；如果A<B，Err为负，就从水缸里面舀水出来。那么只要预期水平面和实际水平面有差值，我们都会通过水桶去加减水来调整系统。同时Kp的大小也有对系统的性能有影响。如果Kp的值比较大，优点是从B平面达到A平面的速度快，缺点是在B平面已经接近A平面的时候系统会产生比较大的震荡。如果Kp的值比较小，优点是B平面在接近A平面的时候系统震荡小，缺点是从B平面达到A平面的速度慢。*

*这里也许有人会有疑问，如果这里把比例控制系数Kp直接设置成1，然后加水的量直接为Err=A-B不就可以了。然而实际上很多系统是做不到这点的。比如温度控制系统，实际温度为10度，我要通过加热把温度提升到40度，这里难道我们能一次性准确的给系统加30度？显然这是做不到的。那么比例控制的最终结果是Err的值趋向于0。*

b, **微分控制理解**

*然后我们先看看微分控制。在我们的比例控制的作用下，Err是开始减小的（假设一开始预期水平面A大于实际水平面B，也就是说Err是一个正值），那么也就是说Err随时间是一条斜率小于0的曲线，那么在周期时间内，Err越大，微分的绝对值越大，那么也就对Err的减小速度是起到抑制的作用的，直到最后斜率为0微分才会停止作用。*

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2E3NzgyMDQ1ZWM2ZjExOWY4NTIxNTNjZjNlMWQyNWNfdVpRMWRlY0diVGtCUUZndWtCM2NnZ00xVDcyMjZNMHFfVG9rZW46TVlCR2I3ak5Xb3F1dXR4NmEweWM0SVN2bm1oXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

微分控制能反映输入信号的变化趋势，因此在输入信号的量值在变化太大之前可为系统引入一个有效的早期修正信号以增加系统的阻尼程度，从而提高系统的稳定性，但一阶微分的高通特性使得该控制器易于放大高频噪声

  

c, **积分控制理解**

*积分控制部分的作用主要是用来消除静差。那么积分是怎样来消除静差的呢？*

*比例控制只能尽量将Err调节到0，而微分的作用是将曲线的斜率控制到0则停止对其作用，但斜率为0的时候Err并不一定为0。*

*这个时候我们就需要积分来起作用了。我们知道曲线的积分相当于曲线与x轴围出来的面积。如下图，积分作用的目的是使红色部分的面积和蓝色部分的面积的和为0，那么即使系统在比例控制和微分控制部分已经趋于稳定，只要Err不为0就会存在静差，只要存在静差那么积分就会对系统产生影响，直到系统的Err值为0。那么这样我们的PID控制在理论上就可以达到一个非常精确的控制效果。*

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWI1M2U2NGVjN2QzMmViNjIyY2FlN2I3ODgwZmYyODdfTmF4Sm45NUJvUGtWOWJXOUwyekZpcjY5V3NPU3g5OExfVG9rZW46RGtxUGJ4RU1Cb2V3Mzl4VGpLOWNHTU5rbkJoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

d, **PID算法离散化**

假设采样时间间隔为T，则在k时刻：

偏差为e(k);

积分为e(k)+e(k-1)+e(k-2)+…+e(0);

微分为(e(k)-e(k-1))/T;

从而公式离散化后如下：

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTg4ZTcyMzIzZmJhZGQ5NGQzMzk4ODExOGNkYjY1YjdfcWsxSWJFWGgzdmhqTUk4cHc5Uzg5M0I4QWc2bVFkTElfVG9rZW46VlVGamJXYW1rb21SSVR4Z0FPMWNBTDJxbndnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

比例系数：Kp，

积分系数：Kp*T/Ti，可以用Ki表示；*

\* 微分系数：Kp\*Td/T，可以用Kd表示；

则公式可以写成如下形式：

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGI1NmZhZTdlMTNlMjJiODVkODMwODZlNDkyZWJhODJfc0lnMm5NaWFMelpobVpHWEdHZUk4UGl0b254SGVJTVVfVG9rZW46UURWS2I4ZTJQb1BUSnl4dmkyZ2NJVW5JbkRkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

PID算法的离散形式就是这样了，这就是我们平时说的位置式PID。

但是为什么还要增推算量式？

一个累加符号使得微机的内存可能不够用，一个字节八位最多存到255，第二点就是掉电之后产生的产生的影响非常大，之前存储的状态会全部丢失，所以要推算对状态记录要求不高的增量式。

接下来我们继续推算增量式PID，根据上面公式我们可以求得：

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmI4ODkyMWQ3MzlmNDE4YTQxZjAzOWJiZmUyYmRmZjVfWkNzTGNOVW83Z3JsTURiSzhPQjFycWxUV2xqNWpiVEVfVG9rZW46VzN1V2JZaFJob1BvTVJ4aENaRWNiZmJwbnpkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

e,pid双环

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWUyMmY5M2MwNmQ5ZDVlYWZkMmZjNmZhNzdkOWJkNzFfYlQybVRGMHg5RmU2VnA2eXBVajBjWFcxWEhvY2dnZUxfVG9rZW46UG9LZ2J2am40b2hvRk94UzhDbGMxdE1Tbk1iXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

f,pid前馈

  

  

  

  

3.  PID算法库
    
    1.  核心计算函数（非常成熟的控制器，数学算法）
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDNiYjAyNjIxNjA0YWI3NGFmY2NhN2NmNGY3MjcyMTZfWVRpN2tBQk5aUkNMcmRFVk13VkliNTRscHVHN1AyTEVfVG9rZW46RmZWd2JLWE8zb3F1ZGl4QWdVbmM5dlI4bm9jXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    3.  初始化代码(将Kp，Ki，Kd三个参数与输出最大值，积分限赋值赋值给PID句柄pid\_v\_1或者其他的句柄)
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTM3YTE4NWQyMDQwZDA2YTA4MzhiM2I3ZjlhNGExYjlfa3pXWlR6VWhhQ2FPOFp6RHdTcFdKdUhRVjlBa2xCNlpfVG9rZW46SnBMOWJOVTNWb1FrZmp4cFQ3bmNtamxCbnNjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    5.  反馈环代码
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGQ0NDc3YjAwY2IyZjJhMzhhMGI5NDc3YThhMGJlMzdfdTNCTmJxNkF3Z29IOTIxaE1SRlNlcGJHTHNOVGtZSFFfVG9rZW46TDFiRmJEdGdKb0VCUm54Q2taSmNwZzkwbnZoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    7.  闭环代码调用
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTA3MTA2NGM3NzI4NzZmOTIwNDdjNWY2YTg1NGVlZWNfTWdTUFJyUFpiaFVUVmRZTW02dkZadU9kdDFkSFRpd1hfVG9rZW46SXRmR2JSREJkb1Y1a1d4eGRlS2N3WW5zbldkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGYwOTM5YjBmNGUzZGVmZTMxOTFhNmJiMTE0NzAxZWJfSmxCWkJNdFI1R2tXNHJaaTllcm9hNzRNd2Z3dUVOaUxfVG9rZW46Sktpa2J2bThsbzRDSEV4bHhteWNqWVUwbjliXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmI2YmU2MWM0YTIzNjlkYWQ2ZTc4MGJjMjAwMzVkODBfb1FEeWp6QTJQSWFGWlRrZkM1OXJJZmZ3TGp4YVRmdGxfVG9rZW46VDREd2JnWlVUb3VhRUR4VzFSeWNoZ2w1bkhkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

### ④C++库（建议）

1.  #### 简介
    

代码仓库链接:https://github.com/TungChiahuiMCURepos/CAN\_PID\_CPP

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWYyM2QzYzRjYjg5Y2ZmZDNkODM3NTY0MjI1OWU5ZGJfd0RKN2loVXdzMXNSSmIzRXpBTng1Y1dCNExoQW5pbE1fVG9rZW46STdRSGJyb0ZibzQ3R3h4Z3ZVSGNoWGs2bnZmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

类比着C语言的库，

can.c是CubeMX自动生成的CAN通信初始化驱动文件，

bsp\_can.cpp是需要自己写的开启CAN通信的代码文件（CubeMX没自动生成的部分，需要手动调用）

can\_receive.cpp里是CANRX0接收中断回调函数的实现，该回调函数里用了一些电机信息数据处理函数，然后还有CAN的4个发送函数。

pid.cpp是pid控制系统核心的数学算法代码

pid\_user.cpp里是调用pid核心代码并进行封装为PID控制器的初始化代码和一些闭环实现代码。

  

2.  #### C++大疆电机库
    
    1.  #####   CLASS的结构与简单介绍
        
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDdkYTg5ZTM3YjZjZDA2NDc4YWIyYmUwNjMzNGMyNzhfY0lZc1VSR1BSYnF6dlI1S2F0Z2dWWnN5TmlZWERHeHBfVG9rZW46SDVjQmJOMWlnb2RmbWl4dVUxY2NRaDdSblBiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

下方图片中是CAN\_BUS类，其中嵌套了3个类。

1.  CAN\_BUS::BSP类，该类中包含两个方法：
    
    1.  CAN\_Start是开启CAN通信的函数；
        
    2.  Filter\_Init是CAN通信滤波的函数。
        
2.  CAN\_BUS::DJI\_ENCODER类，该类里包含三个方法（该类里的所有函数都由CAN\_RX0接收中断回调函数调用）：
    
    1.  get\_motor\_measure是处理CAN通信接收到的大疆电机编码器数据，并处理得到 **电机各个信息** 函数；
        
    2.  get\_moto\_offset是处理CAN通信接收到的大疆电机编码器数据，并处理得到 **电机刚开始上电的角度初始值** 函数；
        
    3.  get\_total\_angle是处理CAN通信接收到的大疆电机编码器数据，并处理得到 **电机角度值** 函数。（暂时没被调用）
        
3.  CAN\_BUS::CMD类，该类里包含四个方法：
    
    1.  CAN1\_Front是给CAN1 **前** 4个电机发送电流的函数；（对应电调ID：1-4）
        
    2.  CAN1\_Behind是给CAN1 **后** 4个电机发送电流的函数;（对应电调ID：5-8）
        
    3.  CAN2\_Front是是给CAN2 **前** 4个电机发送电流的函数;（对应电调ID：1-4）
        
    4.  CAN2\_Behind是是给CAN2 **后** 4个电机发送电流的函数。（对应电调ID：5-8）
        

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDdjYzIyZDgwOWE3MzZjZGVjN2E2YmQ0MGQxNzJjNTNfSjNyMFRSU3VpNjRHbVpNZjFvbE9CWmVTdmZSYzhCYldfVG9rZW46QjlyVWJPV00xb3BzeTh4b0xaV2NZaEZCbkFVXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  ##### CAN\_BUS::BSP类的方法(函数) (在bsp\_can.cpp中)
    
    1.  ######   CAN\_Start 开启CAN通信的函数
        
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzdhZGU2ZDA5Yzc3OTI5NGY4YWY4YzkwMjc0NThiMDRfQjhlMzd3dG9LUGhiZUdXVjhjdU84UlhCbzBTamgwVDJfVG9rZW46RnhPcmJyb3dlbzRJMTF4WEN1d2NMRFBCbjVmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  ###### Filter\_Init CAN通信滤波的函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2NmZDliODYxMjc4OTk5NDdkZjVjY2JmYzQ4MGJiZWVfUkRPUFR0bFprWDVJWHp0Z1IxWVFqRUxoeGVwRWh1eWxfVG9rZW46RG82NmJURVZTb2ZFUFR4d3puMmNkamJ3bmFkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTE3ZWI0N2Y0YTA4YzE2OGRmNGU3NjYzYTBiZDhmNzRfU2c3NE92bjl6Qk5VZlB3Q2ZJV2paUm12cHBhZ2ZBTk9fVG9rZW46R1d5OGJnRTVub1hKR1R4M0N0OGNFWHdIblBiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

3.  ##### CAN\_BUS::DJI\_ENCODER类的方法(函数) (在can\_receive.cpp中)
    

1.  ###### get\_motor\_measure 处理CAN通信接收到的大疆电机编码器数据，并处理得到 **电机各个信息** 函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWQyM2QyYmM0MmM1N2MzMDczODE2MWZmZjljOTZiZGRfcjVQNnh1UWdsMVZZMjRRSWgxTnNMSFFIMnpvWThLTUFfVG9rZW46UjlTaGJhaWZ6b0JVR294OUZOUWNiS0RRbkRiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

2.  ###### get\_moto\_offset 处理CAN通信接收到的大疆电机编码器数据，并处理得到 **电机刚开始上电的角度初始值** 函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjJhZDNhZWRhNzNkZDY0YTgyY2M4MTU5ODkzYWJjYWZfaEdpWWEwNHdxVHlpd1hmRE9wRm15NGNYS1VMMHc0RDlfVG9rZW46V2h5bmJLQzJ6bzhSdFR4Y2hNVWMzaGF4bkZkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

3.  ###### get\_total\_angle 处理CAN通信接收到的大疆电机编码器数据，并处理得到 **电机角度值** 函数。（*暂时没被调用*）
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjQ0MzM3YWYyNGFiMTFiMzYzNTk3OTkwZWNlYTE5NWZfZzZoOHRNSHk2Y0ZtWTI1aElJQnF2TXFwQ0FuUG1kZklfVG9rZW46VW1OdWI1N2Rvb1BPZHd4d1NTdmNWcXJnblFnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

4.  ##### CAN\_BUS::CMD类的方法(函数) (在can\_receive.cpp中)
    

1.  ###### CAN1\_Front CAN1 **前** 4个电机发送电流的函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDZmZTI3MmUzMGU1ZmIxZGZmMTg5ZDQ5MjZmMWU3MjhfOG9NaHZJZHZuRjF1Rnh4dkZKU21ZZE1ydXpBalIyZWRfVG9rZW46T01kMWJzdlAxb3dKT3N4bm92MmNha2J0bmRkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

2.  ###### CAN1\_BehindCAN1 **后** 4个电机发送电流的函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDg1MjgwNGVhYTgwNzAwNTAxYjE3NmRjZjYwYWZkNjBfNmNsTG4yS3ZNMDdxbG05SzBsTFhma2xmdVlINmFlSldfVG9rZW46V28wYWJtc0tOb25JYnd4QUpFRWM1Vk5JbnFnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

3.  ###### CAN2\_FrontCAN2 **前** 4个电机发送电流的函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YmYyYWEwMTJlZDdkZDcyMzA1ZGM0NzcwZjJhYjQ1MTdfR2llZHM1bXltWDdGVk4yUzdCZXBLSGlicnFqdnI0VXNfVG9rZW46VzRrUmJWSzBpb0xnNmx4RWNuWWNERm1abmdnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

4.  ###### CAN2\_Behind CAN2 **后** 4个电机发送电流的函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Njc0OTY4ZGQ2N2Q0OWJlYjUwMDkzYmExYTY5YzUxMzZfSWg4Ukp4eVZRZWFOZGkwOERTYk5taHl2MmU0ODNreDFfVG9rZW46UlAxcGJtcWIwb2t6d1R4djZoYWN6QVhubktjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

5.  ##### CAN\_RX0接收中断回调函数 (在can\_receive.cpp中)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTU1ZDQ2YTQ5YjA1YTBiYTk4MTc4MGQ0NDA5ZjZiMzFfSjRnNVpUVTlCUzloWXFYVE9RSUIzdlpBb1NYMkI4dDNfVG9rZW46SnNuQWJrckcxb2luTHJ4SldDSGNSSXhabk5iXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

3.  #### C++PID库
    

1.  ##### CLASS的结构与简单介绍
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NGNiOWFlNjMxNGZhMjRiYmZkMTMzZjQyM2YwMjllNWNfdlhhQ2FTVld4dmxwN2tTZnRxOU55Tk10aDh1enZ3bkRfVG9rZW46STVtZmJNT1Vob2cxa014REhWcWNOVW9Fbk1iXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

下方图片中是PID\_Controller类，其中嵌套了3个类和一个方法：

1.  PID\_Controller类：
    
    1.  All\_Device\_Init 将所有设备的PID控制器进行初始化
        
2.  PID\_Controller::CORE核心类，该类中包含三个方法：
    
    1.  PID\_Init PID核心初始化函数；
        
    2.  PID\_Calc PID核心计算函数；
        
    3.  PID\_Clear PID清0函数。
        
3.  PID\_Controller::CAN\_MOTORcan电机类，该类中包含6个方法(因为上面3个方法和下面3个方法只是CAN通信不一样，所以只讲CAN1)：
    
    1.  CAN1\_Velocity\_Realize CAN1速度环实现函数；
        
    2.  CAN1\_Position\_Realize CAN1位置环实现函数；
        
    3.  CAN1\_VP\_Dual\_Loop\_Realize CAN1速度位置双环实现函数；
        
    4.  CAN2\_Velocity\_Realize CAN2速度环实现函数；
        
    5.  CAN2\_Position\_Realize CAN2位置环实现函数；
        
    6.  CAN2\_VP\_Dual\_Loop\_Realize CAN2速度位置双环实现函数；
        
4.  PID\_Controller::SENSORS传感器类，该类中包含三个方法：
    
    1.  Yaw\_Realize 陀螺仪IMU的航向角PID实现函数；
        
    2.  Pos\_X\_Realize 码盘定位X坐标实现函数；
        
    3.  Pos\_Y\_Realize 码盘定位Y坐标实现函数；
        

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGI0ODM1ZjE3OTEzMTlmMjVhOGVkN2MwYTM3MTg2NTRfV1pWRDczd05sRnN3cEVwR1B5SFN3cTVxQUFLNUptT2ZfVG9rZW46RVpDcWI5NjYyb0pLRzZ4eG1zY2NrU1pUblZiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  ##### PID\_Controller类的方法(函数) (在pid\_user.cpp中)
    
    1.  ######   All\_Device\_Init 将所有设备的PID控制器进行初始化
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWMwYzBlYTYzM2ZjOGRiZDBiNDhkODA5NDQzNTNjNzVfUDloVVV3UjdDZGZCdDlybDRqRmkySE9leVNuOVU4bjRfVG9rZW46RDBod2JkbkZwb2dmZVd4cmJqM2NQSHVGbk10XzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    

3.  ##### PID\_Controller::CORE类的方法(函数) (在pid.cpp中)
    
    1.  ######   PID\_Init PID核心初始化函数
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2NlY2FmZTdmYjMwNGI0YmFmY2RlMjZjZGU5YTk2OGZfOUVWdldkWUNRMDk2a0hHOE96YlJ2OWJPYUtDNVE0OGtfVG9rZW46UWFzemJaTUNTb0dsMHF4UmluWGNhYW5UbnZiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    2.  ######   PID\_Calc PID核心计算函数
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmQzZGJjYTNjN2U5YjFkNDYzZTA2YTY5YzUxNjdmYTJfZnlNaUJhNkhJSzdrYWZ6M3NxSTNlbmpCajd4TThVeGFfVG9rZW46VzRDTWJaYzU1b3d4Qml4bzUzaWNWTWFibkdkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    3.  ######   PID\_Clear PID清0函数
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDhiMTE4MmFlNjFmZDIxNjQ4NDU1MDhkYmE0OGJjNjRfdFZMU0hKc2M5UjdYc3lSc3hxUjZCemFoeEZyRFdlU3VfVG9rZW46VElja2J6bW1Kb1ZqTEZ4ME03OWNVNlNCbkpnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    

4.  ##### PID\_Controller::CAN\_MOTOR类的方法 (在pid\_user.cpp中)（这里只讲CAN1的3个闭环函数）
    

1.  **注意：**
    
    1.  *一般电流值变量定义为一个数组形式，比如fp32 motor\_current\_target\[8\];这样就成功定义了8个电机要发送的电流值。*
        
    
      *速度和角度位置同理，fp32 motor\_speed\_target\[8\];和fp32 motor\_position\_target\[8\];。*
    
    3.  *C++电机PID库与C语言的电机PID 库有些区别*
        
        1.  *因为电调ID的范围是1-8，而数组范围是0-7，*
            
        2.  *所以为了和数组序号一样，这个地方注意一下区别：*
            
        3.  *C语言库中，i的值为电调ID的值。*
            
        4.  *C++库中，****i值为电调ID值-1。***
            

1.  ###### CAN1\_Velocity\_Realize CAN1速度环实现函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzQ1ZTc0MDkzMDM4YjkwYTQxNjlmOTY3MzcyMzdjNThfd25BbEJXdEFaand3S1FnNE5VdlRUckg2T3UyOG16NmFfVG9rZW46Rk1RZGJVR2Nsb3YzdmV4Vm91RWNpR05lbnFlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  ###### CAN1\_Position\_Realize CAN1位置环实现函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDU4NDhkMzE3MGNhMmI0MmFkYjAwMTQxZDFiNTY4MmRfSThkOVdUalh2eGJITXhsUFVIYlIxc2hXYWE2OHQySHRfVG9rZW46UlVzMGJzTEFMb1p5WFh4cjRDeGNnbzBBbjVlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  ###### CAN1\_VP\_Dual\_Loop\_Realize CAN1速度位置双环实现函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjgyZGQ1YmZhNGJlZDE3MjUyYzZjNTY4MjAwOTg5MzJfQm9VRHg1S0VuUmlOVEZSZ3U0ajl3aFhlY1JWRjRoN0dfVG9rZW46TkFzSmJSeGp6b055MXd4QU9DY2MzV3dYbkFiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

5.  ##### PID\_Controller::SENSORS传感器类的方法(函数) (在pid\_user.cpp中)
    

1.  ###### Yaw\_Realize 陀螺仪IMU的航向角PID实现函数（等你们完善好 陀螺仪IMU的C++库你们再补充）
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTVhODY1NmM2MDlkMzliZmRiNGU2ZjM1Y2QxNWVlNTlfN1BHN21GTEx6azdhak1QMVExenJHY3MxaGZlZXFuNVBfVG9rZW46VVNnbWJTOUJHb0dTeGF4Umg2Y2M2czU1bnJnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  ###### Pos\_X\_Realize 码盘定位X坐标实现函数（等你们完善好 码盘OPS-9的C++库你们再补充）
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjgwYjc1YjAxZGVhOTIxYTE5NTQyMjQ5MWE4YjdhYmVfb2ViM2hQbUhPSUZldEZMRVZteEZDQUIySVpZR1lEZmpfVG9rZW46RW5pUmJBdXZIb2JEYU94d3lPaGNPRkxDblpiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  ###### Pos\_Y\_Realize 码盘定位Y坐标实现函数（等你们完善好 码盘OPS-9的C++库你们再补充）
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTEyNzU1MWUyODFkMmFkZDIyYmYwZmNlZDBjOGNhZTRfb1FaYkpTWmF2VWJHc251ZG12MnIzZUREbHNGY2hhQ2xfVG9rZW46S0pyYmJrUjZwb1N2TkJ4Q1cyQmN6TUFPbmVoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

4.  #### 如何调用？
    

我这里选择每隔1ms使用PID控制器进行一次负反馈回路的控制，并发送一次电流值。

可以选择在while(1)死循环中加个delay(1)进行发送；

也可以使用周期为1ms的定时器中断进行实现，更建议使用定时器中断。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODhkMWRhZjE2ZDdmOTczN2JlZTkwOGZmMTgwZTA3MjJfamRlbTNySTRJTkoySjNkZmhOOTc0dXBDTmQxTzFwSExfVG9rZW46QXpKUWIyUGxUb1g3NGN4dW4wTmNqZTI5bk5OXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

  

### ⑤实物连接，详细的请看说明书

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDU3YmU1MjQ1Njc4ZTYxMDM5ZDM2MTI1NTc5YmM0ZjBfUWxOTUxhTUxMVXM1YmpKRnhHUjBtWEpyZ1VraHFEeWFfVG9rZW46T2VOcGJDYWtab3M0RmJ4U0VBUGMxdzFlbmZiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODA2YmQ4NmVmZmRlMjQxODk1MTVkZmRhZDMwZmU2ODJfYXZGZ254UTQxaFFNckdiaGRMWHNFMEZDZmpvY3NSUmhfVG9rZW46TnF4V2I0aXJvb3J3RFV4bXd6ZGM1Rmx4bjJiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YmYzZTRkMzkxZDFhMDZhNmViODExMDUyN2IxNzQ1Y2RfQ3luZ0VyclFZalROTzZsVTZuN25RSWJOVWo2bzdHRzBfVG9rZW46TlU3YWIxajVKb3VlQ1l4QzB6VmM5eGRFblVkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGE5MDJlODU2MWY3YzY5ZDc0M2YyMTMyY2M0MDg2YzlfSVNHU3RpNnY5Z2NkUGxPTllyQzF2T1FndkZJdVc2OVhfVG9rZW46VVAxNWJnTXZZb2xRMHF4MmZ0a2NTU3p2bmJkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

9.  ## DMA(Direct Memory Access / 直接存储器访问)
    

  

  

10.  ## FreeRTOS
    

1.  ### 理论知识
    

https://www.bilibili.com/video/BV19g411p7UT

**下方只会讲一些常用的操作和注意事项，更详细的FreeRTOS配置请看：(配合着学习)**

[大疆开发板C型嵌入式软件教程文档.pdf](https://sdutvincirobot.feishu.cn/wiki/PVS8wQzRgiTRqpko9l4cEK33nhw)

[STM32F1 FreeRTOS开发手册\_V1.1.pdf](https://sdutvincirobot.feishu.cn/wiki/L40WwB369itdj4kGIsTcOc9cnQf)

[STM32F4 FreeRTOS开发手册\_V1.1.pdf](https://sdutvincirobot.feishu.cn/wiki/VLg4w0oIQi8HHNkVE4CcGs65nue)

2.  ### 常用的内容(下方教程着重讲CubeMX如何配置，理论知识请看正点原子)
    

1.  #### 系统配置
    

1.  选择系统时基源(Timebase Source)
    
    1.  原因：因为FreeRTOS会占用systick，所以需要改时基源。
        
    2.  选择规则：优先选择功能少的定时器。(比如说F407ZGT6的tim6和tim7的功能比较少)
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDhjY2M1NDFkMjJlYTVkM2VjYjYwMmRjYjhhOGI3YTlfYUtqMG1qZ0d2cGZEYU9VWHhNYnZWWWxCVTd2cndVY25fVG9rZW46VjBKcWJ3QjRsb01mQVh4RE9HaWNZd1hWbjZiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    4.  如何选择？（如图）
        

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTUwNmY2Yjk4OWNmYzUzMjUwN2E0NTVmODA5YzMxODNfdlpqekN0ZFdVSjBCMWp4UG9JZzQ4T25IWXR4S3RnQ0dfVG9rZW46WmUxcmI5VGlLb1l4YmJ4b0JSbGNnUmozbktjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

2.  选择接口(Interface)
    
    1.  原因：FreeRTOS遵循ARM的CMSIS标准。
        
    2.  选择原则：优先选CMSIS v1，因为CMSIS v2还有些小问题没解决。
        
    3.  如何选择？
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTMyN2E3ZTdkZWViOWUzMDZjMGM0MDAzYmY1M2EzNTRfYVd4cHJEWDZvbm1LVTdpdXcycVVXclRGMmtnVW85a2hfVG9rZW46VHRSb2I0M3R6bzFrUnR4UU5lMGMzSVJMbndmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
3.  配置Include Parameters
    
    1.  功能：与hal\_conf.h(用来开启HAL库的一些功能)一样，用来开启FreeRTOS的一些功能。
        
    2.  Include Parameters的配置
        
        1.  CubeMX配置(推荐)
            
        2.  需要什么功能就Enabled对应的功能即可。（常用的就是vTaskDelayUntil）
            
        
        ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTUwMDI1MzViYzVkNjBlNmUzODIzOWIyNjk3ZWIyNjRfUnp2Wm9LZGtnaWdGdThSa1h4d3BGeFdheUV0RmVtaThfVG9rZW46VEkxdGI1b0tnb3E1V2J4OTFGemNJWVptbmVkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
        
        4.  手动编辑头文件配置(不推荐)
            

  

  

  

  

  

2.  #### 创建任务
    

1.  CubeMX创建任务：
    
    1.  各参数介绍(详看大疆手册)：
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2JiZDc4MmU5ZDNjMWMxNWJjMjRjNzc3NmUxOTkzM2FfZmQ4MWs3UXJZZkoxWkxhTGhFTklpSzE4VGhuZm5idEFfVG9rZW46SGFHQWJTVWVubzdUQTV4VU8wT2M4VzJlbmY5XzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    3.  一般选择什么参数？
        
        1.  Task Name(任务名)：英文大写(与Entry Function对应)
            
        2.  Priority(优先级)：一般选择普通优先级即可(除非有特殊的逻辑)
            
        3.  Stack Size(栈空间）:128 Words即可
            
        4.  Entry Function(入口函数名)：英文小写(与Task Name对应)
            
        5.  Code Generation Option(代码生成选项)：无脑选择As weak(使FreeRTOS线程任务的入口函数以弱函数的形式生成)
            
        6.  Parameter(参数)：一般NULL即可，如果要用一些特殊功能(比如信号量)，要填一些句柄(比如信号量的句柄)
            
        7.  Allocation(份额)：无脑选Dynamic，让FreeRTOS动态分配管理即可
            

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjQzMjI4NjMyZWZiN2NhNDYzZTBjOWFkYzI4OGZiODRfZzJVOWZ6OEY1SkVSWTdwd2hCdHNjNlRDT1h6N3l6bkNfVG9rZW46STlRbWJoNXptb3dmYTV4bUNVUmNzZmRwbkxmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

  

2.  注意事项：
    
    1.  任务创建太多会内存爆掉
        

  

  

3.  #### 延时
    

1.  相对延时
    
    1.  函数：以下这俩函数作用相同，osDelay()和vTaskDelay()
        
    2.  时间：是从调用该函数才开始算，直到延时指定时间结束
        
    3.  调用方法：与HAL\_Delay()方法一样
        
    ```C++
    extern "C" //若在C++中运行需要加上该行
    void green_led_task(void const * argument)
    { 
        for(;;) //等同于while(true) 
        { 
        HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_RESET); 
        osDelay(500); 
        HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET); 
        osDelay(500); 
        }
    }
    ```
    
2.  绝对延时
    
    1.  函数：
        
        1.  获取当前时间：osKernelSysTick()
            
        2.  绝对延时函数：osDelayUntil()
            
    2.  时间：从任务开始就开始算时间了，将整个任务运行周期看成一个整体，适用于按照一定频率运行的任务
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTY0ZDZlY2EyZGIzYzBlNjcxMmUyY2RiNTczMzU1OTVfdUZRT1h4eFhkRk1tSk13ZHB5VU40TUpDcVBiVnFacVVfVG9rZW46SkhLY2I5eUp2b3p1eUV4SFRybWN2aXFjbjJiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    4.  调用方法：
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjM4ZTVkNTI1NTZkOWQ1ZGMxZGI1OWE3MDFhODNjY2FfWGxPenY2UERXQjFNQXpXa3RMSHhmTFh2RG11ZTBJbk5fVG9rZW46UkNMSmJFNmhUbzJ0amN4TGVDMmNPWVNIbkVoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YTcxODEyYjllNTdiYWU0ZDhmYjhjNTJlOGMzNDQ5ODVfWEwwanluYnpYOHN0M0ZBckVGYlpFamNSUDFQc05EWDJfVG9rZW46SGdGWWJGSkJFb1Mxak94d2JFT2MzbXg3bnFmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    

  

4.  #### 任务状态转换
    

1.  FreeRTOS状态(详看大疆手册)：
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmM3ODVlMDNlMDVhMGMxNTc0YjIxMmY5MzA2ODcxZjFfeTNSeGJ4bmZ1TDdCRXFZR2VSSTlMV3VVTkdmMkFXdHBfVG9rZW46VnNoQ2JaVG9Mb1V0aTJ4OXFpTWNhV2NhblhiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  函数介绍：
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NGVjODE4ZGM0OTdkYWRlYWVlOGNiZDExN2U0NjkzYjRfdTJ3NEs3aWJjMEwxNUppUXJxVUFnY0czUWJnSXFHNlZfVG9rZW46QkJxcWJib2gxbzJiTDB4ZzBYcmN1c055bmdoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  如何调用：
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NGMzZWRjNGM3ZjQ0ODY0OTA3MDBiZmJhYmI1ODYyN2VfYk1kM3VIMmQ0SmcyalV0anA0TUczMXdJVUh2MUlVTUxfVG9rZW46QmdrS2JMdFo0b05Dekt4RVB0NGNkeFJobkFmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

5.  #### 队列
    

1.  原因：全局变量在多线程里是不安全的，多个任务对该变量进行操作时，数据容易受损。
    
2.  队列：队列是任务到任务、任务到中断、中断到任务数据交流的一种机制(消息传递)
    
3.  具体内容：详看正点原子视频学习理论知识
    
4.  调用
    
    1.  CubeMX配置：(Queue Size选择你要传的数据的比特数(即二进制位数)，Item Size选择数据的类型)
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2YxODFiMDYwOTU1N2U0YWVmN2YxYjQxNTIyYzg1OTNfeHhaazJOSHdmYW9pUDN6RnhwTVhvQzNXS0p6RXZ1QUhfVG9rZW46SFFCUGJxeWFmb0lXWWl4bG5hcmNoZUxJbmJmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    3.  调用(详解请看正点原子)：
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWExNWQ2MzY5NTA3MzhjNmY2ODdiMWM0MzdlY2M4MjlfSTVOczRNdnJPZEwxUm9yd0oyUElINjZoRkIzTWlEeW5fVG9rZW46WEtFUWJNbE5Ub1FJYWh4QVA2YWNYYlZFbkxlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTA4ZWE2NWU3OWZjYjI3MjgxNTQxYTkyYThlYWUwMzRfWklUa0JwdDNvRHJyV21XM1hpck93VDJKWmpVS0dWaWZfVG9rZW46TUt5emJwQVdkb3QzNEd4TDB4d2NEWjJTbmVjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2IxYzFhNzRjYjdhMjM0MmM5Zjg2N2Y0NDllNGFhZDRfc042dkZsdlllaHBGYW1Ra1JqNTJvQzd1RU12UjRBdzBfVG9rZW46SGFzTmJ1SjRkb1BheVJ4bzFBamN2VkFMblFjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ODNlNTAxMzJiY2JlYzAyOTc5NjkwMTExZWY2OTkzODlfYkdjM3IzUWp3dmp6bHllOFBvQ1VOUmNRM01VTE1KZlFfVG9rZW46SDBuVWJJWFZhb1BjM2p4b1diamNxZFBObjVkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

  

6.  #### 信号量(队列的特殊形式)
    

1.  原因：同队列
    
2.  信号量：一种特殊的队列，是一种解决同步问题的机制，可以实现对共享资源的有序访问。
    
3.  分类：二值信号量、计数型信号量(详见正点原子)
    
4.  同步问题：A做完一个事情，通知B，B才可以做，这叫同步问题。
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MThiZDVjNTA0ZDNiMzhhZDQxOWY1YTZkZjAwYTYxNjhfZGF3RU8zS1ZDcXJBbkFRTTNNWXVoSmNEcHc1dUxmZDRfVG9rZW46T0Q0VWJIVWE2b0I1S2N4VFJRa2N4dXcwblRkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

5.  信号量简介(详见正点原子)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Y2JjYWQ1ZDk1ZjJmZjJhMDVlNDAwMWU0ZDkyNDgwYmRfZjFuRFdhRjZyQ2VMTXg2R2VQakRTNk5Cc2FiR3E0YTVfVG9rZW46WG9VTmJyWEtCb2RmMmt4OUN1YmN5cEFjbkdiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

6.  队列与信号量的对比
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTFlOGI5ODI4YzVhZGU4NGFiMzBjYmM2NjZiZDc4YThfd2ZJYXpHWWhGMW5NZ0xwQWVkOHBKbVpGR2E3SndOYkNfVG9rZW46WExQM2J3bGpmb1FUbTh4T0lLdWNSTThRbkNiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

7.  二值信号量介绍：
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NzAzZWMwZGFjY2NiZDA1MTZiMGJhYWU2MmM5ODg3ZGZfRGVtV2JKU29JTzVVY0dsOVdPUjBzSXN3NUVQU0hsUGVfVG9rZW46VHRLN2JXbU1LbzU5R1d4eW50NmNhZUF2bjRjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

8.  CubeMX配置
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Yjg4M2FiMTg3OTg1NTY1MTE2ZGRkNjVkNzc4ODgxMmZfbjlTZGloSnZlc3RNZ2pxck1ibzJTbGZpV2F3Vm1TM0hfVG9rZW46VmpJY2JOb3dBb1RNYkl4ZjZPa2NDYmdmbkJoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTNlMTg1YmExNjVmMWVhZWM2NzNlMTEwYzkxMDRiMThfc2U3N0xPVXkyVTBNVE5Ud1ZXZ05Ea3lIZ2ZiQzVHZGhfVG9rZW46WG9QY2JybVNDb0VxaFN4RGNTU2NMS2tlblliXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWNmYTg0Mjg0MDkzNjUzYzY1NzZiZWExZTczMTNhOWZfdVdLUWtvNFp0VndPUlNuQ2dhQkw4MTgxcXpSUjE3b2JfVG9rZW46TW05M2JFcGozb1dkUmJ4VVNoNWNJeWlFbjV2XzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

要把创建的二值信号量的句柄传入任务的parameter参数里。

其实设置为NULL也可以。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTQxZTc5OWQ3ZTAyMjUyYzA2NTViNjJiYzVhMjBjZTRfZG53aTd6QWl1a1BCYmNsSDA2T294aUFBbGZUbkVyUkhfVG9rZW46UjROb2JQT1dQb2V3dWl4U2g5dmNONHg3bkNoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

9.  调用(详细API函数作用请看正点原子)
    
    1.  释放信号量函数：xSemaphoreGive();
        
    2.  获取信号量函数：
        

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjU5NDliZTYyNTk5M2QzNGJmNjZlNzI1MWRiOTlmZGZfcEtBcVBrVW5aMnVNS2JvOW9JRW5CcnNCN0xIVTllam9fVG9rZW46UmFlMmIybG9Rb1dia0N4OWFQOWNOcnI4bjhnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTBkZDhmOTE2ZWM0ZmYxNzBkYWU1NzRmYjljYjRiZDJfM3JoSnVwdEtzSDl6aVBmVm9FbnZUZlRYYk1ZekUzaVhfVG9rZW46Um9udmI5WUhkb0lSUHV4MVN0VWNJUGZ6bnVlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjlhMGQ2ZjNmM2Q3ZDFiM2FmODBlYTExNTdiZjQ3NGNfcG9Sdm5LOU45WWxZaVpjR0Naa0U2eDNRREM0dEJWb05fVG9rZW46WGtGU2JHM1JSb1NkQjJ4WmtUVmNFZzNTbmdoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTFiNGYyNTk4MGMyY2I5ODk2YmQyYWZhMzkwZmY4OWZfcDhMQXNRVm1QZmEwSVNRYzZycThvQVJiNXhHUnpnOGNfVG9rZW46WFRvMmI3aDExbzFaSWd4cFBId2NLNVZkbkdoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OTdjZmNmZGQxZTBiZDc2NTAwOWNhY2UxYTEyODQ2NDFfeHE0ejBVYnI0Vk0wUjV2QTRtc3FRN1RWRUhVcjNYRXFfVG9rZW46VDVaemJyb241bzE4aUd4dURGSWNaVFRYbkZlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzVhOThlZWU1NmUyMmZkNmUwYmVkYjZmN2MyMGIyNWRfWnNVcTlTc0pidlBWdzBxekdhdUhVWjBGTlVqbUtrZXpfVG9rZW46SzBPWGJSYkNJb04wSmh4c1c0amNXaDlxbmxmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

  

7.  #### 内存管理
    

1.  ##### 简介
    

**栈区（stack）**：由编译器自动分配和释放，存放函数的参数值、局部变量的值等，其操作方式类似于数据结构中的栈。

**堆区（heap）**：一般由程序员分配和释放，若程序员不释放，程序结束时可能由操作系统回收。分配方式类似于数据结构中的链表。

(详细请看[Vinci机器人队C/C++资料](https://sdutvincirobot.feishu.cn/docx/N0GAdx6IDoqnRnx1q0TcX1Wfnvc))

2.  ##### 修改stm32的栈区和堆区大小
    
    1.  ######   stm32本身的堆区和栈区大小修改
        
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWIxYzUxZDg2MDI0ODcwZGM2YTZiZWQxNTc1N2U5OTdfSjVPVW54dE5GR2R2ZEJBWkY2d1FTaklSMEhNRjlEZXpfVG9rZW46R01iWWJIU1lIb2o1NW14bG9KUmNkZndEbnZlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

如上图，

stm32一般内存总大小为20Kb。

Heap Size就是堆大小，为512byte = 0.5Kb。

Stack Size就是栈大小，为1024byte = 1Kb。

剩余的其他部分的内存，分配给剩余的区，其中大部分内存都分给了Static静态区。

使用CubeMX生成工程后，可以在启动文件中看到咱们设置的堆区和栈区大小地址。（当然也可以在这里进行修改，不过建议直接在CubeMX上进行修改，一般没啥需求也不用改。)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDExNTdkMzAwNGY0MThjNzk2ZTFkMGZhZTMxMmJmNzBfMEdPWFNTM2JxVUlyRHN2cVlTbEdGaXhQNnN2MnJiQkNfVG9rZW46UEhuTmJrWTBKb1BhZDR4Znc3cmNzT3labmNmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTNhNDc2YWIwNWNkYjQ4ZjFkZDE2NTNkZGJmYTU1YTBfc3U5SmQzTHNURTJqa1RHMVQyTnRFV1lZMFhOQWU0WkJfVG9rZW46WnBNcmJta1pmb1VHZzh4cTV1SGNVNmRwbkhhXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OGM1MTNlYzNjYzBmMzc3ZTg3ZDRiMDkwZGFlYThmNDdfR3djNnQ2N2luMUtFN1lvWHlLOTBTWFZnS3FQQ2xuYzlfVG9rZW46Tkg2VmJ1WkpPb2dncHh4QjAxaWNDOWxubmNkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  ###### FreeRTOS的堆区大小修改(此堆区非彼堆区，请看下方介绍)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWJkOGU5YWFkMjQ0Y2FiNzQzODk2MTBmNDRhZGRhOGFfZlgxSkFMcFRueVduUHd3cVpQNXU3V1loZE81azRybkVfVG9rZW46UU5KemIyMDRIb0RBME14SVpLb2M5SXBHbkxiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

1.  TOTAL\_HEAP\_SIZE：如果使用了FreeRTOS，可以在这里修改FreeRTOS的堆区的大小。
    
2.  memory management scheme：可以修改动态分配内存的算法，一般都使用heap\_4算法。
    
3.  FreeRTOS\_HEAP这里的堆区，非彼堆区，而是FreeRTOS从stm32的ZI区中开辟的内存(可以这么理解，其实是FreeRTOS的内核在data,bss,heap,stack等中抢的内存)，而并非从stm32的Heap堆区开辟的内存(在当你选择heap\_1,2,4,5算法时)。如果你选择的是heap\_3算法，那么将会使用C库的malloc()和free()函数进行开辟堆区内存，这个时候，FreeRTOS就是使用的为stm32的堆区(32的堆区比较小，所以不如heap\_4算法)。但是咱们一般都使用heap\_4算法进行内存管理，所以这里的***FreeRTOS\_HEAP是从stm32\_ZI区分配的。(也就是FreeRTOS\_HEAP并非直接从heap区申请，而是非常灵活的在RAM中进行申请，可以超过STM32\_HEAP的大小)***
    
4.  因为我们使用的是heap\_4算法，所以我们不用对stm32的heap和stack进行修改，只需要对FreeRTOS\_HEAP进行修改即可。(也就是对FreeRTOS可操控的stm32的ZI区内存进行分配)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWJiOTFhNDA3ZTUyM2RhNTQ2NjZjMmFkNDY4ZjcwNThfUzkzeGlLOUhHRmFmekpBeDRCMHQyUVVYTmVWZWdXVkxfVG9rZW46UXljZWJ3ZE5VbzZCVXR4aE42dmM0UTN6bjFlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  ##### 内存管理API介绍
    

1.  ###### C语言库的内存管理API(不建议)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmFjNWU4MWUxNTgyMDFiZTY4N2M5ZTZjNTNlMzMxNWFfZ3Q1RlRWbDRYQ0NuRjJ6M3BDSFk3MUppNXFRcEFZRTJfVG9rZW46WkZXcWJGa1B1b3hyMWh4R3NDVGMycUNrbnVnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTk4NGI5MDE2ZGEwMWI5YmM0MjBjMWM5ODgxMmQ4MGVfUTh4SDlldlpSVUR0WHptbDRUNzhNS1lEWGYwYnJoY1ZfVG9rZW46T0FIV2J1eVRYb0lxRWZ4S3hnVWNMTDIybjJSXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  ###### 正点原子分块式内存管理API
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=N2MxMjZjMzk1MTUxMzE3ZmE1NzY4NmM0MjY3NmM2NWZfS3hWdldCc1RyQ21kUUNSdHJtYk9GcUlKZW1XVFVvQzFfVG9rZW46VlVwQWJiRXdQb1BBOUN4MVNaM2NGVDIwbndmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjUwY2ViNGMwYzAzNjljZDBiMTcyODZhZjlmNmVhZjJfUDlSOUczOXFQRTB6YlBuRTFYT3dock9STTU2dE0wd1FfVG9rZW46TXlVQWJITk0zb0ZQcW94VWFzSGNQOXAwbnFoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

memx就是指内存块，内部的SRAM和外部的SRAM(外部的不一定有外部的SRAM)。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTk2ZmJmMzNkOGRhYTU0MjNiMzhjZmI0MjhhOGI1OGRfZ1JhYUJWUkk3MEp4UVZSRVJSV0JaY1RwZUtIRUFOdGtfVG9rZW46RzhLUGJHMDltbzl3RkZ4N1lWcWNxcHBjbmZlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MWUxMjcxZTFlZjU1ZmY2M2RkZDJlNzVlMzUwMjExOGJfdWpudkJMMThTdjJudGN1MmdEa3dhZ2lWdUJDN09EQWVfVG9rZW46TGgyNWJyc3A2b09WZGx4ZHozcWNscXpFbmdnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

3.  ###### FreeRTOS内存管理API(建议)
    

1.  介绍
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjFkNWNhOTM1MDllNjkwYjMzN2EyZGJjZDJiYTVhYWJfQkdJTkdUN1VNZDFnSVI4djdWOXBKMzBnUU42Q1JSY1JfVG9rZW46TWRmMmJjUnpnbzMwV2p4aFNnaGNUYmZ3bnFiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MjBmYTZhMWJjYTdiNWFiZjk4Y2E4ZDQwNDI5Y2ZmMGFfSWs5ZU9DbVBpVTdrUHFVSGZNbmJxYzVFUzc4SGNjZU1fVG9rZW46V2pXUWJma0w4b2xoNEN4alFjNGNtb0x3bmloXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  FreeRTOS内存管理算法(我们一般选择heap\_4)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjE3ZGUyNWI4NGYzOTk3NTk0MzZmZmVhYzI1YmI2NzdfQTVGS0FvYWxEUmZJQlRPR2cyYXhUa1Zjck16SmZNVThfVG9rZW46RmFIWmJhdE1Vb1Vnc0F4bnpESWN6TzZsbkVmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjhmNjMxZDI1ZGZhZTgyNzZmNTBmZDY4ZjEwN2I3NThfNGhwb2JGTGthRnVCSkJNcHVpY2JwRVpWZDV5T3B3R3VfVG9rZW46V2VNemJOZGdjb1pDM0V4WmdTdWNzY1FVbkpkXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

heap\_4的first-fit算法是从堆区内存起始地址块开始找出第一个适合的内存大小。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NmY3NDlhYmNjMjdkNTRmOWUxM2M1OGFlZjg3NzgyMzBfeUN4SFlRZTh1RlpSVkZBeXg0ekVpRFh6ekxSRTRBSU5fVG9rZW46U0ZqZGI5anZEb0puaWN4a0doSGN4OWFjbjdnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  FreeRTOS内存管理API函数
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NjYwZTNjYTAwMGU5NWMxNmEzNTM5YzBjNTgwM2I5ZGJfQ0NmeDh4T0Z1YXRCVmxFVllrVzNMTEt5YXBTSHlBdXlfVG9rZW46RDdsMGJUWEx3b3ptcUt4dHRvQWNCYTQwbjJjXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MGM0Y2JmZWQ0YWYzMzlmZDk5YTIyZTA5MmE4NDY0MThfcFQxTHFjNWNqQ3hiTEJNNDk0RVg3ZHZwZzh0VE9HUUpfVG9rZW46Skt0YmJWVGJnb1MybHR4RFlBcWMxelJEbjljXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

可以通过看上面代码，就可以得知，申请完内存再释放掉内存后，空闲内存数会还原。

但是，可以看到，此时我们分配的是一个4字节的内存，但是他扣掉了16字节的内存，这是因为字节对齐的原因，FreeRTOS选择使用用空间换速度的方式进行字节对齐。

  

  

11.  ## FPU浮点数计算加速
    

STM32由于主频比较低，所以运算浮点数运算会非常慢，目前有下列几种办法可以优化sin，cos这种大型浮点数运算。

1.  ### 检查是否支持
    

<!--br {mso-data-placement:same-cell;}--> td {white-space:nowrap;border:0.5pt solid #dee0e3;font-size:10pt;font-style:normal;font-weight:normal;vertical-align:middle;word-break:normal;word-wrap:normal;}
| STM32 系列 | CPU 内核 | DSP 指令 | FPU 类型 | arm_cos_f32() 性能 | 适合的计算 | 建议使用的函数 |
|:---|:---|:---|:---|:---|:---|:---|
| STM32H7 | Cortex-M7 | ✅ 支持 | ✅ 双精度 FPU (DP-FPU) | 🚀 最快（硬件加速） | 高精度计算、机器人、滤波、导航 | arm_cos_f32() |
| STM32H5 | Cortex-M33 | ✅ 支持 | ✅ 双精度 FPU (DP-FPU) | 🚀 最快（硬件加速） | 高精度计算、滤波、AI 计算 | arm_cos_f32() |
| STM32F7 | Cortex-M7 | ✅ 支持 | ✅ 单精度 FPU (SP-FPU) | 🔥 很快（硬件加速） | 机器人控制、导航、滤波 | arm_cos_f32() |
| STM32F4 | Cortex-M4 | ✅ 支持 | ✅ 单精度 FPU (SP-FPU) | 🔥 很快（硬件加速） | 机器人控制、数学运算 | arm_cos_f32() |
| STM32G4 | Cortex-M4 | ✅ 支持 | ✅ 单精度 FPU (SP-FPU) | 🔥 很快（硬件加速） | 电机控制、滤波 | arm_cos_f32() |
| STM32L4 | Cortex-M4 | ✅ 支持 | ✅ 单精度 FPU (SP-FPU) | 🔥 很快（硬件加速） | 低功耗计算 | arm_cos_f32() |
| STM32U5 | Cortex-M33 | ✅ 支持 | ✅ 单精度 FPU (SP-FPU) | 🔥 很快（硬件加速） | 低功耗 AI 计算 | arm_cos_f32() |
| STM32F3 | Cortex-M4 | ✅ 支持 | ❌ 无 FPU | ⚠️ 较慢（无 FPU，仅 DSP 加速） | 电机控制、信号处理 | arm_cos_q31() |
| STM32G0 | Cortex-M0+/M4 | ❌ 部分支持 | ❌ 无 FPU（部分 M4 版有 SP-FPU） | ⚠️ 较慢（软件计算） | 基础控制 | arm_cos_q31() |
| STM32F1 | Cortex-M3 | ❌ 不支持 | ❌ 无 FPU | 🚫 最慢（纯软件计算） | 不推荐做浮点计算 | arm_cos_q31() |
| STM32F0 | Cortex-M0 | ❌ 不支持 | ❌ 无 FPU | 🚫 最慢（纯软件计算） | 不推荐做浮点计算 | arm_cos_q31() |
| STM32L0 | Cortex-M0+ | ❌ 不支持 | ❌ 无 FPU | 🚫 最慢（纯软件计算） | 超低功耗应用 | arm_cos_q31() |

  

2.  ### 开启FPU
    

浮点运算单元（FPU）是一种用于执行浮点运算的结构，通常由电路实现，应用于计算机芯片中。ARM设计的M4内核及更高级的内核都支持FPU，也就是STM32F4系列及往上。**（也就是STM32F1是不支持的）**

STM32F4/F7一般有单精度FPU，而STM32H5/H7，一般有双精度FPU。

**STM32F4开启FPU和不开启FPU往往会有****数十倍甚至上百倍****的差距。**

使用STM32CubeMX生成工程，会默认开启FPU，如下图。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YmEzMDgwYWU4N2I2MmJjNDE2MWFiYWY0MDYyMmQ3MjNfTVVGYmxRSzNLM1ViTnlhdG1VQ1o0R1FRM2Rzc00xZzhfVG9rZW46VHQ2YmJ6TXNBbzYxNk14bVo5Y2MwRnMwbjJmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MzBhZGVlYWY3NGE4OWQwNTFmY2EyNjcyMjJjYzY2NzFfSDNXajNCa05SV25Ea3ZEV2JmTDFHbDFjMDg5Q1pxUUpfVG9rZW46VEU5eGJjVXZUb0VqQ0F4UExLeWN1MTJRbktmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

如果你使用F1的话，会压根都没有这个选项，代表M3内核不支持FPU。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjlkNGE4YzY2NjdhNWVkZWIzOTA0OTFkMTNhMGFkMTZfcGlwTmVKZ0lRRFR3ZmVTajVqWkIwY3ZLZmNycnVsRUJfVG9rZW46RmJ4V2J4YkRUbzV4cEp4M0tlR2NCdFhQbkFoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

下面这张图可以从源码看到开启了FPU。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YzFkNWZiODI3ZDY3M2ZlNDFhNDRhNjlhMzA1NzEwY2NfZXRENVBuVVFFWDQwRVRxc0JjbGpzaXROUW9qVDZNRlFfVG9rZW46SUlPYmJoNWJGb2ZYdHh4aDlDZ2NhZno5bnRiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

3.  ### DSP加速
    

DSP加速是指CMSIS-DSP库进行三角函数算法优化，使计算速度加快，但是误差会变大一些，不过对于99%的应用场景误差够用了，大概是1e-6单位的误差。

DSP库只适用于ARM的Cortex-A和Cortex-M的内核，也就是适应手机，ARM单片机，树莓派等等的设备。

**对于STM32单片机来说，基本覆盖了所有STM32系列，所以都可以用。**

假设你没有FPU，比如STM32F1系列的单片机，也可以通过DSP库来加速三角函数运算，这个DSP库的是通过查表+插值的数学运算方式进行优化的，计算也是比较快。

<!--br {mso-data-placement:same-cell;}--> td {white-space:nowrap;border:0.5pt solid #dee0e3;font-size:10pt;font-style:normal;font-weight:normal;vertical-align:middle;word-break:normal;word-wrap:normal;}
| 平台/库函数 | CMSIS-DSP | C++ std::cos | C math.h |
|:---|:---|:---|:---|
| arm_cos_f32 | std::__math::cos | cosf() / cos() |
| Cortex-M4/M7（带FPU） | ✅最快（查表+插值） | ✅比较快（完整计算） | ✅比较快（和 std::cos 相近） |
| Cortex-M0/M3（无FPU） | ⚠️比较慢（查表+插值） | 🚫最慢（软件浮点） | 🚫最慢（和 std::cos 相近） |
| Cortex-A（如 Raspberry Pi） | ✅可能更快（查表方法） | ✅更快（用 SIMD/FPU） | ✅更快（glibc/libm，SIMD 优化） |
| x86/x86-64（PC 端） | ❌不可用 | ✅最快（硬件加速） | ✅最快（使用 FPU 或 SIMD） |

所以说在STM32上跑还是建议用dsp库的函数。

  

1.  #### 安装并使能DSP库：
    

1.  方法一（推荐）：使用CubeMX打开
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWJjYjhjODcyZjFiMDVhOTkxYTAzMzUyMjlkZjk0ODlfUG02ZUZraTMxV3I4eDYxbmFDc3VFd2NEM3BYekdjOGFfVG9rZW46VTVFa2JCMXpnb3lNR0J4TFBYamNtYTR5bkhnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NTc5NGViNGQzNjc1YmM0YTM3ZDdmYmU4MDc2YTk5ZTRfNHFNd2ZENmdlZ2hseERCM09NSUJMYUtsbW94NWVHdnZfVG9rZW46Q0dwN2JVNnprbzVqTFJ4enoyaWNEQnR2bnNlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

然后使能DSP库

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjY4ODkwMzIzMjBiNWE2ZWJjNTliNGY2ODdlNThiOGFfM2ZpY3dFYUlpSUxxdjBPbW5xYnVkSEc3MEc0NnRxWWVfVG9rZW46T3RXTmJIUGhnbzlaOTR4bFdxdWNNdldRbkllXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

生成工程后，可以通过MDK5或者MDK6看到我们生成的lib。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTQwMDFhNTc5NjQwNzEwOGNhMjk2MjlkZTZjNTNhNDVfMDVYYTZ4aEJvSXY4TkhFdmdZeUtlSTQ2dTdNbXJ3UnRfVG9rZW46UGxza2JrRnJNb2hrcDV4VlVwS2NNNUNQbkVnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YThiZWM3OWU5YmM3YTIwYzFiZjNhYmI0NjZjN2JmMDZfenNCUkNzOVFSdkRQZnJCNFdkSTVNbFMzbkk3SXFzWTVfVG9rZW46U0pxTWJ6WlVab1Vlakx4Tzg5ZmNlMENvbkVlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=OWZmZDc3NjFhNzkzNmNmN2ZiYjJmMzFiZTQ2Mzk3YzNfSTR1R2liUVV3MUZyMVNkcHQ3ZkRVNEJyMElWNUhJdElfVG9rZW46RzNudGIydGc5b2pmQWl4ZHM4ZGNMeVY0bnhnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

2.  方法二（不推荐）：使用MDK5打开
    

这种方式会使编译时间增加至少200%.

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NDk4NTk1NDMwMTk4M2FlNzlmNTFiOWU3NDJmYTMwN2NfVDJJNGh5ZHNiWEhYTTc1NlZldWlCS3BSeURqOFNHWDVfVG9rZW46VEFhUWJna3pYb01pcHV4QzZEbmNpWGxKbmFoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

  

2.  #### 函数介绍
    

ARM内核的CPU支持 CMSIS-DSP 库的三角函数，这比标准 `math.h`、`cmath` 的函数更快。

1.  普通的C/C++三角函数库：
    

下面是普通的重载三角函数，当我们开启了FPU后，只要传入的是fp32的类型，其实速度也是相当快的，可以不使用DSP库也可以。

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjY3YWRjZjU1YmJmODViYjA1Zjk1MmZkMmNkNDM5OTFfbmxRTHVYTFYxaG1xdGNZR3FtZ0ZsR3h2djVMaVcyM0JfVG9rZW46T20wNGI5VERwb3dKb2l4bEZQb2NCblJUblVFXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

```C++
#include <cmath>
// 更新机器人的位置（假设机器人沿着x轴移动）
this->x_position += this->vx * std::__math::cos(this->yaw) * this->dt;  
this->y_position += this->vy * std::__math::sin(this->yaw) * this->dt;
this->y_position = - y_position;
this->yaw += this->vw * this->dt;
```

2.  DSP库函数：
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MmRhNWJjNzk5NDE0Y2JjNGRmZDlkMDliN2EyNzMwNmVfNDVRMnhJWmNWaVFWOG96YWZ1dmFndkZaWlNvZGh0akRfVG9rZW46RVNpd2J5VHdwb2xuUmt4VTdBUmNzdUlZbnNiXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=Yjk5MGZiNmYwMjUzYWQzY2I2Y2FkYzAzZWRhNWJiZmFfYUdsc2JCVm5QWDBTcTRldWRUZVE5bDV5T2RxOWJuc2xfVG9rZW46VXd4M2JtSEQxb2VCaWN4cGg4WmNuNnJHbmZmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=NWQyMjE1YWM3OWVlM2UyYzIyNmU0OTA2NjIyMzQxZTZfUmNaREhaUGdQb1I2TGFVTXZEcDZmd2tTUWlTWVNzQ1ZfVG9rZW46RjRLQmJ2WHRLb0NjY1d4RnJ6MmNpUE1tbkVlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

传入fp32的值。

```C++
    // 更新机器人的位置（假设机器人沿着x轴移动）
    this->x_position += this->vx * arm_cos_f32(this->yaw) * this->dt;  
    this->y_position += this->vy * arm_sin_f32(this->yaw) * this->dt;
    this->y_position = - y_position;
    this->yaw += this->vw * this->dt;
```

3.  #### 性能对比
    

<!--br {mso-data-placement:same-cell;}--> td {white-space:nowrap;border:0.5pt solid #dee0e3;font-size:10pt;font-style:normal;font-weight:normal;vertical-align:middle;word-break:normal;word-wrap:normal;}
| ✅ 对于有FPU的单片机 |
|:---|
| 函数 | 数据类型 | 计算方式 | FPU 需求 | 计算周期（STM32F4 @168MHz） | 相对速度 |
| 重载函数std::__math::cos(x) | double | C++ 标准库 (泰勒级数) | ✅ 需要 FPU | ⚠️ 80~100 cycles | ❌ 最慢 |
| float | C++ 标准库 (泰勒级数) | ✅ 需要 FPU | ✅ 20~30 cycles | ✅ 较快 |
| cosf(x) | float | C 标准库 (泰勒级数) | ✅ 需要 FPU | ✅ 20~30 cycles | ✅ 较快 |
| arm_cos_f32(x) | float | CMSIS-DSP 逼近计算 | ✅ 需要 FPU | ✅ 10~15 cycles | 🚀 最快 |
| arm_cos_q31(x) | Q31 | CMSIS-DSP（定点） | ❌ 无需 FPU | ✅ 约 50 cycles | ⚡ 比无FPU快 100 倍 |
| 查表法（LUT） | 预存数据查表 | ❌ 无需 FPU | 🚀 <10 cycles | 🔥 最快（1000 倍加速） | 🔥 比最快还快 |

除了`arm_cos_f32`，还有其他的一些`arm_cos_q31`函数，可能更加适配于F103这种低端芯片，可以进行自由选择。

<!--br {mso-data-placement:same-cell;}--> td {white-space:nowrap;border:0.5pt solid #dee0e3;font-size:10pt;font-style:normal;font-weight:normal;vertical-align:middle;word-break:normal;word-wrap:normal;}
| ❌ 对于无FPU的单片机 |
|:---|
| 函数 | 类型 | 计算方式 | FPU 需求 | 计算周期（F103@72MHz） | 相对速度 |
| arm_cos_f32(x) | float | CMSIS-DSP 逼近计算 | ❌ 无 FPU 需软件仿真 | ⚠️ 4500+ cycles | ⚠️ 很慢 |
| arm_cos_q31(x) | Q31 | CMSIS-DSP 定点查表 + 插值 | ✅ 无需 FPU | ✅ 约 50 cycles | 🚀 100 倍加速 |
| 重载函数std::__math::cos(x) | double | 标准库软件计算 | ❌ 无 FPU 需软件仿真 | 🚫 6000+ cycles | ❌ 最慢 |
| float | 标准库软件计算 | ❌ 无 FPU 需软件仿真 | 🚫 5000+ cycles | ❌ 非常慢 |
| cosf(x) | float | 标准 C 库软件计算 | ❌ 无 FPU 需软件仿真 | 🚫 5000+ cycles | ❌ 非常慢 |
| 查表法（LUT） | float / Q31 | 预计算余弦表 | ✅ 无需 FPU | 🚀 约 5 cycles | 🔥 1000 倍加速 |

  

  

12.  ## DMA+多通道adc(遥控器遥杆)
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MTc1YTI1ODVhYjk2YjI1N2NlOWE1ZWViNjhjZTI4N2VfMmtaSGZtd3l3MEJ6dTExaFZzWkpib1hOYXl1dHREcEpfVG9rZW46UVN6MmJPR3Fab3FpTUl4Z3d0d2N4YUVYbnJnXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

cubemx配置：

多通道adc大部分要开启扫描模式；

adc连续模式开启或者关闭，影响mian函数的相关代码，不开continuous则需在while中不断对adc进行开启

开连续模式（延时500可以去掉）

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGRiZWMyNjMzMjc1MDZhZmFmNWQ0OGVhZDVhNzk2ODBfbFIxemdITk9NZkt0aGlkdUZQT2VKcnN1SnFiSHZwaUZfVG9rZW46QjRSV2JSRTFub2pnZVp4ejZwV2NXUjRWblZoXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

不开：

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YmQzZWI2MTBkYTk2NjU2MzAzZTQ1OTc1NTZmNzU4Y2ZfcTRMa01yVDdKTDhSVURNRzFpTG1heXhkQ1NUc0xTVllfVG9rZW46Rnk4ZWJIc1NnbzJLQXp4bUZOa2NoNmNhbkhmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

相比之下开连续更快，更建议连续

  

  

  

  

  

  

  

  

  

13.  ## STM32常见问题
    

1.  ### STM32 使用ST-link下载问题
    

1.  原因：在使用CubeMX 配置文件时，忘记设置SYS选项里面的Debug选项
    

![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YjdlY2E2ZDcyOTZjOTdiNmVmZTU3MjY4ZjJiNzYyNGZfdERDQTE2d1haZU8zeTNrWlFtNFU1RXI5YVdnUHZ2amRfVG9rZW46VlBKcWJGT2M3b3RERmN4bERxd2NhT0Jxbk9aXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)

2.  现象：下载完一次程序之后程序无法运行，且无法重新下载。
    
3.  stm32共有三种启动模式：
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=YWM3YmI2NjEwM2QxZDE2NjU3OWQxOTVjYTMxNjJiNjVfeG4zNkJrQzRqSTRiSXlHSm1uZlgyMGhtRkZGWW5zaHpfVG9rZW46VnZCM2J6UFNEb3BmTzV4QWNxdGNTRzVRblZmXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    2.  用户闪存：正常的工作模式。stm32内置的Flash，一般我们使用JTAG或者SWD模式下载程序时就是下载到这个里面，重启之后也是从这里启动程序。
        
    3.  SRAM：芯片内置的RAM区，就是内存，没有程序储存的能力，这个模式一般用于调试。
        
    4.  系统储存器：系统储存器是芯片内部的一块特定的区域
        
    5.  stm32厂商在这个区域内部设置了一段Bootloader。选用这种启动模式，是为了能够从串口下载程序，因为在商家提供的Bootloader中，提供了串口下载的固件，可以通过这个Bootloader将程序下载到系统的Flash中。
        
4.  解决方法：
    
    1.  将BOOT0设置为1；BOOT1设置为0
        
    
    ![](https://pcnveplwrxf8.feishu.cn/space/api/box/stream/download/asynccode/?code=MDlmNmI4MWYwMDlmMGQ3YmIyZWJjOWJiMmYzYWMxYjhfdHg5SXJzZVBqUFFvZm5oc1ByY1QxTzZxR2JxRjlGcThfVG9rZW46QXlEM2JabVZjb0Q3ZjR4UDI3bGNzVmRlbmNlXzE3NjA5NTg0MzE6MTc2MDk2MjAzMV9WNA)
    
    3.  连接电脑后按下复位键，使用keil5下载没有问题的正常程序，发现程序正常下载。
        
    4.  将BOOT引脚改为原来的状态，再次尝试下载程序发现一切正常。