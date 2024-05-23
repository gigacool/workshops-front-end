// user names

const firstNames = [
  "Aiden", "Olivia", "Liam", "Emma", "Noah", "Ava", "Ethan", "Isabella", "Mia", "Sophia",
  "Kai", "Sakura", "Hiro", "Yuna", "Arjun", "Ayesha", "Zara", "Leo", "Nina", "Ibrahim",
  "Chen", "Jin", "Mei", "An", "Maria", "Diego", "Sofia", "Carlos", "Elena", "Youssef"
];

const lastNames = [
  "Smith", "Johnson", "Brown", "Williams", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Nguyen", "Kim", "Patel", "Hassan", "Singh", "Chen", "Wang", "Lopez", "Gonzalez", "Wilson",
  "Ahmed", "Ali", "Khan", "Sato", "Yamamoto", "Fernandez", "Silva", "Devi", "Rossi", "Moretti"
];

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const generateRandomName = () => {
  return {
    firstName: getRandomElement(firstNames),
    lastName: getRandomElement(lastNames),
  }
};

// passwords
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';

const getRandomCharacter = () => {
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
};

const generateRandomPassword = () => {
  const passwordLength = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    password += getRandomCharacter();
  }
  return password;
};

module.exports = {
  generateRandomName,
  generateRandomPassword
}