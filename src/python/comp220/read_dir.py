# read all the files and their sizes from a directory
# print a nice little report that tells us the number of files
# and the total size of the directory

import os


def get_dir_info(dir='./'):
    num_files = len(os.listdir(dir))
    total_size = sum(
        [os.path.getsize(f) for f in os.listdir(dir) if os.path.isfile(f)])
    return {'dir': dir, 'files': num_files, 'size': total_size}


def print_dir_report(dir_info):
    print(
        f'Number of files in directory "{dir_info["dir"]}" is {dir_info["files"]}. Total size is {dir_info["size"]} bytes.'
    )


print_dir_report(get_dir_info())
# Number of files in directory "./" is 6. Total size is 2888015 bytes.

# reference: https://www.programiz.com/python-programming/directory
# https://stackoverflow.com/questions/1392413/calculating-a-directorys-size-using-python