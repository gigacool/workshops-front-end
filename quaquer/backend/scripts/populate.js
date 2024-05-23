const axios = require('axios');
const userGenerator = require('./user-generator');

const BASE_URL = 'http://localhost:3000/api'; // Adjust the URL if necessary

function randInterval(min, max){
  return min + Math.floor(Math.random() *(max-min+1));
}

const users = [...Array(1)].map(() => { 
  let user = userGenerator.generateRandomName();
  // may lead to inconsistencies but we don't really care at this point - it is more about providing examples

  return {
    ...user, 
    birthDate: new Date(randInterval(1970, 2024), randInterval(1,12), randInterval(1, 28)).getTime(),
    username: `${user.firstName}-${user.lastName}`, 
    password: userGenerator.generateRandomPassword()}}
);

// for easier front-end testings
users.push({
  username:'gigacool',
  password:'notAPassword',
  birthDate:new Date(1980, 3, 31).getTime(),
  firstName:'Billy',
  lastName:'Boy'
})

const registerUser = async (user) => {
  try {
    // Register the user
    await axios.post(`${BASE_URL}/users/register`, user);
  } catch (error) {
    console.error(`Error for user ${user.username}: ${error.response ? error.response.data : error.message}`);
  }
};

const getToken = async (user) => {
  try {
    // Login the user
    const response = await axios.post(`${BASE_URL}/users/login`, user);
    const token = response.data.token;
    console.log(`Logged in user: ${user.username}, Token: ${token}`);

    return token;
  } catch (error) {
    console.error(`Error for user ${user.username}: ${error.response ? error.response.data : error.message}`);
  }
};

const getSelfProfile = async(token) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    response.data.birthDate = new Date(response.data.birthDate);
    console.log(`User profile for self:`, response.data);
  }
  catch(error){
    console.log(`Error while fetching logged user profile ${error.message}`);
  }
}

const getUserProfile = async (userId, token) => {
  try {
    // get user profile
    const response = await axios.get(`${BASE_URL}/users/profile/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    response.data.birthDate = new Date(response.data.birthDate);
    console.log(`User profile for userId ${userId}:`, response.data);
  } catch (error) {
    console.error(`Error fetching profile for userId ${userId}: ${error.response ? error.response.data : error.message}`);
  }
};

const postMessage = async (token, message) => {
  try {
    // get user profile
    const response = await axios.post(`${BASE_URL}/quacks`, {content:message}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(`Error posting message `);
  }
}

const getQuacks = async (token) => {
  try {
    // get user profile
    const response = await axios.get(`${BASE_URL}/quacks`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error(`Error fetching quacks `);
  }
};

const main = async () => {


  for (const user of users) {
    await registerUser(user);
    console.log(user.username, user.password);
  }
  
  const quotes = [
    "The only way to do great work is to love what you do. – Steve Jobs",
    "The journey of a thousand miles begins with one step. – Lao Tzu",
    "Believe you can and you're halfway there. – Theodore Roosevelt",
    "Success is not how high you have climbed, but how you make a positive difference to the world. – Roy T. Bennett",
    "Act as if what you do makes a difference. It does. – William James",
    "The best time to plant a tree was 20 years ago. The second best time is now. – Chinese Proverb",
    "Your time is limited, don't waste it living someone else's life. – Steve Jobs",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "The harder you work for something, the greater you’ll feel when you achieve it. – Anonymous",
    "Don’t watch the clock; do what it does. Keep going. – Sam Levenson"
  ];
  index = 0;
  
    

  for (const user of users) {
    const token = await getToken(user);
    const profile = await getUserProfile(users[0].username, token);
    const self = await getSelfProfile(token);
    
    postMessage(token, quotes[index++]);
    
    if (index >= quotes.length){
      index = 0;
    }
  }

  const token = await getToken(users[0]);
  const quacks = await getQuacks(token);

  console.log(JSON.stringify(quacks.data, null, 2));

};

main();
