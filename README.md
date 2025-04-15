# Frontend Developer Interview Helper

A comprehensive tool to help frontend developers prepare for technical interviews by tracking job applications, managing interview questions, and organizing study materials (soon).

## Features

### Job Application Tracking
- Create and manage job applications
- Track application status (Applied, Screening, Technical, Behavioral, Offer, etc.)
- Record work location type (Remote, Hybrid, On-site)
- Store important details like salary, contact information, and job URLs
- Duplicate applications for similar positions
- View application history with creation and update timestamps

### Interview Preparation 
- Practice common frontend interview questions
- Track progress and understanding of different topics
- Organize questions by difficulty level
- Save personal notes and solutions

### Study Materials @TODO
- Access curated resources for frontend development
- Organize study materials by topic
- Track progress through different learning paths

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: React Context + Hooks
- **Database**: IndexedDB (via Dexie.js)
- **Styling**: Material-UI theming with custom configurations
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Andrew-Emery/dev-job-search-helper
cd frontend-dev-interview-helper
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Applications/  # Job application related components
│   ├── Common/        # Shared components
│   ├── Footer/        # Footer component
│   └── Navigation/    # Navigation components
├── db/                # Database related code
├── pages/             # Page components
├── providers/         # Context providers
├── theme/             # Theme configuration
└── types/             # TypeScript type definitions
```

## Key Components

### InfoChip
A reusable chip component for displaying status, location, and other information with consistent styling and optional tooltips.

### ApplicationCard
Displays job application information with expandable details and management actions.

### ApplicationForm
Form for creating and editing job applications with validation.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- Dexie.js for IndexedDB wrapper
- All contributors and users of this project
