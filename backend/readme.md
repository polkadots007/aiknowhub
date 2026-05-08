# 1. Create backend folder

From your project root:

```bash id="z2u2xw"
mkdir server
cd server
```

---

# 2. Initialize Node project

```bash id="c0r7jj"
npm init -y
```

Creates:

```txt id="wrt6ri"
package.json
```

---

# 3. Install dependencies

### Express + CORS + dotenv

```bash id="m4y3ba"
npm install express cors dotenv
```

---

# 4. Install dev dependencies

```bash id="h11qsa"
npm install -D typescript tsx @types/node @types/express @types/cors
```

---

# 5. Create TypeScript config

```bash id="o2kt9e"
npx tsc --init
```

---

# 6. Clean tsconfig minimally

Inside `tsconfig.json`:

```json id="5d9hzy"
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true
  }
}
```

---

# 7. Create source folder

```bash id="bd5y7s"
mkdir src
```

---

# 8. Create entry file

```bash id="trph2k"
touch src/index.ts
```

---

# 9. Minimal Express server

Inside `src/index.ts`:

```ts id="6j5rxr"
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Server running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# 10. Add scripts

Inside `package.json`:

```json id="upbzyw"
"scripts": {
  "dev": "tsx watch src/index.ts"
}
```

---

# 11. Start server

```bash id="7svxl5"
npm run dev
```

---

# 12. Test in browser

Open:

```txt id="pkes1f"
http://localhost:3000
```

Should show:

```txt id="6it6wj"
Server running
```

---

# 13. Create `.env`

```bash id="83mcds"
touch .env
```

Later:

```env id="jqqmng"
GEMINI_API_KEY=your_key_here
```

---

# 14. Add `.gitignore`

```txt id="2pv41h"
node_modules
.env
```

---

# Recommended structure later

```txt id="pn6mfd"
server/
 ├── src/
 │    ├── routes/
 │    ├── controllers/
 │    ├── services/
 │    └── index.ts
 ├── .env
 ├── package.json
 └── tsconfig.json
```

---

# Next step after setup

You’ll then create:

```txt id="d2jewq"
POST /generate-title
```

and connect Gemini/OpenAI to it.
