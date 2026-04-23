# Bug Report Summary

This document summarizes the failures observed when running the same Playwright UI automation suite against the buggy environment (.env.buggy)

### **Passed on buggy environment**

These scenarios still passed and appeared stable enough on the buggy environment:

- User Story 1 - View Product List (positive)
- User Story 1 - View Product List (edge)
- User Story 2 - View Product Details (positive)
- User Story 2 - View Product Details (edge)
- User Story 3 - Search for a Product (positive)
- User Story 4 - Filter Products by Category (edge: clearing filter)
- User Story 10 - Category Filtering and Reset (edge: clear filters)

### **Failed on buggy environment**

The following tests failed naturally on the buggy site:

- User Story 4 - Filter Products by Category (positive)
- User Story 10 - Category Filtering and Reset (positive)
- User Story 5 - Login (positive)
- User Story 5 - Login (negative)
- User Story 6 & 7 - Cart actions (add to cart)
- User Story 6 & 7 - Cart actions (update quantity)
- User Story 6 & 7 - Cart actions (remove item)
- User Story 8 - Checkout (negative validation path)
- User Story 9 - View Order History (positive)
- User Story 9 - View Order History (edge / hosted access check)
- User Story 3 - Search for a Product (negative)

# **Failure Analysis by Test**

The table below explicitly documents **which tests failed and why**, based on the observed Playwright errors and grouped root-cause analysis.

| **Failed Test**                                                | **Why It Failed**                                                                                    | **Root Cause**                                                             |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| User Story 4 - Filter Products by Category (positive)          | After applying a category filter, expected product cards were not rendered / visible                 | Bug 2 - Category filtering does not reliably render filtered products      |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 10 - Category Filtering and Reset (positive)        | After refresh, the selected category state did not reliably show visible filtered product cards      | Bug 2 - Category filtering does not reliably render filtered products      |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 5 - Login (positive)                                | Login page did not reliably expose visible/interactable login controls                               | Bug 1 - Login page broken or login form not reliably rendered              |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 5 - Login (negative)                                | Email input was not found, so the login form could not be completed                                  | Bug 1 - Login page broken or login form not reliably rendered              |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 6 & 7 - Cart actions (add to cart)                  | Scenario depends on authenticated login before cart flow; login failed first                         | Bug 1 - Cascading failure from broken login                                |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 6 & 7 - Cart actions (update quantity)              | Scenario depends on authenticated login before cart flow; login failed first                         | Bug 1 - Cascading failure from broken login                                |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 6 & 7 - Cart actions (remove item)                  | Scenario depends on authenticated login before cart flow; login failed first                         | Bug 1 - Cascading failure from broken login                                |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 8 - Checkout (negative validation path)             | Checkout negative flow starts from authenticated setup; login failed before reaching validation step | Bug 1 - Cascading failure from broken login                                |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 9 - View Order History (positive)                   | Order history scenario depends on login; login failed before route verification                      | Bug 1 - Cascading failure from broken login                                |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 9 - View Order History (edge / hosted access check) | Order history scenario depends on login; login failed before route verification                      | Bug 1 - Cascading failure from broken login                                |
| ---                                                            | ---                                                                                                  | ---                                                                        |
| User Story 3 - Search for a Product (negative)                 | A stable no-results / empty-state message was not displayed for a non-matching search term           | Bug 3 - Search empty-state / no-results behavior is broken or inconsistent |
| ---                                                            | ---                                                                                                  | ---                                                                        |

# **Root Cause Analysis / Grouped Defects**

# **Bug 1 - Login page is broken or login form is not reliably rendered on buggy site**

## **Title**

Login page does not reliably render usable login form fields on the buggy environment

## **Severity**

High

## **Area**

Authentication / Login

## **Environment**

Buggy environment (.env.buggy)

## **Evidence from failures**

Multiple failing tests timed out while trying to interact with:

- \[data-test="email"\]
- Login button / login form controls

Representative failure examples:

- User Story 5 - Login › positive
- User Story 5 - Login › negative
- User Story 6 & 7 - Cart actions › positive/edge
- User Story 8 - Checkout › negative
- User Story 9 - Order History › positive/edge

## **Steps to Reproduce**

- Run the test suite against the buggy environment:  
   <br/>npm run test:buggy

- Open the login flow directly or through any authenticated scenario
- Attempt to locate and use:
  - email field
  - password field
  - login submit button

## **Expected Behavior**

The login page should reliably show:

- email input
- password input
- login button

Valid credentials should allow sign-in.  
Invalid credentials should show a validation/error message.

## **Actual Behavior**

On the buggy environment:

- the login form is not reliably rendered or interactable
- the email input (\[data-test="email"\]) times out
- the login button is sometimes not visible
- both positive and negative login tests fail before authentication can complete

## **Impact**

This is a **primary root-cause defect** and causes multiple downstream failures.

### **Directly impacted user stories**

- User Story 5 - Login

### **Cascading / downstream impacted user stories**

Because login is a prerequisite for several tests, this defect also causes failures in:

- User Story 6 - Add Product to Cart
- User Story 7 - Update / Remove Cart
- User Story 8 - Checkout (negative validation flow)
- User Story 9 - Order History

## **Notes**

This should be treated as **one major product defect**, not many unrelated test failures.

Several failing tests are **cascading failures** caused by the broken login flow.

# **Bug 2 - Category filtering does not reliably render filtered product results**

## **Title**

Applying a category filter does not reliably show filtered products on the buggy environment

## **Severity**

Medium

## **Area**

Product Listing / Category Filtering

## **Environment**

Buggy environment (.env.buggy)

## **Evidence from failures**

Failing tests:

- User Story 4 - Filter Products by Category › positive
- User Story 10 - Category Filtering and Reset › positive

Representative failure:

- product cards were not found:
  - \[data-test="product-card"\]
  - .card
  - a\[href\*="/product/"\]

## **Steps to Reproduce**

- Open the buggy site homepage
- Apply a category filter (e.g. via categories menu or category route)
- Wait for the filtered product list to render
- Refresh the page (for persistence case)

## **Expected Behavior**

After selecting a category:

- filtered products should be visible
- product cards should render correctly
- after refresh, the selected category state should persist and still show products

## **Actual Behavior**

On the buggy environment:

- product cards are not reliably visible after category selection
- the filtered product list may not render at all
- the positive category-filter and persistence scenarios fail because no product cards are found

## **Impact**

This breaks the expected category filtering experience and causes:

- User Story 4 positive flow to fail
- User Story 10 positive flow (persistence after refresh) to fail

## **Notes**

The "clear filters" edge scenarios still passed, which suggests the defect is more likely tied to:

- applying/retaining the filter state, or
- rendering filtered results

…rather than the reset action itself.

# **Bug 3 - Search empty-state / no-results behavior is broken or inconsistent**

## **Title**

Non-matching product search does not reliably show a stable no-results state

## **Severity**

Low to Medium

## **Area**

Search

## **Environment**

Buggy environment (.env.buggy)

## **Evidence from failures**

Failing test:

- User Story 3 - Search for a Product › negative

Representative assertion that failed:

- expected text such as:
  - No results found
  - There are no products found

## **Steps to Reproduce**

- Open the buggy site
- Search for a clearly fake/non-existent product name (e.g. from test data)
- Observe the results area

## **Expected Behavior**

When no products match:

- the UI should show a stable, explicit empty-state behavior
- ideally a clear no-results message should appear

## **Actual Behavior**

On the buggy environment:

- the expected no-results message is not shown consistently
- the UI does not provide a stable empty-state response for a non-matching search
- the negative search test fails naturally

## **Impact**

This affects the negative search scenario and reduces confidence in the search UX for no-match cases.

## **Notes**

The positive search scenario still passed, which suggests:

- search input itself is functional
- the defect is likely specific to the **empty-state / no-match handling**

# **Bug 4 - Cart / Checkout / Order History failures are mostly downstream effects of the login defect**

## **Title**

Multiple authenticated feature failures are largely cascading failures caused by the broken login flow

## **Severity**

Informational (analysis note)

## **Area**

Cross-feature / Failure Analysis

## **Environment**

Buggy environment (.env.buggy)

## **Summary**

Several tests failed in cart, checkout, and order history.  
However, based on the failure logs, these are **not all independent product defects**.

A large number of these failures occur because the test cannot complete login first.