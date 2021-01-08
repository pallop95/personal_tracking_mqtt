import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, Ctx, MessagePattern, MqttContext, Payload } from '@nestjs/microservices';
import { TestService } from './test.service';
// import { timeout } from 'rxjs/operators'
@Controller('test')
export class TestController {
    constructor(
        // @Inject('MATH_SERVICE') private client: ClientProxy,
        private testService: TestService
    ) {
        // this.client.connect();
    }

    @Get()
    testPub() {
        const lats = [14.67911, 14.6792, 14.678173, 14.679, 14.680]
        const longs = [100.852002, 100.851702, 100.8513002, 100.851002, 100.851102]
        const obs_markers = [
            {
               "position":{
                  "lat":14.678173,
                  "lng":100.851002,
                  "acc":69
               },
               "infoText":"XYZ00012_B : Unknown<br>1064.96 m<br>25/06/2020, 14:38:33",
               "user": "XYZ00012_B"
            },
            {
               "position":{
                  "lat":14.675803,
                  "lng":100.851278,
                  "acc":1
               },
               "infoText":"XYZ00013_B : Unknown<br>1255.94 m<br>25/06/2020, 11:43:24",
               "user": "XYZ00013_B"
            },
            {
                "position":{
                   "lat":14.675803,
                   "lng":100.851278,
                   "acc":1
                },
                "infoText":"XYZ00014_B : Unknown<br>1255.94 m<br>25/06/2020, 11:43:24",
                "user": "XYZ00014_B"
             },
             {
                "position":{
                   "lat":14.675803,
                   "lng":100.851278,
                   "acc":1
                },
                "infoText":"XYZ00015_B : Unknown<br>1255.94 m<br>25/06/2020, 11:43:24",
                "user": "XYZ00015_B"
             },
             {
                "position":{
                   "lat":14.675803,
                   "lng":100.851278,
                   "acc":1
                },
                "infoText":"XYZ00016_B : Unknown<br>1255.94 m<br>25/06/2020, 11:43:24",
                "user": "XYZ00016_B"
             }
        ];
        const interval = 0.5 * 1000; // 10 seconds;

        for (let i = 0; i <= 1000-1; i++) {
            setTimeout(
                // function (i) {
                //     var url = 'www.myurl.com='+TheUrl[i];
                //     request(url, function(error, resp, body) { 
                //         if (error) return callback(error); 
                //         var $ = cheerio.load(body);
                //         //Some calculations again...
                //         callback();
                //     });
                // },
                () => {
                    // for (let j = 0; j < obs_markers.length; j++) {
                    //     obs_markers[j].position.lat = lats[this.getRandomInt(5)]
                    //     obs_markers[j].position.lng = longs[this.getRandomInt(5)]
                    // }
                    // this.testService.sendMessage(JSON.stringify(obs_markers))

                    const obs_marker = obs_markers[this.getRandomInt(obs_markers.length)]
                    // console.log('before', obs_marker)
                    obs_marker.position.lat = lats[this.getRandomInt(lats.length)]
                    obs_marker.position.lng = longs[this.getRandomInt(longs.length)]
                    console.log('after', obs_marker)
                    console.log(JSON.stringify(obs_marker))
                    this.testService.sendMessage(JSON.stringify(obs_marker))
                },  
                interval * i, i
            )
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}
