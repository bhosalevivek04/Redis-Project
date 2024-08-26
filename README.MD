# Node Assignment: User Task Queuing with Rate Limiting

## Setup
### Prerequisites
- Node.js (v14+)
- npm (v6+)
- Redis server

### Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd project
2. **Install dependencies:** 
    ```bash
    npm install
3. **Start Redis:**
    ```bash
    redis-server
4. **Run the server:**
    ```bash
    node src/server.js
### API Testing
# POST Request Example:
    ```bash
    curl -X POST http://localhost:3000/api/v1/task -H "Content-Type: application/json" -d '{"user_id": "123"}'
#  Logging:
    Logs are saved to `logs/task_log.txt`.
#  Dependencies:
    i. express
    ii. cluster
    iii. rate-limiter-flexible
    iv. ioredis
    v. winston
# Notes
1.  **No tasks are dropped; excess tasks are queued and processed later.**
2.  **The API is resilient and scalable.**
    ```bash
    This file includes all the required information about the project, providing a clear guide for setting up, running, and testing the Node.js API with rate limiting and task queueing.
