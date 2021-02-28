import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const isCookied = () => {
return cookies.get('authedUser');
}

export const getImageURL = (users, userId) => {
return users
.filter(user => user._id === userId && !!user.image)
.map(user => user.image)
}