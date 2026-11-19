import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuration } from './entities/configuration.entity';
import { Repository } from 'typeorm';
import { ConfigurationDto } from './dto/configurationDto.dto';
import { Generic } from '../generic/generic.service';

@Injectable()
export class CommonService {

    constructor(

        @InjectRepository(Configuration)
        private readonly configRepository: Repository<Configuration>,
        private readonly generic: Generic
    ){}

      async findConfigById(id: number): Promise<Configuration | null>{
        try {
          return await this.configRepository.findOne({
            where: {id: id}
          });
          
        } catch (error) {
          throw new NotFoundException("Configuration introuvable");
        }
      }

    async findConfigByName(name: string): Promise<Configuration | null>{

          try {
          return await this.configRepository.findOne({
            where: {name}
          });
          
        } catch (error) {
          throw new NotFoundException("Configuration introuvable");
        }
    }

    async getConfig(name: string): Promise<string>{
            
        const config = await this.findConfigByName(name);
        if (!config) {
            throw new NotFoundException(`Paramètre ${name} introuvable en base`);
        }
        return config.value;
    }

    async updateConfig(id: number, configDto: ConfigurationDto): Promise<Configuration>{

        let config = await this.findConfigById(id);
        if (!config) {
          throw new NotFoundException("Configuration introuvable"); 
        } 

        config = await this.generic.transfert(config, configDto);

        return await this.configRepository.save(config);
    }
}
