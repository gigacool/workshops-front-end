const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/users'; // Adjust the URL if necessary

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
  { username: 'user3', password: 'password3' }
];

const registerAndLogin = async (user) => {
  try {
    // Register the user
    await axios.post(`${BASE_URL}/register`, user);
  } catch (error) {
    console.error(`Error for user ${user.username}: ${error.response ? error.response.data : error.message}`);
  }
};

const getToken = async (user) => {
  try {
    // Login the user
    const response = await axios.post(`${BASE_URL}/login`, user);
    const token = response.data.token;
    console.log(`Logged in user: ${user.username}, Token: ${token}`);

    return token;
  } catch (error) {
    console.error(`Error for user ${user.username}: ${error.response ? error.response.data : error.message}`);
  }
};

const getUserProfile = async (userId, token) => {
  try {
    // get user profile
    const response = await axios.get(`${BASE_URL}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`User profile for userId ${userId}:`, response.data);
  } catch (error) {
    console.error(`Error fetching profile for userId ${userId}: ${error.response ? error.response.data : error.message}`);
  }
};

const main = async () => {


  for (const user of users) {
    await registerAndLogin(user);
  }
  
  for (const user of users) {
    const token = await getToken(user);
    for (const profile of users) {
        await getUserProfile(profile.username, token);
    }
  }


};

main();
