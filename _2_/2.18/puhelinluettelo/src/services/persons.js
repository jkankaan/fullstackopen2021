import axios from 'axios'
const baseUrl = 'http://localhost:3002/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = nameAndNumberObject => {
    return axios.post(baseUrl, nameAndNumberObject)
}

const deleteFunction = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const modify = (id, nameAndNumberObject) => {
    return axios.put(`${baseUrl}/${id}`, nameAndNumberObject)
}

const functions = {
    getAll,
    create,
    deleteFunction,
    modify
}

export default functions