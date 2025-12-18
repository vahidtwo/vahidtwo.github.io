const command = document.getElementById('command');
const output = document.getElementById('output');
const prompt = document.querySelector('.prompt');

const commandHistory = [];
let historyIndex = -1;

prompt.textContent = '❯ ';

const commands = {
    help: `
Available commands:
  <span class="command-name">about</span>      - About me
  <span class="command-name">skills</span>     - My skills
  <span class="command-name">work</span>       - My work experience
  <span class="command-name">projects</span>   - My open source projects
  <span class="command-name">contact</span>    - How to contact me
  <span class="command-name">clear</span>      - Clear the terminal
    `,
    about: `
Vahid Imanian
Senior Back-end Developer

Skilled backend developer with 7+ years of experience. Love solving challenging problems, finding the best solutions, improving my skills, collaborating with teammates, and eager to learn new technologies. A cheerful individual with a friendly attitude.
    `,
    skills: `
**Programming Languages:**
- Python (Advanced)

**Web Frameworks & Libraries:**
- Django, Django REST Framework (DRF)
- FastAPI

**Databases:**
- PostgreSQL, MySQL, Redis

**DevOps & Cloud:**
- Docker, Kubernetes (K8S)
- Linux
- RabbitMQ

**Architectural & Methodologies:**
- Test-Driven Development (TDD)
- Object-Oriented Programming (OOP)
- Concurrency
- System Design
- Microservices, CQRS, SAGA
- Auth Mechanisms

**Tools & Other:**
- Elastic
- gRPC
    `,
    work: `
**Backend Developer @ TOMAN (11/2023 - Present)**
- Engineered and deployed critical financial solutions, including IPG payment refunds and Wallet functionality, while collaborating across four different B2C and B2B teams. Played the main role in resolving five major system-wide disasters.
- Spearheaded performance optimization for a critical, complex query, reducing memory usage from 32MB to 68KB and execution time from 1.8 seconds to 0.013 seconds by leveraging database aggregation over a less efficient Python approach.
- As a core member of the Reconciliation Team, developed and implemented a new logic framework to track company-wide transfers and match them with bank statements, achieving a 99.8% matching success rate across six distinct matching strategies.

**Backend Developer @ Bernetco (01/2023 - 11/2023)**
- Developed a Django admin project featuring interactive maps and charts, and optimized report response time by 70% using aggregation tables.
- Created a comprehensive Agile-based task and time management program, including task workflows, time entries, Git workflow integration, and various charts implemented using Elasticsearch.
- Design and implement two project in health and delivery topics.

**Software and junior DevOps Engineer @ Plasco (09/2021 - 01/2023)**
- Refactored codebase to enhance SOLID principles and improve coupling and cohesion. Transitioned development process to Test-Driven Development (TDD).
- Dockerized, implemented Github CI/CD, TLS, HAProxy, etc.
- Redesigned database architecture, normalized tables, and improved query time execution by 30%.
- Deployed solutions across 8+ petrochemical companies.

**Backend Developer @ Snapp CarFix (04/2020 - 04/2021)**
- Developed and delivered APIs for Agents and ServiceCenters and Store apps with Python, Django, DRF, RabbitMQ, Celery, and Postgresql.
- Created Agents app, making data gathering 80% faster and completely paperless.
    `,
    projects: `
**VUID (Vahid Unique Identifier)**
- **Description:** A Python package designed to generate Vahid Unique Identifiers (VUIDs) based on a custom epoch time and a base-62 encoding scheme.
- **Tech Stack:** Python

**FastCrawler**
- **Description:** An easy-to-use Python framework for creating spiders for crawling, featuring a scheduler, UI, and CLI.
- **Tech Stack:** Python

**PicDicer (2018)**
- **Description:** A project focused on redrawing given pictures using a vast amount of dices.
- **Tech Stack:** Python, Qt, Pillow
    `,
    contact: `
You can reach me at:
- Email: <a href="mailto:vahidtwo@gmail.com">vahidtwo@gmail.com</a>
- LinkedIn: <a href="https://www.linkedin.com/in/vahidtwo" target="_blank">linkedin.com/in/vahidtwo</a>
- GitHub: <a href="https://github.com/vahidtwo" target="_blank">github.com/vahidtwo</a>
- Telegram: <a href="https://t.me/vahidtwo" target="_blank">t.me/vahidtwo</a>
    `
};

function processCommand(cmd) {
    const commandOutput = document.createElement('div');
    commandOutput.classList.add('command-output');

    const commandLine = document.createElement('div');
    commandLine.classList.add('command-line');
    commandLine.innerHTML = `<span class="prompt">❯ </span>${cmd}`;

    const outputContent = document.createElement('div');
    outputContent.classList.add('output-content');

    if (cmd === 'clear') {
        output.innerHTML = '';
        return;
    }

    if (commands[cmd]) {
        if (typeof commands[cmd] === 'function') {
            outputContent.innerHTML = commands[cmd]();
        } else {
            outputContent.innerHTML = commands[cmd];
        }
    } else {
        outputContent.innerHTML = `<span class="error">command not found: ${cmd}</span>`;
    }

    commandOutput.appendChild(commandLine);
    commandOutput.appendChild(outputContent);
    output.appendChild(commandOutput);

    terminal.scrollTop = terminal.scrollHeight;
}

command.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const cmd = command.value.trim();
        if (cmd !== '') {
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
            processCommand(cmd);
        }
        command.value = '';
    } else if (e.key === 'ArrowUp') {
        if (historyIndex > 0) {
            historyIndex--;
            command.value = commandHistory[historyIndex];
            e.preventDefault();
        }
    } else if (e.key === 'ArrowDown') {
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            command.value = commandHistory[historyIndex];
            e.preventDefault();
        } else {
            historyIndex = commandHistory.length;
            command.value = '';
            e.preventDefault();
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = command.value.trim();
        const availableCommands = Object.keys(commands);
        const matches = availableCommands.filter(c => c.startsWith(input));

        if (matches.length === 1) {
            command.value = matches[0];
        } else if (matches.length > 1) {
            processCommand(input);
            const outputContent = output.lastChild.querySelector('.output-content');
            outputContent.innerHTML = matches.join('   ');
            terminal.scrollTop = terminal.scrollHeight;
        }
    }
});

window.onload = function() {
    processCommand('help');
    command.focus();
}

window.addEventListener('click', function(e) {
    if (e.target !== command) {
        command.focus();
    }
});
