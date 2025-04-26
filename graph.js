
function drawGraph(a, b, c) {
  let canvas = document.getElementById("graph");
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = "graph";
    canvas.width = 500;
    canvas.height = 300;
    canvas.style.border = "1px solid #0f0";
    document.querySelector(".panel").appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  const nodes = [
    { id: a, x: 100, y: 150 },
    { id: b, x: 400, y: 150 },
    { id: c, x: 250, y: 50 }
  ];

  const edges = [
    { from: a, to: b },
    { from: a, to: c },
    { from: b, to: c }
  ];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0f0";
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.fillText(node.id, node.x, node.y + 4);
    ctx.fillStyle = "#0f0";
  });

  ctx.strokeStyle = "#0ff";
  edges.forEach(edge => {
    const from = nodes.find(n => n.id === edge.from);
    const to = nodes.find(n => n.id === edge.to);
    if (from && to) {
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
  });
}
