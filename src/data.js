const TestimonialData = [{
    Name: "Priya Sharma",
    City: "Mumbai",
    Image: "/assets/girl.png",
    Description: "Enrolling in Modern Mannerism's Professional Image & Attire program was one of the best decisions I made for my career. The training helped me refine my professional appearance and demeanor, boosting my confidence in corporate settings. Highly recommended!"
  },{
    Name: "Rajesh Patel",
    City: "Delhi",
    Image: "/assets/employee.png",
    Description: "Attending Modern Mannerism's Communication & Soft Skills Training was a game-changer for me. The sessions were interactive and practical, equipping me with the necessary skills to excel in my professional and personal life. Thank you, Modern Mannerism!"
  },{
    Name: "Harshad Kajale",
    City: "Kalyan",
    Image: "/assets/employee.png",
    Description: "Even though I'm based in Kalyan, the impact of Modern Mannerism's training transcends geographical boundaries. Their Personality Enhancement Programme helped me unleash my full potential, leading to personal and professional growth beyond expectations. Grateful for their expertise!"
  },{
    Name: "Priyanka Reddy",
    City: "Hyderabad",
    Image: "/assets/girl.png",
    Description: "Modern Mannerism's Children’s Etiquette Programme has made a significant difference in my child's social skills and confidence. The engaging sessions taught valuable lessons in manners and behavior, laying a strong foundation for their future success. Thank you, Modern Mannerism!"
  },{
    Name: "Vicky More",
    City: "Bangalore",
    Image: "/assets/employee.png",
    Description: "As a corporate executive, the Business Etiquette & Corporate Image Programme by Modern Mannerism was instrumental in enhancing my professional image. The comprehensive training helped me navigate various business scenarios with ease and professionalism. Highly recommend it to all professionals!"
  }];

export default TestimonialData;


export const servicesData = [
  {
    id: "1", // Ensure the ID matches what's in the URL
    title: " EnhaPersonalityncement Programme",
    description: "Unlock your full potential with our Personality Enhancement Programme.",
    image: "/assets/PD.jpg",
    duration: "12 sessions (2 hours per session)"
  },
  {
    id: "2",
    title: "Business Etiquette & Corporate Image Programme",
    description: "Master the art of business etiquette and elevate your corporate image.",
    image: "/assets/BusinessHandshake.jpg",
    duration: "10 sessions"
  },
  {
    id: "3",
    title: "Children’s Etiquette Programme",
    description: "Teach your children essential etiquette skills in a fun and engaging way.",
    image: "/assets/Etiquettechildren.jpg",
    duration: "8 sessions"
  }
];
export const servicesDataPage = [
  {
    id: "3",
    title: "Children’s Etiquette Programme",
    heroimage:"",
    headline: "Empowering Tomorrow's Leaders with Polished Etiquette and Essential Life Skills",
    subheadline:
      "Designed for children aged 10–15, this program instills confidence, communication skills, and impeccable manners, setting the foundation for their future success.",
    overview:
      "In today’s world, mastering the art of etiquette and social grace is just as important as academic excellence. The Children’s Etiquette Program by Modern Mannerism equips young learners with essential life skills, helping them build confidence, respect, and empathy while preparing them to thrive in social, school, and family environments.",
    programOptions: [
      { title: "Group Workshops", description: "Fun and interactive sessions in a collaborative setting." },
      { title: "Private Sessions", description: "Personalized coaching tailored to your child’s unique needs." },
      
    ],
    learningPoints: [
      { title: "The Importance of Etiquette", description: "Why good manners matter in life and how they shape a positive personality." },
      { title: "Grooming and Personal Hygiene", description: "Basics of cleanliness and presentation for a polished appearance." },
      { title: "Personality Development", description: "Exercises and activities to boost self-awareness and confidence." },
      { title: "Etiquette – Fine Art & Fine Manners", description: "Social norms, politeness, and the art of being gracious in any setting." },
      { title: "Communication Skills", description: "Effective verbal and non-verbal communication techniques." },
      { title: "Conversation Skills", description: "How to start and maintain engaging conversations." },
      { title: "Body Language", description: "Understanding posture, gestures, and expressions for a confident presence." },
      { title: "Listening Skills", description: "The value of active listening in building meaningful relationships." },
      { title: "Building Confidence and Self-Esteem", description: "Practical tips and activities to help children feel secure and self-assured." },
      { title: "Meeting & Greeting", description: "How to introduce oneself, shake hands, and make a positive impression." },
      { title: "Deportment", description: "Poise and posture for an elegant and confident demeanor." },
      { title: "Dining Etiquette", description: "Table manners, cutlery usage, and navigating different dining scenarios." },
      { title: "School Etiquette", description: "Respectful behavior towards teachers and peers. Proper use of gadgets and handling group projects." },
      { title: "Life Skills", description: "Problem-solving, teamwork, and adaptability for everyday situations." },
    ],
    highlights: [
      "Interactive Activities: Hands-on exercises that keep children engaged.",
      "Role-Playing Scenarios: Real-life simulations to practice manners and etiquette.",
      "Tailored Learning: Content adapted to suit group dynamics or individual needs.",
      "Parental Involvement: Progress updates to help parents reinforce learning at home.",
    ],
    programDetails: {
      ageGroup: "10–15 years",
      format: ["Group Workshops", "Private Sessions"],
      duration: "Group Workshops: 2–3 hours per session. Private Sessions: 1-hour sessions, scheduled as per convenience.",
      location: ["In-person at designated venues", "Online options available upon request."],
    },
    testimonials: [
      {
        quote:
          "The Children’s Etiquette Program was a game-changer for my daughter. She’s now confident in her interactions and has become more respectful towards everyone. Thank you, Modern Mannerism!",
        author: "Priya Sharma, Parent",
      },{
        quote:
          "The Children’s Etiquette Program was a game-changer for my daughter. She’s now confident in her interactions and has become more respectful towards everyone. Thank you, Modern Mannerism!",
        author: "Priya Sharma, Parent",
      },{
        quote:
          "The Children’s Etiquette Program was a game-changer for my daughter. She’s now confident in her interactions and has become more respectful towards everyone. Thank you, Modern Mannerism!",
        author: "Priya Sharma, Parent",
      },
    ],
    faqData: [
      { question: "How many children are in a group workshop?", answer: "We keep group sizes small (6–10 children) to ensure personalized attention." },
      { question: "Can my child attend online sessions?", answer: "Yes, online options are available for private sessions. Group workshops are primarily in-person." },
      { question: "Are materials provided?", answer: "Yes, we provide workbooks and resources for practice at home." },
    ],
    contactDetails: {
      email: "info@modernmannerism.com",
      phone: "+1-800-555-ETIQ",
    },
  },
];
const blogs = [
  {
    id: 1,
    title: 'Mastering the Art of Personal Branding',
    slug: 'mastering-personal-branding',
    excerpt: 'Learn how to build your personal brand from scratch...',
    image: '/images/blog1.jpg',
    commentCount: 5
  },
  {
    id: 2,
    title: 'The Power of Communication Skills in Leadership',
    slug: 'communication-skills-leadership',
    excerpt: 'Discover the key communication techniques that every leader should know...',
    image: '/images/blog2.jpg',
    commentCount: 12
  },

  // Add more blog posts here...
];
