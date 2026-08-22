import os
from PIL import Image

def generate_icon_assets(source_path="Technical_News.png", public_dir="public"):
    if not os.path.exists(source_path):
        raise FileNotFoundError(f"Source file not found: {source_path}")

    os.makedirs(public_dir, exist_ok=True)
    img = Image.open(source_path).convert("RGBA")

    # Tight crop around non-transparent pixels
    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    # Square canvas padding
    max_dim = max(img.size)
    square_img = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
    offset = ((max_dim - img.size[0]) // 2, (max_dim - img.size[1]) // 2)
    square_img.paste(img, offset)

    # Export PNG resolutions
    dimensions = [16, 32, 48, 64, 192, 512]
    for size in dimensions:
        resized = square_img.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(os.path.join(public_dir, f"icon-{size}.png"), format="PNG")

    # Favicon PNG
    square_img.resize((32, 32), Image.Resampling.LANCZOS).save(
        os.path.join(public_dir, "favicon.png"), format="PNG"
    )

    # Multi-resolution Windows ICO
    square_img.save(
        os.path.join(public_dir, "app_icon.ico"),
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    )
    print("Icon assets built successfully from Technical_News.png.")

if __name__ == "__main__":
    generate_icon_assets()
