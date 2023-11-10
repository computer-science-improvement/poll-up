function getRandomSubset(arr, subsetSize) {
    if (subsetSize > arr.length) {
        console.error('Subset size is larger than the array size');
        return [];
    }

    const shuffled = arr.slice(); // Create a shallow copy of the original array
    for (let i = shuffled.length - 1; i > 0; i--) {
        // Shuffle the array using the Fisher-Yates algorithm
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled.slice(0, subsetSize); // Take the first `subsetSize` elements
}

const hobbies = [
    'Reading',
    'Gardening',
    'Cooking',
    'Painting',
    'Hiking',
    'Photography',
    'Playing a musical instrument',
    'Dancing',
    'Fishing',
    'Camping',
    'Birdwatching',
    'Playing sports',
    'Yoga',
    'Knitting or crocheting',
    'Writing',
    'Cycling',
    'Swimming',
    'Woodworking',
    'Collecting',
    'Model building',
    'DIY home improvement projects',
    'Birdwatching',
    'Meditation',
    'Volunteering',
    'Geocaching',
];

const workPositions = [
    'CEO (Chief Executive Officer)',
    'CFO (Chief Financial Officer)',
    'CTO (Chief Technology Officer)',
    'CMO (Chief Marketing Officer)',
    'COO (Chief Operating Officer)',
    'President',
    'Vice President',
    'Director',
    'Manager',
    'Supervisor',
    'Accountant',
    'Software Engineer',
    'Nurse',
    'Teacher',
    'Sales Representative',
    'Administrative Assistant',
    'Project Manager',
    'Human Resources (HR) Manager',
    'Financial Analyst',
    'Graphic Designer',
    'Customer Service Representative',
    'Lawyer',
    'Doctor',
    'Electrician',
    'Mechanic',
];

const subsetSize = 5;

export const getRandomHobbies = () => {
    return getRandomSubset(hobbies, subsetSize).join(', ');
};

export const getRandomPosition = () => {
    return getRandomSubset(workPositions, 1)[0];
};

const conversationTopics = [
    "Hobbies and Interests",
    "Travel",
    "Family and Background",
    "Career and Ambitions",
    "Books and Movies",
    "Personal Achievements",
    "Dreams and Aspirations",
    "Values and Beliefs",
    "Food and Dining",
    "Current Events and Issues",
    "Pets"
];

export const getRandomTopics = () => {
    return getRandomSubset(conversationTopics, 2).join(', ');
}
