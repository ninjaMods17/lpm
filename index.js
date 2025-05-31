#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const tar = require('tar');
const { program } = require('commander');

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

program
  .version('1.1.0', '-v, --version', 'Display the version of Lynx Package Manager')
  .description('Lynx Package Manager (lpm) for Node.js');

program
  .command('init')
  .description('Initialize a new project with package.json')
  .option('-y, --yes', 'Use default values, skip prompts')
  .action(async (options) => {
    try {
      console.log(`${COLORS.green}[🐾] lpm v1.1.0${COLORS.reset}`);
      const pkgJson = {
        name: path.basename(process.cwd()),
        version: '1.0.0',
        description: '',
        main: 'index.js',
        scripts: {
          start: 'node index.js',
          test: 'echo "Error: no test specified" && exit 1'
        },
        author: '',
        license: 'ISC'
      };
      if (options.yes) {
        await fs.writeFile('package.json', JSON.stringify(pkgJson, null, 2));
        console.log(`${COLORS.green}[✓] package.json created with default values!${COLORS.reset}`);
      } else {
        console.log(`${COLORS.cyan}[⚡] Interactive prompt would go here...${COLORS.reset}`);
        await fs.writeFile('package.json', JSON.stringify(pkgJson, null, 2));
        console.log(`${COLORS.green}[✓] package.json created! Edit as needed.${COLORS.reset}`);
      }
    } catch (error) {
      console.error(`${COLORS.red}[✗] Error creating package.json: ${error.message}${COLORS.reset}`);
    }
  });

program
  .command('install [packages...]')
  .description('Install dependencies from package.json or specific packages')
  .action(async (packages) => {
    try {
      console.log(`${COLORS.green}[🐾] lpm v1.1.0${COLORS.reset}`);
      const startTime = Date.now();
      const pkgPath = path.join(process.cwd(), 'package.json');
      const pkgJson = JSON.parse(await fs.readFile(pkgPath, 'utf-8'));

      const modulesDir = path.join(process.cwd(), 'node_modules');
      await fs.mkdir(modulesDir, { recursive: true });

      console.log(`${COLORS.cyan}[⚡] Packages cached: 20% | ██       ${COLORS.reset}`);
      await new Promise(resolve => setTimeout(resolve, 200));

      if (packages.length > 0) {
        console.log(`${COLORS.cyan}[⚡] Installing ${packages.length} package${packages.length > 1 ? 's' : ''}: ${packages.join(', ')}...${COLORS.reset}`);
        console.log(`${COLORS.cyan}[⚡] Packages cached: 50% | █████    ${COLORS.reset}`);
        await new Promise(resolve => setTimeout(resolve, 200));

        await Promise.all(packages.map(async (packageName) => {
          await installPackage(packageName, modulesDir, pkgJson);
          pkgJson.dependencies = pkgJson.dependencies || {};
          pkgJson.dependencies[packageName] = '^' + (await getLatestVersion(packageName));
        }));

        await fs.writeFile(pkgPath, JSON.stringify(pkgJson, null, 2));
        console.log(`${COLORS.cyan}[⚡] Packages cached: 100% | ██████████${COLORS.reset}`);
        console.log(`${COLORS.green}[✓] ${packages.join(', ')} installed and added to package.json!${COLORS.reset}`);
      } else {

        const dependencies = pkgJson.dependencies || {};
        const depCount = Object.keys(dependencies).length;
        if (depCount === 0) {
          console.log(`${COLORS.green}[✓] No dependencies to install!${COLORS.reset}`);
          return;
        }
        console.log(`${COLORS.cyan}[⚡] Installing ${depCount} package${depCount > 1 ? 's' : ''}...${COLORS.reset}`);
        console.log(`${COLORS.cyan}[⚡] Packages cached: 50% | █████    ${COLORS.reset}`);
        await new Promise(resolve => setTimeout(resolve, 200));

        await Promise.all(Object.entries(dependencies).map(async ([pkg, version]) => {
          await installPackage(pkg, modulesDir, pkgJson);
        }));

        console.log(`${COLORS.cyan}[⚡] Packages cached: 100% | ██████████${COLORS.reset}`);
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);
        console.log(`${COLORS.green}[✓] Dependencies installed in ${duration}s${COLORS.reset}`);
      }
    } catch (error) {
      console.error(`${COLORS.red}[✗] Error during installation: ${error.message}${COLORS.reset}`);
    }
  });

program
  .command('start')
  .description('Run the "start" script from package.json')
  .action(async () => {
    try {
      console.log(`${COLORS.green}[🐾] lpm v1.1.0${COLORS.reset}`);
      const pkgPath = path.join(process.cwd(), 'package.json');
      const pkgJson = JSON.parse(await fs.readFile(pkgPath, 'utf-8'));
      const startScript = pkgJson.scripts?.start;
      if (!startScript) {
        throw new Error('No "start" script found in package.json!');
      }
      console.log(`${COLORS.cyan}[⚡] Running: ${startScript}${COLORS.reset}`);
      const { exec } = require('child_process');
      exec(startScript, (error, stdout, stderr) => {
        if (error) {
          console.error(`${COLORS.red}[✗] Error executing script: ${error.message}${COLORS.reset}`);
          return;
        }
        console.log(stdout);
        if (stderr) console.error(`${COLORS.red}[✗] ${stderr}${COLORS.reset}`);
        console.log(`${COLORS.green}[✓] Script executed successfully!${COLORS.reset}`);
      });
    } catch (error) {
      console.error(`${COLORS.red}[✗] Error: ${error.message}${COLORS.reset}`);
    }
  });

program
  .command('help')
  .description('Display help information for lpm commands')
  .action(() => {
    console.log(`${COLORS.green}[🐾] lpm v1.1.0${COLORS.reset}`);
    console.log('Lynx Package Manager (lpm) - Command Help');
    console.log('Usage: lpm <command> [options]');
    console.log('');
    console.log('Available Commands:');
    console.log('  init           Initialize a new project with package.json');
    console.log('    -y, --yes    Use default values, skip prompts');
    console.log('  install        Install all dependencies from package.json');
    console.log('  install <pkg...>  Install specific packages (e.g., lpm install axios cheerio)');
    console.log('  start          Run the "start" script from package.json');
    console.log('  help           Display this help information');
    console.log('  -v, --version  Display the version of Lynx Package Manager');
    console.log('');
    console.log('Examples:');
    console.log('  lpm init -y                Create package.json with defaults');
    console.log('  lpm install axios cheerio  Install multiple packages');
    console.log('  lpm start                  Run the start script');
    console.log('For more info, visit: https://lpmjs.vercel.app');
  });

async function getLatestVersion(pkg) {
  try {
    const response = await axios.get(`https://registry.npmjs.org/${pkg}`);
    return response.data['dist-tags'].latest;
  } catch (error) {
    throw new Error(`Failed to fetch version for ${pkg}: ${error.message}`);
  }
}

async function installPackage(pkg, modulesDir, pkgJson) {
  try {
    const version = pkgJson.dependencies?.[pkg] || (await getLatestVersion(pkg));
    const cleanVersion = version.replace(/^[~^]/, '');
    const response = await axios.get(`https://registry.npmjs.org/${pkg}`);
    const tarballUrl = response.data.versions[cleanVersion]?.dist?.tarball;
    if (!tarballUrl) {
      throw new Error(`Version ${version} of ${pkg} not found!`);
    }

    const tarballResponse = await axios.get(tarballUrl, { responseType: 'stream' });
    const tarballPath = path.join(modulesDir, `${pkg}-${cleanVersion}.tgz`);
    const writer = tarballResponse.data.pipe(require('fs').createWriteStream(tarballPath));
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    const pkgDir = path.join(modulesDir, pkg);
    await fs.mkdir(pkgDir, { recursive: true });
    await tar.x({ file: tarballPath, cwd: modulesDir, strip: 1, C: pkgDir });
    await fs.unlink(tarballPath);
    console.log(`${COLORS.green}[✓] Downloaded and extracted: ${pkg}@${cleanVersion}${COLORS.reset}`);
  } catch (error) {
    console.error(`${COLORS.red}[✗] Failed to install ${pkg}: ${error.message}${COLORS.reset}`);
  }
}

program.parse(process.argv);
