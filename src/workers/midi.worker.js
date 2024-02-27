"use strict"

let timerID
let interval = 50
let queue = []
let queuedData = 0

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function enqueue(data) {
  let index = queuedData
  let start = performance.now()
  queuedData++
  await sleep(interval * index)
  let elapsed = performance.now() - start
  queuedData--
  let pending = interval * queuedData
  return { index, data, elapsed, pending }
}

//timerID=setInterval(function(){postMessage("tick");},interval)

// console.log(self,self.onmessage)

/*
self.onmessage=function(e){
	if (e.data=="start") {
		console.log("starting");

	}
	else if (e.data.interval) {
		console.log("setting interval");
		interval=e.data.interval;
		console.log("interval="+interval);
		if (timerID) {
			clearInterval(timerID);
			timerID=setInterval(function(){postMessage("tick");},interval)
		}
	}
	else if (e.data=="stop") {
		console.log("stopping");
		clearInterval(timerID);
		timerID=null;
	}
};
*/
