import os
import requests

BACKEND_URL = "http://127.0.0.1:8000/admin/upload"
DOCS_DIR = os.path.join(os.path.dirname(__file__), '../data/documents')

def upload_folder(folder_path):
    if not os.path.exists(folder_path):
        print(f"Folder {folder_path} not found.")
        return

    for filename in os.listdir(folder_path):
        filepath = os.path.join(folder_path, filename)
        if os.path.isfile(filepath):
            with open(filepath, 'rb') as f:
                files = {'file': (filename, f)}
                print(f"Uploading {filename}...")
                try:
                    response = requests.post(BACKEND_URL, files=files)
                    if response.status_code == 200:
                        print(f"Success: {response.json()}")
                    else:
                        print(f"Failed: {response.status_code} - {response.text}")
                except Exception as e:
                    print(f"Error uploading {filename}: {e}")

if __name__ == "__main__":
    demo_dir = os.path.join(DOCS_DIR, 'demo')
    ref_dir = os.path.join(DOCS_DIR, 'reference')
    
    print("Uploading demo documents...")
    upload_folder(demo_dir)
    
    print("\nUploading reference documents...")
    upload_folder(ref_dir)
