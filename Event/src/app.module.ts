import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [EventModule,TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'mydatabase',//Change to your database name
      autoLoadEntities: true,
      synchronize: true,

    } ),
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
