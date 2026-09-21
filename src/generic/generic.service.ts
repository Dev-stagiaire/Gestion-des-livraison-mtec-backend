import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Column, DataSource, EntityTarget, FindOptionsRelations, FindOptionsWhere, ILike, Like, ObjectLiteral, Repository, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { randomInt } from "crypto";
import { AppService } from "src/app.service";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UserResponseDto } from "src/auth/dto/user-response.dto";
import { AppDataSource } from "src/database/data.source";

@Injectable()
export class Generic{

    async createAfterCheck<T extends ObjectLiteral, K extends keyof T>(
        dataSource: DataSource, entity: EntityTarget<T>, key: K, values: T[K][] 
    ): Promise<T[]>{

        const logger = new Logger(AppService.name);
        let results: T[] = [];

        const entityRepository = dataSource.getRepository(entity);

        if (!entityRepository) {
            throw new Error("la repository n est pas creer !");
        }

        for(const value of values){

            const where = {
                [key]: value,
            } as FindOptionsWhere<T>;

            const exists = await entityRepository.findOne({
                where,
            })

            if (!exists) {
                results.push(await entityRepository.save({
                    [key]: value,
                } as T))
            }
        }
        return results;
     
    }

    async hasher(toHash: string): Promise<string>{
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(toHash, salt);
    }

    public generateOtp(): string {
      const otp = randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
      return otp;
    }

    async validatePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    async genericSearch<T extends ObjectLiteral, K extends keyof T>(search_term: string,
        paginationDto: PaginationDto,
        repository: Repository<T>,
        relations: FindOptionsRelations<T>,
        keys: K[], filter_where_clause: FindOptionsWhere<T>): Promise<{}>{

        let where: FindOptionsWhere<T>[] = [];
        if (keys.length > 1) {
            for(const key of keys){
                if (String(key).includes("id")) {
                    where.push({
                        [key]: Number(search_term),
                    } as FindOptionsWhere<T>)
                }
                else{
                    where.push({
                        [key]: ILike(`%${search_term}%`)
                    } as FindOptionsWhere<T>)
                }
            } 
        }
        else{

            if (String(keys[0]).includes("id")) {
            where.push({
                [keys[0]]: Number(search_term),
            } as FindOptionsWhere<T>)
            }
            else{
                where.push({
                    [keys[0]]: ILike(`%${search_term}%`)
                } as FindOptionsWhere<T>)
            }
        } 
        
        if (filter_where_clause) {
            where = where.map(item => Object.assign({}, item, filter_where_clause));
        }

        const [users, count] = await repository.findAndCount({
            where: where,
            take: paginationDto.limit,
            skip: paginationDto.offset,
            relations: relations,
        })
        const results = users.map((user) => {
            let userResponseDto = new UserResponseDto();
            return this.transfert(userResponseDto, user);
        });
        return{
        results: results,
        count: count,
        }
    }


    async genericFindAll<T extends ObjectLiteral, D extends ObjectLiteral>(
        paginationDto: PaginationDto,
        repository: Repository<T>,
        relations: FindOptionsRelations<T>,
        responseDto?: D,): Promise<{}> {

        const [data, total] = await repository.findAndCount({
            relations,
            take: paginationDto.limit,
            skip: paginationDto.offset,
        });
        const results = data.map((item) => {
            if (responseDto) {
                return this.transfert(responseDto, item);
            }
            return item;
               
        });
        return{
            data: results,
            count: total,
        }
    }

    transfert<T extends Object, D extends Object>(source: T, dto: D): T{
        

        const source_keys = Object.keys(source) as (keyof T)[] ;
        const dto_keys = Object.keys(dto);
        for(const dto_key of dto_keys){
            for(const source_key of source_keys){
                if (dto_key == source_key) {
                    source[dto_key] = dto[dto_key];
                }
            }
        }
        return source;
    }

    async throwUniqueConstraint<T extends ObjectLiteral>(repository: Repository<T>){

        await AppDataSource.initialize();
        const metadata = repository.metadata;
        const uniqueColumns = metadata.uniques.flatMap(unique => unique.columns).map(column => column.propertyName);
        return uniqueColumns;
    }

    mapToEntites<T extends ObjectLiteral>(data: any[], Class: new () => T): T[] {

        return data.map((item) => {

            const object = new Class();
            Object.assign(object, item)
            return object;
            
        });
    }

}