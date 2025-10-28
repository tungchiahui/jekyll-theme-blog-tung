import os
import re
import shutil

def fix_markdown_file(filepath, backup_dir):
    """修复单个 Markdown 文件"""
    # 创建备份文件夹
    rel_path = os.path.relpath(filepath)
    backup_path = os.path.join(backup_dir, rel_path)
    os.makedirs(os.path.dirname(backup_path), exist_ok=True)

    # 复制原文件到备份目录
    shutil.copy2(filepath, backup_path)

    # 读取文件内容
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    fixed_lines = []
    for i, line in enumerate(lines):
        # 判断是否为标题（# 开头的行）
        if re.match(r"^#+\s", line.strip()):
            # 若前一行存在且不是空行，则添加空行
            if i > 0 and lines[i-1].strip() != "":
                fixed_lines.append("\n")
        fixed_lines.append(line)

    # 写回修复后的内容
    with open(filepath, "w", encoding="utf-8") as f:
        f.writelines(fixed_lines)

    print(f"✅ 已修复: {filepath}")


def fix_markdown_in_dir(root_dir, backup_dir):
    """遍历目录修复所有 Markdown 文件"""
    for root, _, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".md"):
                filepath = os.path.join(root, file)
                fix_markdown_file(filepath, backup_dir)


if __name__ == "__main__":
    folder = input("请输入 Markdown 文件所在文件夹路径: ").strip()
    backup_folder = input("请输入备份文件夹路径(例如 ./backup_md): ").strip()

    if not os.path.isdir(folder):
        print("❌ 输入的Markdown文件路径无效！")
    else:
        os.makedirs(backup_folder, exist_ok=True)
        print(f"\n🚀 开始处理文件夹: {folder}")
        print(f"📦 修复前的文件将自动备份到: {backup_folder}\n")

        fix_markdown_in_dir(folder, backup_folder)

        print("\n🎉 所有 Markdown 文件已修复完毕，备份已保存。")
