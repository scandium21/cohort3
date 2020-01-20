from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

stores = [{
    'name': 'My little store',
    'items': [{
        'name': 'postcards',
        'price': 14.99
    }]
}]


@app.route('/')
def home():
    return render_template('index.html')


# POST - receive data
# GET - send data back only


# POST /store data: {name:}
@app.route('/store', methods=['POST'])
def create_store():
    request_data = request.get_json()
    new_store = {'name': request_data['name'], 'item': []}
    stores.append(new_store)
    return jsonify(new_store)


# GET /store/<string:name>
@app.route('/store/<string:name>')
def get_store(name):
    for store in stores:
        if store['name'] == name:
            return jsonify(store)
    return jsonify({'message': 'store not found'})


# GET /store
@app.route('/store')
def get_stores():
    return jsonify({'stores': stores})


# POST /store/<string:name>/item
@app.route('/store/<string:name>/item', methods=['POST'])
def add_item_to_store(name):
    request_data = request.get_json()
    for store in stores:
        if store['name'] == name:
            new_store = {
                'name': request_data['name'],
                'price': request_data['price']
            }
            store['items'].append(new_store)
            return jsonify(new_store)
    return jsonify({'message': 'store not found'})


# GET /store/<string:name>/item
@app.route('/store/<string:name>/item')
def get_item_in_store(name):
    for store in stores:
        if store['name'] == name:
            return jsonify({'items': store['items']})
    return jsonify({'message': 'store not found'})


# @app.route('/')  # 'http://google.com/'
# def home():
#     return 'Hello world!'

# @app.route("/my/secret/page")
# def secret():
#     return "Shh!"

# @app.route("/user/<username>")
# def user_page(username):
#     return f"Welcome, {username}!"

# @app.route("/blog/post/<int:post_id>")
# def show_post(post_id):
#     return f"This is the page for post # {post_id}"

app.run(port=5000)
