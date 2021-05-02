#include <SparkFun_Bio_Sensor_Hub_Library.h>
#include <Wire.h>



// Reset pin, MFIO pin
int resPin = 4;
int mfioPin = 5;

// Possible widths: 69, 118, 215, 411us
int width = 215; 
// Possible samples: 50, 100, 200, 400, 800, 1000, 1600, 3200 samples/second
// Not every sample amount is possible with every width; check out our hookup
// guide for more information.
int samples = 800; 
int pulseWidthVal;
int sampleVal; 

int algoRange = 80; // ADC Range (0-100%)
int algoStepSize = 20; // Step Size (0-100%)
int algoSens = 20; // Sensitivity (0-100%)
int algoSamp = 10; // Number of samples to average (0-255)

String string1="";
String string2="";
String string3="";
char val='N';
int sound = 0;

float tms=0.0;
int i=0;

long current_t=0;
long previous_t=0;


// Takes address, reset pin, and MFIO pin.
SparkFun_Bio_Sensor_Hub bioHub(resPin, mfioPin); 

bioData body; 

void setup(){

  Serial.begin(115200);

  Wire.begin();
  int result = bioHub.begin();

  int error = bioHub.setAlgoRange(algoRange);

  error = bioHub.setAlgoStepSize(algoStepSize);

  error = bioHub.setAlgoSensitivity(algoSens);

  error = bioHub.setAlgoSamples(algoSamp);
  int algoVal = bioHub.readAlgoRange();
  int stepVal = bioHub.readAlgoStepSize();

  int senVal = bioHub.readAlgoSensitivity();

  int sampVal = bioHub.readAlgoSamples();
  error = bioHub.configBpm(MODE_ONE);
  error = bioHub.setPulseWidth(width); 
  pulseWidthVal = bioHub.readPulseWidth();  
  sampleVal = bioHub.readSampleRate();

  delay(4000);

  //tone(BUZZER,1000);
  //delay(500);
  //noTone(BUZZER);

}

void loop(){
  
    current_t = millis();
    if((current_t- previous_t)>1000){
      previous_t=current_t;
      body = bioHub.readBpm();
      string1 = String(body.heartRate);
      string2 = String(body.oxygen);
      String toPrint = String(string1) + "$" 
    + String(string2); 
      if (body.heartRate > 40 && body.heartRate<180) {
      Serial.print(toPrint);
      Serial.println();
      }
    }

   /*if (Serial.available()) {            // If data is available,  
      val = Serial.read();               // read it and store it in val
  } */
   /* if (val == 'Y') {  // If 'H' was received, 
      tone (BUZZER,1000);
      delay(500);
      noTone(BUZZER);
      tone (BUZZER,1000);
      delay(500);
      noTone(BUZZER);
      val = 'N';
        }*/

        

  }

   
