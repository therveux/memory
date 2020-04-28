const { Card } = require('../../models/card')

export default {
    Query: {
        getCards: async () => await Card.find({}).exec(),
        getCardBySet: async (parent, args, context, info) =>
            await Card.find({ set: args.set }).exec()
    },
    Mutation: {
        addCard: async () => {}
    }
}