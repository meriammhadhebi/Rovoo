const roles = ['client', 'admin', 'guest', 'driver'];

const roleRights = new Map();
roleRights.set(roles[0], []);
roleRights.set(roles[1], ['getUsers', 'manageUsers']);
roleRights.set(roles[2], []);
roleRights.set(roles[3], ['manageUsers']);
roleRights.set(roles[4], ['manageUsers']);

module.exports = {
  roles,
  roleRights,
};
