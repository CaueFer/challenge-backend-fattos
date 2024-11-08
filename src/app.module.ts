import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TaskModule } from "./tarefa/task.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        type: "postgres",
        url: process.env.POSTGRESQL_URL,
        schema: "fattostest",

        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: true,
        },
      }),
      inject: [ConfigService],
    }),
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}