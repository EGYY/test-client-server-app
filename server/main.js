const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./schema/schema')

const app = express()
app.use(cors())
const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://PUCHENEG:250298qa@cluster0.r6b9z.mongodb.net/TestGraphQL?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.use('/graphql', graphqlHTTP({
            schema,
            graphiql: true
        }))

        app.listen(3000, (e) => {
            e ? console.log('server error', e) : console.log('Server has been started...')

        })
    } catch (e) {
        console.log('db connection failed',e)
    }

}


start()