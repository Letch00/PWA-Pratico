function RoomService(RoomModel) {
    let service = {
        create,
        findAll,
        find,
    };

    function create(room) {
        let newRoom = RoomModel(room);
        return save(newRoom);
    }

    function save(model) {
        return new Promise(function (resolve, reject) {
            model.save(function (err) {
                if (err) reject("Could not create the room");
                resolve({
                    message: "Room Created",
                    room: model,
                });
            });
        });
    }

    function findAll(pagination) {
        const { limit, skip } = pagination;

        return new Promise(function (resolve, reject) {
            RoomModel.find({}, {}, { skip, limit }, function (err, rooms) {
                if (err) reject(err);

                resolve(rooms);
            });
        }).then(async (rooms) => {
            const total = await RoomModel.count();

            return Promise.resolve({
                data: rooms,
                pagination: {
                    pageSize: limit,
                    page: Math.floor(skip / limit),
                    hasMore: skip + limit < total,
                    total: total,
                },
            });
        });
    }

    function find(id) {
        return new Promise(function (resolve, reject) {
            RoomModel.findById(id, function (err, room) {
                if (err) reject(err);

                resolve(room);
            });
        });
    }

    return service;
}

module.exports = RoomService;