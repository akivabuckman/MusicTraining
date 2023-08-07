import db from "../config/Database"


const register = (username, password) => {
  return db('users')
  .insert({username,password})
  .returning('*')
}

const login = (username) => {
  return db('users')
  .select('id','username','password')
  .where({username})
}

module.exports = {
  register,
  login
}
