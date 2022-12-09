const aggregationStages = (managerId) => [
    {
        '$match': managerId ? {managerId} : {}
    },
    {
        '$unwind': {
            path: '$customerData'
        }
    },
    {
        '$match': {
            'customerData.churnRisk': {
                '$gt': 1
            },
            'customerData.openSales': {
                '$gt': 5
            }
        }
    },
    {
        '$group': {
            _id: 'data',
            customerData: {
                '$push': '$customerData'
            }
        }
    }
];

const resolvers = {
    Query: {
        managerData: async (parent, args, context) => {
            const data = await context.Manager.aggregate(aggregationStages(args.managerId));
            return data[0].customerData;


        },
        superManagerData: async (parent, args, context) => {
            const data = await context.Manager.aggregate(aggregationStages());
            return  data[0].customerData;
        }
    },
};


module.exports = resolvers