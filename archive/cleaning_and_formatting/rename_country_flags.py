import os
import shutil


def rename_files(folder_path, new_folder_path):
  for filename in os.listdir(folder_path):
    if filename.endswith(".gif"):
      country_code = filename[5:7]
      # country_code to upper case
      country_code = country_code.upper()
      new_filename = country_code + ".gif"
      old_path = os.path.join(folder_path, filename)
      new_path = os.path.join(new_folder_path, new_filename)
      shutil.move(old_path, new_path)
      print(f"Renamed '{filename}' to '{new_filename}', and moved from '{old_path}' to '{new_path}'")


folder_path = "/Users/toph/projects/intercontinentle/intercontinentle/src/data/countryFlags/"
new_folder_path = "/Users/toph/projects/intercontinentle/intercontinentle/src/data/countryFlagsnew/"



# print(os.getcwd())
# rename_files(folder_path, new_folder_path)

def delete_files(folder_path):
  for filename in os.listdir(folder_path):
    # if filename.endswith(".gif") and filename is more than 6 characters long
    if filename.endswith(".gif") and len(filename) > 6:
      file_path = os.path.join(folder_path, filename)
      os.remove(file_path)
      print(f"Deleted '{filename}' from '{file_path}'")


delete_files(new_folder_path)

# intercontinentle/src/data/countryFlagsnew


