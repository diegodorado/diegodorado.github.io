//rename to defaultParams
export const calculateEnvelopePoints = (env) =>{
  const x1 = Math.round((31-env.ar)/31*100)
  const y1 = Math.round(env.tl/127*100)
  const x2 = Math.round(x1+(31-env.d1)/31*100)
  const y2 = Math.round(y1+(100-y1)*(env.sl/15))
  const x3 = Math.round(x2+100)
  const y3 = Math.round(y2+(100-y2)*(0.5*(env.d2/31)))
  const x4 = Math.round(x3+(15-env.rr)/31*200)

  const points = [
      [0,100],
      [x1,y1],
      [x2,y2],
      [x3,y3],
      [x4,100]
    ]
  return points.map((p)=>p.join(',')).join(' ').replace(/NaN/g,'0')
}
