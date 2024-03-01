interface ChatUser {
  id: number;
  username: string;
  userImg: string;
  role: string;
  status: string;
}

const generateRandomName = () => {
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emma",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
    "Katherine",
    "Liam",
    "Mia",
    "Noah",
    "Olivia",
    "Peter",
    "Quinn",
    "Rachel",
    "Samuel",
    "Tara",
  ];

  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
    "Anderson",
    "Thomas",
    "Jackson",
    "White",
    "Harris",
    "Martin",
    "Thompson",
    "Garcia",
  ];

  const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
  const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);

  return `${firstNames[randomFirstNameIndex]} ${lastNames[randomLastNameIndex]}`;
};

const generateRandomImageURL = () => {
  const imageUrls = [
    "https://i.pinimg.com/564x/30/17/ac/3017acf351b14bef57bc05782e622c83.jpg",
    "https://i.pinimg.com/564x/b2/ea/a0/b2eaa0d4918d54021f9c7aa3fc3d3cf3.jpg",
    "https://i.pinimg.com/736x/c9/03/50/c90350bfe1c75eced3fd98cf1954d5fc.jpg",
    "https://i.pinimg.com/736x/bb/7b/d7/bb7bd7bd8bdac9630a1efdbdb4cd50a7.jpg",
    "https://i.pinimg.com/564x/8e/a2/e6/8ea2e6e435c9c1f4980727ad70c09f88.jpg",
    "https://i.pinimg.com/736x/51/f6/48/51f648ab427bae4b484fb2fc70d2a4bc.jpg",
    "https://i.pinimg.com/736x/27/17/99/2717997fe9cfc42f6f99bf8a4758533a.jpg",
  ];
  const randomIndex = Math.floor(Math.random() * imageUrls.length);
  return imageUrls[randomIndex];
};

const generateRandomStatus = () => {
  const statuses = ["Online", "Away", "Busy"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

const generateRandomRole = () => {
  const roles = ["Admin", "Write", "HR"];
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};

export const ChatData: ChatUser[] = [];
for (let i = 1; i <= 20; i++) {
  ChatData.push({
    id: Math.floor(Math.random() * 1000) + 1, // Random id between 1 and 1000
    username: generateRandomName(),
    userImg: generateRandomImageURL(),
    role: generateRandomRole(),
    status: generateRandomStatus(),
  });
}

export default ChatData;
