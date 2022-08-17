import { v4 as uuidv4 } from 'uuid'

// 该函数要生成一个随机的字符串(uuid)，并且每次执行生成的都是这个字符串
export const getUUID = () => {
    // 先从本地存储看一下是否已经存在uuid，存在则获取存储的uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    // 如果没有，则生成uuid
    if(!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    return uuid_token
}