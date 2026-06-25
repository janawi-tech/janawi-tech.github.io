document.addEventListener("DOMContentLoaded", () => {
    const terminalBody = document.getElementById("terminal-body");
    const terminalInput = document.getElementById("terminal-input");
    
    if (!terminalBody || !terminalInput) return;

    // Focus input on terminal click
    const terminalContainer = document.querySelector(".terminal-container");
    if (terminalContainer) {
        terminalContainer.addEventListener("click", () => {
            terminalInput.focus();
        });
    }

    const commandHistory = [];
    let historyIndex = -1;

    // CLI Commands
    const commands = {
        help: () => `Available commands:
  <span class="text-accent">about</span>     - Brief info about Muhammad Janawi
  <span class="text-accent">skills</span>    - IT & Networking skills matrix
  <span class="text-accent">projects</span>  - Recent managed projects & works
  <span class="text-accent">contact</span>   - Contact channels & social links
  <span class="text-accent">ping</span>      - Simulates pinging the server
  <span class="text-accent">clear</span>     - Clear the terminal screen
  <span class="text-accent">help</span>      - Show this help menu`,
        
        about: () => `Muhammad Janawi - IT Network Engineer & IT System Analyst.
Over 4 years of experience managing IT infrastructures, networking devices, servers, and security.
Currently contributing to LPAFK Banjarbaru & RSU Permata Husada.`,
        
        skills: () => `Network Engineering:
  - Mikrotik, Cisco Switching & Routing, OSPF, VPN, VLAN
  - Load Balancing, QoS, Firewall, Network Security
Infrastructure & Systems:
  - Windows/Linux Server Admin, Database (MySQL/PostgreSQL)
  - CCTV Deployments, Hardware & Software Troubleshooting`,
        
        projects: () => `Key Managed Projects:
  1. <span class="text-accent">PT. ERA BITS INDONESIA</span> (erabits-indonesia.com) - IT Solutions Provider
  2. <span class="text-accent">BPFK Banjarbaru</span> (bpfk-banjarbaru.org) - Official Website & Portal
  3. <span class="text-accent">RSU Permata Husada</span> (rspermatahusadabjb.com) - Hospital Portal Management`,
        
        contact: () => `Get in touch:
  - Email:    muhammad.janawi99@gmail.com
  - WhatsApp: 0822-6197-3993
  - Address:  Banjarbaru, South Kalimantan, Indonesia
  - LinkedIn: linkedin.com/in/janawi-erabits/`,
        
        ping: (args) => {
            const host = args[0] || "janawi.tech";
            let output = `PING ${host} (103.146.244.12) 56(84) bytes of data.\n`;
            for (let i = 1; i <= 3; i++) {
                const time = (Math.random() * 2 + 10).toFixed(3);
                output += `64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${time} ms\n`;
            }
            output += `--- ${host} ping statistics ---\n`;
            output += `3 packets transmitted, 3 received, 0% packet loss, time 2003ms`;
            return output;
        },
        
        clear: () => {
            terminalBody.innerHTML = "";
            return "";
        }
    };

    // Print initial greetings
    const welcomeText = `Welcome to Janawi-OS v1.0.0 (Type <span class="text-accent">'help'</span> to start)
System status: <span class="text-success">ONLINE</span>
Connection: <span class="text-success">SECURE</span>`;
    printOutput("", welcomeText);

    // Event listener for commands
    terminalInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const fullInput = terminalInput.value.trim();
            const parts = fullInput.split(" ");
            const cmd = parts[0].toLowerCase();
            const args = parts.slice(1);

            if (fullInput) {
                commandHistory.push(fullInput);
                historyIndex = commandHistory.length;
            }

            let output = "";
            if (cmd) {
                if (commands[cmd]) {
                    output = commands[cmd](args);
                } else {
                    output = `bash: command not found: ${cmd}. Type <span class="text-accent">'help'</span> for a list of available commands.`;
                }
            }

            if (cmd !== "clear") {
                printOutput(fullInput, output);
            } else {
                commands.clear();
            }

            terminalInput.value = "";
            terminalBody.scrollTop = terminalBody.scrollHeight;
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = "";
            }
        }
    });

    function printOutput(input, output) {
        const cmdLine = document.createElement("div");
        cmdLine.className = "terminal-line";
        if (input !== "") {
            cmdLine.innerHTML = `<span class="terminal-prompt">guest@janawi-tech:~$</span> <span class="terminal-cmd">${escapeHTML(input)}</span>`;
            terminalBody.appendChild(cmdLine);
        }

        if (output) {
            const outLine = document.createElement("div");
            outLine.className = "terminal-output";
            outLine.innerHTML = output;
            terminalBody.appendChild(outLine);
        }
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
