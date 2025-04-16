import { InterviewQuestion } from '../types/types';

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: '1',
    question: 'What is the difference between let, const, and var in JavaScript?',
    answer: 'var is function-scoped and can be changed and used again. let and const are block-scoped. let can be changed but not reused in the same block, while const cannot be changed or reused.',
    seniority: 'junior',
    category: 'JavaScript Fundamentals'
  },
  {
    id: '2',
    question: 'What is the DOM?',
    answer: 'The DOM (Document Object Model) is a way for JavaScript to interact with the content and structure of a web page.',
    seniority: 'junior',
    category: 'Web APIs'
  },
  {
    id: '3',
    question: 'What is an event listener in JavaScript?',
    answer: 'An event listener waits for a user action, like a click or key press, and then runs a function when that action happens.',
    seniority: 'junior',
    category: 'JavaScript Fundamentals'
  },
  {
    id: '4',
    question: 'What is the difference between == and ===?',
    answer: '== checks if values are the same, even if the types are different. === checks if the values and types are the same.',
    seniority: 'junior',
    category: 'JavaScript Fundamentals'
  },
  {
    id: '5',
    question: 'What is a function in JavaScript?',
    answer: 'A function is a block of code that you can reuse. It runs when you call it and can take inputs and return a result.',
    seniority: 'junior',
    category: 'JavaScript Fundamentals'
  },
  {
    id: '6',
    question: 'What is the purpose of CSS?',
    answer: 'CSS is used to style and layout web pages, like setting colours, fonts, and spacing.',
    seniority: 'junior',
    category: 'CSS'
  },
  {
    id: '7',
    question: 'What is responsive design?',
    answer: 'Responsive design makes sure a website looks good and works well on all screen sizes, from phones to desktops.',
    seniority: 'junior',
    category: 'HTML & CSS'
  },
  {
    id: '8',
    question: 'What is a semantic HTML tag?',
    answer: 'Semantic tags clearly describe their meaning. For example, <header> is for the top of a page, and <footer> is for the bottom.',
    seniority: 'junior',
    category: 'HTML'
  },
  {
    id: '9',
    question: 'What is Git and why is it useful?',
    answer: 'Git is a tool that helps you track changes in your code, work with others, and go back to earlier versions if needed.',
    seniority: 'junior',
    category: 'Tools & Workflow'
  },
  {
    id: '10',
    question: 'What does the “this” keyword refer to in JavaScript?',
    answer: '“this” refers to the object that is currently running the code. Its value depends on how the function is called.',
    seniority: 'junior',
    category: 'JavaScript Fundamentals'
  },
  {
    id: '11',
    question: 'Explain the concept of closures in JavaScript.',
    answer: 'A closure is the combination of a function and the lexical environment within which that function was declared. It allows a function to access variables from its outer scope even after the outer function has returned. Closures are commonly used for data privacy and creating function factories.',
    seniority: 'mid-level',
    category: 'JavaScript Concepts'
  },
  {
    id: '12',
    question: 'Explain the virtual DOM and its benefits in React.',
    answer: 'The Virtual DOM is a lightweight copy of the actual DOM in memory. When state changes in a React application, it first updates the virtual DOM, compares it with the previous version (diffing), and then efficiently updates only the necessary parts of the actual DOM. This process, called reconciliation, improves performance by minimizing expensive DOM operations.',
    seniority: 'mid-level',
    category: 'React'
  },
  {
    id: '13',
    question: 'Explain the concept of micro-frontends and when would you use them?',
    answer: 'Micro-frontends is an architectural style where a frontend app is decomposed into independent, smaller applications. Each can be developed, tested, and deployed independently, often by different teams. This approach is useful for large applications where multiple teams work on different features, enabling better scalability and maintenance. However, it adds complexity in terms of integration, shared dependencies, and consistent user experience.',
    seniority: 'senior',
    category: 'Architecture'
  }
]; 