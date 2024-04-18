# Project Name: tool-shop

### Overview

Welcome to the tool-shop Cypress Automation Project! This repository contains automated tests written using [Cypress](https://www.cypress.io/), a powerful end-to-end testing framework for web applications. SUT: https://practicesoftwaretesting.com

### Project structure:

```bash
.
├── cypress/
│   ├── fixtures/          # Test data files
│   ├── e2e/               # UI Test scripts
|   │   └── api/           # API Test scripts
│   ├── support/           # Custom commands and utilities
│   └── screenshots/       # Screenshots captured during test runs
├── node_modules/          # Node.js modules (ignored by default)
├── .gitignore             # Specifies intentionally untracked files to ignore
├── cypress.config.j       # Cypress configuration file
├── package.json           # Project dependencies and scripts
└── README.md              # Project README file
```

### Prequisites:

- Node.js installed on your machine
- Git installed (optional if you downloaded the repository as a zip file)

### Setup instructions:

1. Clone the repository

```bash
git clone https://github.com/vraicu/cypress-sandbox.git
```

2. Navigate to the project directory

```bash
cd tool-shop
```

3. Install project dependencies:

```bash
npm install
```

### Running Tests:

- Open Cypress Test Runner

```bash
npm run cypress:open
```

- Run tests headlessly

```bash
npm run cypress:run
```
