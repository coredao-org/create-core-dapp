const { task } = require("hardhat/config");
const fs = require("fs");
const path = require("path");

task("copy-abi", "Copies contract ABIs to src/abi directory").setAction(
  async () => {
    // Source and destination directories
    const artifactsDir = path.join(__dirname, "..", "artifacts", "contracts");
    const abiDir = path.join(__dirname, "..", "src", "abi");

    // Ensure the destination directory exists
    if (!fs.existsSync(abiDir)) {
      fs.mkdirSync(abiDir, { recursive: true });
    }

    // Function to copy ABI from a contract artifact
    function copyAbi(contractPath) {
      try {
        const artifact = require(contractPath);
        const contractName = path.basename(contractPath, ".json");

        // Create the ABI file
        const abiPath = path.join(abiDir, `${contractName}.json`);
        fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));

        console.log(`Copied ABI for ${contractName} contract`);
      } catch (error) {
        console.error(`Error copying ABI for ${contractPath}:`, error);
      }
    }

    // Function to recursively process all contract artifacts
    function processArtifacts(dir) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          processArtifacts(fullPath);
        } else if (file.endsWith(".json") && !file.endsWith(".dbg.json")) {
          copyAbi(fullPath);
        }
      }
    }

    processArtifacts(artifactsDir);
  }
);
