from openpyxl import load_workbook
import json

# sample format
# wb_dict = {
#     "invoices": [
#         {
#             "i_id": 1,
#             "c_id": 1,
#             "date": "2019-03-01",
#             "total_payment": 400
#         },
#         ...
#     ]
# }


# get sheet information, create dicts to store each field
def map_wb_to_dict(db="merged_sample_db.xlsx"):
    wb_dict = {}
    wb = load_workbook(db)
    for sheet in wb:
        # create dicts for each sheet
        wb_dict[sheet.title] = []
        headers = [h.value for h in sheet[1]]
        for idx, row in enumerate(sheet):
            if idx == 0:
                continue
            data_entry = {
                headers[i]: cell.value.strftime("%Y-%m-%d")
                if headers[i].lower().find("date") != -1
                else cell.value
                for i, cell in enumerate(row)
            }
            wb_dict[sheet.title].append(data_entry)
    return wb_dict
