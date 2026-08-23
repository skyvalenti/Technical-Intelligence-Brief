"""
Pytest suite for validating asset path integrity and image existence.
"""
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


def extract_image_paths(file_path: Path):
    """Extract local and remote image paths from markdown files."""
    assert file_path.exists(), f"File {file_path} must exist."
    content = file_path.read_text(encoding="utf-8")
    
    # Match markdown images: ![alt](url)
    md_images = re.findall(r'!\[.*?\]\((.*?)\)', content)
    # Match HTML img tags: <img ... src="url" ...>
    html_images = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', content)
    
    return md_images + html_images


def test_readme_assets_exist():
    readme_path = BASE_DIR / "README.md"
    images = extract_image_paths(readme_path)
    
    assert len(images) > 0, "README.md should contain images."
    
    local_images_found = 0
    for img in images:
        if img.startswith("http://") or img.startswith("https://"):
            continue  # Remote badge
        
        local_images_found += 1
        # Resolve relative to README location (project root)
        resolved_path = (BASE_DIR / img).resolve()
        assert resolved_path.exists(), f"Local asset referenced in README.md does not exist: {img} -> {resolved_path}"
    
    assert local_images_found >= 3, "README.md should reference at least 3 local assets (Hero, Verticals, Sector Telemetry)."


def test_docs_index_assets_exist():
    docs_index_path = BASE_DIR / "docs" / "index.md"
    if not docs_index_path.exists():
        return
    
    images = extract_image_paths(docs_index_path)
    for img in images:
        if img.startswith("http://") or img.startswith("https://"):
            continue
        # Resolve relative to docs directory
        resolved_path = (docs_index_path.parent / img).resolve()
        assert resolved_path.exists(), f"Local asset referenced in docs/index.md does not exist: {img} -> {resolved_path}"
