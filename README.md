# Devops-project-DEPI-3



# 🚀 URL Shortener – Full Deployment with Docker Compose

This project is a complete deployment setup for a *URL Shortener Web Application* using *Docker Compose*, including:

* *Frontend (HTML / JS)*
* *Backend (Node.js)*
* *MongoDB*
* *Prometheus* for backend metrics
* *Grafana* for dashboards

---

## 📦 *Project Architecture*


frontend  →  backend  →  mongo
                  ↓
             prometheus → grafana


Everything runs in *one docker-compose.yml* file.

---

## 🛠 *Technologies Used*

* Node.js (Backend)
* MongoDB
* Docker & Docker Compose
* Prometheus
* Grafana
* NGINX (for frontend)

---

## 📁 *Project Structure*


project/
│── backend/
│   ├── Dockerfile
│   ├── .env
│── frontend/
│   ├── Dockerfile
│── prometheus.yml
│── docker-compose.yml
│── README.md


---

## ▶ *How to Run the Project*

### *1️⃣ Clone the repository*

bash
git clone https://github.com/YourUsername/YourRepo.git
cd YourRepo


---

### **2️⃣ Make sure backend .env exists**

Inside /backend/.env:


PORT=5000
MONGO_URL=mongodb://mongo:27017/urlshortener


---

### *3️⃣ Run the full stack*

bash
docker compose up -d --build


This will start:

| Service     | Port                                           |
| ----------- | ---------------------------------------------- |
| Frontend    | [http://localhost:8080](http://localhost:8080) |
| Backend API | [http://localhost:5000](http://localhost:5000) |
| MongoDB     | localhost:27017                                |
| Prometheus  | [http://localhost:9090](http://localhost:9090) |
| Grafana     | [http://localhost:3000](http://localhost:3000) |

---

## 📊 *Monitoring Setup*

### **Prometheus Config (prometheus.yml)**

yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'url-shortener-backend'
    static_configs:
      - targets: ['backend:5000']
        labels:
          service: url-shortener


Prometheus scrapes backend metrics every *15 seconds*.

---

### *Grafana*

Default login:


username: admin
password: admin


You can add Prometheus as a datasource:

* *URL:* http://prometheus:9090

Then import dashboards as needed.

---

## 🧱 *docker-compose.yml Explained*

### ✔ Backend

* Builds Node.js backend
* Exposes *5000*
* Loads .env
* Depends on MongoDB

### ✔ Frontend

* Builds & serves the UI with NGINX
* Exposes *8080*
* Depends on backend

### ✔ MongoDB

* Official mongo:6.0 image
* Persists data using a Docker volume

### ✔ Prometheus

* Mounts your prometheus.yml
* Scrapes backend metrics

### ✔ Grafana

* Connects to Prometheus
* Exposes *3000* for dashboards

---

## 📌 *Useful Commands*

Stop all containers:

bash
docker compose down


Rebuild:

bash
docker compose up -d --build


View logs:

bash
docker compose logs -f backend


---

## 📬 *Contributing*

Pull requests are welcome.
For major changes, please open an issue first.

---

## 📄 License

MIT License.

---
