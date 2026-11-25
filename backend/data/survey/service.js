function SurveyService(SurveyModel) {
  let service = {
    create,
    findAll,
  };

  function create(survey) {
    let newSurvey = SurveyModel(survey);
    return save(newSurvey);
  }

  function save(model) {
    return new Promise(function (resolve, reject) {
      model.save(function (err) {
        if (err) reject("Could not save the survey response");

        resolve({
          message: "Survey Created",
          survey: model,
        });
      });
    });
  }

  function findAll(pagination) {
    const { limit, skip } = pagination;

    return new Promise(function (resolve, reject) {
      SurveyModel.find({}, {}, { skip, limit }, function (err, surveys) {
        if (err) reject(err);

        resolve(surveys);
      });
    }).then(async (surveys) => {
      const total = await SurveyModel.count();

      return Promise.resolve({
        data: surveys,
        pagination: {
          pageSize: limit,
          page: Math.floor(skip / limit),
          hasMore: skip + limit < total,
          total: total,
        },
      });
    });
  }

  return service;
}

module.exports = SurveyService;