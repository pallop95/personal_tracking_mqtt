import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
          username: 'admin',
          password: 'password'
        }
      },
    ]),
  ],
  controllers: [TestController],
  providers: [TestService]
})
export class TestModule {}
