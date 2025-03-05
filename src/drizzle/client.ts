import postgres from 'postgres'
import { drizzle  } from 'drizzle-orm/postgres-js'
import { subscriptions } from './schema/subscriptions'
import { env } from '../env'

export const pg = postgres(env.POSTGRES_URL)
export const db = drizzle(pg, {
    schema:{
        subscriptions,
    }
})

