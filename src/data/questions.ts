import { InterviewQuestion } from '../types/types';

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: '1',
    question: 'What is the difference between let, const, and var in JavaScript?',
    answer: 'var has function scope and can be redeclared and updated. let has block scope, can be updated but not redeclared. const has block scope and cannot be updated or redeclared. Both let and const are hoisted but not initialized, leading to the temporal dead zone.',
    seniority: 'junior',
    category: 'JavaScript Fundamentals'
  },
  {
    id: '2',
    question: 'Explain the concept of closures in JavaScript.',
    answer: 'A closure is the combination of a function and the lexical environment within which that function was declared. It allows a function to access variables from its outer scope even after the outer function has returned. Closures are commonly used for data privacy and creating function factories.',
    seniority: 'mid-level',
    category: 'JavaScript Concepts'
  },
  {
    id: '3',
    question: 'Explain the virtual DOM and its benefits in React.',
    answer: 'The Virtual DOM is a lightweight copy of the actual DOM in memory. When state changes in a React application, it first updates the virtual DOM, compares it with the previous version (diffing), and then efficiently updates only the necessary parts of the actual DOM. This process, called reconciliation, improves performance by minimizing expensive DOM operations.',
    seniority: 'mid-level',
    category: 'React'
  },
  {
    id: '4',
    question: 'Explain the concept of micro-frontends and when would you use them?',
    answer: 'Micro-frontends is an architectural style where a frontend app is decomposed into independent, smaller applications. Each can be developed, tested, and deployed independently, often by different teams. This approach is useful for large applications where multiple teams work on different features, enabling better scalability and maintenance. However, it adds complexity in terms of integration, shared dependencies, and consistent user experience.',
    seniority: 'senior',
    category: 'Architecture'
  }
]; 