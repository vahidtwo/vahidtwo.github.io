const command = document.getElementById('command');
const output = document.getElementById('output');
const terminal = document.getElementById('terminal');
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
  <span class="command-name">awards</span>     - Workshops & awards
  <span class="command-name">contact</span>    - How to contact me
  <span class="command-name">clear</span>      - Clear the terminal
    `,
    about: `
Vahid Imanian
Senior Back-end Developer

Skilled backend developer with 7+ years of experience. Love solving challenging problems, finding the best solutions, improving my skills, collaborating with teammates, and eager to learn new technologies. A cheerful individual with a friendly attitude.
    `,
    skills: `
**Core skills:**
- Redis
- Python
- Django
- TDD
- Celery
- DRF
- OOP
- Concurrency
- Linux
- Auth mechanism
- MySQL

**Familiar with:**
- Docker
- FastAPI
- Microservices
- System Design
- Elastic
- gRPC
- RabbitMQ
- K8S
- PostgreSQL
- CQRS
- SAGA
    `,
    work: `
**Senior Backend Developer @ Khodro45 (12/2025 - Present)** — Tehran
- Architected and implemented an offline finance dispute-detection system for payment and cash-out workflows, introducing idempotency controls that reduced finance dispute incidents and duplicate payments by 90%.
- Designed and developed a centralized vehicle and document delivery management system, replacing manual Excel-based operations with an automated and scalable workflow solution.
- Implemented database-level encryption for sensitive customer information, including national identification and banking data, improving platform security and protecting user financial records.
- Led technical ownership of two independent business funnels, driving system architecture, service design, code reviews, and engineering best practices across multiple teams.
- Refactored and optimized the contract management service to resolve concurrency-related issues, reducing workflow errors by 70% and improving system reliability and maintainability.
- Redesigned data models and service interactions to reduce unnecessary database lookups, improve loose coupling, and enhance overall backend performance and scalability.

**Backend Developer @ TOMAN (11/2023 - 12/2025)** — Tehran — <a href="https://toman.ir" target="_blank">toman.ir</a>
Toman aims to provide integrated financial solutions for businesses with emphasis on reliability.
- Engineered and deployed critical financial solutions, including IPG payment refunds and Wallet functionality, while collaborating across four different B2C and B2B teams. Played the main role in resolving five major system-wide disasters.
- Spearheaded performance optimization for a critical, complex query, reducing memory usage from 32MB to 68KB and execution time from 1.8 seconds to 0.013 seconds by leveraging database aggregation over a less efficient Python approach.
- As a core member of the Reconciliation Team, developed and implemented a new logic framework to track company-wide transfers and match them with bank statements, achieving a 99.8% matching success rate across six distinct matching strategies.

**Backend Developer @ Bernetco (01/2023 - 11/2023)** — Remote — <a href="https://bernetco.ir" target="_blank">bernetco.ir</a>
Bernet is a company that's trying to effectively monitor the software development process.
- Developed a Django admin project featuring interactive maps and charts, and optimized report response time by 70% using aggregation tables.
- Created a comprehensive Agile-based task and time management program, including task workflows, time entries, Git workflow integration, and various charts implemented using Elasticsearch.
- Designed and implemented two projects in health and delivery topics.

**Software and Junior DevOps Engineer @ Plasco (09/2021 - 01/2023)** — Remote
Automated management of Health and Safety Executive (HSE), focused on anomaly detection and related workflows.
- Refactored codebase to enhance SOLID principles and improve coupling and cohesion. Transitioned development process to Test-Driven Development (TDD).
- Dockerized, implemented GitHub CI/CD, TLS, HAProxy, etc.
- Redesigned database architecture, normalized tables, and improved query time execution by 30%.
- Deployed solutions across 8+ petrochemical companies.

**Backend Developer @ Snapp CarFix (04/2020 - 04/2021)** — Isfahan — <a href="https://snapcarfix.com" target="_blank">snapcarfix.com</a>
SnappCarFix is an online platform for car parts and services, backed by Snapp (an Uber clone).
- Developed and delivered APIs for Agents, ServiceCenters, and Store apps with Python, Django, DRF, RabbitMQ, Celery, and PostgreSQL.
- Created Agents app, made data gathering 80% faster and completely paperless.
    `,
    projects: `
**VUID (Vahid Unique Identifier)**
- The VUID is a Python package designed to generate Vahid unique identifiers (VUIDs) based on a custom epoch time and a base-62 encoding scheme.

**FastCrawler (06/2023 - 11/2023)**
- Team member of the FastCrawler framework. FastCrawler is an easy-to-use Python framework with scheduler, UI, and CLI features for creating spiders for crawling.

**PicDicer (2018)**
- Redrawing given pictures using a very vast amount of dices with Python, Qt, and Pillow.
    `,
    awards: `
**Python and CEH Workshops (2017)**
Award for teaching Python (18 hrs) and CEH (22 hrs) workshops, Islamic Azad University of NajafAbad.

**Network Workshop (2016)**
Award for teaching CCNA workshops (20 hrs), Islamic Azad University of NajafAbad.
    `,
    contact: `
You can reach me at:
- Email: <a href="mailto:vahidtwo@gmail.com">vahidtwo@gmail.com</a>
- Phone: <a href="tel:+989130740148">+98 913 074 0148</a>
- Location: Tehran, Iran
- LinkedIn: <a href="https://linkedin.com/in/vahidtwo" target="_blank">linkedin.com/in/vahidtwo</a>
- GitHub: <a href="https://github.com/vahidtwo" target="_blank">github.com/vahidtwo</a>
    `
};

function formatOutput(text) {
    return text.trim().replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

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
            outputContent.innerHTML = formatOutput(commands[cmd]());
        } else {
            outputContent.innerHTML = formatOutput(commands[cmd]);
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
