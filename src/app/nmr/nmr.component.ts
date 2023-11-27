import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-nmr',
  templateUrl: './nmr.component.html',
  styleUrls: ['./nmr.component.css'],
  providers: [DatePipe],
})
export class NmrComponent {
  constructor(private cdr: ChangeDetectorRef, private datePipe: DatePipe) {}

  isPrimarySystemDropdownOpen = false;
  selectedSystem: string | null = null;

  togglePrimarySystemDropdown() {
    this.isPrimarySystemDropdownOpen = !this.isPrimarySystemDropdownOpen;
  }

  selectSystem(system: string) {
    this.selectedSystem = system;
    this.isPrimarySystemDropdownOpen = false;
  }

  // forOperationP

  value: number = 0;
  isOperationModeDropdownOpen = false;
  selectedOperationModeP: string | null = null;

  // Function to toggle the operation mode dropdown
  toggleOperationModeDropdown() {
    this.isOperationModeDropdownOpen = !this.isOperationModeDropdownOpen;
  }

  // Function to select the operation mode
  selectOperationMode(operationMode: string) {
    this.selectedOperationModeP = operationMode;
    this.isOperationModeDropdownOpen = false;
  }

  // forOperationS
  value1: number = 0;
  isOperationModeDropdownOpenS = false;
  selectedOperationModeS: string | null = null;

  toggleOperationModeDropdown1() {
    this.isOperationModeDropdownOpenS = !this.isOperationModeDropdownOpenS;
  }

  selectOperationModeS(operationMode: string) {
    this.selectedOperationModeS = operationMode;
    this.isOperationModeDropdownOpenS = false;
  }

  // ingress

  isIngressDropdownOpen = false;
  selectedIngress: string | null = null;
  batteryLevel: string | null = null;

  toggleIngressDropdown() {
    this.isIngressDropdownOpen = !this.isIngressDropdownOpen;
  }

  selectIngress(ingress: string) {
    this.selectedIngress = ingress;
    this.isIngressDropdownOpen = false;
  }

  // for reeferselection

  isReeferModeDropdownOpen = false;
  selectedReeferMode: string | null = null;

  toggleReeferModeDropdown() {
    this.isReeferModeDropdownOpen = !this.isReeferModeDropdownOpen;
  }

  selectReeferMode(reeferMode: string) {
    this.selectedReeferMode = reeferMode;
    this.isReeferModeDropdownOpen = false;
  }

  // for alert1
  alert1: boolean[] = Array(16).fill(false);

  updateCheckboxValue(index: number) {
    this.alert1[index] = !this.alert1[index];
  }

  // for alert2
  alert2: boolean[] = Array(16).fill(false);

  updateCheckboxValue1(index: number) {
    this.alert2[index] = !this.alert2[index];
  }

  // for alert3
  alert3: boolean[] = Array(16).fill(false);

  updateCheckboxValue2(index: number) {
    this.alert3[index] = !this.alert3[index];
  }

  // send button
  // Send button click handler
  sendData(): void {
    const binaryString1 = this.alert1
      .slice()
      .reverse()
      .map((value) => (value ? '1' : '0'))
      .join('');

    // Output the reversed binary string for Alert 1
    console.log('Reversed Binary string for Alert 1:', binaryString1);
    this.value = this.selectedOperationModeP === 'Cooling' ? 4 : 5;
    console.log(this.value);
    this.value1 = this.selectedOperationModeS === 'Cooling' ? 4 : 5;
    console.log(this.value1);

    // Reverse the boolean array for Alert 2 and then convert it to a binary string
    const binaryString2 = this.alert2
      .slice()
      .reverse()
      .map((value) => (value ? '1' : '0'))
      .join('');

    // Output the reversed binary string for Alert 2
    console.log('Reversed Binary string for Alert 2:', binaryString2);
    const binaryString3 = this.alert3
      .slice()
      .reverse()
      .map((value) => (value ? '1' : '0'))
      .join('');

    // Output the reversed binary string for Alert 2
    console.log('Reversed Binary string for Alert 3:', binaryString3);

    // fear start

    // Add other necessary variable declarations here

    const apiUrl =
      'https://assetiq-dev.rt1cloud.com/reeferiq-api/device-gateway-messages/message-simulator';

    // Define the requestData object
    const requestData = {
      gatewayId: this.gatewayId,
      Moments: [
        {
          deviceid: this.deviceId,
          system: this.system,
          esn: this.esn,
          lasttxtime: this.lasttxtime,
          moments: [
            {
              momentid: 99499146,
              dateOriginated: this.lasttxtime,
              dateReported: this.lasttxtime,
              type: '1',
              points: [
                {
                  Point: {
                    SessionStatus: '0',
                  },
                },
                {
                  Point: {
                    MetaCEP: '19',
                    MetaLat: '53.01230000246',
                    MetaLon: '8.75523348438',
                  },
                },
                {
                  Point: {
                    Ingress: this.selectedIngress,
                  },
                },

                {
                  Point: {
                    TimeSinceCom: '223.37',
                  },
                },
                {
                  PointMsgType: {
                    num: '10',
                    MsgType: 'Reefer POWER Off - BEGIN 48HR MODE',
                  },
                },
                {
                  PointAlert: {
                    Level: '1',
                    ModeChange: '10',
                  },
                },
                {
                  Point: {
                    CurrentMode: this.selectedReeferMode, //'7
                  },
                },
                {
                  PointLoc: {
                    Lat: this.latitude,
                    Lon: this.longitude,
                  },
                },
                {
                  Point: {
                    Battery: this.batteryLevel + 'V',
                  },
                },
                {
                  Point: {
                    BatteryRaw: this.batteryLevel,
                  },
                },
                {
                  Point: {
                    UnitTemperature: '16C - 23C',
                  },
                },
                {
                  PointSensor: {
                    Num: 0,
                    Name: 'Sensor0',
                    sequence: ['142'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 1,
                    Name: 'Sensor1',
                    sequence: ['2'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 2,
                    Name: 'Fuel Sensor Reading',
                    sequence: [this.fuellevel],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 4,
                    Name: 'NTC1 - Probe 1',
                    sequence: ['26'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 5,
                    Name: 'DIGITAL TEMP',
                    sequence: [this.ambientTemperature], //["45"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 6,
                    Name: 'NTC2 - Probe 2',
                    sequence: ['30'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 7,
                    Name: 'Sensor7',
                    sequence: [
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                    ],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 8,
                    Name: 'Sensor8',
                    sequence: ['-32647', '-32647'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 9,
                    Name: 'Sensor9',
                    sequence: [
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                      '-32647',
                    ],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 10,
                    Name: 'Sensor10',
                    sequence: ['-32647', '-32647'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Num: 11,
                    Name: 'Sensor11',
                    sequence: ['-32647', '-32647'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC1-MAX',
                    sequence: [this.supplytempmax], //["-30"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC1-MIN',
                    sequence: [this.supplytempmin], //["-40"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC1-MEAN',
                    sequence: [this.supplytempmean], //["-20"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC2-MAX',
                    sequence: [this.returntempmax], //["-56"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC2-MIN',
                    sequence: [this.returntempmin], //["-22"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'NTC2-MEAN',
                    sequence: [this.returntempmean], //["-20"],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Main HZ',
                    sequence: ['20'],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Operation hour',
                    sequence: [this.OperationHoursS], //["234"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Operation Mode',
                    sequence: [this.value.toString()],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Return Temperature Probe',
                    sequence: [this.returnpointS], //["3.2"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Supply Temperature Probe ',
                    sequence: [this.supplypointS], //["6.5"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 2 Temperature Setpoint',
                    sequence: [this.setpointS], //["0.5"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 1',
                    sequence: [binaryString1], //'0000000000000001'
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Operation hour',
                    sequence: [this.OperationHoursP], //["611"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 System indication',
                    sequence: [this.selectedSystem], //primarySystem ["2"]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Operation Mode',
                    sequence: [this.value1.toString()],
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Return Temperature Probe',
                    sequence: [this.returnpointP], //'23'
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Supply Temperature Probe',
                    sequence: [this.supplypointP], //['10]
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'System 1 Temperature Setpoint',
                    sequence: [this.setpointP], //['30']
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 3',
                    sequence: [binaryString3], //'0000000000001000'
                    enumeration: 'values',
                  },
                },
                {
                  PointSensor: {
                    Name: 'Active Errors 2',
                    sequence: [binaryString2], //'0000000000000001'
                    enumeration: 'values',
                  },
                },
              ],
              dateReceived: '2023-10-12T10:08:04Z',
            },
          ],
          CLASS: 'AP4i34',
        },
      ],
    };

    const formattedJson = JSON.stringify(requestData, null, 2);

    // Blob for JSON data
    const jsonBlob = new Blob([formattedJson], { type: 'application/json' });

    // Creating an element
    const downloadLink = document.createElement('a');

    // Set the download link attributes
    downloadLink.href = URL.createObjectURL(jsonBlob);
    downloadLink.download = 'requestData.json';

    // Append to the body
    document.body.appendChild(downloadLink);

    // Trigger to download
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);

    console.log('Data to be sent to API:', requestData);

    axios
      .post(apiUrl, requestData, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Check if the response is successful
        if (response.data === true) {
          this.showSuccessPopup();
          console.log(response.data);
        } else {
          this.showErrorPopup('Unexpected response');
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error('Error:', error.message);
        this.showErrorPopup('Failed to send data');
      });
    // fear end
  }

  showSuccessPopup(): void {
    // Code to show the success popup
    const popup = document.getElementById('popupSection1');
    if (popup) {
      popup.classList.remove('hidden');
    }
  }

  showErrorPopup(message: string): void {
    // Code to show the error popup
    const popup = document.getElementById('popupErrorSection1');
    if (popup) {
      popup.classList.remove('hidden');
    }
  }

  // close success popup
  closePopup(): void {
    // Logic to close the popup goes here
    const popupSection = document.getElementById('popupSection1');
    if (popupSection) {
      popupSection.classList.add('hidden');
    }
  }

  // close error popup
  closePopup1(): void {
    // Logic to close the popup goes here
    const popupSection = document.getElementById('popupErrorSection1');
    if (popupSection) {
      popupSection.classList.add('hidden');
    }
  }

  // sentmail
  @ViewChild('popupMailSection') popupMailSection: ElementRef | undefined;

  // ... your other component properties and methods

  showPopupMail(): void {
    console.log('showPopupMail called');
    if (this.popupMailSection) {
      this.popupMailSection.nativeElement.classList.remove('hidden');
    }
  }

  closePopupMail(): void {
    if (this.popupMailSection) {
      this.popupMailSection.nativeElement.classList.add('hidden');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    this.closePopupIfOutside('popupSection1', event);
    this.closePopupIfOutside('popupErrorSection1', event);
    this.closePopupIfOutside('popupMailSection', event);
  }

  private closePopupIfOutside(popupId: string, event: Event): void {
    // Click occurred outside the popup, so close it
    const popupSection = document.getElementById(popupId);
    if (popupSection && !popupSection.contains(event.target as Node)) {
      // Click occurred outside the popup, so close it

      popupSection.classList.add('hidden');
      this.cdr.detectChanges();
    }
  }

  // automate button

  // supply

  supplytempmax: string | null = null;
  supplytempmin: string | null = null;
  supplytempmean: string | null = null;
  returntempmax: string | null = null;
  returntempmin: string | null = null;
  returntempmean: string | null = null;
  // inventory
  fuellevel: string | null = null;
  // common
  setpointP: string | null = null;
  returnpointP: string | null = null;
  supplypointP: string | null = null;
  setpointS: string | null = null;
  returnpointS: string | null = null;
  supplypointS: string | null = null;

  // data
  gatewayId: string | null = null;
  deviceId: string | null = null;
  system: string | null = null;
  esn: string | null = null;
  lasttxtime: string | null = null;
  latitude: string | null = null;
  longitude: string | null = null;

  // set operation

  OperationHoursS: string | null = null;
  OperationHoursP: string | null = null;
  ambientTemperature: string | null = null;

  automateData() {
    this.selectedIngress = 'TCP';
    this.batteryLevel = '12';
    this.supplytempmax = '25';
    this.supplytempmin = '25';
    this.supplytempmean = '25';
    this.returntempmax = '25';
    this.returntempmin = '25';
    this.returntempmean = '25';
    this.fuellevel = '8';
    this.setpointP = '25';
    this.setpointS = '25';
    this.supplypointP = '25';
    this.supplypointS = '25';
    this.returnpointP = '25';
    this.returnpointS = '25';
    this.selectedSystem = 'System1';
    this.gatewayId = 'ASSETLINK_NMR_262_001';
    this.deviceId = 'H8-TEST-NMR';
    this.system = 'HCI';
    this.esn = 'H8-TEST-NMR';
    this.lasttxtime = '';
    this.latitude = '18.98367';
    this.longitude = '29.72933';
    this.selectedOperationModeP = 'Cooling';
    this.selectedOperationModeS = 'Heating';
    this.ambientTemperature = '25';
    this.OperationHoursP = '25';
    this.OperationHoursS = '25';
    this.updateLastTxTime();

    console.log('Data has been automated!');
  }

  private updateLastTxTime() {
    const currentDate = new Date();
    this.lasttxtime = this.datePipe.transform(
      currentDate,
      'yyyy-MM-ddTHH:mm:ss.SSSZ'
    );
    this.cdr.detectChanges(); // Detect changes to update the view
  }
}