#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const figlet = require("figlet");

function main() {
  const args = process.argv.slice(2);
  let projectName = args.find((arg) => !arg.startsWith("--"));
  let isHardhatOnly = args.includes("--hardhat");

  console.log(
    chalk.yellow(
      figlet.textSync("CORE DAPP", {
        font: "Standard",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );

  // If no project name provided, show usage and exit
  if (!projectName) {
    console.log(chalk.red("❌ Error: Project name is required"));
    console.log(chalk.cyan("\nUsage:"));
    console.log(chalk.white("  create-dapp-template <project-name>"));
    console.log(chalk.white("  create-dapp-template <project-name> --hardhat"));
    console.log(chalk.gray("\nExamples:"));
    console.log(chalk.white("  create-dapp-template my-dapp"));
    console.log(
      chalk.white("  create-dapp-template my-hardhat-project --hardhat")
    );
    process.exit(1);
  }

  // Validate project name
  if (!/^[a-zA-Z0-9-_]+$/.test(projectName)) {
    console.error(
      "❌ Error: Project name can only contain letters, numbers, hyphens, and underscores"
    );
    process.exit(1);
  }

  const projectPath = path.join(process.cwd(), projectName);
  if (fs.existsSync(projectPath)) {
    console.error(`❌ Error: Directory '${projectName}' already exists`);
    process.exit(1);
  }

  console.log(
    chalk.blue(
      `Creating ${
        isHardhatOnly ? "Hardhat" : "full-stack"
      } project: ${projectName}`
    )
  );

  // Copy template files
  const templatePath = path.dirname(__dirname);
  const excludeFiles = ["node_modules", ".git", "bin", projectName];

  if (isHardhatOnly) {
    excludeFiles.push(
      "src",
      "next.config.js",
      "next-env.d.ts",
      "tsconfig.json",
      ".eslintrc.json"
    );
  }

  copyDir(templatePath, projectPath, excludeFiles);

  // Update package.json
  const pkgPath = path.join(projectPath, "package.json");
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    pkg.name = projectName;
    delete pkg.bin;

    if (isHardhatOnly) {
      pkg.scripts = {
        compile: "hardhat compile",
        test: "hardhat test",
        "deploy:testnet":
          "hardhat run scripts/deploy.js --network core_testnet2",
        "deploy:mainnet":
          "hardhat run scripts/deploy.js --network core_mainnet",
      };

      delete pkg.dependencies["@rainbow-me/rainbowkit"];
      delete pkg.dependencies["@tanstack/react-query"];
      delete pkg.dependencies["next"];
      delete pkg.dependencies["react"];
      delete pkg.dependencies["react-dom"];
      delete pkg.dependencies["react-toastify"];
      delete pkg.dependencies["viem"];
      delete pkg.dependencies["wagmi"];
      delete pkg.devDependencies["@types/react"];
      delete pkg.devDependencies["eslint-config-next"];
      delete pkg.devDependencies["typescript"];
    }

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  } catch (error) {
    console.error("❌ Error updating package.json:", error.message);
    process.exit(1);
  }

  if (isHardhatOnly) {
    const envExample = `PRIVATEKEY=your_private_key_here\nCORE_TEST2_SCAN_KEY=your_api_key\nCORE_MAIN_SCAN_KEY=your_api_key\n`;
    fs.writeFileSync(path.join(projectPath, ".env.example"), envExample);
  }

  console.log(`✅ ${projectName} created successfully!`);
  console.log(`\nTo proceed, run the following commands:`);
  console.log(`  cd ${projectName}`);
  console.log(`  npm install`);
  if (isHardhatOnly) {
    console.log(`  cp .env.example .env`);
    console.log(`  npm run compile`);
  } else {
    console.log(`  npm run dev`);
  }
}

function copyDir(src, dest, exclude = []) {
  try {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const files = fs.readdirSync(src);
    for (const file of files) {
      if (exclude.includes(file)) continue;

      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      if (fs.statSync(srcPath).isDirectory()) {
        copyDir(srcPath, destPath, exclude);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  } catch (error) {
    console.error(
      `❌ Error copying files from ${src} to ${dest}:`,
      error.message
    );
    throw error;
  }
}

try {
  main();
} catch (err) {
  console.error("❌ Error:", err);
  process.exit(1);
}
