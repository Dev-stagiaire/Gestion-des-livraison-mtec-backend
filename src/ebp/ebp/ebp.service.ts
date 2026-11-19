import { Injectable, NotFoundException } from '@nestjs/common';
import { options } from 'axios';
import { DataSource } from 'typeorm';
import { CommonService } from '../../common/common.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EbpService {


    constructor(
        private readonly commonService: CommonService
    ){}

    private epbDatasource: DataSource;

    private async getEbpDatasource(): Promise<DataSource>{
        
        const ebpParametres = [
            'EBP_HOST',
            'EBP_PORT',
            'EBP_USERNAME',
            'EBP_PASSWORD',
            'EBP_DATABASE',
        ];

        const [host, port, username, password, database] = await Promise.all(
            ebpParametres.map((name) => this.commonService.getConfig(name)),
        );


        if (this.epbDatasource?.isInitialized) return this.epbDatasource;

        this.epbDatasource = new DataSource({
            type: 'mssql',
            host: host,
            port: Number(port) ?? 1433,
            username: username,
            password: password,
            database: database,
            options:{ encrypt: false, trustServerCertificate: true},
            connectionTimeout: 10000,
        });
        await this.epbDatasource.initialize();
        return this.epbDatasource;
    }

    async query<T = any>(sql: string, params: any[]): Promise<T[]>{

        const epbDatasource = await this.getEbpDatasource();
        return epbDatasource.query(sql, params);
    }

    async onModuleDestroy(){
        if (this.epbDatasource?.isInitialized) this.epbDatasource.destroy();
    }
}
