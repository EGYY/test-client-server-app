const graphql = require('graphql')

const Movies = require('../models/Movies')
const Directors = require('../models/Directors')

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt} = graphql

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        raiting: {type: GraphQLInt},
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Directors.findById(parent.dirId)
            }
        }
    })
})


const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({dirId: parent.id})
            }
        }
    })
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Movies.findById(args.id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Directors.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve() {
                return Movies.find({})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve() {
                return Directors.find({})
            }
        }
    }

})

module.exports = new GraphQLSchema({
    query: Query
})
