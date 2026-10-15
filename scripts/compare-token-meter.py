"""Compare the saved browser captures without changing either source image.

Run: python3 scripts/compare-token-meter.py
Requires Pillow. Browser captures and DOM measurements live in docs/token-meter.
"""

import json
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFont, ImageStat


EVIDENCE = Path(__file__).resolve().parents[1] / "docs" / "token-meter"
PAIRS = {
    "round-1-before": ("round-1/original.jpg", "round-1/implementation-before.jpg"),
    "round-1-after": ("round-1/original.jpg", "round-1/implementation-after.jpg"),
    "round-2-menu-before": ("round-2/original-menu.jpg", "round-2/implementation-menu-before.jpg"),
    "round-2-menu-after": ("round-2/original-menu-after.jpg", "round-2/implementation-menu-after.jpg"),
    "round-3-dark-after": ("round-3/original-dark.jpg", "round-3/implementation-dark-after.jpg"),
    "round-3-gallery-after": ("round-3/original-gallery-end.jpg", "round-3/implementation-gallery-end.jpg"),
    "final-desktop": ("final-original.jpg", "final-implementation.jpg"),
    "final-full-page": ("final-original-full.jpg", "final-implementation-full.jpg"),
}


def compare(label, pair):
    original, implementation = [Image.open(EVIDENCE / p).convert("RGB") for p in pair]
    if original.size != implementation.size:
        raise ValueError(f"{label}: screenshot sizes differ")
    difference = ImageChops.difference(original, implementation)
    difference.save(EVIDENCE / f"{label}-difference.png")
    mean_error = sum(ImageStat.Stat(difference).mean) / 3
    threshold = difference.convert("L").point(lambda value: 255 if value > 8 else 0)
    changed_ratio = threshold.histogram()[255] / (original.width * original.height)
    return {"captures": list(pair), "image_size": list(original.size),
            "rgb_mean_absolute_error_0_to_255": mean_error,
            "fraction_of_pixels_with_luma_difference_over_8": changed_ratio}


def geometry(path):
    data = json.loads((EVIDENCE / path).read_text())
    original, implementation = data["original"], data["implementation"]
    assert (original["width"], original["height"]) == (implementation["width"], implementation["height"])
    assert len(original["elements"]) == len(implementation["elements"])
    differences = []
    for first, second in zip(original["elements"], implementation["elements"]):
        for key in ("x", "y", "width", "height", "size", "weight", "color"):
            if first[key] != second[key]:
                differences.append({"element": first["selector"], "property": key,
                                    "original": first[key], "implementation": second[key]})
    return {"viewport": [original["width"], original["height"]],
            "measured_elements": len(original["elements"]),
            "original_body_height": original["bodyHeight"],
            "implementation_body_height": implementation["bodyHeight"],
            "differences": differences}


def side_by_side():
    images = [Image.open(EVIDENCE / name).convert("RGB")
              for name in ("final-original.jpg", "final-implementation.jpg")]
    width = 720
    height = round(images[0].height * width / images[0].width)
    canvas = Image.new("RGB", (width * 2 + 24, height + 52), "#e8e8e8")
    draw = ImageDraw.Draw(canvas)
    font = ImageFont.load_default(size=20)
    for index, image in enumerate(images):
        x = index * (width + 24)
        draw.text((x + 16, 15), ["Original", "Implementation"][index], fill="#17201e", font=font)
        canvas.paste(image.resize((width, height), Image.Resampling.LANCZOS), (x, 52))
    canvas.save(EVIDENCE / "final-comparison.png")


results = {label: compare(label, pair) for label, pair in PAIRS.items()}
results["geometry"] = {f"round-{number}": geometry(f"round-{number}/measurements-after.json")
                       for number in range(1, 4)}
(EVIDENCE / "comparison-results.json").write_text(json.dumps(results, indent=2) + "\n")
side_by_side()
print(json.dumps({"final_desktop_mae": results["final-desktop"]["rgb_mean_absolute_error_0_to_255"],
                  "final_full_page_mae": results["final-full-page"]["rgb_mean_absolute_error_0_to_255"],
                  "geometry": results["geometry"]}, indent=2))
