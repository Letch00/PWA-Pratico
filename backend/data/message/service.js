function MessageService(MessageModel) {
  let service = {
    create,
    findBySession,
  };

  function create(message) {
    let newMessage = MessageModel(message);
    return save(newMessage);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Could not send the message");

        resolve({
          message: "Message Sent",
          data: model,
        });
      });
    });
  }

  // chat history of one session (oldest first)
  function findBySession(session) {
    return new Promise(function (resolve, reject) {
      MessageModel.find({ session }, {}, { sort: { createdAt: 1 } }, function (err, messages) {
        if (err) reject("Could not load the messages");

        resolve(messages);
      });
    });
  }

  return service;
}

module.exports = MessageService;