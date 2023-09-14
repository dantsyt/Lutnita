const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://dantsyt:a80FKUYCEoWXeVFA@cluster0.49kxau7.mongodb.net/lutnita?retryWrites=true&w=majority')

