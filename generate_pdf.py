import os
import re
from PIL import Image

def main():
    # Define directories and files
    ppt_dir = "/Users/kaiserwetter/Projects/26-Project/2604-Narrio/Narrio/ppt"
    output_pdf = "/Users/kaiserwetter/Projects/26-Project/2604-Narrio/Narrio/NARRIO.pdf"

    print(f"Reading images from: {ppt_dir}")

    # Ensure the directory exists
    if not os.path.exists(ppt_dir):
        print("Error: Directory does not exist.")
        return

    # List all image files (assuming png, jpg, jpeg)
    valid_extensions = ('.png', '.jpg', '.jpeg')
    files = [f for f in os.listdir(ppt_dir) if f.lower().endswith(valid_extensions)]

    if not files:
        print("No images found in the directory.")
        return

    # Sort files by the number in their names (e.g., "Frame 1.png" -> 1)
    def extract_number(filename):
        match = re.search(r'\d+', filename)
        return int(match.group()) if match else 0
    
    files.sort(key=extract_number)
    print("Files found and sorted:")
    for f in files:
        print(f" - {f}")

    # Process and convert images
    image_list = []
    first_image = None

    for f in files:
        img_path = os.path.join(ppt_dir, f)
        img = Image.open(img_path)
        
        # Convert to RGB to ensure compatibility for PDF (PDF doesn't support RGBA directly)
        rgb_img = img.convert('RGB')
        
        if first_image is None:
            first_image = rgb_img
        else:
            image_list.append(rgb_img)

    # Save as PDF
    if first_image:
        print(f"\nSaving to {output_pdf}...")
        first_image.save(
            output_pdf,
            "PDF",
            resolution=100.0,
            save_all=True,
            append_images=image_list
        )
        print("Done! PDF generated successfully.")

if __name__ == "__main__":
    main()
