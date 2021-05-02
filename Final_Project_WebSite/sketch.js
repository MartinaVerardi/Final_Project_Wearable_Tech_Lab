let serial;
let latestData = "waiting for data";
let arduinoOutput = "";

let happy = 0;
let sad = 0;
let warning = 0;

let dataReady = false; // set to true once the first valid string is displayed


function setup() {

  serial = new p5.SerialPort();

    serial.list();
    serial.open('COM3'); //change per your system

    serial.on('connected', serverConnected);

    serial.on('list', gotList);

    serial.on('data', gotData);

    serial.on('error', gotError);

    serial.on('open', gotOpen);

    serial.on('close', gotClose);

    noCanvas();             // open a serial port
}

function draw() {
  background(255,255,255);
  fill(0,0,0);
  text(latestData, 10, 10);
  // Polling method
  /*
  if (serial.available() > 0) {
   let data = serial.read();
   ellipse(50,50,data,data);
  }
   */
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
      print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

/*function gotData() {

  console.log("ciao");

  if ( serial.available() > 0) {
    info = serial.readString();
    if (info != null && info.contains(":")) {
      try{
        list = split(info, ':');
        HeartRate_str = list[0];
        Oxygen_str = list[1];
        
      }
      catch (e){
        System.out.println("Something went wrong.");
      }
     
      
      if (HeartRate_str.length()>1) {
        HeartRate = Integer.parseInt(HeartRate_str);
        //heartrate.setText("Heart rate: "+HeartRate);
        //hrates = append(hrates, HeartRate); //appendo valore appena letto di hrate
        //hr_chart.push("hrates", HeartRate);
        heartrate(HeartRate);
            
      }

        
      if (Oxygen_str.length()>1) {
        //Oxygen_str=Oxygen_str.substring(0, Oxygen_str.length()-1); 
        list2=split(Oxygen_str, ':');
        list2[0] =list2[0].replaceAll("[^0-9]+","");
        Oxygen = Integer.parseInt(list2[0]);
        //oxygen.setText("SpO2: "+Oxygen);
        console.log("ciao");

        oxygen(Oxygen);
      }

      print("Oxygen: "+Oxygen_str+" HeartRate: "+HeartRate+"\n");
    }
  }
}*/

function gotData() {

  let currentString = serial.readLine();
   trim(currentString);
  if (!currentString) return;
  latestData = currentString;

  var array = latestData.split("$");

  document.getElementById("hr_p").innerHTML = ": " + array[0];
  document.getElementById("ox_p").innerHTML = ": " + array[1];

  var heartrate = array[0];
  var oxygenlvl = array[1];
  var elem = document.createElement("img");
  elem.setAttribute("height", "100");
  elem.setAttribute("width", "100");
  //elem.src = '/Final_Project_WebSite/images/happy.png';



  if(heartrate >= 65 && heartrate <= 130 && oxygenlvl >= 95 && happy == 0){

    if(document.getElementById("face").hasChildNodes()){
      document.getElementById("face").removeChild(document.getElementById("face").lastChild);
    }

    elem.setAttribute("src", "/Final_Project_WebSite/images/happy.png");
    document.getElementById("face").appendChild(elem);

    happy = 1;
    sad = 0;
    warning = 0;
    

  }else if((heartrate > 60 && heartrate < 65 || heartrate > 130) || (oxygenlvl < 95 && oxygenlvl > 92) && sad == 0){

    if(document.getElementById("face").hasChildNodes()){
      document.getElementById("face").removeChild(document.getElementById("face").lastChild);
    }

    
    elem.setAttribute("src", "/Final_Project_WebSite/images/sad.png");
    document.getElementById("face").appendChild(elem);

    sad = 1;
    happy = 0;
    warning = 0;

  }else if(heartrate < 60 || oxygenlvl < 92 && warning == 0){

    elem.setAttribute("src", "/Final_Project_WebSite/images/warning_finale.png");
    document.getElementById("face").appendChild(elem);

    warning = 1;
    happy = 0;
    sad = 0;

  }

 }
