import * as bcrypt from 'bcrypt';
import { IUser, User } from '../model/user';
import { WhereOptions } from 'sequelize';
import { Pageable, Pagination } from '../model/patination';
import { NotFoundException, CustomException } from '../exception';

/**
 * User Service for accessing the user repository
 */
export class UserService{

    constructor(){
        // DO Nothing
    }

    /**
     * Create a new user
     * @param entity User
     * @returns 
     */
    public async create(entity: IUser): Promise<User>{
        // Check whether the email has been registered already
        const found = await User.findOne({ where : {email: entity.email}});
        if(found !== null ){
            // Throw a Existing exception here if the email has been registered
            throw new CustomException(406, `Email [ ${entity.email} ] has been registered`);
        }
        // Construct the saving data here.
        const createdAt = new Date();
        const newOne = {
            email: entity.email,
            password: this.encodePwd(entity.password),
            firstName: entity.firstName,
            lastName: entity.lastName,
            activated: true,
            createdAt: createdAt,
            updatedAt: createdAt
        };
        const created: User = await User.create(newOne);
        return created;
    }

    /**
     * Update specified user
     * @param entity 
     * @returns 
     */
    public async update(entity: IUser): Promise<number>{
        const found = await User.findByPk(entity.id);
        if(!found){
            // Throw not found exception
            throw new NotFoundException(`User [ ${entity.id} ] not found`);
        }
        const updatedAt = new Date();
        const oldOne = {
            email: entity.email,
            firstName: entity.firstName,
            lastName: entity.lastName,
            activated: true,
            updatedAt: updatedAt
        };
        const result = await User.update(oldOne, {where: {id: entity.id}});
        return result[0];
    }

    public async get(id: number): Promise<User>{
        const found = await User.findByPk(id);
        if(found == null){
            // Throw not found exception
            throw new NotFoundException(`User [ ${id} ] not found`);
        }
        return found as User;
    }

    public async getByEmail(email: string): Promise<User>{
        const found = await User.findOne({where:{email: email}});
        if(found == null){
            // Throw not found exception
        }
        return found as User;
    }

    public async deleteById(id: number): Promise<number> {
        const found = await User.findByPk(id);
        if(!found){
            // Throw not found exceptoin
            throw new NotFoundException(`User [ ${id} ] not found`);
        }
        const user: User = found as User;
        await user.destroy();
        return 1;
    }

    public async paginate(conditions: Map<string, any>, pageable: Pageable): Promise<Pagination<User>> {
        const offset = (pageable.page - 1) * pageable.pageCount;
        const limit = pageable.pageCount;
        const { rows, count } = await User.findAndCountAll({where: this.genSpecification(conditions), offset, limit});
        const result: Pagination<User> = new Pagination(pageable.page, pageable.pageCount, count, rows);
        return result;
    }

    private genSpecification(conditions: Map<string, any>): WhereOptions<any>{
        let where: WhereOptions<any> = {};
        if(conditions.get("email")){
            where.email = conditions.get("email");
        }
        if(conditions.get("firstName")){
            where.firstName = conditions.get("firstName");
        }
        if(conditions.get("lastName")){
            where.firstName = conditions.get("lastName");
        }
        if(conditions.get("activated")){
            where.activated = conditions.get("activated");
        }
        console.log(where);
        return where;
    }

    /**
     * Encode the plain text with BCrypt
     * @param plainText 
     * @returns Encoded String
     */
    private encodePwd(plainText: string): string{
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(plainText, salt);
    }

}