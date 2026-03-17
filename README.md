# Bank-web

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-blue.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

A banking web application built with vanilla JavaScript, featuring user authentication, transaction management, money transfers, loan requests, and account closure functionality.

## Features

- **User Authentication**: Secure login with username and PIN
- **Account Overview**: Real-time balance display and transaction history
- **Money Transfers**: Transfer funds between accounts instantly
- **Loan Requests**: Request loans with automatic approval logic
- **Account Management**: Close accounts securely
- **Transaction Sorting**: Sort movements by date or amount
- **Auto Logout**: Automatic session timeout for security
- **Responsive Design**: Clean, modern UI that works on all devices

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with modern design principles
- **Fonts**: Google Fonts (Poppins)
- **No external dependencies**: Pure vanilla JavaScript

## Installation

### Option 1: Live Demo

Visit the live application at: [https://bank-web-nu.vercel.app/](https://bank-web-nu.vercel.app/)

### Option 2: Clone and Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bankist.git
   cd bankist
   ```

2. Open `index.html` in your web browser.

No additional installation or build steps required.

## Usage

1. Open the application in your web browser
2. Click the "Instruction" button to view test accounts
3. Use one of the following test accounts to log in:
   - **Account 1**: User: `kp`, PIN: `1111`
   - **Account 2**: User: `sc`, PIN: `2222`
   - **Account 3**: User: `lj`, PIN: `3333`
   - **Account 4**: User: `mj`, PIN: `4444`

4. Explore features:
   - View your current balance and transaction history
   - Transfer money to other users
   - Request loans (must have at least 10% of loan amount in deposits)
   - Sort transactions using the sort button
   - Close your account if needed

## Project Structure

```
bankist/
├── index.html      # Main HTML structure
├── style.css       # Application styling
└── script.js       # Application logic and functionality
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Dev: Kien Pham (kienpham07)
