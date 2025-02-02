# Fetch takehome

### Steps to run
1. in /fetch-takehome run 'npm i'
2. run 'npm run dev'

### Note
I used NEXT_PUBLIC_ for the backend address. In a real world scenario, I would be more cautious of exposing a key to the broswer. This runs in chromium based web browsers. Safari has issues with the Http-Only cookies and won't persist them due to Safari’s "Intelligent Tracking Prevention" (ITP).
