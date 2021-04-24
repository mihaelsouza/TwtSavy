# TwtSavy

Have you ever wondered what tone the things you tweet might feel like to others?  
What about that company you really like? When people mention it, is it overall good or bad?  
Ever curious whether or not that cool new hashtah you created is having a positive impact?  

Well, wonder no more!  
With TwtSavy, you can use the power of AI to get an answer in just 30 secs!  

<hr>
<br><br><br>

## What is TwtSavy?

This is meant as a portofolio piece and not intended to become a full-fledged application.  
You are more than welcome to fork the repo and play around with it at will. Necessary environmental variables are described in the env-example.md, and the necessary packages for each part of the application is described either in the package.json (node) or the requirements.txt (python) files.

### Overview of the Folder Structure:
Boilerplate folders without any business logic are omitted from the below tree.  
```
twtsavy (root)  
├── client  **React Native Mobile App  
│   ├── __tests__
│   ├── android  
│   ├── assets  **Custom fonts and images
│   ├── components  **Contains business logic or makes use of state changes
│   ├── containers  **Generalized styled containers for re-use
│   ├── ios  
│   ├── redux **Implementation of Redux store and slices (actions & reducers)
│   ├── screens **App views, reached through navigation
│   ├── services  **Communication with the server folder - API logic
│   └── utilities **General Types, Data Transfer Objects/Interfaces and utility functions
│
├── model_api **Independent REST API to serve the AI (LSTM) model - Sentiment Analysis
│   ├── lstm_model  **Model code, weights and vectorizer vocabulary
│   ├── model_api **General DJANGO settings and exposed urls
│   └── sentimentAI **REST logic with database models (Postgres), serializers and API views
│       └── migrations  
│
└── server  **Node Backend using NestJS
    ├── src  
    │   ├── analyze **Analyze endpoints, responsible for handling sentiment analysis
    │   │   ├── services  **Twitter API and model_api business logic
    │   │   └── utilities **Interfaces and utility functions
    │   └── users  **User endpoints, handles user creation, validation and query storage
    │       ├── services  **Backend to Database (MongoDB with Mongoose) business logic
    │       └── utilities  **Data Transfer Object for users and database Schema
    └── test  
```

## Tech Stack
### FrontEnd
1. Built using React Native
2. State management using Redux
3. HTTP calls using AXIOS
4. Written in TypeScript

### Backend
1. Built using NestJS
2. Connected to MongoDB using Mongoose
3. HTTP calls using AXIOS
4. Written in TypeScript

### AI Model API
1. Built using DJANGO
2. Minimal UI using the DJANGO REST Framework
3. Model developed using Tensorflow/Keras
4. Connected to a Postgres database
5. Written in Python