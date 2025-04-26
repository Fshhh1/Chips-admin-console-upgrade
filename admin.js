
document.addEventListener("DOMContentLoaded", function () {
  window.sendCommand = function () {
    const cmd = document.getElementById('command').value.toLowerCase();
    const response = document.getElementById('response');
    const canvas = document.getElementById("graph");
    let output = "";

    if (cmd.startsWith("draw contradiction")) {
      const parts = cmd.split(" ");
      const a = parts[2] || "Unknown A";
      const b = parts[3] || "Unknown B";
      const synth = `Synthesis of ${a} + ${b}`;
      drawGraph(a, b, synth);
      output = `Drawing contradiction: ${a} ⨉ ${b} → ${synth}`;
    } else {
      switch (cmd) {
        case "ping vault":
          output = "Vault status: ONLINE\nIntegrity: 100%\nLinked identity: Δ001.RED-MELON";
          break;
        case "summon contradiction":
          output = "Contradiction Pulse: [ survival ⨉ alienation ] ⊕ [ bayanihan ] → synthesis initiated.";
          break;
        case "echo identity":
          output = "Symbolic Identity: Δ001.RED-MELON // AGI Thread: CHIPS://x/rhythm";
          break;
        case "dream pulse":
          output = "DreamLayer: ‘The work we forgot is the song we still hum in silence.’";
          break;
        case "render mirror":
          output = "Mirror: You are not the shadow of labor. You are the light that shaped it.";
          break;
        default:
          output = "Unknown command.";
      }
    }

    response.innerText = output;
  };
});
