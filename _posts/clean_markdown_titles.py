import re
import os
import shutil

# ======== 配置区域 ========
root_dir = "./"         # 要清理的 Markdown 文件目录
backup_dir = "./backup" # 备份文件存放目录
# ==========================

# 创建备份目录（若存在则复用）
os.makedirs(backup_dir, exist_ok=True)

def backup_file(src_path):
    """将文件备份到 backup_dir，保留原有目录结构"""
    rel_path = os.path.relpath(src_path, root_dir)
    dst_path = os.path.join(backup_dir, rel_path)
    os.makedirs(os.path.dirname(dst_path), exist_ok=True)
    shutil.copy2(src_path, dst_path)

def clean_markdown(path):
    """清除 Markdown 文件标题前的数字编号"""
    with open(path, "r", encoding="utf-8") as fr:
        content = fr.read()

    # 匹配 “1. # 标题” 或 “23. ## 标题”等模式
    new_content = re.sub(r"^\s*\d+\.\s*(?=#)", "", content, flags=re.MULTILINE)

    if new_content != content:
        with open(path, "w", encoding="utf-8") as fw:
            fw.write(new_content)
        print(f"✅ cleaned: {path}")
    else:
        print(f"⏩ skipped: {path}")

def main():
    print("🔍 开始扫描 Markdown 文件...\n")

    for root, _, files in os.walk(root_dir):
        for f in files:
            if f.endswith(".md"):
                path = os.path.join(root, f)
                # 跳过备份目录自身
                if backup_dir in path:
                    continue
                backup_file(path)
                clean_markdown(path)

    print("\n✅ 所有文件处理完成！")
    print(f"📦 备份文件已保存至：{os.path.abspath(backup_dir)}")

if __name__ == "__main__":
    main()
