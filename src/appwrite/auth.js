import { Account, ID, Client } from 'appwrite'
import conf from '../conf/conf'

export class AuthService {

    client = new Client();
    account;

    constructor() {

        this.client = new Client().setProject(conf.appWriteProjectId).setEndpoint(conf.appWriteUrl)

        this.account = new Account(this.client)
    }


    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create(ID.unique, email, password, name)
            if(user){
                return this.login({email,password})
            } else {
                return  user;
             }
        } catch (error) {
            throw error
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch(error){
            throw error
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions()
        }catch(error){

        }
    }

}

export const authService = new AuthService()

export default authService