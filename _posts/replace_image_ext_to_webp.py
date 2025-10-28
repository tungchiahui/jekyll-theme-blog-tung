import os
import re

# ==============================
# 配置
input_dir = "."  # 要处理的Markdown所在文件夹
# ==============================

# 匹配 Markdown 或 HTML 中的图片链接
# 示例匹配：
# ![](https://.../xxx.png)
# [alt](https://.../xxx.jpg)
# <img src="https://.../xxx.jpeg">
pattern = re.compile(
    r'(?<=\()https?://[^\s)]+?\.(?:png|jpg|jpeg)(?=[\?\)#"\'])'
    r'|(?<=src=")https?://[^"]+?\.(?:png|jpg|jpeg)(?=["\'])',
    re.IGNORECASE
)

for root, _, files in os.walk(input_dir):
    for file in files:
        if not file.endswith(".md"):
            continue

        file_path = os.path.join(root, file)
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        # 替换匹配到的图片扩展名为 .webp
        def replace_ext(match):
            url = match.group(0)
            base, ext = os.path.splitext(url)
            return base + ".webp"

        new_content = re.sub(pattern, replace_ext, content)

        if new_content != content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"✅ 已更新: {file_path}")
        else:
            print(f"➡️ 无变化: {file_path}")

print("\n🎉 所有Markdown文件已安全处理完成！")
