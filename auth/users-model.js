const db = require("../database/dbConfig")
const bcrypt = require("bcryptjs")

module.exports = {
    findAll,
    findByFilter,
    findById,
    createUser, 
    delUser,
}

function findAll(){
    return db("users").select("username")
}

function findByFilter(filter){
    return db("users").where(filter)
}

function findById(id) {
    return db("users").where("id", id).first()
}

async function createUser(payload) {
    payload.password = await bcrypt.hash(payload.password, 12)
    return db("users").insert(payload)
}

function delUser(id){
    return db("users").where("id", id).del()
}