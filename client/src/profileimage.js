// Step 1: Create an array with image URLs
const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDXP-hiOggEEs0Y7Ixv2tEy09WpRDS4xPPszh8gKCoRQxGM9NyOqyYhWkU-IJeYu1KwLk&usqp=CAU',
  'https://i.redd.it/k5v48axtppqc1.jpeg',
  'https://t3.ftcdn.net/jpg/01/74/16/14/360_F_174161495_D44ndy02LR9Isyl6ACIZs21m8WcuizGl.jpg',,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_R16i3mP7X72-kAdAXKUEZJTsi4rGqfwMiw&s"
  // Add more image URLs here
];

// Step 2: Function to get a random image
function getRandomImage() {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
}

// Usage
export const randomImage = getRandomImage();
