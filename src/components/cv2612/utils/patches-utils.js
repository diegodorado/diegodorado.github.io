
export const globalParams = ['lfo','play-mode','cc-mode','x','y','z','vel-sensitivity','rgb-intensity']

export const ctrlMap = ['ar','d1','sl','d2','rr','tl','mul','det','rs','am','al','fb','ams','fms','st','lfo']

//rename to defaultParams
export const emptyPatch = () =>{
  const patch = {}

  for (let g of globalParams) {
    patch[g] = 0
  }

  patch[`voices`] = []
  for(let i=0;i<6;i++){
    patch[`voices`][i] = emptyVoice()
  }
  patch[`name`] = 'empty'
  return patch
}



//rename to defaultParams
export const emptyVoice = () =>{
  const params = {}

  params[`fms`] = 0
  params[`fb`] = 0
  params[`al`] = 0
  params[`ams`] = 0
  params[`st`] = 3
  for(let op=0;op<4;op++){
    params[`mul_${op}`] = 0
    params[`tl_${op}`] = 0
    params[`ar_${op}`] = 0
    params[`d1_${op}`] = 0
    params[`sl_${op}`] = 0
    params[`rr_${op}`] = 0
    params[`am_${op}`] = 0
    params[`rs_${op}`] = 0
    params[`det_${op}`] = 0
    params[`d2_${op}`] = 0
  }
  return params
}

export const emptyParams = () =>{
  const params = emptyVoice()
  for (let g of globalParams) {
    params[g] = 0
  }
  return params
}


export const emptyMapping = () =>{

  const mapping = emptyParams()
  for (let key in mapping) {
    mapping[key] = null
  }
  return mapping
}


export const dmp2voice = (name,d) =>{
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
          const params = emptyVoice()

          params[`fms`] = d[3]
          params[`fb`] = d[4]
          params[`al`] = d[5]
          params[`ams`] = d[6]
          for(let op=0;op<4;op++){
            const o = op*11+7

            params[`mul_${op}`] = d[o+0]
            params[`tl_${op}`] = d[o+1]
            params[`ar_${op}`] = d[o+2]
            params[`d1_${op}`] = d[o+3]
            params[`sl_${op}`] = d[o+4]
            params[`rr_${op}`] = d[o+5]
            params[`am_${op}`] = d[o+6]
            params[`rs_${op}`] = d[o+7]
            params[`det_${op}`] = d[o+8]
            params[`d2_${op}`] = d[o+9]
          }

          return params
    }
    //else
    return null

}


export const bitness = (param) =>{
  const groups = [
    ['am','en'],
    ['rs','st','ams'],
    ['det','al','fb','fms','lfo'],
    ['sl','rr','mul'],
    ['ar','d2','d1'],
    [],
    ['tl'],
  ]
  let bits = 1
  for(let group of groups){
    if (group.some((k) => param.startsWith(k)))
      return bits
    bits++
  }
  //default bitness
  return 7
}
