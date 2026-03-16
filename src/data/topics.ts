export interface Topic {
  id: string;
  title: string;
  description: string;
  content: string;
  keyPoints: string[];
  icon: string;
}

export interface Question {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const topics: Topic[] = [
  {
    id: 'prog-basics',
    title: 'Programming Basics',
    description: 'Core concepts of programming including variables, control flow, and functions.',
    content: 'Programming is the process of creating instructions for computers. It involves writing code in specific languages that machines can interpret and execute. Key concepts include variables (containers for data), control flow (decision-making with if/else), loops (repetition), and functions (reusable blocks of code).',
    keyPoints: ['Variables store data values', 'Control flow directs program execution', 'Functions enable code reuse', 'Loops handle repetitive tasks'],
    icon: 'Code2',
  },
  {
    id: 'js-fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Deep dive into JavaScript core — closures, prototypes, async patterns.',
    content: 'JavaScript is a dynamic, interpreted language powering the web. Key concepts include closures (functions that remember their lexical scope), the event loop (handling asynchronous operations), prototypal inheritance, and modern ES6+ features like destructuring, arrow functions, and modules.',
    keyPoints: ['Closures capture lexical scope', 'Event loop enables async programming', 'Prototypal inheritance chain', 'ES6+ modern syntax features'],
    icon: 'Braces',
  },
  {
    id: 'data-structures',
    title: 'Data Structures',
    description: 'Arrays, linked lists, trees, graphs, and hash tables explained.',
    content: 'Data structures are ways to organize and store data for efficient access and modification. Arrays provide indexed access, linked lists enable dynamic sizing, trees model hierarchical data, graphs represent networks, and hash tables offer near-constant-time lookups.',
    keyPoints: ['Arrays: O(1) access by index', 'Linked lists: dynamic insertion', 'Trees: hierarchical relationships', 'Hash tables: fast key-value lookup'],
    icon: 'Network',
  },
  {
    id: 'ai-basics',
    title: 'Artificial Intelligence Basics',
    description: 'Introduction to machine learning, neural networks, and AI concepts.',
    content: 'Artificial Intelligence encompasses techniques that enable machines to mimic human intelligence. Machine learning uses statistical methods to learn from data. Neural networks model brain-like computation. Key areas include supervised learning, unsupervised learning, and reinforcement learning.',
    keyPoints: ['ML learns patterns from data', 'Neural networks model brain computation', 'Supervised vs unsupervised learning', 'AI applications in real world'],
    icon: 'Brain',
  },
  {
    id: 'electronics',
    title: 'Electronics Fundamentals',
    description: 'Circuit theory, semiconductor devices, and digital logic basics.',
    content: 'Electronics deals with the flow and control of electrons. Key concepts include Ohm\'s law, Kirchhoff\'s laws, semiconductor physics (diodes, transistors), and digital logic gates (AND, OR, NOT). Understanding these forms the basis of all modern computing hardware.',
    keyPoints: ['Ohm\'s law: V = IR', 'Semiconductors enable switching', 'Logic gates form computation basis', 'Analog vs digital signals'],
    icon: 'Cpu',
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning',
    description: 'Pattern recognition, deductive reasoning, and analytical thinking.',
    content: 'Logical reasoning involves drawing conclusions from premises using systematic thinking. It includes deductive reasoning (general to specific), inductive reasoning (specific to general), and abductive reasoning (best explanation). Critical for problem-solving and competitive exams.',
    keyPoints: ['Deductive: general → specific', 'Inductive: specific → general', 'Pattern recognition skills', 'Syllogisms and logical operators'],
    icon: 'Lightbulb',
  },
];

export const questions: Question[] = [
  // Programming Basics
  { id: 'q1', topicId: 'prog-basics', question: 'What is a variable in programming?', options: ['A fixed constant', 'A container for storing data values', 'A type of loop', 'A function parameter only'], correctAnswer: 1 },
  { id: 'q2', topicId: 'prog-basics', question: 'Which of the following is a loop structure?', options: ['if-else', 'switch', 'for', 'try-catch'], correctAnswer: 2 },
  { id: 'q3', topicId: 'prog-basics', question: 'What does a function do?', options: ['Stores data permanently', 'Encapsulates reusable code', 'Defines a variable type', 'Creates a class'], correctAnswer: 1 },
  { id: 'q4', topicId: 'prog-basics', question: 'Which is NOT a primitive data type?', options: ['String', 'Number', 'Array', 'Boolean'], correctAnswer: 2 },
  { id: 'q5', topicId: 'prog-basics', question: 'What is an algorithm?', options: ['A programming language', 'A step-by-step procedure to solve a problem', 'A data type', 'A hardware component'], correctAnswer: 1 },
  { id: 'q6', topicId: 'prog-basics', question: 'What is the purpose of a conditional statement?', options: ['To repeat code', 'To make decisions in code', 'To define variables', 'To import modules'], correctAnswer: 1 },
  { id: 'q7', topicId: 'prog-basics', question: 'What does "debugging" mean?', options: ['Writing new code', 'Finding and fixing errors', 'Compiling code', 'Deleting code'], correctAnswer: 1 },
  { id: 'q8', topicId: 'prog-basics', question: 'What is pseudocode?', options: ['Actual code in Python', 'An informal description of an algorithm', 'Machine language', 'A type of compiler'], correctAnswer: 1 },
  { id: 'q9', topicId: 'prog-basics', question: 'Which operator is used for assignment?', options: ['==', '=', '===', '!='], correctAnswer: 1 },
  { id: 'q10', topicId: 'prog-basics', question: 'What is recursion?', options: ['A loop that never ends', 'A function calling itself', 'A type of variable', 'An error type'], correctAnswer: 1 },

  // JavaScript Fundamentals
  { id: 'q11', topicId: 'js-fundamentals', question: 'Which of the following best describes a "Closure" in JavaScript?', options: ['A way to close browser tabs', 'A function with access to its outer scope variables', 'A method to end loops', 'A type of error handling'], correctAnswer: 1 },
  { id: 'q12', topicId: 'js-fundamentals', question: 'What is the event loop responsible for?', options: ['Rendering HTML', 'Managing asynchronous callbacks', 'Compiling JavaScript', 'Handling CSS animations'], correctAnswer: 1 },
  { id: 'q13', topicId: 'js-fundamentals', question: 'What does "hoisting" mean in JavaScript?', options: ['Moving code to a server', 'Declarations moved to the top of scope', 'Removing unused variables', 'Optimizing performance'], correctAnswer: 1 },
  { id: 'q14', topicId: 'js-fundamentals', question: 'Which keyword declares a block-scoped variable?', options: ['var', 'let', 'function', 'global'], correctAnswer: 1 },
  { id: 'q15', topicId: 'js-fundamentals', question: 'What is a Promise?', options: ['A guaranteed return value', 'An object representing eventual completion of async operation', 'A type of loop', 'A debugging tool'], correctAnswer: 1 },
  { id: 'q16', topicId: 'js-fundamentals', question: 'What does Array.prototype.map() return?', options: ['undefined', 'A new array with transformed elements', 'The original array', 'A boolean'], correctAnswer: 1 },
  { id: 'q17', topicId: 'js-fundamentals', question: 'What is "this" in JavaScript?', options: ['Always refers to the global object', 'Refers to the current execution context', 'A reserved variable name', 'A method name'], correctAnswer: 1 },
  { id: 'q18', topicId: 'js-fundamentals', question: 'What is destructuring?', options: ['Deleting objects', 'Extracting values from arrays/objects', 'Creating classes', 'Error handling'], correctAnswer: 1 },
  { id: 'q19', topicId: 'js-fundamentals', question: 'Which is NOT a JavaScript data type?', options: ['Symbol', 'BigInt', 'Float', 'Undefined'], correctAnswer: 2 },
  { id: 'q20', topicId: 'js-fundamentals', question: 'What does async/await simplify?', options: ['DOM manipulation', 'Promise-based async code', 'CSS styling', 'Event delegation'], correctAnswer: 1 },

  // Data Structures
  { id: 'q21', topicId: 'data-structures', question: 'What is the time complexity of accessing an array element by index?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n²)'], correctAnswer: 1 },
  { id: 'q22', topicId: 'data-structures', question: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctAnswer: 1 },
  { id: 'q23', topicId: 'data-structures', question: 'What is a binary search tree?', options: ['A tree with exactly two nodes', 'A tree where left child < parent < right child', 'A balanced array', 'A type of graph'], correctAnswer: 1 },
  { id: 'q24', topicId: 'data-structures', question: 'Which structure uses LIFO?', options: ['Queue', 'Stack', 'Linked List', 'Hash Table'], correctAnswer: 1 },
  { id: 'q25', topicId: 'data-structures', question: 'What is a hash collision?', options: ['Two keys mapping to the same index', 'A data corruption error', 'A memory overflow', 'A sorting failure'], correctAnswer: 0 },
  { id: 'q26', topicId: 'data-structures', question: 'What is the advantage of a linked list over an array?', options: ['Faster access', 'Dynamic size and efficient insertion', 'Less memory usage', 'Better sorting'], correctAnswer: 1 },
  { id: 'q27', topicId: 'data-structures', question: 'What does BFS stand for?', options: ['Binary Find System', 'Breadth-First Search', 'Best-First Sort', 'Basic File Structure'], correctAnswer: 1 },
  { id: 'q28', topicId: 'data-structures', question: 'What is a heap data structure?', options: ['A stack variant', 'A complete binary tree with heap property', 'A type of hash table', 'An unsorted array'], correctAnswer: 1 },
  { id: 'q29', topicId: 'data-structures', question: 'What is graph adjacency?', options: ['A sorting algorithm', 'Whether two vertices are connected', 'The depth of a tree', 'A hash function'], correctAnswer: 1 },
  { id: 'q30', topicId: 'data-structures', question: 'What is the worst-case time for searching in a BST?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctAnswer: 2 },

  // AI Basics
  { id: 'q31', topicId: 'ai-basics', question: 'What is supervised learning?', options: ['Learning without data', 'Learning from labeled data', 'Learning by trial and error', 'Unsupervised clustering'], correctAnswer: 1 },
  { id: 'q32', topicId: 'ai-basics', question: 'What is a neural network?', options: ['A computer network', 'A model inspired by biological neurons', 'A database system', 'A programming language'], correctAnswer: 1 },
  { id: 'q33', topicId: 'ai-basics', question: 'What is overfitting?', options: ['Model too simple', 'Model memorizes training data', 'Model runs too fast', 'Model uses too little data'], correctAnswer: 1 },
  { id: 'q34', topicId: 'ai-basics', question: 'What does NLP stand for?', options: ['New Language Protocol', 'Natural Language Processing', 'Neural Logic Programming', 'Network Layer Protocol'], correctAnswer: 1 },
  { id: 'q35', topicId: 'ai-basics', question: 'What is reinforcement learning?', options: ['Learning from rewards and penalties', 'Learning from labeled data', 'Learning from clustering', 'Learning from rules'], correctAnswer: 0 },
  { id: 'q36', topicId: 'ai-basics', question: 'What is a feature in ML?', options: ['A software update', 'An input variable used for prediction', 'A type of neural network', 'An output label'], correctAnswer: 1 },
  { id: 'q37', topicId: 'ai-basics', question: 'What is the purpose of a training set?', options: ['To test the model', 'To teach the model patterns', 'To deploy the model', 'To visualize data'], correctAnswer: 1 },
  { id: 'q38', topicId: 'ai-basics', question: 'What is deep learning?', options: ['Learning from shallow data', 'Neural networks with many layers', 'A type of database', 'Manual feature engineering'], correctAnswer: 1 },
  { id: 'q39', topicId: 'ai-basics', question: 'What is a classification problem?', options: ['Predicting a continuous value', 'Predicting a category or class', 'Grouping without labels', 'Optimizing a function'], correctAnswer: 1 },
  { id: 'q40', topicId: 'ai-basics', question: 'What is gradient descent?', options: ['A data structure', 'An optimization algorithm', 'A neural network type', 'A classification method'], correctAnswer: 1 },

  // Electronics
  { id: 'q41', topicId: 'electronics', question: 'What does Ohm\'s law state?', options: ['P = IV', 'V = IR', 'F = ma', 'E = mc²'], correctAnswer: 1 },
  { id: 'q42', topicId: 'electronics', question: 'What is a semiconductor?', options: ['A perfect conductor', 'Material with conductivity between conductor and insulator', 'A type of resistor', 'A capacitor'], correctAnswer: 1 },
  { id: 'q43', topicId: 'electronics', question: 'What is the function of a diode?', options: ['Amplify signals', 'Allow current in one direction', 'Store energy', 'Measure voltage'], correctAnswer: 1 },
  { id: 'q44', topicId: 'electronics', question: 'What is a logic gate?', options: ['A physical gate', 'A basic digital circuit element', 'A type of memory', 'A power supply'], correctAnswer: 1 },
  { id: 'q45', topicId: 'electronics', question: 'What does AND gate output when both inputs are 1?', options: ['0', '1', 'Undefined', 'Error'], correctAnswer: 1 },
  { id: 'q46', topicId: 'electronics', question: 'What is capacitance?', options: ['Resistance to current', 'Ability to store electric charge', 'Voltage amplification', 'Current frequency'], correctAnswer: 1 },
  { id: 'q47', topicId: 'electronics', question: 'What is the unit of resistance?', options: ['Farad', 'Ohm', 'Watt', 'Ampere'], correctAnswer: 1 },
  { id: 'q48', topicId: 'electronics', question: 'What is an op-amp?', options: ['A type of resistor', 'A high-gain voltage amplifier', 'A digital gate', 'A power source'], correctAnswer: 1 },
  { id: 'q49', topicId: 'electronics', question: 'What is AC?', options: ['Alternating Current', 'Active Circuit', 'Ampere Count', 'Analog Conversion'], correctAnswer: 0 },
  { id: 'q50', topicId: 'electronics', question: 'What is a transistor used for?', options: ['Only as a switch', 'Switching and amplification', 'Only storing data', 'Only measuring current'], correctAnswer: 1 },

  // Logical Reasoning
  { id: 'q51', topicId: 'logical-reasoning', question: 'All cats are animals. Some animals are pets. Which is valid?', options: ['All cats are pets', 'Some cats may be pets', 'No cats are pets', 'All pets are cats'], correctAnswer: 1 },
  { id: 'q52', topicId: 'logical-reasoning', question: 'What comes next: 2, 6, 12, 20, ?', options: ['28', '30', '32', '24'], correctAnswer: 1 },
  { id: 'q53', topicId: 'logical-reasoning', question: 'If A > B and B > C, then?', options: ['C > A', 'A > C', 'A = C', 'Cannot determine'], correctAnswer: 1 },
  { id: 'q54', topicId: 'logical-reasoning', question: 'What is a syllogism?', options: ['A math formula', 'A form of deductive reasoning', 'A type of graph', 'A programming concept'], correctAnswer: 1 },
  { id: 'q55', topicId: 'logical-reasoning', question: 'Find the odd one out: 3, 5, 7, 9, 11', options: ['3', '9', '5', '11'], correctAnswer: 1 },
  { id: 'q56', topicId: 'logical-reasoning', question: 'What is deductive reasoning?', options: ['Specific to general', 'General to specific', 'Random guessing', 'Trial and error'], correctAnswer: 1 },
  { id: 'q57', topicId: 'logical-reasoning', question: 'If it rains, the ground is wet. The ground is wet. Can we conclude it rained?', options: ['Yes, definitely', 'No, other causes possible', 'Only if no sprinklers', 'Always true'], correctAnswer: 1 },
  { id: 'q58', topicId: 'logical-reasoning', question: 'What is a Venn diagram used for?', options: ['Drawing circles', 'Showing logical relationships between sets', 'Plotting data points', 'Designing circuits'], correctAnswer: 1 },
  { id: 'q59', topicId: 'logical-reasoning', question: 'Complete: 1, 1, 2, 3, 5, 8, ?', options: ['10', '11', '13', '12'], correctAnswer: 2 },
  { id: 'q60', topicId: 'logical-reasoning', question: 'What is the contrapositive of "If P then Q"?', options: ['If Q then P', 'If not Q then not P', 'If not P then not Q', 'If P then not Q'], correctAnswer: 1 },
];

export const getTopicQuestions = (topicId: string) => 
  questions.filter(q => q.topicId === topicId);
