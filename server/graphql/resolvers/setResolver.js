const { Set } = require("../../models/set");

export default {
  Query: {
    getSets: async () => await Set.find({}).exec(),
    getLatestSet: async () =>
      await Set.findOne()
        .sort({ _id: -1 })
        .limit(1)
        .exec()
  },
  Mutation: {
    addSet: async (parent, args, context, info) => await Set.create(args)
  }
};
