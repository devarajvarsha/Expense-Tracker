# Expense Tracker

An intuitive and responsive expense tracking application built with HTML, CSS, and JavaScript. This application helps users manage their personal finances by recording income and expenses, providing insights into their financial status, and supporting multiple currencies.

## Features

- **Track Income and Expenses**: Add, view, and delete income and expense transactions.
- **Currency Support**: Automatically converts amounts to a selected currency using real-time exchange rates.
- **Total Balance Calculation**: Displays total income, total expenses, and overall balance.
- **User-Friendly Interface**: A clean and modern design with intuitive navigation and smooth animations.
- **Responsive Design**: Fully responsive layout for both desktop and mobile devices.

## Demo

You can try the demo of this application by [link to demo if available].

## Technologies Used

- **HTML5**: Used for the structure of the application.
- **CSS3**: Used for styling and creating a responsive, visually appealing layout with gradients and animations.
- **JavaScript**: Manages the functionality of the app, including handling transactions, local storage, and fetching real-time exchange rates.

## How It Works

### Add Transactions:

- Users can add an income or expense transaction by providing details like name, amount, date, and currency.
- The form provides an option to toggle between income and expense transactions.

### View Transactions:

- All recorded transactions are displayed in a list with their names, amounts, and dates.
- Income transactions are highlighted in mint green, and expense transactions are highlighted in soft red.

### Total Balance:

- The total balance is calculated by subtracting expenses from income, and the balance is displayed in the selected currency.

### Currency Conversion:

- The app automatically converts transaction amounts to the selected currency using exchange rates fetched from the Open Exchange Rates API.

### Responsive Layout:

- The app layout adjusts for smaller screens to ensure a seamless user experience on both desktop and mobile devices.

## Installation

To run the Expense Tracker on your local machine:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/expense-tracker.git
    ```

2. **Open the project:**

    Navigate to the project folder and open the `index.html` file in your browser.

3. **Start using the app:**

    The app will open in your default browser. Start adding your transactions and track your expenses!

## API

This application uses the Open Exchange Rates API to fetch real-time exchange rates for currency conversion. The API is accessed using an API key.

- **API endpoint**: `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`
  
You can generate your own API key from Open Exchange Rates.
