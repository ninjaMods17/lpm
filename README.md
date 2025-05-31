
<div align="center">
  <img src="https://i.ibb.co/nNwZXnp4/file-00000000c3ec61f9bd274e6f3081d9ac.png" alt="LPM Logo" width="150"/>
  <h1>🐾 Lynx Package Manager (LPM) v1.1.0</h1>
  <p><strong>Crafted in the shadows by Ninja Shadow</strong> 🥷</p>
  <p>A fast, agile, and modern Node.js package manager inspired by the speed of a lynx! 🚀</p>
  <p>
    <a href="https://lpmjs.org"><span>🌐 Official Website</span></a> •
    <a href="https://github.com/ninjaMods17/lpm"><span>📂 GitHub</span></a> •
    <a href="mailto:emailhost36@gmail.com"><span>📧 Contact</span></a>
  </p>
</div>

---

## 🐾 What is LPM?

**Lynx Package Manager (LPM)** is the tool you never knew you needed! 😎 Built for Node.js developers, LPM combines **simplicity**, **speed**, and a dash of ninja style to manage dependencies. With a colorful CLI, vibrant progress bars, and support for multiple simultaneous installs, it's perfect for projects on **Termux** or any environment. Inspired by npm and Yarn, but with the agility of a lynx, LPM uses the trusty `package.json` to keep things organized.

**Why choose LPM?**
- 🟢 **Lynx-fast**: Blazing fast installs with progress bars (20%, 50%, 100%).
- 🎨 **Ninja style**: Colorful outputs with emojis 🐾 and ANSI (green, cyan, red).
- 📦 **Flexible**: Install one or multiple packages at once (`lpm install axios cheerio`).
- 🛠️ **Built on Termux**: Lightweight and ideal for mobile and desktop developers.

---

## 🚀 Installation

1. **Requirements**:
   - Node.js installed. Download from [nodejs.org](https://nodejs.org) if needed.
   - A terminal ready for action (Termux is Ninja Shadow's favorite! 😉).

2. **Install LPM**:
   - Clone the repo and install globally:
     ```bash
     git clone https://github.com/ninjaMods17/lpm.git
     cd lpm
     npm install
     npm link
     ```
   - Coming soon to npm: `npm install -g lpm` (stay tuned!).

3. **Test installation**:
   ```bash
   lpm --version
   ```

---

## 🛠️ Commands

LPM is simple yet powerful. Here are the available commands — all with a ninja touch:

### `lpm init`

**Description**: Initializes a new project with a `package.json`.  
**Options**: `-y`, `--yes` to use default values (no prompts).  
**Example**:
```bash
lpm init -y
```
**Output**:
```
[🐾] lpm v1.1.0
[✓] package.json created with default values!
```
> Note: 🐾 and ✓ in green, ⚡ in cyan.

---

### `lpm install`

**Description**: Installs all dependencies from `package.json`.  
**Example**:
```bash
lpm install
```
**Output**:
```
[🐾] lpm v1.1.0
[⚡] Cache progress: 20% | ██       
[⚡] Installing 1 package...
[⚡] Cache progress: 50% | █████    
[✓] Downloaded and extracted: axios@1.9.0
[⚡] Cache progress: 100% | ██████████
[✓] Dependencies installed in 0.8s
```

---

### `lpm install <package...>`

**Description**: Installs one or more packages and adds them to `package.json`.  
**Example**:
```bash
lpm install axios cheerio
```
**Output**:
```
[🐾] lpm v1.1.0
[⚡] Cache progress: 20% | ██       
[⚡] Installing 2 packages: axios, cheerio...
[⚡] Cache progress: 50% | █████    
[✓] Downloaded and extracted: axios@1.9.0
[✓] Downloaded and extracted: cheerio@1.0.0
[⚡] Cache progress: 100% | ██████████
[✓] axios, cheerio installed and added to package.json!
```

---

### `lpm start`

**Description**: Runs the `start` script from `package.json`.  
**Example**:
```bash
lpm start
```
**Output**:
```
[🐾] lpm v1.1.0
[⚡] Running: node index.js
Hello, world! Running with lpm!
[✓] Script executed successfully!
```

---

### `lpm help`

**Description**: Displays help information for commands.  
**Example**:
```bash
lpm help
```
**Output**:
```
[🐾] lpm v1.1.0
Lynx Package Manager (lpm) - Help
Usage: lpm <command> [options]
```

---

### `lpm --version` or `lpm -v`

**Description**: Shows the LPM version.  
**Example**:
```bash
lpm --version
```
**Output**:
```
1.1.0
```

---

## 🌟 Getting Started

Follow these steps to unleash the lynx power in your project:

1. Create a project:
```bash
lpm init -y
```

2. Install packages:
```bash
lpm install axios cheerio
```

3. Create an `index.js`:
```js
console.log("Hello, LPM! 🐾");
```

4. Run:
```bash
lpm start
```

Need help?
```bash
lpm help
```

---

## 🥷 Why LPM is Different

Developed by Ninja Shadow on Termux, LPM is more than just a package manager — it's an experience! 😼

- Unique style: Emojis 🐾, vibrant colors, and progress bars that make you smile.
- Multi-package installs: Install several packages at once (`lpm install axios cheerio`).
- Lightweight and agile: Perfect for environments like Termux, with no heavy dependencies.
- Community-driven: Made for developers who want to code with style.

---

## 🤝 Contribute

LPM is an evolving project, built in the shadows but open to the light of the community! 🌌  
Report issues or suggest features on GitHub.

Want to contribute? Fork the repo, submit a PR, and join the adventure!

Questions? Email: emailhost36@gmail.com

---

## 📜 License

MIT License. See the LICENSE file for details.
