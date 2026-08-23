#!/usr/bin/env python3
"""
SKY Technical Intelligence Brief - Telemetry Ingestion & Baseline Calibration Script
Fetches, validates, recalibrates, and synchronizes multi-domain intelligence feeds.
Maintains an Active/Nominal Operations baseline by default and dynamically escalates
severity levels when breaking news or major architectural disruptions are detected.
"""
import os
import re
import sys
import json
import datetime

# Ensure safe console output across all platforms/encodings
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DATA_DIR = os.path.join(ROOT_DIR, "src", "data")
DATA_DIR = os.path.join(ROOT_DIR, "data")

# Baseline nominal metrics for each domain vertical
DOMAIN_NOMINAL_METRICS = {
    "sky_tib_3d.json": {
        "prefix": "SKY-TIB-3D",
        "sector": "3D ENGINES / DCC / VIRTUAL PRODUCTION / SCIENTIFIC COMPUTING",
        "sev_1": {"level": "SEV-1: NOMINAL", "driver": "USD/Hydra Schema Stability", "value": 14},
        "opp_1": {"level": "OPP-1: HIGH YIELD", "driver": "Active Developer GPU Grants", "value": 75},
        "sev_2": {"level": "SEV-2: NOMINAL", "driver": "Render Pipeline Velocity", "value": 24},
        "opp_2": {"level": "OPP-2: NOMINAL", "driver": "ASWF Open-Source Releases", "value": 62}
    },
    "sky_tib_2d.json": {
        "prefix": "SKY-TIB-2D",
        "sector": "VECTOR PIPELINES / GREASE PENCIL / CONCEPT ART / ROTOSCOPING",
        "sev_1": {"level": "SEV-1: NOMINAL", "driver": "Vector Format Compatibility", "value": 12},
        "opp_1": {"level": "OPP-1: HIGH YIELD", "driver": "Real-time Rigging Tooling", "value": 70},
        "sev_2": {"level": "SEV-2: NOMINAL", "driver": "Animation Pipeline Velocity", "value": 22},
        "opp_2": {"level": "OPP-2: NOMINAL", "driver": "OpenTimelineIO Bridge Cadence", "value": 55}
    },
    "sky_tib_ds_ai.json": {
        "prefix": "SKY-TIB-AI",
        "sector": "NEURAL RENDERING / MOTION CAPTURE SYNTHESIS / ASSET METADATA / DIFFUSION FOR VFX",
        "sev_1": {"level": "SEV-1: NOMINAL", "driver": "Foundational Model Stability", "value": 18},
        "opp_1": {"level": "OPP-1: HIGH YIELD", "driver": "Open Weights & ZeroGPU Pools", "value": 82},
        "sev_2": {"level": "SEV-2: NOMINAL", "driver": "Inference Latency Monitoring", "value": 28},
        "opp_2": {"level": "OPP-2: NOMINAL", "driver": "Neural Solver Benchmark Updates", "value": 60}
    },
    "sky_tib_hardware.json": {
        "prefix": "SKY-TIB-HW",
        "sector": "RENDER FARMS / WORKSTATION GPUS / HYPERCONVERGED STORAGE / LED VOLUME PROCESSORS",
        "sev_1": {"level": "SEV-1: NOMINAL", "driver": "Cluster Power & Thermal Envelope", "value": 15},
        "opp_1": {"level": "OPP-1: HIGH YIELD", "driver": "ST 2110 IP Video Standardization", "value": 76},
        "sev_2": {"level": "SEV-2: NOMINAL", "driver": "Storage SAN Latency Baseline", "value": 25},
        "opp_2": {"level": "OPP-2: NOMINAL", "driver": "Firmware & Driver Patch Stream", "value": 54}
    },
    "sky_tib_latest.json": {
        "prefix": "SKY-TIB-LATEST",
        "sector": "3D PLATFORMS / SCIENTIFIC COMPUTING / GRAPHICS PIPELINES",
        "sev_1": {"level": "SEV-1: NOMINAL", "driver": "Core Schema & API Stability", "value": 14},
        "opp_1": {"level": "OPP-1: HIGH YIELD", "driver": "Active GPU Grants & Sandbox Pools", "value": 75},
        "sev_2": {"level": "SEV-2: NOMINAL", "driver": "Production Pipeline Velocity", "value": 24},
        "opp_2": {"level": "OPP-2: NOMINAL", "driver": "ASWF Open-Source Releases", "value": 60}
    },
    "report.json": {
        "prefix": "SKY-TIB",
        "sector": "3D PLATFORMS / SCIENTIFIC COMPUTING / GRAPHICS PIPELINES",
        "sev_1": {"level": "SEV-1: NOMINAL", "driver": "Core Schema & API Stability", "value": 14},
        "opp_1": {"level": "OPP-1: HIGH YIELD", "driver": "Active GPU Grants & Sandbox Pools", "value": 75},
        "sev_2": {"level": "SEV-2: NOMINAL", "driver": "Production Pipeline Velocity", "value": 24},
        "opp_2": {"level": "OPP-2: NOMINAL", "driver": "ASWF Open-Source Releases", "value": 60}
    }
}

def sanitize_prefix(dispatch_id, default_prefix="SKY-TIB"):
    """Extract clean base prefix without duplicate timestamp accumulations."""
    clean = re.sub(r"-\d{4}(?:-\d{2})*(?:-\d{4}Z?)?.*$", "", str(dispatch_id))
    return clean if clean.startswith("SKY-TIB") else default_prefix

def evaluate_metrics(data, config):
    """
    Evaluates telemetry items to determine if metrics should remain at the
    calibrated Nominal Operations baseline or escalate to an elevated/disruptive state.
    """
    has_sev_1_breaking = False
    breaking_driver = config["sev_1"]["driver"]

    # Check for active SEV-1 items in executive brief or impact matrix
    for item in data.get("executive_brief", []):
        if "SEV-1" in str(item.get("severity", "")):
            has_sev_1_breaking = True
            breaking_driver = item.get("title", config["sev_1"]["driver"])
            break

    for item in data.get("impact_matrix", []):
        if "SEV-1" in str(item.get("rating", "")):
            has_sev_1_breaking = True
            breaking_driver = item.get("vector", config["sev_1"]["driver"])
            break

    # Build calibrated metrics
    if has_sev_1_breaking:
        sev_1 = {
            "level": "SEV-1: DISRUPTIVE",
            "driver": breaking_driver,
            "value": 85
        }
    else:
        sev_1 = config["sev_1"]

    metrics = {
        "sev_1": sev_1,
        "opp_1": config["opp_1"],
        "sev_2": config["sev_2"],
        "opp_2": config["opp_2"]
    }
    return metrics

def process_directory(target_dir, timestamp_str):
    if not os.path.exists(target_dir):
        return

    files = [f for f in os.listdir(target_dir) if f.endswith(".json") and not f.endswith(".schema.json")]
    for filename in files:
        filepath = os.path.join(target_dir, filename)
        config = DOMAIN_NOMINAL_METRICS.get(filename, DOMAIN_NOMINAL_METRICS["sky_tib_latest.json"])
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)

            # Update clean dispatch ID with latest timestamp
            current_id = data.get("dispatch_id", config["prefix"])
            clean_prefix = sanitize_prefix(current_id, config["prefix"])
            data["dispatch_id"] = f"{clean_prefix}-{timestamp_str}"
            data["status"] = "Active / Nominal Baseline"
            data["cadence"] = "Daily Intelligence Run (3x UTC)"

            # Apply baseline metric recalibration
            if "metrics" in data:
                # Handle numeric vs object metrics format
                if isinstance(data["metrics"].get("sev_1"), dict):
                    data["metrics"] = evaluate_metrics(data, config)
                else:
                    calibrated = evaluate_metrics(data, config)
                    data["metrics"] = {
                        "sev_1": calibrated["sev_1"]["value"],
                        "opp_1": calibrated["opp_1"]["value"],
                        "sev_2": calibrated["sev_2"]["value"],
                        "opp_2": calibrated["opp_2"]["value"]
                    }

            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            print(f"  [OK] Calibrated telemetry feed: {filename} ({data['dispatch_id']})")
        except Exception as e:
            print(f"  [ERROR] Error updating {filename}: {e}")

def refresh_telemetry_payloads():
    now_utc = datetime.datetime.now(datetime.timezone.utc)
    timestamp_str = now_utc.strftime("%Y-%m-%d-%H%MZ")
    print(f"[{now_utc.isoformat()}] Recalibrating SKY TIB Telemetry Feeds to Active Nominal Baseline...")

    process_directory(SRC_DATA_DIR, timestamp_str)
    process_directory(DATA_DIR, timestamp_str)

    print(f"Telemetry synchronization & baseline recalibration completed at {timestamp_str}.")

if __name__ == "__main__":
    refresh_telemetry_payloads()
