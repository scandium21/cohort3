import sqlite3

# initialize connection
connection = sqlite3.connect('data.db');
# sqlite stores everything in a single file
# cursor is responsible of interacting with the db
cursor = connection.cursor()
# sql query goes in the string
create_table = "CREATE TABLE users (id int, username text, password text)" 
cursor.execute(create_table)

user = (1, 'sc', 'asdf')
insert_query = "INSERT INTO users VALUES (?,?,?)"
cursor.execute(insert_query,user)

users = [
  (2, 'gr', '1234'),
  (3, 'ew', 'xlkk')
]
cursor.executemany(insert_query,users)

# retrieve data
select_query = "SELECT * FROM users"
for row in cursor.execute(select_query):
  print(row)

# save data
connection.commit()

connection.close()