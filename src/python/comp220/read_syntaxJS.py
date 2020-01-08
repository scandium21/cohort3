def get_content_info(file):
    num_lines = file.count('\n') + 1
    num_else = file.count('else')
    num_char = len(file.replace('\n', ''))
    return {'lines': num_lines, 'else': num_else, 'characters': num_char}


def print_file_info(info):
    for key, value in info.items():
        print(f'number of {key} in file: {value}')


try:
    syntax_js = open('syntax.js', 'r')
    content = syntax_js.read()
finally:
    syntax_js.close()

print_file_info(get_content_info(content))

# reference material: https://www.programiz.com/python-programming/file-operation