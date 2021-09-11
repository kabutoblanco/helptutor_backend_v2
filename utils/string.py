"""Utilities string."""


# Python
import random
import string


def get_random_string(length):
    """Return string random to size --length--."""
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for i in range(length))
    return result_str

def get_information_google(data, idinfo):  
    """Return dict information user from google api"""    
    data['username'] = idinfo['email']
    data['first_name'] = idinfo['given_name']
    data['last_name'] = idinfo['family_name']        
    data['password'] = get_random_string(8)
    data['photo'] = idinfo['picture']
    return data