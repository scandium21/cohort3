from flask import Flask, render_template

from read_data import map_wb_to_dict

app = Flask(__name__)

wb = map_wb_to_dict()

# simple dump
@app.route("/")
def simple_dumps():
    return wb


def get_ws_header(wb=wb):
    ws_headers = {}
    for ws, items in wb.items():
        for header in items[0].keys():
            ws_headers[ws] = ws_headers.get(ws, [])
            ws_headers[ws].append(header)
    return ws_headers


@app.route("/template")
def template_loop():
    return render_template("index.html", results=wb, ws_headers=get_ws_header())


if __name__ == "__main__":
    app.run(port=5000, debug=True)
