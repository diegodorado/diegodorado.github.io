import Pizzicato from 'pizzicato'
import YM2612 from './ym2612'
import AudioKeys from 'audiokeys'

const ym = new YM2612()
const fm = new Pizzicato.Sound({
    source: 'script',
    options: {
        audioFunction: (e) => {
            var buffer = ym.update(1024);
            var output = e.outputBuffer.getChannelData(0);
            for (var i = 0; i < e.outputBuffer.length; i++)
                output[i] = buffer[0][i]/32768;
        },
        bufferSize: 1024
    }
})
const kb = new AudioKeys({
      polyphony: 1,
      rows: 1,
      priority: 'last'
    })

const notes = []

class Emulator {

  constructor(props){
    kb.down(this.onKeyDown)
    kb.up(this.onKeyUp)
  }


  noteOn = (note) => {
    const f = ( Math.pow(2, ( note-69 ) / 12) ) * 440.0
    this.onKeyDown({note:note,frequency:f})
  }

  noteOff = (note) => {
    this.onKeyUp({note:note})
  }

  onKeyDown = (note) => {
    if(notes.indexOf(note.note)===-1)
      notes.push(note.note)

    let f = note.frequency
    let block = 2
    while (f >= 2048) {
      f /= 2
      block++
    }
    const freq = parseInt(f)
    ym.write(0xA4, ((freq >> 8) & 0x07) | ( ( block & 0x07 ) << 3))
    ym.write(0xA0, freq&0xFF)

    if(notes.length===1)
      ym.write(0x28, 0xF0)
  }

  onKeyUp = (note) => {
    for( let i = 0; i < notes.length; i++){
       if ( notes[i] === note.note)
         notes.splice(i, 1)
    }

    if(notes.length===0)
      ym.write(0x28, 0x00)
  }

  play(){
    fm.play()
  }
  pause(){
    fm.pause()
  }

  destroy(){
    fm.stop()
  }

  update(ch,op,param,value,params){
    const mask = (key,size,shift) =>{
      return (params[`${ch}_${op}_${key}`] & (Math.pow(2,size)-1))<<shift
    }

    if(param==='lfo' ){
      ym.write(0x22, value & 0x07);
    }
    else if(param==='det' || param==='mul' ){
      const v = mask('det',3,4)|mask('mul',4,0)
      ym.write(0x30+4*op, v)
    }
    else if(param==='tl'){
      const v = mask('tl',7,0)
      ym.write(0x40+4*op, v)
    }
    else if(param==='rs' || param==='ar' ){
      const v = mask('rs',2,6)|mask('ar',5,0)
      ym.write(0x50+4*op, v)
    }
    else if(param==='am' || param==='d1' ){
      const v = mask('am',1,7)|mask('d1',5,0)
      ym.write(0x60+4*op, v)
    }
    else if(param==='d2' ){
      const v = mask('d2',5,0)
      ym.write(0x70+4*op, v)
    }
    else if(param==='sl' || param==='rr' ){
      const v = mask('sl',4,4)|mask('rr',4,0)
      ym.write(0x80+4*op, v)
    }
    else if(param==='al' || param==='fb' ){
      const v = mask('fb',3,3)|mask('al',3,0)
      ym.write(0xB0, v)
    }
    else if(param==='st' || param==='ams'|| param==='fms' ){
      const v = mask('st',2,6)|mask('ams',2,4)|mask('fms',3,0)
      ym.write(0xB4, v)
    }


  }


}

export default Emulator


ym.init(7670448, 44100);	// call this if the clock and/or output sample rate ever need to change
ym.config(9);
ym.reset();
ym.write(0x28,0x00);

/* YM2612 Test code */
ym.write(0x22, 0x00); // LFO off
ym.write(0x27, 0x00); // Note off (channel 0)
ym.write(0x28, 0x01); // Note off (channel 1)
ym.write(0x28, 0x02); // Note off (channel 2)
ym.write(0x28, 0x04); // Note off (channel 3)
ym.write(0x28, 0x05); // Note off (channel 4)
ym.write(0x28, 0x06); // Note off (channel 5)
ym.write(0x2B, 0x00); // DAC off
ym.write(0x30, 0x71); //
ym.write(0x34, 0x0D); //
ym.write(0x38, 0x33); //
ym.write(0x3C, 0x01); // DT1/MUL
ym.write(0x40, 0x23); //
ym.write(0x44, 0x2D); //
ym.write(0x48, 0x26); //
ym.write(0x4C, 0x00); // Total level
ym.write(0x50, 0x5F); //
ym.write(0x54, 0x99); //
ym.write(0x58, 0x5F); //
ym.write(0x5C, 0x94); // RS/AR
ym.write(0x60, 0x05); //
ym.write(0x64, 0x05); //
ym.write(0x68, 0x05); //
ym.write(0x6C, 0x07); // AM/D1R
ym.write(0x70, 0x02); //
ym.write(0x74, 0x02); //
ym.write(0x78, 0x02); //
ym.write(0x7C, 0x02); // D2R
ym.write(0x80, 0x11); //
ym.write(0x84, 0x11); //
ym.write(0x88, 0x11); //
ym.write(0x8C, 0xA6); // D1L/RR
ym.write(0x90, 0x00); //
ym.write(0x94, 0x00); //
ym.write(0x98, 0x00); //
ym.write(0x9C, 0x00); // Proprietary
ym.write(0xB0, 0x32); // Feedback/algorithm
ym.write(0xB4, 0xC0); // Both speakers on
ym.write(0x28, 0x00); // Key off
ym.write(0xA4, 0x22);	//
ym.write(0xA0, 0x69); // Set frequency






/*

from http://www.smspower.org/maxim/Documents/YM2612#reg27

Part I memory map
=================

+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| REG  | D7              | D6  | D5               | D4      | D3         | D2             | D1           | D0     |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 22H  |                 |     |                  |         | LFO enable | LFO frequency  |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 24H  | Timer A MSBs    |     |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 25H  |                 |     |                  |         |            |                | Timer A LSBs |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 26H  | Timer B         |     |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 27H  | Ch3 mode        |     | Reset B          | Reset A | Enable B   | Enable A       | Load B       | Load A |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 28H  | Operator        |     |                  |         |            | Channel        |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 29H  |                 |     |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 2AH  | DAC             |     |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 2BH  | DAC en          |     |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
|      |                 |     |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 30H+ |                 | DT1 |                  |         | MUL        |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 40H+ |                 | TL  |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 50H+ | RS              |     |                  | AR      |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 60H+ | AM              |     |                  | D1R     |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 70H+ |                 |     |                  | D2R     |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 80H+ | D1L             |     |                  |         | RR         |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| 90H+ |                 |     |                  |         | SSG-EG     |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
|      |                 |     |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| A0H+ | Freq. LSB       |     |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| A4H+ |                 |     | Block            |         |            | Freq. MSB      |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| A8H+ | Ch3 suppl. freq.|     |                  |         |            |                |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| ACH+ |                 |     | Ch3 suppl. block |         |            | Ch3 suppl freq |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| B0H+ |                 |     | Feedback         |         |            | Algorithm      |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+
| B4H+ | L               | R   | AMS              |         |            | FMS            |              |        |
+------+-----------------+-----+------------------+---------+------------+----------------+--------------+--------+


*/
