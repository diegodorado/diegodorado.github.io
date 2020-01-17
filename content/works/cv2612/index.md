---
title: CV-2612
date: "2018-05-01"
description: An eurorack module based on the classic FM chip used by Sega Genesis
cover: "./cover.jpg"
style: dashed
---


CV2612 is an eurorack module based on the classic FM chip used by Sega Genesis: the  great YM2612.  
It has MIDI i/o, and yes! it has **control voltage inputs**!  
It is on its final development stage and we hope to see it on the market soon.

### MIDI Specs

CV2612 has two 3.5mm TRS MIDI connectors: MIDI In and MIDI Out.
MIDI Out can act as a software MIDI Thru if **THRU_ENABLE** is **1**.

#### Note Messages

Note On/Off messages are received on channels 1 to 7
If received on channel 1, they treated differently based on **Poly Mode** configuration
  * If **Poly Mode** is set to **Mono**, a note will use all six voices
  * If **Poly Mode** is set to **Poly**, a note will use a single voice with up to 6 voices of polyphony, first in/first out.
Otherwise, notes on channels 2-7 goes to voices 1-6 respectively.

#### Pitch Bend Messages

Pitch Bend messages are received on channels 1 to 7
If received on channel 1, they affects all six voices
Otherwise, pitch bends on channels 2-7 affects voices 1-6 respectively.

#### Received CC Messages

CC messages received are on channels 1 to 16
Every CV2612 voice related parameter is mapped to a CC message by default according to the following table, but can be configured through the [CV2612 Online Tool](/cv2612)


| CC | Channel | Code      | Parameter                          |
|----|---------|-----------|------------------------------------|
|... |         |           |*Global Parameters*                 |
| 1  | -       | LF0_F     | Low Frequency Oscillator Frequency |
| 2  | -       | LF0_E     | Low Frequency Oscillator Enable    |
| 3  | -       | THRU_E    | Enable Software MIDI Thru          |
| 4  | -       | TX_CC     | Transmit CC                        |
| 5  | -       | POLY_M    | Poly Mode (Mono/Poly)              |
|... |         |           |*Channel Parameters*                |
| 20 | 1-7     | AL        | Operators Algorithm                |
| 21 | 1-7     | FB        | Feedback of Operator 1             |
| 22 | 1-7     | FMS       | Frequency Modulation Sensitivity   |
| 23 | 1-7     | AMS       | Amplitude Modulation Sensitivity   |
| 24 | 1-7     | ST        | Stereo Configuration               |
|... |         |           | *Operator 1 Parameters*            |
| 30 | 1-7     | AR        | Attack Rate                        |
| 31 | 1-7     | D1        | Decay 1 Rate                       |
| 32 | 1-7     | SL        | Sustain Level                      |
| 33 | 1-7     | D2        | Decay 2 Rate                       |
| 34 | 1-7     | RR        | Release Rate                       |
| 35 | 1-7     | TL        | Total Level                        |
| 36 | 1-7     | MUL       | Frequency Multiplier               |
| 37 | 1-7     | DET       | Detune                             |
| 38 | 1-7     | RS        | Rate Scaling                       |
| 39 | 1-7     | AM        | Amplitude Modulation Enable        |
|... |         |           | *Operator 2 Parameters*            |
| 40 | 1-7     | AR        | Attack Rate                        |
| 41 | 1-7     | D1        | Decay 1 Rate                       |
| 42 | 1-7     | SL        | Sustain Level                      |
| 43 | 1-7     | D2        | Decay 2 Rate                       |
| 44 | 1-7     | RR        | Release Rate                       |
| 45 | 1-7     | TL        | Total Level                        |
| 46 | 1-7     | MUL       | Frequency Multiplier               |
| 47 | 1-7     | DET       | Detune                             |
| 48 | 1-7     | RS        | Rate Scaling                       |
| 49 | 1-7     | AM        | Amplitude Modulation Enable        |
|... |         |           | *Operator 3 Parameters*            |
| 50 | 1-7     | AR        | Attack Rate                        |
| 51 | 1-7     | D1        | Decay 1 Rate                       |
| 52 | 1-7     | SL        | Sustain Level                      |
| 53 | 1-7     | D2        | Decay 2 Rate                       |
| 54 | 1-7     | RR        | Release Rate                       |
| 55 | 1-7     | TL        | Total Level                        |
| 56 | 1-7     | MUL       | Frequency Multiplier               |
| 57 | 1-7     | DET       | Detune                             |
| 58 | 1-7     | RS        | Rate Scaling                       |
| 59 | 1-7     | AM        | Amplitude Modulation Enable        |
|... |         |           | *Operator 4 Parameters*            |
| 60 | 1-7     | AR        | Attack Rate                        |
| 61 | 1-7     | D1        | Decay 1 Rate                       |
| 62 | 1-7     | SL        | Sustain Level                      |
| 63 | 1-7     | D2        | Decay 2 Rate                       |
| 64 | 1-7     | RR        | Release Rate                       |
| 65 | 1-7     | TL        | Total Level                        |
| 66 | 1-7     | MUL       | Frequency Multiplier               |
| 67 | 1-7     | DET       | Detune                             |
| 68 | 1-7     | RS        | Rate Scaling                       |
| 69 | 1-7     | AM        | Amplitude Modulation Enable        |
|... |         |           | *Omni Operator Parameters*         |
| 70 | 1-7     | AR        | Attack Rate                        |
| 71 | 1-7     | D1        | Decay 1 Rate                       |
| 72 | 1-7     | SL        | Sustain Level                      |
| 73 | 1-7     | D2        | Decay 2 Rate                       |
| 74 | 1-7     | RR        | Release Rate                       |
| 75 | 1-7     | TL        | Total Level                        |
| 76 | 1-7     | MUL       | Frequency Multiplier               |
| 77 | 1-7     | DET       | Detune                             |
| 78 | 1-7     | RS        | Rate Scaling                       |
| 79 | 1-7     | AM        | Amplitude Modulation Enable        |



#### Transmitted CC Messages

A few CC messages are transmitted on channels 1 if **TX_CC** is **1** .


| CC | Channel | Code      | Parameter                          |
|----|---------|-----------|------------------------------------|
| 1  | 1       | CV_MSB    | Control Voltage MSB                |
| 2  | 1       | CV_LSB    | Control Voltage LSB                |
| 3  | 1       | GATE      | Gate                               |
| -  | -       |           |                                    |
| 1  | 1       | X_MSB     | X MSB                              |
| 2  | 1       | X_LSB     | X LSB                              |
| 1  | 1       | Y_MSB     | Y MSB                              |
| 2  | 1       | Y_LSB     | Y LSB                              |
| 1  | 1       | Z_MSB     | Z MSB                              |
| 2  | 1       | Z_LSB     | Z LSB                              |




#### SysEx Messages

Other configuration parameters though, can only be changed with sysEx messages through the [CV2612 Online Tool](/cv2612)

As a brief description, the following sysex messages are received:
  * ID_REQUEST
  * PARAM_LOAD
  * MAPPING_DUMP_REQUEST
  * MAPPING_LOAD
  * VOICE_DUMP_REQUEST
  * VOICE_LOAD
  * PATCH_DUMP_REQUEST
  * PATCH_LOAD
  * PATCHES_DUMP_REQUEST
  * PATCHES_LOAD

And the following sysex messages are transmitted:
  * ID_REPLY
  * MAPPING_DUMP_REPLY
  * VOICE_DUMP_REPLY
  * PATCH_DUMP_REPLY
  * PATCHES_DUMP_REPLY

Being
  * ID: Identity of the device
  * PARAM: a single parameter
  * MAPPING: The CC to parameters mapping
  * VOICE: a single voice in the chip, a.k.a. channel
  * PATCH: a patch is comprised of 6 voices, lfo and ploymode  settings
  * PATCHES: a set of 4 patches


Happy FMing!

![](./banana.jpg)
