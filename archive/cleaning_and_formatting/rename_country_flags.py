import os
import shutil


def rename_files(folder_path):
  # print cwd
  for filename in os.listdir(folder_path):
    if filename.endswith(".gif"):
      # get country code from filename
      country_code = filename[:2]
      # country_code to upper case
      country_code = country_code.upper()
      new_filename = country_code + ".gif"
      # rename file
      old_file_path = os.path.join(folder_path, filename)
      new_file_path = os.path.join(folder_path, new_filename)
      os.rename(old_file_path, new_file_path)
      print(f"Renamed '{filename}' to '{new_filename}'")

folder_path = "/Users/toph/projects/intercontinentle/intercontinentle/src/data/countryFlags/png250px/"
# new_folder_path = "/Users/toph/projects/intercontinentle/intercontinentle/src/data/countryFlagsnew/"



# print(os.getcwd())
# rename_files(folder_path, new_folder_path)

def delete_files(folder_path):
  for filename in os.listdir(folder_path):
    # if filename.endswith(".gif") and filename is more than 6 characters long
    if filename.endswith(".gif") and len(filename) > 6:
      file_path = os.path.join(folder_path, filename)
      os.remove(file_path)
      print(f"Deleted '{filename}' from '{file_path}'")


rename_files(folder_path)

# intercontinentle/src/data/countryFlagspng250px


