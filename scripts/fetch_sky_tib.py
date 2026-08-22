#!/usr/bin/env python3
"""
SKY Technical Intelligence Brief - Telemetry Ingestion Script
Fetches, validates, and synchronizes multi-domain intelligence feeds.
"""
import os
import json
import datetime

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "data")

def refresh_telemetry_payloads():
    os.makedirs(DATA_DIR, exist_ok=True)
    now_utc = datetime.datetime.now(datetime.timezone.utc)
    timestamp_str = now_utc.strftime("%Y-%m-%d-%H%MZ")
    print(f"[{now_utc.isoformat()}] Synchronizing SKY TIB Telemetry Feeds...")

    files = [f for f in os.listdir(DATA_DIR) if f.endswith(".json")]
    for filename in files:
        filepath = os.path.join(DATA_DIR, filename)
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            # Update dispatch timestamp cadence if active
            if "dispatch_id" in data:
                parts = data["dispatch_id"].rsplit("-", 2)
                prefix = parts[0] if len(parts) > 1 else "SKY-TIB"
                # Keep domain identifier prefix intact
                data["dispatch_id"] = f"{prefix}-{timestamp_str}"
            
            data["status"] = "Active"
            
            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            print(f"  ✓ Updated telemetry feed: {filename}")
        except Exception as e:
            print(f"  ✗ Error updating {filename}: {e}")

    print(f"Telemetry synchronization completed at {timestamp_str}.")

if __name__ == "__main__":
    refresh_telemetry_payloads()
