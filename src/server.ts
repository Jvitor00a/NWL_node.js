//#region IMPORTS
import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors' 
import { 
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
    jsonSchemaTransform
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { subscribeToEventRoute } from './routes/subscribe'
import { env } from './env'
//#endregion

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

//#region Register
app.register(fastifyCors)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'NWL connect',
            version: '0.0.1'
        }
    },
    transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
})

app.register(subscribeToEventRoute)
//#endregion


app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP server running')
})