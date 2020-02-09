def get_category_idx_pair(header):
    return {cat.rstrip(): ind for ind, cat in enumerate(header.split(","))}


def get_info_by_category(target, cats):
    sum_target = {}
    lines_num = {}

    with open("Census_by_Community_2018.csv", "r") as csv:
        for idx, line in enumerate(csv):
            if idx == 0:
                header_idx = get_category_idx_pair(line)
                cat_idx = {}
                target_idx = header_idx[target]
                for cat in cats:
                    cat_idx[cat] = header_idx[cat]
                    sum_target[cat] = {}
                    lines_num[cat] = {}
            else:
                line_data = line.split(",")
                target_val = int(line_data[target_idx])
                sub_cats = {}
                for cat in cats:
                    sub_cats[cat] = line_data[cat_idx[cat]]
                    sum_target[cat][sub_cats[cat]] = (
                        sum_target[cat].get(sub_cats[cat], 0) + target_val
                    )
                    lines_num[cat][sub_cats[cat]] = (
                        lines_num[cat].get(sub_cats[cat], 0) + 1
                    )
    return sum_target, lines_num


def create_report_str(target, cats):
    string = ""
    sum_target, sum_lines = get_info_by_category(target, cats)
    for cat in cats:
        string += f"======================= Calculation by {cat} =========================\n\n"
        string += (
            "Sub Category".ljust(30)
            + f"Number of Lines in File".ljust(30)
            + f"Sum of {target}\n\n"
        )
        for sub_cat, target_sum, target_lines in zip(
            sum_target[cat].keys(), sum_target[cat].values(), sum_lines[cat].values()
        ):
            string += (
                f"{sub_cat}".ljust(30) + f"{target_lines}".ljust(30) + f"{target_sum}\n"
            )
        string += "\n\n"

    string += f"\ncsv file sourse: https://data.calgary.ca/Demographics/Census-by-Community-2018/cc4n-ndvs"

    with open("csv_report.txt", "w") as report:
        report.write(string)
    return string + "\n\n"


if __name__ == "__main__":
    create_report_str("RES_CNT", ["CLASS", "SECTOR"])

# (
#     {
#         "CLASS": {
#             "Residential": 1263734,
#             "Industrial": 922,
#             "Major Park": 0,
#             "Residual Sub Area": 0,
#         },
#         "SECTOR": {
#             "CENTRE": 199977,
#             "SOUTH": 227345,
#             "NORTHEAST": 185534,
#             "NORTHWEST": 174126,
#             "NORTH": 160502,
#             "SOUTHEAST": 135009,
#             "EAST": 57666,
#             "WEST": 124497,
#         },
#     },
#     {
#         "CLASS": {
#             "Residential": 208,
#             "Industrial": 42,
#             "Major Park": 4,
#             "Residual Sub Area": 49,
#         },
#         "SECTOR": {
#             "CENTRE": 62,
#             "SOUTH": 58,
#             "NORTHEAST": 44,
#             "NORTHWEST": 30,
#             "NORTH": 30,
#             "SOUTHEAST": 23,
#             "EAST": 23,
#             "WEST": 33,
#         },
#     },
# )
