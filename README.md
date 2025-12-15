# BuddyGPT
BuddyGPT is a GPT clone using Open AI.

## Model 
1. ThreadSchema contains
threadID
title
messages
createdAt
updatedAt

2. MessageSchema
content
role -> User, Assistant
timestamp

"cors": "^2.8.5",
"dotenv": "^17.2.3",
"express": "^5.1.0",
"nodemon": "^3.1.11",
"openai": "^6.9.1"

Feature:
- Latest reply has a typing effect with word by word printing.