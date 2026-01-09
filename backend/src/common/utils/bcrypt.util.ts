import * as bcript from 'bcrypt';

const SALT_ROUNDS = 10;


export async function hashPassword(password:string):Promise<string> {
    return bcript.hash(password,SALT_ROUNDS);
}


export async function comparePassword(password:string, hash:string):Promise<boolean> {
    return bcript.compare(password,hash);
}