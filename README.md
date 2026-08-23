<div align="center">
  <img 
    src="./docs/assets/Sky_Technical_Intelligence_Brief.png" 
    alt="SKY Technical Intelligence Brief Telemetry Dashboard" 
    style="border-radius: 8px; border: 1px solid #30363D; box-shadow: 0 8px 24px rgba(0,0,0,0.6); max-width: 100%;"
  />
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active_Telemetry-00E676?style=flat-square&logo=statuspage&logoColor=white" />
  <img src="https://img.shields.io/badge/Cadence-3x_Daily-00B4D8?style=flat-square" />
  <img src="https://img.shields.io/badge/License-MIT-FFAA00?style=flat-square" />
  <img src="https://img.shields.io/badge/Deployment-GitHub_Pages-58A6FF?style=flat-square&logo=githubpages&logoColor=white" />
</p>

# SKY TECHNICAL INTELLIGENCE BRIEF (SKY-TIB)

An automated, high-density technical intelligence telemetry portal tracking 3D platforms, scientific computing, graphics pipelines, digital asset provenance, and production compute infrastructure for VFX, gaming, and digital entertainment pipelines.

---

## 1. System Architecture & Methodology

SKY-TIB operates on an asynchronous static decoupled architecture:
1. **Ingestion Runners**: Python workers query upstream APIs, RSS feeds, commit tracks, and academic indices (arXiv `cs.GR`/`cs.CV`, ASWF repositories, Academy Software Foundation, Khronos Group, Hugging Face, Epic Games).
2. **Deterministic Normalization**: Telemetry data is parsed, deduplicated, and mapped into structured JSON schemas (`src/data/sky_tib_*.json`).
3. **Static Telemetry Interface**: A Vite/React client renders the data via a terminal-styled interface designed for rapid technical parsing.
4. **CI/CD Orchestration**: GitHub Actions runs scheduled cron jobs (3x daily: 06:00, 14:00, 22:00 UTC) to fetch updates, commit fresh payloads, and rebuild GitHub Pages statically at zero cloud hosting cost.

---

## 2. Core Functional Modules

* **Compound Impact Analysis**: Synthesizes cross-cutting disruptions (e.g., neural geometry extraction intersecting with serverless GPU grant allocations).
* **Dynamic Metric Tracks**: Live progress bars tracking daily severity levels (`SEV-1 Disruptive`, `OPP-1 High Yield`, `SEV-2 Elevated`, `OPP-2 Nominal`) paired with contextual driver annotations.
* **Cross-Industry Impact Snapshot**: Itemized operational consequences mapped across VFX, Virtual Production, Games, XR, and Digital Asset Provenance.
* **Deep Telemetry Desks (Sections 1–5)**:
  * *1. Research & Open Standards*: Academic paper telemetry with lineage tree mapping and compute profiling.
  * *2. Infrastructure & Commit Watch*: Open-source standard watchlists (OpenUSD, MaterialX, OpenVDB).
  * *3. Compute & TTE Matrix*: Developer GPU quotas, sandbox credits, and cost-avoidance thresholds.
  * *4. Grants & Talent Desks*: Grant deadlines and Lead Pipeline TD / Research Scientist job openings.
  * *5. Operational Directives*: Actionable briefing scripts tailored for Leadership, Finance, and Engineering.

---

## 3. Production Use Cases

* **Pipeline Technical Directors (TDs)**: Monitor breaking schema rewrites, Hydra render delegate updates, and upstream DCC commit branches.
* **R&D Engineers & Research Scientists**: Track state-of-the-art reconstructive algorithms (3DGS, neural implicit solvers) with verified open code/weights.
* **Studio Operations & Finance**: Monitor active GPU grant programs (Hugging Face ZeroGPU, Google Cloud Sandbox, Modal/Fal.ai) to eliminate compute overages.

---

## 4. Local Development & Deployment

### Prerequisites
* Node.js 20+
* Python 3.10+ with `Pillow` and `requests`

### One-Click Onboarding (Windows)
After cloning, run `setup.bat`:
```cmd
setup.bat
```

### Manual Setup & Execution
```bash
# Clone the repository
git clone https://github.com/skyvalenti/sky-tech-brief.git
cd sky-tech-brief

# Install dependencies
npm install
pip install Pillow requests

# Fetch latest telemetry and start the local server
python scripts/fetch_sky_tib.py
npm run dev
```

### Building for Production

```bash
npm run build
```
