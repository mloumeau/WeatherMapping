// ArcGIS libraries use AMD format.  To use the libraries, 
// we specify a list of modules (e.g. Map, MapView) in a list
// with the require.  The second parameter defines a function
// that will use these modules.  We specify the module names
// in order in the function parameter list.  When this javascript
// file is loaded by the html, it will run this function using these
// modules.

// Read more here: https://dojotoolkit.org/documentation/tutorials/1.10/modules/index.html

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"	
  ], function(Map, MapView, Graphic, GraphicsLayer) {

        // Create a basemap for the map view
        var map = new Map({
            basemap: "topo-vector"
        });

        // Create a map view for the HTML centered at center of America
        // (Long = -97.6114, Lat = 38.8403) using the basemap
        // previously created.
        var view = new MapView({
            container: "viewDiv",  // Where in the html to put this 
            map: map,              // The basemap we created above
            center: [-97.6114, 38.8403], // Center of America longitude, latitude
            zoom: 5                // zoom in level
        });

        // Create a Graphics Layer which can be used to draw graphics
        // on the map
        var graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);        

        // We will use the XMLHttpRequest object to read data from the USGS
        // server and populate graphics on our map based on the results
        // https://www.w3schools.com/js/js_ajax_http.asp


        city_IDs = ["5128581,5368361,4887398,4699066,4560349,5308655,4726206,5391811,4684904,5392171,4671654,4259418,4160021,5391959,4509177,4460243,4691930,4990729,5521001,4641239",
        "5809844,5419384,5815135,4930956,4347778,4544349,5746545,5506956,5263058,5454711,5318313,5350964,5389519,5367929,4393217,5304391,4791259,4180439,5417598,5074472",    
        "4487042,4164138,5004223,5037649,4553440,5150529,4281730,4671240,4335045,5325738,4174757,5856195,5412347,5323810,5392900,4407066,5387890,4683416,4297999,5206379",        
        "5879400,5399020,4508722,5045360,2510407,4469146,5101798,4719457,5505411,5072006,5110629,5099836,5336899,4920423,4167147,498817,5289282,4705349,4945455,4464374",        
        "4074277,5525584,5359777,4499612,5295985,4693003,4158476,5511077,4752186,5295903,4315588,4700168,5313457,5509403,5350734,5515613,4781708,5391726,4049979,5811704",        
        "5134086,4853828,5373900,4466033,5812944,5380184,5349755,4509177,4362716,5374732,4341513,5412347,5145215,5145476,5358705,4119403,5516233,5295985,4076607,4994358",        
        "5780993,4174715,4068590,4694482,4634946,4956199,4776024,4676740,4276873,5393049,5224151,5351515,4612862,5378771,5733351,4155966,1687894,5385955,4171260,5317058",        
        "5379439,6173331,4149962,5231851,4409896,4905697,4168139,5346111,1257629,5197085,5339631,5725846,5380698,5391295,4409896,4717782,5577147,5355933,5384170,4459467",        
        "4907959,361058,5346827,4710178,4393217,4898015,5400075,5403022,5282804,5427946,5357527,5102466,4903279,2523082,4710826,4509884,4221552,4613868,5379524,4717782",        
        "5351247,4703223,4692559,4762894,4709796,4527624,5786882,5784607,4575352,4276614,5011148,4839373,4164601,4739526,5402405,4850751,4574324,5406567,4280539,5097598",        
        "4156404,5441492,5388881,4679195,4151909,4843564,5396003,5339111,4835806,3333158,4330160,5526337,5316428,4685912,5406222,4257227,3537906,4669635,5405380,5178127",        
        "4543762,4672989,4391812,4644312,4984247,4409896,5327684,4905697,5780026,5345743,4575352,4998830,5059163,5343858,5339840,4499379,5412199,5359488,4164167,5334223",        
        "5443910,5134086,698740,2643123,4890864,5784549,4724129,4151316,4845193,5729485,4834162,5640350,4942618,5435464,4471025,5407933,4781708,5375911,5913695,323779",        
        "5401395,5377995,5416541,5793933,4167499,4741752,5254962,5341430,5331835,4722625,4169014,4589387,4531405,5574999,4177887,3450083,5345529,4853423,5387288,5475352",        
        "5392427,4706057,4926563,4161438,5116642,4738214,4718097,4682464,5258396,4221333,5338122,4992982,4782167,5106841,5373492,5339066,5530022,5731371,4540737,5808189",        
        "5406602,4152820,5577592,5373763,2639996,4990510,5397603,4094455,4999837,4945121,5405228,4931429,4219934,5713376,4948247,5512862,5816597,4394870,5794245,5334519",        
        "5393212,5356576,4917555,5487811,5322053,5443910,5779334,4942807,5570160,5811729,4164143,4705692,4274277,5392967,4168782,5781061,4174402,4243719,5579276,4148411",        
        "5392368,4469160,4915734,4936159,5336269,4945283,5392263,2639577,5377995,4111410,5376890,4453066,5090046,4535740,5409059,5601933,5018739,4153146,5355828,5024719",        
        "4255466,5140076,5096699,5337561,5367440,5403191,5323060,5799841,5105496,5779206,4067994,4888015,4257494,4734825,4832353,5600685,5359446,5339111,5372205,4887163",        
        "5331575,5012639,4401242,6331909,5786899,6544261,5018739,4876523,5225507,5356277,4707814,4992523,5713587,5427946,5372259,4711725,5336537,5386834,2650225,5221659",        
        "3171457,5128549,5364514,5376101,4921100,4466033,5018739,5552301,4951257,4167538,4677008,4920607,4161580,5019335,5404119,5268253,4153071,4771075,5375480,5740099",        
        "4274277,5327422,4163971,4407010,4501019,6156608,5799610,5325866,5336545,5322745,5106841,4883555,5211303,4891382,4997791,4672731,5404915,4132093,3405870,4910713",        
        "4588165,5785965,4236895,5392593,5383777,5843591,4330236,4947607,4885265,4718721,5244080,4467732,5349705,5010636,5007402,4839292,5296266,1809858,4229476,5404554",        
        "5382146,5370164,4862034,4116834,4499379,5369367,5579368,5223869,4148677,5278054,4428667,5324363,5102445,5768233,5777107,4330160,5404024,4924006,4735966,4711801",        
        "5386754,3836277,4161625,5373327,4905211,5666648,4593142,4160021,4512214,5294810,4691585,4178003,6176823,5404554,5127835,4155995,4059102,5385941,5386785,5733351",        
        "4167895,4406831,5251436,4715292,5688025,5410902,4329753,5406990,4355594,5265838,5383465,5380748,4317639,5746545,4160983,5773664,5397765,5333180,4124112,5136456",        
        "4355843,4696233,4882396,5024825,5411015,5036493,5177568,4911600,4160983,4633419,1819729,5391791,3034473,5364329,5097441,4279253,4159050,4367175,4153132,5257754",        
        "4106458,5382496,5161272,5374322,5367565,4714131,5802570,4174738,5369578,4682991,3904906,5025219,5821086,4152872,4179574,4513583,4954380,5022025,4939085,4852832",        
        "4735729,5142056,4846834,5363922,5346646,4285268,5019767,4469160,4881346,4679867,5403789,5374406,4504621,4265737,4166232,2643097,5278420,4931378,5782476,4942939",        
        "4838524,5018651,2179537,5341145,4409896,4549638,5014051,5351549,5006166,5376200,5423573,5388319,4460162,5820705,5415035,5382232,5781770,4409896,5655240,5197085",        
        "4166274,5427946,4207783,3836669,5007804,4889772,5358736,5363990,4904937,5785965,5034059,4303436,4542975,4160610,5596475,4854534,4604183,4724194,5004062,5144336",        
        "5324477,5808079,5364499,4166673,4913723,4169156,5740099,4904365,4488762,4922388,4151455,4675805,4884597,4542765,5350207,5287262,4990512,5410430,4924198,4228147",        
        "5342992,5125771,5393429,2636177,4172086,4515843,6087430,4236895,4933002,4569313,2643044,5120478,5720727,5387877,5384471,4845419,5110077,5381110,5059430,1735106",        
        "4406835,5810301,4903024,5355180,4903780,5388867,5777224,5604045,5356868,5378044,1801722,5501344,5392368,4628735,5153207,4832294,4718711,4580575,5786882,4916288",        
        "4223379,4172139,4377664,5338783,4689550,5416329,5335006,4634662,5301388,4168228,5099133,5411046,5407529,5168041,5342485,4896075,4386802,3171058,5106292,5344157",        
        "4904381,4946863,5102578,4985153,4148708,5352214,4838652,5106841,4846960,5258957,4500994,4685524,4763231,5037784,4919988,5427946,5352439,4446675,4574324,4392768",        
        "4535961,4167519,4419500,5102720,5069297,5380626,4472370,5756758,4274356,5007996,4998018,4153471,5324363,4694568,5323163,5809402,5288636,4168630,5012639,5408211",        
        "5788516,5417737,5127305,5335663,4890119,4151871,4668271,6087892,5384690,5025264,5151613,5386082,5192726,4809537,5364007,5341256,5587698,5777544,4692856,5272899",        
        "4518264,5778755,4219934,4717644,2656046,4991640,4943828,5340175,361058,5805687,5153420,4923670,4278890,5325423,5101798,4752255,4769125,4192375,4429295,5388881",        
        "4148533,5167284,5029877,4614748,4518264,4552215,5221931,4274277,5278159,5162645,5335650,4679803,2643097,5109177,5589173,5392329,5690532,5380668,4126226,4736134",        
        "4597919,5610815,4259671,5392090,4074277,5178195,4509177,4506008,4146166,4891010,5303752,5467328,4893886,4833320,5774001,5072006,5314328,5800112,4418478,5173237",        
        "4743275,5104404,4474040,4752031,5429032,4175437,5098706,5101798,4947459,5220355,4900373,4929399,4191014,4747845,5344157,4695912,5367788,5345609,4755280,4392388",        
        "6332309,4166638,4166233,5117949,4902476,5338166,4156018,4223379,5771826,5253352,5793933,4755280,4702828,5897885,5327319,5150529,4166222,4834162,1257629,5386035",        
        "5391749,5339111,4500994,4452808,5526337,4145941,4273299,4885955,4879890,5213681,4914570,5102720,4771401,4604183,5099967,5307540,5153924,5388564,4955190,3377408",        
        "4174301,5219488,5225809,4941873,4842898,5330582,4288809,4723410,5600685,5780557,4160983,4948247,5374764,4527624,5793427,4677551,4930505,5036420,4357141,5309842",        
        "4286705,4850699,4672989,5364066,4889229,4936812,4886662,4470778,4912691,2641181,4683217,5392034,4939783,4101260,3176959,4198645,5110077,5641727,5264381,4580098",        
        "4068590,5309858,5036588,4908068,4687331,4500546,5338122,4736388,5341114,2187304,4581833,5038108,5332698,5287565,4356050,5364079,5197085,5278120,4728328,4166776",        
        "5046997,4956032,5788054,4907910,4543342,4379968,4347242,5354157,4167178,4157898,5398630,5807575,5380420,4895066,4699575,3936456,5303705,4886676,5378566,4514746",        
        "5197085,5101334,4916311,5246835,4905367,3176959,5780802,4178550,2653265,5142109,4597200,5735724,4692521,5176472,5433124,4082866,4513409,4736096,4882920,4142290",        
        "4999311,4886255,5003136,4146429,5370868,5255068,5551535,2274895,4740629,5734711,5781860,5245387,3703443"
        ]

        city_IDs.forEach(function (item, index){

        var xmlhttp = new XMLHttpRequest();


        // This long function below is what will happen when we get a result
        // The actual sending of the http request and reading response occurs
        // after the definition of this function.

        xmlhttp.onreadystatechange = function() {
            // Did we get a response (4) and was the response successful (200)
            if (this.readyState == 4 && this.status == 200) {

                // Convert the JSON text to JSON object that we
                // can loop through
                var data = JSON.parse(this.responseText);


                // Loop through each city in the city list
                for (city of data.list){

                    // Define location to draw
                    // This JS map is expected by ArcGIS to make a graphic
                    var point = {
                        type: "point",
                        longitude: city.coord.lon,
                        latitude: city.coord.lat
                    };
            
                    // Determine symbol color based on the current temperature
                    var temp_color;
                    var temp = city.main.temp;
                    if (temp > 110) {
                        temp_color = [51,0,0];
                    }
                    else if (temp > 100) {
                        temp_color = [102,51,0];
                    }
                    else if (temp > 90) {
                        temp_color = [204,0,0];
                    }
                    else if (temp > 80) {
                        temp_color = [153,76,0];
                    }
                    else if (temp > 70) {
                        temp_color = [255,153,153];
                    }
                    else if (temp > 60) {
                        temp_color = [153,153,0];
                    }
                    else if (temp > 50) {
                        temp_color = [51,255,153];
                    }
                    else if (temp > 40) {
                        temp_color = [0,153,76];
                    }
                    else if (temp > 30) {
                        temp_color = [102,255,255];
                    }
                    else if (temp > 20) {
                        temp_color = [102,178,255];
                    }
                    else if (temp > 10) {
                        temp_color = [0,102,204];
                    }
                    else {
                        temp_color = [0, 0, 255];
                    }

                    // Create a symbol
                    // This JS map is expected by ArcGIS to make a graphic
                    var simpleMarkerSymbol = {
                        type: "simple-marker",
                        color: temp_color,  
                        outline: {
                        color: [255, 255, 255], // white
                        width: 1
                        }
                    };
                    
                    // Combine location and symbol to create a graphic object
                    // Also include the city data so it
                    // can be used in the popup template.
                    var pointGraphic = new Graphic({
                        geometry: point,
                        symbol: simpleMarkerSymbol,
                        attributes: city
                    });

                    // Add popup.  The items in curly braces within the 
                    // template are the key names from the graphic attributes.
                    pointGraphic.popupTemplate = {
                        "title" : "<b>{name}</b>",
                        "content" : "<b>Condition:</b> {weather.0.main}<br><b>Current Temp:</b> {main.temp}<br> <b>-High: </b>{main.temp_max}<br><b>-Low: </b>{main.temp_min}</br>"
                    }
                    
            
                    // Add the graphic (with its popup) to the graphics layer
                    graphicsLayer.add(pointGraphic);
                    


            }
        }
        }; // End of XML Call back Function



        // Time to actually send the GET request to openweathermap.org.  When we get a response
        // it will call and execute the function we defined above.
        
            APPID='';
            xmlhttp.open("GET", "http://api.openweathermap.org/data/2.5/group?id="+item+"&units=imperial&appid="+APPID, true);
            xmlhttp.send();              
        });

 
});




//Python code I used to create a list of major US Cities from a file of
//all the major cities in the world



// file2 = open(r"C:\Users\matth\OneDrive\Desktop\Winter2021\CSE310\Sprint5\just-the-cities.txt","w") 


// with open(r"C:\Users\matth\OneDrive\Desktop\Winter2021\CSE310\Sprint5\US-cities.txt","r")  as file1:
//     count = 0
//     while True:
//         count+=1
//         try:
//             if (newLine := file1.readline()) == 'Echo Park,United States,California,10104154\n':
//                 file2.write('"') 
//                 file2.write(newLine.split(',')[0])
//                 file2.write('"\n')
//                 break
//             else:
//                 print(newLine)
//                 # with open(r"C:\Users\matth\OneDrive\Desktop\Winter2021\CSE310\Sprint5\just-the-cities.txt","w") as file2:
//                 file2.write('"')
//                 file2.write(newLine.split(',')[1])
//                 file2.write('",\n')
//         except:
//             print('Exception at line:', count)
//             break

// print('Done')
// file2.close()




//I used this python code I created to generate the ID's
//from the city names. This allows me to divide
//my API calls by 20.


// file2 = open(r"C:\Users\matth\OneDrive\Desktop\Winter2021\CSE310\Sprint5\US-city-ID-strings.txt","w") 


// with open(r"C:\Users\matth\OneDrive\Desktop\Winter2021\CSE310\Sprint5\US-city-IDs.txt","r")  as file1:
//     count = 0
//     lines = file1.read().splitlines()
    
// file2.write('"')
// for line in lines:
//     count+=1
//     file2.write('')
//     file2.write(line)
//     if count %20 != 0:
//         file2.write(',')
//     if count %20 ==0:
//         file2.write('",\n"')


// print('Done')
// file2.close()
