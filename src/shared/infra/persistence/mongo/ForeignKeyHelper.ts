async function ForeignKeyHelper(model: any, where = {}) {
  return new Promise((resolve, reject) => {
    model.findOne(where, (err: any, result: any) => {
      if (result) {
        return resolve(true);
      } else return reject(new Error(`ForeignKey Constraint failed`));
    });
  });
}

export default ForeignKeyHelper;
