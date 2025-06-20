# mysql-node-express

A production-ready Node.js backend boilerplate built with Express.js and MySQL. This project provides a modular API structure for managing users, wallets, subscribers, P2P trading, and IEO (Initial Exchange Offering) features. 

## ✨ Features

- User Authentication with Passport.js
- Wallet management and token updates via Web3
- IEO (Initial Exchange Offering) & P2P route support
- SQLite & MySQL support (via `sqlite3` and `mysql2`)
- Secure cookie sessions with `express-session`
- Scheduled token price updater using `node-cron`
- Multilingual support with `i18n`
- Email integration using Nodemailer
- RESTful API structure with Express

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL / SQLite**
- **Passport.js**
- **Web3**
- **Nodemailer**
- **Cron Jobs**

---

## 📁 Project Structure

```
.
├── src/
│   ├── server.js           # Main server file
│   ├── routes/
│   │   └── api/
│   │       ├── user.route.js
│   │       ├── wallet.route.js
│   │       ├── subscriber.route.js
│   │       ├── ieo.route.js
│   │       └── p2p.route.js
│   ├── services/
│   │   └── wallet.service.js
│   ├── utils/
│   │   └── HttpException.utils.js
│   └── middleware/
│       └── error.middleware.js
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/mysql-node-express.git
cd mysql-node-express

# Install dependencies
npm install
```

---

## 🧪 Running in Development

```bash
npm run dev
```

Runs the server with `nodemon` on the default port `3000` (or specified in `.env`).

---

## 🚦 Starting in Production

```bash
npm start
```

---

## 🛠️ Environment Variables

Create a `.env` file in the root and include the following:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=yourdbname
```

---

## 🧠 Scheduled Jobs

The app runs a cron job every 10 minutes to update top tokens:

```js
cron.schedule('*/10 * * * *', () => {
  WalletService.updateTopTokens().then(() => {
    console.log("Top Token data updated");
  });
});
```

---

## 🧪 API Endpoints

| Endpoint              | Description                    |
|-----------------------|--------------------------------|
| `/api/users`          | User routes (auth, profile)    |
| `/api/wallets`        | Wallet-related actions         |
| `/api/subscribers`    | Newsletter/updates subscriptions |
| `/api/ieo`            | IEO-related routes             |
| `/api/p2p`            | P2P exchange routes            |

---

## 📦 Dependencies

See [`package.json`](./package.json) for the full list, but major ones include:

- `express`
- `mysql2`
- `passport`, `passport-local`
- `web3`
- `bcryptjs`
- `jsonwebtoken`
- `nodemailer`
- `node-cron`
- `dotenv`

---
