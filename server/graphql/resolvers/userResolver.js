const { User } = require('../../models/user')

export default {
    Query: {
        getUser: async (parent, args, context, info) =>
            await User.findOne({ email: args.email }).exec(),
    }
}