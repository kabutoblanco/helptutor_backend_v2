from .string import get_random_string

def get_information_google(data, idinfo):  
    """Return dict information user from google api"""    
    data['username'] = idinfo['email']
    data['first_name'] = idinfo['given_name']
    data['last_name'] = idinfo['family_name']        
    data['password'] = get_random_string(8)
    data['photo'] = idinfo['picture']
    return data