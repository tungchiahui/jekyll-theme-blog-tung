import re

# 你的 Markdown 文件
md_file = "2021-10-05-临时.md"
output_file = "mydoc_new.md"

# 新图床前缀
new_prefix = "https://cdn.030204.xyz/tungwebsite/assets/images/2021-10-05/image"

# 读取文件
with open(md_file, "r", encoding="utf-8") as f:
    content = f.read()

# 匹配飞书图床链接
pattern = r"!?\[\]\(https://pcnveplwrxf8\.feishu\.cn/space/api/box/stream/download/asynccode/\?code=[^)]+\)"

# 用于计数
counter = 1

def repl(match):
    global counter
    new_url = f"![]({new_prefix}{counter}.png)"
    counter += 1
    return new_url

# 替换
new_content = re.sub(pattern, repl, content)

# 保存新文件
with open(output_file, "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"替换完成，生成新文件: {output_file}")
