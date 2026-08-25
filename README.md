# SKY TECHNICAL INTELLIGENCE BRIEF (SKY-TIB)

An automated, schema-validated intelligence ingestion engine that extracts, deduplicates, and compiles continuous technical updates across computer science research and security vulnerability disclosures. Running on an automated 8-hour ingestion cadence (3x daily), the system provides high-density visibility into 3D platforms, scientific computing, graphics pipelines, digital asset provenance, and production compute infrastructure for VFX, gaming, and digital entertainment pipelines.

<p align="center">
  <img src="docs/assets/Sky_Technical_Intelligence_Brief.png" alt="Sky Technical Intelligence Brief Banner" width="100%">
</p>

<p align="center">
  <!-- Operational Status Badges -->
  <a href="https://skyvalenti.github.io/Technical-Intelligence-Brief/"><img src="https://img.shields.io/badge/Live%20Dashboard-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github" alt="Live Dashboard"></a>
  <a href="https://github.com/skyvalenti/Technical-Intelligence-Brief/actions"><img src="https://img.shields.io/badge/pytest-23%20passed-success?style=for-the-badge&logo=pytest" alt="pytest"></a>
  <a href="https://github.com/skyvalenti/Technical-Intelligence-Brief/actions"><img src="https://img.shields.io/badge/CI%2FCD-Passing-0969da?style=for-the-badge&logo=githubactions" alt="CI/CD"></a>
</p>

<p align="center">
  <!-- Stack Badges -->
  <a href="https://python.org"><img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"></a>
  <a href="https://vitejs.dev"><img src="https://img.shields.io/badge/Vite-5+-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://docs.pydantic.dev/"><img src="https://img.shields.io/badge/Pydantic-V2-E92063?style=for-the-badge&logo=pydantic&logoColor=white" alt="Pydantic"></a>
  <a href="#mode-1-zero-install-desktop-app-pwa--taskbar-mode"><img src="https://img.shields.io/badge/PWA-Enabled-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA"></a>
</p>

<p align="center">
  🔗 <strong>Live Interactive Dashboard:</strong> <a href="https://skyvalenti.github.io/Technical-Intelligence-Brief/">https://skyvalenti.github.io/Technical-Intelligence-Brief/</a><br>
  <em>Review live telemetry feeds, domain-specific vertical filters, and vulnerability advisories directly in the web client.</em>
</p>

---

## 1. System Architecture & Methodology

SKY-TIB operates on an asynchronous static decoupled architecture, running automated ingestion workers that compile validated telemetry into static frontend interfaces and machine-readable data feeds.

```text
[Upstream Feeds: arXiv / ASWF / NVD / Git]
│
▼
[src/fetchers.py]
│
▼
[src/schemas.py (Pydantic)]
│
▼
[src/deduplicate.py (Cosine Filter)]
│
▼
[src/data/sky_tib_*.json & docs/]
│
▼
[Vite/React UI & PWA Client]
```

### Core Architecture Components
* **Ingestion Runners:** Python extraction workers query upstream APIs, RSS feeds, commit tracks, and academic indices (arXiv `cs.GR`/`cs.CV`, ASWF repositories, Academy Software Foundation, Khronos Group, Hugging Face, Epic Games).
* **Deterministic Normalization:** All ingested records are strictly validated through Pydantic data schemas before persistence (`src/data/sky_tib_*.json`).
* **Semantic Deduplication:** Vector cosine similarity checks discard redundant entries against historical embeddings (>0.82 threshold).
* **Static Telemetry Interface:** A Vite/React client renders the data via a terminal-styled interface designed for rapid technical parsing.
* **CI/CD Automation:** GitHub Actions executes scheduled cron runs (3x daily: 06:00, 14:00, 22:00 UTC) to fetch updates, validate schemas, run `pytest` suites, and rebuild GitHub Pages at zero cloud hosting cost.

---

## 2. Core Functional Modules

* **Compound Impact Analysis:** Synthesizes cross-cutting disruptions (e.g., neural geometry extraction intersecting with serverless GPU grant allocations).
* **Dynamic Metric Tracks:** Tracks severity levels (`SEV-1 Disruptive`, `OPP-1 High Yield`, `SEV-2 Elevated`, `OPP-2 Nominal`) paired with contextual driver annotations.
* **Cross-Industry Impact Snapshot:** Itemized operational consequences mapped across VFX, Virtual Production, Games, XR, and Digital Asset Provenance.
* **Deep Telemetry Desks:**
  1. *Research & Open Standards:* Academic paper telemetry with lineage tree mapping and compute profiling.
  2. *Infrastructure & Commit Watch:* Open-source standard watchlists (OpenUSD, MaterialX, OpenVDB).
  3. *Compute & TTE Matrix:* Developer GPU quotas, sandbox credits, and cost-avoidance thresholds.
  4. *Grants & Talent Desks:* Grant deadlines and Lead Pipeline TD / Research Scientist job openings.
  5. *Operational Directives:* Actionable briefing scripts tailored for Leadership, Finance, and Engineering.

---

## 3. Interface & Telemetry Views

### 1. Multi-Domain Vertical Routing
Switch between discrete entertainment pipeline sectors using the top-level selector:

<div align="center">
  <img 
    src="./docs/assets/Verticals.png" 
    alt="Domain Vertical Selection" 
    style="border-radius: 6px; border: 1px solid #30363D; max-width: 60%;"
  />
</div>

---

### 2. Sector Telemetry & Engineering Desks
Provides deep operational analysis across academic literature, infrastructure commits, and compute quotas:

<div align="center">
  <img 
    src="./docs/assets/Sector_Telemetry.png" 
    alt="Technical Telemetry & Sectors View" 
    style="border-radius: 8px; border: 1px solid #30363D; box-shadow: 0 8px 24px rgba(0,0,0,0.6); max-width: 100%;"
  />
</div>

---

## 4. Production Use Cases

* **Pipeline Technical Directors (TDs):** Monitor breaking schema rewrites, Hydra render delegate updates, and upstream DCC commit branches.
* **R&D Engineers & Research Scientists:** Track state-of-the-art reconstructive algorithms (3DGS, neural implicit solvers) with verified open code/weights.
* **Studio Operations & Finance:** Monitor active GPU grant programs (Hugging Face ZeroGPU, Google Cloud Sandbox, Modal/Fal.ai) to eliminate compute overages.

---

## 5. Deployment & Execution Modes

### Mode 1: Zero-Install Desktop App (PWA / Taskbar Mode)
Operates in an isolated, borderless window with native OS integration.

* **Google Chrome:** Navigate to `https://skyvalenti.github.io/Technical-Intelligence-Brief/` → Menu (⋮) → **Cast, save, and share** → **Install page as app...** → Pin to taskbar.
* **Microsoft Edge:** Open URL → Menu (⋯) → **Apps** → **Install this site as an app** → Pin to taskbar.
* **Mozilla Firefox:** Drag the padlock icon from the address bar to the desktop, or install the [Progressive Web Apps for Firefox](https://addons.mozilla.org/en-US/firefox/addon/pwas-for-firefox/) extension.

---

### Mode 2: Local Developer Setup

#### Prerequisites
* **Node.js:** v20.x or higher (`node -v`)
* **Python:** v3.11+ (`python --version` or `py --version`)

#### Quickstart Automation
Clone the repository and run the one-click onboarding script:
```bash
git clone https://github.com/skyvalenti/Technical-Intelligence-Brief.git
cd Technical-Intelligence-Brief
setup.bat
```

#### Manual Developer Workflow
```bash
# Install frontend and backend dependencies
npm install
pip install -r requirements.txt

# Run validation and test suite
pytest tests/

# Execute telemetry ingestion
python src/pipeline.py

# Start local development server
npm run dev
```

### Building for Production
```bash
npm run build
```

---

## 6. Repository Structure

```text
├── .github/workflows/   # CI/CD automation schedules (deploy.yml, ingest.yml)
├── data/                # Machine-readable latest intelligence payload (latest.json)
├── docs/                # Rendered markdown feeds and visual assets (index.md, assets/)
├── src/
│   ├── fetchers.py      # Upstream API and feed extraction logic
│   ├── schemas.py       # Pydantic validation schemas
│   ├── deduplicate.py   # Vector cosine similarity filtering
│   ├── pipeline.py      # Pipeline orchestration and execution
│   └── data/            # Normalized JSON telemetry feeds
├── templates/           # Jinja2 markdown templates for dashboard generation
├── tests/               # Pytest suite for schema and parser validation
├── package.json         # Frontend configuration and scripts
└── requirements.txt     # Python runtime dependencies
```

---

## 7. Project Genesis & Architecture Evolution

### From Static Reports to Continuous Telemetry
The project originated from an operational bottleneck: technical stakeholders required immediate visibility into cutting-edge graphics research and security advisories, but existing industry briefs relied on static, manually compiled PDF distributions. 

Static documents introduced significant operational friction:
* **Rapid Information Decay:** Security vulnerabilities and pre-print releases lost actionable value within days of export.
* **High Maintenance Overhead:** Manual synthesis demanded recurring labor to aggregate disparate academic and security trackers.
* **Unstructured Consumption:** Critical CVE scores and compute quotas remained buried in dense narrative paragraphs.

### The Automated Pipeline Pivot
To resolve these constraints, the manual workflow was replaced with an autonomous, zero-cost data engine:
1. **Autonomous Scheduled Extraction:** Replaced manual sweeps with automated Python workers running across academic indexes, CVE disclosures, and ASWF repositories on an 8-hour schedule.
2. **Deterministic Quality Gates:** Introduced strict Pydantic validation boundaries and vector cosine deduplication to guarantee data hygiene.
3. **Decoupled Static Delivery:** Replaced the static PDF format with a terminal-styled React/Vite interface hosted on GitHub Pages, providing interactive domain filtering without recurring infrastructure costs.

---

## Technical Reference & Learning Topics

* **Standards Bodies:** [Academy Software Foundation (ASWF)](https://www.aswf.io/) | [OpenUSD Documentation](https://openusd.org/) | [MaterialX Specification](https://materialx.org/)
* **Toolchain Architecture:** [Vite Build Tool](https://vite.dev/) | [React Documentation](https://react.dev/) | [Tailwind CSS Engine](https://tailwindcss.com/)
* **CI/CD Telemetry Automation:** [GitHub Actions Workflow Documentation](https://docs.github.com/en/actions)

