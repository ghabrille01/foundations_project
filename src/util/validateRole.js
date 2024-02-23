function validateRole(user, role) {
  if (!user || user != role) {
    return false;
  }
  return true;
}

module.exports = { validateRole };
