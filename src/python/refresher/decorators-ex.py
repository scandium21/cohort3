import functools

user = {'username': 'sc', 'access_level': 'guest'}


# simple decorator
def make_secure(func):
    @functools.wraps(func)
    def secure_function(*args, **kwargs):
        if user['access_level'] == 'admin':
            return func(*args, **kwargs)
        else:
            return f"No admin permissions for {user['username']}"

    return secure_function


# create the func and pass it through the decorator in one go
# the name of the func will be lost
# to solve this, use another decorator shown above
@make_secure
def get_admin_password():
    return '1234'


# get_admin_password = make_secure(get_admin_password)

print(get_admin_password())
print(get_admin_password.__name__)


def get_password(panel):
    if panel == 'admin':
        return '1234'
    elif panel == 'billing':
        return 'super_secure_password'


print(get_password('billing'))