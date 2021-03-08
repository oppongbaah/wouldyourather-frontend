import Cookies from 'universal-cookie';

const cookies = new Cookies();

const getImageURL = (users, userId) => {
    return users
    .filter(user => user._id === userId && !!user.imageURL)
    .map(user => user.imageURL)
}

const getUsername = (users, userId) => {
    return users
    .filter(user => user._id === userId && !!user.username)
    .map(user => user.username) 
}

const getUserId = (users, userId) => {
    const uid = users 
    .filter(user => user._id === userId)
    .map(user => user._id)

    return uid.toString() === cookies.get('authedUser').trim()
     ? 'you' : uid
}

export {
    getImageURL, 
    getUsername,
    getUserId
}

