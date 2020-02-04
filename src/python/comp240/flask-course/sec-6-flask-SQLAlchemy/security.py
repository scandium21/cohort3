from werkzeug.security import safe_str_cmp
from models.user import UserModal


def authenticate(username, password):
    user = UserModal.find_by_username(username)
    if user and safe_str_cmp(user.password, password):
        return user


# payload is the content of JWT token
def identity(payload):
    user_id = payload["identity"]
    return UserModal.find_by_id(user_id)
