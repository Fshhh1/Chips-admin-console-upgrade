
let vault = [];

function storeToVault(a, b, synthesis) {
  const timestamp = new Date().toISOString();
  const entry = {
    timestamp,
    contradiction: { a, b, synthesis }
  };
  vault.push(entry);
  updateVaultDisplay();
}

function updateVaultDisplay() {
  let log = document.getElementById("vault-log");
  if (!log) {
    log = document.createElement("div");
    log.id = "vault-log";
    log.style.marginTop = "20px";
    log.style.padding = "10px";
    log.style.border = "1px solid #0ff";
    log.style.backgroundColor = "#001";
    document.querySelector(".panel").appendChild(log);
  }

  const latest = vault.slice(-5).reverse().map(entry => {
    return `⨉ ${entry.contradiction.a} + ${entry.contradiction.b} → ${entry.contradiction.synthesis} @ ${entry.timestamp}`;
  });

  log.innerHTML = "<strong>Vault Memory:</strong><br>" + latest.join("<br>");
}
