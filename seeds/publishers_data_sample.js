
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('publishers').del()
    .then(function () {
      // Inserts seed entries
      return knex('publishers').insert([
        {id: 1, name: 'Kim Dong', address: 'HN', phone:'0189'},
        {id: 2, name: 'hai Tien', address: 'HN', phone:'0189'},
        {id: 3, name: 'Nam Ha', address: 'HN', phone:'0189'}
      ]);
    });
};
