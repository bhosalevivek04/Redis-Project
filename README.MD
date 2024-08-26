# Node Assignment: User Task Queuing with Rate Limiting

## Setup
### Prerequisites
- Node.js (v14+)
- npm (v6+)
- Redis server

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/bhosalevivek04/Redis-Project.git
2. **Install dependencies(Optional if any dependecies not found in package.json):** 
    ```bash
    npm install express cluster os rate-limiter-flexible ioredis fs winston
3. **Redirect to Folder**
    ```bash
    cd Redis-Project
4. **Start Redis (Check First Redis is available on your System or Not, then type cmd in Terminal):**
   ```bash
    Redis-server.exe "C:\Program Files\Redis\redis.windows.conf" --port 6380
5. **Run the server:**
    ```bash
    node src/server.js
### API Testing
# POST Request Example:
    curl -X POST http://localhost:3000/api/v1/task -H "Content-Type: application/json" -d '{"user_id": "123"}'
#  Logging:
    Logs are saved to `logs/task_log.txt`.
#  Dependencies:
- express
- cluster
- rate-limiter-flexible
- ioredis
- winston
# Notes
1.  **No tasks are dropped; excess tasks are queued and processed later.**
2.  **The API is resilient and scalable.**

    ```bash
    This file includes all the required information about the project, providing a clear guide for setting up, running, and testing the Node.js API with rate limiting and task queueing.
