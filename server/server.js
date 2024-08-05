import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

fastify.register(import("@fastify/mongodb"), {
  url: "mongodb://localhost:27017/taskmanager",
});

fastify.register(import("@fastify/cors"), {
  origin: true,
});

fastify.route({
  method: "POST",
  url: "/tasks",
  handler: async (request, reply) => {
    const { title, description } = request.body;
    const collection = fastify.mongo.db.collection("tasks");
    const result = await collection.insertOne({ title, description });
    if (result.acknowledged) {
      const sendLatest = await collection.findOne({ _id: result.insertedId });
      return reply.send(sendLatest);
    } else {
      reply.send({ acknowledged: false });
    }
  },
});

fastify.route({
  method: "GET",
  url: "/tasks",
  handler: async (request, reply) => {
    const collection = fastify.mongo.db.collection("tasks");
    const tasks = await collection.find().toArray();
    reply.send(tasks);
  },
});

fastify.route({
  method: "PUT",
  url: "/tasks/:id",
  handler: async (request, reply) => {
    const { id } = request.params;
    const { title, description } = request.body;
    const collection = fastify.mongo.db.collection("tasks");
    await collection.updateOne(
      { _id: new fastify.mongo.ObjectId(id) },
      { $set: { title, description } }
    );
    const updatedTask = await collection.findOne({
      _id: new fastify.mongo.ObjectId(id),
    });
    reply.send(updatedTask);
  },
});

fastify.route({
  method: "DELETE",
  url: "/tasks/:id",
  handler: async (request, reply) => {
    const { id } = request.params;
    const collection = fastify.mongo.db.collection("tasks");
    await collection.deleteOne({ _id: new fastify.mongo.ObjectId(id) });
    reply.send({ success: true });
  },
});

async function start() {
  try {
    await fastify.listen({ port: 8080 });
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
  }
}

start();
