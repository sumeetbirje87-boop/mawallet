# Personal Fund & Finance Management App — Complete System Instructions

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Architecture & Tech Stack](#2-architecture--tech-stack)
3. [User Authentication & Onboarding](#3-user-authentication--onboarding)
4. [Global Navigation & Layout](#4-global-navigation--layout)
5. [Dashboard (Home)](#5-dashboard-home)
6. [Income Management](#6-income-management)
7. [Expense Tracking](#7-expense-tracking)
8. [Budget Planning & Management](#8-budget-planning--management)
9. [Savings & Goals](#9-savings--goals)
10. [Accounts & Wallets](#10-accounts--wallets)
11. [Transactions Ledger](#11-transactions-ledger)
12. [Recurring Transactions](#12-recurring-transactions)
13. [Bills & Reminders](#13-bills--reminders)
14. [Debt Tracker](#14-debt-tracker)
15. [Reports & Analytics](#15-reports--analytics)
16. [Net Worth Tracker](#16-net-worth-tracker)
17. [Categories & Tags](#17-categories--tags)
18. [Currency & Multi-Currency Support](#18-currency--multi-currency-support)
19. [Data Import & Export](#19-data-import--export)
20. [Notifications & Alerts](#20-notifications--alerts)
21. [User Settings & Preferences](#21-user-settings--preferences)
22. [Security & Data Privacy](#22-security--data-privacy)
23. [Responsive Design & Accessibility](#23-responsive-design--accessibility)
24. [Error Handling & Edge Cases](#24-error-handling--edge-cases)
25. [Performance & Scalability](#25-performance--scalability)
26. [Future Enhancements & Roadmap](#26-future-enhancements--roadmap)

---

## 1. Product Overview

### 1.1 Purpose

The Personal Fund & Finance Management App is a web-based platform that empowers any user to take complete control of their personal finances. It provides a unified, intuitive interface for tracking income, expenses, budgets, savings goals, debts, net worth, and financial health — all in one place, designed for daily use.

### 1.2 Target Audience

Any individual who wants to manage personal finances — from students tracking allowances, to working professionals managing salaries and investments, to retirees monitoring pensions and withdrawals. No financial expertise is required.

### 1.3 Core Value Propositions

- **Complete Financial Visibility**: See all income, expenses, savings, budgets, debts, and net worth from a single dashboard.
- **Daily Usability**: Designed so users can log transactions in under 10 seconds, check budgets at a glance, and receive timely reminders without friction.
- **Actionable Insights**: Automated reports, trend analysis, and alerts turn raw data into decisions — where to cut spending, how savings are progressing, when bills are due.
- **Privacy-First**: All financial data is encrypted and never shared. Users own their data entirely with full export capabilities.
- **Zero Learning Curve**: Clean UI, contextual tooltips, guided onboarding, and smart defaults mean users are productive from minute one.

### 1.4 Key Functional Pillars

| Pillar | What It Covers |
|--------|---------------|
| Income Tracking | Salary, freelance, passive income, refunds, gifts — any money coming in |
| Expense Tracking | Every outflow categorized, tagged, and searchable |
| Budget Management | Monthly/weekly/custom budgets per category with real-time progress |
| Savings & Goals | Named savings goals with targets, deadlines, and auto-allocation |
| Debt Management | Loans, credit cards, EMIs — balances, interest, payoff timelines |
| Accounts | Bank accounts, cash wallets, credit cards, digital wallets — all balances in one view |
| Reporting | Charts, trends, comparisons, exports — understand where money goes |
| Reminders | Bill due dates, budget limits, goal milestones — never miss a payment |

---

## 2. Architecture & Tech Stack

### 2.1 Recommended Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React 18+ with TypeScript | Component-based, large ecosystem, strong typing |
| State Management | Zustand or Redux Toolkit | Lightweight global state for financial data |
| UI Framework | Tailwind CSS + shadcn/ui | Rapid, consistent, accessible UI components |
| Charts | Recharts or Chart.js | Rich, responsive data visualizations |
| Backend | Node.js (Express/Fastify) or Next.js API routes | JavaScript full-stack consistency |
| Database | PostgreSQL | Relational integrity for financial data, ACID compliance |
| ORM | Prisma | Type-safe database queries |
| Authentication | NextAuth.js or Auth0 or Firebase Auth | Secure, multi-provider auth with minimal setup |
| File Storage | AWS S3 or Cloudflare R2 | Receipt images, export files |
| Hosting | Vercel / AWS / Railway | Scalable, CI/CD friendly |
| Caching | Redis (optional) | Session caching, rate limiting |

### 2.2 Database Schema — Core Entities

```
User
├── id (UUID, PK)
├── email (unique)
├── password_hash
├── display_name
├── currency_default (e.g., "INR", "USD")
├── timezone
├── created_at
└── updated_at

Account
├── id (UUID, PK)
├── user_id (FK → User)
├── name (e.g., "HDFC Savings", "Cash Wallet")
├── type (enum: bank, cash, credit_card, digital_wallet, investment)
├── balance (decimal)
├── currency
├── is_active (boolean)
├── icon / color
├── created_at
└── updated_at

Transaction
├── id (UUID, PK)
├── user_id (FK → User)
├── account_id (FK → Account)
├── type (enum: income, expense, transfer)
├── amount (decimal, always positive)
├── currency
├── category_id (FK → Category)
├── subcategory_id (FK → Category, nullable)
├── tags[] (array of strings)
├── description / note
├── date (date)
├── time (time, nullable)
├── is_recurring (boolean)
├── recurring_rule_id (FK → RecurringRule, nullable)
├── receipt_url (nullable)
├── created_at
└── updated_at

Category
├── id (UUID, PK)
├── user_id (FK → User, nullable — null = system default)
├── name
├── type (enum: income, expense)
├── parent_id (FK → Category, nullable — for subcategories)
├── icon
├── color
└── is_active

Budget
├── id (UUID, PK)
├── user_id (FK → User)
├── category_id (FK → Category)
├── amount_limit (decimal)
├── period (enum: weekly, monthly, quarterly, yearly, custom)
├── start_date
├── end_date (nullable for rolling)
├── alert_threshold (percentage, e.g., 80)
├── is_active
├── created_at
└── updated_at

SavingsGoal
├── id (UUID, PK)
├── user_id (FK → User)
├── name (e.g., "Emergency Fund", "Vacation")
├── target_amount (decimal)
├── current_amount (decimal)
├── deadline (date, nullable)
├── icon / color
├── auto_allocate_amount (decimal, nullable)
├── auto_allocate_frequency (enum: daily, weekly, monthly, nullable)
├── is_completed (boolean)
├── created_at
└── updated_at

RecurringRule
├── id (UUID, PK)
├── user_id (FK → User)
├── transaction_template (JSON — amount, category, account, type, description)
├── frequency (enum: daily, weekly, biweekly, monthly, quarterly, yearly)
├── start_date
├── end_date (nullable)
├── next_occurrence (date)
├── is_active
├── created_at
└── updated_at

Debt
├── id (UUID, PK)
├── user_id (FK → User)
├── name (e.g., "Car Loan", "Credit Card")
├── type (enum: loan, credit_card, mortgage, personal, other)
├── principal_amount (decimal)
├── current_balance (decimal)
├── interest_rate (decimal, percentage)
├── minimum_payment (decimal)
├── due_date_day (integer, 1–31)
├── start_date
├── expected_payoff_date (nullable)
├── linked_account_id (FK → Account, nullable)
├── is_active
├── created_at
└── updated_at

Bill
├── id (UUID, PK)
├── user_id (FK → User)
├── name (e.g., "Electricity", "Netflix")
├── amount (decimal, estimated or fixed)
├── is_fixed (boolean)
├── due_date_day (integer, 1–31)
├── category_id (FK → Category)
├── auto_pay (boolean)
├── reminder_days_before (integer, default 3)
├── linked_account_id (FK → Account, nullable)
├── is_active
├── created_at
└── updated_at

Notification
├── id (UUID, PK)
├── user_id (FK → User)
├── type (enum: bill_due, budget_warning, budget_exceeded, goal_milestone, goal_achieved, recurring_logged, system)
├── title
├── message
├── is_read (boolean)
├── action_url (nullable)
├── created_at
└── read_at (nullable)
```

### 2.3 API Design Principles

- RESTful endpoints with consistent naming: `/api/v1/transactions`, `/api/v1/budgets`, etc.
- All monetary amounts stored and transmitted as integers in the smallest currency unit (e.g., paise for INR, cents for USD) to avoid floating-point errors. Display layer converts to decimal.
- Pagination on all list endpoints with cursor-based pagination for transactions.
- Filter and sort parameters on list endpoints: `?category=food&from=2026-01-01&to=2026-01-31&sort=-date`.
- Rate limiting: 100 requests/minute per authenticated user.
- All responses follow a consistent envelope: `{ "data": ..., "meta": { "page", "total", "hasMore" }, "error": null }`.

---

## 3. User Authentication & Onboarding

### 3.1 Authentication

#### 3.1.1 Registration

- **Fields**: Email, password, display name.
- **Password Rules**: Minimum 8 characters, at least one uppercase letter, one number, one special character. Show real-time strength meter (weak / fair / strong / very strong).
- **Email Verification**: Send a 6-digit OTP or magic link upon registration. Account is in "pending" state until verified. Resend option with 60-second cooldown.
- **Social Login**: Google and Apple sign-in as alternatives. On first social login, auto-create account with the provider's email and name.

#### 3.1.2 Login

- **Fields**: Email + password, or social login button.
- **Remember Me**: Checkbox to extend session to 30 days (default session: 7 days).
- **Forgot Password**: Enter email → receive reset link (valid 1 hour) → set new password → auto-login.
- **Failed Attempts**: After 5 consecutive failures, lock account for 15 minutes and send email alert.
- **Session Management**: JWT access tokens (15-minute expiry) with HTTP-only refresh tokens (7 or 30 days). Refresh silently in the background.

#### 3.1.3 Two-Factor Authentication (Optional)

- Users can enable 2FA via authenticator app (TOTP) in Settings.
- On login, prompt for 6-digit code after email/password.
- Provide 8 one-time backup codes on 2FA setup. User must download or copy them.

### 3.2 Onboarding Flow

After first login, guide the user through a 4-step setup wizard. Each step is skippable but encouraged.

#### Step 1: Welcome & Currency

- Welcome message with app overview (3 animated slides or a 30-second video).
- Select default currency from a searchable dropdown (show top 10 popular currencies first, e.g., INR, USD, EUR, GBP, AUD, CAD, JPY, AED, SGD, CHF).
- Select timezone (auto-detect from browser, allow override).

#### Step 2: Set Up Accounts

- Prompt user to add their first financial account.
- Show account type cards: Bank Account, Cash / Wallet, Credit Card, Digital Wallet (UPI/PayPal), Investment Account.
- For each, ask: Name, Type, Opening Balance, Currency (pre-filled from Step 1).
- Provide a "Quick Start" option: auto-create "Cash" and "Bank Account" with zero balance.
- User can add multiple accounts or skip and add later.

#### Step 3: Set Up Categories

- Show a pre-loaded list of default categories with icons:
  - **Income**: Salary, Freelance, Business, Investments, Gifts, Refunds, Other Income.
  - **Expense**: Food & Dining, Groceries, Transport, Rent/Housing, Utilities, Entertainment, Shopping, Health, Education, Insurance, Personal Care, Gifts & Donations, Travel, Subscriptions, EMI/Loan Payments, Other Expense.
- User can toggle categories on/off, rename them, reorder, or add custom categories.
- Explain that categories can always be changed later in Settings.

#### Step 4: Set Your First Budget (Optional)

- Show a simple form: select a category (e.g., "Food & Dining"), set a monthly limit (e.g., ₹15,000).
- Explain: "We'll track your spending and notify you when you're close to your limit."
- Option to skip or set up to 3 budgets.

#### Completion

- Congratulatory screen: "You're all set! Start tracking your first transaction."
- CTA button: "Add Your First Transaction" → opens the quick-add transaction modal.
- Dismiss button: "Go to Dashboard."

---

## 4. Global Navigation & Layout

### 4.1 Layout Structure

```
┌──────────────────────────────────────────────────────┐
│  Top Bar (sticky)                                    │
│  [Logo]  [Search]           [Notifications] [Avatar] │
├──────────┬───────────────────────────────────────────┤
│          │                                           │
│  Side    │  Main Content Area                        │
│  Nav     │                                           │
│  (fixed) │  ┌─────────────────────────────────┐     │
│          │  │  Page Header (title + actions)   │     │
│  ☰ Menu  │  ├─────────────────────────────────┤     │
│          │  │                                   │     │
│          │  │  Page Content                     │     │
│          │  │  (cards, tables, charts, forms)   │     │
│          │  │                                   │     │
│          │  └─────────────────────────────────┘     │
│          │                                           │
├──────────┴───────────────────────────────────────────┤
│  Floating Action Button: "+ Add Transaction" (mobile)│
└──────────────────────────────────────────────────────┘
```

### 4.2 Top Bar

- **Logo / App Name**: Clickable, returns to Dashboard.
- **Global Search**: Search bar (Ctrl+K shortcut) that searches across transactions (by description, amount, category, tag), categories, accounts, bills, and goals. Show results in a dropdown overlay grouped by type.
- **Quick Add Button** (desktop): "+ Add Transaction" button always visible — opens a modal for rapid entry.
- **Notification Bell**: Shows unread count badge. Clicking opens a dropdown panel with recent notifications. "See All" link goes to full notifications page.
- **User Avatar / Menu**: Dropdown with: Profile, Settings, Help & Support, Dark/Light Mode Toggle, Log Out.

### 4.3 Sidebar Navigation

Fixed left sidebar (collapsible to icons on smaller screens). Items:

| Icon | Label | Route |
|------|-------|-------|
| 🏠 | Dashboard | `/dashboard` |
| 💰 | Income | `/income` |
| 💸 | Expenses | `/expenses` |
| 📊 | Budgets | `/budgets` |
| 🎯 | Savings Goals | `/goals` |
| 🏦 | Accounts | `/accounts` |
| 📋 | Transactions | `/transactions` |
| 🔄 | Recurring | `/recurring` |
| 🧾 | Bills & Reminders | `/bills` |
| 💳 | Debts | `/debts` |
| 📈 | Reports | `/reports` |
| 📉 | Net Worth | `/net-worth` |
| ⚙️ | Settings | `/settings` |

Active page is highlighted. Hover shows tooltip when sidebar is collapsed.

### 4.4 Mobile Navigation

- Sidebar collapses into a hamburger menu (slide-over drawer).
- Bottom tab bar with 5 key items: Dashboard, Transactions, Budgets, Goals, More (→ opens drawer).
- Floating Action Button (FAB) at bottom-right: "+ Add Transaction" — always accessible.

### 4.5 Global Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Open global search |
| `Ctrl + N` or `N` | Open quick-add transaction modal |
| `Ctrl + /` | Show shortcut cheat sheet |
| `Esc` | Close any open modal / drawer |

---

## 5. Dashboard (Home)

The Dashboard is the user's financial command center — the first screen they see after login. It must provide a comprehensive, at-a-glance overview of their financial health while enabling quick actions.

### 5.1 Page Header

- **Title**: "Dashboard"
- **Date Context**: Show current month and year (e.g., "March 2026"). Include left/right arrows to navigate to previous/next months for historical comparison.
- **Quick Actions**: "+ Add Transaction" button, "Download Report" dropdown.

### 5.2 Summary Cards Row

A horizontal row of 4–5 summary cards at the top of the page. Each card shows a metric, its value, and a comparison indicator.

#### Card 1: Total Balance

- **Value**: Sum of all active account balances.
- **Subtitle**: "Across X accounts"
- **Indicator**: ↑ or ↓ vs. last month's total balance, shown as absolute change and percentage.
- **Click Action**: Navigate to Accounts page.

#### Card 2: Income This Month

- **Value**: Total income transactions for the current month.
- **Subtitle**: "X transactions"
- **Indicator**: ↑ or ↓ vs. last month.
- **Color**: Green.
- **Click Action**: Navigate to Income page filtered to current month.

#### Card 3: Expenses This Month

- **Value**: Total expense transactions for the current month.
- **Subtitle**: "X transactions"
- **Indicator**: ↑ or ↓ vs. last month (↓ is positive here — less spending is good).
- **Color**: Red/orange.
- **Click Action**: Navigate to Expenses page filtered to current month.

#### Card 4: Net Savings This Month

- **Value**: Income minus Expenses for the current month.
- **Subtitle**: "Savings rate: X%" (net savings / income × 100).
- **Indicator**: ↑ or ↓ vs. last month.
- **Color**: Green if positive, red if negative.
- **Click Action**: Navigate to Reports page with savings trend.

#### Card 5: Budget Health

- **Value**: "X of Y budgets on track" (where "on track" means current spending ≤ prorated limit for the current day of the month).
- **Subtitle**: "Z exceeded" if any budgets are over limit.
- **Indicator**: Color-coded — green (all on track), yellow (some nearing limit), red (some exceeded).
- **Click Action**: Navigate to Budgets page.

### 5.3 Income vs. Expenses Chart

- **Type**: Bar chart or area chart.
- **Data**: Last 6 months of total income and total expenses, side by side.
- **Interaction**: Hover on any bar to see exact amounts. Click a month to navigate to that month's transaction view.
- **Toggle**: Switch between bar chart and line chart via icon buttons.
- **Annotation**: Show the net savings line overlaid (optional toggle).

### 5.4 Expense Breakdown — Donut Chart

- **Type**: Donut / pie chart showing expense distribution by top-level category for the current month.
- **Data**: Top 6 categories by amount; remaining grouped as "Other."
- **Center Label**: Total expenses for the month.
- **Legend**: Below or beside the chart, showing category name, amount, and percentage.
- **Interaction**: Click a segment to navigate to Expenses page filtered by that category.

### 5.5 Budget Progress Section

- **Layout**: Horizontal progress bars, one per active budget.
- **Each Bar Shows**:
  - Category name and icon.
  - Spent amount / Budget limit (e.g., "₹8,400 / ₹15,000").
  - Percentage used, color-coded: green (0–60%), yellow (61–80%), orange (81–99%), red (100%+).
  - Remaining amount or overspent amount.
- **Limit**: Show top 5 budgets. "View All Budgets →" link at the bottom.
- **Empty State**: If no budgets exist, show a card: "Set up your first budget to track spending limits" with a CTA button.

### 5.6 Recent Transactions

- **Layout**: A compact table/list showing the 10 most recent transactions.
- **Columns**: Date, Description, Category (with icon), Account, Amount (green for income, red for expense).
- **Each Row**: Clickable to open transaction detail/edit modal.
- **Footer**: "View All Transactions →" link.
- **Empty State**: "No transactions yet. Add your first one!" with CTA.

### 5.7 Savings Goals Progress

- **Layout**: Horizontal cards or a compact list.
- **Each Goal Shows**:
  - Goal name and icon.
  - Progress bar with current amount / target amount.
  - Percentage complete.
  - Days remaining until deadline (if set).
  - Estimated completion date based on current contribution rate.
- **Limit**: Show top 3 goals. "View All Goals →" link.
- **Empty State**: "Start saving towards something! Create your first goal." with CTA.

### 5.8 Upcoming Bills

- **Layout**: List of bills due in the next 14 days.
- **Each Bill Shows**:
  - Bill name, amount, due date, days until due.
  - Status: Upcoming (blue), Due Today (orange), Overdue (red), Paid (green).
  - "Mark as Paid" quick action button.
- **Empty State**: "No upcoming bills. Add your recurring bills for timely reminders." with CTA.

### 5.9 Quick Insights / Tips

- A small card at the bottom with a rotating financial insight, e.g.:
  - "You spent 23% more on dining this month than last month."
  - "Your savings rate this month is 32% — great job!"
  - "Tip: Setting up auto-allocations for savings goals helps you save consistently."
- Algorithm: Generate one insight per day based on spending patterns, budget adherence, or goal progress.

---

## 6. Income Management

### 6.1 Page: Income Overview (`/income`)

#### Page Header

- **Title**: "Income"
- **Period Selector**: Dropdown or tabs for: This Month, Last Month, This Quarter, This Year, Custom Range (date picker).
- **Actions**: "+ Add Income" button.

#### Summary Section

- **Total Income**: Large number showing total income for the selected period.
- **Comparison**: vs. previous period (e.g., "+₹12,000 vs. last month").
- **Average Daily Income**: Total divided by days elapsed (useful for freelancers).
- **Income Sources Count**: Number of distinct categories that have income entries.

#### Income by Source — Bar or Pie Chart

- Breakdown of income by category (Salary, Freelance, Investments, etc.).
- Each segment shows amount and percentage of total.
- Interactive: click to filter the transaction list below.

#### Income Trend — Line Chart

- Monthly income totals for the last 12 months.
- Overlay an average line.
- Hover for monthly totals.

#### Income Transactions List

- Filtered list of all income transactions for the selected period.
- Columns: Date, Description, Category, Account, Amount, Tags.
- Sortable by any column.
- Inline actions: Edit, Delete, Duplicate.
- Bulk actions: Select multiple → Delete, Re-categorize, Export.

### 6.2 Add/Edit Income Modal

- **Fields**:
  - Amount (required): Numeric input with currency symbol prefix. Auto-focus on open.
  - Date (required): Date picker, defaults to today.
  - Category (required): Dropdown of income categories. Option to "+ Add New Category" inline.
  - Account (required): Dropdown of user's accounts (which account receives this income).
  - Description (optional): Free text, up to 200 characters.
  - Tags (optional): Comma-separated or chip-style input. Suggest existing tags as user types.
  - Recurring toggle: If on, show frequency selector (weekly, biweekly, monthly, quarterly, yearly) and optional end date.
  - Receipt / Attachment (optional): Upload an image or PDF (max 5 MB).
- **Validation**:
  - Amount must be greater than 0.
  - Date cannot be in the future by more than 1 year.
  - Category is required.
- **On Save**:
  - Create the transaction record.
  - Update the receiving account's balance.
  - If recurring, create a RecurringRule record.
  - Show a success toast: "Income of ₹XX,XXX added to [Account Name]."

---

## 7. Expense Tracking

### 7.1 Page: Expense Overview (`/expenses`)

#### Page Header

- **Title**: "Expenses"
- **Period Selector**: Same as Income page.
- **Actions**: "+ Add Expense" button.

#### Summary Section

- **Total Expenses**: Large number for the selected period.
- **Comparison**: vs. previous period.
- **Daily Average**: Total divided by days.
- **Largest Expense**: Single biggest transaction with description and date.
- **Most Active Category**: Category with the highest total spend.

#### Expense by Category — Donut Chart

- Interactive donut chart with all expense categories.
- Click a category to show subcategories in a drill-down view.
- Legend with category name, icon, amount, percentage.

#### Expense Trend — Area Chart

- Monthly expense totals for the last 12 months.
- Stacked by category for visual category comparison.
- Toggle between stacked and single-line view.

#### Daily Spending — Heatmap or Bar Chart

- For the current month, show a bar for each day with the day's total spending.
- Color intensity represents amount (lighter = less, darker = more).
- Hover for daily total and number of transactions.

#### Expense Transactions List

- Same structure as Income transactions list but filtered to expenses.
- Additional filter: by payment method / account.
- Columns: Date, Description, Category, Subcategory, Account, Amount, Tags.

### 7.2 Add/Edit Expense Modal

- **Fields**: Same as Income modal with these additions:
  - Subcategory (optional): Dropdown filtered by selected parent category.
  - Split expense toggle: If enabled, allow splitting the amount across multiple categories (e.g., a grocery bill that's part "Groceries" and part "Household").
    - Split UI: Add rows with Category + Amount. Total must equal the transaction amount.
  - Location (optional): Free text for store/vendor name.
- **On Save**:
  - Create the transaction record(s) (multiple if split).
  - Deduct from the selected account's balance.
  - Check budget: if this category has a budget and the budget is now at or above alert threshold, trigger a notification.
  - Show success toast.

### 7.3 Receipt Scanning (Future Enhancement)

- Upload a receipt image.
- OCR extracts: merchant name, date, total amount, line items.
- Pre-fill the expense form with extracted data.
- User reviews and confirms before saving.

---

## 8. Budget Planning & Management

### 8.1 Page: Budgets Overview (`/budgets`)

#### Page Header

- **Title**: "Budgets"
- **Period Context**: Current month/period displayed prominently.
- **Actions**: "+ Create Budget" button.

#### Overall Budget Summary

- **Total Budgeted**: Sum of all active budget limits for the period.
- **Total Spent**: Sum of spending across all budgeted categories.
- **Remaining**: Total Budgeted minus Total Spent.
- **Overall Utilization**: Circular progress indicator (e.g., "67% of total budget used").

#### Budget Cards Grid

- Each active budget is displayed as a card in a responsive grid (2–3 columns on desktop, 1 on mobile).
- **Each Card Contains**:
  - Category icon and name.
  - Progress bar: spent / limit.
  - Spent amount, limit amount, remaining amount.
  - Percentage used (color-coded: green < 60%, yellow 60–80%, orange 80–99%, red ≥ 100%).
  - Prorated budget line: a marker on the progress bar showing where spending "should be" based on the day of the month (e.g., on the 15th of a 30-day month, the marker is at 50%).
  - Trend micro-chart: tiny sparkline showing daily cumulative spend for the current period.
  - "View Details" link.
  - Quick edit icon (pencil).

#### Budget Comparison — Grouped Bar Chart

- For each budgeted category, show two bars: Budget Limit vs. Actual Spend.
- Bars colored green if under budget, red if over.
- Period comparison toggle: compare current month vs. last month.

### 8.2 Budget Detail View (`/budgets/:id`)

- **Header**: Category name, budget limit, period.
- **Progress Section**:
  - Large progress bar with spent / limit.
  - Prorated marker.
  - Days remaining in the period.
  - Average daily spend vs. allowed daily spend (limit / days in period).
  - Projected end-of-period total based on current daily average.
  - Warning: "At this rate, you'll exceed your budget by ₹X,XXX" (if projected to overspend).
- **Spending Timeline**: Line chart of cumulative spending in this category for the current period, with budget limit as a horizontal reference line and prorated ideal line as a diagonal.
- **Transactions in This Budget**: List of all expense transactions in this category for the period. Same columns and actions as the expenses list.
- **Historical Performance**: Bar chart showing actual vs. budget for the last 6 periods. Highlight months where budget was exceeded.

### 8.3 Create / Edit Budget Modal

- **Fields**:
  - Category (required): Dropdown of expense categories. Only one budget per category per period.
  - Budget Amount (required): The spending limit.
  - Period (required): Weekly, Monthly (default), Quarterly, Yearly, or Custom (start date + end date).
  - Alert Threshold (optional, default 80%): Percentage at which a notification is triggered.
  - Rollover (optional): If enabled, unused budget from the current period rolls into the next period.
  - Notes (optional): Reminder or context for this budget.
- **Validation**:
  - Amount must be > 0.
  - Cannot have two active budgets for the same category and overlapping period.
- **On Save**:
  - Create or update the budget record.
  - Immediately evaluate current spending against the new limit and trigger alerts if already above threshold.

### 8.4 Budget Alerts Logic

- **At threshold** (e.g., 80%): In-app notification + optional push/email: "Heads up — you've used 80% of your ₹15,000 Food & Dining budget."
- **At 100%**: "You've reached your Food & Dining budget limit for this month."
- **Over budget**: "You've exceeded your Food & Dining budget by ₹2,300."
- Alerts fire once per threshold crossing per budget per period (no repeated alerts for the same threshold).

---

## 9. Savings & Goals

### 9.1 Page: Savings Goals (`/goals`)

#### Page Header

- **Title**: "Savings Goals"
- **Actions**: "+ New Goal" button.

#### Summary Section

- **Total Saved**: Sum of `current_amount` across all active goals.
- **Total Target**: Sum of `target_amount` across all active goals.
- **Overall Progress**: Percentage of total saved vs. total target.
- **Goals On Track**: Count of goals where current progress, extrapolated to the deadline, will meet the target.

#### Goals Grid

- Each goal is a card.
- **Card Contents**:
  - Goal name and icon/emoji.
  - Visual progress: circular progress ring or horizontal bar.
  - Current amount / Target amount.
  - Percentage complete.
  - Deadline (if set) and days remaining.
  - Estimated completion date at current rate.
  - Monthly contribution needed to meet deadline.
  - Status badge: On Track (green), Behind (yellow), At Risk (red), Completed (blue checkmark).
  - "Add Funds" quick action button.
  - Edit (pencil) and Archive (folder) icons.

#### Completed Goals Section

- Collapsed section at the bottom: "Completed Goals (X)" — expandable.
- Shows archived/completed goals with a checkmark and completion date.

### 9.2 Goal Detail View (`/goals/:id`)

- **Header**: Goal name, target, deadline.
- **Progress Ring**: Large visual with current/target and percentage.
- **Stats Panel**:
  - Total saved so far.
  - Remaining to save.
  - Average monthly contribution (based on history).
  - Required monthly contribution to meet deadline.
  - On-track status.
- **Contribution History**: Timeline/list of all contributions (manual additions or auto-allocations) with date and amount.
- **Contribution Chart**: Line chart showing cumulative savings over time with target line and projected completion.
- **Actions**: "Add Funds", "Withdraw Funds", "Edit Goal", "Mark as Completed", "Delete Goal."

### 9.3 Add Funds to Goal Modal

- **Fields**:
  - Amount (required).
  - Source Account (required): Dropdown of accounts.
  - Date (default: today).
  - Note (optional).
- **On Save**:
  - Increase `current_amount` on the goal.
  - Deduct from the source account's balance.
  - Create a transaction record of type "transfer" (from account → goal).
  - If goal target is now met, trigger celebration notification and mark as completed (with confirmation).

### 9.4 Create / Edit Goal Modal

- **Fields**:
  - Goal Name (required): e.g., "Emergency Fund."
  - Target Amount (required).
  - Deadline (optional): Date picker.
  - Icon / Emoji (optional): Picker or preset list.
  - Starting Amount (optional, default 0): If the user has already saved some towards this goal.
  - Auto-Allocate toggle: If enabled:
    - Amount per allocation.
    - Frequency: Weekly, Bi-weekly, Monthly.
    - Source Account.
    - This creates a RecurringRule that auto-adds funds.
- **Validation**:
  - Target must be > 0.
  - Deadline must be in the future (if set).
  - Starting amount must be ≤ target.

### 9.5 Goal Milestones & Celebrations

- Auto-generated milestones: 25%, 50%, 75%, 100%.
- At each milestone, trigger an in-app notification with a congratulatory message and an animation (confetti at 100%).
- Users can set custom milestones (e.g., "₹1,00,000 saved").

---

## 10. Accounts & Wallets

### 10.1 Page: Accounts Overview (`/accounts`)

#### Page Header

- **Title**: "Accounts"
- **Actions**: "+ Add Account" button.

#### Total Balance Card

- **Total Net Balance**: Sum of all asset accounts minus sum of all liability accounts (credit cards with negative balances).
- **Breakdown**: Assets total, Liabilities total.

#### Accounts List — Grouped by Type

- Group accounts into sections: Bank Accounts, Cash & Wallets, Credit Cards, Digital Wallets, Investment Accounts.
- **Each Account Row/Card**:
  - Account icon and name.
  - Current balance (formatted with currency symbol and proper number formatting).
  - Currency (if different from default).
  - Last transaction date.
  - Quick actions: View Transactions, Edit, Deactivate/Archive.
- **Credit Cards**: Show balance as negative (owed amount) and credit limit if set. Show utilization percentage.

#### Account Balance Trend — Line Chart

- Multi-line chart showing balance over time for top accounts (last 3–6 months).
- User can toggle which accounts to show.

### 10.2 Account Detail View (`/accounts/:id`)

- **Header**: Account name, type, current balance.
- **Balance Trend**: Line chart for this account over the last 12 months.
- **Monthly Inflow / Outflow**: Bar chart showing income vs. expense for this account by month.
- **Transactions List**: All transactions for this account, paginated, with the same filters and sort as the global transactions page.
- **Account Info**: Name, type, opening date, currency. Editable via "Edit" button.

### 10.3 Add / Edit Account Modal

- **Fields**:
  - Account Name (required).
  - Account Type (required): Bank Account, Cash/Wallet, Credit Card, Digital Wallet, Investment.
  - Opening Balance (required, default 0): Current balance at the time of adding.
  - Currency (required, default: user's default currency).
  - Color (optional): For visual distinction in charts.
  - Notes (optional).
  - Credit Limit (only for Credit Card type).
- **Validation**: Name is required. Balance can be negative (for credit cards).

### 10.4 Transfers Between Accounts

- Available as a transaction type: "Transfer."
- **Fields**: From Account, To Account, Amount, Date, Note.
- **On Save**:
  - Deduct amount from the "From" account.
  - Add amount to the "To" account.
  - Create a single transaction record of type "transfer" referencing both accounts.
  - If currencies differ, prompt for the exchange rate and store both the source amount and converted amount.

---

## 11. Transactions Ledger

### 11.1 Page: All Transactions (`/transactions`)

This is the master view of every financial transaction — income, expenses, and transfers.

#### Page Header

- **Title**: "Transactions"
- **Actions**: "+ Add Transaction", "Import Transactions", "Export."

#### Filters Bar

A horizontal, collapsible filter bar with the following controls:

- **Date Range**: Preset buttons (Today, This Week, This Month, Last Month, This Quarter, This Year) + Custom range with date pickers.
- **Type**: Checkboxes or chips for Income, Expense, Transfer.
- **Category**: Multi-select dropdown of categories.
- **Account**: Multi-select dropdown of accounts.
- **Tags**: Multi-select or type-to-search for tags.
- **Amount Range**: Min amount and Max amount inputs.
- **Search**: Free text search across description, notes, and tags.
- **Clear All Filters** button.
- **Save Filter** (optional): Save a named filter preset for reuse (e.g., "Monthly subscriptions").

#### Transactions Table

- **Columns**:
  - Checkbox (for bulk selection).
  - Date (sortable).
  - Description.
  - Category (with icon).
  - Account.
  - Tags (as small chips).
  - Amount (green for income, red for expense, blue for transfer; sortable).
- **Sorting**: Click column header to sort ascending/descending. Default: newest first.
- **Pagination**: Show 25/50/100 per page. Cursor-based for performance.
- **Row Click**: Opens transaction detail / edit modal.
- **Row Hover**: Shows inline quick actions: Edit, Delete, Duplicate.

#### Bulk Actions

- Select multiple transactions via checkboxes.
- Bulk action bar appears: "X selected" with options: Delete, Change Category, Add Tag, Export Selected.

#### Transaction Detail / Edit Modal

- Shows all fields of the transaction, editable.
- If the transaction has a receipt, show a thumbnail with "View Full" option.
- "Duplicate" button: creates a copy with today's date.
- "Delete" with confirmation dialog.
- History: show "Created on [date]" and "Last edited on [date]" at the bottom.

### 11.2 Quick Add Transaction Modal

Accessible from anywhere via the top bar button, FAB (mobile), or keyboard shortcut.

- **Optimized for Speed**: Minimal fields, smart defaults.
- **Layout**:
  - Transaction type toggle at top: Income | Expense | Transfer (default: Expense).
  - Amount input (auto-focused, large font).
  - Category selector: recently used categories shown first, then full list.
  - Account selector: default account pre-selected.
  - Date: defaults to today, editable.
  - Description: optional, single line.
  - "More Options" expandable section: Tags, Recurring, Receipt, Notes, Split, Subcategory.
- **Keyboard Flow**: User can fill and submit entirely with keyboard — Tab through fields, Enter to save.
- **On Save**: Toast confirmation with "Undo" action (5 seconds to undo the last transaction).

---

## 12. Recurring Transactions

### 12.1 Page: Recurring Transactions (`/recurring`)

#### Page Header

- **Title**: "Recurring Transactions"
- **Actions**: "+ Add Recurring Transaction."

#### Active Recurring List

- A table/card list of all active recurring rules.
- **Each Entry Shows**:
  - Type icon (income or expense).
  - Description / Category.
  - Amount.
  - Frequency (e.g., "Monthly on the 1st", "Every 2 weeks on Friday").
  - Next occurrence date.
  - Account.
  - Status: Active, Paused.
  - Actions: Edit, Pause/Resume, Delete.

#### Upcoming Occurrences Calendar

- A mini calendar view (current month) with dots on dates that have upcoming recurring transactions.
- Clicking a date shows the list of recurring transactions due that day.

#### Past Auto-Logged Transactions

- A collapsible section showing the last 20 transactions that were auto-created by recurring rules, with dates and amounts.

### 12.2 Create / Edit Recurring Rule Modal

- **Fields**:
  - Transaction Type: Income or Expense.
  - Amount.
  - Category.
  - Account.
  - Description.
  - Frequency: Daily, Weekly, Bi-weekly, Monthly, Quarterly, Yearly.
  - Day specification: For weekly (day of week), for monthly (day of month, or "last day"), for quarterly/yearly (specific date).
  - Start Date.
  - End Date (optional): Leave blank for indefinite.
  - Auto-log toggle: If on, the system automatically creates the transaction on the due date. If off, the system sends a reminder and the user manually confirms.
- **Validation**: Amount > 0, start date is required, frequency is required.

### 12.3 Auto-Logging Engine

- A background job (cron) runs daily at midnight (user's timezone).
- For each active recurring rule where `next_occurrence` ≤ today:
  - If auto-log is on: create the transaction, update account balance, advance `next_occurrence` to the next date.
  - If auto-log is off: create a notification: "Recurring [description] of ₹[amount] is due today. Log it now?" with a one-tap "Log" action.
- Edge case: if the day is 31 and the month has only 30 days, schedule for the last day of the month.

---

## 13. Bills & Reminders

### 13.1 Page: Bills & Reminders (`/bills`)

#### Page Header

- **Title**: "Bills & Reminders"
- **Actions**: "+ Add Bill."

#### Bills Calendar View

- A full-width calendar for the current month showing bill due dates as color-coded dots or labels.
- Color coding: Green = Paid, Blue = Upcoming, Orange = Due Today, Red = Overdue.
- Click a date to see bills due that day.

#### Bills List View (Default)

- Toggle between Calendar and List views.
- **List Sections**:
  - **Overdue**: Bills past their due date that haven't been marked as paid. Highlighted in red.
  - **Due This Week**: Bills due in the next 7 days.
  - **Upcoming**: Bills due later this month.
- **Each Bill Row**:
  - Bill name and icon.
  - Amount (exact or estimated).
  - Due date and days until due.
  - Category.
  - Auto-pay indicator (if enabled).
  - Status: Paid, Upcoming, Due Today, Overdue.
  - Actions: "Mark as Paid" (opens a quick confirm with amount and account), Edit, Delete.

#### Monthly Bills Summary

- **Total Bills This Month**: Sum of all bill amounts.
- **Paid So Far**: Sum of bills marked as paid.
- **Remaining**: Total minus paid.
- **Upcoming Outflow**: Sum of unpaid bills — helps user plan cash flow.

### 13.2 Add / Edit Bill Modal

- **Fields**:
  - Bill Name (required): e.g., "Electricity", "Netflix Subscription."
  - Amount (required): Fixed or estimated. Toggle for "Amount varies each month" (stores an estimate but allows editing when marking as paid).
  - Due Date Day (required): Day of the month (1–31). If the bill is weekly, show day of the week.
  - Frequency: Monthly (default), Quarterly, Yearly, Weekly.
  - Category (required): Maps to an expense category.
  - Account: Which account pays this bill.
  - Auto-Pay (toggle): Informational flag — if the bill auto-debits, the user may still want reminders but the bill is auto-paid.
  - Reminder: How many days before due date to send a reminder (default: 3). Options: 1, 2, 3, 5, 7 days.
  - Notes (optional).

### 13.3 Mark Bill as Paid

- Clicking "Mark as Paid" opens a quick confirmation:
  - Pre-filled amount (editable if the bill amount varies).
  - Account (pre-filled from bill config).
  - Date: today (editable).
- On confirm: Creates an expense transaction linked to the bill and marks the bill as paid for this period.
- The bill's next due date auto-advances to the next period.

### 13.4 Reminder Logic

- A daily job checks all active bills.
- For each bill where due date minus today ≤ `reminder_days_before` and the bill is not yet marked as paid for the current period:
  - Send in-app notification.
  - Optionally send email/push notification (based on user settings).
- On the due date: send a final "Bill due today" reminder.
- If overdue (due date passed and not paid): send "Overdue" alert daily for up to 7 days.

---

## 14. Debt Tracker

### 14.1 Page: Debts Overview (`/debts`)

#### Page Header

- **Title**: "Debts"
- **Actions**: "+ Add Debt."

#### Summary Section

- **Total Debt**: Sum of all active debt `current_balance`.
- **Monthly Minimum Payments**: Sum of all minimum payments.
- **Interest Paid This Month**: Sum of interest components of debt payments (if tracked).
- **Debt-Free Projection**: Estimated date when all debts will be paid off at current payment rates.

#### Debts List

- Each debt as a card:
  - Debt name, type, and icon.
  - Current balance / Original principal.
  - Progress bar (principal paid off).
  - Interest rate.
  - Minimum monthly payment.
  - Next due date.
  - Monthly payment made vs. minimum.
  - Actions: Make Payment, Edit, View Details, Mark as Paid Off.

#### Debt Payoff Chart

- Stacked area chart showing projected balance reduction over time for each debt.
- Two scenarios: "Minimum Payments Only" vs. "Current Payment Rate."
- Highlight the debt-free date for each scenario.

### 14.2 Debt Detail View (`/debts/:id`)

- **Header**: Debt name, type, interest rate.
- **Balance Info**: Original principal, current balance, total interest paid, total payments made.
- **Payoff Progress**: Progress bar and percentage.
- **Amortization Projection**: Table showing monthly breakdown — payment, principal portion, interest portion, remaining balance — for the next 12 months (expandable to full term).
- **Payment History**: List of all payments made toward this debt with dates and amounts.
- **Payoff Strategies** (optional calculator):
  - "Pay ₹X more per month" → saves ₹Y in interest and pays off Z months early.
  - Snowball vs. Avalanche method comparison if multiple debts exist.

### 14.3 Make Payment Modal

- **Fields**:
  - Amount (required): Pre-filled with minimum payment.
  - Date (default: today).
  - Account (required): Which account is paying.
  - Note (optional).
- **On Save**:
  - Deduct from the source account.
  - Reduce debt's `current_balance`.
  - Create an expense transaction categorized under the debt's category (e.g., "EMI/Loan Payments").
  - If balance reaches 0, prompt to mark as paid off — celebration notification.

### 14.4 Add / Edit Debt Modal

- **Fields**:
  - Debt Name (required).
  - Debt Type: Loan, Credit Card, Mortgage, Personal Loan, Other.
  - Original Principal (required).
  - Current Balance (required).
  - Interest Rate (annual %, required).
  - Minimum Monthly Payment (required).
  - Due Date Day (1–31).
  - Start Date.
  - Linked Account (optional): If a credit card debt, link to the credit card account.
  - Notes.

---

## 15. Reports & Analytics

### 15.1 Page: Reports (`/reports`)

#### Page Header

- **Title**: "Reports & Analytics"
- **Period Selector**: Full flexibility — This Month, Last Month, Last 3/6/12 Months, This Year, Last Year, Custom Range.
- **Actions**: "Download Report" (PDF or CSV).

#### Report Sections (Tabbed or Scrollable)

##### 15.1.1 Income vs. Expense Report

- **Chart**: Dual-axis bar chart — income bars and expense bars for each month in the selected range.
- **Table Below**: Month-by-month breakdown with columns: Month, Total Income, Total Expenses, Net Savings, Savings Rate (%).
- **Summary**: Average monthly income, average monthly expense, average savings rate.

##### 15.1.2 Expense by Category Report

- **Chart**: Horizontal bar chart or treemap showing each category's total expense.
- **Drill-Down**: Click a category to see subcategory breakdown.
- **Table**: Category, Amount, % of Total, Transaction Count, Average Transaction Size.
- **Comparison**: Toggle to overlay previous period's data for category-by-category comparison.

##### 15.1.3 Income by Source Report

- **Chart**: Pie chart or bar chart of income by category.
- **Table**: Source, Amount, %, Count.
- **Trend**: Line chart showing each income source over time.

##### 15.1.4 Spending Trends

- **Daily Trend**: Line chart of daily spending for the selected period.
- **Day of Week Analysis**: Bar chart showing average spending by day of week (e.g., "You spend most on Saturdays").
- **Category Trend**: Multi-line chart with one line per top expense category over months.

##### 15.1.5 Budget Performance Report

- **Chart**: For each budgeted category, a grouped bar showing budget limit vs. actual spend for each month.
- **Score**: Overall budget adherence score — percentage of budgets that were under limit.
- **Savings from Budgets**: Total amount under-budget across all categories.

##### 15.1.6 Savings & Goals Report

- **Chart**: Stacked area chart showing cumulative savings across all goals over time.
- **Table**: Goal, Target, Current, % Complete, Monthly Average Contribution, Projected Completion.

##### 15.1.7 Cash Flow Report

- **Chart**: Waterfall chart or running balance chart showing starting balance, inflows, outflows, and ending balance.
- **Table**: Period, Opening Balance, Inflows, Outflows, Net, Closing Balance.

##### 15.1.8 Year-in-Review (Available in December/January)

- Full-year summary: total income, total expenses, total saved, top categories, biggest month, lowest month, goals achieved, debts paid off.
- Shareable summary card (designed for social sharing — optional, privacy-considered).

### 15.2 Custom Report Builder (Advanced)

- Users can build a custom report by selecting:
  - Metric: Income, Expense, Net, Balance.
  - Dimension: By Category, By Account, By Tag, By Month, By Week.
  - Filter: Date range, categories, accounts, tags.
  - Chart Type: Bar, Line, Pie, Table.
- Save custom reports for reuse.

---

## 16. Net Worth Tracker

### 16.1 Page: Net Worth (`/net-worth`)

#### Page Header

- **Title**: "Net Worth"

#### Current Net Worth Card

- **Value**: Total Assets minus Total Liabilities.
- **Breakdown**:
  - Assets: Sum of all bank, cash, digital wallet, and investment account balances.
  - Liabilities: Sum of all debt balances + credit card balances.
- **Change**: vs. last month (amount and percentage).

#### Net Worth Trend — Area Chart

- Monthly net worth over the last 12–24 months.
- Stacked areas showing: total assets (green area) and total liabilities (red area below x-axis).
- Net worth line overlaid.

#### Assets Breakdown

- Pie chart or bar chart of asset allocation: by account type or by individual account.
- Table: Account Name, Type, Balance, % of Total Assets.

#### Liabilities Breakdown

- Same structure for liabilities: by debt type or individual debt.
- Table: Debt Name, Type, Balance, Interest Rate, % of Total Liabilities.

#### Manual Asset Entry (Optional)

- For assets not tracked as accounts (e.g., real estate, vehicles, jewelry), allow users to add "manual assets":
  - Name, Estimated Value, Category (Real Estate, Vehicle, Other), Last Updated Date.
  - These are included in the net worth calculation.
  - Remind users to update valuations periodically.

---

## 17. Categories & Tags

### 17.1 Categories Management (Settings → Categories)

#### Default Categories

Pre-loaded categories that ship with the app (listed in the Onboarding section). These cannot be deleted but can be hidden/deactivated.

#### Custom Categories

- Users can create custom categories under Income or Expense.
- **Fields**: Name, Type (Income/Expense), Parent Category (optional — to create subcategories), Icon (picker from icon library), Color.
- **Rules**:
  - Category names must be unique within the same type.
  - Maximum 2 levels of nesting (Category → Subcategory).
  - A category with transactions cannot be deleted — it can only be archived/hidden. On hide, prompt user to reassign or keep.

#### Category Operations

- **Rename**: Updates the name everywhere retroactively.
- **Merge**: Combine two categories into one. All transactions from the source category are reassigned to the target. Irreversible — confirm with a warning.
- **Reorder**: Drag-and-drop to reorder categories. Order affects dropdown menus and reports.
- **Archive**: Hides the category from dropdowns and reports but preserves historical data.

### 17.2 Tags System

- Tags are free-form labels that can be attached to any transaction for additional grouping.
- **Use Cases**: "tax-deductible", "business-trip", "shared-expense", "impulse-buy", "reimbursable."
- **Tag Input**: Type to search/create. Shows existing tags as suggestions.
- **Tag Management** (Settings → Tags):
  - View all tags with transaction counts.
  - Rename tags (retroactive).
  - Delete tags (removes from all transactions — confirm).
  - Merge tags.
- **Tag-Based Filtering**: Available in all transaction lists and reports.

---

## 18. Currency & Multi-Currency Support

### 18.1 Default Currency

- Set during onboarding. Can be changed in Settings.
- All summary values, dashboard totals, and reports display in the default currency.

### 18.2 Multi-Currency Accounts

- Each account can have its own currency.
- Account balances are displayed in both the account's native currency and the user's default currency (converted at current rates).

### 18.3 Currency Conversion

- When a transaction is logged in a non-default currency, the user specifies (or the system auto-suggests) the exchange rate.
- Store both: original amount + currency, and converted amount in default currency.
- Exchange rate source: A free API (e.g., Open Exchange Rates, Fixer.io free tier). Rates updated daily.
- Users can override the auto-suggested rate (for actual bank rates).

### 18.4 Currency Formatting

- Proper formatting per locale: ₹1,23,456.78 (Indian), $123,456.78 (US), €123.456,78 (European).
- Currency symbol placement: before or after the number based on locale.
- Number of decimal places based on currency (e.g., JPY has 0 decimals).

---

## 19. Data Import & Export

### 19.1 Import

#### CSV Import

- Upload a CSV file with transaction data.
- **Import Wizard**:
  - Step 1: Upload file.
  - Step 2: Map CSV columns to app fields (Date, Amount, Description, Category, Account). Show a preview of the first 5 rows.
  - Step 3: Set default values for unmapped fields (e.g., if no Category column, assign a default category).
  - Step 4: Review and confirm. Show count of transactions to import and any warnings (e.g., duplicate detection).
  - Step 5: Import. Show progress bar and result summary.
- **Duplicate Detection**: Check for transactions with the same date, amount, and description. Flag duplicates and let user skip or import them.

#### Bank Statement Import (Future)

- Upload PDF or CSV bank statements.
- Parse and extract transactions.
- Map to categories using ML-based auto-categorization.

### 19.2 Export

- **Formats**: CSV, PDF (formatted report), Excel (XLSX).
- **Scope**: All transactions, filtered transactions, specific date range, specific accounts.
- **Scheduled Export** (optional): Auto-generate and email a monthly CSV on the 1st of each month.
- **Data Portability**: "Export All My Data" option in Settings — downloads a complete ZIP with all transactions, accounts, budgets, goals, categories, and settings in JSON format. GDPR/compliance friendly.

---

## 20. Notifications & Alerts

### 20.1 Notification Types

| Type | Trigger | Priority |
|------|---------|----------|
| Bill Due Reminder | X days before bill due date | High |
| Bill Overdue | Bill due date passed, not marked paid | Critical |
| Budget Warning | Spending reached alert threshold (e.g., 80%) | Medium |
| Budget Exceeded | Spending exceeded 100% of budget | High |
| Goal Milestone | Savings goal reached 25%, 50%, 75% | Low |
| Goal Achieved | Savings goal reached 100% | High (Celebration) |
| Recurring Transaction Due | Reminder for non-auto-logged recurring transactions | Medium |
| Recurring Transaction Logged | Confirmation that auto-logged transaction was created | Low |
| Large Transaction Alert | A transaction above a user-defined threshold was logged | Medium |
| Weekly Summary | End-of-week summary: income, expenses, net | Low |
| Monthly Summary | End-of-month summary with key stats | Low |
| Account Balance Low | Account balance drops below user-defined minimum | High |
| System | App updates, maintenance, security alerts | Low |

### 20.2 Notification Channels

- **In-App**: Always on. Notifications appear in the bell icon dropdown and in a full Notifications page.
- **Email**: Opt-in per notification type. Default: bill reminders and budget exceeded only.
- **Push (Browser)**: Opt-in. Prompt user to enable browser push notifications on first login.
- **Mobile Push**: If a mobile app or PWA is used.

### 20.3 Notification Preferences (Settings → Notifications)

- A table of all notification types with toggles for each channel (In-App, Email, Push).
- "Quiet Hours": Do not send push/email notifications between set times (e.g., 10 PM – 8 AM).
- "Weekly Digest" toggle: Instead of individual low-priority notifications, batch them into a weekly email.

### 20.4 Notifications Page (`/notifications`)

- List of all notifications, newest first.
- Each notification: icon, title, message, timestamp, read/unread status.
- Click to navigate to the relevant page (e.g., clicking a budget warning goes to that budget detail).
- "Mark All as Read" button.
- Filter: All, Unread, by type.

---

## 21. User Settings & Preferences

### 21.1 Page: Settings (`/settings`)

Organized into tabs or sections:

#### Profile

- Display Name (editable).
- Email (editable with re-verification).
- Avatar (upload or select from defaults).
- Change Password.
- Two-Factor Authentication toggle and setup.

#### General Preferences

- **Default Currency**: Dropdown.
- **Timezone**: Auto-detected with override.
- **Date Format**: DD/MM/YYYY, MM/DD/YYYY, YYYY-MM-DD.
- **Number Format**: 1,23,456 (Indian), 123,456 (Western).
- **First Day of Week**: Sunday or Monday (affects weekly budgets and reports).
- **Start of Financial Month**: Day 1 (default) through Day 28. For users whose salary arrives mid-month, they may want their "financial month" to start on the 25th, for example.

#### Appearance

- **Theme**: Light, Dark, System (auto).
- **Accent Color**: Choose from a palette of 8–10 colors for charts and UI highlights.
- **Compact Mode**: Toggle to reduce spacing and show more data on screen.

#### Categories

- Manage categories (as described in Section 17).

#### Tags

- Manage tags (as described in Section 17).

#### Notifications

- Notification preferences (as described in Section 20).

#### Data Management

- **Import Data**: Opens the CSV import wizard.
- **Export Data**: Download all data as CSV, XLSX, or JSON.
- **Delete All Data**: Permanently delete all financial data. Requires typing "DELETE" to confirm. This does not delete the account.
- **Delete Account**: Permanently delete the user account and all data. Requires password confirmation and typing "DELETE MY ACCOUNT."

#### Connected Services (Future)

- Bank account linking (via Plaid, Yodlee, etc.).
- Manage connected banks and sync settings.

---

## 22. Security & Data Privacy

### 22.1 Authentication Security

- Passwords hashed with bcrypt (cost factor 12+).
- JWT tokens with short expiry (15 min access, 7–30 day refresh).
- HTTP-only, Secure, SameSite cookies for refresh tokens.
- CSRF protection on all state-changing endpoints.
- Rate limiting on login (5 attempts/15 minutes), registration, and password reset endpoints.

### 22.2 Data Encryption

- **In Transit**: TLS 1.2+ enforced on all connections. HSTS headers.
- **At Rest**: Database encryption (AES-256) for sensitive fields (account names, balances, transaction descriptions). Full-disk encryption on servers.
- **Backups**: Encrypted backups with separate key management.

### 22.3 Data Privacy

- No selling or sharing of user financial data. Ever.
- Minimal analytics: only anonymized, aggregated usage metrics (e.g., "how many users create budgets") — no individual financial data leaves the system.
- Users can export all their data at any time (GDPR right to data portability).
- Users can delete their account and all data at any time (GDPR right to erasure).
- Privacy policy clearly states data handling practices.

### 22.4 Application Security

- Input sanitization on all fields (prevent XSS, SQL injection).
- Content Security Policy (CSP) headers.
- CORS restricted to known origins.
- Dependency vulnerability scanning (e.g., `npm audit`, Snyk).
- Regular security audits and penetration testing.
- Row-level security: Every database query is scoped to the authenticated user's ID. No user can access another user's data.

### 22.5 Audit Log (Optional)

- Track critical user actions: login, password change, account deletion, large transactions, data export.
- Stored for 90 days. Accessible in Settings for the user to review their own activity.

---

## 23. Responsive Design & Accessibility

### 23.1 Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, bottom nav, FAB, stacked cards |
| Tablet | 640px – 1024px | Two-column for some sections, collapsible sidebar |
| Desktop | > 1024px | Full sidebar, multi-column grids, expanded charts |

### 23.2 Mobile-Specific Adaptations

- Bottom tab navigation replaces sidebar.
- Charts resize to full width with horizontal scroll for large datasets.
- Tables switch to card/list layout on mobile.
- Modals become full-screen sheets on mobile.
- Touch-optimized inputs: larger tap targets (minimum 44px), swipe gestures on transaction rows (swipe left to delete, swipe right to edit).
- FAB for "Add Transaction" — always within thumb reach.

### 23.3 Accessibility (WCAG 2.1 AA)

- **Keyboard Navigation**: All interactive elements reachable and operable via keyboard. Focus indicators visible.
- **Screen Reader Support**: Semantic HTML, ARIA labels on icons and charts, `role` attributes on custom widgets.
- **Color Contrast**: Minimum 4.5:1 ratio for text, 3:1 for large text. All color-conveyed information also has a text/icon/pattern alternative (e.g., budget status uses both color and a label: "On Track" / "Exceeded").
- **Text Scaling**: UI remains usable at 200% browser zoom.
- **Motion**: Respect `prefers-reduced-motion`. Disable animations and transitions for users who prefer reduced motion.
- **Form Labels**: Every input has a visible label. Error messages are descriptive and associated with the field.
- **Charts**: Provide a "View as Table" toggle for every chart so screen reader users can access the data.

---

## 24. Error Handling & Edge Cases

### 24.1 Form Validation

- Validate on blur (when user leaves a field) and on submit.
- Show inline error messages below the field in red, with descriptive text (e.g., "Amount must be a positive number" not "Invalid input").
- Disable submit button until required fields are filled (but still allow clicking to show validation messages).

### 24.2 API Error Handling

- **Network Error**: Show a banner: "Unable to connect. Check your internet connection." with a Retry button.
- **Server Error (5xx)**: Show a friendly message: "Something went wrong on our end. Please try again in a moment." Log the error for debugging.
- **Validation Error (400)**: Display the specific field errors returned by the API.
- **Unauthorized (401)**: Redirect to login page. If refresh token is available, attempt silent refresh first.
- **Forbidden (403)**: Show "You don't have permission to perform this action."
- **Not Found (404)**: Show a 404 page with navigation back to dashboard.
- **Rate Limited (429)**: Show "Too many requests. Please wait a moment and try again."

### 24.3 Empty States

Every page/section must have a meaningful empty state when there's no data:

- **Dashboard with no transactions**: "Welcome! Start by adding your first transaction or setting up your accounts." with CTAs for "Add Transaction" and "Set Up Accounts."
- **Budgets with none created**: Illustration + "Create your first budget to start tracking your spending limits."
- **Goals with none**: "What are you saving for? Set a goal and we'll help you get there."
- **Reports with no data**: "Not enough data to generate reports yet. Add some transactions first."

### 24.4 Edge Cases

- **Negative Account Balances**: Allowed (overdrafts, credit cards). Display clearly with a negative sign or in red.
- **Zero-Amount Transactions**: Not allowed. Validate on input.
- **Future-Dated Transactions**: Allowed up to 1 year in the future. Displayed with a "Scheduled" badge. Included in budget calculations only when the date arrives.
- **Timezone Changes**: If user changes timezone, all dates are stored in UTC. Display adjusts to the new timezone. Historical transactions remain correct.
- **Currency Change**: If user changes default currency, all historical data remains in its original currency. Summaries are recalculated using stored exchange rates. New transactions use the new default.
- **Account Deletion with Balance**: Warn the user. Require them to transfer balance to another account or zero it out first.
- **Category Deletion with Transactions**: Not allowed directly. Must merge into another category or archive.
- **Concurrent Edits**: Last-write-wins with optimistic locking (version field on transaction records). If conflict detected, show: "This transaction was modified. Please refresh and try again."

---

## 25. Performance & Scalability

### 25.1 Frontend Performance

- **Code Splitting**: Lazy-load routes and heavy components (charts, report builders).
- **Virtualization**: Use virtual scrolling for long transaction lists (react-window or react-virtualized).
- **Memoization**: Memoize expensive calculations (totals, chart data) with `useMemo` and `React.memo`.
- **Optimistic Updates**: When adding/editing a transaction, update the UI immediately and sync with the server in the background. Revert on failure.
- **Caching**: Cache API responses for static-ish data (categories, accounts) with SWR or React Query. Transactions use stale-while-revalidate.
- **Image Optimization**: Compress receipt images on upload (client-side). Serve responsive images.
- **Bundle Size**: Keep initial bundle under 200KB gzipped. Monitor with webpack-bundle-analyzer.

### 25.2 Backend Performance

- **Database Indexing**: Composite indexes on `(user_id, date)`, `(user_id, category_id, date)`, `(user_id, account_id, date)` for transaction queries.
- **Query Optimization**: Avoid N+1 queries. Use JOINs or batch queries for dashboard aggregations.
- **Aggregation Caching**: Pre-compute and cache monthly totals (income, expense, per-category) in a summary table. Invalidate on transaction changes.
- **Pagination**: Cursor-based pagination for transactions. Never load unbounded result sets.
- **Background Jobs**: Use a job queue (Bull, Agenda) for: recurring transaction processing, notification delivery, report generation, data export.
- **Connection Pooling**: Use PgBouncer or Prisma's built-in pooling.

### 25.3 Scalability Targets

- Support up to 100,000 transactions per user without performance degradation.
- Dashboard load time: < 2 seconds.
- Transaction list (paginated): < 500ms per page.
- Chart rendering: < 1 second for 12-month data.

---

## 26. Future Enhancements & Roadmap

### Phase 2 (Post-Launch)

- **Bank Sync**: Connect bank accounts via Plaid/Yodlee for automatic transaction import.
- **Receipt OCR**: Scan receipts with camera, extract transaction data automatically.
- **Smart Categorization**: ML-based auto-categorization of imported transactions using description text.
- **Shared Expenses**: Split expenses with family/roommates and track who owes what.
- **Investment Tracking**: Track stocks, mutual funds, SIPs with real-time portfolio value.
- **Mobile App**: Native iOS and Android apps (or high-quality PWA).

### Phase 3 (Growth)

- **Financial Health Score**: A composite score (0–100) based on savings rate, budget adherence, debt-to-income ratio, emergency fund coverage.
- **AI Insights**: Natural language insights: "You could save ₹5,000/month by reducing dining and subscription expenses to match your Q1 averages."
- **Tax Helper**: Tag tax-deductible expenses and generate year-end summaries for tax filing.
- **Multi-User / Family**: Shared family accounts with role-based access (admin, viewer).
- **API Access**: Let power users access their data via a personal API.
- **Plugins / Integrations**: Connect with Google Sheets, Zapier, IFTTT.

---

## Appendix A: Default Category List

### Income Categories

| Category | Icon | Color |
|----------|------|-------|
| Salary | 💼 | #4CAF50 |
| Freelance | 💻 | #2196F3 |
| Business | 🏢 | #FF9800 |
| Investments | 📈 | #9C27B0 |
| Rental Income | 🏠 | #795548 |
| Interest | 🏦 | #607D8B |
| Gifts Received | 🎁 | #E91E63 |
| Refunds | ↩️ | #00BCD4 |
| Other Income | ➕ | #9E9E9E |

### Expense Categories

| Category | Icon | Color | Common Subcategories |
|----------|------|-------|---------------------|
| Food & Dining | 🍽️ | #FF5722 | Restaurants, Cafés, Fast Food, Delivery |
| Groceries | 🛒 | #4CAF50 | Supermarket, Vegetables, Dairy, Snacks |
| Transport | 🚗 | #2196F3 | Fuel, Uber/Ola, Public Transit, Parking |
| Rent / Housing | 🏠 | #795548 | Rent, Maintenance, Repairs |
| Utilities | 💡 | #FF9800 | Electricity, Water, Gas, Internet, Phone |
| Entertainment | 🎬 | #9C27B0 | Movies, Games, Streaming, Events |
| Shopping | 🛍️ | #E91E63 | Clothing, Electronics, Home Decor |
| Health | 🏥 | #F44336 | Medicine, Doctor, Gym, Insurance Premium |
| Education | 📚 | #3F51B5 | Tuition, Books, Courses, Supplies |
| Insurance | 🛡️ | #607D8B | Life, Health, Vehicle, Home |
| Personal Care | 💇 | #FF4081 | Haircut, Cosmetics, Spa |
| Gifts & Donations | 🎁 | #CE93D8 | Gifts Given, Charity |
| Travel | ✈️ | #00BCD4 | Flights, Hotels, Activities, Food (Travel) |
| Subscriptions | 📱 | #8BC34A | Netflix, Spotify, Software, Magazines |
| EMI / Loan Payments | 💳 | #F44336 | Home Loan, Car Loan, Personal Loan |
| Taxes | 🧾 | #455A64 | Income Tax, Property Tax |
| Childcare | 👶 | #FFEB3B | School, Daycare, Activities, Supplies |
| Pets | 🐾 | #A1887F | Food, Vet, Grooming |
| Other Expense | ➕ | #9E9E9E | — |

---

## Appendix B: Glossary

| Term | Definition |
|------|-----------|
| Transaction | Any financial event: income received, expense paid, or transfer between accounts |
| Account | A financial container: bank account, cash wallet, credit card, etc. |
| Category | A classification for transactions (e.g., "Food & Dining", "Salary") |
| Subcategory | A second-level classification under a category (e.g., "Restaurants" under "Food & Dining") |
| Tag | A free-form label for additional grouping (e.g., "tax-deductible") |
| Budget | A spending limit for a specific category over a defined period |
| Savings Goal | A target amount to save by a specific date |
| Recurring Transaction | A transaction that repeats on a schedule (e.g., monthly salary, weekly groceries) |
| Bill | A known, recurring financial obligation with a due date (e.g., electricity, rent) |
| Debt | A financial liability being paid off over time (e.g., loan, credit card balance) |
| Net Worth | Total assets minus total liabilities |
| Savings Rate | (Income - Expenses) / Income × 100 — the percentage of income saved |
| Prorated Budget | The expected budget usage based on how far through the period we are |
| Auto-Allocate | Automatically moving money toward a savings goal on a schedule |

---

*Document Version: 1.0*
*Last Updated: March 2026*
*Scope: Complete system instructions for a Personal Fund & Finance Management Web Application*
