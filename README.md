# **Polaris SDET Take-Home - Playwright UI Automation**

This repository contains a Playwright + TypeScript UI automation suite for the Polaris SDET take-home assignment.

The suite covers the provided user stories against the Practice Software Testing demo application and is designed to run against both:

- **Main environment** (.env.main) - stable validation target
- **Buggy environment** (.env.buggy) - intentionally broken target used for failure analysis

## **Tech Stack**

- **Playwright**
- **TypeScript**
- **Node.js**
- **dotenvx** (environment management)
- **Page Object Model (POM)**

## **Project Structure**

.

├── pages/ # Page Object Model classes

├── tests/

│ ├── fixtures/ # Shared auth + test data

│ └── ui/ # UI test specs mapped to user stories

├── playwright.config.ts

├── .env.main

├── .env.buggy

├── README.md

└── BUGS.md

## **Covered User Stories**

The suite includes automation for the requested user stories:

- **View Product List**
- **View Product Details**
- **Search for a Product**
- **Filter Products by Category**
- **Login**
- **Add Product to Cart**
- **Update / Remove Cart**
- **Complete Checkout**
- **View Order History**
- **Category Filtering and Reset**

## **Test Design Approach**

### **Automation strategy**

- Implemented using **Playwright with TypeScript**
- Organized using the **Page Object Model** for maintainability and readability
- Added reusable helpers in tests/fixtures/ for:
  - authentication
  - shared test data

### **Test coverage style**

For each story, I aimed to include:

- **Positive path** - expected successful behavior
- **Negative path** - validation / invalid data / unavailable behavior where applicable
- **Edge case** - resilience or alternate scenario

### **Stability considerations**

Where the hosted demo app behaved inconsistently or did not expose a stable UI state, I preferred:

- resilient selectors
- route / state verification
- outcome-based assertions

…instead of overfitting to brittle UI text.

## **Setup**

### **1) Install dependencies**

npm install

### **2) Install Playwright browsers**

npx playwright install

## **Running the Tests**

### **Run against the main environment**

npm run test:main

This runs the suite using:

- .env.main

### **Run against the buggy environment**

npm run test:buggy

This runs the same suite using:

- .env.buggy

### **Open the Playwright HTML report**

npx playwright show-report

## **NPM Scripts**

These scripts are configured in package.json:

{

"scripts": {

"test:main": "dotenvx run -f .env.main -- playwright test tests/ui",

"test:buggy": "dotenvx run -f .env.buggy -- playwright test tests/ui"

}

}

## **Main Environment Results**

The **main environment** was used as the primary validation target for stable automation coverage.

### **Expected outcome**

- The suite should pass on the **main** environment except where the hosted demo application has unstable or inconsistent behavior.

### **Notes from execution**

- Most scenarios pass consistently on the main environment
- During development, the most unstable scenario was:
  - **User Story 3 - Search for a Product (negative)** when asserting a specific "no results" text message
- To keep the test stable, the preferred assertion is:
  - verify that known products are **not shown** for a non-matching search
  - instead of depending on a fragile exact empty-state message

## **Buggy Environment Results**

The **buggy environment** is expected to fail some tests by design.

Per the assignment requirements:

- I did **not** weaken or "fix" tests to force them to pass on the buggy site
- I ran the same suite against the buggy environment
- I allowed failures to occur naturally
- I analyzed the failures and documented them

### **Observed buggy run summary**

- **18 tests executed**
- **7 passed**
- **11 failed**

### **Major failure themes identified**

The main defects observed on the buggy environment were:

- **Login flow / login page instability**
  - Login form fields were not reliably available
  - This caused multiple downstream failures
- **Category filtering issues**
  - Filtered product results were not reliably rendered
- **Search no-results / empty-state inconsistency**
  - Non-matching search did not consistently show a stable empty-state message
- **Cascading authenticated failures**
  - Several cart, checkout, and order-history failures were downstream effects of the login defect rather than separate independent defects

### **Full failure analysis**

See **BUGS.md** for:

- which tests failed
- why they failed
- grouped root-cause analysis
- steps to reproduce
- expected vs actual behavior

## **Known Limitations / Notes**

### **Checkout flow on hosted demo app**

The hosted demo app's checkout flow was not fully stable for a complete end-to-end "place order" flow in all runs.

Observed behavior during development:

- Checkout sometimes remains on:
  - cart step
  - sign-in / guest step
  - or does not reliably expose billing fields after navigation
- Because of this, the **negative checkout validation** path is the most stable scenario
- The positive checkout path was explored and validated during development, but the hosted environment was not consistently reliable enough for a deterministic full-order completion test in every run

### **Order history on hosted demo app**

The hosted site does not always expose a stable, fully populated order-history page for the available test account.

Because of this, the order-history coverage focuses on:

- authenticated route access
- route verification
- graceful handling of the hosted app's current behavior

## **Design Decisions**

### **Why Page Object Model?**

I used POM because it:

- separates test intent from selector details
- reduces duplication
- makes refactoring easier when the UI changes
- keeps test specs aligned to user-story language

### **Why keep buggy failures instead of adjusting tests?**

The assignment explicitly requires:

- **do not "fix" tests to make them pass on the buggy site**
- instead:
  - let them fail naturally
  - analyze failures
  - document findings

That is why the same suite is run against both environments without adding special logic to mask buggy behavior.

## **Deliverables Included**

This submission includes:

- **Playwright + TypeScript test suite**
- **Page Object Model implementation**
- **Reusable fixtures / test data**
- **Environment-specific execution via .env.main and .env.buggy**
- **README.md** with setup, execution, and approach
- **BUGS.md** with failure analysis and bug documentation

## **Final Summary**

This project demonstrates:

- UI automation coverage across the requested user stories
- maintainable Playwright test design using TypeScript + POM
- stable execution against the main environment
- failure analysis against the intentionally buggy environment
- bug reporting that distinguishes:
  - real defects
  - flaky / hosted-site limitations
  - cascading failures caused by upstream defects

## API Tests

I also included a small set of API tests using Playwright's built-in `request` fixture.

Covered API checks:
- Product list endpoint returns data
- Login endpoint accepts valid credentials
- Login endpoint rejects invalid credentials
- Basic UI/API consistency check for product name

## Run API tests with:

npm run test:api

## Reports

Playwright HTML reports can be generated and opened with:

```bash
npm run test:main
npx playwright show-report

I also added my already run reports for main, buggy and api tests uder the project file structure with names 
playwright-report-main (for main site)
playwright-report-api (for buggy site)
playwright-report-api (for api tests)

## **Commands Quick Reference**

npm install

npx playwright install

npm run test:main

npm run test:buggy

npx playwright show-report