import { asyncQuery } from "./db";

type Order = {
  email: string
  fullName: string
  address: string,
  imageUrls: string[]
  frameColor: string
  user: string
}

export const createOrder = async (order: Order) => {
  await asyncQuery(
    'INSERT INTO orders(email, full_name, address, image_urls, frame_color, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [order.email, order.fullName, order.address, order.imageUrls, order.frameColor, order.user],
  )
}

export const getOrders = async (user: string) => {
  const result = await asyncQuery(
    'SELECT * FROM orders WHERE user_id = $1',
    [user],
  )
  return result.rows
}