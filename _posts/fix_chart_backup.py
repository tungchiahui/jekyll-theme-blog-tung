import re
from pathlib import Path
import shutil

# ---------------- 用户设置 ----------------
source_dir = Path("./")  # 当前目录
backup_dir = Path(input("请输入备份文件夹路径（不存在会创建）：").strip())
backup_dir.mkdir(parents=True, exist_ok=True)
# -----------------------------------------

# 获取当前目录下的所有 .md 文件
md_files = list(source_dir.glob("*.md"))

if not md_files:
    print("未找到任何 Markdown 文件。")
else:
    for md_file in md_files:
        # 读取原文件
        content = md_file.read_text(encoding="utf-8")

        # 备份原文件
        shutil.copy2(md_file, backup_dir / md_file.name)

        # ---------------- 修复 ----------------
        # 1. 删除所有 td {…} 样式，不管在行首还是行中
        content = re.sub(r'td\s*\{[^}]*\}', '', content)
        # 2. 删除所有 <!-- … --> 注释
        content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
        # 3. 删除零宽字符/控制符（如 \u200b、\u200c、\u200d、\ufeff）
        content = re.sub(r'[\u200b-\u200d\uFEFF]', '', content)
        # 4. 清理多余空行
        content = re.sub(r'\n\s*\n', '\n\n', content)
        content = content.strip() + "\n"

        # 保存修复后的文件（覆盖原文件）
        md_file.write_text(content, encoding="utf-8")

        print(f"修复完成: {md_file.name}（已备份到 {backup_dir}）")

print("全部 Markdown 文件处理完毕 ✅")
