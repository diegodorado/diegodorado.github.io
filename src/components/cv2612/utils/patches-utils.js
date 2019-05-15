export const dmp2patch = (name,d) =>{
    //version 9 or 11, genesis, FM patch
    if( (d[0]===0x09 && d[1]===0x01 && d[2]===0x00)
        || ( d[0]===0x0B && d[1]===0x02 && d[2]===0x01) ){

        /*

        http://www.deflemask.com/DMP_SPECS.txt

        1 Byte: LFO (FMS on YM2612, PMS on YM2151)
        1 Byte: FB
        1 Byte: ALG
        1 Byte: LFO2 (AMS on YM2612, AMS on YM2151)
        Repeat this TOTAL_OPERATORS times
          1 Byte: MULT
          1 Byte: TL
          1 Byte: AR
          1 Byte: DR
          1 Byte: SL
          1 Byte: RR
          1 Byte: AM
          1 Byte: RS
          1 Byte: DT (DT2<<4 | DT on YM2151)
          1 Byte: D2R
          1 Byte: SSGEG_Enabled <<3 | SSGEG
          */
          const params = {}
          params[`6_4_lfo`] = 0
          for(let ch=0;ch<=6;ch++){
            //repeat for 6 channels, and omni channel too
            params[`${ch}_4_fms`] = d[3]
            params[`${ch}_4_fb`] = d[4]
            params[`${ch}_4_al`] = d[5]
            params[`${ch}_4_ams`] = d[6]
            params[`${ch}_4_st`] = 3
            for(let op=0;op<=4;op++){
              //use first op as omni op
              const o = (op===4?0:op)*11+7
              params[`${ch}_${op}_mul`] = d[o+0]
              params[`${ch}_${op}_tl`] = d[o+1]
              params[`${ch}_${op}_ar`] = d[o+2]
              params[`${ch}_${op}_d1`] = d[o+3]
              params[`${ch}_${op}_sl`] = d[o+4]
              params[`${ch}_${op}_rr`] = d[o+5]
              params[`${ch}_${op}_am`] = d[o+6]
              params[`${ch}_${op}_rs`] = d[o+7]
              params[`${ch}_${op}_det`] = d[o+8]
              params[`${ch}_${op}_d2`] = d[o+9]
            }
          }

          return {name: name.replace('.dmp',''), params: params}
    }
    //else
    return null

}


export const emptyParams = () =>{
  const params = {}
  params[`6_4_lfo`] = 0
  for(let ch=0;ch<=6;ch++){
    //repeat for 6 channels, and omni channel too
    params[`${ch}_4_fms`] = 0
    params[`${ch}_4_fb`] = 0
    params[`${ch}_4_al`] = 0
    params[`${ch}_4_ams`] = 0
    params[`${ch}_4_st`] = 3
    for(let op=0;op<=4;op++){
      params[`${ch}_${op}_mul`] = 0
      params[`${ch}_${op}_tl`] = 0
      params[`${ch}_${op}_ar`] = 0
      params[`${ch}_${op}_d1`] = 0
      params[`${ch}_${op}_sl`] = 0
      params[`${ch}_${op}_rr`] = 0
      params[`${ch}_${op}_am`] = 0
      params[`${ch}_${op}_rs`] = 0
      params[`${ch}_${op}_det`] = 0
      params[`${ch}_${op}_d2`] = 0
    }
  }
  return params
}


const bitness = (param) =>{
  const groups = [
    ['am'],
    ['rs','st','ams'],
    ['det','al','fb','fms','lfo'],
    ['sl','rr','mul'],
    ['ar','d2','d1'],
    [],
    ['tl']
  ]
  let bits = 1
  for(let group of groups){
    if (group.some((k) => param.endsWith(k)))
      return bits
    bits++
  }
  console.log('invalid param',param)
  return 0
}

export const emptyMapping = () =>{
  const mapping = emptyParams()
  for (let key in mapping) {
    mapping[key] = {cc:null, ch:null, bits: bitness(key)}
  }
  return mapping
}
