"""
Pytest suite for end-to-end intelligence pipeline and templating execution.
"""
import json
import pytest
from pathlib import Path
from src.pipeline import run_pipeline, load_baseline_payload


def test_load_baseline_payload():
    payload = load_baseline_payload()
    assert "metrics" in payload
    assert "sev_1" in payload["metrics"]
    assert "compound_impact_analysis" in payload


def test_run_pipeline_end_to_end(tmp_path):
    out_json = tmp_path / "latest.json"
    out_md = tmp_path / "index.md"
    template_path = Path(__file__).resolve().parent.parent / "templates" / "dashboard.md.jinja"
    
    report = run_pipeline(
        output_json_path=out_json,
        output_md_path=out_md,
        template_path=template_path
    )
    
    # 1. Assert Report Model Integrity
    assert report.dispatch_id.startswith("SKY-TIB")
    assert report.metrics.sev_1.value >= 0
    assert len(report.arxiv_research) > 0
    assert len(report.security_advisories) > 0
    
    # 2. Assert output JSON file exists and is valid JSON
    assert out_json.exists()
    with open(out_json, "r", encoding="utf-8") as f:
        data = json.load(f)
    assert data["dispatch_id"] == report.dispatch_id
    assert "arxiv_research" in data
    assert "security_advisories" in data
    
    # 3. Assert rendered Markdown file exists and contains template elements
    assert out_md.exists()
    with open(out_md, "r", encoding="utf-8") as f:
        md_content = f.read()
    assert "# SKY TECHNICAL INTELLIGENCE BRIEF (SKY-TIB)" in md_content
    assert "Metric Telemetry & Operational Baselines" in md_content
    assert "Security Vulnerability Disclosures" in md_content
