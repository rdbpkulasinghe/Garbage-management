import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { ArticleController } from './controllers/article.controller';
import { ArticleService } from './services/article.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'garbadge_dev',
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      logging: false,
    }),
    JwtModule.register({
      secret: 'pharmacy',
      signOptions: { expiresIn: '900s' },
    }),
  ],

  controllers: [
    AppController,
    UserController,
    AuthController,
    OrderController,
    ArticleController
  ],

  providers: [
    AppService,
    UserService,
    AuthService,
    OrderService,   
    ArticleService
  ],
})

export class AppModule {}
