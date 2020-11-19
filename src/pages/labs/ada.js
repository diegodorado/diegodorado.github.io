import React, {useState, useEffect,useRef} from "react"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import "./ada.sass"

const AdaPage = ({location}) => {
  const embed = location.search === "?embed"
  const width = 48
  const height = 48
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const offsetY = 4
  const rules = [
    18, 22, 26, 30, 45, 54, 60, 73, 82, 90, 
    106, 106, 109, 110, 122, 126, 129, 146, 150, 154, 195
  ]
  // use a single object ref to hold state
  // that do not trigger re-renders
  const state = useRef({
    tick: 0,
    row: 0,
    ruleIndex: 0,
    rule: 18,
    cells: new Array(width),
  })
  // a state to copy state that trigger a re-render
  const [rule, setRule] = useState(state.current.rule)

  const draw_rule = (context) => {
    context.fillStyle = "rgb(100,100,100)"
    context.fillRect(0, 0, width, 4)
    for (let i = 0; i < 8; i++){
      for (let j = 0; j < 3; j++){
        const v = ( i >> j) & 0x01
        context.fillStyle = v ? "#ddd" :  "#222"
        context.fillRect( ( 7 - i)*6 + 1 + j, 1, 1, 1)
      }
      const v = ( state.current.rule >> i) & 0x01
      context.fillStyle = v ? "#ddd" :  "#222"
      context.fillRect( ( 7 - i)*6 + 2, 2, 1, 1)
    }
  }

  const draw_line = (context) => {
    // move previous state down
    const data = context.getImageData(0, offsetY, width, height - offsetY - 1);
    context.putImageData(data, 0, offsetY + 1)

    for (var i = 0; i < width; i++) {
      //draw each cell in the current state
      context.fillStyle = state.current.cells[i] ? "#ddd" : "#222"
      context.fillRect(i, offsetY, 1, 1);
    }
  }

  const colorsCount = (s) => {
    return s.reduce( (a,e) => {
      a[e]++
      return a
    } , [0,0])
  }

  const step = () => {
    const nextState = new Array(width)
    for (var i = 0; i < width; i++) {
      //calculate each cell in the next state of the simulation
      const l = state.current.cells[(i + width - 1) % width]
      const c = state.current.cells[i]
      const r = state.current.cells[ (i + 1) % width]
      const n = (l << 2) | (c <<1) | r
      nextState[i] = (state.current.rule & Math.pow(2, n)) > 0 ? 1: 0
    }
    // ensure we do not die
    // at least an octave of cells of each color
    while( Math.min(...colorsCount(nextState)) < width/8 ){
      randomize(nextState)
    }
    state.current.cells = nextState
  }

  const draw = time => {
    state.current.tick++
    if(canvasRef.current){
      const context = canvasRef.current.getContext('2d')
      if((state.current.tick % 60) === 0){
        draw_rule(context)
        draw_line(context)
        step()
        state.current.row++
        if(state.current.row % 24 === 0)
          nextRule()
      }
    }
    rafRef.current = requestAnimationFrame(draw)
  }

  const randomize = (cells) => {
    for (var i = 0; i < width; i++)
      cells[i] = Math.random() > 0.5 ? 1 : 0
  }

  const nextRule = () => {
    state.current.ruleIndex++
    state.current.ruleIndex %= rules.length
    state.current.rule = rules[state.current.ruleIndex] 
    setRule(state.current.rule)
  }

  const generateRows = (count) => {
    const rows = []
    for(let r =0; r < count; r++){
      step()
      rows.push(state.current.cells)
      if(r % 24 === 0)
        nextRule()
    }
    return rows
  }


  const generateSVG = (rows, color) => {
    const columnCount = 24
    const r = 1.5 //radio grilla
    const rl = 1.4 //radio grilla lateral
    const sw = 0.3 // stroke
    const l =  rows.length
    const dy = 5.02
    const dx = 4.5
    const oy = 4 + r
    const ox = 30.5 + r

    const h = dy * l + oy * 2
    const w = dx * columnCount + ox * 2

    let svg = `<svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 ${w} ${h}"
      height="${h}mm"
      width="${w}mm"
      units="mm"
    >
    `
    for (let y = 0; y < l; y++) {
      const cy = oy + y * dy
      svg += `<circle cx="${24.95+r}" cy="${cy}" r="${rl}" stroke="black" stroke-width="${sw}" style="fill:none" fill="transparent"  />`
      svg += `<circle cx="${139.31+r}" cy="${cy}" r="${rl}" stroke="black" stroke-width="${sw}" style="fill:none" fill="transparent"  />`
      for (let x = 0; x < columnCount; x++) {
        const cx = ox + x * dx
        if(color){
          const c = rows[y][x] ? "white" : "black"
          svg += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="black" stroke-width="${sw}" style="fill:${c}" fill="${c}"  />`
        }else{
          if (rows[y][x]) {
            svg += `<circle cx="${cx}" cy="${cy}" r="${r}" stroke="black" stroke-width="${sw}" style="fill:none" fill="transparent"  />`
          }
        }
      }
    }

    svg += `
    <rect x="13" y="3" width="141" height="${dy * l + oy }" fill="transparent" style="fill:none" stroke="black" stroke-width="${sw}" />
    </svg>`
    return svg
  }

  const downloadSVG = (svg) => {
    const filename = 'punch-card.svg'
    const blob = new Blob([svg], {
      type: 'image/svg+xml'
    })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
  }

  const downloadPunchcard = (ev) => {
    ev.preventDefault()
    const rows = generateRows(500)
    const svg = generateSVG(rows, false)
    downloadSVG(svg)
  }

  const downloadColorSvg = (ev) => {
    ev.preventDefault()
    const rows = generateRows(500)
    const svg = generateSVG(rows, true)
    downloadSVG(svg)
  }



  useEffect(() => {
    randomize(state.current.cells)
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, []) // Make sure the effect runs only once

  if (embed)
    return (<>
      <style dangerouslySetInnerHTML={{__html: `
        html,body{margin:0; padding:0}
      `}}/>
      <canvas className="ada-canvas" width={width} height={width} ref={canvasRef} ></canvas>
      </>)
  else
    return (
      <Layout location={location} bodyClass="ada-algorithm" >
        <SEO title="ADA elementary cellular automaton" />
        <h3>A.D.A. weaving algorithm. </h3>
        <p>
          The algorithm that A.D.A. weaves is 
          an <a href="https://en.wikipedia.org/wiki/Elementary_cellular_automaton"> elementary elementary cellular automaton</a> where 
          the rule to determine the state of a cell in the next generation depends only on its current state and its two immediate neighbors.
        </p>
        <p>
          We start from a random state, and then cycle through a selection of rules  based on the kind of shape they give every <strong>24</strong> rows.
        </p>
        <p>
          Those rules are #{ rules.join(", #")}, according to Stephen Wolfram.
          If at any stage the next generation would have less than an octave of any color, we force a new random state to keep the weave feasible.
        </p>
        <p>Transformations of rule (<strong>#{rule}</strong>) is being applied.</p>
        <canvas className="ada-canvas" width={width} height={width} ref={canvasRef} ></canvas>
        <button onClick={downloadPunchcard}>Download Punchcard</button>
        <button onClick={downloadColorSvg}>Download Preview</button>
      </Layout>
    )

}

export default AdaPage

