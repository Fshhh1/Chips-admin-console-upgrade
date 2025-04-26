
async function getKeyMaterial(password) {
  let enc = new TextEncoder();
  return crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
}

async function getKey(password) {
  const keyMaterial = await getKeyMaterial(password);
  return crypto.subtle.deriveKey({
    name: "PBKDF2",
    salt: new TextEncoder().encode("chips_vault_salt"),
    iterations: 100000,
    hash: "SHA-256",
  }, keyMaterial, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
}

async function encryptVault(vaultData, password) {
  const vaultJson = JSON.stringify(vaultData);
  const enc = new TextEncoder();
  const encodedVault = enc.encode(vaultJson);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey(password);
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encodedVault);
  const blob = new Blob([iv, new Uint8Array(ciphertext)], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "vault.json.enc";
  a.click();
  URL.revokeObjectURL(url);
}

function exportEncryptedVault() {
  if (!vault || vault.length === 0) {
    alert("Vault is empty.");
    return;
  }
  const password = prompt("Enter encryption password for this vault:");
  if (password) {
    encryptVault(vault, password);
  }
}
