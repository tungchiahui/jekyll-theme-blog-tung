import re
from pathlib import Path
import shutil

# ---------------- 用户设置 ----------------
source_dir = Path("./")  # 要处理的 Markdown 文件所在目录
backup_dir = Path(input("请输入备份文件夹路径（不存在会创建）：").strip())
backup_dir.mkdir(parents=True, exist_ok=True)
# -----------------------------------------

# 匹配所有 md 文件（递归）
md_files = list(source_dir.rglob("*.md"))

if not md_files:
    print("未找到任何 Markdown 文件。")
else:
    for md_file in md_files:
        # 读取原文件内容
        content = md_file.read_text(encoding="utf-8")

        # 备份原文件（保持目录结构）
        relative_path = md_file.relative_to(source_dir)
        backup_file_path = backup_dir / relative_path
        backup_file_path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(md_file, backup_file_path)

        # ---------------- 修复 ----------------
        # 1. 移除 td { ... } 样式
        content = re.sub(r'^td\s*\{[^}]*\}', '', content, flags=re.MULTILINE)
        # 2. 移除 <!--br {...}--> 注释
        content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
        # 3. 移除零宽字符/控制符（如 \u200b、\u200c、\u200d、\ufeff）
        content = re.sub(r'[\u200b-\u200d\uFEFF]', '', content)
        # 4. 清理多余空行
        content = re.sub(r'\n\s*\n', '\n\n', content)
        content = content.strip() + "\n"

        # 保存修复后的文件（覆盖原文件）
        md_file.write_text(content, encoding="utf-8")

        print(f"修复完成: {md_file}（已备份到 {backup_file_path}）")

print("全部 Markdown 文件处理完毕 ✅")
