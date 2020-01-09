try:
    csv_file = open('Census_by_Community_2018.csv', 'r')
    lines = csv_file.readlines()
finally:
    csv_file.close()


def get_category_idx_pair():
    return {cat.rstrip(): ind for ind, cat in enumerate(lines[0].split(','))}


def get_info_by_category(target, cat):
    cat_idx = get_category_idx_pair()[cat]
    target_idx = get_category_idx_pair()[target]
    sum_target = {}
    lines_num = {}
    for line in lines[1:]:
        line_data = line.split(',')
        sub_cat = line_data[cat_idx]
        target_val = int(line_data[target_idx])
        sum_target[sub_cat] = (sum_target.get(sub_cat) or 0) + target_val
        lines_num[sub_cat] = (lines_num.get(sub_cat) or 0) + 1
    return {
        sub_cat: [num_line, target_sum]
        for sub_cat, num_line, target_sum in zip(
            sum_target.keys(), sum_target.values(), lines_num.values())
    }


print(get_info_by_category('RES_CNT', 'CLASS'))
# {'Residential': [1263734, 208], 'Industrial': [922, 42], 'Major Park': [0, 4], 'Residual Sub Area': [0, 49]}


def create_report_str(cat, target):
    string = f'======================= Calculation by {cat} =========================\n\n'
    string += 'Sub Category'.ljust(30) + f'Number of Lines in File'.ljust(
        30) + f'Sum of {target}\n\n'
    result = get_info_by_category(target, cat)
    for sub_cat, data in zip(result.keys(), result.values()):
        string += f'{sub_cat}'.ljust(30) + f'{data[1]}'.ljust(
            30) + f'{data[0]}\n'
    return string + '\n\n'


final_string = create_report_str('CLASS', 'RES_CNT') + create_report_str(
    'SECTOR', 'RES_CNT')
final_string += f'\n\ncsv file sourse: https://data.calgary.ca/Demographics/Census-by-Community-2018/cc4n-ndvs'

try:
    csv_report = open('csv_report.txt', 'w')
    csv_report.write(final_string)
finally:
    csv_report.close()