import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import configuration, { IDatebaseConfig } from '../config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { host, port, name } = configService.get<IDatebaseConfig>('db');
        return {
          uri: `mongodb://${host}:${port}/${name}`,
        };
      },
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: '4h',
          },
          verifyOptions: {
            ignoreExpiration: false,
          },
        };
      },
    }),
  ],
  exports: [ConfigModule, MongooseModule, JwtModule],
})
export class CoreModule {}
