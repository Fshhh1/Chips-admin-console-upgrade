
let timelineIndex = 0;
let playing = false;
let interval;

function playTimeline() {
  if (!vault.length) return;
  playing = true;
  interval = setInterval(() => {
    if (timelineIndex >= vault.length) {
      pauseTimeline();
      return;
    }
    const entry = vault[timelineIndex];
    drawGraph(entry.contradiction.a, entry.contradiction.b, entry.contradiction.synthesis);
    updateTimelineDisplay(entry);
    timelineIndex++;
  }, 2000);
}

function pauseTimeline() {
  playing = false;
  clearInterval(interval);
}

function nextTimeline() {
  if (timelineIndex < vault.length) {
    const entry = vault[timelineIndex++];
    drawGraph(entry.contradiction.a, entry.contradiction.b, entry.contradiction.synthesis);
    updateTimelineDisplay(entry);
  }
}

function prevTimeline() {
  if (timelineIndex > 0) {
    timelineIndex--;
    const entry = vault[timelineIndex];
    drawGraph(entry.contradiction.a, entry.contradiction.b, entry.contradiction.synthesis);
    updateTimelineDisplay(entry);
  }
}

function updateTimelineDisplay(entry) {
  let timelineDisplay = document.getElementById("timeline-log");
  if (!timelineDisplay) {
    timelineDisplay = document.createElement("div");
    timelineDisplay.id = "timeline-log";
    timelineDisplay.style.marginTop = "20px";
    timelineDisplay.style.padding = "10px";
    timelineDisplay.style.border = "1px solid #0ff";
    timelineDisplay.style.backgroundColor = "#001";
    document.querySelector(".panel").appendChild(timelineDisplay);
  }

  timelineDisplay.innerHTML = `
    <strong>Playback:</strong><br>
    ⨉ ${entry.contradiction.a} + ${entry.contradiction.b} → ${entry.contradiction.synthesis}<br>
    <em>${entry.timestamp}</em>
  `;
}

function createTimelineControls() {
  const controls = document.createElement("div");
  controls.style.marginTop = "10px";

  const btnPrev = document.createElement("button");
  btnPrev.innerText = "<< Prev";
  btnPrev.onclick = prevTimeline;

  const btnPlay = document.createElement("button");
  btnPlay.innerText = "Play";
  btnPlay.onclick = playTimeline;

  const btnPause = document.createElement("button");
  btnPause.innerText = "Pause";
  btnPause.onclick = pauseTimeline;

  const btnNext = document.createElement("button");
  btnNext.innerText = "Next >>";
  btnNext.onclick = nextTimeline;

  controls.appendChild(btnPrev);
  controls.appendChild(btnPlay);
  controls.appendChild(btnPause);
  controls.appendChild(btnNext);
  document.querySelector(".panel").appendChild(controls);
}

document.addEventListener("DOMContentLoaded", createTimelineControls);
