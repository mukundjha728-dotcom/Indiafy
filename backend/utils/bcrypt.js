import bcrypt from "bcrypt";

const salt = 15;

export const passwordEncryption = async (password) =>{
    try{
        const encryptPassword = await bcrypt.hash(password, salt);

        return {
            "flag":true,
            "password": encryptPassword
        }
    }
    catch(err){
        return {
            "flag": false,
            "message":err.message
        }
    }
}

export const passwordDecryption = async (password, hashPassword) => {
    try{
        const decryptPassword = await bcrypt.compare(password, hashPassword);

        return {
            "flag":true,
            "password": decryptPassword
        }
    }
    catch(err){
        return {
            "flag": false,
            "message": err.message
        }
    }
}