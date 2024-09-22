1. Clone project
2. Run `yarn` to install packages
3. Set postgres connection sting values in .env file:
   `
    PG_USER=
    PG_HOST=
    PG_DATABASE=
    PG_PASSWORD=
    PG_PORT=5432
   `
4. Create orders table in DB:
   `
    CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        email TEXT,
        full_name TEXT,
        address TEXT,
        image_urls TEXT[],
        frame_color TEXT,
        user_id TEXT
    )
   `
5. Run `yarn dev` to run service, it will run on http://localhost:3000
6. GET /photos?q=QUERY&limit=10 endpoint for first task
7. POST /order with a json in body: (second task)
   `type Order = {
      email: string
      fullName: string
      address: string,
      imageUrls: string[]
      frameColor: string
      user: string
    }`

    `curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{ "email": "XXXX",
  "fullName": "XXXX",
  "address": "XXXX",
  "imageUrls": [],
  "frameColor": "",
  "user": "XXXX"
}'`
8. GET /order?user=THEUSER for third task `curl --location 'http://localhost:3000/order?user=XXXXX'`