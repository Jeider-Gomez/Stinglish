
import type { DiagnosticQuestion, ExerciseQuestion } from '../types';

// Large pool of questions to ensure variety
const diagnosticQuestionPool: DiagnosticQuestion[] = [
  // --- Multiple Choice (A1/A2) ---
  {
    id: "mc-1",
    type: "multiple-choice",
    question: "What _____ your name?",
    options: ["is", "are", "am", "be"],
    correctAnswer: "is"
  },
  {
    id: "mc-2",
    type: "multiple-choice",
    question: "I _____ from Canada.",
    options: ["is", "are", "am", "be"],
    correctAnswer: "am"
  },
  {
    id: "mc-3",
    type: "multiple-choice",
    question: "She _____ to the store yesterday.",
    options: ["go", "goes", "went", "gone"],
    correctAnswer: "went"
  },
  {
    id: "mc-4",
    type: "multiple-choice",
    question: "There aren't _____ apples left.",
    options: ["some", "any", "much", "a"],
    correctAnswer: "any"
  },
  {
    id: "mc-5",
    type: "multiple-choice",
    question: "He is _____ than his brother.",
    options: ["tall", "taller", "tallest", "more tall"],
    correctAnswer: "taller"
  },
  {
    id: "mc-6",
    type: "multiple-choice",
    question: "_____ you like pizza?",
    options: ["Does", "Do", "Are", "Is"],
    correctAnswer: "Do"
  },
  {
    id: "mc-7",
    type: "multiple-choice",
    question: "They _____ playing soccer right now.",
    options: ["is", "am", "are", "be"],
    correctAnswer: "are"
  },
  {
    id: "mc-8",
    type: "multiple-choice",
    question: "I have _____ been to Japan.",
    options: ["ever", "never", "did", "was"],
    correctAnswer: "never"
  },
  {
    id: "mc-9",
    type: "multiple-choice",
    question: "We usually _____ dinner at 7 PM.",
    options: ["eat", "eats", "eating", "ate"],
    correctAnswer: "eat"
  },
  {
    id: "mc-10",
    type: "multiple-choice",
    question: "This book is _____.",
    options: ["my", "mine", "me", "I"],
    correctAnswer: "mine"
  },

  // --- Fill in the Blank (Writing) ---
  {
    id: "fb-1",
    type: "fill-in-the-blank",
    question: "Complete the sentence: My brother's daughter is my ______.",
    options: [],
    correctAnswer: "niece"
  },
  {
    id: "fb-2",
    type: "fill-in-the-blank",
    question: "Write the past participle of 'write':",
    options: [],
    correctAnswer: "written"
  },
  {
    id: "fb-3",
    type: "fill-in-the-blank",
    question: "Opposite of 'Hot' is ______.",
    options: [],
    correctAnswer: "cold"
  },
  {
    id: "fb-4",
    type: "fill-in-the-blank",
    question: "Type the correct preposition: I am good _____ math.",
    options: [],
    correctAnswer: "at"
  },
  {
    id: "fb-5",
    type: "fill-in-the-blank",
    question: "Write the plural of 'Child':",
    options: [],
    correctAnswer: "children"
  },
  {
    id: "fb-6",
    type: "fill-in-the-blank",
    question: "Yesterday, I ______ (buy) a new car.",
    options: [],
    correctAnswer: "bought"
  },
  {
    id: "fb-7",
    type: "fill-in-the-blank",
    question: "She ______ (study) English for 3 years.",
    options: [],
    correctAnswer: "has studied"
  },
  {
    id: "fb-8",
    type: "fill-in-the-blank",
    question: "Monday, Tuesday, Wednesday, _______, Friday.",
    options: [],
    correctAnswer: "thursday"
  },

  // --- Order Sentence (Syntax) ---
  {
    id: "os-1",
    type: "order-sentence",
    question: "Arrange the words to form a correct sentence:",
    options: ["is", "My", "color", "blue", "favorite"],
    correctAnswer: "My favorite color is blue"
  },
  {
    id: "os-2",
    type: "order-sentence",
    question: "Put the words in order:",
    options: ["you", "Where", "from", "are", "?"],
    correctAnswer: "Where are you from ?"
  },
  {
    id: "os-3",
    type: "order-sentence",
    question: "Make a sentence:",
    options: ["don't", "I", "understand", "question", "the"],
    correctAnswer: "I don't understand the question"
  },
  {
    id: "os-4",
    type: "order-sentence",
    question: "Order the words:",
    options: ["time", "What", "it", "is", "?"],
    correctAnswer: "What time is it ?"
  },
  {
    id: "os-5",
    type: "order-sentence",
    question: "Form a sentence:",
    options: ["can", "swim", "very", "He", "well"],
    correctAnswer: "He can swim very well"
  },
  {
    id: "os-6",
    type: "order-sentence",
    question: "Arrange correctly:",
    options: ["yesterday", "cinema", "to", "went", "We", "the"],
    correctAnswer: "We went to the cinema yesterday"
  },
  {
    id: "os-7",
    type: "order-sentence",
    question: "Put in order:",
    options: ["book", "reading", "is", "interesting", "This", "very"],
    correctAnswer: "This book is very interesting"
  },
  {
    id: "os-8",
    type: "order-sentence",
    question: "Make a question:",
    options: ["old", "How", "you", "are", "?"],
    correctAnswer: "How old are you ?"
  }
];

// Function to get 10 random questions
export const getRandomDiagnosticQuestions = (): DiagnosticQuestion[] => {
  // Fisher-Yates shuffle algorithm
  const shuffled = [...diagnosticQuestionPool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Return first 10
  return shuffled.slice(0, 10);
};

export const exerciseQuestions: { [topic: string]: ExerciseQuestion[] } = {
  "Present Simple vs. Continuous": [
    {
      question: "Listen! The baby _____.",
      options: ["cries", "is crying", "cry", "does cry"],
      correctAnswer: "is crying",
      explanation: "Use the Present Continuous for actions happening at the moment of speaking. 'Listen!' is a key signal word."
    },
    {
      question: "Nurses _____ people in hospitals.",
      options: ["look after", "are looking after", "looks after", "is looking after"],
      correctAnswer: "look after",
      explanation: "Use the Present Simple for general truths, habits, and routines. This is a general statement about what nurses do."
    },
    {
        question: "He usually _____ coffee in the morning, but today he _____ tea.",
        options: ["drinks / is drinking", "is drinking / drinks", "drink / is drinking", "drinks / drinks"],
        correctAnswer: "drinks / is drinking",
        explanation: "'Usually' indicates a routine (Present Simple), while 'today' indicates a temporary action happening now (Present Continuous)."
    },
    {
        question: "What _____ you _____ about? You look serious.",
        options: ["do / think", "are / thinking", "do / thinking", "are / think"],
        correctAnswer: "are / thinking",
        explanation: "This question asks about an action happening right now ('You look serious'), so we use the Present Continuous."
    },
    {
        question: "The earth _____ around the sun.",
        options: ["is going", "goes", "go", "does go"],
        correctAnswer: "goes",
        explanation: "Use the Present Simple for scientific facts or general truths that are always true."
    }
  ],
  "Past Simple": [
    {
      question: "I _____ a great movie last night.",
      options: ["see", "saw", "seen", "was seeing"],
      correctAnswer: "saw",
      explanation: "'last night' indicates a completed action in the past, so we use the Past Simple tense. 'Saw' is the past simple form of 'see'."
    },
    {
      question: "They _____ to Paris for their vacation last year.",
      options: ["travel", "traveled", "were traveling", "have traveled"],
      correctAnswer: "traveled",
      explanation: "'last year' specifies a finished time in the past, requiring the Past Simple tense."
    },
    {
        question: "_____ you _____ the homework?",
        options: ["Did / finish", "Do / finished", "Have / finished", "Were / finishing"],
        correctAnswer: "Did / finish",
        explanation: "To make a question in the Past Simple, we use 'Did' + subject + the base form of the verb ('finish')."
    },
    {
        question: "She _____ at home yesterday because she was sick.",
        options: ["stayed", "stays", "was staying", "has stayed"],
        correctAnswer: "stayed",
        explanation: "The word 'yesterday' points to a specific, completed time in the past, so the Past Simple 'stayed' is correct."
    },
    {
        question: "We _____ happy to see them at the party.",
        options: ["was", "were", "are", "be"],
        correctAnswer: "were",
        explanation: "The subject 'We' is plural, so we use the plural past simple form of 'to be', which is 'were'."
    }
  ],
  "Prepositions of Time": [
    {
        question: "My birthday is _____ July.",
        options: ["on", "at", "in", "by"],
        correctAnswer: "in",
        explanation: "We use 'in' for months, years, and seasons (e.g., in July, in 2024, in summer)."
    },
    {
        question: "The meeting is scheduled _____ 3 PM.",
        options: ["on", "at", "in", "for"],
        correctAnswer: "at",
        explanation: "We use 'at' for specific times of the day (e.g., at 3 PM, at noon, at midnight)."
    },
    {
        question: "I will see you _____ Friday.",
        options: ["on", "at", "in", "from"],
        correctAnswer: "on",
        explanation: "We use 'on' for specific days of the week and dates (e.g., on Friday, on May 1st)."
    },
    {
        question: "He was born _____ 1995.",
        options: ["on", "at", "in", "since"],
        correctAnswer: "in",
        explanation: "We use 'in' for years (e.g., in 1995)."
    },
    {
        question: "We often go to the beach _____ the summer.",
        options: ["on", "at", "in", "while"],
        correctAnswer: "in",
        explanation: "We use 'in' for seasons (e.g., in the summer, in winter)."
    }
  ],
  "Phrasal Verbs (Common)": [
     {
        question: "Please _____ your shoes before you enter the house.",
        options: ["take off", "take on", "take in", "take up"],
        correctAnswer: "take off",
        explanation: "'Take off' means to remove something, especially clothing."
    },
    {
        question: "I need to _____ the meaning of this word in the dictionary.",
        options: ["look at", "look for", "look up", "look over"],
        correctAnswer: "look up",
        explanation: "'Look up' means to search for information in a book or database."
    },
    {
        question: "She couldn't come to the party because she had to _____ her little sister.",
        options: ["look for", "look after", "look into", "look out"],
        correctAnswer: "look after",
        explanation: "'Look after' means to take care of someone or something."
    },
    {
        question: "Don't _____! You can solve this problem.",
        options: ["give in", "give up", "give away", "give back"],
        correctAnswer: "give up",
        explanation: "'Give up' means to stop trying or to quit."
    },
    {
        question: "The car _____ of gas on the highway.",
        options: ["ran out", "ran over", "ran into", "ran away"],
        correctAnswer: "ran out",
        explanation: "'Run out of' something means to use all of it and have no more left."
    }
  ],
  "Articles (a, an, the)": [
    {
        question: "She is _____ doctor.",
        options: ["a", "an", "the", "— (no article)"],
        correctAnswer: "a",
        explanation: "Use 'a' before a singular, countable noun (like 'doctor') that begins with a consonant sound."
    },
    {
        question: "Can you pass me _____ salt, please?",
        options: ["a", "an", "the", "— (no article)"],
        correctAnswer: "the",
        explanation: "Use 'the' when referring to a specific item that both the speaker and listener know about (the specific salt on the table)."
    },
    {
        question: "I saw _____ elephant at the zoo.",
        options: ["a", "an", "the", "— (no article)"],
        correctAnswer: "an",
        explanation: "Use 'an' before a singular, countable noun (like 'elephant') that begins with a vowel sound."
    },
    {
        question: "_____ moon looks beautiful tonight.",
        options: ["A", "An", "The", "— (no article)"],
        correctAnswer: "The",
        explanation: "Use 'the' for unique objects like the moon, the sun, or the sky."
    },
    {
        question: "He wants to be _____ engineer when he grows up.",
        options: ["a", "an", "the", "— (no article)"],
        correctAnswer: "an",
        explanation: "Use 'an' because the word 'engineer' starts with a vowel sound."
    }
  ]
};
