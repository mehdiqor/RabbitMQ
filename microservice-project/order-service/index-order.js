const { createOrderWithQueue } = require("./config/rabbitMQ");
require("./config/mongoose.config");
createOrderWithQueue("ORDER");