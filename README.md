# COOU Anniversary ChatBot Setup

## 1. Environment Variables

- Copy `.env.example` to `.env` in the project root.

Edit `.env` and set the following keys:

```
GEMINI_API_KEY=your_gemini_api_key
DEPLOY_SECRET=github_webhook_secret   # (optional, for GitHub webhook deploy)
DEPLOY_PATH=/home/username/domain.com # (optional, path for webhook deploy)
```

## 2. Model Data

- Copy `model_data.sample.txt` to `model_data.txt` in the project root.
- Edit `model_data.txt` and populate it with the data you want Gemini to use for answering questions.

## 3. SQLITE3 Database Setup

- Copy `data/usage.example.db` to `data/usage.db`.

## 4. Ready to Use

You can now use the COOU Anniversary ChatBot!

---
**Files referenced:**
- [.env.example](.env.example)
- [model_data.sample.txt](model_data.sample.txt)
- [data/usage.example.db](data/usage.example.db)