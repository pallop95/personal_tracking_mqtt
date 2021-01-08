import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy, Client, MessagePattern, Payload, Ctx, MqttContext } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
@Injectable()
export class TestService {
    @Client({ transport: Transport.MQTT })
    private client: ClientProxy;

    private host = 'localhost';
    private port = 1883;
    private username = 'admin';
    private password = 'password';

    async onApplicationBootstrap() {
        // await this.client.connect();
        Logger.log("Connecting");

        this.client = ClientProxyFactory.create({
            transport: Transport.MQTT,
            options: {
                host: this.host,
                port: this.port,
                username: this.username,
                password: this.password
            }
        });

        await this.client.connect();
        Logger.log("Connected");
    }
    // public async onModuleInit(): Promise<void> {
    //     Logger.log("Connecting");

    //     this.client = ClientProxyFactory.create({
    //         transport: Transport.MQTT,
    //         options: {
    //             host: this.host,
    //             port: this.port,
    //             username: this.username,
    //             password: this.password
    //         }
    //     });

    //     await this.client.connect();
    //     Logger.log("Connected");
    // }

    public sendMessage(data: string): Observable<string> {
    // public sendMessage(data: string): Promise<string> {
        // const pattern = { cmd: "sum" };
        // const data: number[] = [5, 6];
        // return this.client.send<number>(pattern, data);

        // const pattern = { cmd: "test" };
        const pattern = "marker/workers";
        // const data = "1 Down, 4 to go";
        // console.log('data', data)
        return this.client.emit<string>(pattern, data);
        // return this.client.send<string>(pattern, data)
        //     .pipe(timeout(5000))
        //     .toPromise();
    }

    @MessagePattern('notifications')
    getNotifications(@Payload() data: number[], @Ctx() context: MqttContext) {
        console.log(context);
        console.log(`Topic: ${context.getTopic()}`);
        const packet = context.getPacket();

        // convert Buffer to Object
        const obj = JSON.parse(packet.payload.toString());
        console.log(obj);

        // convert Buffer to String
        // const str = packet.payload.toString();
        // console.log(str);
    }
}
