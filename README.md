# car-shipping-management



## Overview

The Car Shipping Management application is a comprehensive platform designed to handle the logistics and management of car shipping. It provides functionalities for managing car shipments, user authentication, and tracking of shipping statuses.

## Features

- **Car Management**: Add, update, and delete car records.
- **User Authentication**: Secure login and registration for users.
- **Shipping Tracking**: Track the status of car shipments.
- **Health Check**: Endpoint to ensure the server is running properly.

## Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: React


## Installation

### Prerequisites

- Node.js (>=14.x)
- MongoDB

### Running in local frontend
cd car-shipping-management/cliend
npm install
npm run dev 

For Docker Container
docker build -t react-app .
docker run -p 80:80 react-app

### Running in local backend
cd car-shipping-management/backend
npm install
npm run dev 

For Docker Container
docker build -t my-node-app .
docker run -p 3000:3000 my-node-app

### Clone the Repository

```bash
git clone https://github.com/your-username/car-shipping-management.git
cd car-shipping-management



